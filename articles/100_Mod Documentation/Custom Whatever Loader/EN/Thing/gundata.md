---
title: Custom Guns
author: DK
description: Add custom guns with custom effects.
date: 2025/1/16 01:00
tags: Mod/CWL/Guns
---

## Specifying Sockets

You can specify N number of sockets by using the tag `addSocket_N` in the gun's Thing sheet. Note that some sockets might not be empty.

## Import Ranged Weapon Data

Sometimes you want to customize some data for your ranged weapon. The gun data is a JSON file located in your `LangMod/**/Data/` folder, named `EffectSetting.guns.json`.
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

This will import a gun data named `biubiu_gun`, which should match your ranged weapon ID. You can also use an existing weapon ID in the game to override it.

Here are the existing gun data in game:
::: details Gun Data
<<< ../../assets/guns.json
:::

+ `Num` is the number of shots in a burst. 
+ `Delay` is the animation delay in seconds. 
+ `IdEffect` is the [ID of the muzzle effect](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-effects-md). You may use [Custom Effect](../Other/effects). Default value is `gunfire`. Lasers and canes don't use this value.
+ `IdSprite` is the name of the projectile texture, which needs to be an existing texture in the game or a texture you placed in the **Texture** folder. Lasers don't use this value.
+ `IdSound` is the ID of the firing sound. You may use [Custom Sound](../Other/sound). This can be set for all types of guns.
+ `IdSoundEject` is the ID of the ejecting sound. You may use [Custom Sound](../Other/sound). This can be set for all types of guns.
+ `Eject` determines whether there is a shell eject animation. This can be set for all types of guns.
+ `FirePos` is the position offset of the muzzle effect relative to the center of the weapon. This can be set for all types of guns.
+ `FireFromMuzzle` (**new!**) determines whether the projectiles start from gun muzzle or by default from player's body. This can be set for all types of guns.
+ `CaneColor` is the optional tint override for cane type weapons, leave blank to use weapon's default element's color. The format is `RRGGBB` hex string. Only guns with trait `ToolRangeCane` can use this value.
+ `CaneColorBlend` enables default color and override color blending for cane type weapons. Only guns with trait `ToolRangeCane` can use this value.
+ `ForceLaser` forces the gun to use laser animation(added in 23.206 Nightly). This is not needed if gun has trait `ToolRangeGunEnergy`.
+ `ForceRail` forces the gun to use railgun animation. **This is no longer the default behaviour for guns with trait `ToolRangeGunEnergy`.**

Any value that you wish to use default for, can be omitted.

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

You can use console command `cwl.data.load_effect_setting` to reload all gun data.
