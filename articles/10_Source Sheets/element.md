---
title: Element
author: Han
description: Comments about columns of Element sheet.
date: 2026/6/13 00:00
tags: SourceSheet/Element
---

# Element Sheet

<LinkCard t="SourceGame/Element" u="https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1102059407#gid=1102059407" />
The Element Sheet is stored inside the Game sheet. Should be the first one visible.

## id
`int`  
The most important cell of an entry that distinguishes it from everything else on the SourceChara sheet. If the ID matches a vanilla entry's or another mod's entry's ID, the last sheet to load will override all the others. This value cannot have any spaces or special characters in it.

## alias
`string`  
The string alias of this Element. Usually people should be using the Id to access the element, but this gives them a string representation as well. Used by the other aliasX columns that we will cover below.

## name_JP
`string`  
The name of this element in Japanese.

## altname_JP
`string[]`  
A comma seperated list of values that contain alternative adjectives in Japanese for this element. Usually only for the magical elements like Fire being equated with red, burning.

## altname
`string[]`  
A comma seperated list of values that contain alternative adjectives for this element. Usually only for the magical elements like Fire being equated with red, burning.

## aliasParent
`string`  
A string pointing to the alias of a parent element for this element. This is used for multiple things.  
- It maps a specific magical element to its parent attribute (e.g. Fire -> MAG and Holy -> WIL.)  
- It maps the resistances to a specific magical element to it's original magic element (e.g. resFire -> eleFire.)  
- It maps specific mutations to their negative versions. (e.g. Lithe Leg which increases speed to Twisted Legs which reduces speed.)
- It maps abilities and spells to their parent attribute for calculations (e.g. Swarm is mapped to DEX while Bladestorm is mapped to STR)

## aliasRef
`string`  
A string pointing to the alias of a reference element for this element. This is used for multiple things.
- For Multiplier Elements (e.g. r_life, r_mana, r_DV, r_PV), these point at the element that is being multiplied.
- For Magical Elements (e.g. eleFire) this will point at the resistance element (e.g. resFire.)
- For abilities/spells, (e.g. Suicide Bomb) these will point at the element used for damage (e.g. eleImpact.)
- "mold" is a special alias that can be used here that is used in the generation of spells in all magical elements. (e.g. breathe_ with mold will generate breathe_fire, breathe_cold... etc.)

## aliasMtp
`string`  
A string pointing to the alias of the element that is a multiplier of the current row. (e.g. life is multiplied by r_life.)

## parentFactor
float
A value used as a multiplier for calculations regarding this element, such as potential, spell power scaling, etc.

## lvFactor
`int`  
A value used as part of the calculations regarding this element. Not sure how it's

## encFactor
`int`  
A value used as part of the calculations when calculating this element for enchantments, like on random gear.

## encSlot
`string`  
A comma seperated list of strings that represents what slots this skill or enchantment can be applied to.
Yes, it's defined as string and is used as a string[].
Examples include:
- weapon
- all
- shield
- body parts like back, finger, waist, head, etc.


## mtp
`int`  
An int used in calculations for this element.

## LV
`int`  
An int used to determine the "level" of this element.
For some elements like spells, it dictates requirements for spawning. Earthquake is level 20, while Meteor is level 30, making them a lot harder to find at low level spell vendors than say Fire Ball which is only level 15.  
For other elements like Enchantments, it dictates what danger level is needed for them to spawn. Finding resist fire/cold/lightning is easy at level 15 while resist cut and impact are much higher at 100 and 200 respectively.

## chance
`int`  
An int that influences the spawn chance for RNG goodness. When it's 1000, it spawns commonly, and the lower it goes the rarer it will be, with 0 making it impossible to spawn normally.

## value
`int`  
An int that influences the item value specific for this element. Such as a spellbook of a spell, or a specialized skillbook of a skill.

## cost
`int[]`  
For spells and abilities, this influences the starting cost of the spell/abilities before scaling with level.

## geneSlot
`int`  
Dictates how many gene slots this skill/feat/spell/ability will take when using gene editing. If set to -1, this element will excluded from the gene engineering pool and cannot be gene edited on.

## sort
`int`  
The int weight for sorting. Mostly used for Abilities and Spells, impacts in what order they show up in your Spell/Ability list.

