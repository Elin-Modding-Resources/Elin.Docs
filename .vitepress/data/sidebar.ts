import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";

export async function makeSidebar(locale: string = "en") {
  const base = locale === "en" ? "" : `/${locale}`;
  const { diff, latest } = getDiff();
  return {
    sidebar: {
      [`${base}/articles/`]: getArticles(locale, base),
      [`${base}/diff/`]: diff,
    },
    latest: latest,
  };
}

function loadMeta(articleDir: string) {
  try {
    const metaPath = path.join(articleDir, "meta.json");
    return JSON.parse(readFileSync(metaPath, "utf-8")) as Record<string, any>;
  } catch (e) {
    console.warn(`[Sidebar] meta.json not found`);
    return {};
  }
}

export function getArticles(locale: string, base: string = "") {
  const articleDir =
    locale === "en"
      ? path.join(process.cwd(), "articles")
      : path.join(process.cwd(), locale, "articles");
  const meta = loadMeta(articleDir);
  const topDirs = readdirSync(articleDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.includes("_"))
    .sort((a, b) => Number(a.name.split("_")[0]) - Number(b.name.split("_")[0]))
    .map((d) => d.name);

  return topDirs.map((dir) => {
    const fullPath = path.join(articleDir, dir);
    const items = buildSidebarItems(
      fullPath,
      dir,
      base,
      locale,
      meta[dir]?.items || {},
    );

    const metaConfig = meta[dir] || {};
    const text =
      metaConfig.text ||
      dir
        .split("_")
        .slice(1)
        .join(" ")
        .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

    return {
      text,
      items,
      collapsed: metaConfig.collapsed ?? true,
    };
  });
}

function buildSidebarItems(
  fullDir: string,
  dirKey: string,
  base: string,
  locale: string,
  metaItems: Record<string, any> = {},
): any[] {
  const entries = readdirSync(fullDir, { withFileTypes: true });
  const items: any[] = [];

  for (const entry of entries) {
    const entryPath = path.join(fullDir, entry.name);

    if (entry.isDirectory() && entry.name.toLowerCase() !== "assets") {
      const childMeta = metaItems[entry.name] || {};
      const childItems = buildSidebarItems(
        entryPath,
        `${dirKey}/${entry.name}`,
        base,
        locale,
        childMeta.items || {},
      );

      const text =
        childMeta.text ||
        entry.name
          .replace(/^\d+_/, "")
          .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

      items.push({
        text,
        items: childItems,
        collapsed: childMeta.collapsed ?? true,
      });
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      const { data } = matter.read(entryPath);
      if (data.exclude === true) continue;

      const slug = entry.name.replace(/\.md$/i, "");
      const link =
        locale === "en"
          ? `/articles/${dirKey}/${slug}`
          : `/${locale}/articles/${dirKey}/${slug}`;

      items.push({
        text: (data.title || slug).replace(/^(.)|\s+(.)/g, (c) =>
          c.toUpperCase(),
        ),
        link,
        time: data.date ? +new Date(data.date).getTime() : 0,
      });
    }
  }

  items.sort((a, b) => (a.time || 0) - (b.time || 0));
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
      text: data.version
        .replace(/^(.)|\s+(.)/g, (c: string) => c.toUpperCase())
        .trim(),
      items: items,
      collapsed: true,
    });
  }

  sidebar.sort((a, b) => {
    const parseEAVersion = (text: string) => {
      const afterEA = (text.split("EA ")[1] || "").trim();
      const versions = afterEA.match(/\d+/g) || [];
      return [
        parseInt(versions[0] || "0", 10),
        parseInt(versions[1] || "0", 10),
        parseInt(versions[2] || "0", 10),
      ];
    };

    const versionA = parseEAVersion(a.text);
    const versionB = parseEAVersion(b.text);

    for (let i = 0; i < 3; i++) {
      if (versionA[i] > versionB[i]) return -1;
      if (versionA[i] < versionB[i]) return 1;
    }
    return b.text.localeCompare(a.text);
  });

  // merge children changes
  let grouped = sidebar.filter((version) => !version.text.startsWith("+"));
  for (const change of sidebar) {
    const parentVersion = change.text.match(/\+(.+?)(?= -)/);
    if (!parentVersion) continue;

    const parent = grouped.filter(
      (version) => version.text === parentVersion[1],
    );
    if (parent.length == 0) continue;

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
    let text = version.text.replace(/\b\w+\b/g, (word: string) => {
      for (const mapping of versionIcons) {
        if (mapping.pattern.test(word)) {
          matchedEmojis.add(mapping.icon);
          return `<span class="${mapping.color} font-semibold">${word}</span>`;
        }
      }
      return word;
    });
    version.text = text + " " + Array.from(matchedEmojis).join("");
  }

  (grouped[0] as any).collapsed = false;

  return { diff: grouped, latest: grouped[0].text };
}
