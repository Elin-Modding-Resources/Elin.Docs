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

    if (items.length == 0) {
      continue;
    }

    const name = group.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
    sidebar.push({
      text: name,
      items: items,
      collapsed: name != "Getting Started",
    });
  }

  return sidebar;
}

function generateItems(fullDir: string, dir: string) {
  const articles = readdirSync(fullDir, { withFileTypes: true });

  let items: any[] = [];
  for (var article of articles) {
    const currentPath = path.join(fullDir, article.name);
    if (article.isDirectory() && article.name.toLowerCase() != "assets") {
      items.push({
        text: article.name.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase()),
        items: generateItems(currentPath, `${dir}/${article.name}`),
        collapsed: true,
      });
    }

    if (article.isFile() && article.name.endsWith(".md")) {
      const { data } = matter.read(currentPath);
      if (data.exclude === true) {
        continue;
      }

      items.push({
        text: data.title.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase()),
        link: `/articles/${dir}/${article.name}`,
        time: +new Date(data.date).getTime(),
      });
    }
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
      text: data.version.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase()).trim(),
      items: items,
      collapsed: true,
    });
  }

  sidebar.sort((a, b) => {
    const parseEAVersion = (text: string) => {
      const afterEA = (text.split("EA ")[1] || "").trim();
      const versions = afterEA.match(/\d+/g) || [];
      return [
        parseInt(versions[0], 10) || 0,
        parseInt(versions[1], 10) || 0,
        parseInt(versions[2], 10) || 0,
      ];
    };

    const versionA = parseEAVersion(a.text);
    const versionB = parseEAVersion(b.text);

    for (let i = 0; i < 3; i++) {
      if (versionA[i] > versionB[i]) {
        return -1;
      }
      if (versionA[i] < versionB[i]) {
        return 1;
      }
    }

    return b.text.localeCompare(a.text);
  });

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

  const versionIcons = [
    { pattern: /anni/i, color: "text-pink-400", icon: "🎉🎉🎉" },
    { pattern: /nya/i, color: "text-green-400", icon: "😺" },
    { pattern: /nightly/i, color: "text-blue-400", icon: "🌙" },
    { pattern: /stable/i, color: "text-orange-400", icon: "🌌" },
  ];

  for (const version of grouped) {
    let matchedEmojis = new Set<string>();

    // replace all matching words
    let text = version.text.replace(/\b\w+\b/g, (word: string) => {
      for (const mapping of versionIcons) {
        if (mapping.pattern.test(word)) {
          matchedEmojis.add(mapping.icon);
          return `<span class="${mapping.color} font-semibold">${word}</span>`;
        }
      }
      return word;
    });

    // append all matched emojis (unique)
    version.text = text + " " + Array.from(matchedEmojis).join("");
  }

  (grouped[0] as any).collapsed = false;

  return { diff: grouped, latest: grouped[0].text };
}
