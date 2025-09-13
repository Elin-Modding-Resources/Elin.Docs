---
title: Custom Effect
date: 2025/8/21 01:00
hide: true
---

## Adding Custom Effect

While Elin includes a list of [prebuilt effects](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-effects-md) that can be used with `PlayEffect` or `Effect.Get`, you can also easily add your own.

## Spritesheet Setup

Your custom effect spritesheet must meet the following requirements:

1. **Format**: The image must be a **horizontal spritesheet** containing all frames of the animation laid out in a single row.
2. **Frame Dimensions**: Each frame within the spritesheet must be a **perfect square** (e.g., 32x32, 64x64, 128x128 etc.).
3. **Location**: Place the spritesheet directly inside the **Texture** folder.
4. **Effect ID**: The **filename** (without the extension) will be used as the unique ID for your effect.

For example, to create an effect called `magic_burst`, you would create a file named `magic_burst.png` and place it in the `Texture` folder. You could then play it in-game by calling `PlayEffect("magic_burst")` or customize it with `Effect.Get("magic_burst")`.

## Hot Reload Testing

While the game is running, you can modify effect files and use the console command `cwl.data.clear_effect_cache` to clear the effect cache for hot reloading and applying any new changes.

## Modifying Effect Templates

In your code, you can modify your custom effect templates so that all subsequently generated instances of that effect will apply the changes:

::: code-group

```cs [Using CWL]
using Cwl.Helper.Unity;

var myEffectTemplate = EffectHelper.GetEffectTemplate("magic_burst");
```

```cs [No CWL]
using UnityEngine;

var manager = Effect.manager;
if (manager.effects.map is null) {
    var rod = Effect.Get("rod");
    Object.Destroy(rod);
}

var myEffectTemplate = manager.effects.map.GetValueOrDefault(id);
```

:::