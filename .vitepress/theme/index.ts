// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "viewerjs/dist/viewer.min.css";
import "./style.css";
import "./custom.css";
import "./tailwind.css";
import { useRoute } from "vitepress";

import ArticleCard from "../components/ArticleCard.vue";
import CardContainer from "../components/CardContainer.vue";
import LinkCard from "../components/LinkCard.vue";
import imageViewer from "vitepress-plugin-image-viewer";
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component("ArticleCard", ArticleCard);
    app.component("CardContainer", CardContainer);
    app.component("LinkCard", LinkCard);
    app.component("vImageViewer", vImageViewer);
  },
  setup() {
    const route = useRoute();
    imageViewer(route);
  },
} satisfies Theme;
