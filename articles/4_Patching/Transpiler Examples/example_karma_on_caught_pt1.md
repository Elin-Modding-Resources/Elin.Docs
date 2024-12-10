---
title: "Example: Karma On Caught pt.1"
author: DK
description: "Transpiler example: how to not lose karma on crime actions."
date: 2024/12/2 06:00
tags: Guide/Transpiler
---

::: info
Examples are taken from mod `Lose Karma On Caught` with modifications.
:::

::: warning `Karma`
The literal meaning of word `karma` is not the same as `crime/bounty/notoriety`, it's a self inspected, self reflected, state of consequences from ones' actions. However, Elin simply used the word `karma` for its crime level system, so we'll take it that way.
:::

# No Karma Loss

Sometimes you want a method call to be skipped inside another method, and sometimes you want to add your own call at certain places. 

You could achieve that by using **`Prefix`** workaround which sets up a state before the method executes, and a skipping **`Prefix`** to return `false` when it's called inside the target method. 

Let's see if we can do it the **`Transpiler`** way.

## Target Methods

Say our first step is to make players not lose karma when digging up thief's guild, which involves two actions, `TaskDig` and `TaskMine`. 

Here's the target method to patch for both classes:
```cs{5}
public override void OnProgressComplete()
{
    // truncated for brevity
    if (EClass._zone.IsCrime(owner, this)) {
        EClass.player.ModKarma(-1);
    }
    // truncated for brevity
}
```

The logic explains itself: if this action(`TaskDig`/`TaskMine`) is considered a crime in current zone, then player will lose karma.

## Workaround(?)

We can make a **`Prefix`** for `IsCrime()`, and check its 2nd parameter for being `TaskDig` or `TaskMine`:
```cs
[HarmonyPrefix]
[HarmonyPatch(typeof(Zone), nameof(Zone.IsCrime))]
internal static bool OnCheckingDwarf(Act act, ref bool __result)
{
    if (act is TaskDig or TaskMine) {
        __result = false;
        return false;
    }
}
```

If the act is `TaskDig` or `TaskMine`, then we return and set the result to `false` to make it not a crime. Simple! Who needs **`Transpiler`** for that?

## Another Workaround(?)

What if we also want to make stealing not a crime? This is the snippet from `AI_Steal.Run()`:
```cs{8,11}
onProgressComplete = delegate {
    if (target.isThing && target.IsInstalled) {
        target.SetPlaceState(PlaceState.roaming);
    }
    owner.Say("steal_end", owner, target);
    if (chara != null && (chara.IsPCFaction || // [!code focus]
            chara.OriginalHostility >= Hostility.Friend)) { // [!code focus]
        EClass.player.ModKarma(-1); // [!code focus]
    } // [!code focus]
    else if (chara == null || chara.hostility > Hostility.Enemy) { // [!code focus]
        EClass.player.ModKarma(-1); // [!code focus]
    } // [!code focus]
    target.isNPCProperty = false;
    if (!target.category.IsChildOf("currency")) {
        target.isStolen = true;
    }
    owner.Pick(target.Thing);
    owner.elements.ModExp(281, 50);
    if (EClass.rnd(2) == 0) {
        EClass.pc.stamina.Mod(-1);
    }
}
```

To setup a similar workaround for this patch, now we need to **`Prefix`** `Player.ModKarma()` instead, and also wrap this delegate in `AI_Steal.Run()` with a **`Prefix`** and **`Postfix`** to setup a `bool` state to indicate that we are executing the `AI_Steal.Run()` code:
```cs
internal static bool ShouldSkip;

[HarmonyPrefix]
[HarmonyPatch(typeof(AI_Steal), nameof(AI_Steal.Run))]
internal static void OnStealingCrime()
{
    ShouldSkip = true;
}

[HarmonyPostfix]
[HarmonyPatch(typeof(AI_Steal), nameof(AI_Steal.Run))]
internal static void OnStealingCrimeFinish()
{
    ShouldSkip = false;
}

[HarmonyPrefix]
[HarmonyPatch(typeof(Player), nameof(Player.ModKarma))]
internal static bool OnModKarma()
{
    return !ShouldSkip;
}
```

## The Transpiler Way

It's already getting a bit ugly with workarounds now, and what if the actual code is even more complicated? Let's do it the **`Transpiler`** way then.

### IL with C#

We already know all these actions will call `Player.ModKarma()`, so we just need to find the IL instructions for the call, and remove it or replace it with other operations.

