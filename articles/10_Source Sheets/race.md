---
title: Race
author: Han
description: Comments about columns of Race sheet.
date: 2025/9/19 00:00
tags: SourceSheet/Race
---

# Race Sheet

<LinkCard t="SourceChara/Race" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />

The Race Sheet is stored inside the Chara sheet; change the tab at the bottom.

When making source sheets, always copy the first 3 rows from official rows and start your data at the 4th row. Do not alter the column order.

An empty cell is not an empty value — the game falls back to the default on row 3. This sheet defaults `vigor` to `100`, `DV`/`PV` to `0`, `geneCap` to `3`, `material` to `meat`, `corpse` to `_meat,20`, `blood` to `2`, `age` to `8,50` and `food` to `100`.

## Sheet Columns

|Column|Type|Description|
|-|-|-|
|id|string|The most important cell of an entry that distinguishes it from everything else on the SourceChara sheet. If the ID matches a vanilla entry's or another mod's entry's ID, the last sheet to load will override all the others. This value cannot have any spaces or special characters in it.|
|name_JP|string|The name of this race in Japanese.|
|name|string|The name of this race in English. Other languages use SourceLocalization.json.|
|playable|integer|Designates whether this race is usable by players during character creation. `1`: available by default. `2`–`6`: requires the "extra races" option. `7`–`8`: requires the "all races" option. `9`: never selectable, usually reserved for special races like gods/demons.|
|tag|string[]|A comma-separated list of tags applied to this race. See [Tag Reference](#tag-reference) below for common tags.|
|life|integer|The base life stat; determines HP pool.|
|mana|integer|The base mana stat; determines MP pool.|
|vigor|integer|The base vigor stat; determines stamina (SP) pool.|
|DV|integer|The base dodge value. Gives this race built-in dodging (e.g., fairy).|
|PV|integer|The base protection value. Gives this race built-in protection (e.g., golem).|
|PDR|integer|Physical Damage Reduction. A percent reduction in damage taken from physical sources.|
|EDR|integer|Elemental Damage Reduction. A percent reduction in damage taken from elemental sources.|
|EP|integer|Evade Perfect. This race has an additional protection layer via perfect evasion, which is a separate evasion roll.|
|STR/END/DEX/PER/LER/WIL/MAG/CHA/SPD|integer|Base attribute parameters.|
|ratio|—|Macro to approximate the race strength; unused in-game but must be present in the sheet. Leave blank.|
|INT|integer|The "intelligence" of this race. Used to determine whether they are smart enough to open a door on their own. Less than `10` means they cannot.|
|martial|integer|Unused by the game. Keep the column; the value does not matter.|
|pen|integer|Unused by the game. Keep the column; the value does not matter.|
|elements|elements|Inherent elements added to this race. Used to add racial feats and base skill bonuses (which also add base potential). Format: `element_alias/value`.|
|skill|string|Unused by the game. What vanilla puts here are author notes (`●`, or skill names separated by spaces) and is never read; `elements` is the column that actually applies skills.|
|figure|string|Dictates what body parts this race starts with. See [Figure Reference](#figure-reference) below.|
|geneCap|integer|How many gene slots this race has.|
|material|string|What material this race is made of.|
|corpse|string[]|When a corpse is dropped upon killing this race, what it is made of.|
|loot|string[]|Loot specific to this race.|
|blood|integer|The color of the blood from this race. `2` is normal red blood. Please refer to the blood column in the `chara` sub-table of the official source. Still follow the general rule: if it is empty, use the default value.|
|meleeStyle|string|The melee effect of this race. Leave blank for default melee. Options: `Claw`, `Bite`, `Kick`, `Touch`, `Spore`, `Sting`, `Gaze`.|
|castStyle|string|The casting effect of this race. Mostly used for flavor text.|
|EQ|string[]|Determines what kind of equipment this race spawns with. EQ is an alternate way to enable equipment assignment when creating characters; you can fill in anything. Two common options are `"all"` and blank.|
|sex|integer|Unused by the game (gender comes from the first segment of the Chara sheet's `bio` column). Keep the column; the value does not matter.|
|age|integer[]|The age range used when spawning this race, as comma-separated `start,end`. For example, `8,50` means they spawn between ages 8 and 50.|
|height|integer|The average height of this race.|
|breeder|integer|Whether this race is good for breeding. Used when this race is set as livestock to determine production rates.|
|food|string[]|A multiplier for how good the meat of this race is.|
|fur|string|A set of strings in `category/material` format that dictate what happens when you shave this race.|
|detail_JP|string|The details/backstory of this race in Japanese.|
|detail|string|The details/backstory of this race in English.|

## Tag Reference

Common tags used in the `tag` column:

|Tag|Description|
|-|-|
|`human`|The race speaks common.|
|`fairy`|This race is a fairy.|
|`humanSpeak`|Non-humanoid races that can speak common.|
|`gelatin`|Equivalent to setting `jelly` in the material column (represents a slime-like material similar to a Putit). Note: Please avoid using the `gelatin` tag.|
|`sand`|This race will spawn in sand zones.|
|`ride`|This race has good riding aptitude.|
|`mofu`|This race will be incessantly harassed and fluffed without consent by everyone and everything.|
|`fish`|This race is considered a fish. Used for Bane.|
|`undead`|This race is considered undead. Used for Bane. Cannot be detected with Telepathy.|
|`god`|This race is considered a god. Do not watch birds with.|
|`animal`|This race is considered an animal. Used for Bane; can show up in Animal Tamers.|
|`sleepBeside`|This race will try to sleep alongside you if it's in your faction and zone.|
|`noRide`|This race has bad riding aptitude.|
|`insect`|This race is considered an insect.|
|`plant`|This race is considered a plant. Can be dominated by Kumiromi.|
|`filth`|Usage unclear.|
|`dragon`|This race is considered a dragon.|
|`webfree`|This race can freely move through webs; used for spiders.|
|`cat`|This race is a cat. Do not eat.|
|`water`|This race will spawn in water zones.|
|`machine`|This race is considered a machine. Can be dominated by Mani. Can be upgraded by Mani Shotgun Faction effect.|
|`horror`|This race is considered a horror. Cannot be detected with Telepathy.|

## Figure Reference

The `figure` column uses Kanji characters separated by pipes (`|`) to represent body parts. A part can repeat, and each repetition is one more slot — `手|手|指|指` means two hands and two finger slots. Most vanilla humanoids use `頭|首|体|背|手|手|指|指|腕|腰|脚|足|`.

|Character|Body Part|
|-|-|
|`頭`|Head|
|`首`|Neck|
|`体`|Body|
|`背`|Back|
|`手`|Hand|
|`指`|Finger|
|`腕`|Arm|
|`腰`|Waist|
|`脚`|Leg|
|`足`|Foot|

<!--注释
《Elin》相关术语，均是英=中=日
1.Bane=特攻=特攻
2.Bird watching=观鸟=鳥を眺める，语境示例: "鳥を眺めにいかない？"
3.life=生命力=生命，这是参与计算HP的生命力
4.mana=玛娜=マナ，这是参与计算MP的玛娜
5.vigor=活力=活力，这是参与计算SP的活力
6.Yerles=耶鲁人=イエルス
-->