---
title: Condition
date: 2025/1/3 01:00
hide: true
---

## Condition

Assumes you have setup your stats in an Stat sheet already, the following entries are important:

**id**: this should be a unique number, this is the stat id.  
**alias**: the actual string id of your stat.  
**type**: this C# type name corresponding to this stat.  

The rest are up to you to define. You may take references from [Elin Modding Wiki](https://elin-modding-resources.github.io/Elin.Docs/) or Elin Sources.

A custom condition must derive from **Condition**, common ones are **BadCondition**, **BaseDebuff**, **BaseStance**.
```cs
internal class ConCarbonated : ConDrunk;
```
