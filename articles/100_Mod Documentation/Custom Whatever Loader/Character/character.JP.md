---
title: Custom Chara [JP]
date: 2025/1/3 01:00
hide: true
---

## カスタムキャラクターのインポート

Charaテーブルでカスタムキャラクターを定義したと仮定します。既存のモジュールやElin Sourcesを参考にしてください。
<LinkCard t="SourceChara" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn" />

CWLはタグセルを使用して機能を追加します。任意の数のタグを追加できます。タグは `,`（カンマ）で区切り、間にスペースを入れないように注意してください。

## エリアへの自動生成/追加

CWLがキャラクターを特定のエリアに生成するには、タグ `addZone_*` を使用し、`*`（アスタリスク）をエリアのタイプ名で置き換えるか、ランダムエリアに生成するためにアスタリスクをそのままにします。

たとえば、小さな庭にキャラクターを生成したい場合は、`addZone_LittleGarden` を使用します。[SourceGame/Zone](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_) を確認し、正しいエリア名についてはtype列を参考にしてください。

ゲーム内にすでにそのキャラクターが存在する場合、CWLはスキップします。

## 初期装備/アイテムの追加

CWLがキャラクターを生成する際、初期装備とアイテムも定義できます。タグ `addEq_ItemID#Rarity` または/および `addThing_ItemID#Count` を使用してください。

特定の装備をキャラクターに割り当てるには、タグ `addEq_ItemID#Rarity` を使用し、`ItemID`をアイテムのIDに置き換え、Rarityは次のいずれかを指定してください：ランダム（Random）、粗悪（Crude）、普通（Normal）、優良（Superior）、伝説（Legendary）、神話（Mythical）、神器（Artifact）。`#Rarity`を省略した場合、デフォルトのレアリティ`#Random`が使用されます。

例えば、伝説の`BS_Flydragonsword`とランダムの`axe_machine`をキャラクターのメイン武器に設定する場合：
```:no-line-numbers
addZone_Palmia,addEq_BS_Flydragonsword#Legendary,addEq_axe_machine
```

キャラクターに初期アイテムを追加するには、タグ `addThing_ItemID#Count` を使用します。`#Count`を省略した場合、デフォルトで1つのアイテムが生成されます。

例えば、キャラクターに`padoru_gift`を10個、`援軍巻軸`を5つ追加する場合：
```:no-line-numbers
addAdvZone_Palmia,addThing_padoru_gift#10,addThing_1174#5
```

## 冒険者の作成

105gunに感謝します。

キャラクターの trait が`Adventurer`または`AdventurerBacker`に設定されている場合、CWLはそのキャラクターを冒険者としてインポートし、冒険者ランキングリストに表示されます。

::: warning 注意
CWL 1.15.0以降、以前のタグ`addAdvZone`/`addAdvEq`/`addAdvThing`は上記の通常のタグに置き換えられましたが、まだ使用可能です。
![img](https://i.postimg.cc/SN93258B/image.png)
:::

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

## カスタム対話

キャラクターが特定のタイミングで発言したり叫んだりすることを望む場合、`LangMod/**/Dialog/`フォルダーに`dialog.xlsx`スプレッドシートを準備するだけです。
![img](./assets/dialog.png)

このシートのフォーマットは、ゲームの対話シート `Elin/Package/_Elona/Lang/_Dialog/dialog.xlsx` と同じですが、`unique`シートとキャラクターIDを含むその行のみが必要です。

## カスタムストーリー

ストーリーは、選択肢のあるキャラクターとの会話です。

キャラクターにカスタムストーリーを追加するには、タグ `addDrama_DramaSheetName` を使用し、CWLはそのストーリーを自動的にリダイレクトします。

カスタムストーリーシートは`LangMod/**/Dialog/Drama/`フォルダーに配置し、名前はタグに一致する必要があります。たとえば、`addDrama_MyCharaDrama`を使用する場合、対応するのは`Dialog/Drama/MyCharaDrama.xlsx`です。

自分のストーリーを作成する際、ゲーム内のストーリーシートを参考にできます。パスは `Elin/Package/_Elona/Lang/_Dialog/Drama` です。または、テンプレートストーリーシートを持つTiny Mitaの例を参照してください：

<LinkCard t="CWL Example：Tiny Mita" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3396774199" />

![img](./assets/drama.png)

::: tip ホットリロードストーリー
ストーリーシートはゲーム中に編集してホットリロードできます。
:::

## カスタムバイオグラフィー

キャラクターにもっと表現を加えるために、`addBio_CharaId`タグを使用してカスタムバイオグラフィーを指定できます。バイオグラフィーファイルはJSONファイルで、`LangMod/**/Data/`フォルダーに配置し、名前は`bio_CharaId.json`にします。例えば、カスタムキャラのIDが`example_chara`である場合、`LangMod/EN/Data/`、`LangMod/CN/Data/`などの他の言語サブフォルダーに`bio_example_chara.json`というファイルを持つ必要があります。
```json
{
    "Birthday": 11,
    "Birthmonth": 4,
    "Birthyear": 514,
    "Birthplace": "地球",
    "Birthplace_JP": "地球",
    "Birthlocation": "メーメー村",
    "Birthlocation_JP": "メーメー村",
    "Mom": "最高の母@羊",
    "Mom_JP": "最高の母",
    "Dad": "最高の父",
    "Dad_JP": "最高の父",
    "Background": "この普通の日に\n普通の靴を履いて\n普通の通りを普通に歩いている\n普通のイヤホンを取り出す\n普通の感覚を見つける\nお気に入りの普通の音楽を一曲\n普通のディスコで普通に揺れる",
    "Background_JP": "この普通の日に\n普通の靴を履いて\n普通の通りを普通に歩いている\n普通のイヤホンを取り出す\n普通の感覚を見つける\nお気に入りの普通の音楽を一曲\n普通のディスコで普通に揺れる"
}
```

`Mom` と `Dad` に対応する母親と父親のエントリーは `@` シンボルで上書きすることができます。例えば、`母 最高の母`は `羊 最高の母` と表示されます。

`_JP`が付いたエントリは日本語ローカライズ用で、`LangMod/JP/`リソースを別途用意する必要がありません。
