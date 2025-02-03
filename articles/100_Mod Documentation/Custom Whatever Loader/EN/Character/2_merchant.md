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

The stock file is a simple json file placed in your `LangMod/**/Data/` folder, with name `stock_ID.json`, the ID is the unique ID for this stock file or character ID.

When using tag `addStock`, the stock ID will default to the character ID. You may also specify and/or combine stock files with multiple `addStock` tag, such as `addStock,addStock_uniqueItems,addStock_Armor`.

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
    }
  ]
}
```

`Items` is an array of items in the stock. 

+ `Id` is the id of the Thing. This value is mandatory.
+ `Material` is the material you want it to be sold as, leave it blank for the default material defined in Thing row. Default value is `""`.
+ `Num` is the count of the items in the stack. Default value is `1`.
+ `Restock` defines whether it's a limited time item that can only be bought once when set to `false`. Default value is `true`.
+ `Type` can be `Item`, `Recipe`, or `Spell`. Default value is `Item`.
+ `Rarity` can be `Random`, `Crude`, `Normal`, `Superior`, `Legendary`, `Mythical`, `Artifact`. Default value is `Normal`.
+ `Identified` determines the initial identification state of the item. Default value is `true`.

**You can omit any fields that you wish to use the default value for**. For example, this is a valid stock item:
```json
{
  "Id": "example_item"
}
```

If you are not using a code editor, you should use [JSONLint](https://jsonlint.com/) to validate your json.

::: warning Spec Change
+ CWL 1.19.21 added `Identified` entry, to allow unidentified items to be sold. This change is backwards compatible.
+ CWL 1.18.13 removed `Owner` entry and added `Rarity` entry, to allow stock ID based indexing instead of chara ID. This change is backwards compatible.
:::