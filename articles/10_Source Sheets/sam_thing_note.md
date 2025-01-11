---
title: Thing
author: SamInJapan
description: Comments about columns of Thing sheet.
date: 2025/1/10 16:00
tags: SourceSheet/Thing
---

# Thing Sheet

<LinkCard t="SourceCard/Thing" u="https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=654432269#gid=654432269" />

## ID
`string`

An unique identifier for the item.

## name_JP / name
`string`

How the object is displayed in game.

## unknown_JP
`string`

## unit_JP
`string`

These are basically just "what is the Japanese language counter for this object" because that's how Japanese is. They don't apply to the EN version directly it seems.

|unit|romanji|english|
|-|-|-|
|塊|katamari|cluster, clump|
|振り|furi|handheld, melee?|
|対|tai|pair of melee things like gloves|
|台|dai|machine, pedastal, harp|
|挺|tei|long narrow things like guns, scissors, hoes, etc|
|発|hatsu|ammo|
|本|hon|base, body, object|
|枚|mai|sheet of something|
|粒|tsubu|grain, pebble|
|巻|maki|rolled object|
|冊|saku|booklet|
|錠|jou|pill|
|隻|seki|boat, ship|
|束|taba|bundle, bunch|
|体|karada|form, statue|
|袋|fukuro|bag of...|
|張|chou/hari|stretched|
|杯|hai|cup of...|
|匹|biki|(small) animal|
|品|hin|object|

## unit 
`string`

The type of object it is.

+ bottle
+ box
+ bucket
+ bundle
+ can
+ chunk
+ feather
+ gift box
+ grand cross
+ grimoire
+ handful
+ letter
+ painting
+ pair
+ piece
+ pinch
+ poster
+ pot
+ rod
+ set
+ signboard
+ spellbook
+ staff
+ statue
+ syringe
+ tree
+ tuft
+ whip
+ whistle

## unknown
`string`

If it is something special or unique or has a property like "#randomBook" or the like

+ `#randomBook`
+ `#randomPotion`
+ `#randomRod`
+ `#randomScroll`
+ `#randomSpellBook`
+ unique item/title i.e. `"bewitched sword"`

## category
`string`

The category of thing the item belongs to. It is used for things like auto-dumping. It is also used for the crafting/recipe menu when linked to a custom category you defined in the `Category` sheet.

## sort
`int`

How the item is sorted, such as assigning it as a bow (2200 range bow) or whatever.

## _tileType
`string`

How is the object displayed? As a block, door, window, etc.

|type|detail|
|-|-|
|ObjBig|can't move over it|
|ObjHuge|also can't move over it|
|Door|needs a wall and assigns it as a door/opening|
|Slope|changes your movement speed as if you're going up and over it|
|Stairs|same as slope but more dramatic change in speed, height, and length of moving up/down it|
|Paint|requires a wall to attach it to|
|WallHang|requires a wall to attach it to|
|Window|requires a wall to attach it to, hides it when the windows would be hidden on the building, like when you're inside of it|

## _idRenderData
`string`

The one most used. How should the object "sit" on the ground and where the clipping happens.

+ Use `@obj` for custom things that **ARE NOT** using Texture Replacement
  + Make sure the name is the same as the `id`
  + Make sure it's `.png` not `.PNG` as it won't work
  + Should be in the `Texture` folder of the mod

+ Use `obj` for custom things using Texture Replacement, this occupies a tile in the sheet and may collide with other people.
  + Make sure the name is `obj_tileID`, such as `objS_5032`
  + Make sure it's `.png` not `.PNG`
  + Should be in the `Texture Replace` folder of the mod

+ For snow tiles:
  + `@obj` use `ID_snow.png`
  + `obj` use `objSnow_tileID.png`
    + For example:
      + regular item: `obj_123.png`
      + snow item: `objSnow_123.png`
      + small item:	`objS_456.png`
      + small snow:	`objSSnow_456.png`

<LinkCard t="Same's Notes on _idRenderData" u="https://elin-modding-resources.github.io/Elin.Docs/articles/15_Texture%20Mods/sam_id_render_data" />

## tiles 
`int`

For replacement textures, what tile is it replacing in the texture sheet. This is also the number used for replacement naming. If there are more than one, the order goes:

image >> image reversed >> image2 >> image2 reversed

For example, if there is a front and back version of something, it would be:

123,-123,456,-456 (`obj_123.png` being front, `obj_456.png` being back)

## altTiles
`int`

For replacement textures, these are variants like a closed chest when stuff is in it.

## anime
`int`

First number is how many frames the animation is, the second is how long each frame plays before moving on.

## skins
`int`

## size
`int`

For large objects that take up more than one grid space. First number is vertical/height, second is horizontal/width.

## colorMod
`int`

Saturation of the color used *I think*.

## colorType
`string`

Does it use the default color of the **FIRST ITEM** used for crafting, or does it use the alt (secondary) color? Also, accepts random for randomly colored items.

