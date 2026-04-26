<template>
  <DefaultTheme.Layout />
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { useData, useRouter, inBrowser } from 'vitepress';
import { watch, onMounted } from 'vue';

const { page, lang } = useData();
const router = useRouter();

watch(
  () => page.value.isNotFound,
  (isNotFound) => {
    if (!isNotFound || lang.value === 'en' || !inBrowser) return;
    const currentPath = window.location.pathname;
    const fallbackPath = currentPath.replace(/^\/[^/]+/, '') || '/';
    if (currentPath === fallbackPath) return;
    router.go(fallbackPath)
  },
  { immediate: true }
);

onMounted(() => {
  if (page.value.isNotFound && lang.value !== 'en' && inBrowser) {
    const currentPath = window.location.pathname;
    const fallbackPath = currentPath.replace(/^\/[^/]+/, '') || '/';
    if (currentPath !== fallbackPath) {
      router.go(fallbackPath);
    }
  }
});
</script>