---
title: Modding チートシート
author: Drakeny
description: Modder向けの素早く簡単に繰り返し使える知識。
date: 2024/12/8 2:53
tags: Cheatsheet
---

# チートシート

この記事は常に進化し続けるため、フォーマットが少し崩れることがあるかもしれません。

## 〜はどこにある？

ゲームの特定のデータがどこにあるか知りたいですか？その答えはこちらです：

### ゲームログ

> [!Important] %localappdata%low/Lafrontier/Elin/Player.log

### グラフィックアセット

#### PCC関連

> [!Important] (SteamPath)/Elin/Package/_Elona/Actor
> 主人公のグラフィック（ドット絵）、つまりPCCのことです。

#### オブジェクト/キャラクター/ブロックなどのスプライト {#sprites}

> [!Important] (SteamPath)/Elin/Package/_Elona/Textures
> ::: info 以下の手順で、ゲーム内のすべてのスプライトシートにアクセスできます： `Esc > ツール > テクスチャビューアー` 。
>
> そこでタイル番号を確認することもできます。
>
> Elin本体のキャラクターのタイル番号は、ソースシート「SourceChara」の tile 列に対応しています。
> :::

#### ポートレート {#portrait}

> [!Important] (SteamPath)/Elin/Package/_Elona/Portraits

### ゲームデータ

#### Source Game

> [!Important] 以下のシートを含みます：
> `Elements`、`Formulas(Calc)`、`Stats`、`Checks`、`Factions`、`Religions`、`Zones`、`Zone Affixes`、`Quests`、`Areas`、`Home Resources`、`Research`、`Persons`。
> <LinkCard t="SourceGame.xlsx" u="https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_"/>

#### Source Chara

> [!Important] 以下のシートを含みます：
> `Characters(Chara)`、`Barks (CharaTalk)`、`Tactics`、`Races`、`Jobs`、`Hobbies`。
> <LinkCard t="SourceChara.xlsx" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn"/>

#### Source Card

> [!Important] 以下のシートを含みます：
> `Things`、`Foods`、`Recipes`、`SpawnLists`、`Categories`、`Collectables`、`KeyItems`。
> <LinkCard t="SourceCard.xlsx" u="https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z"/>

## 〜する方法

### ポートレートの追加・置換

> [!Important] 新しいポートレートを追加する場合：
> Modフォルダ内に `Portrait` というサブフォルダを作成し、新しいポートレート画像を追加します。
>
> <LinkCard t="Portrait" u="15_Texture Mods/portraits.md" />

> [!Important] ポートレートを置換する場合：
> Modフォルダ内に `Portrait` というサブフォルダを作成し、置換したいポートレートの名前で画像を追加します。
>
> 例：`portrait/UN_adv_gaki.png` は冒険者Gakiのポートレートを置換します。
>
> <LinkCard t="Portrait" u="15_Texture Mods/portraits.md" />

### スプライトの置換

> [!Important] スプライトを置換する場合： 
> ゲーム内ツールの `Esc > ツール > テクスチャビューアー` を使用します。
>
> 中クリックで拡大、左クリックしてドラッグします。

> [!Important] 以下の方法でもスプライトを置換できます：
> Modフォルダ内に `Texture Replace` というサブフォルダを作成し、置換したいスプライトシート名とタイル番号を使用してスプライト画像を追加します。
>
> 例：`Texture Replace/objC_2115.png` は冒険者Gakiのスプライトを置換します。
> ::: info スプライトシート名とタイル番号は [**テクスチャビューアー**](#sprites) で確認できます。
> :::

 完全な内容は、メニューの `テクスチャMod` セクションに移動してお読みください。 <!--Menu=总目录=メニュー。Texture Mods=贴图模组=テクスチャMOD--> 

