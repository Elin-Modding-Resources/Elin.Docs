---
title: Widget Decorations
author: DK
description: How to add your own images as widget decorations
date: 2026/10/13 00:00
tags: Texture/Widget
---

# Deco Folder

PNG images in the Deco folder can be added to widgets (the windows and panels on the game screen) as decorations.

+ **Location:** See the [Location section](#deco-folder-location) below
+ **File type:** png
+ **Background:** Transparent recommended
+ **Size:** Any. The image starts at its original size, and you can resize it in game.
+ **Filename:** deconame.png
  + Use English letters and numbers. Don't rename the file once it's in use: widgets remember decorations by filename.

## How to Use

1. Right-click a widget → **Style** → **Edit deco**. Not every widget has a Style menu.
2. Left-click an empty spot → **Add deco** → pick your image. Your images are listed after the game's own decorations.
3. Drag a decoration to move it. Left-click it to change its color, size or rotation, or to remove it.
4. Right-click → **Quit editing** when you're done.

Images you add to the local Deco folder while the game is running show up the next time you open **Add deco**. Images from mods need a game restart.

## Location {#deco-folder-location}

You can store them locally:

+ **Location:** `%localappdata%low\Lafrontier\Elin\Custom\Deco`
+ **How to open:** In-game, press Esc → Tool → Open My Custom Folder → find the Deco folder

You can also use them as a mod, for example to share them on the Steam Workshop:

+ **Location:** `<ElinGamePath>/Package/<ModName>/Deco`. The mod also needs the usual [mod package](../2_Getting%20Started/basic_mod) files.

If a mod and your local folder both have an image with the same filename, the game uses the mod's image.

If an image goes missing (for example, you unsubscribed from the mod that provided it), the decoration shows one of the game's built-in images instead. Put the image back and restart the game to restore it.

::: tip
The Deco folder is only for widget decorations. Textures for map decorations added through [source sheets](../10_Source%20Sheets/tile) go in `Texture/Deco`.
:::
