---
title: Race
author: Han
description: Comments about columns of Race sheet.
date: 2025/12/11 00:00
tags: SourceSheet/Job
---

# Job Sheet

<LinkCard t="SourceCard/Race" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />
The Job Sheet is stored inside the Chara sheet, change the tile at the bottom.

## id
'string'
The most important cell of an entry that distinguishes it from everything else on the Source sheet. If the ID matches a vanilla entry's or another mod's entry's ID, the last sheet to load will override all the others. This value cannot have any spaces or special characters in it.

## name_JP
'string'
The name of this job in Japanese.

## name
'string'
The name of this job in English.

## playable
'int'
An int that designates if this job is usable by players or not during character creation.
1 is accessible to players and is considered a basic job.
4 and 5 are "Advanced" jobs.
7 and above are not available to the player. These are usually rare jobs for NPCs.

## STR/END/DEX/PER/LER/WIL/MAG/CHA/SPD
'int'
Self explanatory, additional attribute parameters added to the character from this job.

## ratio
'???'
Macro to approximate the job strength, unused in game but must be present in the sheet. Leave Blank.

## elements
'elements'
Inherent elements added onto this race. Used to add job feats, base skill bonuses.
format is <element alias>/<value> as <string>/<int>

## weapon
'string[]'
A list of weapons item names. This will be used on generation to equip them with items. For example, a default npc with the warrior class will be generated randomly with one of sword,axe,blunt,polearm,scythe.

##equip
'string'
Related to weapon, basically these are preset "loadouts" you can assign a job to be equipped with. Like a warrior would get melee armor and whatnot.

## domain
'string[]'
Which domains this job starts with.

## detail_JP
'string'
The details/backstory of this job in Japanese.

## detail
'string'
The details/backstory of this job in English.

<style scoped>
.vp-doc h1,
.vp-doc h2,
.vp-doc h3,
.vp-doc h4,
.vp-doc h5,
.vp-doc h6 {
  text-transform: none;
}
</style>
