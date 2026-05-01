---
title: Sheet Columns
author: Puddles
description: Comments about columns of Chara sheet.
date: 2025/8/30 00:00
tags: SourceSheet/Chara
---

## Chara Sheet

<LinkCard t="SourceCard/Chara" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />

When making source sheets, always copy the first 3 rows from official rows and start your data at the 4th row. Do not alter the column order.

## Columns

|Column|Type|Description|
|-|-|-|
|id|string|The most important cell of an entry that distinguishes it from everything else on the Chara sheet. If the ID matches a vanilla entry's or another mod's entry's ID, the last sheet to load will override the others. This value cannot have any spaces in it, consider using snake_case style if needed, e.g. `mymod_chara_yajyuu_senpai`.|
|_id|integer|Used for sorting purposes in creature codex, can be any numeric value. This does not have to be unique.|
|name_JP|string|The Chara's in-name display name in Japanese.|
|name|string|The Chara's in-game display name in English. Other languages use SourceLocalization.json. |
|aka_JP|string|The Chara's in-name alias/title in Japanese.|
|aka|string|The Chara's in-game alias/title in English. Other languages use SourceLocalization.json. |
| idActor | string | Controls whether the Chara uses PCC-part rendering. Example: `pcc,unique,jure` loads PCC parts from `pcc/unique/jure`. |
| sort | string | Unused in SourceChara. |
| size | string | Tile dimensions occupied by the Chara; usually empty. Example: `2,2` makes the Chara occupy 2×2 tiles and prevents shoving. |
| _idRenderData | string | Controls sprite sheet referencing. `chara`/`chara_L`... uses tile IDs from `tiles` with textures in **Texture Replace** (limited slots, can be overridden). `@chara` uses same-ID texture from **Texture** (**mandatory** for modded Chara). |
| tiles | int | tile IDs for sprite sheet, or [skinset](../../15_Texture%20Mods/skins) for modded Chara. |
| tiles_snow | int | Replacement tile sequence when on snowy maps. Modded Chara use [variation](../../15_Texture%20Mods/variation) instead. |
| colorMod | int | Currently mainly used with `100`, allowing grayscale sprites to inherit `mainElement` color. |
| components | string | Unused in SourceChara. |
| defMat | string | Unused in SourceChara. |
| LV | int | Chara “Danger Level”; affects spawn threshold by map danger, selection cost (slave master/animal tamer), and base stat generation from race/job characteristics. |
| chance | int | Modifier for map spawn chance (and possibly sale lists). Default `100`. |
| quality | int | `0–2`: regular tiers. `3`: Unique Monsters (egg obtainable; cannot befriend/capture/tame). `4`: Unique Characters (only chicken eggs; can befriend but not capture/tame). |
| hostility | string | Temperament toward player/allies/bystanders. Blank: `Hostile`. `Neutral`: does not attack unless attacked. `Friend`: attacks anyone hostile to Friend units, including player if provoked. |
| biome | string | Increases (possibly doubles) spawn chance on specified floor type, decreases (possibly halves) on others. Example: `Water` strongly favors water-floor spawning. |
| tag | string | Known tags: `mini` (half sprite size), `noRandomProduct` (no panties from Fortune Drum; possibly no doujin), `random_color` (assigns hair color to grayscale regions when `colorMod=100`), `randomFish`, `staticSkin` (overrides gender-based sprite assignment), `snow` (prefers snow tiles), `water` (prefers water tiles). |
| trait | string | Complex trait list; refer to trait documentation and `Trait*` C# classes. |
| race | string | Race ID from SourceRace. |
| job | string | Job/class ID from SourceJob; default is `none`. |
| tactics | string | Overrides default tactics of assigned job. |
| aiIdle | string | AI behavior supplement/override. Examples: `Stand` (fully stationary, even when attacked), `Root` (stationary until attacked or recruited). |
| aiParam | string | Three values: preferred enemy distance, per-turn reposition chance to that distance, and (rarely used) bonus chance to reposition again. |
| actCombat | string | Active SourceElement entries usable in combat, comma-separated. Add `/N` for fixed use chance. For buffs, add `/pt` to target whole party (ally state only). Example: `ActThrowPotion/30,SpWeakness,SpSpeedDown,SpWisdom/50/pt`. Default chance is 100. |
| mainElement | string | Primary elemental affinity: `Fire`, `Cold`, `Lightning`, `Darkness`, `Nether`, `Sound`, `Chaos`, `Poison`, `Cut`, `Acid`, `Impact`. |
| elements | string | Passive SourceElement entries, comma-separated. Add `/N` for level/value where applicable. `0` or negative can modify inherited race elements. Examples: `invisibility/1` enables, `invisibility/0` disables inherited; `antidote/-30` makes meat poisonous, `antidote/30` cures poison or offsets racial `-30`. |
| equip | string | Overrides randomized job equipment template, **only if race EQ is not empty**. Example: a Thief-job unit with `equip=Archer` gets Archer gear; Dog-race units with empty race EQ still won’t spawn with equipment even if `equip` is set. |
| loot | string | Extra drops (Thing/ThingV IDs), comma-separated, each with `/N`. Every 20 = +1% drop chance. Example: `medal/500` = 25%; `medal/3000` = 150% (guaranteed 1 + 50% for another). |
| category | string | Most entries use default `chara`. |
| filter | string | Unused in SourceChara. |
| gachaFilter | string | Gacha picks a category (e.g., resident/livestock/Unique/default), then selects eligible Chara by this filter. Example: livestock results only include entries tagged for livestock. |
| tone | string | Dialogue modifiers for Japanese text. |
| actIdle | string | Out-of-combat behavior instructions. Examples: `readBook` (generates/reads/removes random book), `buffMage` (periodically casts buffs like `spResElement` or `spHero`). |
| lightData | string | Unused in SourceChara. The color emitted from light. |
| idExtra | string | Unused in SourceChara. Extra renderdata. |
| bio | string | Slash-separated values (no spaces): `gender` (`m`/`f`/`n`, required), `birthyear` (optional), `height` (optional), `weight` (optional), `tone` from `chara_tone.xlsx` (optional), `talk` from `chara_talk.xlsx` (optional). Example: `f/51044/152/46/friendly\|私\|あなた`. |
| faith | string | Fixed religion. Setting this will prevent changing in game. |
| works | string | Alias from SourceHobby. |
| hobbies | string | Alias from SourceHobby. |
| idText | string | Links to an entry in `CharaText` sheet. |
| moveAnime | string | Move animation type. `hop` or blank. |
| factory | string | Unused in SourceChara. |
| components | string | Unused in SourceChara; This is a duplicate column. |
| recruitItems | string | Special recruit dialog items, only used by mani right now. |
| detail_JP | string | Unused in SourceChara; can be used for notes. |
| detail | string | Unused in SourceChara; can be used for notes. |

## Import


