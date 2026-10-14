<template>
  <div class="modmaker-tip" :class="{ 'modmaker-tip-package': kind === 'package' }" role="note">
    <svg class="modmaker-tip-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 16v-3l9-9 3 3-9 9H4z M11 6l3 3" />
    </svg>
    <div class="modmaker-tip-body">
      <span class="modmaker-tip-text">{{ body }}</span>
      <span v-if="note" class="modmaker-tip-note">{{ note }}</span>
    </div>
    <a class="modmaker-tip-link" :href="MODMAKER_URL" target="_blank" rel="noreferrer">
      {{ t.open }}<span class="vp-external-link-icon" aria-hidden="true" />
      <span class="visually-hidden">{{ t.newTab }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { MODMAKER_URL, type ModMakerTipKind } from "../data/modmaker";

// 参考页由 Layout 的 doc-before 插槽按 docTips.ts 注入（手机上由 custom.css 隐藏）；
// package 写在 basic_mod.md 正文里，多一句 Program Files 的说明
const { kind = "sheet" } = defineProps<{ kind?: ModMakerTipKind }>();

interface TipText {
  open: string;
  newTab: string;
  body: Record<ModMakerTipKind, string>;
  packageNote: string;
}

const TEXT: Record<"en" | "zh" | "ja", TipText> = {
  en: {
    open: "Open ModMaker",
    newTab: "(opens in a new tab)",
    body: {
      sheet:
        "Elin ModMaker edits the source sheets on this page through forms, with autocomplete and validation for fields that point to other sheets.",
      drama:
        "Elin ModMaker can edit drama files and jump between a drama and the characters that use it.",
      l10n:
        "Elin ModMaker edits each language's text in one place and can export or import translations as Paratranz JSON or xlsx.",
      zone:
        "Elin ModMaker edits the Zone sheet through forms. It can only preview map files (.z).",
      texture: "Elin ModMaker can add images like these to a mod and preview them.",
      pref: "Elin ModMaker has a .pref editor with a preview of the sprite.",
      package:
        'Elin ModMaker can do most of this page for you. "New mod" creates the mod folder and its package.xml, and on the Overview tab you fill in package.xml through a form and pick preview.jpg. The sections below still explain what each field means.',
    },
    packageNote:
      "Chrome and Edge cannot open folders inside Program Files, where Steam installs games by default. Move Elin to a Steam library on another drive, or keep the mod elsewhere and copy its folder into Package when you are done.",
  },
  zh: {
    open: "打开 ModMaker",
    newTab: "（在新标签页打开）",
    body: {
      sheet: "本页的源表可以在 Elin ModMaker 里用表单编辑，指向其他表的字段带补全和校验。",
      drama: "Elin ModMaker 可以编辑剧情文件，也能在剧情和使用它的角色之间来回跳转。",
      l10n: "Elin ModMaker 把各语言的文本放在一处编辑，译文可以按 Paratranz JSON 或 xlsx 格式导出、导入。",
      zone: "Zone 表可以在 Elin ModMaker 里用表单编辑；地图文件（.z）只能预览。",
      texture: "Elin ModMaker 可以把这类图片加进 mod 并预览。",
      pref: "Elin ModMaker 有 .pref 编辑器，改参数时可以预览贴图。",
      package:
        "本页的大部分步骤可以交给 Elin ModMaker：“新建 Mod”会创建 mod 文件夹和 package.xml，在“概览”页可以用表单填写 package.xml、选择 preview.jpg。下文仍会逐项说明各字段的含义。",
    },
    packageNote:
      "Chrome 和 Edge 打不开 Program Files 下的文件夹，而 Steam 默认把游戏装在那里。可以把 Elin 移到其他驱动器的 Steam 库，或者在别处编辑 mod，完成后把整个文件夹复制进 Package。",
  },
  ja: {
    open: "ModMaker を開く",
    newTab: "（新しいタブで開きます）",
    body: {
      sheet:
        "このページのソースシートは Elin ModMaker のフォームで編集でき、別のシートを参照する項目には補完と検証が付きます。",
      drama:
        "Elin ModMaker ではドラマファイルを編集でき、ドラマとそれを使うキャラクターの間を行き来できます。",
      l10n:
        "Elin ModMaker では各言語のテキストを一か所で編集でき、翻訳は Paratranz JSON か xlsx で書き出し・読み込みできます。",
      zone:
        "Zone シートは Elin ModMaker のフォームで編集できます。マップファイル（.z）はプレビューのみです。",
      texture: "Elin ModMaker では、こうした画像を Mod に追加してプレビューできます。",
      pref: "Elin ModMaker には .pref エディタがあり、スプライトをプレビューしながら編集できます。",
      package:
        "このページの手順の多くは Elin ModMaker に任せられます。「Mod を新規作成」で Mod フォルダと package.xml が作られ、「概要」タブでは package.xml をフォームで入力し、preview.jpg を選べます。各項目の意味は引き続き以下で説明します。",
    },
    packageNote:
      "Chrome と Edge は Program Files 内のフォルダを開けません。Steam はゲームを既定でそこにインストールします。Elin を別ドライブの Steam ライブラリへ移すか、別の場所で Mod を編集し、完成後にフォルダごと Package へコピーしてください。",
  },
};

const { lang } = useData();
const t = computed(() => TEXT[lang.value as keyof typeof TEXT] ?? TEXT.en);
const body = computed(() => t.value.body[kind]);
const note = computed(() => (kind === "package" ? t.value.packageNote : ""));
</script>

<style scoped>
/* 不用 .custom-block.tip：那套语义色是作者写的正文提示，这里是站点插的工具推荐，
   做成一条中性的纸条，左边一支金色的笔，不与正文的提示块混在一起。
   参考页上只占一行，标题紧跟其后；package 那份在正文里，内容多一段，改成上对齐。
   元素全用 div / span：放进 .vp-doc 时不吃正文 p 的外边距与 612px 限宽 */
.modmaker-tip {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 24px;
  padding: 10px 16px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  background-color: var(--elin-paper-raised);
  border: 1px solid var(--elin-line-soft);
  border-radius: 6px;
}

.modmaker-tip.modmaker-tip-package {
  align-items: flex-start;
  margin: 16px 0;
  padding: 14px 18px;
  color: var(--vp-c-text-1);
}

.modmaker-tip-icon {
  flex: none;
  width: 18px;
  height: 18px;
  fill: none;
  stroke: var(--elin-gold);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.modmaker-tip-package .modmaker-tip-icon {
  margin-top: 3px;
}

.modmaker-tip-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.modmaker-tip-note {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

/* 类名写两遍压过 .vp-doc a（0,1,1）：package 那份在正文里 */
.modmaker-tip-link.modmaker-tip-link {
  flex: none;
  font-weight: 600;
  white-space: nowrap;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.modmaker-tip-link.modmaker-tip-link:hover,
.modmaker-tip-link.modmaker-tip-link:focus-visible {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* VitePress 给外链图标定的颜色是 text-3，选择器 (0,3,1)；这里写到 (0,4,0)，跟链接同色 */
.modmaker-tip .modmaker-tip-link .vp-external-link-icon::after {
  color: inherit;
}

/* 窄栏里正文和链接排不下一行时，链接换到下面，与正文左对齐 */
@media (max-width: 959px) {
  .modmaker-tip {
    flex-wrap: wrap;
  }

  .modmaker-tip-body {
    flex-basis: calc(100% - 30px);
  }

  .modmaker-tip-link.modmaker-tip-link {
    margin-left: 30px;
  }
}
</style>
