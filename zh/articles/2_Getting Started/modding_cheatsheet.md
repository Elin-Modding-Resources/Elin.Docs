---
title: 速查手册
author: Drakeny
description: 为模组制作者准备的快速、易用的备忘知识。
date: 2024/12/8 2:53
tags: Cheatsheet
---

# 速查手册

本文将持续更新，因此格式可能稍显杂乱。

## 在哪里……？

想知道游戏本体中，某个特定文件在哪里吗？请看下文：

### 游戏日志（Player.log）

> [!Important] %localappdata%low/Lafrontier/Elin/Player.log
> :::info 除了按照上面的路径，你还可以按以下步骤打开：
> 游戏内 `ESC → 设置 → 其他页 → 打开报错记录 `
>
> 在文件夹中找到Player.log
> :::
> 若有人向你索要Player.log，请将整体文件发送给他，而不要复制文本
>

### 图形资源

#### PCC 相关

<!-- prettier-ignore -->
> [!Important] (Steam安装路径)/Elin/Package/_Elona/Actor
> 主角的小人图，即PCC。

#### 物品/角色/方块/其他的精灵图（Sprite） {#sprites}

<!-- prettier-ignore -->
> [!Important] (Steam安装路径)/Elin/Package/_Elona/Textures
> :::info 纹理查看器 
> 在游戏中，按以下步骤访问所有精灵图集 `Esc > 工具 > 纹理查看器`.
>
> 你也可以在此处查看它们的图块编号。
>
> Elin本体的角色的图块编号，就与源表SourceChara中的 tile列对应
> :::

#### 肖像 {#portrait}

<!-- prettier-ignore -->
> [!Important] (Steam安装路径)/Elin/Package/_Elona/Portraits

### 游戏数据（源表）

#### Source Game

> [!Important]包含以下数据表:
> `Elements`, `Formulas(Calc)`, `Stats`, `Checks`, `Factions`, `Religions`, `Zones`, `Zone Affixes`, `Quests`, `Areas`, `Home Resources`, `Research` 和 `Persons`.
> <LinkCard t="SourceGame.xlsx" u="https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_"/>

#### Source Chara

> [!Important]包含以下数据表:
> `Characters(Chara)`, `Barks (CharaTalk)`, `Tactics`, `Races`, `Jobs` 和 `Hobbies`.
> <LinkCard t="SourceChara.xlsx" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn"/>

#### Source Card

> [!Important]包含以下数据表:
> `Things`, `Foods`, `Recipes`, `SpawnLists`, `Categories`, `Collectables` 和 `KeyItems`.
> <LinkCard t="SourceCard.xlsx" u="https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z"/>

## 我该如何……？

### 添加/替换一个肖像

> [!Important] 添加新肖像：
> 在你的模组文件夹中创建一个名为 `Portrait` 的子文件夹，然后添加新的肖像图片。详情参阅下文：
>
> <LinkCard t="肖像" u="15_Texture Mods/portraits.md" />

> [!Important] 替换Elin本体的肖像：
> 在你的模组文件夹中创建一个名为 `Portrait` 的子文件夹，然后添加你想要替换的图片，图片名称需与要替换的人物肖像名称一致。
>
> 例子： `portrait/UN_adv_gaki.png` 将替换冒险者牙姬的肖像。详情参阅下文：
>
> <LinkCard t="肖像" u="15_Texture Mods/portraits.md" />

### 替换精灵图（Sprite）

NPC的小人贴图，即精灵图（Sprite）

> [!Important] 替换精灵图：
> 在游戏内使用纹理查看器： `Esc > 工具 > 纹理查看器` .
>
> 按下中键放缩，按着左键拖动
>
> 若想替换 `objC_811` ，请将新图片命名为 `objC_811.png`，然后鼠标拖动到上面即可


> [!Important] 你还可以用此方式，来替换精灵图：
> 在你的模组文件夹中创建一个名为 `Texture Replace` 的子文件夹。然后找到你想替换的目标，根据目标所在的图集名称和图块编号，将对应的新精灵图片添加进文件夹。
>
> 例如： `Texture Replace/objC_2115.png` 将会替换冒险者牙姬的精灵图
> ::: info 你可以在 [**纹理查看器**](#sprites) 中找到图集名称和图块编号。

完整内容，请移步总目录的 `贴图模组` 分区阅读。<!--Menu=总目录=メニュー。Texture Mods=贴图模组=テクスチャMOD--> 
