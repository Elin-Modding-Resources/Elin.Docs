---
title: ModUtil
author: DK
description: Plugins.Modding and ModUtil explained.
date: 2026/6/9 19:00
tags: API/ModUtil/C#
---

# ModUtil & Events

Events in Elin can be registered via `BaseModManager.SubscribeEvent<T>(EventId, Action<T>)`. Some of them also offer attribute usages allowing automatic subscription.

## Game IO

+ `EVENT.PreLoad`, `[ElinPreLoad]`
+ `EVENT.PostLoad`, `[ElinPostLoad]`
+ `EVENT.NewGame`, `[ElinPostLoad]` // <- Same attribute
+ `EVENT.PreSave`, `[ElinPreSave]`
+ `EVENT.PostSave`, `[ElinPostSave]`

Parameter: `GameIOContext`

## Game System

+ `EVENT.CharaCreated`, `[ElinCharaOnCreate]`
+ `EVENT.ThingCreated`, `[ElinThingOnCreate]`

Parameter: `Chara` or `Thing`

+ `EVENT.ActPerformed`, `[ElinActPerform]`

Parameter: `Act` that just performed

+ `ModUtil.AddContextMenuEntry`, `[ElinContextMenuEntry]`

Parameter: `string langEntry, string langDisplay = ""`
Registers a context menu entry, such as `SubGroup/ModButton1`.

+ `EVENT.PreSceneInit`
+ `EVENT.PostSceneInit`

Parameter: `Scene.Mode`

## Source

+ `EVENT.SourceImporting`
+ `EVENT.SourceImported`
+ `EVENT.SourceLangSet`

## Drama

+ `[ElinDramaActionInvoke]`
+ `[ElinDramaActionParser]`

See [Drama API](../10_Source%20Sheets/drama.md#api)