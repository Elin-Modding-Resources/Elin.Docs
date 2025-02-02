---
title: 商人
date: 2025/2/1 01:00
hide: true
---

# `CustomMerchant`

[命名空间: `Cwl.API.Custom;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/API/Custom/CustomMerchant.cs)

商人在库存管理中使用的自定义API。

## 商人にカスタムストックを追加する

```cs
void CustomMerchant.AddStock(cardId, stockId = "");
```

指定された `stockId` が空の場合、 `cardId` がデフォルトの `stockId` として使用されます。これはCWLタグ `addStock_ID` と同様の効果があり、複数の `stockId` を同じ `cardId` に割り当てることができます。

在庫ファイルは `LangMod/**/Data/` フォルダーに配置し、 `stock_ID.json` という名前で保存する必要があります。

ゲーム内でこのメソッドをテストするには、コンソールコマンド `cwl.stock.add cardId stockId` を使用できます。

## カスタムストックアイテムを取得する

```cs
SerializableStockItem[] CustomChara.GetStockItems(string cardId);
```

指定された `cardId` のカスタムストックアイテムの配列を返します（存在する場合）。

## ストックデータを取得する

```cs 
SerializableStockData? CustomChara.GetStockData(string stockId);
```

指定された `stockId` のストックデータを返します（存在する場合）。データは新たにインスタンス化され、現在の在庫管理には影響しません。

## 商人からカスタムストックをクリアする

```cs
void CustomChara.ClearStock(string cardId);
```

指定された `cardId` のすべてのカスタムストックをクリアします。

ゲーム内でこのメソッドをテストするには、コンソールコマンド `cwl.stock.clear cardId` を使用できます。

## カスタム `OnBarter` イベント

キャラクターに任意のカスタム `Trait`（特性）を付与し、CWLの `_OnBarter` イベントを処理できます。これはタグやAPIの使用と組み合わせることができます。

例えば、カスタムキャラクターにカスタム特性 `TradableAdventurer` を付与し、タグ `addStock` を追加し、同時に `_OnBarter` イベントを処理することができます：

```cs
class TraitTradableAdventurer : TraitAdventurer
{
    // CWLによって呼び出される
    void _OnBarter()
    {
        // ここでストックを追加/削除/変更します
    }
}
```

このイベントは、ゲームが `Trait.OnBarter` を呼び出した後、CWLが在庫を生成した後（存在する場合）にトリガーされます。