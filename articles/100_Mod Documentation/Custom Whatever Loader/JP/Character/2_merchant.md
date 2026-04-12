---
title: 商人在庫
date: 2025/1/3 01:00
hide: true
---

## カスタム商人在庫

`addStock` タグと在庫ファイルを使用して、カスタム商人在庫を定義できます。

![img](https://i.postimg.cc/59gzM54K/image.png)

::: warning 特性変更
CWL 1.19.21 では、カスタム在庫追加時の `Merchant` 特性要件が削除されました。これは主に API の変更です。CWL API を使用していない場合は、引き続きキャラクターに `Merchant` または `MerchantXXX` 特性を付与して取引できるようにすることをおすすめします。
:::

在庫ファイルはシンプルな JSON ファイルで、`LangMod/**/Data/` フォルダ内に `stock_ID.json` という名前で配置します。ID はこの在庫ファイルまたはキャラクターの固有識別子です。例：`stock_my_cnpc.json` または `stock_unique_armor.json`。

`addStock` タグを使用する場合、在庫 ID はデフォルトでキャラクター ID になります。複数のタグを使用して複数の在庫ファイルを指定・組み合わせることも可能です。
例：`addStock,addStock_unique_items,addStock_unique_armor`。

在庫ファイルの構造は以下の通りです：

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

`Items` は在庫アイテムの配列です。

### フィールド

* `Id`
  アイテム（Thing）の ID。このフィールドは**必須**です。
  一部の在庫タイプでは、要素のエイリアス、数値 ID、または名前を指定できます。
* `Material`
  アイテムの素材。空白にすると Thing データで定義されたデフォルト素材が使用されます。
  デフォルト値：`""`
* `Num`
  アイテムの数量。
  デフォルト値：`1`
* `Restock`
  アイテムが補充されるかどうかを決定します。
  `false` にすると、1回だけ購入可能な限定アイテムになります。
  デフォルト値：`true`
* `Rarity`
  可能な値：`Random`、`Crude`、`Normal`、`Superior`、`Legendary`、`Mythical`、`Artifact`
  デフォルト値：`Normal`
* `Identified`（**非推奨ですが、まだ使用可能です**）
  アイテムの初期鑑定状態を決定します。
  デフォルト値：`true`
* `IdentifyLevel`（**新規**）
  アイテムの初期鑑定状態を決定します。
  可能な値：`Identified`、`RequireSuperiorIdentify`、`KnowQuality`、`Unknown`
  デフォルト値：`Identified`
* `Blessed`
  アイテムの祝福状態を決定します。
  可能な値：`Doomed`、`Cursed`、`Normal`、`Blessed`
  デフォルト値：`Normal`

### 注意事項

* 任意のフィールドを省略してデフォルト値を使用できます。
  例えば、以下は有効な在庫アイテムです：

```json
{
  "Id": "example_item"
}
```

### 利用可能なタイプ

|Type|説明|
|-|-|
|Item|標準アイテム。素材、レベル、スタック数をサポート。|
|Block|ブロックエイリアスと素材から作成される設置可能なブロックアイテム。|
|Cassette|音楽カセット。bgm id が無効な場合はランダムな曲が使用されます。|
|Currency|通貨アイテム。Id は `money`、`money2`、`plat`、`medal`、`influence`、`casino_coin`、`ecopo` が使用可能。`Num` で金額を指定。|
|Category|カテゴリからアイテムを生成。|
|Filter|フィルタに基づいてアイテムを生成。`Id` はフィルタ名。|
|Tag|タグに基づいてアイテムを生成。`Id` はタグ名。|
|Letter|手紙アイテム。`Id` は手紙の名前。|
|Obj|Obj オブジェクト。`Id` はオブジェクトエイリアス。|
|Perfume|香水。`Id` は要素エイリアスまたは ID。|
|Plan|計画書。`Id` は要素エイリアスまたは ID。|
|Potion|ポーションアイテム。`Id` は要素エイリアスまたは ID。`Num` でスタック数を指定。|
|Recipe|クラフト用のレシピアイテム。|
|RedBook|赤本アイテム。`Id` は書籍 ID。`Num` でスタック数を指定。|
|Rod|ロッドアイテム。`Id` は要素エイリアスまたは ID。`Num` でチャージ数またはスタック数を指定。|
|Rune|ルーンアイテム。`Id` は要素エイリアスまたは ID。|
|RuneFree|無料ルーンアイテム。`Id` は要素エイリアスまたは ID。|
|Scroll|スクロールアイテム。`Id` は要素エイリアスまたは ID。|
|Skill|スキルブック。`Id` は要素エイリアスまたは ID。|
|Spell|スペルブック。`Id` は要素エイリアスまたは ID。|
|Usuihon|特殊アイテム。`Id` は宗教 ID。|

コードエディタを使用していない場合は、[JSONLint](https://jsonlint.com/) で JSON の妥当性を確認できます。

API 関連の使用方法については、[Custom Merchant API](../API/Custom/merchant) を参照してください。

::: warning 仕様変更
+ CWL 1.22.14 で `IdentifyLevel` 項目が追加され、カスタム鑑定レベルを設定可能になりました。この変更は任意かつ後方互換性があります。
+ CWL 1.19.21 で `Identified` 項目が追加され、未鑑定アイテムを販売可能になりました。この変更は後方互換性があります。
+ CWL 1.18.13 で `Owner` 項目が削除され、`Rarity` 項目が追加され、在庫 ID ベースのインデックスに変更されました。この変更は後方互換性があります。
:::
````