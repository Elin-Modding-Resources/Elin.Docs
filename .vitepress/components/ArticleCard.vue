<template>
  <article class="journal-entry">
    <time class="entry-date" :datetime="datetime">{{ date }}</time>

    <div class="entry-body">
      <h3 class="entry-title">
        <!-- 整条可点：标题链接用 ::after 撑满整条，键盘与中键新开标签页都照常可用 -->
        <a :href="withBase(link)" class="entry-link">{{ title }}</a>
      </h3>
      <p v-if="desc" class="entry-desc">{{ desc }}</p>

      <div v-if="author || tags.length" class="entry-meta">
        <span v-if="author" class="entry-author">{{ author }}</span>
        <ul v-if="tags.length" class="entry-tags">
          <li v-for="tag in tags" :key="tag" class="elin-tag">{{ tag }}</li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { withBase } from "vitepress";

defineProps<{
  title: string;
  author: string;
  date: string;
  /** 机器可读的日期（YYYY-MM-DD），给 <time datetime> 用 */
  datetime?: string;
  desc: string;
  tags: string[];
  link: string;
}>();
</script>

<style scoped>
/* 日志条目：左栏日期、右栏标题与摘要，条目之间只用细线分隔，不做卡片 */
.journal-entry {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px 28px;
  padding: 20px 0;
  border-bottom: 1px solid var(--elin-line-soft);
}

/* 悬停底色向两侧各溢出 12px，分隔线仍与上方标题左右对齐 */
.journal-entry::before {
  content: "";
  position: absolute;
  inset: 0 -12px;
  z-index: -1;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.journal-entry:hover::before {
  background-color: color-mix(in srgb, var(--elin-paper-raised) 75%, transparent);
}

@media (min-width: 640px) {
  .journal-entry {
    grid-template-columns: 9.5rem 1fr;
  }
}

.entry-date {
  padding-top: 5px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.entry-body {
  min-width: 0;
}

/* position: static —— VitePress 给 .vp-doc h3 设了 position: relative，
   否则下面撑满整条的 ::after 只会盖住标题这一行 */
.vp-doc .entry-title {
  position: static;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 21px;
  line-height: 1.4;
}

.vp-doc .entry-link {
  color: var(--elin-header);
  font-weight: 500;
  text-decoration: none;
}

.entry-link::after {
  content: "";
  position: absolute;
  inset: 0 -12px;
  border-radius: 4px;
}

.journal-entry:hover .entry-link {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
}

.entry-link:focus-visible {
  outline: none;
}

.entry-link:focus-visible::after {
  outline: 2px solid var(--elin-highlight);
  outline-offset: -2px;
}

.vp-doc .entry-desc {
  margin: 6px 0 0;
  font-size: 16px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.entry-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 14px;
  margin-top: 10px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.vp-doc .entry-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* 外观见 custom.css 的 .elin-tag；这里只抵消 .vp-doc li 的列表间距与行长限制 */
.vp-doc .entry-tags li {
  margin: 0;
  max-width: none;
}
</style>
