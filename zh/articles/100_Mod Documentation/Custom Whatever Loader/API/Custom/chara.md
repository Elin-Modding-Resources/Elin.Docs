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
void CustomChara.AddChara(SourceChara.Row r);
```

Process a row as custom character and let CWL manage it internally. This will generate `CharaImport` profile.  

## `CreateTaggedChara`

```cs
bool CustomChara.CreateTaggedChara(string id, out Chara? chara)
```

Akin to `CharaGen.Create` and also uses the CWL tags from Chara row. You can also pass explicit equipments and things tags:

```cs
bool CustomChara.CreateTaggedChara(string id, out Chara? chara, string[]? equips, string[]? things)
```

The equip entry is `ID#Rarity`, or omit `#Rarity` for random gen. The thing entry is `ID#Count`, or omit `#Count` for a default of `1`.
