import { defineConfig, HeadConfig, TransformContext } from "vitepress";
import { makeSidebar } from "./data/sidebar";
import { makeNavBar } from "./data/navbar";
import { generateDiff } from "./data/diff";
import { makeLangRedirectScript } from "./data/langRedirect";
import tailwindcss from "@tailwindcss/vite";
import { elinPaper, elinDark } from "./data/codeThemes";
import { SKIN_BOOT_SCRIPT } from "./theme/skin";
import { fileURLToPath, URL } from "node:url";

const isCI_GitHub = typeof process.env.GITHUB_REPOSITORY === "string";
const base = isCI_GitHub
  ? `/${process.env.GITHUB_REPOSITORY!.split("/")[1]}/`
  : "/";

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

  base,
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
          pattern:
            "https://github.com/Elin-Modding-Resources/Elin.Docs/edit/master/:path",
          text: "Edit this page",
        },
        outline: { label: "On this page", level: [2, 3] },
        docFooter: { prev: "Previous page", next: "Next page" },
        sidebarMenuLabel: "Menu",
        lastUpdated: { text: "Last updated" },
        notFound: {
          title: "Page not found",
          quote:
            "This page may have been moved or renamed. Try the search, or start again from the home page.",
          linkText: "Back to home",
          linkLabel: "Go to the home page",
        },
      },
    },
    ja: {
      label: "日本語",
      lang: "ja",
      themeConfig: {
        nav: makeNavBar(lastUpdate, jaData.latest, "ja"),
        sidebar: jaData.sidebar,
        editLink: {
          pattern:
            "https://github.com/Elin-Modding-Resources/Elin.Docs/edit/master/:path",
          text: "このページを編集",
        },
        outline: { label: "このページの内容", level: [2, 3] },
        docFooter: { prev: "前のページ", next: "次のページ" },
        sidebarMenuLabel: "メニュー",
        lastUpdated: { text: "最終更新日" },
        notFound: {
          title: "ページが見つかりません",
          quote:
            "このページは移動したか、名前が変わった可能性があります。検索するか、トップページから探してください。",
          linkText: "トップページへ",
          linkLabel: "トップページへ移動",
        },
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
          pattern:
            "https://github.com/Elin-Modding-Resources/Elin.Docs/edit/master/:path",
          text: "编辑页面",
        },
        outline: { label: "本页目录", level: [2, 3] },
        docFooter: { prev: "上一页", next: "下一页" },
        sidebarMenuLabel: "总目录",
        lastUpdated: { text: "最后更新" },
        notFound: {
          title: "页面不存在",
          quote: "这个页面可能已被移动或改名。试试搜索，或者回到首页重新找。",
          linkText: "返回首页",
          linkLabel: "前往首页",
        },
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
    // light / dark 给 Elin 皮肤；另外两套给经典皮肤（改版前的 VitePress 默认配色）。
    // shiki 会给每个 token 同时写上 --shiki-light / --shiki-dark / --shiki-classic-light / --shiki-classic-dark，
    // 由 CSS 按 <html data-skin> 选用（见 theme/classic.css）。
    // VitePress 只预加载 light / dark 两套，另外两套在 shikiSetup 里补装。
    theme: {
      light: elinPaper,
      dark: elinDark,
      "classic-light": "github-light",
      "classic-dark": "github-dark",
    } as { light: typeof elinPaper; dark: typeof elinDark },
    async shikiSetup(highlighter) {
      await highlighter.loadTheme("github-light", "github-dark");
    },
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
    resolve: {
      // 用自己的组件替换 VitePress 内置的明暗开关：导航栏里是下拉菜单，移动端抽屉里是平铺的选项，
      // 可在「Elin 风格 / 经典」两套皮肤 × 浅色 / 深色之间切换
      alias: [
        {
          find: /^.*\/VPNavBarAppearance\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/AppearanceMenu.vue", import.meta.url),
          ),
        },
        {
          find: /^.*\/VPNavScreenAppearance\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/AppearanceScreen.vue", import.meta.url),
          ),
        },
      ],
    },
  },

  head: [
    ["script", {}, makeLangRedirectScript(base)],
    // 皮肤要在首次绘制前定下来，所以也是同步内联脚本；排在语言跳转之后（那段必须是 head 第一项）
    ["script", {}, SKIN_BOOT_SCRIPT],
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
