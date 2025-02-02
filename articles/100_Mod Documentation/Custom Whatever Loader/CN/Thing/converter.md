---
title: 自定义转换
date: 2025/2/2 01:00
hide: true
---

## 制作自定义转换

游戏中有几种容器类型是转换器，例如 **酿造桶**、**晾晒架** 和 **熟成架**。它们不会腐烂，而是将其内容物转换为产品。

然而，它们的产品都是硬编码的。您可以通过使用 CWL Trait `CustomConverter` 和一份转换规则文件将您的容器转变为自定义转换器。

例如，这一行是从 `brewery`（酿造桶）复制的：

![](../../assets/fruit_barrel.png)

`trait` 单元格有5个参数，分别是 `CustomConverter`、`width`（宽度）、`height`（高度）、`inventory style`（库存样式）、`inventory ID`（库存ID）、`conversion rule ID`（转换规则ID）。当您将第5个参数 `conversion rule ID` 留空时，将使用物品ID。

## 定义转换规则

转换规则是一个简单的JSON文件，位于您的 `LangMod/**/Data/` 文件夹中，文件名为 `converter_ID.json`。
```json
{
    "DecaySpeed": 500,
    "IdMsg": "driedFood",
    "Conversions": {
        "origin:fruit": [
            {
                "Id": "dried_fruit",
                "Num": 1,
                "PriceAdd": "base * 0.25"
            }
        ],
        "grape": [
            {
                "Id": "raisin",
                "Num": 5,
                "PriceAdd": "base * 0.06"
            }
        ],
        "tomato": [
            {
                "Id": "dried_fruit",
                "Num": 1,
                "PriceAdd": "0"
            }
        ]
    }
}
```

`DecaySpeed`（腐烂速度）是转换速度，`500` 是游戏中 **酿造桶**、**晾晒架** 和 **熟成架** 的默认值。

`IdMsg` 是转换完成时显示的 `LangGame` 文本ID，您可以在 `LangGame` 表中找到相关条目，或者在 `Game` 表中定义自己的短语。

<LinkCard t="Lang/Game" u="https://docs.google.com/spreadsheets/d/1cje2GHiKwjBd_YLYWqWlddm2YLsYnRiB/edit?gid=1110671768#gid=1110671768" />

`Conversions` 是一组转换规则，每个条目应与初始物品的ID匹配，或者使用 `origin:originID` 来包含所有具有相同 `_origin` 的变体。您还可以覆盖之前包含的特定物品，例如在 `origin:fruit` 中覆盖 `grape` 条目。

每个转换条目都有一个产品数组，而每个产品包含来自 [`StockItem`](../Character%20角色/2_merchant.md) 的相同字段，默认字段可以省略。`PriceAdd` 字段是一个表达式，用于计算添加到产品上的额外价格，其中 `base` 是初始物品的价格。

## 测试转换规则

您可以在游戏运行时编辑转换规则。保存更改后，使用控制台命令 `cwl.converter.reload` 重新加载所有转换规则以便测试。