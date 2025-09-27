---
title: 自定义枪械
author: DK
description: Add custom guns with custom effects.
date: 2025/1/16 01:00
tags: Mod/CWL/Guns
---

## 指定插槽

您可以通过在物品表 Thing 中使用标签 `addSocket` 和 `addSocket(附魔alias)` 来指定枪械插槽。例如，`addSocket,addSocket,addSocket(bane_god)` 将确保添加两个空插槽和一个带有附魔 `God Bane` 的插槽。

您还可以使用 `noRandomSocket` 标签，在应用自定义插槽之前移除所有随机生成的插槽。

## 导入远程武器数据

有时您希望自定义您的远程武器的一些数据。枪械数据是一个 **JSON** 文件，位于您的 `LangMod/**/Data/` 文件夹中，文件名为 `EffectSetting.guns.json`。

```json
{
    "biubiu_gun": {
        "Num": 1,
        "Delay": 0.1,
        "IdEffect": "gunfire",
        "IdSprite": "ranged_gun",
        "IdSound": "attack_gun",
        "IdSoundEject": "bullet_drop",
        "Eject": true,
        "FirePos": {
            "x": 0.23,
            "y": 0.04
        },
        "FireFromMuzzle": false,
        "CaneColor": "",
        "CaneColorBlend": false,
        "ForceLaser": false,
        "ForceRail": false,
    }
}
```

这将导入一个名为 `biubiu_gun` 的枪械数据，它应该与您的远程武器 **ID** 匹配。您也可以使用游戏中现有的武器 **ID** 来覆盖它。

这里是游戏中现有的枪械数据：
::: details Gun Data
<<< ../../assets/guns.json
:::

+ `Num` 是一个爆发中的射击次数。
+ `Delay` 是动画延迟，单位为秒。
+ `IdEffect` 是**枪口特效的 ID**。您可以使用[自定义特效](../Other%20其他/effects)。默认值是 `gunfire`。激光和法杖不使用此值。
+ `IdSprite` 是**投射物贴图的名称**，它需要是游戏中现有的贴图，或者您放置在 **Texture** 文件夹中的贴图。激光不使用此值。
+ `IdSound` 是**射击声音的 ID**。您可以使用[自定义声音](../Other%20其他/sound)。这可以为所有类型的枪械设置。
+ `IdSoundEject` 是**弹壳弹出声音的 ID**。您可以使用[自定义声音](../Other%20其他/sound)。这可以为所有类型的枪械设置。
+ `Eject` 决定是否有**弹壳弹出动画**。这可以为所有类型的枪械设置。
+ `FirePos` 是**枪口效果相对于武器中心的位置偏移**。这可以为所有类型的枪械设置。
+ `FireFromMuzzle` (**新特性！**)决定**投射物是从枪口开始，还是默认从玩家身体开始**。这可以为所有类型的枪械设置。
+ `CaneColor` 是**法杖类武器可选的颜色覆盖**，留空则使用武器默认元素的颜色。格式为 `RRGGBB` 十六进制字符串。只有带有 `ToolRangeCane` **特性**的枪械才能使用此值。
+ `CaneColorBlend` 启用**法杖类武器的默认颜色和覆盖颜色混合**。只有带有 `ToolRangeCane` **特性**的枪械才能使用此值。
+ `ForceLaser` **强制**枪械使用**激光动画**(在 23.206 Nightly 版本中添加)。如果枪械带有 `ToolRangeGunEnergy` 特性，则不需要此项。
+ `ForceRail` **强制**枪械使用**电磁炮动画**。**对于带有 `ToolRangeGunEnergy` 特性的枪械来说，这不再是默认行为。**

任何您希望使用默认值的属性都可以省略。

您可以在此文件中添加任意数量的枪械数据，只需用 `,` **逗号**将它们分开，例如：

```json
{
    "biubiu_gun": { 
        data 
    },
    "rainbow_wand": {
        data
    }
}
```

您可以使用控制台命令 `cwl.data.load_effect_setting` 来重新加载所有枪械数据。