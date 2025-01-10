---
title: 対話 & ドラマ
date: 2025/1/3 01:00
hide: true
---

## 喊叫

特定の状況下で、キャラクターは特定のセリフをトリガーし、そのセリフが頭上に表示されます。

![](./assets/bark.png)

これらのセリフは **CharaText** テーブルに記載されており、あなたのキャラクターは **idText** セルにそのセリフの ID を入力してリンクさせます。

![](./assets/charatext.png)

|セル|calm|fov|aggro|death|kill|
|-|-|-|-|-|-|
|トリガー|通常状態|視界内|怒り|死亡|キル|

## 対話

キャラクターと話すための対話を追加したい場合は、`LangMod/**/Dialog/` フォルダーに `dialog.xlsx` テーブルを準備します。

![img](./assets/dialog.png)

このテーブルの形式はゲームの対話テーブル **Elin/Package/_Elona/Lang/_Dialog/dialog.xlsx** と同じですが、`unique` テーブルとあなたのキャラクター ID を含む行だけを用意すれば大丈夫です。
****
![](./assets/unique.png)

ここでの ID はキャラクター ID と同じです。

## ドラマ

ドラマはキャラクターとの豊かな対話であり、通常は選択肢や分岐、いくつかのトリガーアクションを含みます。

![](./assets/drama_eg.png)

キャラクターにカスタムドラマを追加するには、`addDrama_DramaSheetName` タグを使用します。CWL はそのドラマを自動的にリダイレクトします。

あなたのカスタムドラマテーブルは `LangMod/**/Dialog/Drama/` フォルダーに置く必要があり、名前はタグと一致する必要があります。例えば、`addDrama_MyCharaDrama` を使用すると、`Dialog/Drama/MyCharaDrama.xlsx` に対応します。

自分のドラマを作成する際は、ゲーム内のドラマテーブルを参照することができ、パスは **Elin/Package/_Elona/Lang/_Dialog/Drama** です。また、Tiny Mita の例を参照することもでき、テンプレートドラマテーブルがあります：

<LinkCard t="CWL Example: Tiny Mita" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3396774199" />

![img](./assets/drama.png)

::: tip ホットリロードドラマ
ドラマテーブルはゲーム中に編集して保存することができ、対話のたびにホットリロードされます。
:::
