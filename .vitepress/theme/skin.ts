// 站点皮肤：elin = 游戏风格（Main Paper / Main Dark），classic = 改版前的靛蓝原版。
// 皮肤与明暗是两个独立维度：明暗仍由 VitePress 的 isDark（<html class="dark">）管理，
// 皮肤写在 <html data-skin="…">，CSS 用这个属性分流（见 style.css / classic.css）。
//
// 首屏前由 config.mts 的 head 内联脚本（SKIN_BOOT_SCRIPT）读 localStorage 设好 data-skin，
// 所以这里只在客户端挂载后同步状态，不在 setup 期间读 DOM —— 否则 SSR 与首次水合对不上。
// 本文件会被客户端打包，不许 import node 内置模块。

import { ref } from "vue";

export type Skin = "elin" | "classic";

export const SKIN_STORAGE_KEY = "elin-docs-skin";
export const DEFAULT_SKIN: Skin = "elin";

/** 注入 <head> 的同步脚本：必须在首次绘制前执行，否则经典皮肤用户会先闪一屏游戏皮肤 */
export const SKIN_BOOT_SCRIPT = `try{document.documentElement.dataset.skin=localStorage.getItem(${JSON.stringify(
  SKIN_STORAGE_KEY,
)})==="classic"?"classic":"elin"}catch(e){document.documentElement.dataset.skin="elin"}`;

// 模块级单例：导航栏菜单、移动端抽屉、评论区主题都读同一份
const skin = ref<Skin>(DEFAULT_SKIN);
let synced = false;

function readDomSkin(): Skin {
  return document.documentElement.dataset.skin === "classic" ? "classic" : "elin";
}

/** 挂载后调用一次，把 ref 对齐到 head 脚本已经设好的 data-skin */
export function syncSkinFromDom() {
  if (synced || typeof document === "undefined") return;
  synced = true;
  skin.value = readDomSkin();
}

export function setSkin(next: Skin) {
  skin.value = next;
  document.documentElement.dataset.skin = next;
  try {
    localStorage.setItem(SKIN_STORAGE_KEY, next);
  } catch {}
}

export function useSkin() {
  return { skin, setSkin, syncSkinFromDom };
}
