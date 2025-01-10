---
title: Act/Spell 能力与法术
date: 2025/1/3 01:00
hide: true
---

## 导入元素

CWL 可以导入您的自定义元素表（表名: Element）并将其添加到游戏中。然而，您的自定义元素有以下几项需要注意：

**id**：一个唯一的数字，这是元素的ID。  
**alias**：元素的别名，字符串ID。  
**type**：与此元素对应的C#类型名称。  
**group**：可以是 **FEAT**, **ABILITY**, 或**SPELL**。  
**tag**：如果您希望在游戏加载时将元素自动赋予给玩家，请添加 **addEleOnLoad**。  

其余的由您定义。您可以参考[Elin Modding Wiki](https://elin-modding-resources.github.io/Elin.Docs/)或Elin Sources。

## 能力/法术

例如，我们想添加一个能力 **ActLionDance**，它应该看起来像这样：

![img](https://i.postimg.cc/90PTN1r1/doc-custom-ele.png)

![img](https://i.postimg.cc/XY6Nv31Z/image.png)

**alias** 和 **type** 不需要相同，但是，能力图标的纹理将参照 **alias**，而元素对象实例将链接到 **type** 。

在您的脚本dll中，您应该有以下代码：
```cs
internal class ActLionDance : Act
{
    public override bool Perform()
    {
        pc.Say("Lion Dance!!");
        return true;
    }
}
```

该类必须从 **Element** 派生，常见的有 **Act**、**AIAct**、**Ability**、**Spell**，具体取决于使用和意图。

您可以在任何命名空间中声明您的类，CWL 会自动为您限定类型名称，因此 **type** 只需要是类名本身。

您的元素图标需要放置在 **Texture** 文件夹中，使用与 **alias** 相同的文件名，例如 **ActLionDance.png**。也可以使用模式匹配为多个元素分配同一个图标，例如为所有 **alias** 以`my_ele`开头的元素分配同一个图标，该文件名应为`@my_ele.png`，此图标会匹配至`my_ele_1`, `my_ele_2`, `my_ele_fire`, `my_ele_cold`, `my_ele_error`, `my_ele_xxx`等元素。全名匹配会优先于模式匹配。

如果纹理大小不是48x48，CWL会将其调整为48x48。

使用标签 **addEleOnLoad**，玩家角色将自动获得此能力。

如果不需要使用CWL的API，那么无需引用CustomWhateverLoader.dll。

## 信仰能力

如果您的自定义能力是一个自定义信仰的能力，请使用标签 **godAbilit,信仰 ID**，例如将您的能力设为 **cwl_spaghettigod** 信仰的能力，标签应为 **godAbility,cwl_spaghettigod**。信仰能力在使用时会触发该信仰的神的对话。