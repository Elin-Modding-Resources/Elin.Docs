---
title: 动画贴图
author: DK
description: How to make animated sprites for character and items.
date: 2026/4/9 9:00
tags: Texture/Animation
---

# 准备工作

要将静态贴图转换为动图，你需要提供一张水平排列的精灵表（Sprite Sheet）以及一个与该精灵表文件名相同的 `.ini` 文件。

`.ini` 的文件名、水平精灵表图片的文件名、加载mod的Excel表里的id列，这三者应一致。

![](./assets/boxchicken.png)

## INI 文件

```ini
frame = 6
time = 0.066
scale = 100
```

这定义了一个包含 6 帧、帧间隔为 66 毫秒（0.066 秒）的动画。

## 示例mod

<LinkCard t="庭院之主钢管舞" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3711895231" i="https://images.steamusercontent.com/ugc/13374333021323970829/883FA814CD2CDD0E1267B0FB29F2F058B543009F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" />

<LinkCard t="Lost Case Monster Girl Takeover" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3609895215" i="https://images.steamusercontent.com/ugc/13866943819130003260/AF709B61B8CC0DB914A09239906A08359D2B0316/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" />

## 变体

你可以将 [贴图变体功能](./variation) 与动图配合使用，以实现自动切换
