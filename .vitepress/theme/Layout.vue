<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <ModMakerTip v-if="showModMakerTip" />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { useData, useRoute, useRouter, inBrowser } from "vitepress";
import { watch, onMounted, computed } from "vue";
import data from "../data/redirects.json";
import { LANG_STORAGE_KEY, normalizeRoute, splitLocalePath } from "../data/lang";
import ModMakerTip from "../components/ModMakerTip.vue";

type Language = "en" | "zh" | "ja" | string;
type RedirectRule = string | Partial<Record<Language, string>>;
interface Redirects {
  [cleanPath: string]: RedirectRule;
}

const redirects = data as Redirects;
const { page, lang, site } = useData();
const route = useRoute();
const router = useRouter();

const MODMAKER_SHEETS =
  /^(?:zh\/|ja\/)?articles\/10_Source Sheets\/(character|race|job|drama|localization)\.md$/;

const showModMakerTip = computed(() => MODMAKER_SHEETS.test(page.value.relativePath));

function cleanTrailingBrace(path: string): string {
  return path.endsWith("%7D") ? path.slice(0, -3) : path;
}

function getRedirectTarget(): string | null {
  if (!inBrowser || !page.value.isNotFound) return null;

  const currentPath = window.location.pathname;

  let cleanPath =
    lang.value === "en"
      ? currentPath
      : currentPath.replace(/^\/[^/]+/, "") || "/";

  const cleanedPath = cleanTrailingBrace(cleanPath);
  const rule = redirects[cleanedPath];

  if (!rule) {
    if (cleanedPath !== cleanPath) {
      if (lang.value === "en" || cleanedPath === "/") {
        return cleanedPath;
      } else {
        return `/${lang.value}${cleanedPath}`;
      }
    }
    return lang.value !== "en" ? cleanPath : null;
  }

  let target: string | undefined;

  if (typeof rule === "string") {
    target = rule;
  } else {
    target = rule[lang.value] ?? rule.en;
  }

  if (!target) return null;

  if (target.startsWith("http://") || target.startsWith("https://")) {
    return target;
  }

  if (target === "/" || lang.value === "en") {
    return target;
  }

  const normalized = target.startsWith("/") ? target : `/${target}`;
  return `/${lang.value}${normalized}`;
}

function goToRedirect() {
  const target = getRedirectTarget();
  if (!target) return;

  const currentPath = window.location.pathname;
  if (target === currentPath) return;

  if (target.startsWith("http://") || target.startsWith("https://")) {
    window.location.href = target;
  } else {
    router.go(target);
  }
}

watch(() => page.value.isNotFound, goToRedirect, { immediate: true });

onMounted(goToRedirect);

watch(
  () => route.path,
  (next, prev) => {
    if (!inBrowser || !prev || next === prev) return;

    const from = splitLocalePath(prev, site.value.base);
    const to = splitLocalePath(next, site.value.base);
    if (from.lang === to.lang) return;
    if (normalizeRoute(from.rest) !== normalizeRoute(to.rest)) return;

    try {
      localStorage.setItem(LANG_STORAGE_KEY, to.lang);
    } catch {}
  },
);
</script>
