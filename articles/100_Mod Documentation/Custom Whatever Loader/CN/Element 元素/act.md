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

## 图标

您的元素图标需要放置在 **Texture** 文件夹中，使用与别名相同的文件名，例如 **ActLionDance.png**。您还可以使用模式匹配为多个元素分配一个图标，例如对于所有alias以 `my_ele` 开头的元素，文件名应为 `@my_ele.png`，它将匹配 `my_ele_1`、`my_ele_2`、`my_ele_fire`、`my_ele_cold`、`my_ele_error`、`my_ele_xxx` 等。全名匹配在模式匹配之前进行。

如果纹理大小不是 48x48，CWL 将为您调整至该大小。

您也可以选择重写 `GetSprite` 方法，提供您自己的图标。

## 标签

**`addEleOnLoad`**：玩家在加载时将自动获得此能力。  
**`addDice`**：使用来自 Calc 表的骰子，其 ID 与元素的别名相同。  
**`godAbility,religion_id`**：使您的能力在触发自定义信仰的神对话。例如信仰 **cwl_spaghettigod**，使用标签 **godAbility,cwl_spaghettigod**。  

如果您不需要使用 CWL API，则无需引用 CustomWhateverLoader.dll。

## 短语

您可以通过在 `LangMod/**/Data/chara_talk.xlsx` 文件中提供 `phrase_ActAlias` 文本来定义能力触发短语，方法与 **_Lang_Chinese/Lang/CN/Data/chara_talk.xlsx** 中的做法类似。