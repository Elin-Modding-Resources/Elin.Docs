---
title: Chara
date: 2025/1/3 01:00
hide: true
---

# `CustomChara`

[Namespace: `Cwl.API.Custom;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/API/Custom/CustomChara.cs)

Custom API for processing `Chara`.

## Add

```cs
CustomChara.AddChara(SourceChara.Row r);
```

Process a row as custom character and manage it internally.

## `CreateTaggedChara`

```cs
CustomChara.CreateTaggedChara(string id, out Chara? chara, string[]? equips = null, string[]? things = null)
```