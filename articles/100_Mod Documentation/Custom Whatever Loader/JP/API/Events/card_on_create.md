---
title: Card Instantiation
date: 2025/6/20 01:00
hide: true
---

# `CwlOnCreateEvent`

[Namespace: `Cwl.Patches.Sources;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/Patches/Sources/CardOnCreateEvent.cs)

Event raised when a `Card` is created in the game. You need to use the derived attributes `CwlCharaOnCreateEvent` or `CwlThingOnCreateEvent` to register the events for when the game instantiates `Chara` and `Thing`, respectively.

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
