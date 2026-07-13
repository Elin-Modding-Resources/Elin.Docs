---
title: カスタムスキン
author: DK
description: カスタムスキンの追加方法
date: 2026/4/9 16:00
tags: Texture/Skin
---

# Skin フォルダ

ここに置いたテクスチャは、ゲーム内 → 住人掲示板 → **スキンを変更** で使用できます。

この **スキンを変更** 機能は、特定のNPCひとりのテクスチャのみを変更し、NPCの種類全体のテクスチャは変更しません。

+ **場所：** 下記の[場所の節](#skin-folder-location)を参照
+ **サイズ：** 128×128 または 128×256
+ **背景：** 透明
+ **ファイル形式：** png
+ **ファイル名：** skinname.png
  + skinname はあなたが自由に決める名前（ファイル名のうち .png の前の部分）です。形式の決まりはありませんが、変なバグを防ぐため、英数字での命名を推奨します。

[スプライトバリエーション](./variation) 機能の[雪バリエーション](./variation#雪バリエーション)や[方向スプライト](./variation#方向スプライト)を、Skin フォルダと組み合わせて使用できます。これらを Skin フォルダ内で一緒に使うことも可能です。

## 場所 {#skin-folder-location}

ローカルに保存することもできます：

+ **場所：** `%localappdata%low\Lafrontier\Elin\Custom\Skin`
+ **開き方：** ゲーム内で Esc → ツール → 差し替えフォルダを開 → Skin フォルダを探す

Mod 形式で使用することもできます：

+ **場所：** `<ElinGamePath>/Package/<ModName>/Skin`。[Mod パッケージ](../2_Getting%20Started/basic_mod)の必須ファイルを用意する必要があります。詳細は[Mod パッケージ](../2_Getting%20Started/basic_mod)ページを参照してください。

## 互換性

Texture Expand Mod / Provisional TextureExpand Mod（以下「TE」）を使用している場合：

+ TE で設定されたキャラクターに対して、住人掲示板の **スキンを変更** 機能を使うと、バグが発生する可能性があります
+ 代替案として、自分で TE ルールを書くこともできます。詳細は TE Mod に同梱の説明書をお読みください