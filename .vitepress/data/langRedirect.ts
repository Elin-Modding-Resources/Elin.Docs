import { readdirSync } from "fs";
import path from "path";
import {
  LANG_STORAGE_KEY,
  PREFIXED_LOCALES,
  normalizeRoute,
} from "./lang";

const ROOT_SKIP = new Set([
  "node_modules",
  ".vitepress",
  ".github",
  "public",
  "playlist",
  "dist",
  ...PREFIXED_LOCALES,
]);

interface MissingRules {
  p: string[];
  e: string[];
}

function readDirSafe(dir: string) {
  try {
    return readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function collectRoutes(dir: string, prefix = "", skip?: Set<string>): string[] {
  const routes: string[] = [];

  for (const entry of readDirSafe(dir)) {
    if (entry.name.startsWith(".")) continue;
    if (skip?.has(entry.name)) continue;

    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      if (entry.name.toLowerCase() === "assets") continue;
      routes.push(...collectRoutes(path.join(dir, entry.name), rel));
    } else if (entry.name.toLowerCase().endsWith(".md")) {
      routes.push(normalizeRoute(rel.replace(/\.md$/i, "")));
    }
  }
  return routes;
}

function diffRoutes(rootRoutes: string[], localeRoutes: string[]): MissingRules {
  const have = new Set(localeRoutes);
  const localeTopSegments = new Set(
    localeRoutes.map((route) => route.split("/")[1]).filter(Boolean),
  );

  const prefixes = new Set<string>();
  const exact: string[] = [];

  for (const route of rootRoutes) {
    if (have.has(route)) continue;

    const top = route.split("/")[1];
    if (top && !localeTopSegments.has(top)) {
      prefixes.add(`/${top}`);
    } else {
      exact.push(route);
    }
  }

  return { p: [...prefixes].sort(), e: exact.sort() };
}

export function collectMissingRoutes(
  cwd = process.cwd(),
): Record<string, MissingRules> {
  const rootRoutes = collectRoutes(cwd, "", ROOT_SKIP);

  const missing: Record<string, MissingRules> = {};
  for (const locale of PREFIXED_LOCALES) {
    missing[locale] = diffRoutes(
      rootRoutes,
      collectRoutes(path.join(cwd, locale)),
    );
  }
  return missing;
}

export function makeLangRedirectScript(base: string): string {
  const missing = collectMissingRoutes();

  return `(function(){try{
var B=${JSON.stringify(base)},K=${JSON.stringify(LANG_STORAGE_KEY)},L=${JSON.stringify(PREFIXED_LOCALES)},M=${JSON.stringify(missing)};
var p=location.pathname;if(p.indexOf(B)!==0)return;
var rest=p.slice(B.length);
if(L.indexOf(rest.split("/")[0])>=0)return;
var t=null;try{t=localStorage.getItem(K)}catch(e){}
if(!t){var ls=navigator.languages||[navigator.language||""];
for(var i=0;i<ls.length;i++){var s=String(ls[i]||"").toLowerCase().split("-")[0];
if(s==="en"||L.indexOf(s)>=0){t=s;break}}}
if(!t||L.indexOf(t)<0)return;
var r=("/"+rest).replace(/\\.html$/i,"").replace(/(^|\\/)index$/i,"$1").replace(/\\/+$/,"");
try{r=decodeURIComponent(r)}catch(e){}
var m=M[t];if(m){if(m.e.indexOf(r)>=0)return;
for(var j=0;j<m.p.length;j++)if(r===m.p[j]||r.indexOf(m.p[j]+"/")===0)return}
location.replace(B+t+"/"+rest+location.search+location.hash)}catch(e){}})();`;
}
