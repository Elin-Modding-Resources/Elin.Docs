---
title: Material
author: DK
description: Reference for the Material source sheet columns.
date: 2026/6/14 21:00
tags: SourceSheet/Material
---

# Material Sheet

<LinkCard t="SourceGame/Material" u="https://docs.google.com/spreadsheets/d/13oxL_cQEqoTUlcWsjKZyNuAaITFGK56v/edit?gid=580505110#gid=580505110" />

When making source sheets, always copy the first 3 rows from official rows and start your data at the 4th row. Do not alter the column order.

## Sheet Columns

|Column|Type|Description|
|-|-|-|
|id|int|Unique numeric identifier for the material. If matching a vanilla entry or another mod's entry ID, the last sheet to load will override the others. Make this very unique and big enough so it doesn't overlap.|
|alias|string|Material alias, used for referencing in other sheets (e.g. Thing's `defMat` column).|
|name_JP|string|Display name in Japanese.|
|name|string|Display name in English. Other languages use [`SourceLocalization`](./localization).|
|category|string|Material category (e.g. `metal`, `wood`, `stone`, `leather`, `cloth`).|
|tag|string[]|Tags for special behaviors. Use `addColorMain(RRGGBBAA)` and `addColorAlt(RRGGBBAA)` to define custom material colors. See [Custom Material](#custom-material) below.|
|thing|string|Associated Thing ID for this material when dismantled.|
|goods|string[]|Consider this unused.|
|minerals|string[]|Consider this unused.|
|decal|int|Decal/blood overlay id. See [Decal](#decal)|
|decay|int|Decay rate when item is made of this material.|
|grass|int|Consider this unused.|
|defFloor|int|Default SourceFloor tile ID.|
|defBlock|int|Default SourceBlock tile ID.|
|edge|int|Consider this unused.|
|ramp|int|Ramp block tile ID.|
|idSound|string|Impact sound ID. Custom sounds are placed in `Sound/Material/` folder.|
|soundFoot|string|Footstep sound ID. Custom sounds are placed in `Sound/Footstep/` folder.|
|hardness|int|Material hardness; affects the tools needed to mine or process this material.|
|groups|string[]|Material tier group (e.g. `metal`, `leather`).|
|tier|int|Material tier in the tier group.|
|chance|int|Random chance weight within the tier group.|
|weight|int|Material self weight.|
|value|int|Material value.|
|quality|int|Material quality modifier.|
|atk|int|Attack bonus provided when used as equipment material.|
|dmg|int|Damage bonus provided when used as equipment material.|
|dv|int|DV bonus provided when used as equipment material.|
|pv|int|PV bonus provided when used as equipment material.|
|dice|int|Dice dimension modifier for damage calculations.|
|bits|string[]|Proof against fire or acid.|
|elements|elements|SourceElement bonuses when used as equipment material.|
|altName|string[]|Consider this unused.|
|altName_JP|string[]|Consider this unused.|

## Custom Material

By default, the game cannot load custom materials because there is no color mapping for them. To make your custom material display properly, you must define its colors in the `tag` column.

### Color Tags

Use **`addColorMain(color_hex)`** and **`addColorAlt(color_hex)`** in the `tag` column of your material row to define the main and alternate colors of your material.

The color format is **RRGGBBAA** (8 hex digits):
- **RR**: Red (`00`–`ff`)
- **GG**: Green (`00`–`ff`)
- **BB**: Blue (`00`–`ff`)
- **AA**: Alpha/opacity (`00`–`ff`)

For example:
```
addColorMain(ffff00ff),addColorAlt(ff0000ff)
```

This sets the main color to yellow (fully opaque) and the alternate color to red (fully opaque).

::: warning Color Format
The color hex string is **case insensitive** and **does not** begin with `#` or `0x`.
:::

## Decal

![](./assets/decals.png)

Index starts at 2 (top-left). Each row contains 2 groups of decals with separate number indices, e.g. the 1st row is 2 and 3, 2nd row is 4 and 5.