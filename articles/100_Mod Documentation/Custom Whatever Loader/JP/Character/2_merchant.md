---
title: 商人の在庫
date: 2025/1/3 01:00
hide: true
---

## カスタム商人在庫

`addStock` タグと在庫ファイルを使用して、商人の在庫をカスタマイズできます。

![img](https://i.postimg.cc/59gzM54K/image.png)

::: warning Trait 要求の削除
CWL 1.19.21 では `Merchant` Trait 要求が削除されました。これは主に API の変更です。CWL API を使用しない場合でも、キャラクターは取引を行うために `Merchant` または `MerchantXXX` Trait が必要です。
:::

在庫ファイルはシンプルな JSON ファイルで、`LangMod/**/Data/` フォルダー内に配置し、名前は `stock_ID.json` とします。この ID は在庫ファイルのユニーク ID またはキャラクター ID です。

`addStock` タグを使用する際、CWL はデフォルトでそのキャラクター ID と同じ在庫 ID を使用します。また、特定の在庫を指定するために `addStock_ID` タグを使用することもでき、複数のキャラクターに対して重複した在庫を定義する手間を省けます。

複数のタグを使用して特定の在庫を組み合わせることができます。例えば、`addStock,addStock_armor,addStock_weapon` です。

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
      "Identified": true,
    },
    {
      "Id": "example_item_limited",
      "Material": "granite",
      "Num": 1,
      "Restock": false,
      "Type": "Item",
      "Rarity": "Artifact",
      "Identified": true,
    },
    {
      "Id": "example_item_craftable",
      "Material": "",
      "Num": 1,
      "Restock": false,
      "Type": "Recipe",
      "Rarity": "Random",
      "Identified": true,
    }
  ]
}
```


`Items` は在庫内のアイテムのリストです。

+ `Id` はアイテムの ID です。
+ `Material` はアイテムの材料として希望するものを指定し、空白にするとアイテム行で定義されたデフォルトの材料が使用されます。デフォルト値は `""` です。
+ `Num` はスタック内のアイテムの数量です。デフォルト値は `1` です。
+ `Restock` はそれが限定アイテムかどうかを定義します。`false` に設定すると、一度だけ購入可能です。デフォルト値は `true` です。
+ `Type` は `Item`（アイテム）、`Recipe`（レシピ）、または `Spell`（呪文書）です。デフォルト値は `Item` です。
+ `Rarity` はアイテムのレアリティで、`Random`、`Crude`、`Normal`、`Superior`、`Legendary`、`Mythical`、`Artifact` のいずれかです。デフォルト値は `Normal` です。
+ `Identified` は購入時にアイテムが鑑定済みかどうかを定義します。デフォルト値は `true` です。

デフォルト値を使用したいフィールドは省略できます。例えば、これは合法な在庫アイテムです：
```json
{
  "Id": "example_item"
}
```

コードエディタを使用しない場合は、[JSONLint](https://jsonlint.com/) を使用して JSON を検証することをお勧めします。

::: warning フォーマットの変更
+ CWL 1.19.21 以降、`Identified` フィールドが追加され、アイテムの鑑定状態を定義できます。この変更は旧バージョンのフォーマットと互換性があります。
+ CWL 1.18.13 以降、`Owner` フィールドが削除され、`Rarity` フィールドが追加され、在庫ファイル名を在庫 ID としてインデックスする方式に変更されました。この変更も旧バージョンのフォーマットと互換性があります。
:::