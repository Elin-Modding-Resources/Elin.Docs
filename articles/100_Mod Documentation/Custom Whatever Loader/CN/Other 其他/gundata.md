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
        "SpriteId": "ranged_gun",
        "Eject": true,
        "FirePos": {
            "x": 0.23,
            "y": 0.04
        }
    }
}
```

这会导入一份gun数据，名为 `biubiu_gun`，这应该和你的远程武器ID相同，否则游戏会为你的远程武器加载该类型的默认数据。你也可以使用游戏中已存在的武器ID来覆盖它。

+ `Num` 是连发次数。
+ `Delay` 是动画帧延迟。
+ `IdEffect` 是击发特效的ID。
+ `IdSound` 是击发音效的ID。如果使用自定义音频，需要将其放置于 **Sound** 文件夹中。
+ `SpriteId` 是发射物的贴图名称，这需要是游戏中存在的纹贴图名称或者你放置于 **Texture** 文件夹中的贴图名称（去除.png）。
+ `Eject` 决定是否附有抛出弹壳动画。
+ `FirePos` 则是击发特效相对于武器中心的位置。

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