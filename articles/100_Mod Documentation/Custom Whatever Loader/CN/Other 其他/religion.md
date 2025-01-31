---
title: Religion 信仰
date: 2025/1/3 01:00
hide: true
---

## 自定义信仰

CWL 可以导入您的自定义信仰表（表名: Religion）并将其添加到游戏中。然而，您的自定义信仰 ID 必须以 **cwl_** 开头，例如：**cwl_spaghettigod**。

默认情况下，该信仰是可加入的，并且不是弱神。您也可以将可选标签附加到 ID：
- 要将其设置为是弱神，请附加 **#minor**
- 要使其不可加入，请附加 **#cannot**

例如：**cwl_spaghettigod#minor#cannot** 会将其设置为弱神信仰并不可加入。但请注意，您的信仰的实际 ID 仍然是 **cwl_spaghettigod**，标签在导入时将被移除。

要为您的信仰创建一个可选的自定义肖像，请将 **.png** 图像放入 **Texture** 文件夹，使用与信仰 ID 相同的文件名，例如 **cwl_spaghettigod.png**。

## 信仰对话

CWL 会把您的自定义 **god_talk.xlsx** 合并到游戏中，此文件是**必需的**。您可以参考游戏的中文表格，路径为 **Elin/Packag/_Lang_Chinese/Lang/CN/Data/got_talk.xlsx**。

![img](https://i.postimg.cc/P5V71tTq/image.png)

您的自定义 **god_talk.xlsx** 应仅包含您自己信仰 ID 的对话，并放置在 **LangMod/*/Data** 文件夹下。

## 信仰能力

如果您的自定义能力是一个自定义信仰的能力，请使用标签 **godAbility,信仰 ID**，例如将您的能力设为 **cwl_spaghettigod** 信仰的能力，标签应为 **godAbility,cwl_spaghettigod**。信仰能力在使用时会触发该信仰的神的对话。

## 信仰神器

要将您的自定义物品设为信仰神器，请使用标签 **godArtifact,信仰 ID**，不提供您的自定义信仰 ID 的话，您的自定义神器将无法许愿获得。

## 势力元素

您还可以定义一个仅在您的自定义信仰激活时应用的派系元素列表。这是通过提供一个位于您的 `LangMod/**/Data/` 文件夹中的简单 JSON 文件来完成的，文件名为 `religion_elements.json`。
```json
{
    "cwl_spaghettigod": [
        "vopal",
        "eleLightning",
        "bane_all",
        "r_life"
    ],
    "cwl_example_religion2": [
        data...
    ]
}
```

当为您的自定义信仰定义派系元素时，您的自定义神器中符合的元素将变成派系元素，并仅在自定义信仰激活时生效。