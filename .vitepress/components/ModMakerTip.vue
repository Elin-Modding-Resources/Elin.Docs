<template>
  <div class="custom-block tip modmaker-tip">
    <p class="custom-block-title">{{ t.title }}</p>
    <p>{{ t.body }}</p>
    <p class="modmaker-tip-links">
      <a :href="SITE" target="_blank" rel="noreferrer">{{ SITE_LABEL }}</a>
      <span class="modmaker-tip-note">
        {{ t.testing }}
        <a :href="DISCORD" target="_blank" rel="noreferrer">Discord</a>
        <template v-if="t.extra">・{{ t.extra }}</template>
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

const SITE = "https://modmaker.elin-modding.net/";
const SITE_LABEL = "modmaker.elin-modding.net";
const DISCORD = "https://discord.gg/elona";

interface TipText {
  title: string;
  body: string;
  testing: string;
  extra?: string;
}

const TEXT: Record<"en" | "zh" | "ja", TipText> = {
  en: {
    title: "Visual editor",
    body: "These sheets can be edited in the browser with Elin ModMaker. A character's sprites, portrait, talk lines, dramas and per-language text are gathered in one place, and cross-sheet references such as race, job and elements come with completion and validation.",
    testing: "Still in testing — feedback is welcome on",
  },
  zh: {
    title: "可视化编辑器",
    body: "这些源表可以用 Elin ModMaker 在浏览器里编辑。同一个角色的贴图、立绘、台词、剧情与各语言译文会聚合到一处，种族、职业、元素这类跨表引用带补全与校验。",
    testing: "目前处于测试阶段，欢迎试用并反馈问题：",
    extra: "模组群 872068953",
  },
  ja: {
    title: "ビジュアルエディタ",
    body: "これらのソースシートは Elin ModMaker を使ってブラウザ上で編集できます。キャラクターのスプライト・立ち絵・セリフ・ドラマ・各言語のテキストが一箇所にまとまり、種族や職業、エレメントといったシート間の参照には補完と検証が付きます。",
    testing: "現在テスト中です。ご意見・不具合の報告はこちらへ：",
  },
};

const { lang } = useData();
const t = computed(() => TEXT[lang.value as keyof typeof TEXT] ?? TEXT.en);
</script>

<style scoped>
.modmaker-tip {
  margin-bottom: 24px;
}

.modmaker-tip-links {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 12px;
}

.modmaker-tip-note {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
