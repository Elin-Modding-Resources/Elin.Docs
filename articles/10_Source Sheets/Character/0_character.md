---
title: Import Character
date: 2025/1/3 01:00
hide: true
---

## Import Custom Character

Assumes you already have your custom character defined in a Chara sheet. You can take reference from existing mods or Elin Sources.
<LinkCard t="SourceChara Explanation" u="/10_Source Sheets/Character/_columns.md" />

## Spawn on game load

To spawn the character to a zone, add tag `addZone_*` to the SourceChara row and replace the `*` (asterisk) with **zone id** or keep the asterisk for a random zone. You may also specify zone level with `/n`.

For example, to spawn the chara in little garden, use `addZone_little_garden`. To also spawn in derphy underground, use another tag `addZone_derphy/-1`. Check the [SourceGame/Zone](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752) and reference the **id** column.

![spawn_ex](./assets/spawn_chara.png)

For each `addZone` tag used, an instance of the Chara will be spawned there. For example, `addZone_lumiest,addZone_little_garden,addZone_specwing,addZone_*` will make sure all three selected zones plus a random zone will have this character spawned (as duplicates).

## Add equipment/thing

When spawning your character, you may also define the starting equipments and things for this character, using tag `addEq_ItemID#Rarity` and/or `addThing_ItemID#Count`.

To assign specific equipment to the character, use tag `addEq_ItemID#Rarity`, where `ItemID` is replaced by the item's ID, and `Rarity` being one of the following: **Random, Crude, Normal, Superior, Legendary, Mythical, Artifact**. If `#Rarity` is omitted, the default rarity `#Random` will be used. 

The rarity text in game is displayed as: **Crude, Normal, Good, Miracle, Godly, Special**

For example, to set a miracle `BS_Flydragonsword` and a random `axe_machine` as the main weapons for the character:
**addZone_Palmia,addEq_BS_Flydragonsword#Legendary,addEq_axe_machine**

To add starting items to the character, use tag `addThing_ItemID#Count`. If `#Count` is omitted, a default of `1` item will be generated. 

For example, to add `padoru_gift` x10 and `scroll of ally` x5 to the character:
**addZone_Palmia,addThing_padoru_gift#10,addThing_1174#5**

**Remember, tags are separated by `,` (comma) with no spaces in between**. 

## Make an adventurer

If your character has trait **`AdventurerBacker`**, the character will be imported as an adventurer, which will appear on the adventurer ranking list.

## Allow human speak

To allow your character to talk without parentheses, you can add tag `humanSpeak` in SourceChara sheet. Alternatively you can add tag `human` or `humanSpeak` in the SourceRace sheet. 
