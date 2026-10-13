// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
// theme-without-fonts：正文与标题字体由 style.css 自带，VitePress 默认会额外预加载并下载 Inter（约 72KB）
import DefaultTheme from "vitepress/theme-without-fonts";
import Layout from "./Layout.vue";
import "viewerjs/dist/viewer.min.css";
import "@cssnr/vitepress-plugin-copybutton/style.css";
import "@miletorix/vitepress-back-to-top-button/style.css";
import "@fontsource-variable/source-sans-3/wght.css";
import "./style.css";
import "./custom.css";
import "./tailwind.css";
import { useRoute } from "vitepress";
import { useData } from "vitepress/dist/client/index.js";
import { toRefs } from "vue";

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
        // gruvbox_light 是 giscus 内置主题里唯一的暖色纸面，和羊皮纸底最接近；
        // dark_dimmed 的冷灰与 Main Dark 的石板色相近
        lightTheme: "gruvbox_light",
        darkTheme: "dark_dimmed",
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
  },
} satisfies Theme;