## target
`string`  
For Abilities and Spells only. This column shows how the given action is used.
- Self: This action targets the caster, so it will be activated when simply clicked, such as Ball spells.
- Ground: This action targets an empty tile, such as Flare spells.
- Neighbor: This action targets an adjacent character, such as Hand spells.
- Chara: This action targets a specific character within range, such as Arrow spells.
- Party: This action targets the entire party, such as Absorb Mana.
- SelfParty: This action applies to the player party. This is used for spells that can target inventories, such as enchanting weapon/armor, and identification spells, and will bring up the selection screen after casting.
- Select: This action can be used as self casting, OR targetting a specific character, such as Healing spells.
- Enemy: This action can only be used to target characters hostile to you and your party.

## proc
`string[]`  
Can either be one string or two strings separated by a comma. For Abilities and Spells only. This column has multiple uses.
- When used with Buffs and Debuffs, this column is used by the Combat AI to understand what condition is applied with this action.  
For example: Natures Embrace has Buff,ConHOT which tells the game this ability applies the Buff ConHOT to a character, and thus if your entire party is already affected by ConHOT, the AI will skip over this ability when evaluating what ability to use.
- For vanilla abilities/spells, there is a large ActEffect class that handles the effect of these spells, so this column will be used as the EffectId string in that function. (e.g. Breathe maps to EffectId.Breathe.)
- For some summon spells/abilities, this column starts with Summon, then the chara id of the entity being summoned (e.g. Summon,monster for SpSummonMonster.) However, do be careful since there is still some degree of coding with regards to scaling and elemental types involved in the ActEffect class, so when wanting to add new summoning spells this might not be as straightforward.

## type
`string`  
A string pointing at the class this element uses codewise. Common ones include Element, Ability, Spell, Feat.
VERY IMPORTANT FOR MODDING as you will have to point this at your own custom class name. (e.g. MyCustomFeat or ActMyCustomAbility.)

## group
`string`  
Elements in Elin cover a lot of things. You can see in the Group column what categories there are. In general they are pretty self explanatory of what the group covers.
- ELEMENT : Card elements
- SLOT : Body Parts.
- SKILL : Skills 
- ENC : Enchants.
- FOOD : Food Effects.
- DOMAIN : Religious Domains
- FEAT : Feats.
- MUTATION : Mutations.
- FACTION : Faction Skills (The ones that can scale, like Fertility)
- POLICY : Faction Policies (The ones that change effects when turned on/off, like Weed Pulling Campaign)
- ABILITY : Abilities (Bladestorm, dream larva, usually cost stamina)
- SPELL : Spells

## category
`string`  
Which category this element falls under, somewhat redundant with group to be honest.

## categorySub
`string`  
Which subcategory this element falls under. This can be used for Skills, Land Feats, Feats, Elemental attacks, Abilities, and Spells.

## abilityType
`string[]`  
Used for abilities and spells, this is used a bit in the Combat AI, storing information on what kind of effect this ability does.

## tag
`string[]`  
A variety of tags that can be added to an element used for a variety of things. Can dictate where specific spells can show up, or whether they will allow you to maintain invisibility after using it. Whether this spell has a domain related to it, or whether it's a negative effect or not.

## thing
`string`  
A list of space separated letters for Spells only. You can have B, S, or R in here, dictating if the given spell can show up as a Spellbook, Scroll, or Rod.

## eleP
`int`  
The base elemental power of this element. Used mostly for elemental spells and abilities, used for calculating elemental debuffs.

## cooldown
`int`  
A cooldown to add to the character when using this element in turns.

## charge
`int`  
TODO: VERIFY
When granting charges of this spell, this dicates how many base charges will be granted. (e.g. reading a book of Fire Ball will grant 10 charges + whatever extra you get from other bonuses.)

## radius
`float`  
The radius of this spell or ability. (e.g. Bolts have 99 radius as they hit everything in that line that stretches to the horizons.)

## max
`int`  
For feats, this int represents what the max level the feat can attain. (e.g. Metal goes up to 999.)

## req
`string[]`  
For some feats or skills, they will require another element, or another element at a specific level to be unlocked. (e.g. In order to take the Dream Waker feat, you will have to have at the Casting Skill unlocked.)

## idTrainer
`string`  
For skills teachable by trainers, this column points at what kind of trainer will teach this skill.

## partySkill
`int`  
An int that's actually a bool. 0 for False, 1 for True. For specific spells/abilities, this dictates whether the ability can be used on the entire party.

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
