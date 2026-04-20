---
title: 分支 & 条件
author: DK
date: 2026/4/19 17:00
hide: true
---

## 内置条件

通过 `if` / `if2` 列添加该行的条件判断：

|条件|参数|说明|
|-|-|-|
|`hasFlag`|flag|玩家拥有该flag且值为非零|
|`!hasFlag`|flag|玩家没有该flag或值为零|
|`hasMelilithCurse`||玩家拥有Melilith诅咒|
|`merchant`||玩家在商人公会|
|`fighter`||玩家在战士公会|
|`thief`||玩家在盗贼公会|
|`mage`||玩家在法师公会|
|`hasItem`|[物品id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439)|玩家持有指定物品|
|`isCompleted`|[任务id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=785701697#gid=785701697)|玩家已完成指定任务|

条件格式为 `条件,参数`，支持扩展表达式：
```
=,test_flag,1
,counter,20
>,flag,0
!,flag,69
```

大多数情况下，只需要在表格中使用 `if` 列。如果需要更复杂的条件，可以插入一个新列，并将首行值设置为 `if2`。

## 动态条件

内置的 `if` / `if2` 条件**仅在剧情加载时判定一次**。

若要让某一行能够动态启用或禁用，请使用：
- `invoke*` 条件，或
- 返回 `bool` 类型的 `eval` 动作

![](../../assets/drama/drama_condition_line.png)

## 动态分支

将 `jump` 设置为 `eval_result`，并使用返回 `string` 类型的 `eval` 动作来动态选择跳转目标。

![](../../assets/drama/drama_branch_line.png)