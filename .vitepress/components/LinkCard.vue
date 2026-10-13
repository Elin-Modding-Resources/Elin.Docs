<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noreferrer' : undefined"
    class="link-card"
  >
    <span v-if="i" class="link-card-icon">
      <img :src="iconSrc" alt="" loading="lazy" />
    </span>

    <span class="link-card-text">
      <span class="link-card-title">
        {{ t }}
        <span v-if="external" class="vp-external-link-icon" aria-hidden="true" />
        <span v-if="external" class="visually-hidden">{{ newTabText }}</span>
      </span>
      <span class="link-card-url" :title="u" aria-hidden="true">{{ u }}</span>
    </span>
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";

const { site, lang } = useData();

const { t, u, i } = defineProps<{
  t: string;
  u: string;
  i?: string;
}>();

const external = computed(() => /^(https?:)?\/\//.test(u));

function normalizeInternal(url: string) {
  let path = url.replace(/^\//, "");

  if (path.endsWith(".md")) {
    if (lang.value !== "en") {
      path = lang.value + "/articles/" + path.replace(/\.md$/, "");
    } else {
      path = "articles/" + path.replace(/\.md$/, "");
    }
  }

  return site.value.base + path;
}

const href = computed(() => (external.value ? u : normalizeInternal(u)));

const NEW_TAB: Record<string, string> = {
  en: "(opens in a new tab)",
  zh: "（在新标签页打开）",
  ja: "（新しいタブで開きます）",
};
const newTabText = computed(() => NEW_TAB[lang.value] ?? NEW_TAB.en);

// 根相对的图标（如 "/pole.gif"）要补上 base，否则在 GitHub Pages 的 /Elin.Docs/ 下会 404
const iconSrc = computed(() =>
  i && i.startsWith("/") && !i.startsWith("//") ? withBase(i) : i,
);
</script>

<style scoped>
/* 一张略亮的纸条：细描边，悬停 / 聚焦时描边变成游戏的高亮蓝 */
.vp-doc .link-card,
.link-card {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 12px 0;
  padding: 12px 16px;
  color: var(--vp-c-text-1);
  font-weight: 400;
  text-decoration: none;
  background-color: var(--elin-paper-raised);
  border: 1px solid var(--elin-line);
  border-radius: 6px;
  box-shadow: inset 0 1px 0 var(--elin-button-bevel);
  transition: border-color 0.2s;
}

.vp-doc .link-card:hover,
.link-card:hover {
  color: var(--vp-c-text-1);
  border-color: var(--elin-highlight);
}

.link-card-icon {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  overflow: hidden;
  border-radius: 4px;
}

.link-card-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.link-card-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 2px;
}

.link-card-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
}

.link-card:hover .link-card-title {
  color: var(--vp-c-brand-1);
}

.link-card-url {
  overflow: hidden;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
