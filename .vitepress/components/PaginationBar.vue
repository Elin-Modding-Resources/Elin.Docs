<template>
  <div class="flex items-center gap-3">
    <div class="flex items-center gap-1">
      <template v-for="(item, index) in paginationItems" :key="index">
        <div
          v-if="item === 'ellipsis'"
          class="w-9 h-9 flex items-center justify-center text-gray-400"
        >
          ...
        </div>

        <button
          v-else
          @click="emit('change', item as number)"
          :class="[
            'w-9 h-9 rounded-xl text-sm font-medium transition-all',
            currentPage === item
              ? 'bg-blue-500 text-white shadow-sm' 
              : 'hover:bg-gray-100 text-gray-600 dark:hover:bg-gray-700 dark:text-gray-300',
          ]"
        >
          {{ item }}
        </button>
      </template>
    </div>

    <span class="ml-2 text-sm text-gray-500 tabular-nums dark:text-gray-400">
      {{ currentPage }} / {{ totalPages }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { currentPage, totalPages } = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "change", page: number): void;
}>();

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
