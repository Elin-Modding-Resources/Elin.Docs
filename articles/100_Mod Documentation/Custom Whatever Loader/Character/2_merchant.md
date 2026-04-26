---
title: Merchant Stock
date: 2025/1/3 01:00
hide: true
---

## custom merchant stock

You can define a custom merchant stock using tag `addStock` and a stock file.

![img](https://i.postimg.cc/59gzM54K/image.png)

::: warning Trait Change
CWL 1.19.21 has removed the `Merchant` trait requirement for adding custom stocks, this is mainly an API change. If you are not using CWL API, you should still give your chara a `Merchant` or `MerchantXXX` trait so you can trade with them.
:::

The stock file is a simple JSON file placed in your `LangMod/**/Data/` folder, with the name `stock_ID.json`. The ID is the unique identifier for this stock file or character. For example: `stock_my_cnpc.json` or `stock_unique_armor.json`.

When using the `addStock` tag, the stock ID will default to the character ID. You may also specify and/or combine multiple stock files using multiple tags, such as:
`addStock,addStock_unique_items,addStock_unique_armor`.

Within the stock file, the structure is as follows:

```json
{
  "Items": [
    {
      "Id": "example_item",
      "Material": "",
      "Num": 1,
      "Restock": true,
      "Type": "Item",
      "Rarity": "Random",
      "Identified": true
    },
    {
      "Id": "example_item_limited",
      "Material": "granite",
      "Num": 1,
      "Restock": false,
      "Type": "Item",
      "Rarity": "Artifact",
      "Identified": true
    },
    {
      "Id": "example_item_craftable",
      "Material": "",
      "Num": 1,
      "Restock": false,
      "Type": "Recipe",
      "Rarity": "Random",
      "Identified": true
    },
    {
      "Id": "SpShutterHex",
      "Num": 5,
      "Type": "Spell"
    }
  ]
}
```

`Items` is an array of items in the stock.

### Fields
* `Id`
  The ID of the item (Thing). This field is **required**.
  For some stock types, this can be an alias of an element or a numeric ID, or a name.
* `Material`
  The material the item is made of. Leave it blank to use the default material defined in the Thing data.
  Default value: `""`
* `Num`
  The number of items.
  Default value: `1`
* `Restock`
  Determines whether the item restocks.
  Set to `false` for limited items that can only be purchased once.
  Default value: `true`
* `Rarity`
  Possible values: `Random`, `Crude`, `Normal`, `Superior`, `Legendary`, `Mythical`, `Artifact`
  Default value: `Normal`
* `Identified` (**deprecated, still accepted**)
  Determines the initial identification state of the item.
  Default value: `true`
* `IdentifyLevel` (**new**)
  Determines the initial identification state of the item.
  Possible values: `Identified`, `RequireSuperiorIdentify`, `KnowQuality`, `Unknown`
  Default value: `Identified`
* `Blessed`
  Determines the blessed state of the item.
  Possible values: `Doomed`, `Cursed`, `Normal`, `Blessed`
  Default value: `Normal`

### Notes

* You can omit any fields to use their default values.
  For example, this is a valid stock item:

```json
{
  "Id": "example_item"
}
```

### Available Types

|Type|Description|
|-|-|
|Item|A standard item. Supports material, level, and stack count.|
|Block|A placeable block item created from a block alias and material.|
|Cassette|A music cassette. If the bgm id is invalid, a random track will be used.|
|Currency|Currency item. Id can be `money` `money2` `plat` `medal` `influence` `casino_coin` `ecopo`. `Num` defines the amount.|
|Category|Generates an item from a category.|
|Filter|Generates an item based on a filter. `Id` is the name of the filter.|
|Tag|Generates an item based on a tag. `Id` is the name of the tag.|
|Letter|A letter item. `Id` is the name of the letter.|
|Obj|An Obj. `Id` is the object alias.|
|Perfume|A perfume. `Id` is the element alias or id.|
|Plan|A plan. `Id` is the element alias or id.|
|Potion|A potion item. `Id` is the element alias or id. `Num` defines stack size.|
|Recipe|A recipe item for crafting.|
|RedBook|A red book item. `Id` is the book id. `Num` defines stack size.|
|Rod|A rod item. `Id` is the element alias or id. `Num` defines charges or stack size.|
|Rune|A rune item. `Id` is the element alias or id.|
|RuneFree|A rune_free item. `Id` is the element alias or id.|
|Scroll|A scroll item. `Id` is the element alias or id.|
|Skill|A skill book. `Id` is the element alias or id.|
|Spell|A spell book. `Id` is the element alias or id.|
|Usuihon|A special item. `Id` is the religion id.|

If you are not using a code editor, you can use [JSONLint](https://jsonlint.com/) to validate your JSON.

For API related usages, see [Custom Merchant API](../API/Custom/merchant).  

::: warning Spec Change
+ CWL 1.22.14 added `ItentifyLevel` entry, to allow customized identify level. This change is optional and backwards compatible.
+ CWL 1.19.21 added `Identified` entry, to allow unidentified items to be sold. This change is backwards compatible.
+ CWL 1.18.13 removed `Owner` entry and added `Rarity` entry, to allow stock ID based indexing instead of chara ID. This change is backwards compatible.
:::