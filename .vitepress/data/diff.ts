import { readdirSync, writeFileSync } from "fs";
import path from "path";
import parseGitDiff, { AnyLineChange } from "parse-git-diff";

export async function generateDiff() {
  const diffDir = path.join(process.cwd(), "/diff");
  const files = readdirSync(diffDir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .filter((d) => d.name.endsWith(".md"))
    .filter((d) => d.name != "diffview.md")
    .map((f) => f.name);

  const commits = await (
    await fetch(
      "https://api.github.com/repos/Elin-Modding-Resources/Elin-Decompiled/commits"
    )
  ).json();

  for (const commit of commits.slice(0, 3)) {
    const message = commit.commit.message;
    if (/^(?!EA|\+EA)/.test(message.trim())) {
      continue;
    }
    if (files.some((f) => f.startsWith(commit.sha))) {
      continue;
    }

    const content = await generateDiffForCommit(commit);

    const diffFile = path.join(diffDir, `${commit.sha}.md`);
    writeFileSync(diffFile, content.join("\n"), { flag: "w+" });

    continue;
  }
}

async function generateDiffForCommit(commit: {
  html_url: any;
  sha: any;
  commit: { committer: { date: string }; message: string };
}) {
  const rawDiff = await fetch(`${commit.html_url}.diff`);
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
        totalRemoved++;
        filename = `~${filename}`;
        break;
      default:
        break;
    }

    changes.push(filename);
    content.push(`## ${filename}\n`);
    const sourceLink = `https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/${commit.sha}/${diff.to}`;

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
          content.push("::: details File Created", "```cs");
          for (const change of chunk.changes) {
            content.push(change.content.slice(1));
          }
          content.push("```\n", ":::");
          break;
        case "DeletedFile":
          content.push("::: details File Removed", "```cs");
          for (const change of chunk.changes) {
            content.push(change.content.slice(1));
          }
          content.push("```\n", ":::");
          break;
        case "RenamedFile":
          content.push("::: details File Renamed", "```cs");
          for (const change of chunk.changes) {
            content.push(change.content.slice(1));
          }
          content.push("```\n", ":::");
          break;
        case "ChangedFile":
          const first = chunk.changes[0];
          const ln = getLine(first);

          const chunkLink = `${sourceLink}#L${ln}-L${getLine(
            chunk.changes.at(-1)
          )}`;
          content.push(
            `[\`${chunk.context}\`](${chunkLink})`,
            "```cs" + `:line-numbers=${ln}`
          );

          // replace tabs
          let tabs = (first.content.match(/\t/) || []).length;
          for (const change of chunk.changes) {
            tabs = Math.min(tabs, (change.content.match(/\t/) || []).length);
          }

          const methodSig =
            /^(?!.*=>.*).*(public|protected|internal|private)\b.*\(.*\).*/;
          const partialSig = /.*(public|protected|internal|private)\b.*\(/;
          let lastDeletion = "";
          for (let i = 0; i < chunk.changes.length; ++i) {
            const change = chunk.changes[i];

            let line = change.content.slice(1).replace("\t".repeat(tabs), "");
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
    }
  );

  const totalModified = diffs.files.length - totalAdded - totalRemoved;
  let description = `${totalModified} file${
    totalModified > 1 ? "s" : ""
  } modified.`;
  if (totalAdded != 0) {
    description += ` ${totalAdded} new file${
      totalAdded > 1 ? "s" : ""
    } created.`;
  }
  if (totalRemoved != 0) {
    description += ` ${totalRemoved} file${
      totalRemoved > 1 ? "s" : ""
    } removed.`;
  }
  if (totalRenamed != 0) {
    description += ` ${totalRenamed} file${
      totalRenamed > 1 ? "s" : ""
    } renamed.`;
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
        `### [${change.file} (${change.changes.length})](#${change.file
          .toLowerCase()
          .replace(/[+-]/g, "")
          .replace(/[\s_.]/g, "-")})\n` +
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
      ...foundBreaking
    );
  } else {
    header.push("**None.**");
  }

  return header.concat(content);
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
