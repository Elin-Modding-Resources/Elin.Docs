import { PREFIXED_LOCALES } from "./lang";
import type { ModMakerTipKind } from "./modmaker";

// ModMaker 的提示按页面内容分几种说法（文案在 components/ModMakerTip.vue）；
// 只挂 ModMaker 真能编辑或预览的页面，它的能力变了这里要跟着改
export type DocTipId = `modmaker-${Exclude<ModMakerTipKind, "package">}`;
export const DOC_TIP_PAGES: Record<DocTipId, string[]> = {
  "modmaker-sheet": [
    "articles/10_Source Sheets/character.md",
    "articles/10_Source Sheets/element.md",
    "articles/10_Source Sheets/job.md",
    "articles/10_Source Sheets/material.md",
    "articles/10_Source Sheets/race.md",
    "articles/10_Source Sheets/religion.md",
    "articles/10_Source Sheets/thing.md",
    "articles/10_Source Sheets/tile.md",
  ],
  "modmaker-drama": ["articles/10_Source Sheets/drama.md"],
  "modmaker-l10n": ["articles/10_Source Sheets/localization.md"],
  "modmaker-zone": ["articles/10_Source Sheets/zone.md"],
  "modmaker-texture": [
    "articles/15_Texture Mods/pcc.md",
    "articles/15_Texture Mods/portraits.md",
    "articles/15_Texture Mods/replacement.md",
    "articles/15_Texture Mods/skins.md",
    "articles/15_Texture Mods/variation.md",
    "articles/15_Texture Mods/widget_deco.md",
  ],
  "modmaker-pref": ["articles/15_Texture Mods/pref.md"],
};

const LOCALE_PREFIX = new RegExp(`^(?:${PREFIXED_LOCALES.join("|")})/`);

function stripLocale(relativePath: string): string {
  return relativePath.replace(/\\/g, "/").replace(LOCALE_PREFIX, "");
}

function toMatcher(pattern: string): (path: string) => boolean {
  if (pattern.endsWith("/")) return (path) => path.startsWith(pattern);
  if (!pattern.includes("*")) return (path) => path === pattern;

  const source = pattern
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, "[^/]*");
  const re = new RegExp(`^${source}$`);
  return (path) => re.test(path);
}

const MATCHERS = (Object.keys(DOC_TIP_PAGES) as DocTipId[]).map((id) => ({
  id,
  matchers: DOC_TIP_PAGES[id].map(toMatcher),
}));

export function resolveDocTips(relativePath: string): DocTipId[] {
  if (!relativePath) return [];
  const path = stripLocale(relativePath);
  return MATCHERS.filter(({ matchers }) =>
    matchers.some((match) => match(path)),
  ).map(({ id }) => id);
}