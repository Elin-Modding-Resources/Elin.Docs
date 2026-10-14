// ModMaker 的地址与反馈渠道。navbar.ts（构建期）和组件（客户端）都引用，所以同样不许 import node 内置模块。
// 反馈渠道与 ModMaker 自己的 apps/web/src/contact.ts 保持一致。

export const MODMAKER_URL = "https://modmaker.elin-modding.net/";
export const MODMAKER_DISCORD = "https://discord.com/invite/elona";
export const MODMAKER_QQ_GROUP = "872068953";

/** 参考页上那一行提示按页面内容分几种说法；package 只在 basic_mod 正文里用 */
export type ModMakerTipKind =
  | "sheet"
  | "drama"
  | "l10n"
  | "zone"
  | "texture"
  | "pref"
  | "package";
