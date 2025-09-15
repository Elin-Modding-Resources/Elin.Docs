---
title: 商人库存
date: 2025/1/3 01:00
hide: true
---

## 自定义商人库存

您可以使用标签 `addStock` 和一份库存文件来自定义商人的库存。

![img](https://i.postimg.cc/59gzM54K/image.png)

::: warning Trait 需求移除
CWL 1.19.21 移除了 `Merchant` Trait 需求，这主要是一个 API 改动。如果您不使用 CWL API，您的角色还是需要 `Merchant` 或者 `MerchantXXX` Trait 使其可以交易。
:::

库存文件是一个简单的 JSON 文件，放置在您的 `LangMod/**/Data/` 文件夹中，名称为 `stock_ID.json`，此ID是库存文件的独特ID或者您的角色ID。例如: `stock_my_cnpc.json` 或 `stock_unique_armor.json`。

使用 `addStock` 标签时，CWL 会默认使用与该角色ID相同的库存ID。您也可以使用 `addStock_ID` 标签来指定特定库存，省去为多个角色定义重复库存的麻烦。

使用多个标签可以组合特定库存，例如 `addStock,addStock_armor,addStock_weapon`。

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
      "Num": "5",
      "Type": "Spell"
    }
  ]
}
```

`Items` 是库存中物品的列表。

+ `Id` 是物品的 ID。
+ `Material` 是您希望其作为的材料，留空以使用在物品行中定义的默认材料。默认值为 `""`。
+ `Num` 是堆叠中物品的数量。默认值为 `1`。
+ `Restock` 定义它是否为限时物品，当设置为 `false` 时，只能购买一次。默认值为 `true`。
+ `Type` 可以是 `Item`(物品)、`Recipe`(配方) 或 `Spell`(法术书)。默认值为 `Item`。
+ `Rarity` 是物品的稀有度，`Random`, `Crude`, `Normal`, `Superior`, `Legendary`, `Mythical`, `Artifact`。默认值为 `Normal`。
+ `Identified` 定义它购买时是否已鉴定。默认值为 `true`。

**任何您希望使用默认值的字段，都可以省略**。例如，这是一个合法的库存物品：
```json
{
  "Id": "example_item"
}
```

如果您不使用代码编辑器，您应该使用 [JSONLint](https://jsonlint.com/) 来验证您的 JSON。  

代码API相关，请查看[Custom Merchant API](../API/Custom/merchant)。  

::: warning 格式变动
+ CWL 1.19.21 版本后新增了 `Identified` 字段，可以定义物品鉴定状态。这项改动兼容旧版本格式。
+ CWL 1.18.13 版本后移除了 `Owner` 字段，并新增了 `Rarity` 字段，改为由库存文件名作为库存ID的方式进行索引。这项改动兼容旧版本的格式。
:::