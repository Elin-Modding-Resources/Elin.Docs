<template>
  <nav class="pagination" :aria-label="t.label">
    <template v-for="(item, index) in paginationItems" :key="index">
      <span v-if="item === 'ellipsis'" class="page-gap" aria-hidden="true">…</span>

      <button
        v-else
        type="button"
        class="page-button"
        :class="{ current: currentPage === item }"
        :aria-current="currentPage === item ? 'page' : undefined"
        :aria-label="t.page(item as number)"
        @click="emit('change', item as number)"
      >
        {{ item }}
      </button>
    </template>

    <span class="page-count">{{ currentPage }} / {{ totalPages }}</span>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

const { currentPage, totalPages } = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "change", page: number): void;
}>();

const TEXT = {
  en: { label: "Pages", page: (n: number) => `Page ${n}` },
  zh: { label: "分页", page: (n: number) => `第 ${n} 页` },
  ja: { label: "ページ", page: (n: number) => `${n} ページ目` },
};

const { lang } = useData();
const t = computed(() => TEXT[lang.value as keyof typeof TEXT] ?? TEXT.en);

const paginationItems = computed(() => {
  const pages: (number | "ellipsis")[] = [];
  const total = totalPages;
  const current = currentPage;

  if (total <= 10) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);

    if (current > 4) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, current - 2);
    const end = Math.min(total - 1, current + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 3) {
      pages.push("ellipsis");
    }

    if (total > 1) {
      pages.push(total);
    }
  }

  return pages;
});
</script>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  /* VitePress 2.0.0-alpha.20 起 body 不再写死 24px 行高（改为继承 html 的 1.5），按钮按原来的 24px 排的 */
  line-height: 24px;
}

/* 游戏里的方形按钮（bg button square）：米色填充、细描边；
   选中项换成高亮蓝描边（bg button square highlight），不改填充色 */
.page-button {
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
  background-color: var(--elin-paper-raised);
  border: 1px solid var(--elin-line);
  border-radius: 4px;
  box-shadow: inset 0 1px 0 var(--elin-button-bevel);
  transition:
    border-color 0.2s,
    color 0.2s;
}

.page-button:hover {
  color: var(--vp-c-text-1);
  border-color: var(--elin-highlight);
}

.page-button.current {
  color: var(--vp-c-text-1);
  background-color: var(--elin-button-bg);
  border: 2px solid var(--elin-highlight);
}

.page-gap {
  min-width: 20px;
  text-align: center;
  color: var(--vp-c-text-3);
}

.page-count {
  margin-left: 10px;
  font-size: 14px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}
</style>

<!--
  经典皮肤的覆盖写在不带 scoped 的块里：scoped 样式中的 :global(X) .foo 会被 Vue 整条替换成 X，
  选择器后半截直接丢掉（样式会落到 <html> 上）。这里的选择器都以 :root[data-skin="classic"] 开头，
  特异度比对应的 scoped 规则（多一个 [data-v-…]）恰好高一级。
-->
<style>
/* ── 经典皮肤：改版前的圆角数字按钮。当前页原版是 blue-500 + 白字（3.7:1），加深到 blue-600（5.2:1） ── */
:root[data-skin="classic"] .page-button {
  border: 0;
  border-radius: 12px;
  background: transparent;
  box-shadow: none;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

:root[data-skin="classic"] .page-button:hover {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

:root[data-skin="classic"] .page-button.current {
  border: 0;
  background-color: #2563eb;
  color: #ffffff;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
}

/* VitePress 默认的 text-3 在白底上只有 3.1:1，原版这里是 gray-500（约 4.8:1） */
:root[data-skin="classic"] .page-count {
  color: var(--vp-c-text-2);
}
</style>
