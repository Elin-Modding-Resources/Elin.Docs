---
title: Customization
author: DK
description: Details of .pref file to customize your sprite.
date: 2026/4/9 9:00
tags: Texture/Pref
---

# Pref File

Sometimes the default rendering settings for your sprites may not be ideal. Customize them by creating a `.pref` file with the same filename as your sprite.

Open it with Notepad or any text editor; it uses INI format.

```ini
x = 0
y = 0
z = 0
pivotX = 0
pivotY = 0
shadow = 0
shadowX = 0
shadowY = 0
height = 0
scaleIcon = -40
liquidMod = 0
hatY = 0
```

+ `x` x position offset
+ `y` y position offset
+ `z` z position offset
+ `pivotX` pivot.x offset
+ `pivotY` pivot.y offset
+ `shadow` ShadowData id
+ `shadowX` shadow x position offset
+ `shadowY` shadow y position offset
+ `height` tile height modifier
+ `scaleIcon` icon sprite size scaling
+ `liquidMod` liquid level modifier on the tile; can be negative
+ `hatY` hat renderer y position offset