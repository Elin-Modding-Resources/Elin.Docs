---
title: Sprite Customization
author: DK
description: Details of .pref file to customize your sprite.
date: 2026/4/9 8:00
tags: Texture/Pref
---

# Pref 文件

通过 `.pref` 文件可以微调贴图、阴影、居民告示板上NPC头像小图标等等。

有时，贴图的默认渲染设置可能并不理想。您可以创建一个与贴图同名的 `.pref` 文件来自定义渲染。

使用记事本即可打开或书写，该文件采用 INI 格式，保存时改后缀即可。其他文本编辑器也可。

注意：`.pref` 的文件名、贴图图片的文件名、加载mod的Excel表里的id列，这三者应一致，

```ini
x = 0
y = 0
z = 0
pivotX = 0
pivotY = 0
shadow = 0
shadowX = 0
shadowY = 0
shadowRX = 0
shadowRY = 0
shadowBX = 0
shadowBY = 0
shadowBRX = 0
shadowBRY = 0
height = 0
heightFix = 0
scaleIcon = -40
liquidMod = 0
liquidModMax = 0
hatY = 0
equipX = 0
equipY = 0
stackX = 0
```

您可以省略任何未使用的行。英文分号 `;` 开头的注释也可以使用。

+ `x`, `y`, `z` 位置偏移量
+ `pivotX`, `pivotY` 中心点（Pivot）偏移量，如：居民告示板上角色的头像小图标
+ `shadow` 阴影数据（ShadowData）ID
+ `shadowX`, `shadowY` 阴影位置偏移量
+ `shadowRX`, `shadowRY` 阴影反向偏移量
+ `shadowBX`, `shadowBY` 阴影背面偏移量
+ `shadowBRX`, `shadowBRY` 阴影背面反向偏移量
+ `height` 地块高度修正值
+ `heightFix` 文本组件高度偏移（用于悬浮的小部件）
+ `scaleIcon` 图标缩放比例
+ `liquidMod` 地块液体高度修正值（可为负）
+ `liquidModMax` 地块液体高度上限
+ `hatY` 帽子渲染器的 Y 轴偏移量
+ `equipX`, `equipY` 手持物位置偏移量
+ `stackX` 地块堆叠的 X 轴偏移量

## 阴影数据 ID

<!--@include: ./assets/shadow_data.md-->
