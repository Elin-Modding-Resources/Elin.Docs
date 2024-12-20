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

  for (const commit of commits) {
    const message = commit.commit.message;
    if (!message.startsWith("EA")) {
      continue;
    }
    if (files.some((f) => f.startsWith(commit.sha))) {
      break;
    }

    const rawDiff = await fetch(`${commit.html_url}.diff`);
    const diffs = parse(await rawDiff.text());

    let content: string[] = [];
    let changes: string[] = [];

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
      const sourceLink = `https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/${commit.sha}/Elin/${filename}.cs`;

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
          const chunkLink = `${sourceLink}#L${ln}`;
          content.push(
            `[\`${chunk.content}\`](${chunkLink})`,
            "```cs" + `:line-numbers=${ln}`
          );

          // replace tabs
          let tabs = (first.content.match(/\t/) || []).length;
          for (const change of chunk.changes) {
            tabs = Math.min(tabs, (change.content.match(/\t/) || []).length);
          }

          for (const change of chunk.changes) {
            let line = change.content.slice(1).replace("\t".repeat(tabs), "");
            if (change.del === true) {
              line += " // [!code --]";
            } else if (change.add === true) {
              line += " // [!code ++]";
            }
            content.push(line);
          }
          content.push("```\n");
        }
      }
    }

    const commitTime = new Date(
      commit.commit.committer.date
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const totalModified = diffs.length - 1 - totalAdded - totalRemoved;
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
      "footer: false",
      "editLink: false",
      "lastUpdated: false",
      `description: ${description}`,
      `version: ${message}`,
      `changes: ${changes.join("/")}`,
      "---\n",
      `# ${message}\n`,
      `${commitTime}\n`,
      description,
    ];

    content = header.concat(content);

    const diffFile = path.join(diffDir, `${commit.sha}.md`);
    writeFileSync(diffFile, content.join("\n"), { flag: "w+" });

    break;
  }
}
