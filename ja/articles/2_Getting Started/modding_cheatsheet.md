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

### ゲームログ (Player.log)

> [!Important] %localappdata%low/Lafrontier/Elin/Player.log
> :::info 上記のパス以外にも、次の手順で開くことができます：
> ゲーム内 `ESC → 設定 → その他 → エラーログを開く`
>
> フォルダ内の Player.log ファイルを見つけてください。
> :::
> 誰かに Player.log を要求された場合、テキストをコピーするのではなく、ファイル全体を送ってください。

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

Elinは大部分のゲームデータを**ソースシート**で記録しています。

ソースシートの詳細な説明については、メニューの `ソースシート` セクションを参照してください。

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

#### ソースシートを手動でエクスポートする方法

> [!Important] ソースシートを手動でエクスポートする方法
> Steamで `-exportsource` パラメータを設定して起動すると、Elinは自動的にソースシートのデータをCSVファイルとしてエクスポートし、(SteamPath)/Elin/SourceExport ディレクトリに保存します。
>
> ::: details 詳細な手順とトラブルシューティング
> 1. SteamでElinを右クリックし、「プロパティ」をクリックします
> 2. 起動オプションに `-exportsource` と入力します
> 3. ゲームを起動すると、(SteamPath)/Elin/SourceExport ディレクトリにCSVファイルが生成されます
>
> トラブルシューティング：
> 
> エクスポートに失敗した場合は、すべてのModを無効化してゲームを再起動してみてください。[Modビューアー](#modビューアー) で全Modを一括で無効化できます。
> 
> 文字化けが発生する場合は、まず [Excel で CSV UTF-8 ファイルを正しく開く](https://support.microsoft.com/ja-JP/excel/opening-csv-utf-8-files-correctly-in-excel) をご確認ください。
> :::

### Modファイル

#### Modビューアー

> [!Important] Modビューアー
> :::info 以下の手順でModビューアーを開くことができます：
> ゲーム内で `ESC → ツール → Modビューアー`
> 
> Modビューアーを開いた後、Modをクリックし、 `エクスプローラで開く` をクリックすると、Modファイルを見つけることができます。
> :::
> ファイル名に `[Local]` が含まれるModは、packageフォルダ内にあるローカルModです。
>
> ワークショップでサブスクライブしたModは、workshopフォルダ内にあります。

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

### ゲームとModの強制アップデート

**ファイルの整合性を確認** することで、Elinの本体ファイルとModを強制的にアップデートできます。自動アップデートを有効にしていても、SteamがModを更新しなかったり、更新時にファイルが不足してバグが発生したりすることがあります。

整合性を確認する手順：
1. ゲームを終了する
2. Steam内で `Elinを右クリック -> プロパティ -> インストール済みファイル -> ゲームファイルの整合性を確認`

プログレスバーが完了すると、ゲームとModが最新バージョンに更新されます。奇妙なバグが発生した場合は、まず最初に整合性の確認を行ってください。

### Modの作成

#### ModMaker

[ModMaker](https://modmaker.elin-modding.net/) を使用してModを作成できます。現在ModMakerの機能は以下の通りです：
+ 新しいキャラクターの作成
+ ドラマの作成
+ 新しい種族
+ 新しい職業（job）

注意：ModMakerはElinがインストールされているPC端末で使用してください。

#### 手動でのソースシート記入

現在ModMakerには制限があり、問題が発生した場合や機能が不足している場合は、手動でソースシートを記入することができます。

詳細については [Elin シートMOD制作の基本とあなた](../2_Getting%20Started/sourcesheet_setup.md) を参照してください。

また、メニューの `ソースシートMODの作成` セクションの記事を読むこともできます。
