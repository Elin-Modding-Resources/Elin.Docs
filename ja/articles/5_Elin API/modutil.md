---
title: ModUtil
author: DK
description: Plugins.Modding と ModUtil の解説
date: 2026/6/9 19:00
tags: API/ModUtil/C#
---

# ModUtil とイベント

Elin のイベントは `BaseModManager.SubscribeEvent<T>(EventId, Action<T>)` で登録できます。一部のイベントにはアトリビュートも用意されており、自動的に購読させることが可能です。

## Mod

+ `EVENT.ModsActivated`

パラメータなし。すべての Mod パッケージが有効化された後に発行されます。

## GameIO セーブ/ロード

+ `EVENT.PreLoad`、`[ElinPreLoad]`
+ `EVENT.PostLoad`、`[ElinPostLoad]`
+ `EVENT.NewGame`、`[ElinPostLoad]` // <- 同じアトリビュート
+ `EVENT.PreSave`、`[ElinPreSave]`
+ `EVENT.PostSave`、`[ElinPostSave]`

パラメータ：`GameIOContext`

+ `[ElinGameIOProperty("chunkName")]`

**静的プロパティ**に付けると、指定したチャンク名でセーブデータへ自動的に保存・読み込みされます。対象のプロパティには getter と静的な setter の両方が必要です。

```cs
[ElinGameIOProperty("my_counter")]
public static int MyCounter { get; set; }
```

## ゲームシステム

+ `EVENT.CharaCreated`、`[ElinCharaOnCreate]`
+ `EVENT.ThingCreated`、`[ElinThingOnCreate]`

パラメータ：`Chara` または `Thing`

+ `EVENT.ActPerformed`、`[ElinActPerform]`

パラメータ：実行され終えた `Act`

+ `EVENT.FeatApply`

パラメータ：`EVENT.ElinFeatApplyEventArgs`（`feat`、`owner`、`hint`）。Feat が適用される際に発行されます。

+ `EVENT.ReligionImporting`

パラメータ：登録中の `List<Religion>`

+ `ModUtil.AddContextMenuEntry`、`[ElinContextMenuEntry]`

アトリビュートのパラメータ：`string langEntry, string langDisplay = ""`
手動 API：`ModUtil.AddContextMenuEntry(Action onClick, string menuEntry, string displayName = "")`
`SubGroup/ModButton1` のようなコンテキストメニュー項目を登録します。

+ `EVENT.PreSceneInit`、`[ElinPreSceneInit]`
+ `EVENT.PostSceneInit`、`[ElinPostSceneInit]`

パラメータ：`Scene.Mode`

## ソースデータ

+ `EVENT.SourceImporting`
+ `EVENT.SourceImported`

パラメータなし。ソースシートのインポート前 / 後に発行されます。

+ `EVENT.SourceLangSet`

パラメータ：`string langCode`

## ドラマ

+ `[ElinDramaActionInvoke]`
+ `[ElinDramaActionParser]`

[Drama API](../10_Source%20Sheets/drama.md#api) を参照してください。
