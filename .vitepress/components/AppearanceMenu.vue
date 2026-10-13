<template>
  <!--
    替换 VitePress 内置的 VPNavBarAppearance（config.mts 里用 vite alias 指过来）。
    根元素保留 VPNavBarAppearance 类名：VPNavBar 会给它加 .appearance 类和左侧分隔线，
    custom.css「导航栏自适应折叠」一节也按这两个类名控制它的显隐。
  -->
  <div
    v-if="
      site.appearance &&
      site.appearance !== 'force-dark' &&
      site.appearance !== 'force-auto'
    "
    ref="rootRef"
    class="VPNavBarAppearance appearance-menu"
    :class="{ open }"
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
      <!-- 用 div[role=group] 而不是 fieldset：fieldset 的上边框会被 legend 打断，分隔线看起来像挂在标题旁边。
           四个 radio 同名，方向键可以在两组之间连续移动 -->
      <div
        v-for="group in groups"
        :key="group.skin"
        class="group"
        role="group"
        :aria-labelledby="`${panelId}-${group.skin}`"
      >
        <p :id="`${panelId}-${group.skin}`" class="group-label">{{ group.label }}</p>
        <label
          v-for="option in group.options"
          :key="option.value"
          class="option"
          :class="{ checked: current === option.value }"
          @pointerdown="pointerChoosing = true"
        >
          <input
            type="radio"
            class="visually-hidden"
            :name="radioName"
            :value="option.value"
            :checked="current === option.value"
            @change="onChange(option.value)"
            @click="onClickOption"
            @keydown.enter.prevent="close(true)"
          />
          <span
            class="swatch"
            aria-hidden="true"
            :style="{
              '--sw-bg': option.swatch.bg,
              '--sw-ink': option.swatch.ink,
              '--sw-accent': option.swatch.accent,
            }"
          />
          <span class="option-text">{{ option.label }}</span>
          <span class="mark" aria-hidden="true" />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, useId } from "vue";
import { useData } from "vitepress";
import { useAppearance, type AppearanceValue } from "../theme/appearance";

const { site } = useData();
const { title, groups, current, currentLabel, apply } = useAppearance();

const open = ref(false);
const rootRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLButtonElement | null>(null);
const uid = useId();
const panelId = `appearance-panel-${uid}`;
const radioName = `appearance-${uid}`;

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

function onChange(value: AppearanceValue) {
  apply(value);
}

// 鼠标 / 触摸点选后收起菜单；键盘用方向键切换时保持打开，方便逐个预览，按 Enter / Esc 收起。
// 点 label 时浏览器转发给 radio 的 click 事件分不出来源，所以在 label 的 pointerdown 上打标记
const pointerChoosing = ref(false);

function onClickOption() {
  if (pointerChoosing.value) close(false);
  pointerChoosing.value = false;
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
/* 与 VitePress 原组件一致：窄于 1280 时默认隐藏，实际显隐由 custom.css 的容器查询接管 */
.VPNavBarAppearance {
  display: none;
  position: relative;
}

@media (min-width: 1280px) {
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

.group + .group {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--vp-c-divider);
}

.group-label {
  padding: 2px 8px 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: background-color 0.15s;
}

.option:hover {
  background-color: var(--vp-c-default-soft);
}

.option:has(input:focus-visible) {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.option.checked {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

/* 色样：该模式的底色，左上一道标题色、底边一道强调色 —— 不用读文字也能认出是哪一套 */
.swatch {
  position: relative;
  flex: none;
  width: 26px;
  height: 18px;
  border-radius: 4px;
  background-color: var(--sw-bg);
  box-shadow:
    inset 0 0 0 1px rgb(0 0 0 / 0.14),
    inset 0 -3px 0 var(--sw-accent);
}

.swatch::before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  width: 12px;
  height: 3px;
  border-radius: 1px;
  background-color: var(--sw-ink);
}

.option-text {
  flex: 1;
}

/* 选中标记：一个对勾，用边框画，免得依赖图标字体 */
.mark {
  width: 6px;
  height: 11px;
  margin-right: 4px;
  border: solid transparent;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-1px, -1px);
}

.option.checked .mark {
  border-color: currentColor;
}

</style>
