---
title: Converter
date: 2025/2/27 01:00
hide: true
---

# `CustomConverter`

[Namespace: `Cwl.API.Custom;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/API/Custom/CustomConverter.cs)

Custom API for converting items akin to brewery barrels.

## Custom Trait

Instead of using `CustomConverter` in your source sheet's trait cell, you may define a custom trait that derives from `TraitBrewery` and receive `_OnProduce` event raised by CWL for each product generated.  

```cs
namespace WhateverYourNamespaceIs;

// corresponds to MyCustomThingy in source sheet
internal class TraitMyCustomThingy : TraitBrewery
{
    private void _OnProduce(Thing ingredient, Thing product)
    {
        // do stuff to the product
    }
}
```

Optionally, you can also override `CanChildDecay` and `OnChildDecay`, which will suppress CWL's conversion check and conversion apply accordingly.