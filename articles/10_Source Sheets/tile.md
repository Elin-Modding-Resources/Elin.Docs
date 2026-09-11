---
title: Tile (Block / Floor / Obj)
author: DK
description: Reference for the Block, Floor, Obj, Deco and CellEffect source sheets - the map tiles - and how to make them buildable, growable and textured without code.
date: 2026/9/6 18:30
tags: SourceSheet/Tile
---

# Tile Sheets (Block / Floor / Obj / Deco / CellEffect)

<LinkCard t="SourceBlock (Block / Floor / Obj / Deco / CellEffect / Material)" u="https://docs.google.com/spreadsheets/d/13oxL_cQEqoTUlcWsjKZyNuAaITFGK56v/edit" />

The five tile sheets share most of their columns. Everything that sits on a map cell — a wall, a floor, a crop, a carpet, a decoration, a liquid effect — is a row in one of them.

**When making source sheets, you must copy the first 3 rows of the official source sheet completely and start your data at the 4th row.**

::: details About columns, empty rows and empty cells
**Missing columns are filled with empty values.** Columns in a different order are matched by their header name.

**An empty cell is not an empty value**: it takes the value from row 3 of **your own sheet**. That is why the first 3 rows must be copied. With an empty row 3, `_tileType` ends up empty and the row never shows in the build menu, `category` ends up empty and falls back to `obj`, and so on.

**A row with an empty `id` stops the sheet there.** Do not leave blank rows between your data.
:::

## IDs and Aliases

Use any positive number as `id`. **256–65535** is the sweet spot: it keeps save files small. Stay clear of **0–255**, which the base game uses.

+ Two mods using the same id overwrite each other's row; the one loaded later wins.
+ `alias` must be unique and is needed for everything that refers to the row by name: the texture file name, `defBlock` / `bridgeBlock` / `autoFloor`, and seeds. Prefix it with your mod name.

## Shared Columns

|Column|Type|Description|
|-|-|-|
|id|int|Unique numeric id, see above.|
|alias|string|Unique name used by textures, cross-references and seeds.|
|name_JP / name|string|Display names. Fill **both**; `name` is only used as a fallback for languages other than Japanese.|
|sort|int|Position inside the build menu tab. Empty = after the previous row, so mod rows end up last.|
|reqHarvest|string[]|`skill,level` needed to remove it: `mining`, `digging`, `gathering` or `lumberjack`. Empty falls back to the sheet default.|
|hp|int|Toughness; more hp means longer to mine or dig.|
|_tileType|string|Tile type. Block: `Block`, `Wall`, `WallOpen`, `Fence`, `FenceClosed`, `HalfBlock`, `Slope`, `Stairs`, `Pillar`, `BlockDeco`. Floor: `Floor`, `FloorWater`, `FloorWaterShallow`, `FloorWaterDeep`, `Bridge`. Obj: `Obj`, `ObjBig`, `ObjHuge`, `Tree`, `Road`, `Chasm`, `WallMount`, `WallHang`, `Roof`, `Door`, `ObjWater`, … A typo hides the row from the build menu.|
|_idRenderData|string|How the tile is drawn, and therefore its cell size: Block empty / `block_thin` / `fence` / `halfblock` (64×64), Floor empty / `floor_obj` (64×48), Obj `obj` (64×64), `obj_S` / `obj_S flat` (32×32), `obj_L` / `obj_LV` (80×64).|
|tiles|int[]|Cell numbers in the sprite sheet (`row*100+column`, the numbers the Texture Viewer shows). Leave empty when you ship `Texture/<Table>/<alias>.png`; the game fills it in. A negative number flips the picture horizontally.|
|anime|int[]|`frames,ms[,loop[,sound]]` animation. Floor / Deco / CellEffect only; Obj rows ignore it.|
|snowTile|int|Block: keep the default (roof snow caps). Obj: `>0` hides the object under snow and shows a snow floor variant instead.|
|colorMod|int|How strongly the material color tints the art. `100` = tinted like vanilla, `0` = shown exactly as painted (use `0` for hand-painted crops).|
|colorType|string|Block / Obj: `alt` tints with the material's second colour instead of its main one, `random` picks a random one.|
|value|int|Base value.|
|LV|int|Crafting skill level needed.|
|recipeKey|string[]|`*` = learned automatically the first time the player opens the matching workbench; `-` = never shows up as a random recipe; a shop name (`Starter`, `Loytel`, …) = sold there as a recipe scroll.|
|factory|string[]|Item id of the workbench: `factory_wall`, `factory_block`, `factory_floor`, `workbench`. `self` = quick craft, `x` = never listed, `none` = not craftable. An id that is not an item disables the recipe.|
|components|string[]|Ingredients: `id[/count]`; `,` between ingredients; `\|` for alternatives; `id@tag` requires a tag (`chunk@soil/1`); `$` marks the ingredient that gives the color; `#` names a category; `+` marks optional. Empty or `-` = one log. A malformed entry drops the recipe.|
|defMat|string|Material alias used for the icon and for map generation. `!alias` locks the material. **Not** the material of what the player builds — that comes from the ingredient they pick.|
|category|string|Build menu tab: `wall`, `fence` → Wall; `foundation`; `floor`, `floor_field` → Floor; `obj`; `deco`. Unknown values fall back to `obj`.|
|tag|string[]|Flags. Floor: `noFloor`, `noBridge`, `noSnow`, `noTransition`, `beach`, `snowtile`, `nonGradient`. Obj: `autotile`, `seed`, `crop`, `rareSeed`, `crime`. Any: `hiddenRecipe`, `oneblock_only`.|
|detail_JP / detail|string|Description text.|

