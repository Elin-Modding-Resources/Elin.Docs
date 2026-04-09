---
title: Animated Sprites
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
interval = 0.066
scale = 100
```

This defines an animation with 6 frames at a 66 ms interval.

## Variation

You can use [Variations](./variation) with animated sprites for automatic switching.