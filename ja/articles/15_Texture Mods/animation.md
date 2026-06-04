---
title: Sprite Animation
author: DK
description: How to make animated sprites for character and items.
date: 2026/4/9 9:00
tags: Texture/Animation
---

# Preparation

Both characters and items can use animated sprites.

To convert your still image into an animated sprite, you'll need to provide a horizontal sprite sheet and an `.ini` file.

The filename of the .ini file, the filename of the horizontal sprite sheet, and the id column in the mod-loading Excel sheet must all match.

![](./assets/boxchicken.png)

## INI

```ini
frame = 6
time = 0.066
scale = 100
```

This defines an animation with 6 frames at a 66 ms interval.

## Example

<LinkCard t="Keeper of Garden Pole Dance" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3711895231" i="/pole.gif" />

<LinkCard t="Lost Case Monster Girl Takeover" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3609895215" i="https://images.steamusercontent.com/ugc/13866943819130003260/AF709B61B8CC0DB914A09239906A08359D2B0316/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" />

## Variation

You can use [variations](./variation) with animated sprites for automatic switching.