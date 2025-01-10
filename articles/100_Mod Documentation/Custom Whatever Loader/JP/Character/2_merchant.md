---
title: カスタム商人の在庫
date: 2025/1/3 01:00
hide: true
---

## カスタム商人の在庫

キャラクターの trait が`Merchant`に設定されている場合、タグ`addStock`と在庫ファイルを使用してカスタム商人の在庫を定義できます。

![img](https://i.postimg.cc/59gzM54K/image.png)

在庫ファイルはシンプルなJSONファイルで、`LangMod/**/Data/`フォルダーに配置します。名前は`stock_merchantID.json`にします。例えば、カスタムキャラクターのIDが`example_merchant`である場合は、`LangMod/EN/Data/`、`LangMod/CN/Data/`などの言語サブフォルダーに`stock_example_merchant.json`というファイルを持つ必要があります。
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

`Owner`の値は商人キャラクターIDと同じです。`Items`は在庫中のアイテムの配列です。

`Id`はアイテムのIDです。`Material`は希望する材料で、アイテム行で定義されたデフォルトの材料を使用するには空白のままにします。`Num`はスタック内のアイテムの数です。`Restock`はそれが期間限定品かどうかを定義します。`false`に設定すると、一度しか購入できません。`Type`は`Item`、`Recipe`、`Spell`のいずれかです。

コードエディタを使用していない場合は、[JSONLint](https://jsonlint.com/)を使用してJSONを検証するべきです。
