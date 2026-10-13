<template>
  <!--
    外观的四个选项（两套皮肤 × 浅色 / 深色），导航栏下拉面板与 ⋯ 菜单共用。
    variant="menu" 时自带组标题，排版对齐 ⋯ 菜单里其他分组（语言、溢出的导航项）。
    类名避开 group / item / menu / panel：⋯ 菜单的 VPMenu 用 :deep(.group) / :deep(.item) 排版；
    AppearanceMenu 的 scoped 样式里有 .panel，而父组件的 scope 属性会落到本组件根元素上，同名就会被一起套上
  -->
  <div
    class="AppearanceOptions"
    :class="{ 'in-menu': variant === 'menu' }"
    :role="variant === 'menu' ? 'group' : undefined"
    :aria-labelledby="variant === 'menu' ? `${uid}-title` : undefined"
  >
    <p v-if="variant === 'menu'" :id="`${uid}-title`" class="title">{{ title }}</p>

    <!-- 用 div[role=group] 而不是 fieldset：fieldset 的上边框会被 legend 打断，分隔线看起来像挂在标题旁边。
         四个 radio 同名，方向键可以在两组之间连续移动 -->
    <div
      v-for="group in groups"
      :key="group.skin"
      class="skin-group"
      role="group"
      :aria-labelledby="`${uid}-${group.skin}`"
    >
      <p :id="`${uid}-${group.skin}`" class="skin-label">{{ group.label }}</p>
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
          :name="`${uid}-radio`"
          :value="option.value"
          :checked="current === option.value"
          @change="apply(option.value)"
          @click="onClickOption"
          @keydown.enter.prevent="emit('confirm')"
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
</template>

<script setup lang="ts">
import { ref, useId } from "vue";
import { useAppearance } from "../theme/appearance";

withDefaults(defineProps<{ variant?: "panel" | "menu" }>(), { variant: "panel" });

const emit = defineEmits<{
  /** 选中了某一项；byPointer 区分鼠标 / 触摸点选与键盘方向键切换 */
  pick: [byPointer: boolean];
  /** 在选项上按了 Enter */
  confirm: [];
}>();

const { title, groups, current, apply } = useAppearance();
const uid = `appearance-${useId()}`;

// 点 label 时浏览器转发给 radio 的 click 事件分不出来源，所以在 label 的 pointerdown 上打标记
const pointerChoosing = ref(false);

function onClickOption() {
  emit("pick", pointerChoosing.value);
  pointerChoosing.value = false;
}
</script>

<style scoped>
.skin-group + .skin-group {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--vp-c-divider);
}

.skin-label {
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
  white-space: nowrap;
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

/* ⋯ 菜单：标题照 VPMenu 的分组标题，选项的左右内边距对齐旁边的菜单链接 */
/* 与上游 ⋯ 菜单里的外观一行同宽；⋯ 菜单按内容收缩宽度，不设的话选中标记会贴着文字 */
.in-menu {
  min-width: 11rem;
}

.in-menu .title {
  padding: 0 0.75rem;
  line-height: 2.2857143;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.in-menu .skin-label {
  padding: 2px 0.75rem;
}

.in-menu .option {
  padding: 6px 0.75rem;
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
