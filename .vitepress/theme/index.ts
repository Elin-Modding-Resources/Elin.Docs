// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import "./custom.css";
import "./tailwind.css";

import ArticleCard from "../components/ArticleCard.vue";
import CardContainer from "../components/CardContainer.vue";
import LinkCard from "../components/LinkCard.vue";
import ZoomImage from "../components/ZoomImage.vue";
import Layout from "../components/Layout.vue";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component("ArticleCard", ArticleCard);
    app.component("CardContainer", CardContainer);
    app.component("LinkCard", LinkCard);
    app.component("zimg", ZoomImage);
  },
} satisfies Theme;
