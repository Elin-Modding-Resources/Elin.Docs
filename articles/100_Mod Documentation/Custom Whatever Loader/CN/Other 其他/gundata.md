---
title: EffectData/Gun
date: 2025/1/16 01:00
hide: true
---

## 导入远程武器数据

有时候你想给你的远程武器自定义一些数据。guns 数据是一份 JSON 文件，存放在你的 `LangMod/**/Data/` 文件夹中，名称为 `EffectSetting.guns.json`。
```json
{
    "biubiu_gun": {
        "Num": 1,
        "Delay": 0.1,
        "IdEffect": "gunfire",
        "IdSound": "attack_gun",
        "IdSprite": "ranged_gun",
        "Eject": true,
        "FirePos": {
            "x": 0.23,
            "y": 0.04
        },
        "CaneColor": "03fcdf",
        "CaneColorBlend": false
    }
}
```

这会导入一份gun数据，名为 `biubiu_gun`，这应该和你的远程武器ID相同，否则游戏会为你的远程武器加载该类型的默认数据。你也可以使用游戏中已存在的武器ID来覆盖它。

+ `Num` 是连发次数。
+ `Delay` 是动画帧延迟。
+ `IdEffect` 是击发[特效的ID](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-effects-md)。
+ `IdSound` 是击发音效的ID。如果使用自定义音频，需要将其放置于 **Sound** 文件夹中。
+ `IdSprite` 是发射物的贴图名称，这需要是游戏中存在的纹贴图名称或者你放置于 **Texture** 文件夹中的贴图名称（去除.png）。
+ `Eject` 决定是否附有抛出弹壳动画。
+ `FirePos` 则是击发特效相对于武器中心的位置。
+ `CaneColor` 是可选的杖类武器色调覆盖，留空则使用武器默认元素的颜色。
+ `CaneColorBlend` 决定是否在杖类武器色调覆盖时与原颜色混合。

您可以在此文件中添加任意数量的gun数据，只需用 `,` 逗号分隔它们，例如：
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

::: warning 格式变动
从 CWL 1.20.14 开始，以前的字段 `SpriteId` 已被新字段 `IdSprite` 取代，但仍然可以使用。  
:::