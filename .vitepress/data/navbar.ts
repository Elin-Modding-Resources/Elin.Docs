export function makeNavBar() {
  return [
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
          text: "Weasel's Doc",
          link: "https://weaselofdeath.github.io/ElinModdingDocumentation",
        },
      ],
    },
  ];
}