Let's take a look at the IL instructions of `OnProgressComplete`:
```cs:no-line-numbers
// EClass.player.ModKarma(-1);
call class Player EClass::get_player()
ldc.i4.m1
callvirt inst void Player::ModKarma(int32)
```

First it calls the getter method of property `EClass.player`, which returns our `Player` instance onto the stack. Because `ModKarma` is a class bound method, not a static method, which a `this` instance will be the 1st hidden parameter.

Then it **loads constant 4-byte-int(int32) of minus 1**, which is just a `int -1`, onto the stack as the 2nd parameter.

Finally with the instance and the parameter on the stack, it calls the method `ModKarma(-1)` from instance `EClass.player`.

### Solution

When the `callvirt inst void Player::ModKarma(int32)` executes, there are 2 values on the stack, `Player` instance and `int -1` value. If we simply remove the call, then we are left with an unbalanced stack, so they also need to be removed from the stack.

```cs:no-line-numbers
call class Player EClass::get_player()
ldc.i4.m1
pop // <- removes int -1
pop // <- removes Player instance
```

## Implement

First we use attribute `[HarmonyTargetMethods]` or special method `TargetMethods()` to apply the patch to multiple methods:
```cs
// in a patch class
internal static IEnumerable<MethodInfo> TargetMethods() => [
    AccessTools.Method(typeof(TaskDig), nameof(TaskDig.OnProgressComplete)),
    AccessTools.Method(typeof(TaskMine), nameof(TaskMine.OnProgressComplete)),
    AccessTools.Method(typeof(AI_Steal), nameof(AI_Steal.Run)),
];
```

::: warning AI_Steal.Run
The target patch for `AI_Steal` is actually a delegate, for demo purpose we used `AI_Steal.Run` for simplicity.
::: details MethodInfo for `AI_Steal.Run.MoveNext.onProgressComplete`
```cs
var closure = AccessTools.FirstInner(
    typeof(AI_Steal), 
    t => t.Name.Contains("DisplayClass9_0"));
return AccessTools.Method(closure, $"<{nameof(AI_Steal.Run)}>b__3");
```
:::

Then a **`Transpiler`** patch, note that we don't use `[HarmonyPatch]` attribute here because we already used `TargetMethods()` to define the method info.
```cs
internal static IEnumerable<CodeInstruction> Transpiler(
    IEnumerable<CodeInstruction> instructions)
{
    return new CodeMatcher(instructions)
        .InstructionEnumeration();
}
```

### Match

Now use `CodeMatcher` to locate our IL instructions:
```cs
return new CodeMatcher(instructions)
    .MatchEndForward( // [!code focus]
        new CodeMatch(OpCodes.Callvirt, AccessTools.Method( // [!code focus]
            typeof(Player), // [!code focus]
            nameof(Player.ModKarma)))) // [!code focus]
    .InstructionEnumeration();
```

This is a match for:
```cs
callvirt inst void Player::ModKarma(int32)
```

### Remove & Pop

After matching, we can remove this instruction, then insert two more `Pop` to balance the stack:
```cs
return new CodeMatcher(instructions)
    .MatchEndForward(
        new CodeMatch(OpCodes.Callvirt, AccessTools.Method(
            typeof(Player),
            nameof(Player.ModKarma))))
    .RemoveInstruction() // [!code focus]
    .InsertAndAdvance( // [!code focus]
        new CodeInstruction(OpCodes.Pop), // [!code focus]
        new CodeInstruction(OpCodes.Pop)) // [!code focus]
    .InstructionEnumeration();
```

## Voilà

The complete patch:
```cs
// in a patch class
internal static IEnumerable<MethodInfo> TargetMethods() => [
    AccessTools.Method(typeof(TaskDig), nameof(TaskDig.OnProgressComplete)),
    AccessTools.Method(typeof(TaskMine), nameof(TaskMine.OnProgressComplete)),
    AccessTools.Method(typeof(AI_Steal), nameof(AI_Steal.Run)),
];

internal static IEnumerable<CodeInstruction> Transpiler(
    IEnumerable<CodeInstruction> instructions)
{
    return new CodeMatcher(instructions)
        .MatchEndForward(
            new CodeMatch(OpCodes.Callvirt, AccessTools.Method(
                typeof(Player),
                nameof(Player.ModKarma))))
        .RemoveInstruction()
        .InsertAndAdvance(
            new CodeInstruction(OpCodes.Pop),
            new CodeInstruction(OpCodes.Pop))
        .InstructionEnumeration();
}
```

That's it! You have removed the `Player.ModKarma()` call from three actions. If you want to apply to more actions, simply add the target method info to the `TargetMethods()` collection.
