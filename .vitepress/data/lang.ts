export const LANG_STORAGE_KEY = "elin-docs-lang";

export const PREFIXED_LOCALES = ["zh", "ja"] as const;

export type Lang = "en" | (typeof PREFIXED_LOCALES)[number];

export function splitLocalePath(
  pathname: string,
  base = "/",
): { lang: Lang; rest: string } {
  const rest = pathname.startsWith(base)
    ? pathname.slice(base.length)
    : pathname.replace(/^\//, "");

  const first = rest.split("/")[0];
  if ((PREFIXED_LOCALES as readonly string[]).includes(first)) {
    return {
      lang: first as Lang,
      rest: rest.slice(first.length).replace(/^\//, ""),
    };
  }

  return { lang: "en", rest };
}

export function normalizeRoute(rest: string): string {
  const cleaned = rest
    .replace(/\\/g, "/")
    .replace(/\.html$/i, "")
    .replace(/(^|\/)index$/i, "$1");
  const trimmed = cleaned.replace(/^\/+/, "").replace(/\/+$/, "");
  return trimmed ? `/${trimmed}` : "";
}