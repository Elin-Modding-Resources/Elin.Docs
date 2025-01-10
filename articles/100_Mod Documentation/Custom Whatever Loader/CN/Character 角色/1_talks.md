---
title: 对话与剧情
date: 2025/1/3 01:00
hide: true
---

## 喊叫

在某些情况下，角色会触发特定的对话并显示在其头顶。

![](./assets/bark.png)

这些对话写在 **CharaText** 表格中，而你的角色则在 **idText** 单元格中填入该对话的 ID 将其链接。

![](./assets/charatext.png)

|单元格|calm|fov|aggro|dead|kill|
|-|-|-|-|-|-|
|触发|冷静|视线|激怒|亡语|击杀|

## 对话

想添加一些和角色聊一聊的对话，可以在 `LangMod/**/Dialog/` 文件夹中准备一个 `dialog.xlsx` 表格。

![img](./assets/dialog.png)

这个表格的格式与游戏的对话表格 **Elin/Package/_Elona/Lang/_Dialog/dialog.xlsx** 相同，但你只需 `unique` 表格和包含你角色 ID 的那一行。

![](./assets/unique.png)

此处 ID 和角色 ID 相同。

## 剧情

剧情是你与角色的丰富对话，通常会有选项，分支，以及一些触发行动。

![](./assets/drama_eg.png)

要为角色添加一个自定义剧情，使用标签 `addDrama_DramaSheetName`，CWL 将自动重定向该剧情。

你的自定义剧情表必须放在你的 `LangMod/**/Dialog/Drama/` 文件夹中，并且名称必须与标签匹配。例如，使用 `addDrama_MyCharaDrama` 对应 `Dialog/Drama/MyCharaDrama.xlsx`。

在制作自己的剧情时，你可以参考游戏中的剧情表，路径为 **Elin/Package/_Elona/Lang/_Dialog/Drama**，或者查看 Tiny Mita 的示例，它有一个模板剧情表：

<LinkCard t="CWL Example: Tiny Mita" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3396774199" />

![img](./assets/drama.png)

::: tip 热重载剧情
剧情表可以在游戏过程中编辑并保存，每次对话都会热重载。
:::