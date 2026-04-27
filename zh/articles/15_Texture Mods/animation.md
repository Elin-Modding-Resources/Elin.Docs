---
title: Sprite Animation
author: DK
description: How to make animated sprites for character and items.
date: 2026/4/9 9:00
tags: Texture/Animation
---

# Preparation

To convert your still image into an animated sprite, you'll need to provide a horizontal sprite sheet and an `.ini` file with the same filename as your sprite.

![](./assets/boxchicken.png)

## INI

```ini
frame = 6
time = 0.066
scale = 100
```

This defines an animation with 6 frames at a 66 ms interval.

## Example

<LinkCard t="庭院之主钢管舞" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3711895231" i="https://images.steamusercontent.com/ugc/13374333021323970829/883FA814CD2CDD0E1267B0FB29F2F058B543009F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" />

<LinkCard t="Lost Case Monster Girl Takeover" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3609895215" i="https://images.steamusercontent.com/ugc/13866943819130003260/AF709B61B8CC0DB914A09239906A08359D2B0316/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" />

## Variation

You can use [variations](./variation) with animated sprites for automatic switching.