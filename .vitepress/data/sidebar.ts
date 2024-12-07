import { readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";

export async function makeSidebar() {
  return {
    "/articles/": getArticles(),
    "/diff/": getDiff(),
  };
}

function getArticles() {
  const articleDir = path.join(process.cwd(), "/articles");

  const dirs: string[] = readdirSync(articleDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => d.name.includes("_"))
    .sort((a, b) => Number(a.name.split("_")[0]) - Number(b.name.split("_")[0]))
    .map((f) => f.name);

  let sidebar: Array<{}> = [];

  for (const dir of dirs) {
    const group = dir.split("_")[1];

    const fullDir = path.join(articleDir, dir);
    let items = generateItems(fullDir, dir);

    const subDirs = readdirSync(fullDir, { withFileTypes: true })
      .filter((f) => f.isDirectory())
      .filter((f) => f.name != "assets")
      .map((f) => f.name);

    for (const subDir of subDirs) {
      items.push({
        text: subDir.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase()),
        items: generateItems(path.join(fullDir, subDir), `${dir}/${subDir}`),
        collapsed: true,
      });
    }

    if (items.length == 0) {
      continue;
    }

    sidebar.push({
      text: group.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase()),
      items: items,
    });
  }

  return sidebar;
}

function generateItems(fullDir: string, dir: string) {
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

  items.sort((a, b) => (a as any).time - (b as any).time);
  return items;
}

function getDiff() {
  const diffDir = path.join(process.cwd(), "/diff");
  const diffs = readdirSync(diffDir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .filter((d) => d.name.endsWith(".md"))
    .filter((d) => d.name != "diffview.md")
    .map((f) => f.name);

  let sidebar: Array<{}> = [];
  for (const diff of diffs) {
    const { data } = matter.read(path.join(diffDir, diff));
    const files = data.changes.split("/");

    let items: Array<{}> = [];
    for (const file of files) {
      const normalized = (file as string)
        .toLowerCase()
        .replace(/[+-]/g, "")
        .replace(/[\s_.]/g, "-");
      items.push({
        text: file,
        link: `/diff/${diff}#${normalized}`,
      });
    }

    sidebar.push({
      text: data.version,
      items: items,
      collapsed: true,
    });
  }
  sidebar.sort((a, b) => (b as any).text.localeCompare((a as any).text));
  (sidebar[0] as any).collapsed = false;

  return sidebar;
}
