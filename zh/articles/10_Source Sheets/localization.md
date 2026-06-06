---
title: Translation 翻译
author: DK
description: How to provide translations for your source sheets
date: 2026/4/8 00:00
tags: SourceSheet/Localization
---

# 源表

默认情况下，源表里包含英文列与日文列，比如 `name` 与 `name_JP`， `aka` 与 `aka_JP`。

源表应放入 `EN` 或 `JP` 文件夹。

## 为您的 Mod 添加翻译

要为您的mod源表添加，除英语和日语以外的翻译：

1. 将游戏切换至目标语言。
2. 重启游戏以导出可翻译的条目。

此时，您的模组的 `LangMod/XX` 文件夹中，会出现 `SourceLocalization.json` 文件（  `XX` 是当前语言的代码，比如中文是 `CN` ）。

接下来开始翻译，编辑此 `json` 文件以进行翻译。

## 为他人 Mod 添加翻译

如果您想为其他模组提供翻译，比如汉化某模组：

1. 复制他人 Mod 的本体，到本地的 Package 文件夹中
2. 以你想要翻译成的语言启动游戏，比如汉化模组时，以中文启动。

之后你能编辑该模组文件夹中的 `SourceLocalization.json` 文件。完成编辑后：

- 可以将此文件发送给模组作者；
- 也可以，在创意工坊上发布一个新模组，只需包含该 `json` 翻译文件，并置于正确的文件夹结构中。

## 备注

用 `json` 来翻译的方式只适合源表；而drama表、dialog表等都无法用此方法来翻译。
