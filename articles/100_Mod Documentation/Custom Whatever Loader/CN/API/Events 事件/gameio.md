---
title: GameIO 保存读取
date: 2025/1/3 01:00
hide: true
---

# `GameIOProcessor`

[命名空间: `Cwl.API.Processors;`](https://github.com/gottyduke/Elin.Plugins/tree/master/CustomWhateverLoader/API/Processors)

游戏保存/加载/新建时的事件，可注册预/后处理，并提供一个序列化工具类。

## `GameIOProcess`

事件定义如下：
```cs:no-line-numbers
delegate void GameIOProcess(GameIOContext context);
// ->
static void MySaveHandler(GameIOContext context);
```

## `GameIOContext`

一个帮助序列化/反序列化数据到当前存档的工具类。
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

`string`参数 `chunkName` 是这块数据的唯一标识符，如果省略，将使用数据类型的全名。如果您有多个相同类型的数据，可以考虑使用基于索引或基于哈希值的块名称。

## 注册

```cs:no-line-numbers
GameIOProcessor.AddSave(MySaveHandler, post: true);
GameIOProcessor.AddLoad(MyLoadHandler, post: true);
```

`bool`参数 `post` 决定这是一个后处理事件还是一个预处理事件。

或者通过属性注册:
```cs:no-line-numbers
[CwlPostSave] // [CwlPreSave]
static void MySaveHandler(GameIOProcessor.GameIOContext context);

[CwlPostLoad] // [CwlPreLoad]
static void MyLoadHandler(GameIOProcessor.GameIOContext context);
```