---
title: Card 实例化
date: 2025/6/20 01:00
hide: true
---

# `CwlOnCreateEvent`

[命名空间: `Cwl.Patches.Sources;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/Patches/Sources/CardOnCreateEvent.cs)

游戏创建一个 `Card` 时触发的事件。您需要使用派生属性 `CwlCharaOnCreateEvent` 和 `CwlThingOnCreateEvent` 来分别注册游戏实例化 `Chara` 和 `Thing` 时触发的事件。

## `CwlThingOnCreateEvent`

```cs:no-line-numbers
[CwlThingOnCreateEvent]
internal static void OnThingSpawned(Thing thing)
{
    if (thing.id == "some_item") {
        // do stuff
    }
}
```

## `CwlCharaOnCreateEvent`

```cs:no-line-numbers
[CwlCharaOnCreateEvent]
internal static void OnCharaInstantiation(Chara chara)
{
    if (chara.id == "chicken") {
        chara.Destroy();
    }
}
```
