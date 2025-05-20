---
title: Drama Expansion
date: 2025/5/15 01:00
hide: true
---

## Custom Expansions

First, define a class derived from `DramaOutcome`. This will allow CWL to add all methods in this class that has valid expansion method signature.

Next, your drama expansion methods must use the signature: `static`, return `bool`, and accept three parameters: `DramaManager dm, Dictionary<string, string> line, params string[] parameters`.

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

If you add CWL's assembly reference to your project, you can then use:

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
    parameters.RequiresAtleast(1);
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

### Exception Handling

In your expansion method code, any errors that should prevent further execution (such as invalid parameters, invalid IDs, etc.) can be thrown as exceptions, CWL will default the return value to `false` and prompt a drama warning in the game.
