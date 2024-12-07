<template>
  <Layout />
</template>

<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { onMounted } from "vue";
import { useRouter } from "vitepress";
import mediumZoom from "medium-zoom";

const { Layout } = DefaultTheme;

const setupMediumZoom = () => {
  mediumZoom("[data-zoomable]", {
    background: "transparent",
  });
};

onMounted(setupMediumZoom);

const router = useRouter();
router.onAfterRouteChanged = setupMediumZoom;
</script>
