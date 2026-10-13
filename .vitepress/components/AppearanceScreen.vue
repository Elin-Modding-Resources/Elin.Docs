<template>
  <!-- 替换 VitePress 内置的 VPNavScreenAppearance（移动端 / 「更多」抽屉里的外观一栏） -->
  <div
    v-if="
      site.appearance &&
      site.appearance !== 'force-dark' &&
      site.appearance !== 'force-auto'
    "
    class="VPNavScreenAppearance"
  >
    <p :id="titleId" class="text">{{ title }}</p>

    <div class="groups" role="group" :aria-labelledby="titleId">
      <fieldset v-for="group in groups" :key="group.skin" class="group">
        <legend class="group-label">{{ group.label }}</legend>
        <div class="options">
          <label
            v-for="option in group.options"
            :key="option.value"
            class="option"
            :class="{ checked: current === option.value }"
          >
            <input
              type="radio"
              class="visually-hidden"
              :name="radioName"
              :value="option.value"
              :checked="current === option.value"
              @change="apply(option.value)"
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
            <span>{{ option.label }}</span>
          </label>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useId } from "vue";
import { useData } from "vitepress";
import { useAppearance } from "../theme/appearance";

const { site } = useData();
const { title, groups, current, apply } = useAppearance();

const uid = useId();
const titleId = `appearance-screen-title-${uid}`;
const radioName = `appearance-screen-${uid}`;
</script>

<style scoped>
.VPNavScreenAppearance {
  border-radius: 8px;
  padding: 12px 14px 14px 16px;
  background-color: var(--vp-c-bg-soft);
}

.text {
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.groups {
  display: grid;
  gap: 10px;
  margin-top: 6px;
}

.group {
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
}

.group-label {
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

/* 触摸目标至少 44px 高 */
.option {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  font-size: 14px;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.option.checked {
  border-color: var(--vp-c-brand-1);
  box-shadow: inset 0 0 0 1px var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.option:has(input:focus-visible) {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

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
</style>
