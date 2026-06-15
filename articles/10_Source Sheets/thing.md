---
title: Thing
author: SamInJapan
description: Reference for the Thing source sheet columns.
date: 2025/1/10 16:00
tags: SourceSheet/Thing
---

# Thing Sheet

<LinkCard t="SourceCard/Thing" u="https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=654432269#gid=654432269" />

When making source sheets, always copy the first 3 rows from official rows and start your data at the 4th row. Do not alter the column order.

## Sheet Columns

|Column|Type|Description|
|-|-|-|
|id|string|Unique identifier for the item.|
|name_JP|string|Display name in Japanese.|
|name|string|Display name in English.|
|unknown_JP|string|Japanese name of high-quality items when unidentified. Can also be a special property, e.g.: `#randomBook`, `#randomPotion`.|
|unit_JP|string|Japanese counter word for the object. See [Unit JP](#unit-jp) below.|
|unit|string|Physical form of the object. See [Unit](#unit) below.|
|unknown|string|English name of high-quality items when unidentified. Can also be a special property, e.g.: `#randomBook`, `#randomPotion`.|
|category|string|Category the item belongs to. Used for auto-dumping and recipe menus (linked to the `Category` sheet).|
|sort|int|Sort order. E.g. `2200` places it in the bow range.|
|_tileType|string|How the object is displayed on the map. See [Tile Type](#tile-type) below.|
|_idRenderData|string|How the object sits on the ground and its clipping. See [idRenderData](#idrenderdata) below.|
|tiles|int|Replacement texture tile ID(s). Multiple tiles follow: front → front reversed → back → back reversed. E.g. `123,-123,456,-456`.|
|altTiles|int|Variant tiles for alternate states (e.g. a closed chest with contents inside).|
|anime|int[]|Two values: `frameCount,frameDuration`. When the `idRenderData` column uses the @obj and [Sprite Animation](../15_Texture%20Mods/animation) is used, this column does not need to be filled in.|
|skins|int|Skin variant reference. When the `idRenderData` column uses the @obj and [Sprite Variations](../15_Texture%20Mods/variation) is used, this column does not need to be filled in.|
|size|int[]|Grid size for large objects: `height,width`.|
|colorMod|int|Color saturation modifier.|
|colorType|string|Color source: `default` (first crafting ingredient), `alt` (secondary), or `random`.|
|recipeKey|string|How the recipe is acquired: `*` = known by default; a character ID = sold by that character.|
|factory|string|Crafting station where the item is made. See [Factory](#factory) below.|
|components|string|Crafting ingredients. See [Components](#components) below.|
|disassemble|string|Items produced when disassembled.|
|defMat|string|Default material (e.g. `oak`). Determines the icon/preview color.|
|tierGroup|string|Tier grouping for upgrade/progression.|
|value|int|Base sell value in orens.|
|LV|int|Crafting skill level required.|
|chance|string|Spawn or generation chance modifier.|
|quality|int|Item quality tier.  The ☆ and ★ are determined by the quality column. **(To be supplemented)**|
|weight|int|Item weight. E.g. seed = `30`, rod = `500`, bed = `4500`, piano = `85000`.|
|electricity|int|Power draw. Negative values consume electricity (e.g. monitor = `-10`).|
|trait|string|Special behaviors. See [Trait](#trait) below.|
|elements|string|Element aliases from the `Element` sheet with `/level`. E.g. `lumberjack/4` displays as `Lumberjack [****]`.|
|range|int|Weapon range in tiles. E.g. short bow = `1`, bow = `3`, rail gun = `5`.|
|attackType|string|Damage/weapon type: `Blunt`, `Bow`, `Cane`, `Claw`, `Gun`, `Pierce`, `Punch`, `Slash`.|
|offense|int[4]|Offensive stats (4 values).|
|substats|int|Sub-stat modifiers.|
|defense|int[2]|Defensive stats: `DV,PV`.|
|lightData|string|Light emission preset. See [Light Data](#light-data) below.|
|idExtra|string|Additional render data reference.|
|idToggleExtra|string|Toggleable render data (e.g. on/off lighting).|
|idActorEx|string|Ambient effect around the object. See [Ambient Effects](#ambient-effects) below.|
|idSound|string|Sound played when crafting: `glass`, `money`, `paper`, etc.|
|tag|string|Built-in behavior flags. See [Tags](#tags) below.|
|workTag|string|Work-related tags.|
|filter|string|Generation sources outside crafting: `fish`, `gacha`, `supply`, etc. Used by `CreateFromFilter` to randomly generate items.|
|roomNameJP|string|Room type definition in Japanese. Multiple entries separated by commas.|
|roomName|string|Room type definition in English. E.g. `Bedroom` or `Kitchen,Dining Room`.|
|detail_JP|string|Item description in Japanese. Shown above the stat info in-game.|
|detail|string|Item description in English. Shown above the stat info in-game.|

## Unit JP

The `unit_JP` column defines the Japanese counter word for the object. These do not directly apply to the English version.

|Character|Romaji|Meaning|
|-|-|-|
|塊|katamari|cluster, clump|
|振り|furi|handheld, melee|
|対|tai|pair (e.g. gloves)|
|台|dai|machine, pedestal, harp|
|挺|tei|long narrow object (e.g. gun, scissors, hoe)|
|発|hatsu|ammo|
|本|hon|base, body, object|
|枚|mai|sheet|
|粒|tsubu|grain, pebble|
|巻|maki|rolled object|
|冊|saku|booklet|
|錠|jou|pill|
|隻|seki|boat, ship|
|束|taba|bundle, bunch|
|体|karada|form, statue|
|袋|fukuro|bag|
|張|chou / hari|stretched|
|杯|hai|cup|
|匹|biki|(small) animal|
|品|hin|object|

## Unit

The `unit` column defines the physical form of the object.

|Value|Value|Value|
|-|-|-|
|bottle|box|bucket|
|bundle|can|chunk|
|feather|gift box|grand cross|
|grimoire|handful|letter|
|painting|pair|piece|
|pinch|poster|pot|
|rod|set|signboard|
|spellbook|staff|statue|
|syringe|tree|tuft|
|whip|whistle|

## Tile Type

The `_tileType` column controls how the object is displayed on the map.

|Type|Behavior|
|-|-|
|ObjBig|Blocks movement.|
|ObjHuge|Blocks movement.|
|Door|Requires a wall; acts as a door/opening.|
|Slope|Changes movement speed when traversing up/down.|
|Stairs|Like Slope but with a more dramatic speed/height change.|
|Paint|Requires a wall to attach to.|
|WallHang|Requires a wall to attach to.|
|Window|Requires a wall; hides when windows are hidden (e.g. when inside the building).|

## idRenderData

The `_idRenderData` column controls how the object sits on the ground and its clipping behavior.

### `@obj` — Custom Texture (Non-Replacement)

Used for custom items **not** using Texture Replacement:
- File name must match the `id` exactly.
- Use lowercase `.png` extension (`.PNG` will not work).
- Place in the `Texture` folder of your mod.

### `obj` — Texture Replacement

Used for items using Texture Replacement. This occupies a tile slot in the Texture Viewer and may collide with other mods:
- File name format: `obj_tileID` (e.g. `objS_5032`).
- Use lowercase `.png` extension.
- Place in the `Texture Replace` folder of your mod.

### Snow Variants

|Type|Non-Replacement (`@obj`)|Replacement (`obj`)|
|-|-|-|
|Regular|`ID.png`|`obj_123.png`|
|Snow|`ID_snow.png`|`objSnow_123.png`|
|Small|—|`objS_456.png`|
|Small Snow|—|`objSSnow_456.png`|

<LinkCard t="Sam's Notes on _idRenderData" u="/articles/15_Texture%20Mods/sam_id_render_data" />

## Factory

The `factory` column defines where the item is crafted. Leave blank if the item is not craftable by the player.

|In-Game Name|Value|
|-|-|
|Quick Craft|`self`|
|Workbench|`workbench`|
|Tinker's Table|`factory_tinker`|
|Drafting Table|`workbench2`|
|Signboard Workshop|`factory_sign`|
|Carpenter's Table|`factory_wood`|
|Blacksmith's Table|`factory_metal`|
|Anvil|`anvil`|
|Machine Table|`machinebench`|
|Mason's Table|`factory_stone`|
|Glassmaker's Table|`factory_glass`|
|Accessory Table|`factory_accessory`|
|Loom|`loom`|
|Writing Tool|`tool_writing`|
|Stove|`stove`|

## Components

The `components` column defines crafting ingredients.

|Syntax|Meaning|Example|
|-|-|-|
|`tag/N`|Requires N items with the given material tag.|`rock/10` → 10 rock materials.|
|`\|`|"Or" — choose one of the options.|`rock/2\|ingot` → 2 rocks or 2 ingots.|
|`#category`|Requires choosing an item from your inventory matching the category.|`#book` → pick any book from your inventory.|

### Examples

**Well:** `rock/10,rope/3,log/2`
→ 10 rock materials, 3 ropes, 2 logs.

**Sickle:** `rock/2|ingot,string/1,stick/1`
→ 2 rocks OR 2 ingots, 1 string, 1 stick.

**Bookshelf:** `plank/4,#book,#book`
→ 4 planks, 2 books of your choice.

## Trait

The `trait` column defines special behaviors. For container-type objects, use the format:

```
Container,rows,columns,backgroundImage,specialNotes
```

|Example|Meaning|
|-|-|
|`beekeep,2,2,crate,honey`|2×2 container with crate background, holds honey.|
|`ChestPractice,7,5,crate`|7×5 container with crate background.|

## Light Data

The `lightData` column defines the light emission appearance.

|Value|
|-|
|`altar_machine`|
|`bonfire`|
|`fireplace`|
|`fridge`|
|`gacha`|
|`general`|
|`kiln`|
|`lamp_sun`|
|`lamp_table`|
|`light_floor`|
|`light_spot`|
|`light_stand`|
|`light_wall`|

## Ambient Effects

The `idActorEx` column defines ambient effects around the object.

|Value|Effect|
|-|-|
|`amb_boat`|Boat ambiance.|
|`amb_crowd`|Crowd noise.|
|`amb_fire`|Fire crackling.|
|`amb_fountain`|Fountain sounds.|
|`amb_smelter`|Smelter sounds.|

## Tags

The `tag` column assigns built-in behavior flags.

Some tags, not all:
|Tag|Effect|
|-|-|
|`exotic`|Considered an exotic item.|
|`godArtifact`|Treated as a god artifact. See [Religion](./religion)|
|`noWish`|Cannot be obtained via wishing.|
|`tourism`|Counts as a tourism item.|
|`rareResource`|Considered a rare resource.|
|`snowTile`|Prefers snow tiles (optional if snow obj variants are set up).|
|`throwWeapon`|Returns after being thrown (like a boomerang).|
|`noCopy`|Cannot be copied.|
|`noShop`|Does not appear in the corresponding type of shop.|
|`fixedElement`|Fixed elements enchantment value.|
|`randomElement`|Random elements enchantment value.|

## Ranged Weapon

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
<<< ./assets/guns.json
:::

+ `Num` is the number of shots in a burst. 
+ `Delay` is the animation delay in seconds. 
+ `IdEffect` is the [ID of the muzzle effect](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-effects-md). You may use [Custom Effect](../15_Texture%20Mods/effects). Default value is `gunfire`. Lasers and canes don't use this value.
+ `IdSprite` is the name of the projectile texture, which needs to be an existing texture in the game or a texture you placed in the **Texture** folder. Lasers don't use this value.
+ `IdSound` is the ID of the firing sound. You may use [Custom Sound](../20_Sound%20Mods/0_sound). This can be set for all types of guns.
+ `IdSoundEject` is the ID of the ejecting sound. You may use [Custom Sound](../20_Sound%20Mods/0_sound). This can be set for all types of guns.
+ `Eject` determines whether there is a shell eject animation. This can be set for all types of guns.
+ `FirePos` is the position offset of the muzzle effect relative to the center of the weapon. This can be set for all types of guns.
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

### Gun Sockets

You can specify gun sockets by using the tag `addSocket` and `addSocket(enchant_alias)` in the Thing sheet. For example, `addSocket,addSocket,addSocket(bane_god)` will ensure 2 empty sockets and 1 socket with enchant `God Bane` will be added.

You can also use `noRandomSocket` tag to remove all random generated sockets before applying your own.
