<template>
  <div>
    <!-- 只在列表末尾放一组分页：读完这一页才需要翻页；换页后把视线和焦点带回列表开头 -->
    <div ref="listRef" class="journal" tabindex="-1">
      <ArticleCard
        v-for="article in paginatedArticles"
        :key="article.link"
        :title="article.frontmatter.title"
        :author="article.frontmatter.author"
        :date="article.date.string"
        :datetime="toIsoDate(article.date.time)"
        :desc="article.frontmatter.description"
        :tags="formatTags(article.frontmatter.tags)"
        :link="article.link"
      />
    </div>

    <div v-if="totalPages > 1" class="pager-row mt-10">
      <PaginationBar
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="goToPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleCard from "./ArticleCard.vue";
import PaginationBar from "./PaginationBar.vue";
import { data as articles } from "../data/articles.data";
import { useData } from "vitepress";
import { computed, nextTick, ref, watch } from "vue";

const PAGE_SIZE = 12;

const currentPage = ref(1);

const { lang } = useData();

const displayedArticles = computed(() =>
  articles.filter((article) => article.locale === lang.value)
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(displayedArticles.value.length / PAGE_SIZE))
);

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE;
  return displayedArticles.value.slice(start, start + PAGE_SIZE);
});

const listRef = ref<HTMLElement | null>(null);

const goToPage = async (page: number) => {
  currentPage.value = Math.max(1, Math.min(page, totalPages.value));
  await nextTick();
  const list = listRef.value;
  if (!list) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  list.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  list.focus({ preventScroll: true });
};

function toIsoDate(time: number): string | undefined {
  return Number.isFinite(time) ? new Date(time).toISOString().slice(0, 10) : undefined;
}

function formatTags(tags: string | undefined): string[] {
  return tags ? tags.split("/").filter(Boolean) : [];
}

watch(lang, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.journal {
  border-top: 1px solid var(--elin-line);
  /* scrollIntoView 时让出固定导航栏的高度 */
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
}

.journal:focus {
  outline: none;
}

/* 与上方「Meanwhile on Ylva…」标题左对齐，而不是自己居中成一行 */
.pager-row {
  display: flex;
  justify-content: flex-start;
}

.pager-row :deep(.pagination) {
  justify-content: flex-start;
}
</style>
