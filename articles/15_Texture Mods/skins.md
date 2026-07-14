---
title: Custom Skins
author: DK
description: How to add custom skins
date: 2026/7/14 00:00
tags: Texture/Skin
---

# Skin Folder

Textures placed in the Skin folder can be used via in-game → resident board → **Change Skin**.

This **Change Skin** feature only changes a single NPC's texture, not an entire type of NPC texture.

+ **Location:** See the [Location section](#skin-folder-location) below
+ **Size:** 128×128 or 128×256
+ **Background:** Transparent
+ **File type:** png
+ **Filename:** skinname.png
  + skinname is the custom name you choose (the part of the filename before .png). There's no format requirement, but using English letters and numbers is recommended to prevent strange bugs.

You can use the [Snow Variation](./variation#Snow-Variation) and [Directional Sprites](./variation#Directional-Sprites) from the [Sprite Variations](./variation) feature together with the Skin folder. Using them together inside the Skin folder works as well.

## Location {#skin-folder-location}

You can store them locally:

+ **Location:** `%localappdata%low\Lafrontier\Elin\Custom\Skin`
+ **How to open:** In-game, press Esc → Tool → Open My Custom Folder → find the Skin folder

You can also use them as a mod:

+ **Location:** `<ElinGamePath>/Package/<ModName>/Skin`. This requires the necessary files of a [mod package](../2_Getting%20Started/basic_mod); see the [mod package](../2_Getting%20Started/basic_mod) page for details.

## Compatibility

If you use the Texture Expand mod / Provisional TextureExpand mod (hereafter "TE"):

+ For characters configured with TE, using the resident board's **Change Skin** feature may cause bugs
+ As an alternative, you can write your own TE rule. See the manual included with the TE mod for details