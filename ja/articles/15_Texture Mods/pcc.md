---
title: PCC パーツ
author: DK
description: カスタム PCC パーツの作成方法
date: 2026/4/19 13:00
tags: Texture/PCC
---

# PCC

プレイヤーのスプライトは PCC です。服、ズボン、目、その他のアクセサリーはすべて PCC パーツです。騎乗物も PCC フォルダに保存されます。

服だけでなく、人魚の尾、狐の尾、さらには主人公をスライムに変えることもできます。

## PCC キャンバス

PCC は 32×48 タイルで構成されたスプライトシートです。各行が方向を表し、各列がフレームを表します。

![](./assets/pcc_body_1.png)

## レイヤーとパス

PCC パーツは以下のレイヤー順序を使用します：

* hairbk
* mantle
* body
* undie
* boots
* pants
* cloth
* chest
* belt
* glove
* eye
* hair
* subhair
* face
* head
* etc
* mantlebk

`hairbk` と `mantlebk` は、それぞれのレイヤーの背面ビューです。

## 命名規則

PCC パーツは以下の形式に従う必要があります：
`pcc_layer_uniqueId.png`

例：

* `pcc_face_mypccmod01`
* `pcc_cloth_customwardrobe3`

`uniqueId` は以下の条件を満たす必要があります：

* 競合を避けるために一意であること
* アンダースコア（`_`）を含まないこと

## ファイルの配置場所

PCC ファイルは [Mod パッケージ](../2_Getting%20Started/basic_mod) 内の `Actor/PCC/female` フォルダに配置します。このパスはキャラクターの性別に関わらず常に `female` となることに注意してください。

騎乗物の PCC ファイルは [Mod パッケージ](../2_Getting%20Started/basic_mod) 内の `Actor/PCC/ride` フォルダに配置します。

## 大きいキャンバス

32×48 以外のタイルを作成するには、[Variable Sprite Support](https://steamcommunity.com/sharedfiles/filedetails/?id=3369451909) Mod をインストールしてください。
