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
**Missing columns are filled with empty values** — the game logs a `#source ill-format` warning (visible in Player.log) and keeps loading. Reordered columns are re-mapped by header name automatically. Still, copy the whole official header row as-is; it avoids both paths entirely.

**A row with an empty `id` aborts the rest of the sheet**, every row after it is skipped, again with no warning. Do not use blank rows to group your data unless intentionally.

**An empty cell is not an empty value** — the game falls back to the default on row 3. This sheet defaults `type` to `Zone`, `LV` to `1`, `chance` to `100`, `idBiome` to `Plain`, `dev` to `0` and `image` to `default`.

You can change your default row 3 values to apply it to all other rows. Your data should start at the 4th row.
:::

## Sheet Columns

|Column|Type|Description|
|-|-|-|
|id|string|Unique identifier for the zone. If the ID matches a vanilla entry's or another mod's entry's ID, the last sheet to load will override the others. This value cannot contain spaces — use `snake_case` style if needed, e.g. `mymod_zone_funk_house`.|
|parent|string|The parent spatial's ID. On a **new game** the world tree is built by recursing from `world`, creating every row whose `parent` matches the current node. Put `ntyris` here to hang your zone off the North Tyris region. See [Placing the Zone on the World Map](#placing-the-zone-on-the-world-map).|
|name_JP|string|Zone display name in Japanese.|
|name|string|Zone display name in English. For other languages, use [`SourceLocalization`](./localization).|
|type|string|Zone C# type name. This can be an existing Zone type or a Zone subclass from your DLL. To customize it via code, refer to [Custom Zone Type](#custom-zone-type) below.|
|LV|int|Danger level. Written into the spatial's base danger level; child floors compute theirs as `topZone.DangerLv + abs(lv) - 1`.|
|chance|int|Weight used when the game rolls a random site. Only meaningful together with the `random` tag.|
|faction|string|Faction ID this zone belongs to.|
|value|int|Zone value used in the home ranking list. Only zones with `lv == 0` and `value > 0` are ranked.|
|idProfile|string|Zone profile ID; determines how a **randomly generated** map is built. Ignored when the zone loads a map file. See [Zone Profiles](#zone-profiles).|
|idFile|string[]|Base name of the map file. Only the first entry is used in practice — see [Where the Game Looks for the Map File](#where-the-game-looks-for-the-map-file). If no file is found, a random map is generated.|
|idBiome|string|Biome type. Must be an existing `BiomeProfile` id, an unknown value throws. A map file that was exported with a biome override in its map config wins over this column.|
|idGen|string|Unused. Nothing in the game reads this column — the dungeon generator comes from the C# type's `IDGenerator` property instead.|
|idPlaylist|string|Playlist. Falls back to `Underground` for any zone with `lv != 0`. CWL is required for custom playlists currently.|
|tag|string[]|A comma-separated list of tags applied to this zone. See [Tag Reference](#tag-reference) below.|
|costSkyTravel|int|Sky travel (moongate) cost. Also used as a destination requirement in Survival mode.|
|cost|int|Unused.|
|dev|int|Default zone development level.|
|image|string|Name of the picture shown in the zone selection UI, loaded from the game's built-in `Media/Graphics/Image/Zone/` resources. Blank means `default`. Custom images are not supported.|
|pos|int[]|Zone position on the world map, formatted as `x,y,icon ID`. **All three values are required** — if the cell is non-empty the game reads the third value unconditionally. Leaving it blank puts the zone at `-1000,-1000`, i.e. nowhere on the world map. To find the `icon ID`, see [World Icon ID](#world-icon-id) below.|
|questTag|string[]|Possible quest types in this zone, each entry formatted as `tag/weight`, e.g. `deliver/7,food/8`. Ignored when the zone belongs to the player's faction (a fixed list is used instead).|
|textFlavor_JP|string|Flavor text shown when entering the zone, in Japanese.|
|textFlavor|string|Flavor text shown when entering the zone, in English. For other languages, use [`SourceLocalization`](./localization).|
|detail_JP|string|Description of the zone, in Japanese.|
|detail|string|Description of the zone, in English. For other languages, use [`SourceLocalization`](./localization).|

## Tag Reference

Tags recognised in the `tag` column:

|Tag|Description|
|-|-|
|`addMap`|Two effects. It lets the zone look for a map file inside mod packages even when `idFile` is empty, **and** it makes the game spawn the zone into the world on every game load — which means it also works on existing saves. Accepts a parent: `addMap(ntyris)` (or the legacy CWL form `addMap_ntyris`). See [Placing the Zone on the World Map](#placing-the-zone-on-the-world-map).|
|`random`|Allow this zone to be picked as a random site on the world map, weighted by `chance`.|
|`debug`|Only created/rolled while dev mode is enabled. Useful for test zones you do not want to ship as live content.|
|`closed`|Marks the zone as closed: entering from the world map is refused with `zoneClosed`, fast travel is disabled, it is skipped as a delivery destination, and the world map draws a closed overlay on its tile.|
|`return`|Allow this zone to be used as a return location, even if it is not the player's home.|
|`light`|Enable lighting in this zone, even if it is not a player faction zone.|
|`tech`|Use tech-style boxes for merchant inventory backgrounds.|
|`iconFlag`|Force the world map icon to the flag tile, overriding the icon ID from `pos`.|

## World Icon ID

The `pos` column uses `x,y,icon ID` format. The third value `icon ID` is the numeric ID of a world-map icon from the game's built-in tileset. Hover over the tileset below to see each icon's ID, then use it in your `pos` column.

Custom zone icons from external sprites are not yet supported.

::: details Tileset Viewer
<TilesetViewer src="/assets/world.png" />
:::

In addition, when determining the `x,y` coordinates of a zone, you can use the console command `mod.pos` to get the world map coordinates where the current player character is located.

## Custom Zone Type

You can use a custom zone type defined in a C# DLL.

```cs
public class Zone_MyFunkHouse : Zone_Civilized
{
    // overrides
}
```

The **base class** must be derived from `Zone`, and you can freely choose which `Zone` type to use.

The `type` column is resolved by reflection: the game first tries the game assembly, then every assembly registered by loaded mods, matching on the plain type name (a namespaced name works too if the assembly is registered). **A name that cannot be resolved does not raise an error** — the game silently falls back to a plain `Zone`, so if your custom behaviour never runs, check the spelling first.

Useful hooks when subclassing:

|Member|Purpose|
|-|-|
|`OnVisitNewMapOrRegenerate()`|Runs the first time the map is generated **or imported**. The right place to post-process a hand-made map.|
|`OnActivate()`|Runs every time the player enters the zone.|
|`GetNewZoneID(int level)`|Which zone row a newly created floor should use. See [Multi-Level Zones](#multi-level-zones).|
|`StartLV`|The `lv` a freshly created zone starts at (`0` by default).|
|`IDGenerator`|Non-null switches map generation to the DunGen dungeon generator.|
|`IdProfile` / `IdBiome` / `IDPlayList`|Override the corresponding sheet columns at runtime.|

## Creating a Map!

noa's original quote:
> All map creation—such as placing NPCs, furniture, and laying out blocks—is done entirely within the in-game build mode (using dev mode). Once the map is complete, I export it using the F1 key's "Export Map" function. Then, in the Zone sheet of SourceGame.xlsx, I copy an existing zone entry, modify fields like id, name, type, and pos, and set the idFile to the filename of the map I just exported. Basically, that's all I do to add a new map to the game.

The sections below expand that workflow with what the current build actually does.

### Enter dev mode

You can enter dev mode by console command `mod.elin_dev` or by launching the game with the `-dev` argument. `mod.elin_dev false` turns it back off without restarting.

### Edit the map

Everything is done in the normal build mode. A few dev-only shortcuts while build mode is active:

|Key|Action|
|-|-|
|`F1`|Open the debug command layer (this is where the export commands live).|
|`F2`|Force the zone to regenerate — it re-imports the map file. Handy for checking that your `.z` is actually being picked up.|
|`K` / `L` (copy tool)|Export / import a **map piece** (`.mp`), a rectangular chunk you can paste into other maps. Map pieces live in `Map Piece/` and are not the same thing as a zone map.|

### Export the map

Open `F1` and use one of:

|Command|Result|
|-|-|
|`Export Zone`|Writes to `<game>/Package/_Elona/Map/<idFile>.z`, after copying the previous file of that name into `Map/Backup/`. If the zone's `idFile` is empty the file is named `_new.z`, which the game deliberately never loads back — so **set `idFile` before exporting**.|
|`Export Zone(Dialog)`|Same export, but you pick the destination path yourself.|
|`Import Zone(Dialog)`|Pick any `.z` and the game creates a `Zone_User` for it plus a teleporter at your feet leading into it. Good for previewing someone else's map without touching the sheet.|

::: warning Only player-creation cards are exported
The terrain (blocks, floors, objects, bridges, roofs, heights, decals, decos…) is always written out in full. **Things and characters are only written out when their `isPlayerCreation` flag is set.** Anything the map generator or a debug spawn command put there is dropped on export.

Objects you build yourself in build mode are player creations, so furniture generally survives. Characters usually do not — noa's own tooling flips the flag on everything in the map before exporting, and a script mod can do the same:

```cs
foreach (var t in EClass._map.things) t.isPlayerCreation = true;
foreach (var c in EClass._map.charas) c.isPlayerCreation = true;
```
:::

::: details What is inside a .z file
A `.z` is a zip containing:
+ the per-cell terrain byte arrays (`blocks`, `floors`, `objs`, `heights`, `bridges`, `roofBlocks`, …)
+ `map` — the serialized `Map` object, including its `MapConfig` (biome override, indoor flag, scene profile, LUT, fog, weather…) but with the thing list stripped
+ `export` — the serialized cards (the player-creation things and charas)
+ `meta` — name, id, tag and the game version the map was exported with; an outdated version makes the map fail validation
+ `Texture Replace/` — the zone's local texture replacement folder, if any
:::

### Where the game looks for the map file

When a zone is activated for the first time, the lookup order is:

1. `<game>/Package/_Elona/Map/<idExport>.z` — where `idExport` is `idFile[0]` plus a `_F<lv>` suffix for any floor other than `0`. `_new.z` is explicitly excluded.
2. If that file does not exist **and** the row has a non-empty `idFile` or the `addMap` tag, every activated mod package is searched for these relative paths, in order:
   + `Maps/<idExport>.z`
   + `Maps/Zone_<id>@<lv>.z`
   + `Map/<idExport>.z`
   + `Map/Zone_<id>@<lv>.z`
3. If nothing is found, the map is generated randomly from `idProfile`.

Two consequences worth remembering:

+ The `Zone_<id>@<lv>` form (the zone's *full name*) lets you ship maps **without** filling `idFile` at all, as long as the row carries the `addMap` tag.
+ When several packages provide the same relative path, the **last** one wins. And because step 1 comes first, a leftover export in `Package/_Elona/Map/` will shadow the copy inside your mod — delete or rename it while testing.

### Ship it in your mod

Put the exported `.z` next to your source sheet, in a folder named `Maps` at the root of your mod package:

```
MyMod/
├─ package.xml
├─ SourceGame.xlsx        (your Zone rows)
└─ Maps/
   ├─ mymod_funk_house.z
   └─ mymod_funk_house_F-1.z
```

::: tip A visited zone keeps its own copy
Once the player has entered a zone, its map is stored inside the save and the `.z` is no longer consulted. Updating your map file will not change an already-visited zone until it regenerates. While iterating, either start a fresh save or use `F2` in build mode.
:::

## Placing the Zone on the World Map

There are two mechanisms, and they behave differently.

**`parent` — new games only.** At world creation the game recurses from the `world` row and instantiates every row whose `parent` points at the node it is currently building. Setting `parent` to a region id such as `ntyris` therefore places your zone in that region for any character created *afterwards*. Rows tagged `debug` are skipped unless dev mode is on. Existing saves are unaffected.

**`addMap` — every game load, including existing saves.** For a zone row that comes from a mod package, the tag registers a custom-content entry that on each load checks whether the zone already exists and, if not, creates it and stamps it onto the region's world map at the row's `pos`. The parent is resolved in this order:

1. the value inside the tag, e.g. `addMap(ntyris)` — legacy CWL syntax `addMap_ntyris` is also accepted
2. the `parent` column
3. `ntyris`

The parent is looked up by *zone full name*, so `Zone_<id>@<lv>` and a bare `<id>` both work, and the floor is created on demand if it does not exist yet.

::: warning
`pos` must contain three values and must point at a free world map tile. A zone without `pos` ends up at `-1000,-1000` and will never be visible or reachable, no matter which tag you use.
:::

## Multi-Level Zones

### The level model

Zones form a shallow tree: `world` → region → **top zone** → its floors. `lv` is `0` on the surface, negative underground and positive in the sky. `GetTopZone()` only walks up a single step, so floors must be direct children of the top zone — you cannot nest floors under floors.

By default every floor of a dungeon reuses **the same sheet row** as the top zone. Floors are told apart by the `_F<lv>` suffix on the map file name:

```
Maps/mymod_dungeon.z        →  lv  0
Maps/mymod_dungeon_F-1.z    →  lv -1
Maps/mymod_dungeon_F-2.z    →  lv -2
Maps/mymod_dungeon_F1.z     →  lv  1   (sky level)
```

The full-name form works the same way: `Maps/Zone_mymod_dungeon@-1.z`.

Any floor without a map file falls back to random generation, so you can hand-make the entrance and let the deeper levels be generated.

### Stairs

`TraitStairsDown` and `TraitStairsUp` (and their subclasses `TraitMineEntrance`, `TraitManhole`) resolve their destination at use time:

1. target level = current `lv` ∓ 1
2. `GetTopZone().FindZone(targetLv)` — reuse the floor if it already exists
3. otherwise create it: `SpatialGen.Create(GetTopZone().GetNewZoneID(targetLv), topZone, …)` with `lv` set to the target

Since the default `GetNewZoneID` returns the zone's own id, step 3 keeps everything on one sheet row. Override it in your `Zone` subclass when a particular depth needs different data — a different name, type, faction or boss:

```cs
public override string GetNewZoneID(int level)
{
    if (level == -5) return "mymod_dungeon_boss";
    return base.GetNewZoneID(level);
}
```

::: tip You usually do not need to place the return stairs
When neither side uses the DunGen generator, taking stairs queues a pre-enter event that builds the matching opposite stairs at the same coordinates on the destination floor, using the biome's stairs style. It is skipped if a suitable stairs (or a `TraitStairsLocked`) already sits on that tile — so hand-placed stairs are respected.
:::

Two more transports work inside a single top zone:

+ `TraitElevator` — offers a list of the top zone and all its existing floors.
+ `TraitTeleporter` — pairs with any other teleporter carrying the same engraved id, first inside the map, then across zones.

### Linking to a different zone

To send the player somewhere that is *not* a floor of the current zone, the trait needs parameters. `Trait.Params` is the thing's `trait` column, or — per instance — `c_editorTraitVal`, prefixed with a comma so that the first value you write is `GetParam(1)`:

|Parameter|Meaning|
|-|-|
|`GetParam(1)`|Target zone id. For non-teleport traits, a non-empty value turns the trait into an *external zone* link: the destination is created as a child of the current zone and flagged `isExternalZone`.|
|`GetParam(2)`|Target level (`lv`), default `0`.|
|`GetParam(3)`|Teleport marker id used to choose the arrival spot.|

So a dedicated Thing row such as `TraitStairsDown,mymod_funk_house,0` gives you a staircase that always leads into your zone.

::: warning Instance parameters have no in-game editor
`c_editorTraitVal` and `c_idTrait` are only exposed through Unity's inspector, which ships disabled. In the public build you either define a dedicated Thing row with the parameters baked into its `trait` column, or set the field from a script mod.

Also note that `TraitNewZone.OnImportMap()` clears `c_uidZone` on import: **a map file never remembers which concrete zone instance a staircase pointed at.** The link must be re-derivable from the trait parameters or the level arithmetic.
:::

## Zone Profiles

`idProfile` names a `ZoneProfile` asset under `World/Zone/Profile/`. It only matters for zones that generate their map randomly. When left blank the game picks one automatically: `Underground` for `lv < 0`, `Sky` for `lv > 0`, and for a surface zone directly under a region, the profile assigned to that world map tile.

Built-in profiles include `Default`, `Dungeon`, `DungeonForest`, `DungeonWater`, `DungeonFactory`, `DungeonDead`, `DungeonCursedManor`, `Lesimas`, `Mine`, `Sky`, `Underground`, `U_Hill`, `U_Plain`, `U_PlainSmall`, `U_Seaside`, `U_Snow`, `U_Valley`, and the `Random/` set (`Random/R_Plain`, `Random/R_Forest`, `Random/R_Mountain`, `Random/R_Shore`, `Random/R_Snow`, `Random/R_Water`, `Random/R_Undersea`, …). These are Unity resources, so mods cannot add new ones from a sheet.

## Troubleshooting

|Symptom|Likely cause|
|-|-|
|The zone loads a random map instead of yours|`idFile` does not match the file name, the file is not under `Maps/`, or the zone was already visited in this save.|
|Your custom `Zone` subclass never runs|`type` failed to resolve and silently fell back to plain `Zone`. Check the spelling and that your assembly is registered.|
|Nothing appears on the world map|`pos` is empty or has fewer than three values, or the row has neither a `parent` reachable from `world` nor the `addMap` tag.|
|The zone exists but cannot be entered|The `closed` tag.|
|NPCs and furniture are missing from the imported map|They were not flagged `isPlayerCreation` at export time.|
|Rows after a certain point were never loaded|An empty `id` cell aborts the rest of the sheet.|
|Stairs go nowhere|`Msg.SayNothingHappen` fires when no destination could be resolved — usually a missing `GetParam(1)` on an external-zone link.|
