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

::: warning 不要忘记基础精灵图
即使提供变体，您仍然需要提供一张基础精灵图 `ID.png` ，其中 `ID` 正是您的角色或物品的 ID。
:::

下面将介绍各种变体

## 角色皮肤集

这些是性别相关的、成对的纹理，在创建角色时随机选择。

### 角色性别为随机时

**例子1**

例如要为 `id` 是 `ninja` 的角色，提供一个男性贴图和一个非男性贴图，请将贴图分别命名为  `ninja_skin0.png`  和  `ninja_skin1.png`  ，然后在Excel的  `tiles`  列中填入  `0,1` 。

**例子2**

可添加更多配对，以支持额外的皮肤集。

例如给一个角色6个变体（男性3种+非男性3种）贴图时：
+ 使用 （ `_skin0` 、 `_skin1` ）、（ `_skin2` 、 `_skin3` ）、（ `_skin4` 、 `_skin5` ）三组6张图
+ 然后在Excel的 `tiles`  列中填入：  `0,1,2,3,4,5` 

这些配对将在本性别内被随机选取。偶数为男性，奇数为非男性（女与???）

此时，你可以定义的变体没有数量上限，多少张图都可以。

### 角色性别固定为一种时

如果您的角色性别不随机时，您仍希望提供随机皮肤变体，可以在 `tiles` 配对中使用相同的皮肤。

例如，使用 `_skin0` 、 `_skin1` 、 `_skin2` 三张图，但注意需要在Excel的 `tiles`  列中填入：  `0,0,1,1,2,2` 

此时，你可以定义的变体没有数量上限，多少张图都可以。

### 备注

+ 从 0 开始数
+ 非男性，包含女与 ???性别
+ `idSkin` 只有在 `tiles` 列多于一项时才生效。想在运行时切换单个角色的贴图，请用[贴图覆盖](./animation#运行时切换)

## 方向性贴图

这通常用于家具。您可以通过 `id_dir0.png`, `id_dir1.png`, `id_dir2.png`, 和 `id_dir3.png` 来提供最多 4 个方向变体。每个方向都是可选的，可以跳过。

角色也可以使用方向性贴图，但通常来说，不推荐角色使用。

## 雪地变体

您可以提供 `id_snow.png` 变体，以便在雪地区域或冬季实现自动切换。

## 后缀顺序

上述变体皆可组合使用，顺序不限：`id_snow_skin1.png` 和 `id_skin1_snow.png` 对游戏来说是一样的。

有多个文件同时匹配时，游戏使用下表中最靠前的一个：

+ `_skinN_dirN_snow`
+ `_skinN_dirN`
+ `_skinN_snow`
+ `_skinN`
+ `_dirN_snow`
+ `_dirN`
+ `_snow`
+ 基础贴图

## 自定义状态

mod 可以添加自己的状态，比如战斗贴图。在 mod 加载时注册一次后缀和规则：

```cs
SpriteReplacer.states.Add(("_combat", c => c.Chara?.IsInCombat == true));
```

规则成立时，`id_combat.png` 会替换普通贴图。加一个 `id_combat.ini` 就能做成动图。这个后缀可以和其他变体以任意顺序组合，比如 `id_combat_snow.png`、`id_skin1_combat.png`。

+ 一次只生效一个状态。多条规则同时成立时，`states` 里靠前的优先，想让某个状态压过其他状态，用 `states.Insert(0, ...)`。
+ 屏幕上有对应文件的对象每帧都会执行规则，绘制图标时也会执行，这时角色可能不在当前地图。规则要尽量轻、不要有副作用。规则抛出异常时视为不成立，日志只记录一次。
+ 状态只对独立贴图生效，对图集无效。
+ 状态贴图使用基础贴图的 `.pref`。

规则表达不了的需求，可以补丁 `GetSpriteData(int dir = 0, bool snow = false)`，让它返回要绘制的 `SpriteData`。物品补丁 `Card.GetSpriteData`，角色补丁 `Chara.GetSpriteData`。静态和动画的独立贴图都使用这个返回值。
