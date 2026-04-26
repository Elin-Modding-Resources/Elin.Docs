const isCI_GitHub = typeof process.env.GITHUB_REPOSITORY === "string";

export function makeNavBar(
  lastUpdated: string,
  diffVer: string,
  locale: string = "en",
) {
  const base = locale === "en" ? "" : `/${locale}`;
  return [
    {
      text: lastUpdated,
      link: "https://github.com/Elin-Modding-Resources/Elin.Docs/commits/master/",
    },
    {
      text: "📖 Archive",
      link: `${base}/articles/archive`,
      activeMatch: `${base}/articles/`,
    },
    {
      text: `🛠️ ${diffVer}`,
      link: `${base}/diff/diffview`,
      activeMatch: `${base}/diff/`,
    },
    {
      text: "📝 Elin Decompiled",
      link: isCI_GitHub
        ? "https://elin-modding-resources.github.io/Elin-Decompiled/"
        : "https://code.elin-modding.net/",
    },
    {
      text: "📗 Elin Sources",
      items: [
        {
          text: "Lang",
          link: "https://docs.google.com/spreadsheets/d/1cje2GHiKwjBd_YLYWqWlddm2YLsYnRiB",
        },
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
  ];
}
