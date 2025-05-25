---
title: Import Character
date: 2025/1/3 01:00
hide: true
---

## Import Custom Character

Assumes you already have your custom character defined in a Chara sheet. You may take reference from existing mods or Elin Sources.
<LinkCard t="SourceChara" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn" />

CWL utilizes the tag cell of the Chara row to add features, you may add as many tags as you want. **Remember, tags are separated by `,` (comma) with no spaces in between**. 

If you need additional features, don't hesitate to ask!

## spawn on game load

To let CWL spawn the character to a zone, use tag `addZone_*` and replace the `*` (asterisk) with zone **id** or keep the asterisk for a random zone. You may also specify zone level with `/n`.

For example, to spawn the chara in meadow, use `addZone_little_garden`. To also spawn in derphy underground, use `addZone_derphy/-1`. Check the [SourceGame/Zone](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752) and reference the **id** column.

For each `addZone` tag used, an instance of the Chara will be spawned there. For example, `addZone_lumiest,addZone_little_garden,addZone_specwing,addZone_*` will make sure all three selected zones plus a random zone will have this character spawned (as duplicates).

::: warning  
Starting from CWL 1.20.11, previous tags `addZone_TypeName` are now deprecated by the `addZone_id` tags shown above, but still accepted.  
![spawn_ex](./assets/spawn_chara.png)
:::

## add equipment/thing

When CWL spawns your character, you may also define the starting equipments and things for this character, using tag `addEq_ItemID#Rarity` and/or `addThing_ItemID#Count`.

To assign specific equipment to the character, use tag `addEq_ItemID#Rarity`, where `ItemID` is replaced by the item's ID, and `Rarity` being one of the following: **Random, Crude, Normal, Superior, Legendary, Mythical, Artifact**. If `#Rarity` is omitted, the default rarity `#Random` will be used. 

For example, to set a legendary `BS_Flydragonsword` and a random `axe_machine` as the main weapons for the character:
**addZone_Palmia,addEq_BS_Flydragonsword#Legendary,addEq_axe_machine**

To add starting items to the character, use tag `addThing_ItemID#Count`. If `#Count` is omitted, a default of `1` item will be generated. 

For example, to add `padoru_gift` x10 and `scroll of ally` x5 to the character:
**addZone_Palmia,addThing_padoru_gift#10,addThing_1174#5**

## make an adventurer

Credits to 105gun.

If your character has trait **`Adventurer`** or **`AdventurerBacker`**, CWL will import the character as an adventurer, which will appear on the adventurer ranking list.

::: warning  
Starting from CWL 1.15.0, previous tags `addAdvZone`/`addAdvEq`/`addAdvThing` are now deprecated by the normal tags shown above, but still accepted.  
![img](https://i.postimg.cc/SN93258B/image.png)
:::

## prevent random visiting

Global characters randomly visit other towns if they are not in player's faction. You can use tag `addFlag_StayHomeZone` to make them stay in the home zone.  

This flag can be changed in drama sheet using `invoke*` action and `mod_flag(StayHomeZone, 0)` method, with `actor` cell filled in target character's ID (or `tg` as the drama target).  