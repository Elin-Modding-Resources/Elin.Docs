---
title: 商人库存
date: 2025/1/3 01:00
hide: true
---

## 自定义商人库存

如果您的角色 trait 设定为 **`Merchant`**，您可以使用标签 `addStock` 和一份库存文件来自定义商人的库存。

![img](https://i.postimg.cc/59gzM54K/image.png)

库存文件是一个简单的 JSON 文件，放置在您的 `LangMod/**/Data/` 文件夹中，名称为 `stock_merchantID.json`，例如，您有一个自定义角色，ID 为 `example_merchant`，您应该在 `LangMod/EN/Data/`、`LangMod/CN/Data/` 等语言子文件夹中有一个文件 `stock_example_merchant.json`。
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

`Owner` 值与商人角色 ID 相同，`Items` 是库存中物品的数组。

`Id` 是物品的 ID。`Material` 是您希望其作为的材料，留空以使用在物品行中定义的默认材料。`Num` 是堆叠中物品的数量。`Restock` 定义它是否为限时物品，当设置为 `false` 时，只能购买一次。`Type` 可以是 `Item`(物品)、`Recipe`(配方) 或 `Spell`(法术书)。

如果您不使用代码编辑器，您应该使用 [JSONLint](https://jsonlint.com/) 来验证您的 JSON。
