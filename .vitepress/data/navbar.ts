export function makeNavBar(lastUpdated: string) {
  return [
    {
      text: lastUpdated,
      link: "https://github.com/Elin-Modding-Resources/Elin.Docs/commits/master/",
    },
    {
      text: "🛠️ Elin Diff",
      link: "/diff/diffview",
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
      text: "📖 Archive",
      link: "/articles/archive",
    },
    {
      text: "📝 Contribute",
      link: "/articles/1_contributing/contributing",
    },
    {
      text: "↗️ Reference",
      items: [
        { text: "Ylvapedia", link: "https://ylvapedia.wiki/wiki/Main_Page" },
        {
          text: "Ylvania Dev Room",
          link: "https://ylvania.org/elin_dev_e.html",
        },
        {
          text: "awhitetiger's Elin Sources",
          link: "https://elindocs.onrender.com",
        },
        {
          text: "Drakeny's Elin Decompiled",
          link: "https://github.com/Elin-Modding-Resources/Elin-Decompiled",
        },
        {
          text: "Weasel's Doc",
          link: "https://weaselofdeath.github.io/ElinModdingDocumentation",
        },
      ],
    },
  ];
}
