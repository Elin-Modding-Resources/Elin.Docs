import { defineConfig } from "vitepress";
import { makeSidebar } from "./data/sidebar";
import { makeNavBar } from "./data/navbar";

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
  },

  themeConfig: {
    logo: "/community-icon.png",

    sidebar: makeSidebar(),
    nav: makeNavBar(lastUpdate),

    search: {
      provider: "local",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Elin-Modding-Resources" },
      { icon: "discord", link: "https://discord.gg/elona" },
    ],
  },
});
