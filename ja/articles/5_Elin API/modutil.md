---
title: ModUtil
author: DK
description: Plugins.Modding and ModUtil explained.
date: 2026/6/9 19:00
tags: API/ModUtil/C#
---

# ModUtil & Events

Events in Elin can be registered via `BaseModManager.SubscribeEvent<T>(EventId, Action<T>)`. Some of them also offer attribute usages allowing automatic subscription.

## Mod

+ `EVENT.ModsActivated`

No parameter. Published after all mod packages have been activated.

## Game IO

+ `EVENT.PreLoad`, `[ElinPreLoad]`
+ `EVENT.PostLoad`, `[ElinPostLoad]`
+ `EVENT.NewGame`, `[ElinPostLoad]` // <- Same attribute
+ `EVENT.PreSave`, `[ElinPreSave]`
+ `EVENT.PostSave`, `[ElinPostSave]`

Parameter: `GameIOContext`

+ `[ElinGameIOProperty("chunkName")]`

Marks a **static property** to be automatically saved to and loaded from the save file under the given chunk name. The property must have both a getter and a static setter.

```cs
[ElinGameIOProperty("my_counter")]
public static int MyCounter { get; set; }
```

## Game System

+ `EVENT.CharaCreated`, `[ElinCharaOnCreate]`
+ `EVENT.ThingCreated`, `[ElinThingOnCreate]`

Parameter: `Chara` or `Thing`

+ `EVENT.ActPerformed`, `[ElinActPerform]`

Parameter: `Act` that just performed

+ `EVENT.FeatApply`

Parameter: `EVENT.ElinFeatApplyEventArgs` (`feat`, `owner`, `hint`), published when a feat is being applied.

+ `EVENT.ReligionImporting`

Parameter: `List<Religion>` that is being registered.

+ `ModUtil.AddContextMenuEntry`, `[ElinContextMenuEntry]`

Attribute parameter: `string langEntry, string langDisplay = ""`
Manual API: `ModUtil.AddContextMenuEntry(Action onClick, string menuEntry, string displayName = "")`
Registers a context menu entry, such as `SubGroup/ModButton1`.

+ `EVENT.PreSceneInit`, `[ElinPreSceneInit]`
+ `EVENT.PostSceneInit`, `[ElinPostSceneInit]`

Parameter: `Scene.Mode`

## Source

+ `EVENT.SourceImporting`
+ `EVENT.SourceImported`

No parameter. Published before/after importing source sheets.

+ `EVENT.SourceLangSet`

Parameter: `string langCode`

## Drama

+ `[ElinDramaActionInvoke]`
+ `[ElinDramaActionParser]`

See [Drama API](../10_Source%20Sheets/drama.md#api)
