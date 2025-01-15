---
title: 導入キャラクター
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

各 `addZone` タグは、そのエリアにキャラクターを生成することを保証します。例えば、`addZone_Lumiest, addZone_LittleGarden, addZone_Specwing, addZone_*` は、選択された3つのエリアとランダムな1つのエリアにキャラクターを生成します。

## 初期装備/アイテムの追加

CWLがキャラクターを生成する際、初期装備とアイテムも定義できます。タグ `addEq_ItemID#Rarity` または/および `addThing_ItemID#Count` を使用してください。

特定の装備をキャラクターに割り当てるには、タグ `addEq_ItemID#Rarity` を使用し、`ItemID`をアイテムのIDに置き換え、Rarityは次のいずれかを指定してください：ランダム（Random）、粗悪（Crude）、普通（Normal）、優良（Superior）、伝説（Legendary）、神話（Mythical）、神器（Artifact）。`#Rarity`を省略した場合、デフォルトのレアリティ`#Random`が使用されます。

例えば、伝説の`BS_Flydragonsword`とランダムの`axe_machine`をキャラクターのメイン武器に設定する場合：
**addZone_Palmia,addEq_BS_Flydragonsword#Legendary,addEq_axe_machine**

キャラクターに初期アイテムを追加するには、タグ `addThing_ItemID#Count` を使用します。`#Count`を省略した場合、デフォルトで1つのアイテムが生成されます。

例えば、キャラクターに`padoru_gift`を10個、`援軍巻軸`を5つ追加する場合：
**addZone_Palmia,addThing_padoru_gift#10,addThing_1174#5**

## 冒険者の作成

105gunに感謝します。

キャラクターの trait が`Adventurer`または`AdventurerBacker`に設定されている場合、CWLはそのキャラクターを冒険者としてインポートし、冒険者ランキングリストに表示されます。

::: warning 注意
CWL 1.15.0以降、以前のタグ`addAdvZone`/`addAdvEq`/`addAdvThing`は上記の通常のタグに置き換えられましたが、まだ使用可能です。
![img](https://i.postimg.cc/SN93258B/image.png)
:::
