---
title: Feat
date: 2025/1/3 01:00
hide: true
---

## Feat

A custom feat is kinda similiar, but your custom feat class must derive from **Feat**. 
```cs
internal class FeatMyExample: Feat
```

Since Elin hardcodes its feat effects in the big ol `Feat.Apply` non-virtual method, CWL offers you an event `OnApply` to apply your own feat effects when that happens, by defining an optional event handler `_OnApply` in the feat class:
```cs
internal class FeatMyExample : Feat
{
    internal void _OnApply(int add, ElementContainer eleOwner, bool hint) // [!code focus]
    { // [!code focus]
        // mod attributes, set potential, apply effects, etc // [!code focus]
    } // [!code focus]
}
```

This does not require your dll to reference CustomWhateverLoader.dll.

Custom feats may also have custom icons, by placing the texture within **Texture** folder, using the same alias as the file name, such as **featMyExample.png**. Then you'll need to override the `GetIcon` method to reroute the icon to your own:
```cs
internal class FeatMyExample : Feat
{
    public override Sprite GetIcon(string suffix = "") // [!code focus]
    { // [!code focus]
        return SpriteSheet.Get(source.alias); // [!code focus]
    } // [!code focus]
}
```

If the texture size is not 32x32, CWL will resize it for you.

With the tag **addEleOnLoad**, player will gain this feat automatically upon loading.
