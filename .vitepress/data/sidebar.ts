import { readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";

export async function makeSidebar() {
  const { diff, latest } = getDiff();
  return {
    sidebar: {
      "/articles/": getArticles(),
      "/diff/": diff,
    },
    latest: latest,
  };
}

function getArticles() {
  const articleDir = path.join(process.cwd(), "/articles");

  const dirs: string[] = readdirSync(articleDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => d.name.includes("_"))
    .sort((a, b) => Number(a.name.split("_")[0]) - Number(b.name.split("_")[0]))
    .map((f) => f.name);

  let sidebar: {}[] = [];

  for (const dir of dirs) {
    const group = dir.split("_")[1];

    const fullDir = path.join(articleDir, dir);
    let items = generateItems(fullDir, dir);

    const subDirs = readdirSync(fullDir, { withFileTypes: true })
      .filter((f) => f.isDirectory())
      .filter((f) => f.name.toLowerCase() != "assets")
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

  let items: any[] = [];
  for (var article of articles) {
    const { data } = matter.read(path.join(fullDir, article));
    if (data.exclude === true) {
      continue;
    }

    items.push({
      text: data.title.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase()),
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

  let sidebar: any[] = [];
  for (const diff of diffs) {
    const { data } = matter.read(path.join(diffDir, diff));
    const files = data.changes.split("/");

    let items: any[] = [
      {
        text: "Important Changes",
        link: `/diff/${diff}#important-changes`,
      },
    ];
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

  // merge children changes
  let grouped = sidebar.filter((version) => !version.text.startsWith("+"));
  for (const change of sidebar) {
    const parentVersion = change.text.match(/\+(.+?)(?= -)/);
    if (!parentVersion) {
      continue;
    }

    const parent = grouped.filter(
      (version) => version.text === parentVersion[1]
    );
    if (parent.length == 0) {
      continue;
    }

    parent[0].items.splice(0, 0, {
      text: change.text.split(" ").at(-1),
      items: change.items,
      collapsed: true,
    });
  }

  (grouped[0] as any).collapsed = false;

  return { diff: grouped, latest: grouped[0].text };
}
