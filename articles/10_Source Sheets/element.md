---
title: Element
author: Han
description: Reference for the Element source sheet columns.
date: 2026/6/13 00:00
tags: SourceSheet/Element
---

# Element Sheet

<LinkCard t="SourceGame/Element" u="https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1102059407#gid=1102059407" />

The Element Sheet is stored inside the Game sheet. It should be the first tab visible.

When making source sheets, always copy the first 3 rows from official rows and start your data at the 4th row. Do not alter the column order.

## Sheet Columns

|Column|Type|Description|
|-|-|-|
|id|int|Unique identifier for the element. If the ID matches a vanilla or another mod's entry, the last sheet loaded overrides all previous ones. Cannot contain spaces or special characters.|
|alias|string|String alias for this element. Usually the ID is preferred for access, but this provides a string representation. Used by the other `aliasX` columns below.|
|name_JP|string|Display name in Japanese.|
|altname_JP|string[]|Comma-separated list of alternative Japanese adjectives for this element. Mostly used for magical elements (e.g., Fire → red, burning).|
|altname|string[]|Comma-separated list of alternative English adjectives for this element. Mostly used for magical elements (e.g., Fire → red, burning).|
|aliasParent|string|Alias of a parent element. See [aliasParent](#aliasparent) below.|
|aliasRef|string|Alias of a reference element. See [aliasRef](#aliasref) below.|
|aliasMtp|string|Alias of the element that acts as a multiplier for this row (e.g., `life` is multiplied by `r_life`).|
|parentFactor|float|Multiplier used in calculations for this element (potential, spell power scaling, etc.).|
|lvFactor|int|Value used in element-related calculations.|
|encFactor|int|Value used when calculating this element for enchantments (e.g., random gear generation).|
|encSlot|string|Comma-separated list of equipment slots this skill/enchantment can appear on. Examples: `weapon`, `all`, `shield`, `back`, `finger`, `waist`, `head`.|
|mtp|int|Integer used in element calculations.|
|LV|int|"Level" of this element. See [LV](#lv) below.|
|chance|int|Spawn chance weight. `1000` = common; lower values = rarer; `0` = never spawns naturally.|
|value|int|Item value modifier specific to this element (e.g., spellbook of a spell, skillbook of a skill).|
|cost|int[]|For spells and abilities: the base cost before scaling with level.|
|geneSlot|int|Number of gene slots this skill/feat/spell/ability occupies when gene editing. `-1` excludes it from the gene engineering pool entirely.|
|sort|int|Sort weight. Mostly used for abilities and spells to determine order in the spell/ability list.|
|target|string|For abilities and spells only. See [Target](#target) below.|
|proc|string[]|One or two comma-separated strings. For abilities and spells only. See [Proc](#proc) below.|
|type|string|The C# class this element uses. Common values: `Element`, `Ability`, `Spell`, `Feat`. **Critical for modding:** point this at your own custom class name (e.g., `MyCustomFeat` or `ActMyCustomAbility`).|
|group|string|Broad category of the element. See [Group](#group) below.|
|category|string|Sub-category of the element. Somewhat overlaps with `group`.|
|categorySub|string|Further sub-classification. Used for Skills, Land Feats, Feats, Elemental attacks, Abilities, and Spells.|
|abilityType|string[]|For abilities and spells: stores information about the kind of effect, used by the Combat AI.|
|tag|string[]|Various tags applied to the element. Controls where spells appear, whether invisibility is maintained after use, domain associations, negative/positive effect classification, etc.|
|thing|string|Space-separated letters for spells only: `B` = Spellbook, `S` = Scroll, `R` = Rod. Dictates which item forms the spell can appear in.|
|eleP|int|Base elemental power. Used primarily for elemental spells/abilities when calculating elemental debuffs.|
|cooldown|int|Cooldown applied to the character after using this element, in turns.|
|charge|int|Base charges granted when acquiring this spell (e.g., reading a Fire Ball book grants 10 charges + bonuses).|
|radius|float|Radius of the spell or ability (e.g., Bolts use `99` to hit everything along the line to the horizon).|
|max|int|For feats: the maximum level attainable (e.g., Metal goes up to `999`).|
|req|string[]|For feats and skills: prerequisite elements or element levels required to unlock (e.g., Dream Waker requires the Casting skill).|
|idTrainer|string|For skills teachable by trainers: which trainer type teaches this skill.|
|partySkill|int|Boolean (`0` = false, `1` = true). Dictates whether the ability can be used on the entire party.|

## aliasParent

The `aliasParent` column points to the alias of a parent element. It serves several purposes:

- Maps a magical element to its parent attribute (e.g., Fire → MAG, Holy → WIL).
- Maps resistance elements to their source magic element (e.g., `resFire` → `eleFire`).
- Maps positive mutations to their negative counterparts (e.g., Lithe Leg → Twisted Legs).
- Maps abilities and spells to their parent attribute for calculations (e.g., Swarm → DEX, Bladestorm → STR).

## aliasRef

The `aliasRef` column points to the alias of a reference element. It serves several purposes:

- For multiplier elements (e.g., `r_life`, `r_mana`, `r_DV`, `r_PV`): points at the element being multiplied.
- For magical elements (e.g., `eleFire`): points at the corresponding resistance element (e.g., `resFire`).
- For abilities/spells (e.g., Suicide Bomb): points at the damage element (e.g., `eleImpact`).
- `mold` is a special alias used to generate spells for all magical elements (e.g., `breathe_` + `mold` generates `breathe_fire`, `breathe_cold`, etc.).

## LV

The `LV` column determines the "level" of this element:

- **Spells:** Dictates spawn requirements. Earthquake is level 20, Meteor is level 30 — much harder to find at low-level spell vendors than Fire Ball (level 15).
- **Enchantments:** Dictates the danger level needed for them to spawn. Resist fire/cold/lightning are easy to find at level 15, while resist cut and impact are much higher at 100 and 200 respectively.

## Target

For abilities and spells only. Determines how the action is used:

|Value|Description|
|-|-|
|Self|Targets the caster. Activated on click (e.g., Ball spells).|
|Ground|Targets an empty tile (e.g., Flare spells).|
|Neighbor|Targets an adjacent character (e.g., Hand spells).|
|Chara|Targets a specific character within range (e.g., Arrow spells).|
|Party|Targets the entire party (e.g., Absorb Mana).|
|SelfParty|Applies to the player party. Used for inventory-targeting spells (e.g., enchant weapon/armor, identification) — brings up a selection screen after casting.|
|Select|Can target either self or a specific character (e.g., Healing spells).|
|Enemy|Can only target hostile characters.|

## Proc

For abilities and spells only. Can be one string or two comma-separated strings. Has multiple uses:

- **Buffs/Debuffs:** Tells the Combat AI what condition is applied. For example, Nature's Embrace has `Buff,ConHOT` — the AI will skip this ability if the entire party already has ConHOT.
- **Vanilla abilities/spells:** Acts as the `EffectId` string in the `ActEffect` class (e.g., `Breathe` maps to `EffectId.Breathe`).
- **Summon spells/abilities:** Starts with `Summon`, followed by the character ID of the summoned entity (e.g., `Summon,monster` for SpSummonMonster). Note: summon scaling and elemental type handling still involves hardcoded logic in the `ActEffect` class, so adding new summon spells may not be straightforward.

## Group

Elements in Elin cover many categories. The `group` column is generally self-explanatory:

|Group|Description|
|-|-|
|ELEMENT|Card elements|
|SLOT|Body parts|
|SKILL|Skills|
|ENC|Enchantments|
|FOOD|Food effects|
|DOMAIN|Religious domains|
|FEAT|Feats|
|MUTATION|Mutations|
|FACTION|Faction skills (scalable, e.g., Fertility)|
|POLICY|Faction policies (toggle on/off, e.g., Weed Pulling Campaign)|
|ABILITY|Abilities (Bladestorm, Dream Larva; usually cost stamina)|
|SPELL|Spells|

## tagTrainer
`string`  
Seems to be deprecated.

## levelBonus_JP
`string`  
A description that shows information on extra bonuses provided by this element in Japanese (e.g. the Shield Skill gives extra effects at level 5 and 10.)

## levelBonus
`string`  
A description that shows information on extra bonuses provided by this element in English (e.g. the Shield Skill gives extra effects at level 5 and 10.)

## foodEffect
`string[]`  
Points at elements that get applied when an item that has this element is consumed (e.g. eating items with the "cat" element will cause a karma loss. Don't eat cats.)

## langAct
`string[]`  
Points at an entry in the langGeneral to change what text is shown when using this ability.

## detail_JP
`string`  
The details of this element in Japanese.

## detail
`string`  
The details of this element in English.

## textPhase_JP
`string`  
Flavor text in Japanese.
This will show extra data when hovering over the element and can be separated with \\n to add extra lines for multi-stage feats.

## textPhase
`string`  
Flavor text in English.
This will show extra data when hovering over the element and can be separated with \\n to add extra lines for multi-stage feats.

## textExtra_JP
`string`  
More Flavor text in Japanese.
For feats, this string in this column is shown to the right of the textPhase flavor text as well as under the textPhase flavor text when hovering.

## textExtra
`string`  
More Flavor text in English.
For feats, this string in this column is shown to the right of the textPhase flavor text as well as under the textPhase flavor text when hovering.

## textInc_JP
`string`  
In the rare case of gaining a specific element, this Japanese text is shown in in the message log. (e.g. becoming a cannibal.) 

## textInc
`string`  
In the rare case of gaining a specific element, this Japanese text is shown in in the message log. (e.g. becoming a cannibal.) 

## textDec_JP
`string`  
Opposite of textInc_JP, when losing a specific element.

## textDec
`string`  
Opposite of textInc, when losing a specific element.

## textAlt_JP
`string[]`
TODO: Need validation
This kind of feels like it duplicates the data found in langList, where it adds extra names for specific levels of a trait in Japanese.

## textAlt
`string[]`  
TODO: Need validation
This kind of feels like it duplicates the data found in langList, where it adds extra names for specific levels of a trait in English.

## adjective_JP
`string[]`  
Appears to be Deprecated

## adjective
`string[]`  
Appears to be Deprecated

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
