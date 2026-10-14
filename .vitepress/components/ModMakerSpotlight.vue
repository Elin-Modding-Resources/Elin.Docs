<template>
  <section class="modmaker-spotlight" aria-labelledby="modmaker-spotlight-title">
    <div class="modmaker-spotlight-intro">
      <h2 id="modmaker-spotlight-title" class="modmaker-spotlight-title">Elin ModMaker</h2>
      <div class="modmaker-spotlight-pitch">{{ t.pitch }}</div>
      <a class="modmaker-spotlight-cta" :href="MODMAKER_URL" target="_blank" rel="noreferrer">
        {{ t.open }}<span class="vp-external-link-icon" aria-hidden="true" />
        <span class="visually-hidden">{{ t.newTab }}</span>
      </a>
    </div>

    <ul class="modmaker-spotlight-areas">
      <li v-for="area in t.areas" :key="area.name" class="modmaker-spotlight-area">
        <span class="modmaker-spotlight-area-name">{{ area.name }}</span>
        <span class="modmaker-spotlight-area-list">{{ area.list }}</span>
      </li>
    </ul>

    <div class="modmaker-spotlight-meta">
      <span>{{ t.requirement }}</span>
      <span>
        {{ t.feedbackBefore }}<a :href="MODMAKER_DISCORD" target="_blank" rel="noreferrer">Discord</a>{{ t.feedbackAfter }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { MODMAKER_DISCORD, MODMAKER_QQ_GROUP, MODMAKER_URL } from "../data/modmaker";

interface SpotlightText {
  pitch: string;
  open: string;
  newTab: string;
  areas: { name: string; list: string }[];
  requirement: string;
  feedbackBefore: string;
  feedbackAfter: string;
}

// 能力格里的表名照 ModMaker 的标签页分组（角色 / 物品 / 数据 / 地块 / 贴图），只列各组最常用的几张
const TEXT: Record<"en" | "zh" | "ja", SpotlightText> = {
  en: {
    pitch:
      "Edit Elin mods in your browser. Open a mod folder, fill in its source sheets through forms, and save the changes straight back to the files. Fields that point to another sheet, such as a character's race or job, get autocomplete and validation.",
    open: "Open ModMaker",
    newTab: "(opens in a new tab)",
    areas: [
      { name: "Characters & drama", list: "Chara, Race, Job, talk lines, drama files" },
      { name: "Items & data", list: "Thing, Food, Recipe, Religion, Element" },
      { name: "Tiles & zones", list: "Material, Block, Floor, Obj, Zone" },
      { name: "Art & text", list: "Sprites, portraits, .pref files, translations" },
    ],
    requirement: "Needs desktop Chrome or Edge",
    feedbackBefore: "In testing. Report problems on ",
    feedbackAfter: "",
  },
  zh: {
    pitch:
      "在浏览器里编辑 Elin 模组：打开 mod 文件夹，用表单填写源表，保存时直接写回文件。指向其他表的字段（比如角色的种族、职业）带补全和校验。",
    open: "打开 ModMaker",
    newTab: "（在新标签页打开）",
    areas: [
      { name: "角色与剧情", list: "Chara、Race、Job、台词、剧情文件" },
      { name: "物品与数据", list: "Thing、Food、Recipe、Religion、Element" },
      { name: "瓦片与区域", list: "Material、Block、Floor、Obj、Zone" },
      { name: "贴图与译文", list: "精灵图、立绘、.pref 文件、各语言文本" },
    ],
    requirement: "需要桌面版 Chrome 或 Edge",
    feedbackBefore: "测试中，问题可以反馈到 ",
    // 群号不能和“群”字拆到两行
    feedbackAfter: ` 或 QQ 群\u00a0${MODMAKER_QQ_GROUP}`,
  },
  ja: {
    pitch:
      "ブラウザで Elin の Mod を編集できます。Mod フォルダを開いてソースシートをフォームで入力すると、変更は保存時にそのままファイルへ書き戻されます。キャラクターの種族や職業のように別のシートを参照する項目には、補完と検証が付きます。",
    open: "ModMaker を開く",
    newTab: "（新しいタブで開きます）",
    areas: [
      { name: "キャラクターとドラマ", list: "Chara、Race、Job、セリフ、ドラマファイル" },
      { name: "アイテムとデータ", list: "Thing、Food、Recipe、Religion、Element" },
      { name: "タイルとゾーン", list: "Material、Block、Floor、Obj、Zone" },
      { name: "画像とテキスト", list: "スプライト、ポートレート、.pref ファイル、各言語のテキスト" },
    ],
    requirement: "デスクトップ版の Chrome か Edge が必要です",
    feedbackBefore: "テスト中です。不具合の報告は ",
    feedbackAfter: " へ",
  },
};

const { lang } = useData();
const t = computed(() => TEXT[lang.value as keyof typeof TEXT] ?? TEXT.en);
</script>

<style scoped>
/* 首页的工具推荐：与 hero 立绘同一套窗框（深一档的纸面 + 金色双线框），放在文章流之前。
   这里在 .VPHome .vp-doc 里，正文的 h2 / ul / p / a 样式都会套进来，
   所以选择器一律带上 .modmaker-spotlight 前缀，特异度 (0,3,0) 压过 .VPHome .vp-doc h2（0,2,1） */
.modmaker-spotlight {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
  margin: 0 0 48px;
  padding: 24px 22px 20px;
  background-color: var(--elin-paper-2);
  background-image: var(--elin-paper-texture);
  background-size: 512px 512px;
  border: 2px solid var(--elin-gold);
  border-radius: 3px;
  box-shadow:
    inset 0 0 0 4px var(--elin-paper-2),
    inset 0 0 0 5px var(--elin-gold-soft),
    var(--vp-shadow-2);
}

@media (min-width: 640px) {
  .modmaker-spotlight {
    padding: 28px 32px 22px;
  }
}

@media (min-width: 960px) {
  .modmaker-spotlight {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
    column-gap: 40px;
    align-items: start;
  }
}

.modmaker-spotlight .modmaker-spotlight-title {
  margin: 0 0 10px;
  padding: 0;
  border: 0;
  font-family: var(--elin-font-display);
  font-size: 26px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: 0;
  color: var(--elin-header);
}

.modmaker-spotlight .modmaker-spotlight-pitch {
  margin: 0 0 20px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--vp-c-text-1);
}

