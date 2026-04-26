---
title: Race
author: Han
description: Comments about columns of Race sheet.
date: 2025/9/19 00:00
tags: SourceSheet/Race
---

# Race Sheet

<LinkCard t="SourceCard/Race" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />
The Race Sheet is stored inside the Chara sheet, change the tile at the bottom.

## id
'string'
The most important cell of an entry that distinguishes it from everything else on the SourceChara sheet. If the ID matches a vanilla entry's or another mod's entry's ID, the last sheet to load will override all the others. This value cannot have any spaces or special characters in it.

## name_JP
'string'
The name of this race in Japanese.

## name
'string'
The name of this race in English.

## playable
'int'
An int that designates if this race is usable by players or not during character creation.
4 and under is accessible.
5 is listed under "Advanced" races.
7 and 8 are mostly NPC races.
9 is usually reserved for special races like gods/demons, etc.

## tag
'string[]'
A comma seperated list of strings that adds tags to this Race. These tags are used in various locations and for different uses.
Some of the common tags:
human - Whether they will speak common.
fairy - If this race is a fairy. 
humanSpeak - Non humanoid races that can speak common.
gelatin - This race is considered a putit for spawning purposes (Needs confirmation.)
sand - This race will spawn in sand zones.
ride - This race has good riding aptitude.
mofu - This race will be incessantly harassed and fluffed without consent by everyone and everything.
fish - This race is considered a fish. Used for Bane.
undead - This race is considered undead. Used for Bane. Cannot be detected with Telepathy.
god - This race is considered a god. Do not watch birds with.
animal - This race is considered an animal. Used for Bane as well as can show up in Animal Tamers.
sleepBeside - This race will try to sleep alongside you if it's in your faction and zone because they're loyal.
noRide - This race has bad riding aptitude.
insect - This race is considered an insect.
plant - This race is considered a plant. Can be dominated by Kumiromi.
filth - ... Not really sure about this one?
dragon - This is considered a dragon.
webfree - This race can freely move through webs, used for spiders.
cat - This race is a cat. Do not eat.
water - This race will spawn in water zones.
machine - This race is considered a mchine. Can be dominated by Mani. Can be upgraded by Mani Shotgun Faction effect.
horror - This race is considered a horror. Cannot be detected with Telepathy.

## life
'int'
The base life stat. Determines health pool.

## mana
'int'
The base mana stat. Determines mana pool.

## vigor
'int'
the base stamina stat. Determines stamina pool.

## DV
'int'
The base dodge value. This race has built in dodging, a la fairy.

## PV
'int'
The base protection value. This race has built in protection, a la golem.

## PDR
'int'
Physical Damage Reduction. This is a percent reduction in damage done to this race from physical damage sources.

## EDR
'int'
Elemental Damage Reduction. This is a percent reduction in damage done to this race from elemental damage sources.

## EP
'int'
Evade Perfect. This race has an additional protection layer via perfect evasion, which is a separate evasion roll.

## STR/END/DEX/PER/LER/WIL/MAG/CHA/SPD
'int'
Self explanatory, base attribute parameters.

## ratio
'???'
Macro to approximate the race strength, unused in game but must be present in the sheet. Leave Blank.

## INT
'int'
The "intelligence" of this race. Used to determine if they're smart enough to open a door on their own.
Less than 10 makes them too dumb to do so.

## martial
'int'
Game usage unknown. Leave as 3 (Same for Yerles)

## pen
'int'
Game usage unknown. Leave as 0.

## elements
'elements'
Inherent elements added onto this race. Used to add racial feats, base skill bonuses (which will also add base potential)
format is `element alias/value` as `string/int`

## skill
'string'
Game usage unknown. Leave blank.

## figure
'string[]'
This column dictates what body parts this race starts with. There are different characters that represent different body parts in Kanji separated by pipes ('|')
頭 Head
首 Neck
体 Body
背 Back
手 Hand
指 Finger
腕 Arm
腰 Waist
脚 Leg
足 Foot

## geneCap
'int'
How many gene slots this race has.

## material
'string'
What this race is made out of.

## corpse
'string[]'
When a corpse is dropped out killing this race, what is it made out of.

## loot
'string[]'
loot specific to this race.

## blood
'int'
The color of the blood from this race.
(Needs a double check in this section)
2 is the normal red blood stuff.

## meleeStyle
'string'
The effect of the melee from this character.
Leave it blank to have default melee.
Other options are:
Claw/Bite/Kick/Touch/Spore/Sting/Gaze

## castStyle
'string'
The effect of the casting from this race. Mostly used for flavor text.

## EQ
'string[]'
Determines when a new character of this race spawns what kind of equipment they get spawned with.
EQ is an alternate way to enable equipments assignment when creating characters, in this case you can fill in anything.
Two usual options are "all" and blank.

## sex
`int`
This one is weird. It determines what the spawning gender is.
All I know is 0 == Female only
There appears to be 50/51/52/53/54/55/56, but really not sure where this is used.

## age
'int[]'
The age ranged used when spawning this race as comma sepearated numbers, start/end
so 8,50 means they will spawn between the ages of 8 and 50.

## height
`int`
The average height of this race.

## breeder
`int`
Whether or not this race is good for breeding. Used when this race is set as livestock to determine their production rates.

## food
`int[]`
A multiplier for how good the meat of this race is.

## fur
'string'
A set of strings in "category/material" format that dictate what happens when you shave this race.

## detail_JP
'string'
The details/backstory of this race in Japanese.

## detail
'string'
The details/backstory of this race in English.

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
