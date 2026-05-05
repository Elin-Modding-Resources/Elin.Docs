---
title: 添加与替换 BGM
author: DK
description: 添加或替换游戏内背景音乐
date: 2025/1/3 01:00
tags: 指南/BGM
---

# Elin 背景音乐

游戏自带 100 多首 BGM，它们由数字 ID 和声音文件 ID 定义。您可以在这里查看：

<BgmPlayer />

::: warning BGM 播放器
如果播放器没有显示，请尝试刷新页面。

我们仍在为部分素材寻找出处。如果您有任何相关信息，请在 Elona Discord 中告诉我们。
:::

## 替换游戏内 BGM

您可以将音频文件放入**自定义 BGM 文件夹**，即可替换游戏中的任意背景音乐。

### 自定义文件夹

**文件夹位置：**
```
%localappdata%Low\Lafrontier\Elin\Custom\Sound\BGM
```

**游戏内打开方式：**  
**配置 → 其他 → 打开自定义文件夹**。

### 命名规则

文件名称必须以对应的 **BGM ID** 开头。以下名称对于 BGM ID 56 都是有效的：

- `56.ogg`
- `56_myfav.ogg`
- `056.ogg`
- `056_battle_theme.ogg`

MP3 和 WAV 格式也可以使用；为了获得最佳的内存占用和流式加载，**建议使用 OGG**。

> `056 orc01` 是标题菜单的 BGM。

## 添加新 BGM

自定义 BGM 需放置在模组的 `Sound/BGM` 子文件夹中。与普通自定义声音不同，您需要手动修改元数据 JSON 中的 `id` 字段。请务必先启动一次游戏，让系统先生成 JSON 文件。

![](./assets/new_bgm.png)

`id` 可以是任意数字，建议设置为远大于游戏已使用 ID 的数值，以避免和其他 BGM 的 ID 冲突。

**重要提醒**：这个 `id` 仅用于 BGM 系统。您实际的声音 ID 仍然是文件名（不含扩展名），例如 **`BGM/MySoundFile`**。

### ID 覆盖

您也可以通过设置 `id` 为已存在的 BGM ID 来替换原曲，例如将 `"id": 56` 即可替换 `056 orc01`。