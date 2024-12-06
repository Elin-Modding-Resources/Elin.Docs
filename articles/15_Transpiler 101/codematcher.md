---
title: Code Matcher and You
author: DK
desc: Basic usage of CodeMatcher to make your transpiling life easier.
date: 2024/11/27 01:01
tags: Guide/Transpiler
---

# CodeMatcher

To make a **`Transpiler`** patch, first we need to find where to patch inside the IL instructions. Since it's an `IEnumerable<CodeInstruction>`, we can simply iterate it and compare the IL instruction to our needs. Read about the basic usage here:

<LinkCard t="HarmonyX, CodeMatcher" u="https://github.com/BepInEx/HarmonyX/wiki/Transpiler-helpers#codematcher"/>

## Match Direction

`CodeMatcher` offers two basic match directions, `Forward` and `Backwards`, as the name suggests, they match accordingly **from current position**.

It's important to note that current position starts at `0`(at the beginning), and will be at the last matched position. If you start your code match with a `MatchBackwards()`, you won't match anything - because there's nothing before position `0`. You'll need to use `End()` to set the position to the end of the IL instructions.

## Start/End

You can use `MatchStart()` or `MatchEnd()` to set the cursor position when a match qualifies. `MatchStart()` will set the cursor to the beginning of the match group, `MatchEnd()` will be at the end.
```cs{1,4}
ldc.i4.5 <<- MatchStart()
div
sub
ldc.i4.1 <<- MatchEnd()
```

You may also use `Advance(n)` to move the cursor position with an offset.

## CodeMatch

A series of `CodeMatch` will describe the IL instructions we want to match, you can refer to the usage linked above. Here's a simple rundown:
```cs
// match opcode only
new CodeMatch(OpCodes.Call);
// match opcode and operand
new CodeMatch(OpCodes.Call, methodInfo);
// match using predicate
new CodeMatch(o => o.opcode == OpCodes.Call && 
                   o.operand.ToString().Contains(methodName));
```

## Instruction

Your custom IL instructions are constructed as `CodeInstruction`:
```cs
new CodeInstruction(OpCodes.Call, myMethodInfo);
```

## Branching

If you want to setup IL branches, including but not limited to `Br`, `Brfalse`, `Brtrue`, you'll need to pass in `ILGenerator` to the `CodeMatcher` constructor. This argument is provided by Harmony:
```cs
internal static IEnumerable<CodeInstruction> Transpiler(
    IEnumerable<CodeInstruction> instructions, ILGenerator generator)
{
    return new CodeMatcher(instructions, generator)
        .InstructionEnumeration();
}
```

::: warning NullRefException
If you do not pass in the `ILGenerator` provided by Harmony to the `CodeMatcher`, any label/branch related methods will throw `NullRefException`.
:::

### Create Label

To create a label at the current cursor position:
```cs
return new CodeMatcher(instructions, generator)
    .CreateLabel(out var label) // [!code focus]
    .InstructionEnumeration();
```

### Consume Label

Depending on the situation, you may need to match the label related instructions first to setup the label, then match the target instructions to consume the label.
```cs
return new CodeMatcher(instructions, generator)
    .MatchStartForward( // [!code focus]
        new CodeMatch(OpCodes.Call, AccessTools.PropertyGetter(
            typeof(PCC),
            nameof(PCC.pccm))),
        new CodeMatch(OpCodes.Ldfld, AccessTools.Field(
            typeof(PCCManager),
            nameof(PCCManager.pixelize))),
        new CodeMatch(OpCodes.Brtrue))
    .CreateLabel(out var label) // [!code focus]
    .InsertAndAdvance( // [!code focus]
        new CodeInstruction(OpCodes.Ldarg_0),
        Transpilers.EmitDelegate(RebuildSprites),
        new CodeInstruction(OpCodes.Brfalse, label), // [!code focus]
        new CodeInstruction(OpCodes.Ret)) // [!code focus]
    .InstructionEnumeration();
```

### Match a Branch

Sometimes you see decompiled IL instructions like these:
```cs
brtrue.s
brfalse.s
br.s
```

These branching instructions are shown in short form. However, when you use Harmony Transpilers, they're replace them with `brtrue`, `brfalse`, and `br` at runtime. So if you cannot qualify a match for a branch instruction, replace your `CodeMatch` with the long form instead.
