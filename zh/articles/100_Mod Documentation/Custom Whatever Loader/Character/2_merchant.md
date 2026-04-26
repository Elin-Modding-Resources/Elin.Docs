---
title: 商人库存
date: 2025/1/3 01:00
hide: true
---

## 自定义商人库存

你可以使用 `addStock` 标签和库存文件来定义自定义商人库存。

![img](https://i.postimg.cc/59gzM54K/image.png)

::: warning 特性变更
CWL 1.19.21 已移除添加自定义库存时对 `Merchant` 特性的要求，这主要是一项 API 变更。如果你没有使用 CWL API，仍建议给你的角色添加 `Merchant` 或 `MerchantXXX` 特性，以便能够与其进行交易。
:::

库存文件是一个简单的 JSON 文件，放置在你的 `LangMod/**/Data/` 文件夹中，文件名为 `stock_ID.json`。其中 ID 是该库存文件或角色的唯一标识符。例如：`stock_my_cnpc.json` 或 `stock_unique_armor.json`。

使用 `addStock` 标签时，库存 ID 默认使用角色 ID。你也可以通过多个标签指定或组合多个库存文件，例如：
`addStock,addStock_unique_items,addStock_unique_armor`。

库存文件的结构如下：

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

`Items` 是一个包含库存物品的数组。

### 字段说明
* `Id`
  物品（Thing）的 ID。此字段**必需**。
  对于某些库存类型，此处可以是元素的别名、数字 ID 或名称。
* `Material`
  物品所使用的材质。留空则使用 Thing 数据中定义的默认材质。
  默认值：`""`
* `Num`
  物品数量。
  默认值：`1`
* `Restock`
  决定物品是否会补货。
  设置为 `false` 表示该物品为限量，只能购买一次。
  默认值：`true`
* `Rarity`
  可选值：`Random`、`Crude`、`Normal`、`Superior`、`Legendary`、`Mythical`、`Artifact`
  默认值：`Normal`
* `Identified`（**已弃用，但仍可使用**）
  决定物品初始是否已鉴定。
  默认值：`true`
* `IdentifyLevel`（**新增**）
  决定物品初始的鉴定状态。
  可选值：`Identified`、`RequireSuperiorIdentify`、`KnowQuality`、`Unknown`
  默认值：`Identified`
* `Blessed`
  决定物品的祝福状态。
  可选值：`Doomed`、`Cursed`、`Normal`、`Blessed`
  默认值：`Normal`

### 注意事项

* 你可以省略任意字段以使用其默认值。
  例如，以下是一个有效的库存物品定义：

```json
{
  "Id": "example_item"
}
```

### 支持的物品类型

|Type|说明|
|-|-|
|Item|标准物品。支持材质、等级和堆叠数量。|
|Block|可放置的方块物品，由方块别名和材质生成。|
|Cassette|音乐磁带。如果 bgm id 无效，则使用随机曲目。|
|Currency|货币物品。Id 可以是 `money`、`money2`、`plat`、`medal`、`influence`、`casino_coin`、`ecopo`。`Num` 表示金额。|
|Category|从分类中生成物品。|
|Filter|根据过滤器生成物品。`Id` 为过滤器名称。|
|Tag|根据标签生成物品。`Id` 为标签名称。|
|Letter|信件物品。`Id` 为信件名称。|
|Obj|Obj 对象。`Id` 为对象别名。|
|Perfume|香水。`Id` 为元素别名或 ID。|
|Plan|计划书。`Id` 为元素别名或 ID。|
|Potion|药水物品。`Id` 为元素别名或 ID。`Num` 定义堆叠数量。|
|Recipe|用于合成的配方物品。|
|RedBook|红皮书物品。`Id` 为书籍 ID。`Num` 定义堆叠数量。|
|Rod|魔杖物品。`Id` 为元素别名或 ID。`Num` 定义充能次数或堆叠数量。|
|Rune|符文物品。`Id` 为元素别名或 ID。|
|RuneFree|免费符文物品。`Id` 为元素别名或 ID。|
|Scroll|卷轴物品。`Id` 为元素别名或 ID。|
|Skill|技能书。`Id` 为元素别名或 ID。|
|Spell|法术书。`Id` 为元素别名或 ID。|
|Usuihon|特殊物品。`Id` 为宗教 ID。|

如果你没有使用代码编辑器，可以使用 [JSONLint](https://jsonlint.com/) 来验证你的 JSON 格式。

关于 API 的相关用法，请参阅 [Custom Merchant API](../API/Custom/merchant)。

::: warning 规格变更
+ CWL 1.22.14 新增 `IdentifyLevel` 字段，用于自定义鉴定等级。此变更可选且向下兼容。
+ CWL 1.19.21 新增 `Identified` 字段，允许出售未鉴定的物品。此变更向下兼容。
+ CWL 1.18.13 移除了 `Owner` 字段并新增 `Rarity` 字段，改为基于库存 ID 而非角色 ID 进行索引。此变更向下兼容。
:::
````
