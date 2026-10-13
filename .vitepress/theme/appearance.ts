// 外观菜单（导航栏下拉 + 移动端抽屉）共用的选项与状态。
// 一个选项 = 皮肤 × 明暗；明暗交给 VitePress 的 isDark，皮肤交给 ./skin。

import { computed, onMounted, ref } from "vue";
import { useData } from "vitepress";
import { useSkin, type Skin } from "./skin";

export type AppearanceValue = `${Skin}-${"light" | "dark"}`;

export interface AppearanceOption {
  value: AppearanceValue;
  skin: Skin;
  dark: boolean;
  label: string;
  /** 色样：底色 / 标题色 / 强调色，取自各模式的实际色板 */
  swatch: { bg: string; ink: string; accent: string };
}

export interface AppearanceGroup {
  skin: Skin;
  label: string;
  options: AppearanceOption[];
}

const TEXT = {
  en: { title: "Appearance", elin: "Elin style", classic: "Classic", light: "Light", dark: "Dark", sep: ", " },
  zh: { title: "外观", elin: "Elin 风格", classic: "经典", light: "浅色", dark: "深色", sep: "，" },
  ja: { title: "外観", elin: "Elin スタイル", classic: "クラシック", light: "ライト", dark: "ダーク", sep: "、" },
} as const;

const SWATCH: Record<AppearanceValue, AppearanceOption["swatch"]> = {
  "elin-light": { bg: "#efe6d5", ink: "#80523a", accent: "#9a7a3c" },
  "elin-dark": { bg: "#2b2d30", ink: "#e3cf9f", accent: "#bda068" },
  "classic-light": { bg: "#ffffff", ink: "#3a5ccc", accent: "#38bdf8" },
  "classic-dark": { bg: "#1b1b1f", ink: "#99a2ff", accent: "#38bdf8" },
};

export function useAppearance() {
  const { isDark, lang, theme } = useData();
  const { skin, setSkin, syncSkinFromDom } = useSkin();

  // 挂载前一律视为「未知」：SSR 输出里没有任何选项被选中，水合后才标出当前项，避免属性对不上
  const mounted = ref(false);
  onMounted(() => {
    syncSkinFromDom();
    mounted.value = true;
  });

  const text = computed(() => TEXT[lang.value as keyof typeof TEXT] ?? TEXT.en);
  const title = computed(() => theme.value.darkModeSwitchLabel || text.value.title);

  const groups = computed<AppearanceGroup[]>(() =>
    (["elin", "classic"] as Skin[]).map((s) => ({
      skin: s,
      label: text.value[s],
      options: ([false, true] as const).map((dark) => {
        const value = `${s}-${dark ? "dark" : "light"}` as AppearanceValue;
        return {
          value,
          skin: s,
          dark,
          label: dark ? text.value.dark : text.value.light,
          swatch: SWATCH[value],
        };
      }),
    })),
  );

  const current = computed<AppearanceValue | null>(() =>
    mounted.value ? (`${skin.value}-${isDark.value ? "dark" : "light"}` as AppearanceValue) : null,
  );

  const currentLabel = computed(() => {
    for (const g of groups.value)
      for (const o of g.options)
        if (o.value === current.value) return `${g.label}${text.value.sep}${o.label}`;
    return "";
  });

  function apply(value: AppearanceValue) {
    const [s, mode] = value.split("-") as [Skin, "light" | "dark"];
    if (s !== skin.value) setSkin(s);
    const dark = mode === "dark";
    if (dark !== isDark.value) isDark.value = dark;
  }

  return { title, groups, current, currentLabel, apply, mounted };
}
