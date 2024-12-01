---
title: Custom Configurations
author: Discoded
desc: Creating Custom Configs
date: 2024/12/1 01:00
tags: Guide/C#
---

## Overview

Mods will often require user input in order to change its behavior. 

<LinkCard t="Based on" u="https://docs.bepinex.dev/v5.4.11/articles/dev_guide/plugin_tutorial/3_configuration.html"/>

## BaseUnityPlugin

Using the library `BepInEx.Configuration`,
simply create a public variable:

`public static ConfigEntry<bool> configName;`

Then on your Start() function:

```c#
configTestName = Config.Bind(
    "General.Toggles", // Section where the config will show
    "configName", // The name that will show on the .cfg
    true,  // Default value
    "Config Description");
                                    
```
In this example, we use a `bool` but the config can be an `int` or even a `string`. You also aren't limited to a single variable, feel free to have multiple configuration variables.

Full:
```c#
using BepInEx.Configuration;

[BepInPlugin("username.test_mod", "testMod", "1.0.0.0")]
public class ExamplePlugin : BaseUnityPlugin
{
    public static ConfigEntry<bool> configTestName;
    private static Harmony harmony;

    private void Start()
    {
        configTestName = Config.Bind("General.Toggles",
                                    "configName",
                                    true,
                                    "Config Description");
        harmony = new Harmony("PatchName");
        harmony.PatchAll();
    }

}
```

## Using the config variable

Under your Patch class, the config can be accessed using `ExamplePlugin.configTestName.Value`

```c#
[HarmonyPrefix, HarmonyPatch(typeof(ActKick), nameof(ActKick.CanPerform), new Type[] { })]
public static bool CanPerform(ActKick __instance)
{
    bool theVariable = ExamplePlugin.configTestName.Value;
    if (theVariable) {
        return false;
    }
    return true;
}
```

## Config file location

Direct your users to `Steam\steamapps\common\Elin\BepInEx\config` of which `username.test_mod.cfg` should automatically generate upon first installing the mod and running the game.

`username.test_mod.cfg`:
```TOML
## Settings file was created by plugin test_mod v1.0.0
## Plugin GUID: username.test_mod

[General.Toggles]

## Config Description
# Setting type: Boolean
# Default value: true
configName = true
```
