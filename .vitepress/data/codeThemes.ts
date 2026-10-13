// 代码高亮主题：配色直接取自游戏 UI 皮肤的消息色
// （Resources/UI/Skin/Color/SkinColor Main Paper.asset 与 SkinColor Main Dark.asset），
// 和 theme/style.css 里的 --elin-* 色板同源。
//
// 现成的 shiki 浅色主题都是按白底调的，放到羊皮纸底上大半 token 掉到 4.5:1 以下；
// 这里每个前景色都按 style.css 里的 --vp-code-block-bg 核对过对比度（浅色 #e9dfcb、
// 深色 #26282b），并且叠上 diff 增删行和 {n} 高亮行的淡染底色后仍 ≥ 4.5:1 ——
// 所以比单看纯底色时更深一档。改代码块底色或那几种淡染时要回来重新核对。
//
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

// Main Paper：textBad 作关键字、textGreat 作类型、textBlue 作方法、textGood 作字符串、
// textMyth 作数值、textWarning 作属性、textHeader 作标签/节标题、textFlavor 作注释。
export const elinPaper = theme("elin-paper", "light", "#e9dfcb", {
  fg: "#3b3027",
  muted: "#5e5040",
  comment: "#615440",
  keyword: "#8c3734",
  type: "#245b76",
  func: "#1e4889",
  string: "#355a42",
  number: "#434d9c",
  attr: "#655000",
  escape: "#005f6a",
  tag: "#80523a",
  heading: "#80523a",
  inserted: "#3c6149",
  deleted: "#8c3734",
});

// Main Dark：textTopic（金）作关键字、textGreat 作类型、textTag 作方法、textGood 作字符串、
// textWarning 作数值、textFlavor 作属性、textHeader 作标签/节标题。
export const elinDark = theme("elin-dark", "dark", "#26282b", {
  fg: "#ddd6c9",
  muted: "#b4aa9f",
  comment: "#aaa194",
  keyword: "#ddbe87",
  type: "#8cd3e2",
  func: "#b1cee9",
  string: "#94c39c",
  number: "#e9b45a",
  attr: "#e9dba0",
  escape: "#8cd3e2",
  tag: "#e3cf9f",
  heading: "#e3cf9f",
  inserted: "#94c39c",
  deleted: "#e48a7c",
});
