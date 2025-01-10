---
title: Trait Transformer
date: 2025/1/3 01:00
hide: true
---

# `TraitTransformer`

[命名空间: `Cwl.API.Processors;`](https://github.com/gottyduke/Elin.Plugins/tree/master/CustomWhateverLoader/API/Processors)

游戏创建一个 `Trait` 时触发的事件。您可以使用此事件来改变 `Trait` 或检查某个 `Trait` 是否已实例化。

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

您可以将 `traitName` 修改为目标 `Trait` 类的类型名称。它只需要是类名称，CWL 将会自动限定全名。

## 注册

```cs:no-line-numbers
TraitTransformer.Add(MyTraitTransformer);
```