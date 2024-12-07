---
title: "Example: Karma On Caught pt.2"
author: DK
description: "Transpiler example: how to add additional check on caught."
date: 2024/12/5 22:00
tags: Guide/Transpiler
---

::: info
Examples are taken from mod `Lose Karma On Caught` with modifications.
:::

::: warning `Karma`
The literal meaning of word `karma` is not the same as `crime/bounty/notoriety`, it's a self inspected, self reflected, state of consequences from ones' actions. However, Elin simply used the word `karma` for its crime level system, so we'll take it that way.
:::

# Additional Skill Check

Sometimes you want a method call to be skipped inside another method, and sometimes you want to add your own call at certain places...It has been said in the previous [pt.1](./example_karma_on_caught_pt1). 

In Elin, if you get caught during some crime actions, like digging up the thief's guild, **again**, you'll lose karma. But what if no one sees you? Let's see how to add an additional skill check whether players get caught or not committing crime, and apply actions accordingly.

## Target Method

Stealing in Elin already has a skill check, which tests player's DEX + pickpocket skill against the witnesses' DEX, line of sight, and  the loot rarity:
```cs
if (owner.pos.TryWitnessCrime(owner, chara, 4, delegate(Chara c) {
    int num = ((!c.CanSee(owner)) ? 30 : 0);
    int num2 = c.PER * 250 / 100;
    if (target.isThing && (target.Thing.isEquipped || 
                           target.IsRangedWeapon || target.IsThrownWeapon)) {
        num2 *= 2;
        if (target.rarity >= Rarity.Legendary) {
            num2 *= 2;
        }
        if (target.rarity >= Rarity.Artifact) {
            num2 *= 2;
        }
    }
    if (c.IsUnique) {
        num2 *= 2;
    }
    return EClass.rnd(num2) > owner.Evalue(281) + owner.DEX + num;
})) {
    p.Cancel();
}
```

However, for other crime actions like digging & mining(**dwarfing**) NPC owned property, players get a default check with `TryWitnessCrime` which is a flat `10%` chance.
```cs
p.onProgress = delegate {
    SourceMaterial.Row row = (pos.cell.HasBridge ? pos.cell.matBridge : pos.cell.matFloor);
    owner.PlaySound(row.GetSoundImpact());
    row.PlayHitEffect(pos);
    row.AddBlood(pos);
    owner.elements.ModExp(230, 5);
    owner.renderer.NextFrame();
    if (EClass._zone.IsCrime(owner, this)) { // [!code focus]
        owner.pos.TryWitnessCrime(owner); // [!code focus]
    } // [!code focus]
};
```

Here's the target method to patch for both classes:
```cs{5}
internal static IEnumerable<MethodInfo> TargetMethods() => [
    AccessTools.Method(
        AccessTools.FirstInner(typeof(TaskDig), t => t.Name.Contains("DisplayClass18_0")), 
        "<OnCreateProgress>b__1"),
    AccessTools.Method(
        AccessTools.FirstInner(typeof(TaskMine), t => t.Name.Contains("DisplayClass22_0")), 
        "<OnCreateProgress>b__1"),
];
```

Wonder why are the methodinfos like this?
<LinkCard t="Patching Delegate" u="https://elin-modding-resources.github.io/Elin.Docs/articles/4_Patching/patch_delegate#delegate"/>

## C#

What we are trying to do here, is adding an additional custom skill check to the `TryWitnessCrime` call, and reduce player's karma if they are caught - because in [pt.1](./example_karma_on_caught_pt1) we removed the unconditional karma loss.

In theory we are expecting this:
```cs
if (EClass._zone.IsCrime(owner, this)) {
    var caught = owner.pos.TryWitnessCrime(owner, funcWitness: ourCustomCheck);
    if (caught) {
        EClass.player.ModKarma(-1);
    }
} 
```

## IL with C#

Take a look at this code snippet's IL instructions(truncated for brevity):
```cs
// owner.pos.TryWitnessCrime(<>4__this.owner);
ldfld Point Card::pos
ldfld Chara AIAct::owner
ldnull
ldc.i4.4
ldnull
callvirt bool Point::TryWitnessCrime(Chara, Chara, int32, Func<Chara, bool>)
pop
```

That's quite a bit of IL instructions, let's analyze this backwards, starting from bottom:
+ `pop`, it removes the value from stack top, which is the return value of `TryWitnessCrime`, discarded.
+ `callvirt`, the mthod call of `Point.TryWitnessCrime`.
+ `ldnull`, parameters are pushed from left to right, so this is the rightmost parameter of `Func<Chara, bool>`, the custom skill predicate. `null` by default.
+ `ldc.i4.4`, pushes an `int 4` onto the stack, which is the 3rd parameter `radius`, `4` by default.
+ `ldnull`, 2nd parameter `Chara target`, which is `null` by default.
+ `ldfld Chara ::owner`, 1st parameter, the `Chara owner`, which is the `AIAct::owner`.
+ `ldfld Point ::pos`, the hidden `this` parameter because `TryWitnessCrime` is a class bound method of `Point`.

