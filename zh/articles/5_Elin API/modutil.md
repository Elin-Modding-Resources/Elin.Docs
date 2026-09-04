---
title: ModUtil
author: DK
description: Plugins.Modding 与 ModUtil 详解
date: 2026/6/9 19:00
tags: API/ModUtil/C#
---

# ModUtil 与事件

Elin 的事件可以通过 `BaseModManager.SubscribeEvent<T>(EventId, Action<T>)` 注册。部分事件同时提供了特性（Attribute）写法，可自动完成订阅。

## 模组

+ `EVENT.ModsActivated`

无参数。在所有模组包激活完成后发布。

## GameIO 存档读写

+ `EVENT.PreLoad`、`[ElinPreLoad]`
+ `EVENT.PostLoad`、`[ElinPostLoad]`
+ `EVENT.NewGame`、`[ElinPostLoad]` // <- 同一个特性
+ `EVENT.PreSave`、`[ElinPreSave]`
+ `EVENT.PostSave`、`[ElinPostSave]`

参数：`GameIOContext`

+ `[ElinGameIOProperty("chunkName")]`

标记一个**静态属性**，使其以给定的块名自动保存到存档、并从存档中读回。该属性必须同时具有静态 getter 和静态 setter。块名以声明类型为作用域，两个类各自使用 `"my_data"` 也不会冲突。

推荐的写法是把 mod 要存的所有数据放进一个可序列化的类，只暴露一个可null的静态实例：

```cs
public class MySaveData {
	public int Counter;

	[ElinGameIOProperty("my_data")]
	public static MySaveData? Singleton { get; set; }
}
```

## 游戏系统

+ `EVENT.CharaCreated`、`[ElinCharaOnCreate]`
+ `EVENT.ThingCreated`、`[ElinThingOnCreate]`

参数：`Chara` 或 `Thing`

+ `EVENT.ActPerformed`、`[ElinActPerform]`

参数：刚刚执行完毕的 `Act`

+ `EVENT.FeatApply`

参数：`EVENT.ElinFeatApplyEventArgs`（`feat`、`owner`、`hint`），在专长被应用时发布。

+ `EVENT.ReligionImporting`

参数：正在被注册的 `List<Religion>`

+ `ModUtil.AddContextMenuEntry`、`[ElinContextMenuEntry]`

特性参数：`string langEntry, string langDisplay = ""`
手动 API：`ModUtil.AddContextMenuEntry(Action onClick, string menuEntry, string displayName = "")`
注册一个上下文菜单项，例如 `SubGroup/ModButton1`。

+ `EVENT.PreSceneInit`、`[ElinPreSceneInit]`
+ `EVENT.PostSceneInit`、`[ElinPostSceneInit]`

参数：`Scene.Mode`

## 源数据

+ `EVENT.SourceImporting`
+ `EVENT.SourceImported`

无参数。在导入源表之前 / 之后发布。

+ `EVENT.SourceLangSet`

参数：`string langCode`

## 剧情

+ `[ElinDramaActionInvoke]`
+ `[ElinDramaActionParser]`

参见 [Drama API](../10_Source%20Sheets/drama.md#api)
