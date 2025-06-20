---
title: Act Perform 动作施放
date: 2025/6/20 01:00
hide: true
---

# `CwlActPerformEvent`

[命名空间: `Cwl.Patches.Elements;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/Patches/Elements/ActPerformEvent.cs)

游戏内任意一个 `Act` 或其派生类执行时触发的事件。

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
