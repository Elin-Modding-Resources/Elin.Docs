<template>
  <div
    class="w-full border border-gray-300 rounded-lg shadow-md my-4 transition-transform duration-200 overflow-hidden cursor-pointer hover:transform hover:-translate-y-1 hover:border-indigo-300"
    @click="goto(link)"
  >
    <div class="p-6">
      <h1 class="title">{{ title }}</h1>
      <h5>{{ author }}</h5>
      <p class="text-base mb-4">{{ desc }}</p>

      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">{{ date }}</span>

        <div class="flex flex-wrap gap-2">
          <span
            class="border border-indigo-300 hover:border-cyan-300 px-2 py-1 text-xs rounded-lg inline-block cursor-pointer"
            v-for="(tag, index) in tags"
            :key="index"
          >
            <b class="select-none">{{ tag }}</b>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.25rem;
  margin: 0 0 8px 0;
}
</style>

<script setup lang="ts">
import { useRouter } from "vitepress";

const { title, author, date, desc, tags, link } = defineProps([
  "title",
  "author",
  "date",
  "desc",
  "tags",
  "link",
]);

const router = useRouter();
function goto(link: string) {
  router.go("/Elin.Docs" + link);
}
</script>
