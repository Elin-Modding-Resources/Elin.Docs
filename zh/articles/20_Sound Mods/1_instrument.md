---
title: 自定义乐器音乐
description: 添加或替换乐器音乐
date: 2025/1/3 01:00
hide: true
---

## 自定义乐器音乐

由于 **[Custom Instrument Track](https://steamcommunity.com/sharedfiles/filedetails/?id=3374708172)** 这个模组目前未维护，以下是如何使用 CWL 手动替换乐器音轨的方法：

首先，在 **Sound/Instrument** 文件夹中准备一个音效文件，文件名请使用以下音频ID之一：

如果您要制作一个**新的**乐器，请使用该乐器的ID（Thing ID）作为音频ID。

::: details 游戏内乐器音频ID
|乐器 ID|音频 ID|CN|EN|JP|
<!--@include: ./assets/instrument_id.md-->
:::

启动游戏一次，为新添加的音效生成一个元数据 **json** 文件，然后退出游戏，编辑该元数据 json 文件，将 **type** 设置为 **BGM**，并为乐器演奏添加一些 **parts**（片段）：

::: details cello_prelude.json
<<< ./assets/cello_prelude.json
:::

每个 **part** 都有一个以秒为单位的起始时间（**start**）和持续时间（**duration**）。在乐器演奏期间，系统将随机选择这些片段进行播放。
