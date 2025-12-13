---
title: Drama Expansion
date: 2025/5/15 01:00
hide: true
---

## Custom Expansion Actions

You can register action handlers with CWL for custom drama actions (like how CWL handles `invoke*`).

```cs
using Cwl.API.Attributes;

[CwlDramaAction("s*")] // register aliases
[CwlDramaAction("somethingy")]
internal static bool ProcessSomethingyAction(DramaManager dm, Dictionary<string, string> line)
{
    // your actions 
    dm.lastTalk.AddChoice(...);
    return true; // handled

    return false; // not handled, pass through 
}
```

## Custom Expansion Methods

Create a class that inherits from `DramaOutcome`. CWL will automatically register any valid expansion methods in this class.

Expansion methods must:
+ be `static`
+ return `bool`
+ take these parameters: `DramaManager dm, Dictionary<string, string> line, params string[] parameters`

```cs
internal class MyDramaExpansion : DramaOutcome
{
    internal static bool honk_honk(DramaManager dm, Dictionary<string, string> line, params string[] parameters)
    {
        return true;
    }
}
```

The return value is to determine whether to execute the `jump` cell (if provided) after invoking this method.

### Parameters

In your expansion method code, the parameters will be passed as `string[] parameters`, and you can perform parameter assertions using C# 8 syntax or manually check them:

```cs
internal static bool honk_honk(DramaManager dm, Dictionary<string, string> line, params string[] parameters)
{
    // assert must be 2 parameters
    if (parameters is not [{ } soundId, { } arg2]) {
        return false;
    }

    pc.PlaySound(soundId);
    // use arg2

    return true;
}
```

### Exception Handling

In your expansion method code, any errors that should prevent further execution (such as invalid parameters, invalid IDs, etc.) can be thrown as exceptions, CWL will default the return value to `false` and prompt a drama warning in the game.

### Reference CWL

If you reference CWL's assembly in your project, you can then derive your class directly from CWL's `DramaExpansion`:

```cs
internal class MyDramaExpansion : DramaExpansion
{
}
```

Which you gain access to better parameter handling:

```cs
internal static bool honk_honk(DramaManager dm, Dictionary<string, string> line, params string[] parameters)
{
    parameters.Requires(out var soundId, out var arg2); // up to arg4
    dm.RequiresActor(out var actor);

    actor.PlaySound(soundId);

    return true;
}
```

You can also assert for optional parameters:

```cs
internal static bool honk_honk(DramaManager dm, Dictionary<string, string> line, params string[] parameters)
{
    parameters.RequiresAtLeast(1);
    parameters.RequiresOpt(out var soundId, out var arg2);
    dm.RequiresActor(out var actor);

    if (soundId.Provided) {
        actor.PlaySound(soundId.Value);
    }

    var arg2WithFallback = arg2.Get("fallbackValue");

    return true;
}
```

Since parameters are `string`, you can parse them like so:

```cs
var intParam = arg1.AsInt(0); // fallback 0
var floatParam = arg1.AsFloat(1f); // fallback 1f
var boolParam = arg1.AsBool(true); // fallback true
```

And you can use CWL style value expressions as parameters:

```cs
var isGreater = Compare(100, argExpr.Get(">=99"));
var toAdd = ArithmeticModOrSet(originalValue, argExpr.Get("+50")) - originalValue;

if (isGreater) {
    ModOriginal(toAdd);
}
```
