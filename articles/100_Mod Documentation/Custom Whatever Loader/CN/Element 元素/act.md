---
title: 能力与法术
date: 2025/1/3 01:00
hide: true
---

## 如何创建自定义元素

假设您已在 **Element** 表中设置了您的元素，以下条目很重要：

**id**: 这应该是一个唯一的数字，这是能力 ID。
**alias**: 元素的别名，字符串 ID。
**type**: 对应此能力的 C# 类型名称。
**group**: 它是 **FEAT** (专长)，**ABILITY** (能力) 还是 **SPELL** (法术)。
**tag**: 如果您希望您的能力在游戏加载时自动应用于玩家，请添加 **addEleOnLoad**。

您可以参考 **[Elin Sources](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=859322825#gid=859322825)**。

### 图标

您的元素图标需要放置在 **Texture** 文件夹中，使用与别名 (alias) 相同的文件名，例如 **ActLionDance.png**。您也可以使用**模式匹配**来为多个元素分配单个图标，例如，对于所有 **alias** 以 `my_ele` 开头的元素，文件名应为 `@my_ele.png`，它将匹配 `my_ele_1`、`my_ele_2`、`my_ele_fire`、`my_ele_cold`、`my_ele_error`、`my_ele_xxx` 等。完整名称匹配优先于模式匹配。

如果纹理大小不是 48x48，CWL 将为您调整大小。

您还可以选择重写 `GetSprite` 方法并提供您自己的图标。

### 标签

**`addEleOnLoad`**: 玩家将在加载时自动获得此能力。
**`addDice`**: 使用 **Calc** 表中与元素别名 (alias) 具有相同 ID 的骰子。
**`godAbility,religion_id`**: 使您的能力在使用时触发神短语，用于自定义信仰。例如，信仰为 **cwl_spaghettigod**，使用标签 **godAbility,cwl_spaghettigod**。

### 短语

您可以通过在 `LangMod/**/Data/chara_talk.xlsx` 文件中提供 `phrase_alias` 文本来定义能力触发短语，类似于在 **_Elona/Lang/EN/Data/chara_talk.xlsx** 中所做的那样。

## 无脚本

您可以使用并重新组合 Elin 提供的现有 `proc` 来制作自定义能力/魔法，而无需编写 C# 脚本。

`type` 列必须是 **Elin Sources** 中现有 `type` 之一。

## 使用 C# 脚本

例如，我们想添加一个能力 **ActLionDance**，它应该如下所示：

![img](https://i.postimg.cc/90PTN1r1/doc-custom-ele.png)

![img](https://i.postimg.cc/XY6Nv31Z/image.png)

您的别名 (alias) 和类型 (type) **不必相同**，但能力图标的纹理将使用**别名**，元素对象将链接到**类型**。

在您的脚本 dll 中，您应该有以下代码：

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

该类必须派生自 **Element**，常见的有 **Act**、**AIAct**、**Ability**、**Spell** 等能力类型，具体取决于用法和意图。

您可以在任何命名空间中声明您的类，CWL 将限定类型名称，因此元素类型只需是类名本身。