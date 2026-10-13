// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
// theme-without-fonts：正文与标题字体由 style.css 自带，VitePress 默认会额外预加载并下载 Inter（约 72KB）
import DefaultTheme from "vitepress/theme-without-fonts";
import Layout from "./Layout.vue";
import "viewerjs/dist/viewer.min.css";
import "@cssnr/vitepress-plugin-copybutton/style.css";
import "@miletorix/vitepress-back-to-top-button/style.css";
import "@fontsource-variable/source-sans-3/wght.css";
// 经典皮肤的正文字体；@font-face 只在用到时才下载，Elin 皮肤下不会请求
import "@fontsource-variable/inter/wght.css";
import "./style.css";
import "./custom.css";
import "./classic.css";
import "./tailwind.css";
import { useRoute } from "vitepress";
import { useData } from "vitepress/dist/client/index.js";
import { onMounted, onUnmounted, toRefs } from "vue";

import ArticleCard from "../components/ArticleCard.vue";
import CardContainer from "../components/CardContainer.vue";
import LinkCard from "../components/LinkCard.vue";
import BgmPlayer from "../components/BgmPlayer.vue";
import TilesetViewer from "../components/TilesetViewer.vue";
import CopyButton from "@cssnr/vitepress-plugin-copybutton";
import BackToTopButton from "@miletorix/vitepress-back-to-top-button";
import imageViewer from "vitepress-plugin-image-viewer";
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";
import giscusTalk from "vitepress-plugin-comment-with-giscus";

// 评论区主题按皮肤分：Elin 用 gruvbox_light（giscus 内置主题里唯一的暖色纸面，和羊皮纸最接近），
// 经典用 light —— 原版写的是 preferred_color_scheme，那是跟随系统而不是站点开关，
// 系统深色、站点浅色时评论区会是一块深色，算原版的 bug。深色两套都用 dark_dimmed。
const GISCUS_THEMES = {
  elin: { light: "gruvbox_light", dark: "dark_dimmed" },
  classic: { light: "light", dark: "dark_dimmed" },
} as const;

function giscusTheme(dark?: boolean) {
  const root = document.documentElement;
  const themes = GISCUS_THEMES[root.dataset.skin === "classic" ? "classic" : "elin"];
  return (dark ?? root.classList.contains("dark")) ? themes.dark : themes.light;
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component("ArticleCard", ArticleCard);
    app.component("CardContainer", CardContainer);
    app.component("LinkCard", LinkCard);
    app.component("BgmPlayer", BgmPlayer);
    app.component("TilesetViewer", TilesetViewer);
    app.component("vImageViewer", vImageViewer);
    app.component("C", CopyButton);
    BackToTopButton(app, { progressColor: "var(--elin-gold)" });
  },
  setup() {
    const { frontmatter } = toRefs(useData());
    const route = useRoute();

    imageViewer(route);

    giscusTalk(
      {
        repo: "Elin-Modding-Resources/Elin.Docs",
        repoId: "R_kgDONVRDCA",
        category: "Q&A",
        categoryId: "DIC_kwDONVRDCM4C_Pz0",
        mapping: "pathname",
        inputPosition: "top",
        lang: "en",
        locales: {
          zh: "zh-CN",
          ja: "ja",
          root: "en",
        },
        homePageShowComment: false,
        // 插件每次挂载评论区时读这两个值（只在浏览器里读），用 getter 让它跟着当前皮肤走
        get lightTheme() {
          return giscusTheme(false);
        },
        get darkTheme() {
          return giscusTheme(true);
        },
        loading: "lazy",
        reactionsEnabled: "0",
        emitMetadata: "0",
      },
      {
        frontmatter,
        route,
      },
      true,
    );

    // 插件自己的监听器只看 <html> 的 class（明暗），而且在挂载时就把主题名定死了；
    // 这里再挂一个，同时看 data-skin。MutationObserver 按注册先后回调，这个排在插件之后，最终值以它为准
    let themeObserver: MutationObserver | undefined;
    onMounted(() => {
      themeObserver = new MutationObserver(() => {
        document.getElementById("comment")?.setAttribute("theme", giscusTheme());
      });
      themeObserver.observe(document.documentElement, {
        attributeFilter: ["class", "data-skin"],
      });
    });
    onUnmounted(() => themeObserver?.disconnect());
  },
} satisfies Theme;
