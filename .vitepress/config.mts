import { defineConfig, HeadConfig, TransformContext } from "vitepress";
import { makeSidebar } from "./data/sidebar";
import { makeNavBar } from "./data/navbar";
import { generateDiff } from "./data/diff";

await generateDiff();

const commit = await (
  await fetch(
    "https://api.github.com/repos/Elin-Modding-Resources/Elin.Docs/commits/master"
  )
).json();
const lastUpdate = new Date(commit.commit.author.date)
  .toISOString()
  .slice(0, 10);

const { sidebar, latest } = await makeSidebar();

const isCI_GitHub = typeof process.env.GITHUB_REPOSITORY === "string";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Elin Modding Wiki",
  description: "Elin Modding Community Compendium",

  base: isCI_GitHub ? `/${process.env.GITHUB_REPOSITORY!.split("/")[1]}/` : "/",
  cleanUrls: true,
  lastUpdated: true,

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    logo: "/community-icon.png",

    sidebar: sidebar,
    nav: makeNavBar(lastUpdate, latest),

    search: {
      provider: "algolia",
      options: {
        appId: "E8886VC68U",
        apiKey: "411a331d698a1a4bd856c0960fc06ee2",
        indexName: "elin-modding-resourcesio",
      },
    },

    editLink: {
      pattern:
        "https://github.com/Elin-Modding-Resources/Elin.Docs/edit/master/:path",
      text: "Edit Page",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Elin-Modding-Resources" },
      { icon: "discord", link: "https://discord.gg/elona" },
    ],
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
