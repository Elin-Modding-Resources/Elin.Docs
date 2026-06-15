---
title: Job 职业
author: Han
description: Comments about columns of Job sheet.
date: 2025/12/11 00:00
tags: SourceSheet/Job
---

::: warning
施工中
:::

# 职业表 (Job)

<LinkCard t="SourceChara/Job" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />

官方源表中职业表（job表），存储在 SourceChara 表内，可通过底部的标签页切换。

制作源表时，请始终复制官方行的前 3 行，然后从第 4 行开始填入你的数据。不要更改列的顺序。

## 列说明

|列名|类型|描述|
|-|-|-|
|id|string|区分一条数据与表中其他所有数据的最重要的单元格。如果你的 ID 与官方条目或其他 Mod 的 ID 重复，最后加载的表将覆盖之前的所有条目。该值不能包含任何空格或特殊字符。|
|name_JP|string|此职业的日文显示名称。|
|name|string|此职业的英文显示名称。其他语言使用 SourceLocalization.json。|
|playable|integer|指定此职业在创建角色时是否可供玩家使用。`1`：玩家可选的基础职业。`4` 和 `5`：高阶职业。`7` 及以上：玩家不可选，通常为 NPC 稀有职业。|
|STR/END/DEX/PER/LER/WIL/MAG/CHA/SPD|integer|此职业为角色提供的额外属性加成。|
|ratio|—|用于估算职业强度的宏，游戏中未使用，但表中必须保留。留空即可。|
|elements|elements|此职业自带的固有效果。用于添加职业专长和基础技能加成。格式：`元素别名/数值`。|
|weapon|string[]|武器物品名称列表。在生成角色时用于装备武器。例如，默认战士职业的 NPC 将随机获得以下之一：`sword`、`axe`、`blunt`、`polearm`、`scythe`。|
|equip|string|与武器相关；预设的"装备模板"，可分配给该职业。例如，战士会获得近战护甲。|
|domain|string[]|此职业初始拥有的领域。|
|detail_JP|string|此职业的日文详情/背景故事。|
|detail|string|此职业的英文详情/背景故事。|
