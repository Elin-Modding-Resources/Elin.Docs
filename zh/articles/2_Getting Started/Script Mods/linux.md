---
title: Bulding Mods on Linux
author: hi117
description: Instructions for building mods on Linux
date: 2025/09/04 22:02
tags: Guide/VSCode/C#
---

# Building Mods on Linux

::: warning BepInEx
The game runs on linux via Proton layer. To enable BepInEx modding, you must add the following launch args to Elin in steam or configuring the global DLL override prefix:

```
WINEDLLOVERRIDES="winhttp=n,b" %command%
```
:::

Linux development is very straightforward actually. First you will want the dotnet Linux packages published by Microsoft. Using open source Mono packages for building will
result in unexpected behavior or stuff breaking entirely. On ArchLinux the package required is `extra/dotnet-sdk`.

From there, code your mod as you would on Windows. The only thing to watch out for is that most .csproj files will need to be modified since the path separator for
Linux is `/` not `\` and locations will be different.

To build your mod when you are ready, use `dotnet build`. Your files will be available in the `obj/debug` directory of your project's root directory. From there follow
the instructions on creating a [local mod](../basic_mod.md) to make your mod available to Elin.