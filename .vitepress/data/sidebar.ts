import { closeSync, openSync, readdirSync, readFileSync, readSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { anchorSlug } from "./slug";

const FRONTMATTER_PROBE_BYTES = 4096;

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

function readFrontmatter(file: string): Record<string, any> {
  const fd = openSync(file, "r");
  try {
    const buf = Buffer.alloc(FRONTMATTER_PROBE_BYTES);
    const read = readSync(fd, buf, 0, FRONTMATTER_PROBE_BYTES, 0);
    const head = buf.subarray(0, read).toString("utf-8");

    if (head.startsWith("---")) {
      const end = head.indexOf("\n---", 3);
      if (end !== -1) {
        return matter(`${head.slice(0, end + 4)}\n`).data;
      }
    }
  } finally {
    closeSync(fd);
  }

  return matter.read(file).data;
}

function parseEAVersion(text: string): [number, number, number] {
  const version = text.match(/EA\s+(\d+)\.(\d+)/);
  const patch = text.match(/Patch\s+(\d+)/i);
  return [
    parseInt(version?.[1] ?? "0", 10),
    parseInt(version?.[2] ?? "0", 10),
    parseInt(patch?.[1] ?? "0", 10),
  ];
}

function byVersionDesc(a: { text: string }, b: { text: string }) {
  const versionA = parseEAVersion(a.text);
  const versionB = parseEAVersion(b.text);

  for (let i = 0; i < 3; i++) {
    if (versionA[i] > versionB[i]) return -1;
    if (versionA[i] < versionB[i]) return 1;
  }
  return b.text.localeCompare(a.text);
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
    const data = readFrontmatter(path.join(diffDir, diff));
    if (!data.version || !data.changes) {
      console.warn(`[Sidebar] diff/${diff} 缺少 version/changes，已跳过`);
      continue;
    }
    const files = String(data.changes).split("/");

    let items: any[] = [
      {
        text: "Important Changes",
        link: `/diff/${diff}#important-changes`,
      },
    ];
    for (const file of files) {
      items.push({
        text: file,
        link: `/diff/${diff}#${anchorSlug(file)}`,
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

  if (sidebar.length === 0) {
    return { diff: [], latest: "Diff" };
  }

  sidebar.sort(byVersionDesc);

  const grouped = sidebar.filter((version) => !version.text.startsWith("+"));
  for (const change of sidebar) {
    const parentVersion = change.text.match(/\+(.+?)(?= -)/);
    if (!parentVersion) continue;

    const parent = grouped.find((version) => version.text === parentVersion[1]);
    if (parent) {
      parent.items.splice(0, 0, {
        text: change.text.split(" ").at(-1),
        items: change.items,
        collapsed: true,
      });
      continue;
    }

    change.text = change.text.replace(/^\+/, "");
    grouped.push(change);
  }
  grouped.sort(byVersionDesc);

  const versionIcons = [
    { pattern: /anni/i, color: "text-pink-400", icon: "🎉🎉🎉" },
    { pattern: /nya|mya/i, color: "text-green-400", icon: "😺" }, // ?!
    { pattern: /nightly/i, color: "text-blue-400", icon: "🌙" },
    { pattern: /stable/i, color: "text-orange-400", icon: "🌌" },
  ];

  let latest = "Diff";

  grouped.forEach((version, index) => {
    const matchedEmojis = new Set<string>();
    let color = "";
    for (const word of version.text.match(/\b\w+\b/g) ?? []) {
      for (const mapping of versionIcons) {
        if (mapping.pattern.test(word)) {
          matchedEmojis.add(mapping.icon);
          color ||= mapping.color;
        }
      }
    }

    const emojis = Array.from(matchedEmojis).join("");
    const paint = (s: string) =>
      color
        ? s.replace(
            /(\d[\d.]*)/,
            `<span class="${color} font-semibold">$1</span>`,
          )
        : s;

    if (index === 0) {
      const short = version.text.match(/EA\s+[\d.]+/)?.[0] ?? version.text;
      latest = `${paint(short)} ${emojis}`.trim();
    }

    version.text = paint(version.text) + " " + emojis;
  });

  grouped[0].collapsed = false;

  return { diff: grouped, latest };
}
