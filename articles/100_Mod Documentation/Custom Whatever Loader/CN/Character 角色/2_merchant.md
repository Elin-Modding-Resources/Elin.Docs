---
title: 商人库存
date: 2025/1/3 01:00
hide: true
---

## 自定义商人库存

如果您的角色 trait 设定为 **`Merchant`**，您可以使用标签 `addStock` 和一份库存文件来自定义商人的库存。

![img](https://i.postimg.cc/59gzM54K/image.png)

库存文件是一个简单的 JSON 文件，放置在您的 `LangMod/**/Data/` 文件夹中，名称为 `stock_ID.json`，此ID是库存文件的独特ID或者您的角色ID。

使用 `addStock` 标签时，符合该角色ID的库存会被默认使用。您也可以使用 `addStock_ID` 标签来指定特定库存，省去为多个角色定义重复库存的麻烦。

使用多个标签可以组合特定库存，例如 `addStock_shared,addStock_armor,addStock_weapon`。

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

`Items` 是库存中物品的列表。

+ `Id` 是物品的 ID。
+ `Material` 是您希望其作为的材料，留空以使用在物品行中定义的默认材料。
+ `Num` 是堆叠中物品的数量。
+ `Restock` 定义它是否为限时物品，当设置为 `false` 时，只能购买一次。
+ `Type` 可以是 `Item`(物品)、`Recipe`(配方) 或 `Spell`(法术书)。
+ `Rarity` 是物品的稀有度，`Random`, `Crude`, `Normal`, `Superior`, `Legendary`, `Mythical`, `Artifact`。

如果您不使用代码编辑器，您应该使用 [JSONLint](https://jsonlint.com/) 来验证您的 JSON。

::: warning 格式变动
CWL 1.18.13 版本后移除了 `Owner` 条目，并新增了 `Rarity` 条目，改为由库存文件名作为库存ID的方式进行索引。这项改动兼容旧版本的格式。
:::