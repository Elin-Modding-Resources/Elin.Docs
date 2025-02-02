---
title: Merchant
date: 2025/2/1 01:00
hide: true
---

# `CustomMerchant`

[命名空间: `Cwl.API.Custom;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/API/Custom/CustomMerchant.cs)

自定义API用于处理商人库存。

## 添加自定义库存到商人

```cs
void CustomMerchant.AddStock(cardId, stockId = "");
```

当给定的 `stockId` 为空时，将使用 `cardId` 作为默认的 `stockId`。这与CWL标签 `addStock_ID` 的效果相同，可以将多个 `stockId` 分配给同一个 `cardId`。

库存文件需要放置在 `LangMod/**/Data/` 文件夹中，命名为 `stock_ID.json`。

可以使用控制台命令 `cwl.stock.add cardId stockId` 在游戏中测试此方法。

## 获取自定义库存物品

```cs
SerializableStockItem[] CustomChara.GetStockItems(string cardId);
```

返回给定 `cardId` 的自定义库存项目数组（如果有的话）。

## 获取库存数据

```cs 
SerializableStockData? CustomChara.GetStockData(string stockId);
```

返回给定 `stockId` 的库存数据（如果存在）。数据是全新实例化的，不会影响当前的库存管理。

## 从商人清除自定义库存

```cs
void CustomChara.ClearStock(string cardId);
```

清除给定 `cardId` 的所有自定义库存。

可以使用控制台命令 `cwl.stock.clear cardId` 在游戏中测试此方法。

## 自定义 `OnBarter` 事件

您可以为角色赋予任何自定义的 `Trait`（特征），并处理CWL的 `_OnBarter` 事件。这可以与标签和/或API使用相结合。

例如，您可以为自定义角色赋予自定义特征 `TradableAdventurer`，并添加标签 `addStock`，同时处理 `_OnBarter` 事件：

```cs
class TraitTradableAdventurer : TraitAdventurer
{
    // invoked by CWL
    void _OnBarter()
    {
        // add/remove/modify the stocks here on your own
    }
}
```

此事件在游戏调用 `Trait.OnBarter` 后触发，并在CWL生成库存后（如果有的话）。