## recipeKey
`string`

How is the recipe acquired?

|string|type|
|-|-|
|`*`|known by default at the assigned workbench|
|`character id`|sold by a specific character as part of the story|

## factory
`string`

Where do you make the item in game? If the item is not craftable by the PC, this can be left blank

|name|type|
|-|-|
|quick craft|self|
|workbench|workbench|
|tinker's table|factory_tinker|
|drafting table|workbench2|
|signboard workshop|factory_sign|
|carpenter's table|factory_wood|
|blacksmith's table|factory_metal|
|anvil|anvil|
|machine table|machinebench|
|mason's table|factory_stone|
|glassmaker's table|factory_glass|
|accessory table|factory_accessory|
|loom|loom|
|writing tool|tool_writing|
|stove|stove|

## components
`string`

What is being used to make the item, the ingredients.

For example:

`well` has `rock/10,rope/3,log/2`

This means you need 10 of something tagged as rock material, 3 ropes, and 2 logs.

`sickle` has `rock/2|ingot,string/1,stick/1`

This means you can use either 2 rock materials or 2 ingots. `|` means "or."

`bookshelf` has `plank/4,#book,#book`

This means you need 4 planks, and the `#book` means you have to choose something in your inventory that matches the category `book`.

## disassemble
`string`

## defMat
`string`

The default material the item is made of, and what color is applied (if applicable) on the icon/preview image (i.e. `oak`).

## tierGroup
`string`

## value
`int`

How much it's worth.

## LV
`int`

Crafting skill level to make.

## chance
`string`

## quality
`int`

## weight
`int`

How much does it weigh? For example, a seed is `30`, a rod is `500`, a regular bed is `4500`, and a piano is `85000`.

## electricity
`int`

How much electricity does it draw? A monitor is `-10`, for example.

## trait
`string`

Unique actions depending on what type of object it is, how the game will recognize it.

Containers|Container,rows,columns,background image,special notes on what it can hold
	Example: beekeep,2,2,crate,honey
	Example 2: ChestPractice,7,5,crate

## elements
`string`

The `alias` from the `Element` sheet which defines certain actions or abilities. The number is the level/strength of it (i.e. `lumberjack/4` will display in game as `Lumberjack [****]` or the like).

<LinkCard t="SourceGame/Element" u="https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1145313854#gid=1145313854" />

## range
`int`

For a weapon, how far can it shoot? For example, a short bow is 1, a regular bow is 3, and a rail gun is 5.

## attackType
`string`

What type of damage or weapon is it when it's used as equipment?

+ Blunt
+ Bow
+ Cane
+ Claw
+ Gun
+ Pierce
+ Punch
+ Slash

## offense
`int`

Series of 4 numbers, unsure what they mean exactly.

## substats
`int`

## defense
`int`

I assume it is DV and then PV.

## lightData
`string`

If the object emits light, how does it look? 

+ altar_machine
+ bonfire
+ fireplace
+ fridge
+ gacha
+ general
+ klin <-- this is a typo that's in the game
+ lamp_sun
+ lamp_table
+ light_floor
+ light_spot
+ light_stand
+ light_wall

## idExtra
`string`

## idToggleExtra
`string`

If it can be turned on/off I think for lighting.

## idActorEx
`string`

If there are ambient effects going on around it.

+ amb_boat
+ amb_crowd
+ amb_fire
+ amb_fountain
+ amb_smelter

## idSound
`string`

If there is a sound associated with creating the item. Common ones are:

+ glass (for things like windows, potions, drinks)
+ money (for coins)
+ paper (for posters)

## tag
`string`

If there is some sort of built in action associated with the item. Examples:

+ `exotic`
+ `godArtifact`
+ `noWish`
+ `tourism`
+ `rareResource`
+ `snowTile` <-- this one doesn't have to be assigned if you've set up your obj as noted above, but it doesn't hurt to declare it I think
+ `throwWeapon` <-- if it comes back to you like a boomerang

## workTag
`string`

## filter
`string`

If things can come from other places other than crafting.

+ fish, can be found while fishing randomly
+ gacha, get from gacha machine
+ supply, supply category
+ others...

Game may call `CreateFromFilter` to randomly generate items based on filter.

## roomNameJP
`string`

Does this define a specific room? Such as "bedroom" or "bathroom" or the like. This is the JP name for it. It can have multiple entries with a comma between them.

## roomName
`string`

The English version of the room name. Example: Bedroom or Kitchen,Dining Room

## detail_JP
`string`

If there is an item description associated with the object. This shows in game above the stat info on the item. This is the Japanese entry. Example (delivery box): 中に入れたものを拠点に宅配してくれる箱だ。荷物は出荷後に訪れた拠点に届く。

## detail
`string`

Same as above but the English entry. Example (delivery box): A box that delivers the items placed inside it to a base. The packages will be delivered to the base that was visited after shipment.

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
