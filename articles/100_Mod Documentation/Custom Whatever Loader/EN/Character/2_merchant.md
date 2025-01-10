---
title: Merchant Stock
date: 2025/1/3 01:00
hide: true
---

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
