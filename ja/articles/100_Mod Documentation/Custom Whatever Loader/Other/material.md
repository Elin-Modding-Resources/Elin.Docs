---
title: カスタムMaterial
date: 2025/1/3 01:00
hide: true
---

## カスタム Material

カスタムマテリアルをMaterial表で定義していると仮定しますが、デフォルトではゲームはマテリアルの色が欠落しているため、カスタムマテリアルを読み込むことができません。

CWLを使用する際は、タグを使ってカスタムカラーを設定できます。

マテリアルの行の **tag** セルで、 **addCol_Main(color_hex)** および **addCol_Alt(color_hex)** を使用してマテリアルの主色と副色を定義します。色は16進数形式で指定し、透明度を含む(RGBA)8桁の数値でなければなりません。

例： **addCol_Main(ffff00ff),addCol_Alt(ff0000ff)**

![img](https://i.postimg.cc/QxRmp0ZY/image.png)

カラーの16進数文字列は大文字と小文字を区別せず、 **#** または **0x** で始まってはいけません。
