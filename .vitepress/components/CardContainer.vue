<template>
  <div class="container flex flex-wrap justify-center mx-auto gap-x-4">
    <ArticleCard
      v-for="article in displayedArticles"
      :title="article.frontmatter.title"
      :author="article.frontmatter.author"
      :date="article.date.string"
      :desc="article.frontmatter.description"
      :tags="formatTags(article.frontmatter.tags)"
      :link="article.link"
    >
    </ArticleCard>
  </div>
</template>

<script setup lang="ts">
import ArticleCard from "./ArticleCard.vue";
import { data as articles } from "../data/articles.data";
import { useRoute } from "vitepress";
import { computed } from "vue";

const route = useRoute();

const currentLocale = computed(() => {
  const path = route.path;
  if (path.startsWith("/ja")) return "ja";
  if (path.startsWith("/zh")) return "zh";
  return "en";
});

const displayedArticles = computed(() =>
  articles.filter((article) => article.locale === currentLocale.value)
);

function formatTags(tags: string) {
  return tags ? tags.split("/") : [];
}
</script>
