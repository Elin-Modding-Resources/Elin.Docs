---
title: Feat 专长
date: 2025/1/3 01:00
hide: true
---

## 自定义专长

自定义专长类必须从 **Feat** 派生。 
```cs
internal class FeatMyExample: Feat
```

由于 Elin 将所有专长效果都写在 `Feat.Apply` 这个方法中，CWL 提供了一个事件 `OnApply`，通过在你的专长类中定义一个可选的事件处理 `_OnApply` 以便应用你自己的专长效果：
```cs
internal class FeatMyExample : Feat
{
    internal void _OnApply(int add, ElementContainer eleOwner, bool hint) // [!code focus]
    { // [!code focus]
        // 修改属性，设置潜力，应用效果等 // [!code focus]
    } // [!code focus]
}
```

这并不要求引用 CustomWhateverLoader.dll。

自定义专长还可以拥有自定义图标，您的图标需要放置在 **Texture** 文件夹中，使用与 **alias** 相同的文件名，例如 **featMyExample.png**。然后重写 `GetIcon` 方法，将图标重定向到该图标：
```cs
internal class FeatMyExample : Feat
{
    public override Sprite GetIcon(string suffix = "") // [!code focus]
    { // [!code focus]
        return SpriteSheet.Get(source.alias); // [!code focus]
    } // [!code focus]
}
```

如果纹理大小不是32x32，CWL会将其调整为32x32。

使用标签 **addEleOnLoad**，玩家在加载时将自动获得这个专长。

<LinkCard t="CWL 范例: 多娜可可" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3400267207" i="https://raw.githubusercontent.com/gottyduke/Elin.Plugins/refs/heads/master/CwlExamples/Donakoko/preview.jpg" />
<LinkCard t="多娜可可 源码" u="https://github.com/gottyduke/Elin.Plugins/tree/master/CwlExamples/Donakoko" />