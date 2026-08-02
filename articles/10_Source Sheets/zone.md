---
title: Zone
author: DK
description: How to make new Zone sheet and maps.
date: 2026/6/16 01:00
tags: SourceSheet/Zone
---

# Zone Sheet

<LinkCard t="SourceGame/Zone" u="https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_" />

**When making source sheets, you must copy the first 3 rows of the official source sheet completely and start your data at the 4th row.**

::: details About columns, empty rows and empty cells
**Missing columns are silently filled with empty values** with no error at all — so copy the whole official header row and do not delete columns or change their order.

**A row with an empty `id` aborts the rest of the sheet**, every row after it is skipped, again with no warning. Do not use blank rows to group your data unless intentionally.

**An empty cell is not an empty value** — the game falls back to the default on row 3. This sheet defaults `type` to `Zone`, `LV` to `1`, `chance` to `100`, `idBiome` to `Plain`, `dev` to `0` and `image` to `default`.

You can change your default row 3 values to apply it to all other rows. Your data should start at the 4th row.
:::

## Sheet Columns

|Column|Type|Description|
|-|-|-|
|id|string|Unique identifier for the zone. If the ID matches a vanilla entry's or another mod's entry's ID, the last sheet to load will override the others. This value cannot contain spaces — use `snake_case` style if needed, e.g. `mymod_zone_funk_house`.|
|parent|string|The parent zone ID.|
|name_JP|string|Zone display name in Japanese.|
|name|string|Zone display name in English. For other languages, use [`SourceLocalization`](./localization).|
|type|string|Zone C# type name. This can be an existing Zone type or a Zone subclass from your DLL. To customize it via code, refer to [Custom Zone Type](#custom-zone-type) below.|
|LV|int|Danger level.|
|chance|int|Random site spawn chance when `tag` contains `random`.|
|faction|string|Faction ID this zone belongs to.|
|value|int|Zone value used in the home ranking list.|
|idProfile|string|Zone profile ID; determines how the map is generated.|
|idFile|string[]|Map file name placed in the **Maps** folder. If empty, a random map will be used.|
|idBiome|string|Biome type.|
|idGen|string|Dungeon generator type. Unused.|
|idPlaylist|string|Playlist. CWL is required for custom playlists currently.|
|tag|string[]|A comma-separated list of tags applied to this zone. See [Tag Reference](#tag-reference) below for common tags.|
|cost|int|Unused.|
|dev|int|Default zone development level.|
|image|string|Name of the picture shown in the zone selection UI, taken from the game's built-in images. Blank means `default`. Custom images are not supported yet.|
|pos|int[]|Zone position on the world map, formatted as `x,y,icon ID`. To find the `icon ID`, see [World Icon ID](#world-icon-id) below.|
|questTag|string[]|Possible quest types in this zone. Ignored when the zone belongs to the player's faction.|
|textFlavor_JP|string|Flavor text shown when entering the zone, in Japanese.|
|textFlavor|string|Flavor text shown when entering the zone, in English. For other languages, use [`SourceLocalization`](./localization).|
|detail_JP|string|Description of the zone, in Japanese.|
|detail|string|Description of the zone, in English. For other languages, use [`SourceLocalization`](./localization).|

## Tag Reference

Common tags used in the `tag` column:

|Tag|Description|
|-|-|
|`addMap`|Automatically spawn this map into the world.|
|`return`|Allow this zone to be used as a return location, even if it is not the player's home.|
|`tech`|Use tech-style boxes for merchant inventory backgrounds.|
|`light`|Enable lighting in this zone, even if it is not a player faction zone.|
|`random`|Allow this zone to appear as a random site on the world map.|
|`closed`|Mark this zone as closed / inaccessible.|

## World Icon ID

The `pos` column uses `x,y,icon ID` format. The third value `icon ID` is the numeric ID of a world-map icon from the game's built-in tileset. Hover over the tileset below to see each icon's ID, then use it in your `pos` column.

Custom zone icons from external sprites are not yet supported.

::: details Tileset Viewer
<TilesetViewer src="/assets/world.png" />
:::

In addition, when determining the `x,y` coordinates of a zone, you can use the console command `mod.get_pos` to get the world map coordinates where the current player character is located.

## Custom Zone Type

You can use a custom zone type defined in a C# DLL.

Example: 
```cs
public class Zone_MyFunkHouse : Zone_Civilized
{
    // overrides
}
```

The **base class** must be derived from `Zone`, and you can freely choose which `Zone` type to use.

## Creating a Map!

noa's original quote:
> All map creation—such as placing NPCs, furniture, and laying out blocks—is done entirely within the in-game build mode (using dev mode). Once the map is complete, I export it using the F1 key's "Export Map" function. Then, in the Zone sheet of SourceGame.xlsx, I copy an existing zone entry, modify fields like id, name, type, and pos, and set the idFile to the filename of the map I just exported. Basically, that’s all I do to add a new map to the game.

You can enter the dev mode by console command `mod.elin_dev` or launching the game with `-dev` argument.
