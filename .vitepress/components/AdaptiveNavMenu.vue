<script lang="ts" setup>
import type { DefaultTheme } from "vitepress/theme";
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick } from "vue";
import { useData } from "vitepress";
import VPNavBarMenuLink from "vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue";
import VPNavBarMenuGroup from "vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue";
import VPFlyout from "vitepress/dist/client/theme-default/components/VPFlyout.vue";

const SAFE_GAP = 8;
const OVERFLOW_ICON = "vpi-layout-list";

const { theme, page, lang } = useData();

const items = computed<DefaultTheme.NavItem[]>(() => theme.value.nav ?? []);

const visibleCount = ref(-1);

const visibleItems = computed(() =>
  visibleCount.value < 0
    ? items.value
    : items.value.slice(0, visibleCount.value),
);

const overflowItems = computed(() =>
  visibleCount.value < 0 ? [] : items.value.slice(visibleCount.value),
);

const moreLabel = computed(() => {
  if (lang.value.startsWith("ja")) return "その他のメニュー";
  if (lang.value.startsWith("zh")) return "更多菜单";
  return "More navigation";
});

const itemActive = ref<boolean[]>([]);

function readActive() {
  const el = measurer.value;
  if (!el) return;
  const cells = Array.from(el.children) as HTMLElement[];
  itemActive.value = cells
    .slice(0, -1)
    .map((cell) => !!cell.firstElementChild?.classList.contains("active"));
}

const overflowActive = computed(() =>
  visibleCount.value < 0
    ? false
    : itemActive.value.slice(visibleCount.value).some(Boolean),
);

const container = ref<HTMLElement>();
const measurer = ref<HTMLElement>();

let itemWidths: number[] = [];
let moreWidth = 0;

function measure() {
  const el = measurer.value;
  if (!el) return;

  const cells = Array.from(el.children) as HTMLElement[];
  if (cells.length < 1) return;

  itemWidths = cells
    .slice(0, -1)
    .map((cell) => cell.getBoundingClientRect().width);
  moreWidth = cells[cells.length - 1].getBoundingClientRect().width;
}

function occupiedWidth(el: HTMLElement): number {
  const cs = getComputedStyle(el);
  if (cs.display === "none") return 0;
  if ((parseFloat(cs.flexGrow) || 0) <= 0) {
    return el.getBoundingClientRect().width;
  }

  const gap = parseFloat(cs.columnGap) || 0;
  let w = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
  const kids = (Array.from(el.children) as HTMLElement[]).filter(
    (k) => getComputedStyle(k).display !== "none",
  );
  kids.forEach((k, i) => {
    w += k.getBoundingClientRect().width + (i > 0 ? gap : 0);
  });
  return w;
}

function availableWidth(): number {
  const el = container.value;
  if (!el) return Infinity;

  const body = el.parentElement;
  const content = el.closest(".content") as HTMLElement | null;
  if (!body || !content) return Infinity;

  const cs = getComputedStyle(content);
  const inner =
    content.clientWidth -
    (parseFloat(cs.paddingLeft) || 0) -
    (parseFloat(cs.paddingRight) || 0);

  let siblings = 0;
  for (const child of Array.from(body.children) as HTMLElement[]) {
    if (child === el) continue;
    siblings += occupiedWidth(child);
  }

  return inner - siblings - SAFE_GAP;
}

function recompute() {
  const el = container.value;
  if (!el) return;

  if (getComputedStyle(el).display === "none") return;

  const n = itemWidths.length;
  if (n === 0) {
    visibleCount.value = -1;
    return;
  }

  const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
  const avail = availableWidth();

  const total = itemWidths.reduce((a, b) => a + b, 0) + gap * (n - 1);
  if (total <= avail) {
    visibleCount.value = -1;
    return;
  }

  const budget = avail - moreWidth - gap;
  let used = 0;
  let count = 0;
  for (const w of itemWidths) {
    const next = used + w + (count > 0 ? gap : 0);
    if (next > budget) break;
    used = next;
    count++;
  }
  visibleCount.value = count;
}

function refresh() {
  measure();
  readActive();
  recompute();
}

let observer: ResizeObserver | undefined;

function observe() {
  observer?.disconnect();
  const el = container.value;
  if (!el || typeof ResizeObserver === "undefined") return;

  observer = new ResizeObserver(() => recompute());

  const content = el.closest(".content");
  if (content) observer.observe(content);

  const body = el.parentElement;
  if (body) {
    for (const child of Array.from(body.children)) {
      if (child !== el) observer.observe(child);
    }
  }
}

onMounted(() => {
  refresh();
  observe();

  document.fonts?.ready.then(refresh);
});

onBeforeUnmount(() => observer?.disconnect());

watch(
  () => page.value.relativePath,
  async () => {
    await nextTick();
    readActive();
  },
);

watch(items, async () => {
  visibleCount.value = -1;
  await nextTick();
  refresh();
  observe();
});
</script>

<template>
  <nav
    v-if="items.length"
    ref="container"
    class="AdaptiveNavMenu"
    aria-label="Main Navigation"
  >
    <template v-for="item in visibleItems" :key="JSON.stringify(item)">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" />
      <component
        v-else-if="'component' in item"
        :is="item.component"
        v-bind="item.props"
      />
      <VPNavBarMenuGroup v-else :item="item" />
    </template>

    <VPFlyout
      v-if="overflowItems.length"
      class="overflow-flyout"
      :class="{ active: overflowActive }"
      :icon="OVERFLOW_ICON"
      :items="overflowItems"
      :label="moreLabel"
    />

    <div class="measure-host" aria-hidden="true">
      <div ref="measurer" class="measurer">
        <div
          v-for="item in items"
          :key="'measure-' + JSON.stringify(item)"
          class="cell"
        >
          <VPNavBarMenuLink v-if="'link' in item" :item="item" />
          <component
            v-else-if="'component' in item"
            :is="item.component"
            v-bind="item.props"
          />
          <VPNavBarMenuGroup v-else :item="item" />
        </div>
        <div class="cell">
          <VPFlyout :icon="OVERFLOW_ICON" :items="[]" />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.AdaptiveNavMenu {
  display: none;
  align-items: center;
  flex: 0 0 auto;
  position: relative;
}

@media (min-width: 768px) {
  .AdaptiveNavMenu {
    display: flex;
  }
}

.measure-host {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  overflow: hidden;
}

.measurer {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  /* 测的是各项固有宽度，容器 gap 由 recompute 单独计入 */
  column-gap: 0;
  visibility: hidden;
  pointer-events: none;
  white-space: nowrap;
}

.measurer .cell {
  display: flex;
  flex: 0 0 auto;
}
</style>
