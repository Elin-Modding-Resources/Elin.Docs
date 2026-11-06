---
title: 动画贴图
author: DK
description: How to make animated sprites for character and items.
date: 2026/4/9 9:00
tags: Texture/Animation
---

# 准备工作

角色和物品，都可以使用动画贴图。

要将静态图转换为动画贴图，你需要提供一张水平排列的精灵表（Sprite Sheet）以及一个 `.ini` 文件。

`.ini` 的文件名、水平精灵表图片的文件名、加载mod的Excel表里的id列，这三者应一致。

精灵表例子：

![](./assets/boxchicken.png)

## INI 文件

```ini
frame = 6
time = 0.066
```

这定义了一个包含 6 帧、帧间隔为 66 毫秒（0.066 秒）的动画。

## 示例mod

<LinkCard t="庭院之主钢管舞" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3711895231" i="/pole.gif" />

<LinkCard t="Lost Case Monster Girl Takeover" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3609895215" i="https://images.steamusercontent.com/ugc/13866943819130003260/AF709B61B8CC0DB914A09239906A08359D2B0316/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" />

## 变体

你可以将 [贴图变体功能](./variation) 与动图配合使用，以实现自动切换


## 运行时切换

要让某一个角色换一套贴图（动图或静态图都行），用 **Texture** 文件夹里另一张贴图的 id 设置贴图覆盖：

```cs
chara.SetSpriteOverride("my_chara_alt");   // my_chara_alt.png，可选同名 .ini 和 .pref
chara.SetSpriteOverride();                 // 恢复原贴图
```

Drama 表里用 `set_sprite`。

+ `my_chara_alt_snow.png` 会作为它的雪地变体。没有 `.pref` 时沿用角色原来的设置。
+ 覆盖随角色存档，优先于[自定义皮肤](./skins)。
+ 只对使用独立贴图（`_idRenderData` 写 `@chara`）的角色生效。使用图集或 PCC 的角色（包括原版 NPC）在地图上的贴图不会变。
