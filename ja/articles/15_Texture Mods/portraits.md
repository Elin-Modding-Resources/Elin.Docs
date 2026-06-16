---
title: ポートレート
author: DK
description: PC と NPC のポートレート追加方法
date: 2026/4/9 15:00
tags: Texture/Portrait
---

# ポートレート仕様

ポートレートは [Mod パッケージ](../2_Getting%20Started/basic_mod) 内の `Portrait` フォルダに配置する `.png` ファイルです。

+ サイズ：240x320
+ 背景：透明
+ ファイル名：**カテゴリ**_**性別**-**名前**.png

カテゴリ：
+ **`c`**：デフォルトのキャラクターポートレート
+ **`foxfolk`**：ミフ・ネフ族のポートレート
+ **`guard`**：ガードのポートレート
+ **`special`**：少女、妹、流刑者などの特殊ポートレート

性別：
+ **`m`**：男性
+ **`f`**：女性
+ **`n`**：不明

## プレイヤーポートレート

新しいプレイヤーポートレートを追加する場合、上記の任意のカテゴリと任意の名前を組み合わせて使用できます（例：`c_f-myportraits01` や `special_n-myportraits02`）。ファイル名は一意にしてください。

## NPC ポートレート

一部のハードコードされた NPC は常に固定のポートレート ID を使用します：

|キャラ ID|ポートレート ID|
|-|-|
|`shojo`|`special_f-littlegirl`|
|`sister`|`special_f-littlesister`|
|`sister_shark`|`special_f-littlesister`|
|`sister_penguin`|`special_f-littlesister`|
|`imotoroid`|`special_f-littlesister`|
|`imotoroid_origin`|`special_f-littlesister`|
|`citizen_exile`|`special_n-exile` (非ランダム)|

ユニーク NPC は `UN_id` をポートレート ID として使用します。例：フィアマは `UN_fiama`、グウェンは `UN_gwen` です。

同じポートレート ID の画像を提供することで、ユニーク NPC のポートレートを上書きできます。

## 新規キャラクター Mod のポートレート

新しいキャラクター Mod を作成する場合、キャラクターのポートレート（固定立ち絵）も `UN_` プレフィックスで紐付けられます。

透明背景の画像を `UN_id.png` という名前でポートレートとして提供する必要があります。

+ **サイズ：** 幅:高さ=3:4  
（240x320 を推奨。それ以外の場合、拡縮により画質が低下する可能性があります。）
+ **背景：** 透明
+ **ファイル名：** `UN_id.png`  
（`id` は [キャラクターソースシート](../10_Source%20Sheets/character) の ID 列に入力したキャラクター ID です）
