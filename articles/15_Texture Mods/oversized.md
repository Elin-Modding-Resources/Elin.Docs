---
title: Over 128x128 Canvas
author: DK
description: Tips for creating sprites larger than 128x128
date: 2026/4/11 13:00
tags: Texture/Variation
---

# I Need More Space

Default canvas size of 128x128 may not satisfy your drawing needs. When using a larger canvas, make sure it's center aligned (pivot at center):

|**128x128**|**256*256**|
|-|-|
|![](./assets/128c.png)|![](./assets/256c.png)|

For your characters and items to display correctly as icons and avatars, modify `pivotX` and `scaleIcon` accordingly in the [pref file](./pref).

> 256 Art by Veila