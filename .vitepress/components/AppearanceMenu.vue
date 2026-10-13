<template>
  <!--
    导航栏里的外观下拉（NavAppearance.vue 在不带 row 时渲染它）。
    根元素保留 VPNavAppearance / VPNavBarAppearance 类名；VPNavBar 会再给它加 .appearance 类和左侧分隔线，
    折叠引擎判定放不下时加 .collapsed，由 VPNavBar 的样式隐藏，选项改到 ⋯ 菜单里出现。
  -->
  <div
    ref="rootRef"
    class="VPNavAppearance VPNavBarAppearance appearance-menu"
    :class="{ open, collapsed }"
    @pointerdown="pointerInside = true"
    @focusout="onFocusOut"
    @keydown.esc="close(true)"
  >
    <button
      ref="triggerRef"
      type="button"
      class="trigger"
      :aria-expanded="open"
      :aria-controls="panelId"
      :aria-label="title"
      :title="currentLabel ? `${title}: ${currentLabel}` : title"
      @click="toggle"
    >
      <!-- 两个图标都渲染，靠 html.dark 切换显隐：SSR 不知道明暗，绑定 class 会造成水合不一致 -->
      <span class="icon vpi-sun sun" aria-hidden="true" />
      <span class="icon vpi-moon moon" aria-hidden="true" />
      <span class="caret vpi-chevron-down" aria-hidden="true" />
    </button>

    <div :id="panelId" class="panel" :hidden="!open">
      <AppearanceOptions @pick="onPick" @confirm="close(true)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, useId, watch } from "vue";
import { useAppearance } from "../theme/appearance";
import AppearanceOptions from "./AppearanceOptions.vue";

const props = defineProps<{ collapsed?: boolean }>();

const { title, currentLabel } = useAppearance();

const open = ref(false);
const rootRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLButtonElement | null>(null);
const panelId = `appearance-panel-${useId()}`;

// 被收进 ⋯ 菜单时，面板不能留在原地开着
watch(
  () => props.collapsed,
  (c) => c && close(false),
);

async function toggle() {
  open.value = !open.value;
  if (!open.value) return;
  // 打开后把焦点放到当前选中的那一项上，方向键可以直接在四个选项间移动
  await nextTick();
  const checked =
    rootRef.value?.querySelector<HTMLInputElement>("input:checked") ??
    rootRef.value?.querySelector<HTMLInputElement>("input");
  checked?.focus();
}

function close(returnFocus = false) {
  if (!open.value) return;
  open.value = false;
  if (returnFocus) triggerRef.value?.focus();
}

// 鼠标 / 触摸点选后收起菜单；键盘用方向键切换时保持打开，方便逐个预览，按 Enter / Esc 收起
function onPick(byPointer: boolean) {
  if (byPointer) close(false);
}

// 在菜单里按下鼠标时，焦点会先从按钮移走（选项的 label 本身不可聚焦，焦点落到 body），
// 这时如果按 focusout 收起，面板在 click 到达之前就消失了，点选永远落空。所以按下期间不处理
const pointerInside = ref(false);

function onFocusOut(e: FocusEvent) {
  if (pointerInside.value) return;
  const next = e.relatedTarget as Node | null;
  if (!next || !rootRef.value?.contains(next)) open.value = false;
}

function onWindowPointerUp() {
  // 等这次点击的 click / change 处理完再复位
  setTimeout(() => (pointerInside.value = false));
}

// 点在菜单外面时收起（focusout 覆盖不到「点在不可聚焦区域」的情况）
function onWindowPointerDown(e: PointerEvent) {
  if (open.value && rootRef.value && !rootRef.value.contains(e.target as Node))
    open.value = false;
}

onMounted(() => {
  window.addEventListener("pointerdown", onWindowPointerDown, { passive: true });
  window.addEventListener("pointerup", onWindowPointerUp, { passive: true });
});
onUnmounted(() => {
  window.removeEventListener("pointerdown", onWindowPointerDown);
  window.removeEventListener("pointerup", onWindowPointerUp);
});
</script>

<style scoped>
/* 与 VitePress 原组件一致：窄屏（< 48rem）只在汉堡抽屉里出现 */
.VPNavBarAppearance {
  display: none;
  position: relative;
}

@media (min-width: 48rem) {
  .VPNavBarAppearance {
    display: flex;
    align-items: center;
  }
}

/* 触发按钮：外形照搬旁边的语言下拉（VPFlyout 的 .button），图标 + 小箭头 */
.trigger {
  display: flex;
  align-items: center;
  gap: 4px;
  height: var(--vp-nav-height);
  padding: 0 12px;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.trigger:hover,
.open .trigger {
  color: var(--vp-c-brand-1);
}

.icon {
  font-size: 16px;
}

/* 写成 .dark .sun 即可：scoped 只给最后一段加 [data-v-…]，祖先的 .dark 照常匹配。
   不要用 :global(.dark) .sun —— Vue 会把整条选择器替换成 .dark，样式就落到 <html> 上了 */
.moon,
.dark .sun {
  display: none;
}

.dark .moon {
  display: inline-block;
}

/* 不旋转：与旁边语言下拉的箭头保持一致 */
.caret {
  font-size: 14px;
}

/* 面板：照 VPMenu 的外观，跟随两种皮肤的 --vp-* 变量 */
.panel {
  position: absolute;
  top: calc(var(--vp-nav-height) / 2 + 20px);
  right: 0;
  z-index: 10;
  min-width: 196px;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
}

.panel[hidden] {
  display: none;
}
</style>
