<template>
  <DefaultTheme.Layout>
    <!-- 顶部导航菜单：替换默认的 VPNavBarMenu，改为按可用宽度自适应折叠。
         默认组件已在 custom.css 中隐藏；视觉顺序由 CSS order 还原。 -->
    <template #nav-bar-content-before>
      <AdaptiveNavMenu />
    </template>
    <template #doc-before>
      <ModMakerTip v-if="showModMakerTip" />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { useData, useRouter, inBrowser } from "vitepress";
import { watch, onMounted, computed } from "vue";
import data from "../data/redirects.json";
import ModMakerTip from "../components/ModMakerTip.vue";
import AdaptiveNavMenu from "../components/AdaptiveNavMenu.vue";

type Language = "en" | "zh" | "ja" | string;
type RedirectRule = string | Partial<Record<Language, string>>;
interface Redirects {
  [cleanPath: string]: RedirectRule;
}

const redirects = data as Redirects;
const { page, lang } = useData();
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
</script>
