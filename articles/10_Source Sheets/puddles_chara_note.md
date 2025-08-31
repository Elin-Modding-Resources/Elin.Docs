---
title: Chara
author: Puddles
description: Comments about columns of Chara sheet.
date: 2025/8/30 00:00
tags: SourceSheet/Chara
---

# Chara Sheet

<LinkCard t="SourceCard/Chara" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />

## id
`string`

The most important cell of an entry that distinguishes it from everything else on the SourceChara sheet. If the ID matches a vanilla entry's or another mod's entry's ID, the last sheet to load will override all the others. This value cannot have any spaces or special characters in it.

## _id
`int`

Used for sorting purposes in creature codex, can be any numeric value.

## name_JP
`string`

The Chara's in-name display name in Japanese.

## name
`string`

The Chara's in-game display name in non-Japanese.

## AKA_JP
`string`

The Chara's in-name alias/title in Japanese.

## AKA
`string`

The Chara's in-game alias/title in non-Japanese.

## idActor
`string`

This controls whether the Chara uses renders using PCC parts.
Ex. `pcc,unique,jure` makes it load the PCC parts in `pcc/unique/jure` folder.

## sort
`string`

Unused in SourceChara.

## size
`string`

The tile dimensions occupied by the Chara, normally empty.
Ex. 2,2 will make a Chara occupy 2x2 tiles, and prevent them from being shoved.

## _idRenderData
`string`

Determines whether or not the Chara will reference a sprite sheet.
- `chara`/`chara_L`...etc -> use the tile ID in `tiles` column as sprite. The texture is placed in **Texture Replace** folder.
- `@chara` -> use the same ID texture in **Texture** folder.

## tiles
`int`

Determines which sprite sheet tiles the Chara will display. LL and LLW use a different numbering system, reference existing in-game examples to ensure yours display properly.

## tiles_snow
`int`

On a map experiencing snow, this sequence of sprites replaces tiles. You want the same number of Ints in both tiles & tiles_snow.

## colorMod
`int`

Currently, the only usage is setting it to 100 for a grayscale sprite to have it inherit the mainElement's color.

## components
Unused in SourceChara.

## defMat
Unused in SourceChara.

## LV
`int`

The Chara's "Danger Level", this is used to both determine at what map Danger Level it can begin to spawn, their cost if they appear in the selection of a slave master or animal tamer, and generate its base stats using its race and job's assigned characteristics.

## chance
`int`

The modifier for the Chara's chance to spawn on maps (and sale lists?), default is 100.

## quality
`int`

0 —
1 —
2 —
3 — Unique Monsters (you can get eggs from these but not befriend, capture, or tame(?) them.)
4 — Unique Characters (you only get chicken eggs from them, and can befriend but not capture or tame(?) them.)


## hostility
`string`

The Chara's temperament towards you, your allies, and bystanders.
Blank — Hostile
Neutral — Will not attack you or anyone else unless attacked first.
Friend — Will attack anyone who attacks others with hostility Friend, including you if you haven't already incited them.

## biome
`string`

Increases(doubles?) the chance of the Chara to spawn on the indicated floor type, and decreases(halves?) the chance of the Chara to spawn on any others.
Ex. Setting Water as the biome for a new fish will greatly increase the chance of them spawning on a water floor (procedurally generated or manually placed), but they can still occasionally spawn elsewhere.

## tag
`string`

The usage of known tags will be included below, but further research may be needed to document unused or unimplemented tags:
`mini` — Chara has its sprite size halved.
`neutral` — No function as of 7/15/2025.
`noRandomProduct` — No panties from the Fortune Drum, possibly no doujin...?
`random_color` — Assign hair color to grayscale regions of sprite, when colorMod is 100.
`randomFish`
`staticSkin` — Overrides gender-based sprite assignment with an alternative.
`snow` — Chara will prioritize spawning on a snow tile.
`water` — Chara will prioritize spawning on a water tile.

