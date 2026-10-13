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
