import { defineConfig, HeadConfig, TransformContext } from "vitepress";
import { makeSidebar } from "./data/sidebar";
import { makeNavBar } from "./data/navbar";
import { generateDiff } from "./data/diff";
import lightbox from "vitepress-plugin-lightbox";

await generateDiff();

const commit = await (
  await fetch(
    "https://api.github.com/repos/Elin-Modding-Resources/Elin.Docs/commits/master"
  )
).json();
const lastUpdate = new Date(commit.commit.author.date)
  .toISOString()
  .slice(0, 10);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Elin Modding Wiki",
  description: "Elin Modding Community Compendium",

  base: "/Elin.Docs/",
  cleanUrls: true,
  lastUpdated: true,

  markdown: {
    lineNumbers: true,
    config(md) {
      md.use(lightbox, {});
    },
  },

  themeConfig: {
    logo: "/community-icon.png",

    sidebar: await makeSidebar(),
    nav: makeNavBar(lastUpdate),

    search: {
      provider: "local",
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
});
