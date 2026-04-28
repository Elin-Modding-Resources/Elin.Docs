<template>
  <div>
    <div v-if="totalPages > 1" class="flex justify-center mb-10">
      <PaginationBar
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="goToPage"
      />
    </div>

    <div class="container mx-auto flex flex-wrap justify-center gap-x-4 px-4">
      <ArticleCard
        v-for="article in paginatedArticles"
        :key="article.link"
        :title="article.frontmatter.title"
        :author="article.frontmatter.author"
        :date="article.date.string"
        :desc="article.frontmatter.description"
        :tags="formatTags(article.frontmatter.tags)"
        :link="article.link"
      />
    </div>

    <div v-if="totalPages > 1" class="flex justify-center mt-12">
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
import { useRoute } from "vitepress";
import { computed, ref, watch } from "vue";

const PAGE_SIZE = 12;

const route = useRoute();
const currentPage = ref(1);

const currentLocale = computed(() => {
  const path = route.path;
  if (path.startsWith("/ja")) return "ja";
  if (path.startsWith("/zh")) return "zh";
  return "en";
});

const displayedArticles = computed(() =>
  articles.filter((article) => article.locale === currentLocale.value)
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(displayedArticles.value.length / PAGE_SIZE))
);

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE;
  return displayedArticles.value.slice(start, start + PAGE_SIZE);
});

const goToPage = (page: number) => {
  currentPage.value = Math.max(1, Math.min(page, totalPages.value));
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function formatTags(tags: string | undefined): string[] {
  return tags ? tags.split("/").filter(Boolean) : [];
}

watch(currentLocale, () => {
  currentPage.value = 1;
});
</script>