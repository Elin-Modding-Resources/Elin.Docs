---
title: 自定义Skin
author: DK
description: 如何添加自定义Skin（自定义文件夹内，Skin文件夹）
date: 2026/4/9 16:00
tags: Texture/Skin
---

# Skin文件夹

放在这里的贴图，可以用于游戏内→ 居民告示板 → 改变贴图。此改变贴图功能，只会改变某一个NPC贴图，而不改变某一类NPC贴图。

+ **位置：** `%localappdata%low\Lafrontier\Elin\Custom\Skin`
+ **打开方式：** 游戏内按 Esc → 工具 → 打开自定义文件夹，即可快速访问Custom文件夹（自定义文件夹），然后找到其中的Skin文件夹
+ **尺寸：** 128×128 或 128×256
+ **背景：** 透明
+ **文件类型：** png
+ **文件命名：** skinname.png
  + skinname 即文件名，没有格式要求，但建议使用英文和数字命名，以防止出现奇怪的 bug。

如果你使用了Texture Expand模组的话（以下简称TE）：

+ 对有TE设置的角色，若使用居民告示板的改变贴图功能，则可能出bug
+ 替代方案是：你可以自己写一段TE规则，详情请阅读TE模组附带的说明书
