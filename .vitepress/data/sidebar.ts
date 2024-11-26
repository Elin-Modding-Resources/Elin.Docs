import { readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";

export function makeSidebar() {
  const articleDir = path.join(process.cwd(), "/articles");

  const dirs: string[] = readdirSync(articleDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => d.name.includes("_"))
    .sort((a, b) => Number(a.name.split("_")[0]) - Number(b.name.split("_")[0]))
    .map((d) => d.name);

  let sidebars: Array<{}> = [];

  for (const dir of dirs) {
    const group = dir.split("_")[1];

    const fullDir = path.join(articleDir, dir);
    const articles = readdirSync(fullDir, { withFileTypes: true })
      .filter((f) => f.isFile())
      .filter((f) => f.name.endsWith(".md"))
      .map((f) => f.name);

    let items: Array<{}> = [];
    for (var article of articles) {
      const { data } = matter.read(path.join(fullDir, article));
      if (data.exclude === true) {
        continue;
      }

      items.push({
        text: data.title,
        link: `/articles/${dir}/${article}`,
        time: +new Date(data.date).getTime(),
      });
    }

    if (items.length == 0) {
      continue;
    }

    items.sort((a, b) => (a as any).time - (b as any).time);
    sidebars.push({
      text: group.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase()),
      items: items,
    });
  }

  return sidebars;
}
