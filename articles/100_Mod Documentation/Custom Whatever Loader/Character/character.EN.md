---
title: Custom Chara [EN]
date: 2025/1/3 01:00
hide: true
---

## Import Custom Character

Assumes you already have your custom character defined in a Chara sheet. You may take reference from existing mods or Elin Sources.
<LinkCard t="SourceChara" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn" />

CWL utilizes the tag cell of the Chara row to add features, you may add as many tags as you want. **Remember, tags are separated by `,` (comma) with no spaces in between**. 

If you need additional features, don't hesitate to ask!

## spawn on game load

To let CWL spawn the character to a zone, use tag `addZone_*` and replace the `*` (asterisk) with zone **type name** or keep the asterisk for a random zone. 

For example, to spawn the chara in little garden, use `addZone_LittleGarden`. Check the [SourceGame/Zone](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_) and reference the type column for a list of valid zone names.

If your game already has the character present, then CWL will skip it.

## add equipment/thing

When CWL spawns your character, you may also define the starting equipments and things for this character, using tag `addEq_ItemID#Rarity` and/or `addThing_ItemID#Count`.

To assign specific equipment to the character, use tag `addEq_ItemID#Rarity`, where `ItemID` is replaced by the item's ID, and `Rarity` being one of the following: **Random, Crude, Normal, Superior, Legendary, Mythical, Artifact**. If `#Rarity` is omitted, the default rarity `#Random` will be used. 

For example, to set a legendary `BS_Flydragonsword` and a random `axe_machine` as the main weapons for the character:
```:no-line-numbers
addZone_Palmia,addEq_BS_Flydragonsword#Legendary,addEq_axe_machine
```

To add starting items to the character, use tag `addThing_ItemID#Count`. If `#Count` is omitted, a default of `1` item will be generated. 

For example, to add `padoru_gift` x10 and `scroll of ally` x5 to the character:
```:no-line-numbers
addAdvZone_Palmia,addThing_padoru_gift#10,addThing_1174#5
```

## make an adventurer

Credits to 105gun.

If your character has trait **`Adventurer`** or **`AdventurerBacker`**, CWL will import the character as an adventurer, which will appear on the adventurer ranking list.

::: warning  
Starting from CWL 1.15.0, previous tags `addAdvZone`/`addAdvEq`/`addAdvThing` are now deprecated by the normal tags shown above, but still accepted.  
![img](https://i.postimg.cc/SN93258B/image.png)
:::

## custom merchant stock

If your character has trait **`Merchant`**, you can define a custom merchant stock using tag `addStock` and a stock file.

![img](https://i.postimg.cc/59gzM54K/image.png)

The stock file is a simple json file placed in your `LangMod/**/Data/` folder, with name `stock_merchantID.json`, for example, you have a custom character with id `example_merchant`, you should have a file `stock_example_merchant.json` in `LangMod/EN/Data/`, `LangMod/CN/Data/`, ...and other language sub folders.

Within the stock file, it's simply as follows:
```json
{
  "Owner": "example_merchant",
  "Items": [
    {
      "Id": "example_item",
      "Material": "",
      "Num": 1,
      "Restock": true,
      "Type": "Item"
    },
    {
      "Id": "example_item_limited",
      "Material": "granite",
      "Num": 1,
      "Restock": false,
      "Type": "Item"
    },
    {
      "Id": "example_item_craftable",
      "Material": "",
      "Num": 1,
      "Restock": false,
      "Type": "Recipe"
    }
  ]
}
```

The `Owner` value is the same as the merchant character id, and `Items` is an array of items in the stock. 

Item `Id` is the id of the Thing. `Material` is the material you want it to be sold as, leave it blank for default material defined in Thing row. `Num` is the count of the items in the stack. `Restock` defines whether it's a limited time item that can only be bought once when set to `false`. `Type` can be `Item`, `Recipe`, or `Spell`.

If you are not using a code editor, you should use [JSONLint](https://jsonlint.com/) to validate your json.

## custom barks

Sometimes you want the character to banter/bark at certain times. For that to happen, you'll need to have a `dialog.xlsx` sheet in your `LangMod/**/Dialog/` folder.

![img](./assets/dialog.png)

The sheet format is the same as game's dialog sheet at **Elin/Package/_Elona/Lang/_Dialog/dialog.xlsx**, but you only need the `unique` sheet and the row with your character's id.

## custom drama

A drama is the dialog when you talk to the character, that usually has options. 

To define a custom drama for the character, use tag `addDrama_DramaSheetName` and CWL will reroute the drama automatically.

Your custom drama sheet must be placed in your `LangMod/**/Dialog/Drama/` folder, and the name must match the tag. For example, use `addDrama_MyCharaDrama` with `Dialog/Drama/MyCharaDrama.xlsx`.

You may reference the game drama sheets when making your own at **Elin/Package/_Elona/Lang/_Dialog/Drama**, or the Tiny Mita example which has a template drama sheet:
<LinkCard t="CWL Example: Tiny Mita" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3396774199" />

![img](./assets/drama.png)

::: tip Hot Reload
Drama sheet can be edited and hot reloaded during game play.
:::

## custom bio

To add more flavor to your character, you may use tag `addBio_CharaId` to define a custom biography. The bio file is (yet another) json file placed in your `LangMod/**/Data/` folder, with name `bio_CharaId.json`, for example, you have a custom character with id `example_chara`, you should have a file `bio_example_chara.json` in `LangMod/EN/Data/`, `LangMod/CN/Data/`, ...and other language sub folders.

Within the bio file, it's simply as follows:
```json
{
    "Birthday": 11,
    "Birthmonth": 4,
    "Birthyear": 514,
    "Birthplace": "Earth",
    "Birthplace_JP": "Earth",
    "Birthlocation": "Nihon",
    "Birthlocation_JP": "Nihon",
    "Mom": "Best Mom@Mommy",
    "Mom_JP": "Best Mom",
    "Dad": "Best Dad",
    "Dad_JP": "Best Dad",
    "Background": "An absolutely normal living been\nBut on ylva...",
    "Background_JP": "An absolutely normal living been\nBut on ylva..."
}
```

The entries for `Mom` and `Dad` can be overwritten with the `@` alias, for example, the `Mom Best Mom` will be displayed as `Mommy Best Mom`.

The `_JP` entries are for Japanese localization, so that you don't have to prepare a `LangMod/JP/` folder and resources.