This is equivalent of:
```cs
bool _ = pos.TryWitnessCrime(owner, null, 4, null);
```

## Solution

The simple solution would be replacing the method call of `Point::TryWitnessCrime` with our own method call, so it changes to:
```cs
ldfld Point Card::pos
ldfld Chara AIAct::owner
ldnull
ldc.i4.4
ldnull
call bool TryWitnessCustomCrime(Point, Chara, Chara, int32, Func)
pop
```

Notice the difference in the method signatures, the hidden `this Point` instance becomes the 1st parameter, because our own `TryWitnessCustomCrime` method is static and not class bound, which does not require a class instance to call. But we also cannot leave the `this Point` instance on the stack, so we take it in as 1st parameter to maintain the stack balance.

Because the next `pop` instruction is expecting a return value on the stack after the `call`, so our own `TryWitnessCustomCrime` method will also return a `bool` value, even if it's discarded, to maintain the stack balance.

## Implement

A basic **`Transpiler`** patch, in an annotated patch class, note that we don't use `[HarmonyPatch]` attribute here because we already used `TargetMethods()` to define the method info.
```cs
internal static IEnumerable<CodeInstruction> Transpiler(
    IEnumerable<CodeInstruction> instructions)
{
    return new CodeMatcher(instructions)
        .InstructionEnumeration();
}
```

### Match

We use `MatchEnd` to set the IL cursor at the line `callvirt Point::TryWitnessCrime`:
```cs
return new CodeMatcher(instructions)
    .MatchEndForward( // [!code focus]
        new CodeMatch(OpCodes.Callvirt, AccessTools.Method( // [!code focus]
            typeof(Point), // [!code focus]
            nameof(Point.TryWitnessCrime)))) // [!code focus]
    .InstructionEnumeration();
```

### Replace Call

Declare our own custom method, that adds a basic check of player's mining skill against witness's perception and line of sight status:
```cs
internal static bool TryWitnessCustomCrime(
    Point pos, 
    Chara owner, 
    Chara? target, 
    int radius, 
    Func<Chara, bool> funcWitness)
{
    var caught = pos.TryWitnessCrime(owner, funcWitness: w => {
        var los = w.CanSee(owner) ? 0.5f : 0f;
        var perception = w.PER / (2f - los);
        return EClass.rnd((int)perception) > owner.Evalue("mining");
    });
    if (caught) {
        EClass.player.ModKarma(-1);
    }
}
```

After matching, we use `SetInstruction` to change this IL line to our method call:
```cs
return new CodeMatcher(instructions)
    .MatchEndForward(
        new CodeMatch(OpCodes.Callvirt, AccessTools.Method(
            typeof(Point),
            nameof(Point.TryWitnessCrime))))
    .SetInstruction( // [!code focus]
        Transpilers.EmitDelegate(TryWitnessCustomCrime)) // [!code focus]
    .InstructionEnumeration();
```

## Voilà

The complete patch:
```cs
// in a patch class
internal static bool TryWitnessCustomCrime(Point pos, Chara owner, Chara? target, int radius, Func<Chara, bool> funcWitness)
{
    var caught = pos.TryWitnessCrime(owner, funcWitness: w => {
        var los = w.CanSee(owner) ? 0.5f : 0f;
        var perception = w.PER / (2f - los);
        return EClass.rnd((int)perception) > owner.Evalue("mining");
    });
    if (caught) {
        EClass.player.ModKarma(-1);
    }
}

internal static IEnumerable<MethodInfo> TargetMethods() => [
    AccessTools.Method(
        AccessTools.FirstInner(typeof(TaskDig), t => t.Name.Contains("DisplayClass18_0")), 
        "<OnCreateProgress>b__1"),
    AccessTools.Method(
        AccessTools.FirstInner(typeof(TaskMine), t => t.Name.Contains("DisplayClass22_0")), 
        "<OnCreateProgress>b__1"),
];

internal static IEnumerable<CodeInstruction> Transpiler(IEnumerable<CodeInstruction> instructions)
{
    return new CodeMatcher(instructions)
    .MatchEndForward(
        new CodeMatch(OpCodes.Callvirt, AccessTools.Method(
            typeof(Point),
            nameof(Point.TryWitnessCrime))))
    .SetInstruction(
        Transpilers.EmitDelegate(TryWitnessCustomCrime))
    .InstructionEnumeration();
}
```

That's it! You have added an additional skill check when players dig and mine illegal properties and can determine whether or not they should get caught and lose karma.