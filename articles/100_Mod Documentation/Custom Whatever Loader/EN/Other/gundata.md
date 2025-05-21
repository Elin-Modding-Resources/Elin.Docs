---
title: EffectData/Gun
date: 2025/1/16 01:00
hide: true
---

## Import Ranged Weapon Data

Sometimes you want to customize some data for your ranged weapon. The guns data is a JSON file located in your `LangMod/**/Data/` folder, named `EffectSetting.guns.json`.
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

This will import a gun data named `biubiu_gun`, which should match your ranged weapon ID; otherwise, the game will load the default data of that type for your ranged weapon. You can also use an existing weapon ID in the game to override it.

+ `Num` is the number of shots in a burst. 
+ `Delay` is the animation frame delay. 
+ `IdEffect` is the ID of the firing effect. 
+ `IdSound` is the ID of the firing sound. If using custom sound, it needs to be put in **Sound** folder.
+ `IdSprite` is the name of the projectile texture, which needs to be an existing texture name in the game or a texture name you placed in the **Texture** folder (without .png). 
+ `Eject` determines whether there is a shell eject animation.
+ `FirePos` is the position of the firing effect relative to the center of the weapon.
+ `CaneColor` is the optional tint override for cane type weapons, leave blank to use weapon's default element's color.
+ `CaneColorBlend` enables default color and override color blending for cane type weapons. 

You may add as many gun data as you want in this file, simply separate them by `,` comma, such as:
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

::: warning Spec Change
Starting from CWL 1.20.14, previous entry `SpriteId` is now deprecated by the `IdSprite` shown above, but still accepted.  
:::