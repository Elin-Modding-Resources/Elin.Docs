<template>
  <div
    @click="goto"
    class="link-card group my-3 cursor-pointer rounded-lg bg-blue-200/30 p-4 shadow-sm shadow-blue-400/60 transition-all duration-300 hover:scale-[0.99] hover:bg-blue-100/80 dark:bg-sky-950 dark:shadow-sky-900/80 dark:hover:bg-sky-950/80"
  >
    <div class="flex items-center">
      <!-- Conditionally render the icon if it exists -->
      <div v-if="i" class="flex-shrink-0 mr-4">
        <img
          :src="i"
          :alt="avatar"
          class="h-14 w-14 rounded-full sm:h-[70px] sm:w-[70px] overflow-hidden"
        />
      </div>
      <div class="flex-1">
        <header class="font-bold text-lg">{{ t }}</header>
      </div>
    </div>
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
