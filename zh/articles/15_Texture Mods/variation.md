---
title: 贴图变体
author: DK
description: 如何添加方向性变体、皮肤集和雪地变体
date: 2026/4/9 9:00
tags: Texture/Variation
---

# 变体不是必需的

当提供了对应的变体图片，且满足使用条件时，系统会应用变体；但变体仅为可选项，基础贴图始终有效。

您可以通过在贴图文件名后、与`.png`之前，添加相应的后缀来提供变体。

例如，当贴图 ID 为 `doorframe_arch` 时：

+ `doorframe_arch.png`
+ `doorframe_arch_snow.png`
+ `doorframe_arch_dir0.png`
+ `doorframe_arch_dir0_snow.png`
+ `doorframe_arch_skin1_snow.png`
+ `doorframe_arch_skin1_dir3_snow.png`
+ ...

变体系统适用于 [自定义Skin](./skins)、普通角色贴图（sprite）以及 [动画贴图](./animation)。

## 角色皮肤集

### 角色性别为随机时

这些是成对出现的性别相关纹理，在创建角色时随机选择。

例如，若要为 `id` 是 `ninja` 的角色，提供一个男性贴图和一个非男性贴图，请将贴图分别命名为  `ninja_skin0.png`  和  `ninja_skin1.png`  ，然后在Excel的  `tiles`  列中填入  `0,1` 。

您可以添加更多配对以支持额外的皮肤集：

例如，男性3种贴图+女性3种贴图时：使用 （ `_skin0` 、 `_skin1` ）、（ `_skin2` 、 `_skin3` ）、（ `_skin4` 、 `_skin5` ）三组6张图，来支持三组性别相关的贴图；然后在Excel的 `tiles`  列中填入：  `0,1,2,3,4,5` 

这些配对将在本性别内被随机选取。偶数为男性，奇数为非男性（女与???）

### 角色性别固定为一种时

如果您的角色性别固定，只有一种性别，但您仍希望提供随机皮肤变体，可以在 `tiles` 配对中使用相同的皮肤。

例如，使用 `_skin0` 、 `_skin1` 、 `_skin2` 三张图，但注意需要在Excel的 `tiles`  列中填入：  `0,0,1,1,2,2` 

### 备注

+ 变体没有上限。你愿意的话，多少张图都可以。
+ 随机性别时，偶数男，奇数非男（女与 ???性别）。 角色性别固定为一种时，奇偶不分男女。

## 方向性贴图

这通常用于家具。您可以通过 `id_dir0.png`, `id_dir1.png`, `id_dir2.png`, 和 `id_dir3.png` 来提供最多 4 个方向变体。每个方向都是可选的，可以跳过。

角色也可以使用方向性贴图，但通常来说，并不推荐角色使用。

## 雪地变体

您可以提供 `id_snow.png` 变体，以便在雪地区域或冬季实现自动切换。

## 后缀顺序

上述变体，皆可以组合使用，但要注意后缀顺序，顺序如下:

+ `_skinN_dirN_snow`
+ `_skinN_snow`
+ `_dirN_snow`
+ `_snow`
