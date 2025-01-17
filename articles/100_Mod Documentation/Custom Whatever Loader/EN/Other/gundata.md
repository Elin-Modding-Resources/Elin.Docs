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
        "num": 1,
        "delay": 0.1,
        "idEffect": "gunfire",
        "idSound": "attack_gun",
        "spriteId": "ranged_gun",
        "eject": true,
        "firePos": {
            "x": 0.23,
            "y": 0.04
        }
    }
}
```

This will import a gun data named `biubiu_gun`, which should match your ranged weapon ID; otherwise, the game will load the default data of that type for your ranged weapon. You can also use an existing weapon ID in the game to override it.

`num` is the number of shots in a burst, `delay` is the animation frame delay, `idEffect` is the ID of the firing effect, `spriteId` is the name of the projectile texture, which needs to be an existing texture name in the game or a texture name you placed in the **Texture** folder (without .png). `eject` determines whether there is a shell eject animation, and `firePos` is the position of the firing effect relative to the center of the weapon.

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