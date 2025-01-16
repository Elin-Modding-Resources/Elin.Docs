---
title: GameIO
date: 2025/1/3 01:00
hide: true
---

# `GameIOProcessor`

[Namespace: `Cwl.API.Processors;`](https://github.com/gottyduke/Elin.Plugins/tree/master/CustomWhateverLoader/API/Processors)

Event raised when game saves, loads, and starts new game. Offers both pre-process and post-process events and a helper to serializie/deserialize data.

## `GameIOProcess`

GameIOProcessor expects a handler as such:
```cs:no-line-numbers
delegate void GameIOProcess(GameIOContext context);
// ->
static void MySaveHandler(GameIOContext context);
```

## `GameIOContext`

A helper class to save and load data chunks within current save.
```cs:no-line-numbers
static void MySaveHandler(GameIOProcessor.GameIOContext context)
{
    var myData = new ArbitraryData();
    context.Save(myData, "uniqueChunkName");
}

static void MyLoadHandler(GameIOProcessor.GameIOContext context)
{
    if (!context.Load<ArbitraryData>(out var loaded, "uniqueChunkName") ||
        loaded is null) {
        return;
    }
    
    // use loaded data
}
```

The string parameter `chunkName` is a unique identifier for the chunk data, if omitted, the data type's full qualified name will be used. If you have multiple data of the same type, you may consider using an index-based or hash-based chunk name.

## Register

```cs:no-line-numbers
GameIOProcessor.AddSave(MySaveHandler, post: true);
GameIOProcessor.AddLoad(MyLoadHandler, post: true);
```

The bool parameter `post` determines whether this is a post-process event or a pre-process event.

Or register via Reflection:
```cs:no-line-numbers
[CwlPostSave] // [CwlPreSave]
static void MySaveHandler(GameIOProcessor.GameIOContext context);

[CwlPostLoad] // [CwlPreLoad]
static void MyLoadHandler(GameIOProcessor.GameIOContext context);
```