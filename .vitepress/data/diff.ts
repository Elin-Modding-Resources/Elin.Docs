import parse from "parse-diff";
import { readdirSync, writeFileSync } from "fs";
import path from "path";

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

    for (const diff of diffs) {
      if (!diff.from?.startsWith("Elin/")) {
        continue;
      }
      const changeFile = diff.from?.match(/[^/]+$/);
      const filename =
        changeFile?.[0].replace(/\.[^/.]+$/, "") ?? "Unknown File";

      changes.push(filename);
      content.push(`## ${filename}\n`);

      for (const chunk of diff.chunks) {
        const first = chunk.changes[0];
        const ln = first.ln1;
        content.push(`\`${chunk.content}\``, "```cs" + `:line-numbers=${ln}`);
        // replace tabs
        let tabs = (first.content.match(/\t/) || []).length;
        for (const change of chunk.changes) {
          tabs = Math.min(tabs, (change.content.match(/\t/) || []).length);
        }
        for (const change of chunk.changes) {
          let line = change.content.slice(1).replace("\t".repeat(tabs + 1), "");
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

    const header: string[] = [
      "---",
      "exclude: true",
      "aside: false",
      "footer: false",
      "editLink: false",
      "lastUpdated: false",
      `version: ${message}`,
      `changes: ${changes.join("/")}`,
      "---\n",
      `# ${message}\n`,
      `${diffs.length} files modified.\n`,
    ];

    content = header.concat(content);

    const diffFile = path.join(diffDir, `${commit.sha}.md`);
    writeFileSync(diffFile, content.join("\n"), { flag: "w+" });

    break;
  }
}
