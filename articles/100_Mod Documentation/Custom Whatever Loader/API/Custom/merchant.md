---
title: Merchant
date: 2025/2/1 01:00
hide: true
---

# `CustomMerchant`

[Namespace: `Cwl.API.Custom;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/API/Custom/CustomMerchant.cs)

Custom API for processing merchant stocks.

## Add Stock to Owner

```cs
void CustomMerchant.AddStock(cardId, stockId = "");
```

When the given `stockId` is empty, `cardId` will be used as the default `stockId`. This has the same effect as CWL tag `addStock_ID`, multiple `stockId` can be assigned to the same `cardId`.  

The stock file needs to be placed in `LangMod/**/Data/` folder, with naming convention `stock_ID.json`. 

This method can be tested in game using console command `cwl.stock.add cardId stockId`.

## Get Stock Items

```cs
SerializableStockItem[] CustomChara.GetStockItems(string cardId);
```

Returns an array of custom stock items of the given `cardId`, if any.

## Get Stock Data

```cs 
SerializableStockData? CustomChara.GetStockData(string stockId);
```

Returns stock data with the given `stockId`, if it exists. The data is instantiated anew and does not affect current stock management.

## Clear Stock from Owner

```cs
void CustomChara.ClearStock(string cardId);
```

Clears all custom stocks for the given `cardId`.

This method can be tested in game using console command `cwl.stock.clear cardId`.

## Custom `OnBarter` Event

You can give your character any custom `Trait`, and handle the `_OnBarter` event raised by CWL. This can be combined with tagging and/or API usage.  

For example, you can give you custom character a custom trait `TradableAdventurer`, with tag `addStock`, and also handle the `_OnBarter` event:

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

This event is raised when game calls `Trait.OnBarter` and after CWL generates the stock for it(if any).