---
title: 導入キャラクター
date: 2025/1/3 01:00
hide: true
---

## カスタムキャラクターのインポート

<LinkCard t="トウミィの MOD 作成講座" u="https://note.com/seacolor/n/n4118acf824fa?sub_rt=share_pw" i="https://cdn.discordapp.com/avatars/414045627400454144/b5f7f32a00b8653bd28ac58f9b85a2b8.webp" />

Charaテーブルでカスタムキャラクターを定義したと仮定します。既存のモジュールやElin Sourcesを参考にしてください。
<LinkCard t="SourceChara" u="/ja/articles/10_Source Sheets/Character/_columns.md" />

## 自動生成/エリアへの追加

でキャラクターを特定のエリアに生成させるには、`addZone_*`タグを使用します。`*`（アスタリスク）をゾーンの**id**に置き換えるか、アスタリスクを残すとランダムなエリアに生成されます。
 
- startSite（野原）に生成する場合 → `addZone_startSite`  
- ダルフィ地下1階に生成する場合 → `addZone_derphy/-1`  
[SourceGame/Zone](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752)の**id**列を参照してください。

各`addZone`タグは、そのエリアに必ず1体のキャラクターを生成します。  
例：  
```
addZone_lumiest,addZone_little_garden,addZone_specwing,addZone_*
```

→ 選択した3エリア＋ランダム1エリアにそれぞれ1体ずつ生成（合計4体）

![img](./assets/spawn_chara.png)

## 初期装備/アイテムの追加

タグ `addEq_ItemID#Rarity` または/および `addThing_ItemID#Count` を使用してください。

特定の装備をキャラクターに割り当てるには、タグ `addEq_ItemID#Rarity` を使用し、`ItemID`をアイテムのIDに置き換え、Rarityは次のいずれかを指定してください：ランダム（Random）、粗悪（Crude）、普通（Normal）、高品質（Superior）、奇跡（Legendary）、神器（Mythical）、特別製（Artifact）。`#Rarity`を省略した場合、デフォルトのレアリティ`#Random`が使用されます。

例えば、奇跡の`BS_Flydragonsword`とランダムの`axe_machine`をキャラクターのメイン武器に設定する場合：
**addZone_Palmia,addEq_BS_Flydragonsword#Legendary,addEq_axe_machine**

キャラクターに初期アイテムを追加するには、タグ `addThing_ItemID#Count` を使用します。`#Count`を省略した場合、デフォルトで1つのアイテムが生成されます。

例えば、キャラクターに`padoru_gift`を10個、`援軍巻軸`を5つ追加する場合：
**addZone_Palmia,addThing_padoru_gift#10,addThing_1174#5**

## 冒険者の作成

キャラクターの trait が`AdventurerBacker`に設定されている場合、はそのキャラクターを冒険者としてインポートし、冒険者ランキングリストに表示されます。

## 人間の対話の使用

種族（Race）テーブルに `human` または `humanSpeak` タグを追加するだけでなく、キャラクター（Chara）テーブルにも `humanSpeak` タグを使用することで、キャラクターの会話で括弧を使わずに表現できます。

## カスタム商人の在庫定義

こちらで定義されたカスタム商人の在庫データを使用してください：[Custom Merchant](./2_merchant)。

## 会話・ストーリーの追加

ここでは、三種類の会話を追加できます：[Dialog & Drama](./1_talks)。