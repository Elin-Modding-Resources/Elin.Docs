---
title: Transpiler Walkthrough
author: DK
desc: Let's talk about transpilers.
date: 2024/11/27 01:00
tags: Guide/Transpiler
---

# Harmony Transpiler

Before reading ahead, this article assumes you have some basic knowledge of patching:

<LinkCard t="Harmony Patching" u="https://harmony.pardeike.net/articles/patching.html"/>

## What is Transpiler

**`Transpiler`** is a powerful patch type that allows you to alter and modify method IL instructions. If you don't know what that means, think it as the actual source code of any method that runs in .NET environment, akin to assembly of natively compiled applications.

When you build your plugin, it gets compiled into IL instructions instead of C# that you wrote it with. When your plugin executes, the IL instructions are then transpiled by .NET runtime to native assembly that can be executed by the CPU.

This is where **`Transpiler`** applies the patch, it manipulates the IL instructions before they are transpiled, allowing you to completely alter the behaviour of a method.

**`Transpiler`** patches happen when you call `Harmony.PatchAll()`. 

## But...why?

Sometimes you may need to modify a method's behaviour that happens in the middle of the method body, and a conventional **`Prefix`**/**`Postfix`** won't be able to achieve that. Or there's no method at all, just a line of code.

Some workarounds include but not limited to:
+ A skipping **`Prefix`** that completely rewrite the method
+ A **`Prefix`** to setup a state and another **`Prefix`** for the method invoked in the middle to determine "code executes here"
+ A **`Postfix`** that rewrite part of the method

Regardless, workarounds may get the job done, but you want it done right.

## Patch

When we declare a **`Transpiler`** patch, it's mostly the same as other patches, except that our patch method needs to take `IEnumerable<CodeInstruction>` as argument for the stream of IL instructions, and return the `IEnumerable<CodeInstruction>` too.
```cs
// in a patch class
[HarmonyTranspiler]
[HarmonyPatch(typeof(CertainClass), nameof(CertainClass.CertainMethod))]
internal static IEnumerable<CodeInstruction> OnCertainMethodIl(
    IEnumerable<CodeInstruction> instructions)
{
    // do nothing, just log the instructions
    instructions.Do(Debug.Log);
    // return the same instructions
    return instructions;
}
```

You can also name it simply as `Transpiler()` and omit the attribute `[HarmonyTranspiler]`.

## Calling Convention

IL instructions use the **stack** to store local variables, and there's no register like assembly. 

When calling a method, the arguments are pushed onto the stack from left to right in order. For class methods(that are not static and are bound to the instance), a hidden **`this`** class instance will be passed as the 1st argument, extending index of the rest of arguments by `1`. After calling a method, all arguments will be popped and the return value(if any), will be left on the stack.

## Stack Balance

A common mistake people make is not keeping the stack balanced, even if the code logic seems correct, and this will result confusing IL exceptions thrown by Harmony.

For example, you replaced a stack-manipulating instruction with an unconditional branch to the end of the method, which effectively skips the entire execution. Harmony does a single pass test for stack balance before it transpiles, and the line we replaced will cause the instruction region that we branched over to unbalance the stack - even if these instructions will never be executed. 

## Code Matcher

`CodeMatcher` is a useful utility class for manipulating IL instructions during a transpiler patch, [read it here](./codematcher).

## Code Examples

I'll be updating some random transpiler examples from time to time, or feel free to check out my repository, all of my mods make use of transpilers.

<LinkCard t="gottyduke/Elin.Plugins" u="https://github.com/gottyduke/Elin.Plugins"/>
