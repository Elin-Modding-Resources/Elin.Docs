import { readdirSync, writeFileSync } from "fs";
import path from "path";
import parse from "parse-diff";

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

  for (const commit of commits.slice(0, 10)) {
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
  const diffs = parse(await rawDiff.text());

  let content: string[] = [];
  let changes: string[] = [];
  let breaking: any[] = [];

  let totalAdded = 0;
  let totalRemoved = 0;

  for (const diff of diffs) {
    if (!diff.to?.startsWith("Elin/")) {
      continue;
    }
    const changeFile = diff.to?.match(/[^/]+$/);
    let filename = changeFile?.[0].replace(/\.[^/.]+$/, "") ?? "Unknown File";

    if (diff.new === true) {
      totalAdded++;
      filename = `+${filename}`;
    }
    if (diff.deleted === true) {
      totalRemoved++;
      filename = `-${filename}`;
    }

    changes.push(filename);
    content.push(`## ${filename}\n`);
    const sourceLink = `https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/${commit.sha}/${diff.to}`;

    breaking.push({
      file: filename,
      changes: [],
    });

    for (const chunk of diff.chunks) {
      if (diff.new === true) {
        content.push("::: details File Created", "```cs");
        for (const change of chunk.changes) {
          content.push(change.content.slice(1));
        }
        content.push("```\n", ":::");
      } else if (diff.deleted === true) {
        content.push("::: details File Removed", "```cs");
        for (const change of chunk.changes) {
          content.push(change.content.slice(1));
        }
        content.push("```\n", ":::");
      } else {
        const first = chunk.changes[0];
        const ln = first.ln1 ?? 1;
        const chunkLink = `${sourceLink}#L${ln}-L${
          chunk.changes.at(-1)?.ln1 ?? ln + 1
        }`;
        content.push(
          `[\`${chunk.content}\`](${chunkLink})`,
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
          if (change.del === true) {
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
          } else if (change.add === true) {
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

  const totalModified = diffs.length - totalAdded - totalRemoved;
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
