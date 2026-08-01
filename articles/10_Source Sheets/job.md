---
title: Job
author: Han
description: Comments about columns of Job sheet.
date: 2025/12/11 00:00
tags: SourceSheet/Job
---

# Job Sheet

<LinkCard t="SourceChara/Job" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />

The Job Sheet is stored inside the Chara sheet; change the tab at the bottom.

When making source sheets, always copy the first 3 rows from official rows and start your data at the 4th row. Do not alter the column order.

## Sheet Columns

|Column|Type|Description|
|-|-|-|
|id|string|The most important cell of an entry that distinguishes it from everything else on the Source sheet. If the ID matches a vanilla entry's or another mod's entry's ID, the last sheet to load will override all the others. This value cannot have any spaces or special characters in it.|
|name_JP|string|The name of this job in Japanese.|
|name|string|The name of this job in English. Other languages use SourceLocalization.json.|
|playable|integer|Designates whether this job is usable by players during character creation, using the same rule as the Race sheet. `1`: available by default. `2`–`6`: requires the "extra races" option. `7`–`8`: requires the "all races" option. `9`: never selectable.|
|STR/END/DEX/PER/LER/WIL/MAG/CHA/SPD|integer|Additional attribute parameters added to the character from this job.|
|ratio|—|Macro to approximate the job strength; unused in-game but must be present in the sheet. Leave blank.|
|elements|elements|Inherent elements added to this job. Used to add job feats and base skill bonuses. Format: `element_alias/value`.|
|weapon|string[]|A list of weapon item names. Used on generation to equip characters with items. For example, a default NPC with the warrior class will be generated randomly with one of: `sword`, `axe`, `blunt`, `polearm`, `scythe`.|
|equip|string|Ranged weapon loadout. Only three values actually do anything, and they are **case-sensitive** and lowercase: `archer` (bow/crossbow), `inquisitor` and `gunner` (gun); `none` makes the job spawn with no equipment at all. Everything else is decided by the `weapon` column and the race's EQ, not by this one.|
|domain|elements|Which domains this job starts with, given as element aliases (e.g. `eleFire,eleCold,eleLightning`). **Leaving it blank does not mean no domains** — the column defaults to `eleFire,eleCold,eleLightning`.|
|detail_JP|string|The details/backstory of this job in Japanese.|
|detail|string|The details/backstory of this job in English.|
