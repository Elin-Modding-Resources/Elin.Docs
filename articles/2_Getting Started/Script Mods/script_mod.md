---
title: Setup Script Mod Project
author: DK
description: How to setup a basic C# script project with Elin.
date: 2024/11/26 12:01
tags: Guide/Script
---

# Script Mods

Script mods are class libraries written in C# and loaded into game by BepInEx loader. To make a script mod, you'd need the following tools:

## Code Editor/IDE

+ [Visual Studio Code](https://code.visualstudio.com/)
+ [Visual Studio](https://visualstudio.microsoft.com/)
+ [JetBrain Rider(free now!)](https://www.jetbrains.com/rider/)

Pick your poison and make sure you have .NET development package installed for Visual Studio families.

## Decompiler

To modify game code, you'd need to know what to modify first. You'll want a .NET decompiler to browse the game source code. 

No, do not solely rely on your IDE's auto decompiling, use an actual decompiler from the following:
+ [ILSpy](https://github.com/icsharpcode/ILSpy/releases)
+ [dnSpyEx](https://github.com/dnSpyEx/dnSpy)
+ [dotPeek](https://www.jetbrains.com/decompiler/)

If you are using dnSpyEx, don't forget to turn off metadata tokens and RVA display, you won't need those info.

Simply open the `Elin/Elin_Data/Managed/Elin.dll` in the decompiler and load its dependencies, now you can freely browse game source code, search for constants, and analyze usages.

## C# Project

If you are already familiar with C# and bepinex modding/Unity, you can skip to [Debugging](./debugging).

<LinkCard t="Elin Plugin Template" u="https://github.com/gottyduke/Elin.Plugins/releases/tag/PluginTemplate"/>

## Basic Plugin

We are making a BepInEx plugin, the mod entry is as follows:

<<< ../assets/mod_entry.cs#plugin_snippet

Here we chose the same Guid as mod ID in `package.xml`. This needs to be a unique identifier for your mod, so make it very unique.

After building the project and launching the game, you should see the message in the log output, either via BepInEx console or `Player.log` at `%localappdata%low\Lafrontier\Elin\Player.log`.

::: details Enable BepInEx Console
Open the BepInEx config file at `Elin\BepInEx\config\BepInEx.cfg` and change the following:
```ini
[Logging.Console]

## Enables showing a console for log output.
# Setting type: Boolean
# Default value: false
Enabled = true
```
:::

## Script Events

You can use the following methods to execute your code:

+ `void Awake()`: Unity event, called immediately when the plugin is loaded. Most of the operations can be done here without any problem. 
+ `void OnStartCore()`: Elin event, called when **all** plugins are loaded. This happens after `Awake`. Use this if you have any codes that may depend on other plugins/data.
+ `void Start()` or `IEnumerator Start()`: Unity event, called after all data are loaded. This happens after `OnStartCore`. **Do not** load source sheets here and afterwards. 