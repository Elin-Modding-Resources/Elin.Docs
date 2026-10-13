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
/* 一张略亮的纸条：细描边，悬停 / 聚焦时描边变成游戏的高亮蓝。
   类名写两遍（.link-card.link-card[data-v-…] = 0,3,0）：卡片常放在提示块里，
   VitePress 的 .custom-block.danger a（0,2,1）会把整张卡片染成语义色并加下划线 */
.link-card.link-card {
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

.link-card.link-card:hover {
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

<!--
  经典皮肤的覆盖写在不带 scoped 的块里：scoped 样式中的 :global(X) .foo 会被 Vue 整条替换成 X，
  选择器后半截直接丢掉（样式会落到 <html> 上）。这里的选择器都以 :root[data-skin="classic"] 开头，
  特异度比对应的 scoped 规则（多一个 [data-v-…]）恰好高一级。
-->
<style>
/* ── 经典皮肤：改版前的浅蓝卡片 ──────────────────────────────────────────────
   相对原版的修正：去掉悬停时整张卡片缩小、URL 从一行展开成多行（两者都会让版面跳动）；
   URL 由 slate-500 加深到 slate-600，原来在浅蓝底上不到 4.5:1。 */
:root[data-skin="classic"] .link-card.link-card {
  padding: 16px;
  border: 0;
  border-radius: 8px;
  background-color: rgb(191 219 254 / 0.3);
  box-shadow: 0 1px 2px 0 rgb(96 165 250 / 0.6);
  transition: background-color 0.3s;
}

:root[data-skin="classic"] .link-card.link-card:hover {
  background-color: rgb(219 234 254 / 0.8);
}

:root[data-skin="classic"].dark .link-card.link-card {
  background-color: #082f49;
  box-shadow: 0 1px 2px 0 rgb(12 74 110 / 0.8);
}

:root[data-skin="classic"].dark .link-card.link-card:hover {
  background-color: rgb(8 47 73 / 0.8);
}

:root[data-skin="classic"] .link-card-icon {
  width: 80px;
  height: 80px;
  border-radius: 6px;
}

:root[data-skin="classic"] .link-card-title {
  font-size: 18px;
  font-weight: 700;
}

:root[data-skin="classic"] .link-card:hover .link-card-title {
  color: inherit;
}

:root[data-skin="classic"] .link-card-url {
  font-size: 14px;
  color: #475569;
}

:root[data-skin="classic"].dark .link-card-url {
  color: #94a3b8;
}

:root[data-skin="classic"].dark .link-card:hover .link-card-url {
  color: #38bdf8;
}
</style>
