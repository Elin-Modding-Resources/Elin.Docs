---
title: Common Patching
author: DK
description: Common patching practices
date: 2025/9/23 17:00
tags: Guide/Patch/C#
---

# Harmony Patch

... is very well documented here:

<LinkCard t="Harmony Patching" u="https://harmony.pardeike.net/articles/patching.html"/>

But how do you actually use it?

> note: the code here may be personal flavored.

## Patch Class

First, you'll need to define a patch class to hold the patches:
```cs
[HarmonyPatch]
internal class MakeTwoEggsPatch
{
    internal static void DropTwoEggsInstead()
    {
    }
}
```

The `[HarmonyPatch]` attribute makes Harmony able to find this class during `*PatchAll()`. If you omit this attribute, you'll need to use `CreateAndPatchAll(typeof(MakeTwoEggsPatch))` manually.

## Target Method

Once you find the method you want to patch, you may use another `[HarmonyPatch]` to set this information. In this example, we want to patch `Card.MakeEgg()` to always drop 2 eggs instead of 1.

Target method:
```cs
class Card
{
    Thing MakeEgg(bool effect = true, 
                  int num = 1, 
                  bool addToZone = true, 
                  int fertChance = 20, 
                  BlessedState? state = null);
}
```

Our patch:
```cs
[HarmonyPatch]
internal class MakeTwoEggsPatch
{
    [HarmonyPatch(typeof(Card), nameof(Card.MakeEgg))]
    internal static void DropTwoEggsInstead()
    {
    }
}
```

We pass the method declaring type, which is `typeof(Card)`, and method name, which is `nameof(Card.MakeEgg)` to another `[HarmonyPatch]` attribute on our patch method here. Our patch method should be `static`. 

::: tip
Note that the usage of `nameof(Card.MakeEgg)` is optional as you can also use literal string `"MakeEgg"` directly, however, using `nameof()` ensures compile time correctness - if the target method changes name, then you won't be able to compile and know immediately.  

`nameof()` also requires the target method's access level to be public.
:::

## Patch Type

There are two types of patching here:

### Prefix Patch

A **Prefix** patch runs **before** the original method is executed.  
* Altering the parameters passed into the original method.
* Skipping the original method entirely by returning `false`.
* Setting a custom return value by the original method.

You can create a **Prefix** patch by defining a method with the `[HarmonyPrefix]` attribute. You can access the original method's arguments by including parameters with matching names and exact types or derived types in your prefix method.

Here's an example where we change the parameter `int num` to `2` instead of `1`.

```cs
[HarmonyPatch]
internal class MakeTwoEggsPatch
{
    [HarmonyPrefix]
    [HarmonyPatch(typeof(Card), nameof(Card.MakeEgg))]
    internal static void DropTwoEggsInstead(ref int num)
    {
        num = 2;   
    }
}
```

In this example, the `ref int num` parameter gices us the original parameter `int num`. Since we are **assigning** a new value for it, we need to use `ref` to pass it as reference.

-----

Another type of **Prefix** patch is skipping the original method execution. Let's return a tax bill instead of eggs:

```cs
[HarmonyPatch]
internal class MakeTwoEggsPatch
{
    [HarmonyPrefix]
    [HarmonyPatch(typeof(Card), nameof(Card.MakeEgg))]
    internal static bool DropTaxBillInstead(ref Thing __result)
    {
        __result = ThingGen.Create("bill_tax");
        return false;
    }
}
```

By returning `false`, we are skipping the original method. You can also return `true` to resume.

### Postfix Patch

A **Postfix** patch runs **after** the original method has executed.  
* Reading or modifying the return value of the original method.
* Running code after the original method's logic has completed.
* Accessing the original parameters after the method has finished.

You create a **Postfix** patch using the `[HarmonyPostfix]` attribute. To access the return value, you include a parameter named `__result` with the same type as the original method's return value.

Here's an example of a postfix patch that sets the egg created number to `2`.

```cs
[HarmonyPatch]
internal class MakeTwoEggsPatch
{
    [HarmonyPostfix]
    [HarmonyPatch(typeof(Card), nameof(Card.MakeEgg))]
    internal static void DropTwoEggsInstead(Thing __result)
    {
        __result.SetNum(2);
    }
}
```

In this example, `Thing __result` gives us access to the return value of the original method, which is the egg. Since we are not **assigning** a new value to it, and `Thing` is a `class` which is passed by reference, we can safely access and modifies its members without needing to use `ref`.

-----

To achieve the same effect of `DropTaxBillInstead` with a **Postfix**, we can also do it like this:
```cs
[HarmonyPatch]
internal class MakeTwoEggsPatch
{
    [HarmonyPostfix]
    [HarmonyPatch(typeof(Card), nameof(Card.MakeEgg))]
    internal static void DropTaxBillInstead(ref Thing __result)
    {
        __result = ThingGen.Create("bill_tax");
    }
}
```

Because we are **assigning** a new value to the original value, we use `ref` here, this is regardless of it being a reference type or not.

## Ambigous Patch

Methods can have overloads, which means by using only the type and method name may not work for some methods that have overloads.  

For example, `Card.MakeFoodFrom(string)` and `Card.MakeFoodFrom(Card)` are two overloads that have the same declaring type and method name. In this case, when we define the `[HarmonyPatch]` attribute, we need to pass the parameter types array to distinguish them:

```cs
[HarmonyPatch]
internal class MakeTwoEggsPatch
{
    [HarmonyPostfix]
    [HarmonyPatch(typeof(Card), nameof(Card.MakeFoodFrom), typeof(string))]
    internal static void MakeFoodFromString(string _id)
    {
        // do something
    }
}
```