// 代码高亮主题：色相取自游戏 UI 皮肤的消息色
// （Resources/UI/Skin/Color/SkinColor Main Paper.asset 与 SkinColor Main Dark.asset），
// 和 theme/style.css 里的 --elin-* 色板同源。
//
// 每个强调色只保留游戏色的色相（允许偏 ±22°），明度与饱和度在 OKLCH 里重新求：
//   - 对比度：按 style.css 里的 --vp-code-block-bg（浅色 #faf7f1、深色 #1d1f22）
//     以及叠上 {n} 高亮行、diff 增删行、warning/error 行淡染后的底色，全部 ≥ 4.5:1；
//   - 区分度：C# 里挨在一起出现的几类（正文、关键字、类型、方法、字符串、数字）两两拉开，
//     OKLab ΔE 浅色 ≥ 13、深色 ≥ 15（原来最低只有 5 左右，类型和方法几乎同色）；
//   - 明度也分了档：浅色里方法最深、类型最浅，深色里方法压低一档，不只靠色相区分。
// 改代码块底色、那几种淡染，或换某一类的颜色时，要回来重新核对这两项。
//
// 属性（JSON / XML / INI 的键）复用方法的蓝：这些语言里没有方法，C# 的特性名走的是类型。
// 注释不用斜体：注释里常有中日文，CJK 的伪斜体很难看。

type Rule = { scope: string[]; settings: { foreground?: string; fontStyle?: string } };

interface Palette {
  fg: string;
  muted: string; // 标点、运算符
  comment: string;
  keyword: string;
  type: string;
  func: string;
  string: string;
  number: string;
  attr: string; // XML / HTML 属性、特性（attribute）
  escape: string;
  tag: string;
  heading: string;
  inserted: string;
  deleted: string;
}

function rules(p: Palette): Rule[] {
  return [
    { scope: ["comment", "punctuation.definition.comment", "string.comment"], settings: { foreground: p.comment, fontStyle: "" } },
    { scope: ["keyword", "storage", "storage.type", "storage.modifier", "keyword.other.this", "variable.language", "constant.language.null", "keyword.preprocessor", "meta.preprocessor"], settings: { foreground: p.keyword } },
    { scope: ["keyword.operator", "punctuation", "meta.brace", "punctuation.separator", "punctuation.terminator", "punctuation.accessor"], settings: { foreground: p.muted } },
    { scope: ["keyword.operator.expression", "keyword.operator.new", "keyword.operator.word", "keyword.operator.logical.python"], settings: { foreground: p.keyword } },
    { scope: ["keyword.type", "entity.name.type", "support.type", "support.class", "entity.other.inherited-class", "storage.type.cs", "storage.type.primitive", "entity.name.namespace", "entity.name.class"], settings: { foreground: p.type } },
    { scope: ["entity.name.function", "support.function", "meta.function-call.generic", "entity.name.method"], settings: { foreground: p.func } },
    { scope: ["string", "string.quoted", "punctuation.definition.string", "string.unquoted", "markup.inline.raw"], settings: { foreground: p.string } },
    { scope: ["constant.numeric", "constant.language", "constant.character", "constant.other", "support.constant", "variable.other.enummember", "entity.name.variable.enum-member"], settings: { foreground: p.number } },
    { scope: ["constant.character.escape", "string.regexp", "constant.other.placeholder"], settings: { foreground: p.escape } },
    { scope: ["entity.other.attribute-name", "meta.attribute", "support.type.property-name", "meta.object-literal.key", "entity.name.tag.yaml", "keyword.other.definition.ini", "variable.other.key.toml", "support.type.property-name.json"], settings: { foreground: p.attr } },
    { scope: ["entity.name.tag", "punctuation.definition.tag", "entity.name.section", "entity.name.section.group-title.ini", "support.type.property-name.table.toml"], settings: { foreground: p.tag } },
    { scope: ["variable", "variable.other", "variable.parameter", "entity.name.variable", "meta.definition.variable"], settings: { foreground: p.fg } },
    { scope: ["markup.heading", "markup.heading entity.name", "punctuation.definition.heading"], settings: { foreground: p.heading, fontStyle: "bold" } },
    { scope: ["markup.bold"], settings: { fontStyle: "bold" } },
    { scope: ["markup.italic"], settings: { fontStyle: "italic" } },
    { scope: ["markup.underline.link", "string.other.link"], settings: { foreground: p.func } },
    { scope: ["markup.inserted", "meta.diff.header.to-file", "punctuation.definition.inserted"], settings: { foreground: p.inserted } },
    { scope: ["markup.deleted", "meta.diff.header.from-file", "punctuation.definition.deleted"], settings: { foreground: p.deleted } },
    { scope: ["meta.diff.range", "meta.diff.header"], settings: { foreground: p.type } },
    { scope: ["invalid"], settings: { foreground: p.deleted } },
  ];
}

function theme(name: string, type: "light" | "dark", bg: string, p: Palette) {
  return {
    name,
    type,
    colors: { "editor.background": bg, "editor.foreground": p.fg },
    tokenColors: [{ settings: { foreground: p.fg, background: bg } }, ...rules(p)],
  };
}

// Main Paper：textBad 作关键字、textGreat 作类型、按钮高亮蓝作方法、textGood 作字符串、
// textMyth（偏紫）作数值、textHeader 作标签/节标题、textFlavor 作注释。
export const elinPaper = theme("elin-paper", "light", "#faf7f1", {
  fg: "#3b3027",
  muted: "#5e5040",
  comment: "#615440",
  keyword: "#8e1b1f",
  type: "#006887",
  func: "#003d90",
  string: "#005d2f",
  number: "#614eb0",
  attr: "#003d90",
  escape: "#703400",
  tag: "#994200",
  heading: "#80523a",
  inserted: "#3c6149",
  deleted: "#8c3734",
});

// Main Dark：textTopic（金）作关键字、textGreat 作类型、textMyth 作方法、textGood 作字符串、
// textBad 作数值（原来的琥珀和关键字的金撞色）、textTag 作属性、textHeader 作标签/节标题、
// textWarning 作转义（嵌在绿色字符串里，要和它拉开）。
export const elinDark = theme("elin-dark", "dark", "#1d1f22", {
  fg: "#ddd6c9",
  muted: "#b4aa9f",
  comment: "#aaa194",
  keyword: "#d6ac43",
  type: "#3ed9f7",
  func: "#9aa4fe",
  string: "#57be83",
  number: "#f78c9a",
  attr: "#b8daff",
  escape: "#fcc464",
  tag: "#e6be56",
  heading: "#e3cf9f",
  inserted: "#94c39c",
  deleted: "#e48a7c",
});