/* 主按钮与 hero 的「快速开始」同一张游戏按钮贴图（见 custom.css 首页一节） */
.modmaker-spotlight .modmaker-spotlight-cta {
  display: inline-flex;
  align-items: center;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  font-weight: 600;
  color: var(--elin-button-text);
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: 0;
  border-image: url("../theme/assets/button.png") 12 fill / 12px;
}

.modmaker-spotlight .modmaker-spotlight-cta:hover,
.modmaker-spotlight .modmaker-spotlight-cta:focus-visible {
  color: var(--elin-button-text);
  border-image-source: url("../theme/assets/button-highlight.png");
}

.dark .modmaker-spotlight .modmaker-spotlight-cta {
  border-image: url("../theme/assets/button-dark.png") 24 fill / 12px;
}

.dark .modmaker-spotlight .modmaker-spotlight-cta:hover,
.dark .modmaker-spotlight .modmaker-spotlight-cta:focus-visible {
  border-image-source: url("../theme/assets/button-dark.png");
  filter: brightness(1.15);
}

/* VitePress 给外链图标定的颜色是 text-3，选择器 (0,3,1)；按钮上要跟文字同色，这里写到 (0,4,0) */
.modmaker-spotlight .modmaker-spotlight-cta .vp-external-link-icon::after {
  color: inherit;
}

/* 能力格：2×2，格与格之间一道细线，窄屏退成单列 */
.modmaker-spotlight .modmaker-spotlight-areas {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--elin-line-soft);
}

@media (min-width: 520px) {
  .modmaker-spotlight .modmaker-spotlight-areas {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 24px;
  }
}

@media (min-width: 960px) {
  .modmaker-spotlight .modmaker-spotlight-areas {
    margin-top: 6px;
  }
}

.modmaker-spotlight .modmaker-spotlight-area {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: 12px 0;
  border-bottom: 1px solid var(--elin-line-soft);
}

.modmaker-spotlight-area-name {
  font-family: var(--elin-font-display);
  font-weight: 500;
  color: var(--elin-header);
}

.modmaker-spotlight-area-list {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.modmaker-spotlight .modmaker-spotlight-meta {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.modmaker-spotlight .modmaker-spotlight-meta a {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.modmaker-spotlight .modmaker-spotlight-meta a:hover {
  color: var(--vp-c-brand-2);
}
</style>

<style>
/* 经典皮肤：不用窗框和按钮贴图，做成原版的圆角卡片 + 靛蓝胶囊按钮。
   不能写进 scoped 块（:global() 会把整条选择器换成 <html>），见 CLAUDE.md。
   按钮那几条重复一次类名：scoped 里 .dark … .modmaker-spotlight-cta[data-v] 也是 (0,4,0)，
   同特异度时要看样式表先后，构建后的顺序靠不住 */
:root[data-skin="classic"] .modmaker-spotlight {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: none;
}

:root[data-skin="classic"] .modmaker-spotlight.modmaker-spotlight .modmaker-spotlight-cta {
  border: 0;
  border-image: none;
  border-radius: 20px;
  padding: 0 22px;
  line-height: 40px;
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  filter: none;
}

:root[data-skin="classic"] .modmaker-spotlight.modmaker-spotlight .modmaker-spotlight-cta:hover,
:root[data-skin="classic"] .modmaker-spotlight.modmaker-spotlight .modmaker-spotlight-cta:focus-visible {
  background-color: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-hover-text);
}
</style>
