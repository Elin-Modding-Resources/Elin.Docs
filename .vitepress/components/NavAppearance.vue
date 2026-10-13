<template>
  <!--
    替换 VitePress 内置的 VPNavAppearance（config.mts 里用 vite alias 指过来），按原组件的 props 分派到三种形态：
      - 不带 row：导航栏里的下拉（AppearanceMenu），参与折叠引擎
      - row：⋯ 菜单里的一组选项，是导航栏下拉被收起后的去处
      - row + screen：移动端汉堡抽屉里的一栏（AppearanceScreen）
    每个分支都是单根元素，VPNavBar / VPNavScreen 传进来的 class（.appearance）会落在它上面
  -->
  <AppearanceScreen v-if="show && row && screen" />
  <AppearanceOptions
    v-else-if="show && row"
    variant="menu"
    class="VPNavAppearance menu-appearance"
  />
  <AppearanceMenu v-else-if="show" :ref="registerBar" :collapsed="isCollapsed" />
</template>

<script setup lang="ts">
import { computed, type ComponentPublicInstance } from "vue";
import { useData } from "vitepress";
// 折叠引擎的 composable 没有从入口导出，但 vitepress 的 exports 放开了 dist/*；
// 与 VPNavBar 引入的是同一个文件，provide / inject 的 key 才对得上
import { useNavOverflow } from "vitepress/dist/client/theme-default/composables/nav-overflow.js";
import AppearanceMenu from "./AppearanceMenu.vue";
import AppearanceOptions from "./AppearanceOptions.vue";
import AppearanceScreen from "./AppearanceScreen.vue";

const props = defineProps<{ row?: boolean; screen?: boolean }>();

const { site } = useData();
const show = computed(
  () =>
    !!site.value.appearance &&
    site.value.appearance !== "force-dark" &&
    site.value.appearance !== "force-auto",
);

// 只有导航栏里的下拉参与折叠；⋯ 菜单与抽屉里的是它的去处
const overflow = props.row ? null : useNavOverflow();
const isCollapsed = computed(() => !!overflow && !overflow.state.appearance);

function registerBar(inst: Element | ComponentPublicInstance | null) {
  const el = inst && "$el" in inst ? inst.$el : inst;
  overflow?.setClusterEl("appearance", el instanceof Element ? el : null);
}
</script>
