---
title: Trait Transformer
date: 2025/1/3 01:00
hide: true
---

# `TraitTransformer`

[Namespace: `Cwl.API.Processors;`](https://github.com/gottyduke/Elin.Plugins/tree/master/CustomWhateverLoader/API/Processors)

Event raised when game creates a `Trait`. You may use this event to mutate the trait.

## `TraitTransform`

```cs:no-line-numbers
delegate void TraitTransform(ref string traitName, Card traitOwner);
// ->
static void MyTraitTransformer(ref string traitName, Card traitOwner)
{
    if (traitName == nameof(TraitUniqueChara) && traitOwner.id == "swordkeeper") {
        traitName = nameof(TraitUltimateBossForm);
    }
}
```

You may mutate the `traitName` to the type name of target `Trait` class. It doesn't need to be qualified, CWL will qualify it for you.

## Register

```cs:no-line-numbers
TraitTransformer.Add(MyTraitTransformer);
```