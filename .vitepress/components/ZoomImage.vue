<template>
  <img :src="src" :alt="caption" data-zoomable="true" />
</template>

<script setup lang="ts">
const { src, alt } = defineProps(["src", "alt"]);
const caption = alt ?? src.split("/").at(-1);
</script>
