import { defineConfig, HeadConfig, TransformContext } from "vitepress";
import { makeSidebar } from "./data/sidebar";
import { makeNavBar } from "./data/navbar";
import { generateDiff } from "./data/diff";

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

const { sidebar, latest } = await makeSidebar();
const lastUpdate = commitDate.toISOString().slice(0, 10);

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

    footer: {
      message: `This project is an unofficial documentation site and is not affiliated with, 
        endorsed by, or associated with Elin or Lafrontier / Noa.
        All trademarks are the property of their respective owners.
      `,
    },
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
