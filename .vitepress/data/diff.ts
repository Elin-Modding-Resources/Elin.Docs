import { readdirSync, writeFileSync } from "fs";
import path from "path";
import parseGitDiff, { type AnyLineChange } from "parse-git-diff";
import { anchorSlug } from "./slug";

const SOURCE_REPO = "Elin-Modding-Resources/Elin-Decompiled";

const MAX_WHOLE_FILE_LINES = 100;

function githubHeaders(accept = "application/vnd.github+json") {
  const headers: Record<string, string> = {
    "User-Agent": "Elin-Modding-Resources-Diff-Maker/1.0",
    Accept: accept,
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function generateDiff() {
  const diffDir = path.join(process.cwd(), "/diff");
  const files = readdirSync(diffDir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .filter((d) => d.name.endsWith(".md"))
    .filter((d) => d.name != "diffview.md")
    .map((f) => f.name);

  let commits: unknown;
  try {
    const res = await fetch(
      `https://api.github.com/repos/${SOURCE_REPO}/commits`,
      { headers: githubHeaders() },
    );
    if (!res.ok) {
      return;
    }
    commits = await res.json();
  } catch (e) {
    return;
  }

  if (!Array.isArray(commits)) {
    return;
  }

  for (const commit of commits.slice(0, 10)) {
    const message = commit.commit.message;
    if (!/^\+?EA/.test(message.trim())) {
      continue;
    }
    if (files.some((f) => f.startsWith(commit.sha))) {
      continue;
    }

    try {
      const content = await generateDiffForCommit(commit);
      if (!content) {
        continue;
      }

      const diffFile = path.join(diffDir, `${commit.sha}.md`);
      writeFileSync(diffFile, content.join("\n"), { flag: "w+" });
    } catch (e) {}
  }
}

async function generateDiffForCommit(commit: {
  url: string;
  sha: string;
  commit: { committer: { date: string }; message: string };
}) {
  const rawDiff = await fetch(commit.url, {
    headers: githubHeaders("application/vnd.github.v3.diff"),
  });
  if (!rawDiff.ok) {
    return null;
  }
  const diffs = parseGitDiff(await rawDiff.text());

  let content: string[] = [];
  let changes: string[] = [];
  let breaking: any[] = [];

  let totalAdded = 0;
  let totalRemoved = 0;
  let totalRenamed = 0;

  for (const diff of diffs.files) {
    let entry = "";
    if ("path" in diff) {
      entry = diff.path;
    } else if ("pathBefore" in diff) {
      entry = diff.pathBefore;
    }

    if (!entry.startsWith("Elin/")) {
      continue;
    }
    const changeFile = entry?.match(/[^/]+$/);
    let filename = changeFile?.[0].replace(/\.[^/.]+$/, "") ?? "Unknown File";

    switch (diff.type) {
      case "AddedFile":
        totalAdded++;
        filename = `+${filename}`;
        break;
      case "DeletedFile":
        totalRemoved++;
        filename = `-${filename}`;
        break;
      case "RenamedFile":
        totalRenamed++;
        filename = `~${filename}`;
        break;
      default:
        break;
    }

    changes.push(filename);
    content.push(`## ${filename}\n`);
    if (diff.type === "RenamedFile") {
      content.push(`\`${diff.pathBefore}\` → \`${diff.pathAfter}\`\n`);
    }
    const sourceLink = `https://github.com/${SOURCE_REPO}/blob/${commit.sha}/${entry}`;

    breaking.push({
      file: filename,
      changes: [],
    });

    for (const chunk of diff.chunks) {
      if (!("changes" in chunk)) {
        continue;
      }

      switch (diff.type) {
        case "AddedFile":
        case "DeletedFile":
        case "RenamedFile":
          content.push(
            `::: details ${WHOLE_FILE_LABEL[diff.type]}`,
            ...renderWholeFile(chunk.changes, sourceLink),
          );
          break;
        case "ChangedFile": {
          const changes = trimBlankEdges(chunk.changes);
          if (changes.length === 0) {
            break;
          }

          const first = changes[0];
          const ln = getLine(first);

          const chunkLink = `${sourceLink}#L${ln}-L${getLine(changes.at(-1))}`;
          content.push(
            `[\`${formatContext(chunk.context ?? first.content)}\`](${chunkLink})`,
            "```cs" + `:line-numbers=${ln}`,
          );

          const indented = changes.filter((c) => c.content.trim() !== "");
          const indent = indented.length
            ? Math.min(
                ...indented.map((c) => c.content.match(/^\t*/)![0].length),
              )
            : 0;
          const dedent = new RegExp(`^\\t{${indent}}`);

          const methodSig =
            /^(?!.*=>.*).*(public|protected|internal|private)\b.*\(.*\).*/;
          const partialSig = /.*(public|protected|internal|private)\b.*\(/;
          let lastDeletion = "";
          for (let i = 0; i < changes.length; ++i) {
            const change = changes[i];

            let line = change.content.replace(dedent, "");
            if (change.type === "DeletedLine") {
              line += " // [!code --]";
              if (methodSig.test(line)) {
                lastDeletion = line;
                breaking.at(-1).changes.push({
                  original: lastDeletion.trim(),
                  modified: "",
                  pos: i,
                });
              } else {
                lastDeletion = "";
              }
            } else if (change.type === "AddedLine") {
              line += " // [!code ++]";

              if (
                lastDeletion !== "" &&
                (line.startsWith(lastDeletion.match(partialSig)![0]) ||
                  (partialSig.test(line) &&
                    i === breaking.at(-1).changes.at(-1).pos + 1))
              ) {
                breaking.at(-1).changes.at(-1).modified = line.trim();
              }
            }
            content.push(line);
          }

          content.push("```\n");
          break;
        }
        default:
          break;
      }
    }
  }

  const commitTime = new Date(commit.commit.committer.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const totalModified =
    changes.length - totalAdded - totalRemoved - totalRenamed;
  let description = `${totalModified} ${plural(totalModified)} modified.`;
  if (totalAdded != 0) {
    description += ` ${totalAdded} new ${plural(totalAdded)} created.`;
  }
  if (totalRemoved != 0) {
    description += ` ${totalRemoved} ${plural(totalRemoved)} removed.`;
  }
  if (totalRenamed != 0) {
    description += ` ${totalRenamed} ${plural(totalRenamed)} renamed.`;
  }
  const header: string[] = [
    "---",
    "exclude: true",
    "aside: false",
    "pageClass: diff-single-page",
    "footer: false",
    "editLink: false",
    "lastUpdated: false",
    `description: ${description}`,
    `version: ${commit.commit.message}`,
    `changes: ${changes.join("/")}`,
    "---\n",
    `# ${commit.commit.message}\n`,
    `${commitTime}\n`,
    description,
    "\n## Important Changes\n",
  ];

  const foundBreaking = breaking
    .filter((change) => change.changes.length !== 0)
    .map((change) => {
      return (
        `### [${change.file} (${change.changes.length})](#${anchorSlug(
          change.file,
        )})\n` +
        change.changes
          .map((detail) => {
            return [
              "```cs:no-line-numbers",
              detail.original,
              detail.modified,
              "```",
            ].join("\n");
          })
          .join("\n")
      );
    });

  if (foundBreaking.length > 0) {
    header.push(
      "Possible breaking changes. Click the filename to view the chunk.",
      ...foundBreaking,
    );
  } else {
    header.push("**None.**");
  }

  return header.concat(content);
}

const WHOLE_FILE_LABEL = {
  AddedFile: "File Created",
  DeletedFile: "File Removed",
  RenamedFile: "File Renamed",
} as const;

function plural(n: number) {
  return n === 1 ? "file" : "files";
}

function trimBlankEdges(changes: readonly AnyLineChange[]) {
  let start = 0;
  let end = changes.length;
  while (start < end && changes[start].content.trim() === "") start++;
  while (end > start && changes[end - 1].content.trim() === "") end--;
  return changes.slice(start, end);
}

function renderWholeFile(
  changes: readonly AnyLineChange[],
  sourceLink: string,
) {
  const lines = trimBlankEdges(changes).map((c) => c.content);
  const shown = lines.slice(0, MAX_WHOLE_FILE_LINES);
  const omitted = lines.length - shown.length;

  const block = ["```cs", ...shown, "```\n"];
  if (omitted > 0) {
    block.push(`… [File](${sourceLink})\n`);
  }
  block.push(":::");
  return block;
}

function formatContext(raw: string) {
  const text = raw.trim();
  const opened = (text.match(/\(/g) || []).length;
  const closed = (text.match(/\)/g) || []).length;
  return opened > closed ? `${text}…)` : text;
}

function getLine(line: AnyLineChange | undefined) {
  if (line === undefined) {
    return 1;
  }
  switch (line.type) {
    case "AddedLine":
      return line.lineAfter;
    case "DeletedLine":
      return line.lineBefore;
    case "UnchangedLine":
      return line.lineBefore;
    default:
      return 1;
  }
}
