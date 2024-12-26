export function makeNavBar(lastUpdated: string, diffVer: string) {
  return [
    {
      text: lastUpdated,
      link: "https://github.com/Elin-Modding-Resources/Elin.Docs/commits/master/",
    },
    {
      text: "📖 Archive",
      link: "/articles/archive",
      activeMatch: "/articles/",
    },
    {
      text: `🛠️ ${diffVer}`,
      link: "/diff/diffview",
      activeMatch: "/diff/",
    },
    {
      text: "📝 Elin Decompiled",
      link: "https://elin-modding-resources.github.io/Elin-Decompiled/",
    },
    {
      text: "📗 Elin Sources",
      items: [
        {
          text: "SourceBlock",
          link: "https://docs.google.com/spreadsheets/d/13oxL_cQEqoTUlcWsjKZyNuAaITFGK56v",
        },
        {
          text: "SourceCard",
          link: "https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z",
        },
        {
          text: "SourceChara",
          link: "https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn",
        },
        {
          text: "SourceGame",
          link: "https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_",
        },
      ],
    },
    {
      text: "↗️ Reference",
      items: [
        {
          text: "External Guides",
          link: "/articles/1_About Wiki/external_guides",
        },
        {
          text: "Ylvapedia Wiki",
          link: "https://ylvapedia.wiki/wiki/Main_Page",
        },
        {
          text: "YK Elin Mod Docs",
          link: "https://ykeyjp.github.io/ElinMod.Doc/",
        },
        {
          text: "Ylvania Dev Room",
          link: "https://ylvania.org/elin_dev_e.html",
        },
        {
          text: "awhitetiger's Elin Sources",
          link: "https://elindocs.onrender.com",
        },
      ],
    },
  ];
}
