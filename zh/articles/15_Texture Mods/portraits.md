---
title: 肖像
author: DK
description: 如何为 PC 和 NPC 添加肖像
date: 2026/4/9 15:00
tags: Texture/Portrait
---

# 肖像要求

Elin的肖像（Portrait） ，也叫立绘。

肖像是放置于 `Portrait` 文件夹里的 `.png` 文件。（ `Portrait` 文件夹应在游戏目录的 Package 文件夹内）

+ 尺寸: 240x320
+ 背景：透明
+ 文件命名: **类别**_**性别**-**名字**.png

类别:
+ **`c`**： 默认的角色肖像
+ **`foxfolk`**：狐狸种族肖像（米芙、涅芙）
+ **`guard`**： 守卫肖像
+ **`special`**： 特殊肖像，例如小女孩、妹妹、流放者

性别:
+ **`m`**： 男
+ **`f`**： 女
+ **`n`**： 未知（???）

名字:
+ 建议不要使用汉语命名 


## 玩家肖像

添加新的玩家肖像时，你可以组合使用上述任何类别和名称，例如： `c_f-myportraits01` 或 `special_n-myportraits02`。请务必确保文件名的唯一性。

## NPC 肖像

少部分硬编码的 NPC 始终使用固定的肖像 ID：

|角色 id|肖像 id| 角色名字 |
|-|-|-|
|`shojo`|`special_f-littlegirl`| 少女 |
|`sister`|`special_f-littlesister`| 妹 |
|`sister_shark`|`special_f-littlesister`| 妹鲨 |
|`sister_penguin`|`special_f-littlesister`| 妹企鹅 |
|`imotoroid`|`special_f-littlesister`| 妹（机械精英怪的召唤物） |
|`imotoroid_origin`|`special_f-littlesister`| 妹（机械精英怪） |
|`citizen_exile`|`special_n-exile` (non-random)| 流放者（赎罪之村村民） |

独特NPC（Unique NPC）使用 `UN_id` 作为其肖像 ID；如：菲亚玛是 `UN_fiama` ，格温是 `UN_gwen`。

你可以通过提供一个具有相同肖像 ID 的文件，来覆盖这些独特 NPC 的默认肖像。

此外，制作角色Mod时，也是通过 `UN_` 开头来锁定立绘（固定立绘）。
