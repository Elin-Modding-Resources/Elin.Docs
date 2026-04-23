<template>
  <div
    @click="goto"
    class="link-card group my-3 cursor-pointer rounded-lg bg-blue-200/30 p-4 shadow-sm shadow-blue-400/60 transition-all duration-300 hover:scale-[0.99] hover:bg-blue-100/80 dark:bg-sky-950 dark:shadow-sky-900/80 dark:hover:bg-sky-950/80"
  >
    <div class="flex items-stretch gap-4">
      <div 
        class="w-20 h-20 shrink-0 overflow-hidden rounded-md flex items-center justify-center"
        v-if="i"
      >
        <img
          :src="i"
          class="w-full h-full object-contain block align-middle"
        />
      </div>

      <div class="flex flex-col justify-center flex-1 min-w-0">
        <header class="font-bold text-lg leading-tight">
          {{ t }}
        </header>

        <footer
          class="mt-1 text-sm text-slate-500 transition-all duration-300 line-clamp-1 group-hover:line-clamp-none dark:text-slate-400 dark:group-hover:text-sky-400"
        >
          {{ u }}
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useData } from "vitepress";

const { site } = useData();
const router = useRouter()

const { t, u, i } = defineProps(["t", "u", "i"])

function isExternal(url: string) {
  return /^(https?:)?\/\//.test(url)
}

function normalizeInternal(url: string) {
  let path = url.replace(/^\//, '')

  if (path.endsWith('.md')) {
    path = 'articles/' + path.replace(/\.md$/, '')
  }

  return site.value.base + path
}

function goto() {
  if (isExternal(u)) {
    window.open(u, "_blank")
  } else {
    router.go(normalizeInternal(u))
  }
}
</script>