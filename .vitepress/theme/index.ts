// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import "viewerjs/dist/viewer.min.css";
import "@cssnr/vitepress-plugin-copybutton/style.css";
import "@miletorix/vitepress-back-to-top-button/style.css";
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
    BackToTopButton(app);
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
        lightTheme: "preferred_color_scheme",
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
