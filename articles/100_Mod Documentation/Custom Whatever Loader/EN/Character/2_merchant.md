---
title: Merchant Stock
date: 2025/1/3 01:00
hide: true
---

## custom merchant stock

If your character has trait **`Merchant`**, you can define a custom merchant stock using tag `addStock` and a stock file.

![img](https://i.postimg.cc/59gzM54K/image.png)

The stock file is a simple json file placed in your `LangMod/**/Data/` folder, with name `stock_ID.json`, the ID is the unique ID for this stock file or character ID.

When using `addStock`, the stock ID will default to the character ID. You may also specify and/or combine stock files with multiple `addStock` tag, such as `addStock_shared,addStock_uniqueChara1,addStock_Armor`.

Within the stock file, it's simply as follows:
```json
{
  "Items": [
    {
      "Id": "example_item",
      "Material": "",
      "Num": 1,
      "Restock": true,
      "Type": "Item",
      "Rarity": "Random"
    },
    {
      "Id": "example_item_limited",
      "Material": "granite",
      "Num": 1,
      "Restock": false,
      "Type": "Item",
      "Rarity": "Artifact"
    },
    {
      "Id": "example_item_craftable",
      "Material": "",
      "Num": 1,
      "Restock": false,
      "Type": "Recipe",
      "Rarity": "Random"
    }
  ]
}
```

`Items` is an array of items in the stock. 

+ `Id` is the id of the Thing.
+ `Material` is the material you want it to be sold as, leave it blank for the default material defined in Thing row. 
+ `Num` is the count of the items in the stack. 
+ `Restock` defines whether it's a limited time item that can only be bought once when set to `false`. 
+ `Type` can be `Item`, `Recipe`, or `Spell`.
+ `Rarity` can be `Random`, `Crude`, `Normal`, `Superior`, `Legendary`, `Mythical`, `Artifact`.

If you are not using a code editor, you should use [JSONLint](https://jsonlint.com/) to validate your json.

::: warning Spec Change
CWL 1.18.13 removed `Owner` entry and added `Rarity` entry, to allow stock ID based indexing instead of chara ID. This change is backwards compatible.
:::