## trait
`string`

Very complex, please reference further documentation for a list of available tags and what they do. Also links to `Trait*` C# class in Elin code/mod plugin.

## race
`string`

The assigned race of the Chara, using an id from SourceRace.

## job
`string`

The assigned class of the Chara, using an id from SourceJob, with the default none.

## tactics
`string`

Overrides the default tactics of the assigned job.

## aiIdle
`string`

Behavior that either supplements or overrides the default AI package.
Ex. Stand makes the Chara completely stationary, even when attacked.
Ex. Root makes the Chara completely stationary until attacked, or recruited into the party.

## aiParam
`string`

Three values, the first is the preferred distance from an enemy, the second is the likelihood per turn they will try to reposition to that distance, and the third—rarely used—is the likelihood of a "bonus" chance for them to reposition further still.

## actCombat
`string`

"Active" elements from the SourceElement go here, separated from each other by a comma. If you want there to be a fixed chance for the Chara to use something, add a / to the end of the element followed by a value between 1-101. For "buff" elements, you can add /pt to the end of the element so it knows to apply it to the whole party—but only after it's been turned into an ally. 
Ex. ActThrowPotion/30,SpWeakness,SpSpeedDown,SpWisdom/50/pt

## mainElement
`string`

mainElement is distinct from elements, as it assigns the actual elemental affinity of the Chara: Fire, Cold, Lightning, Darkness, Nether, Sound, Chaos, Poison, Cut, Acid, Impact.

## elements
`string`

"Passive" elements from SourceElement go here, separated from each other by a comma. If you want to specify how many levels the Chara has in the element, you can add a / to the end followed by the right appropriate value, assuming it isn't an Off/On element with no levels. Setting a 0 or negative value can modify an element inherited from the Chara's race.
Ex. invisibility/1 enables Invisibility, invisibility/0 would disable Invisibility inherited from race.
Ex. antidote/-30 would make the Chara's meat poisonous, antidote/30 would make their meat cure poison—or offset the kobolt race's inherent antidote/-30.

## equip
`string`

This allows you to override the randomized equipment template assigned by the Chara's job, but only if their Race's EQ entry is not empty.
Ex. publicPerformer's job is Thief, but since it has Archer as its equip entry, when generated it will spawn with Archer equipment.
Ex. billy's job is Wizard, but because its Race is Dog, it doesn't spawn with equipment. Even if you add Warrior to billy's equip entry, it still won't spawn with equipment.

## loot
`string`

This determines what the Chara can drop, in addition to its corpse and body parts. It accepts Thing and ThingV IDs separated by commas, with an / at the end of each ID followed by an integer. Every 20 is another 1%.
Ex. If I add medal/500 to my Gold Kiwi, it has a 25% chance to drop a Small Medal when killed. If I change it to 3000, it has a 150% chance, meaning a certain 1 and a 50% chance of another.

## category
`string`

All Chara entries seem to use the default chara value for this category.

## filter
`string`

Unused in SourceChara.

## gachaFilter
`string`

Gacha result picks a category from resident, livestock, Unique or default, and then generates your lucky reward based on the category, specified by gacha filter. If you got a livestock result then you will not get any Chara that doesn't have livestock in the gacha filter.

## tone
`string`

Dialogue modifiers for Japanese text.

## actIdle
`string`

Behavior that guides what the Chara does when outside of combat. Most have no additional instructions.
Ex. readBook makes the Chara regularly generate a random book in their inventory to read, and then remove it.
Ex. buffMage makes the Chara periodically cast a spell like spResElement or spHero.

## lightData
## idExtra
## bio
## faith
## works
## hobbies

## idText 

Links to entry in `CharaText` sheet.

## moveAnime

## Factory
Unused in SourceChara.
## components
Unused in SourceChara.
## detail_JP
Not used in SourceChara, but you can use it for notes.
## detail
Not used in SourceChara, but you can use it for notes.



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
