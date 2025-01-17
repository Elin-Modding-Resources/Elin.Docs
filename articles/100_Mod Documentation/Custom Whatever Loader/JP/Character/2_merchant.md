---
title: カスタム商人の在庫
date: 2025/1/3 01:00
hide: true
---

## カスタム商人の在庫

キャラクターの trait が`Merchant`に設定されている場合、タグ`addStock`と在庫ファイルを使用してカスタム商人の在庫を定義できます。

![img](https://i.postimg.cc/59gzM54K/image.png)

在庫ファイルは、あなたの `LangMod/**/Data/` フォルダーに置かれたシンプルな JSON ファイルで、名前は `stock_ID.json` です。このIDは在庫ファイルのユニークIDまたはあなたのキャラクターIDです。

`addStock` タグを使用すると、そのキャラクターIDに該当する在庫がデフォルトで使用されます。また、複数の `addStock_ID` タグを使用して特定の在庫を組み合わせることもできます。例えば、`addStock_shared,addStock_armor,addStock_weapon` のように。

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

`Items` は在庫内のアイテムのリストです。

+ `Id` はアイテムのIDです。
+ `Material` はそのアイテムとして希望する材料で、空白にするとアイテム行で定義されたデフォルトの材料が使用されます。
+ `Num` はスタック内のアイテムの数量です。
+ `Restock` はそれが期間限定アイテムかどうかを定義し、`false` に設定すると一度だけ購入可能です。
+ `Type` は `Item`（アイテム）、`Recipe`（レシピ）、または `Spell`（呪文書）です。
+ `Rarity` はアイテムのレアリティで、`Random`, `Crude`, `Normal`, `Superior`, `Legendary`, `Mythical`, `Artifact` があります。

コードエディターを使用しない場合は、[JSONLint](https://jsonlint.com/) を使用してあなたのJSONを検証するべきです。

::: warning フォーマット変更
CWL 1.18.13 バージョン以降、`Owner` エントリが削除され、`Rarity` エントリが追加され、在庫ファイル名を在庫IDとしてインデックスする方式に変更されました。この変更は旧バージョンのフォーマットと互換性があります。
:::