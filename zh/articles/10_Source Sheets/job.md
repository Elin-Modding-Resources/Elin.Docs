---
title: Job 职业
author: Han
description: Comments about columns of Job sheet.
date: 2025/12/11 00:00
tags: SourceSheet/Job
---

# 职业表 (Job)

<LinkCard t="SourceChara/Job" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />

官方的职业表（job 表）位于 SourceChara 表内，通过底部的标签页切换。

制作源表时，请始终复制官方表的前 3 行，然后从第 4 行开始填入你的数据。不要更改列的顺序。

## 列说明

|列名|类型|描述|
|-|-|-|
|id|string|最重要的单元格，用来把这一行与表中其他所有行区分开。如果你的 ID 与官方条目或其他 Mod 的 ID 重复，最后加载的表会覆盖之前的所有条目。ID 中不能包含任何空格或特殊字符。|
|name_JP|string|职业的日文显示名称。|
|name|string|职业的英文显示名称。其他语言使用 SourceLocalization.json。|
|playable|integer|创建角色时玩家能否选择这个职业，判定规则与种族表相同。`1`：默认可选。`2`–`6`：需要开启「扩展种族」选项。`7`–`8`：需要开启「全部种族」选项。`9`：任何情况下都不可选。|
|STR/END/DEX/PER/LER/WIL/MAG/CHA/SPD|integer|职业给角色提供的额外属性加成。|
|ratio|—|用于估算职业强度的宏，游戏中未使用。留空即可。|
|elements|elements|职业自带的固有效果，用来添加职业专长和基础技能加成。格式：`元素别名/数值`。|
|weapon|string[]|武器分类列表，生成装备时从中随机抽一项。例如默认战士职业的 NPC 会随机获得 `sword`、`axe`、`blunt`、`polearm`、`scythe` 之一。**这里填的是物品分类而不是物品 ID**；填写不存在的分类会在生成装备时出错。注意，只有角色确实会生成装备（种族的 `EQ` 列非空，或角色表的 `equip` 列非空）时，本列才起作用。|
|equip|string|远程武器的装备模板。实际有效果的只有三个值，且**区分大小写、均为小写**：`archer`（弓/弩）、`inquisitor` 与 `gunner`（枪）；填 `none` 则该职业完全不生成装备。其余装备由 `weapon` 列和种族的 EQ 决定，与本列无关。|
|domain|elements|职业初始拥有的领域，填元素别名（例如 `eleFire,eleCold,eleLightning`）。领域机制**只对玩家角色生效**，NPC 的这一列只用于角色信息窗口的显示。玩家的这一列只读取元素别名，**写在后面的数值会被忽略**。**留空不代表没有领域**，该列默认值就是 `eleFire,eleCold,eleLightning`。|
|detail_JP|string|职业的日文详情/背景故事。|
|detail|string|职业的英文详情/背景故事。|
