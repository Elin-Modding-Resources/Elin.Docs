import { defineConfig, HeadConfig, TransformContext } from "vitepress";
import { makeSidebar } from "./data/sidebar";
import { makeNavBar } from "./data/navbar";
import { generateDiff } from "./data/diff";
import tailwindcss from "@tailwindcss/vite";

const isCI_GitHub = typeof process.env.GITHUB_REPOSITORY === "string";

if (isCI_GitHub) {
  await generateDiff();
}

let commitDate;
try {
  const commit = await (
    await fetch(
      "https://api.github.com/repos/Elin-Modding-Resources/Elin.Docs/commits/master",
    )
  ).json();
  const dateStr = commit?.commit?.author?.date;

  commitDate = dateStr ? new Date(dateStr) : new Date();
} catch (e) {
  commitDate = new Date();
}

const lastUpdate = commitDate.toISOString().slice(0, 10);

const enData = await makeSidebar("en");
const jaData = await makeSidebar("ja");
const zhData = await makeSidebar("zh");

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Elin Modding Wiki",
  description: "Elin Modding Community Compendium",

  base: isCI_GitHub ? `/${process.env.GITHUB_REPOSITORY!.split("/")[1]}/` : "/",
  cleanUrls: true,
  lastUpdated: true,

  locales: {
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        nav: makeNavBar(lastUpdate, enData.latest, "en"),
        sidebar: enData.sidebar,
        editLink: {
          pattern: "https://github.com/Elin-Modding-Resources/Elin.Docs/edit/master/:path",
          text: "Edit this page",
        },
        outline: { label: "On this page" },
        docFooter: { prev: "Previous page", next: "Next page" },
        sidebarMenuLabel: "Menu",
        lastUpdated: { text: "Last updated" },
      },
    },
    ja: {
      label: "日本語",
      lang: "ja",
      themeConfig: {
        nav: makeNavBar(lastUpdate, jaData.latest, "ja"),
        sidebar: jaData.sidebar,
        editLink: {
          pattern: "https://github.com/Elin-Modding-Resources/Elin.Docs/edit/master/:path",
          text: "このページを編集",
        },
        outline: { label: "このページの内容" },
        docFooter: { prev: "前のページ", next: "次のページ" },
        sidebarMenuLabel: "メニュー",
        lastUpdated: { text: "最終更新日" },
        returnToTopLabel: "トップに戻る",
        darkModeSwitchLabel: "外観",
        darkModeSwitchTitle: "ダークモードに切り替える",
        lightModeSwitchTitle: "ライトモードに切り替える",
        skipToContentLabel: "メインコンテンツにスキップ",
      },
    },
    zh: {
      label: "简体中文",
      lang: "zh",
      themeConfig: {
        nav: makeNavBar(lastUpdate, zhData.latest, "zh"),
        sidebar: zhData.sidebar,
        editLink: {
          pattern: "https://github.com/Elin-Modding-Resources/Elin.Docs/edit/master/:path",
          text: "编辑页面",
        },
        outline: { label: "本页目录" },
        docFooter: { prev: "上一页", next: "下一页" },
        sidebarMenuLabel: "总目录",
        lastUpdated: { text: "最后更新" },
        returnToTopLabel: "回到顶部",
        darkModeSwitchLabel: "外观",
        darkModeSwitchTitle: "切换到深色模式",
        lightModeSwitchTitle: "切换到浅色模式",
        skipToContentLabel: "跳转到内容",
      },
    },
  },

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    logo: "/community-icon.png",

    search: {
      provider: "algolia",
      options: {
        appId: "E8886VC68U",
        apiKey: "411a331d698a1a4bd856c0960fc06ee2",
        indexName: "elin-modding-resourcesio",
      },
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Elin-Modding-Resources" },
      { icon: "discord", link: "https://discord.gg/elona" },
    ],

    footer: {
      message: `This project is an unofficial documentation site and is not affiliated with, 
        endorsed by, or associated with Elin or Lafrontier / Noa.
        All trademarks are the property of their respective owners.
      `,
    },
    outline: "deep",
  },

  vite: {
    ssr: {
      noExternal: ["aplayer"],
    },
    plugins: [tailwindcss()],
  },

  head: [
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-72QNVY7L8Z",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-72QNVY7L8Z');`,
    ],
  ],
});
