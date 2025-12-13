---
title: Runtime Scripting with CWL
description: Runtime C# evaluation, compiling, and script state using CWL.
date: 2025/12/13 14:00
author: DK
tags: Guide/CWL/C#
---

::: warning
Requires CWL 1.21.0 and above.
:::

## Console

Useful for fixing bugs, running debug codes, or just having fun.

You can execute C# scripts directly from the console using the `cwl.cs.eval` command:
```cs
cwl.cs.eval EClass.pc.party.members
```

If the script returns a value, it will be printed to the console. Collections are automatically flattened for readability.

You can also execute more complex one-line scripts:
```cs
cwl.cs.eval var i = EClass.rnd(150) * 2; EClass.pc.AddElement("featMetal", i);
```

For multiline or larger scripts, you can import an external file using its **absolute path**:
```
cwl.cs.file D:\...\demo_script.cs
```

## Script States

Script states allow you to persist variables across multiple script executions.

To create and activate a script state, push it onto the state stack by name:
```
cwl.cs.state.push new_state
```

While a script state is active, all subsequent script executions can read and write shared variables through `Script`:
```cs
cwl.cs.eval Script["somethingy"] = 25; Script["flag"] = "test_flag";
cwl.cs.eval var num = (int)Script["somethingy"];
cwl.cs.eval var flag = (string)Script["flag"];
```

If no script state is active, each script execution is **isolated**, and the above commands will fail.

### Managing Script States

Pop the current script state from the stack (**without clearing its data**):
```
cwl.cs.state.pop
```

Clear a script state and remove it from the stack by name:
```
cwl.cs.state.remove new_state
```

Display the current script state stack:
```
cwl.cs.state
```

## Compiler

::: tip
For advanced scripting with full IDE support, beginners are strongly encouraged to follow the
[Script Mod Guide](../../../../2_Getting%20Started/Script%20Mods/script_mod).
:::

CWL provides an automatic script compiler that compiles loose C# files placed in a mod’s **`Script`** folder into an assembly and PDB.

This is ideal for mod authors who want to define custom types without implementing additional tooling.

Example:

```cs
namespace MyMod;

public class ReligionGeeGeeBon : Religion;

public class FeatGoodStuff : Feat
{
    internal void _OnApply(int add, ElementContainer eleOwner, bool hint)
    {
        eleOwner.SetFeat(FEAT.featMetal, add * 50);
    }
}
```

### C# Specification

+ Scripts automatically reference the entire game and all loaded mods.
+ Unused references are trimmed after compilation.
+ **C# 14** language features are supported.

### Script Events

You can define a `CwlScript` class to handle script load and unload events:
```cs
public class CwlScript
{
    internal static void CwlScriptLoad()
    {
        // Called when the script assembly is loaded
    }

    internal static void CwlScriptUnload()
    {
        // Called when the script assembly is unloaded
    }
}
```

These hooks are useful for initialization, registration, or cleanup logic tied to the script lifecycle.
