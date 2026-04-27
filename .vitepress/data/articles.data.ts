import { createContentLoader } from "vitepress";

export interface Article {
  date: {
    time: number;
    string: string;
  };
  link: string;
  frontmatter: Record<string, any>;
  locale: "en" | "ja" | "zh";
}

declare const data: Article[];
export { data };

export default createContentLoader(
  ["articles/**/*.md", "ja/articles/**/*.md", "zh/articles/**/*.md"],
  {
    transform(raw): Article[] {
      return raw
        .filter(
          ({ frontmatter }) =>
            frontmatter &&
            Object.keys(frontmatter).length > 0 &&
            frontmatter.exclude !== true &&
            frontmatter.hide !== true,
        )
        .map(({ url, frontmatter }) => {
          const locale = getLocale(url);
          return {
            date: formatDate(frontmatter.date, locale),
            link: url,
            frontmatter: frontmatter,
            locale,
          };
        })
        .sort((a, b) => b.date.time - a.date.time);
    },
  },
);

function getLocale(url: string): "en" | "ja" | "zh" {
  if (url.startsWith("/ja")) return "ja";
  if (url.startsWith("/zh")) return "zh";
  return "en";
}

function formatDate(raw: string | number, locale: "en" | "ja" | "zh" = "en") {
  const date = new Date(raw);
  const dateLocale =
    locale === "ja" ? "ja-JP" : locale === "zh" ? "zh-CN" : "en-US";
  return {
    time: +date.getTime(),
    string: date.toLocaleDateString(dateLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}