### Block

|Column|Type|Description|
|-|-|-|
|idThing|string|Item you get when the block is removed (`block`, `wall`, `fence`).|
|roof|int|Roof style used when the block borders a room.|
|autoFloor|string|Floor alias left behind after mining the block (empty = raw floor; an unknown alias falls back to `floor_raw`).|
|concrete / transparent|bool|Building flags; copy them from a similar official row.|
|transition|int[]|Ramp / transition cells; `-1` = none.|
|soundFoot|string|Footstep sound id.|

### Floor

|Column|Type|Description|
|-|-|-|
|defBlock|string|Block alias used when the floor is turned into a block. **Required** (`block_raw` for most rows). An unknown alias falls back to the default block.|
|bridgeBlock|string|Pillar block alias under bridges made of this floor (`pillar31`).|
|soundFoot|string|Footstep sound id (`wood`, `dirt`, `carpet`, …).|
|autotilePriority|int|Which of two touching floors draws the edge between them.|
|idBiome|string|Biome id for map generation. Must exist.|

Every floor row also gets a bridge recipe, unless `tag` contains `noBridge` or `factory` is `x`.

### Obj

|Column|Type|Description|
|-|-|-|
|_growth|string[]|`Class,stageFrame,harvestFrame,harvestThing,maxCount` — see [Growth](#growth).|
|costSoil|int|Soil cost when planted.|
|objType|string|`resource`, `crop`, `tree`, `plant`. Only `crop` changes anything (seed food bonuses); the others are just labels.|
|vals|int[]|`vals[0]` = which seed icon to use (a number from the seed item's skin list).|
|valType|string|`None`, `Growth` or `Material`. A typo is treated as `None`.|
|matCategory|string|Random material pool for map generation only.|
|chance|int|Weight in the random seed pool (rows with `seed` in `tag`).|

## Build Menu

A Block / Floor / Obj row shows up in the build menu when all of these hold:

1. `_tileType` is a real tile type (not empty, not `Marker`);
2. `factory` is a workbench item id (`factory_wall`, `factory_block`, `factory_floor`, `workbench`), not `x` / `none`;
3. the player **knows** the recipe. With `recipeKey` = `*` it is learned the first time the player opens that workbench; otherwise it can be discovered by mining a tile of the same kind, or bought as a scroll (`recipeKey` = a shop name);
4. `category` matches the tab you are looking at.

`components` decides the ingredients, and the ingredient the player picks decides the material of the result.

## Growth {#growth}

`_growth = Class,stageFrame,harvestFrame,harvestThing,maxCount` turns an Obj into a crop, tree or weed. `Class` is the growth type: `Crop`, `Wheat`, `Rice`, `Tree`, `Weed`, `Flower`, `Herb`, `Rose`, `Cactus`, `Cha`, `Kinoko`, `Berry`, `Pasture`, `Seaweed`, … With an unknown class the row simply does not grow.

+ **Stages**: the plant moves through its stages over time; for most types the last stage is withered.
+ **Harvest** gives `harvestThing` (an item id, or `#category` for a random item of that category), 1 to `maxCount` pieces. Digging the plant up drops the last entry of `components`.
+ **Seeds** need no item row of their own: the vanilla `seed` item remembers which Obj it plants. Add `seed` to `tag` (and set `objType` to `crop` for food bonuses), set `vals` to a seed icon and `chance` for the random seed pool. `rareSeed` keeps it out of that pool.
+ **Textures**: draw the stages as one strip in `Texture/Obj/<alias>.png` and write `stageFrame` / `harvestFrame` as frame numbers in that strip, counting from 0. The frame layout for each class is in [Texture Replace & Tile Textures](/articles/15_Texture%20Mods/replacement#growth). If you use Texture Replace slots instead, they are slot numbers.

Minimal wheat-style crop with a 7-frame strip:

|id|alias|name_JP|name|_growth|costSoil|objType|vals|tag|_idRenderData|colorMod|components|defMat|
|-|-|-|-|-|-|-|-|-|-|-|-|-|
|3006|mymod_wheat|麦|my wheat|`Wheat,0,5,wheat,2`|30|crop|2|crop,seed|obj|0|grass|grass|

## Materials

Materials are a separate sheet and have no texture of their own; see [Material](/articles/10_Source%20Sheets/material). A new ore only needs a Material row with `category` = `ore`, `tier`, `chance` and a color tag — the vanilla ore vein picks it up and tints itself.

## Localization

`name` / `name_JP` cover English and Japanese. For other languages the game writes `LangMod/<LANG>/SourceLocalization.json` into your mod folder on the first launch (or via **Export Text** in the mod viewer), with one key per text such as `SourceBlock.mymod_wall.name`; fill in the values.

## Pitfalls

+ Row 3 of your sheet is the default row. Copy it from the official sheet.
+ `alias` is mandatory for textures and seeds; vanilla leaves it empty on many rows, you should not.
+ `factory` must be an existing item id and `components` must be well-formed; otherwise the recipe disappears.
+ `defBlock` / `bridgeBlock` / `autoFloor` must name existing aliases; wrong names are replaced by a fallback.
+ Do not put `anime` on Obj rows, and do not fill in `tiles` yourself when you ship a PNG.
+ Everything is rebuilt when the game starts; after editing the xlsx or the PNGs, just restart.
