---
title: Act Perform
date: 2025/6/20 01:00
hide: true
---

# `CwlActPerformEvent`

[Namespace: `Cwl.Patches.Elements;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/Patches/Elements/ActPerformEvent.cs)

Event raised when any `Act` or its derived classes are performed in game.

```cs:no-line-numbers
[CwlActPerformEvent]
internal static void IsGodAct(Act act)
{
    if (act.id == "actual_god_act") {
        // do stuff
    }

    if (act is ActHand hand) {
        EClass.pc.Say("god hands!")
    }
}
```
