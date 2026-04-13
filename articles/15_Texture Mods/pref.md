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
shadowRX = 0
shadowRY = 0
shadowBX = 0
shadowBY = 0
shadowBRX = 0
shadowBRY = 0
height = 0
heightFix = 0
scaleIcon = -40
liquidMod = 0
liquidModMax = 0
hatY = 0
equipX = 0
equipY = 0
stackX = 0
```

You may omit any unused fields. `#` comments can also be used.

+ `x`, `y`, `z` position offset
+ `pivotX`,`pivotY` pivot offset, used on small sprites such as resident board avatar
+ `shadow` ShadowData id
+ `shadowX`, `shadowY` shadow position offset
+ `shadowRX`, `shadowRY` shadow reverse
+ `shadowBX`, `shadowBY` shadow back
+ `shadowBRX`, `shadowBRY` shadow back reverse
+ `height` tile height modifier
+ `heightFix` text component height offset (floating little widgets)
+ `scaleIcon` icon size scaling
+ `liquidMod` tile liquid level modifier; can be negative
+ `liquidModMax` tile liquid level max
+ `hatY` hat renderer y position offset
+ `equipX`, `equipY` held position offset 
+ `stackX` tile stacking x position offset

## Shadow Data ID

<!--@include: ./assets/shadow_data.md-->