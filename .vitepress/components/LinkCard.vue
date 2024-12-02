<template>
  <div
    @click="goto"
    class="link-card group my-3 cursor-pointer rounded-lg bg-blue-200/30 p-4 shadow-sm shadow-blue-400/60 transition-all duration-300 hover:scale-[0.99] hover:bg-blue-100/80 dark:bg-sky-950 dark:shadow-sky-900/80 dark:hover:bg-sky-950/80"
  >
    <header class="font-bold">{{ i || "" }} {{ t }}</header>
    <footer
      class="mt-1 transition-all duration-300 line-clamp-1 hover:line-clamp-none text-slate-500 dark:text-slate-400 dark:group-hover:text-sky-400"
    >
      {{ u }}
    </footer>
  </div>
</template>

<script setup lang="ts">
const { t, u, i } = defineProps(["t", "u", "i"]);
function goto() {
  window.open(u, "_blank");
}
</script>
