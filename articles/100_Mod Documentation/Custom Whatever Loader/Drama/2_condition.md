---
title: Branching & Condition
author: DK
description: How to dynamically enable lines and set jump targets
date: 2026/4/19 17:00
tags: Guide/CWL/Drama
---

## Built-in Conditions

Attach conditions to any line using the `if` (and optionally `if2`) column.

| Condition          | Param                  | Description                                      |
|--------------------|------------------------|--------------------------------------------------|
| `hasFlag`          | flag name              | Player has flag and value ≠ 0                    |
| `!hasFlag`         | flag name              | Player doesn’t have flag or value = 0            |
| `hasMelilithCurse` | —                      | Player has Melilith curse                        |
| `merchant`         | —                      | Player is at Merchant Guild                      |
| `fighter`          | —                      | Player is at Fighter Guild                       |
| `thief`            | —                      | Player is at Thief Guild                         |
| `mage`             | —                      | Player is at Mage Guild                          |
| `hasItem`          | item id                | Player has the item in inventory                 |
| `isCompleted`      | quest id               | Player has completed the quest                   |

**Simple value checks** (most common for flags/counters):
```
=,example_flag,1
>,example_counter,20
!,example_flag,69
```

Most lines only need the `if` column. Add an `if2` column if you need multiple conditions.

## Dynamic Conditions

Built-in `if`/`if2` conditions are evaluated **only once** when the drama loads.

To make a line dynamically enabled/disabled, use:
- `invoke*` condition, or
- `eval` action that returns a `bool`

![](./assets/drama_condition_line.png)

## Dynamic Branching

Set `jump` to `eval_result` and use an `eval` action that returns a `string` to dynamically choose the jump target.

![](./assets/drama_branch_line.png)
