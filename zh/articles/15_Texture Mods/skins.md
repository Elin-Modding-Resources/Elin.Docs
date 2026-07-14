---
title: 自定义Skin
author: DK
description: 如何添加自定义Skin（自定义文件夹内，Skin文件夹）
date: 2026/7/14 00:00
tags: Texture/Skin
---

# Skin文件夹

放置于Skin文件夹内的贴图，可以用于游戏内→ 居民告示板 → **改变贴图**。

此**改变贴图**功能，只会改变某一个NPC贴图，而不改变某一类NPC贴图。

+ **位置：** 见下文[位置章节](#skin-folder-location)
+ **尺寸：** 128×128 或 128×256
+ **背景：** 透明
+ **文件类型：** png
+ **文件命名：** skinname.png
  + skinname 是你自定义的名字（就是文件名里 .png 前面的部分），没有格式要求，但建议使用英文和数字命名，以防止出现奇怪的 bug。
 
你可以将 [贴图变体](./variation) 功能中的[雪地变体](./variation#雪地变体)、[方向性贴图](./variation#方向性贴图)，结合Skin文件夹使用。它们一起使用于Skin文件夹，也是可以的。

## 位置 {#skin-folder-location}

可在本地储存

+ **位置：** `%localappdata%low\Lafrontier\Elin\Custom\Skin`
+ **打开方式：** 游戏内按 Esc → 工具 → 打开自定义文件夹 → 找到Skin文件夹

也可以，以mod形式使用

+ **位置：** `<ElinGamePath>/Package/<ModName>/Skin` ，这需要准备[模组包](../2_Getting%20Started/basic_mod)的必需文件，详情请移步[模组包](../2_Getting%20Started/basic_mod)页面。

## 兼容性

若你使用了Texture Expand模组/Provisional TextureExpand模组（以下简称TE）：

+ 对有TE设置的角色，若使用居民告示板的改变贴图功能，则可能出bug
+ 替代方案是：你可以自己写一段TE规则，详情请阅读TE模组附带的说明书

<!--翻译表
本文位置章节打开方式中，按钮翻译为：
工具=Tool=ツール，
打开自定义文件夹=Open My Custom Folder=差し替えフォルダを開
-->
<!--翻译表2
居民告示板（一种游戏内家具）：
居民告示板=resident board=住人掲示板
改变贴图（居民告示板里的按钮）：
改变贴图=Change Skin=スキンを変更
-->
<!--
居民告示板的改变贴图，只是一种改变贴图的方式，游戏有多种改变贴图的方式。
-->