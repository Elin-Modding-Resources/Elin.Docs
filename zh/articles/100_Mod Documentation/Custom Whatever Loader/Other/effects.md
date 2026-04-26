---
title: 自定义特效
date: 2025/8/21 01:00
hide: true
---

## 添加自定义特效

虽然 Elin 包含了一系列可与 `PlayEffect` 或 `Effect.Get` 一起使用的 [预构建特效](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-effects-md)，但您也可以轻松添加自己的特效。

## 纹理设置

您的自定义特效纹理必须满足以下要求：

1. **格式**：图像必须是 **水平图集**，包含所有动画帧并排成一行。
2. **帧尺寸**：图集中的每帧必须是 **正方形**（例如，32x32、64x64、128x128 等）。
3. **位置**：将纹理直接放置在 **Texture** 文件夹内。
4. **效果 ID**：**文件名**（不带扩展名）将用作您特效的独特 ID。

例如，要创建一个名为 `magic_burst` 的特效，您需要创建一个名为 `magic_burst.png` 的文件，并将其放置在 `Texture` 文件夹中。然后，您可以通过调用 `PlayEffect("magic_burst")` 在游戏中播放它，或者使用 `Effect.Get("magic_burst")` 进行自定义。

## 热加载测试

在游戏运行时，您可以修改特效文件并使用控制台命令 `cwl.data.clear_effect_cache` 来清空特效缓存进行热加载测试。

## 修改特效模板

在代码中您可以修改您的自定义特效模板使后续生成的所有该特效都应用改动:

::: code-group

```cs [引用CWL]
using Cwl.Helper.Unity;

var myEffectTemplate = EffectHelper.GetEffectTemplate("magic_burst");
```

```cs [不引用CWL]
using UnityEngine;

var manager = Effect.manager;
if (manager.effects.map is null) {
    var rod = Effect.Get("rod");
    Object.Destroy(rod);
}

var myEffectTemplate = manager.effects.map.GetValueOrDefault(id);
```

:::