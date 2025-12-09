// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "viewerjs/dist/viewer.min.css";
import "@cssnr/vitepress-plugin-copybutton/style.css";
import "@miletorix/vitepress-back-to-top-button/style.css";
import "./style.css";
import "./custom.css";
import "./tailwind.css";
import { useRoute } from "vitepress";

import ArticleCard from "../components/ArticleCard.vue";
import CardContainer from "../components/CardContainer.vue";
import LinkCard from "../components/LinkCard.vue";
import CopyButton from "@cssnr/vitepress-plugin-copybutton";
import BackToTopButton from "@miletorix/vitepress-back-to-top-button";
import imageViewer from "vitepress-plugin-image-viewer";
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component("ArticleCard", ArticleCard);
    app.component("CardContainer", CardContainer);
    app.component("LinkCard", LinkCard);
    app.component("vImageViewer", vImageViewer);
    app.component("C", CopyButton);
    BackToTopButton(app);
  },
  setup() {
    const route = useRoute();
    imageViewer(route);
  },
} satisfies Theme;
