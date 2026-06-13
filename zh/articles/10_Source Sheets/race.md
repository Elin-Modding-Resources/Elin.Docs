---
title: Race
author: Han
description: Comments about columns of Race sheet.
date: 2025/9/19 00:00
tags: SourceSheet/Race
---

::: warning
施工中
:::

# 种族表 (Race)

<LinkCard t="SourceCard/Race" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />

种族表存储在 Chara 表内，可通过底部的标签页切换。

制作源表时，请始终复制官方行的前 3 行，然后从第 4 行开始填入你的数据。不要更改列的顺序。

## 列说明

|列名|类型|描述|
|-|-|-|
|id|string|区分一条数据与表中其他所有数据的最重要的单元格。如果你的 ID 与官方条目或其他 Mod 的 ID 重复，最后加载的表将覆盖之前的所有条目。该值不能包含任何空格或特殊字符。|
|name_JP|string|此种族的日文显示名称。|
|name|string|此种族的英文显示名称。其他语言使用 SourceLocalization.json。|
|playable|integer|指定此种族在创建角色时是否可供玩家使用。`4` 及以下：可选。`5`：高阶种族。`7`–`8`：主要为 NPC 种族。`9`：通常为神/恶魔等特殊种族。|
|tag|string[]|应用于该种族的逗号分隔标签列表。参见下方[标签参考](#标签参考)。|
|life|integer|基础生命值；决定血量池。|
|mana|integer|基础法力值；决定法力池。|
|vigor|integer|基础耐力值；决定耐力池。|
|DV|integer|基础闪避值。赋予该种族天生的闪避能力（例如：妖精）。|
|PV|integer|基础防护值。赋予该种族天生的防护能力（例如：魔像）。|
|PDR|integer|物理伤害减免。来自物理来源的伤害百分比减免。|
|EDR|integer|元素伤害减免。来自元素来源的伤害百分比减免。|
|EP|integer|完美闪避。该种族拥有额外的完美闪避保护层，这是一次独立的闪避判定。|
|STR/END/DEX/PER/LER/WIL/MAG/CHA/SPD|integer|基础属性参数。|
|ratio|—|用于估算种族强度的宏，游戏中未使用，但表中必须保留。留空即可。|
|INT|integer|此种族的"智力"。用于判断它们是否足够聪明以自行开门。低于 `10` 则无法做到。|
|martial|integer|游戏内用途未知。保留为 `3`（与耶尔雷斯相同）。|
|pen|integer|游戏内用途未知。保留为 `0`。|
|elements|elements|此种族自带的固有效果。用于添加种族专长和基础技能加成（同时也会增加基础潜力）。格式： `元素别名/数值`。|
|skill|string|游戏内用途未知。留空即可。|
|figure|string[]|指定该种族初始拥有的身体部位。参见下方[部位参考](#部位参考)。|
|geneCap|integer|此种族拥有的基因槽数量。|
|material|string|此种族的构成材质。|
|corpse|string[]|击杀该种族后掉落的尸体由什么构成。|
|loot|string[]|此种族专属的掉落物。|
|blood|integer|此种族血液的颜色。`2` 为正常的红色血液。请参考官方源表中 `chara`分表的blood列来填写。依然遵循通用规则：空缺则使用默认值。|
|meleeStyle|string|该种族的近战效果。留空则为默认近战。可选值：`Claw`、`Bite`、`Kick`、`Touch`、`Spore`、`Sting`、`Gaze`。|
|castStyle|string|该种族的施法效果。主要用于风味文本。|
|EQ|string[]|决定新生成的该种族角色会装备何种装备。EQ 是创建角色时启用装备分配的另一种方式，可以填入任意内容。两个常见选项为 `"all"` 和空白。|
|sex|integer|决定生成时的性别。`0` = 仅限女性。还存在 `50`–`56` 等值，但用途不明。|
|age|integer[]|生成此种族时的年龄范围，逗号分隔的 `起始,结束` 格式。例如，`8,50` 表示生成时年龄在 8 到 50 之间。|
|height|integer|此种族的平均身高。|
|breeder|integer|此种族是否适合繁殖。当该种族被设定为牲畜时，用于决定其产出率。|
|food|integer[]|此种族肉类品质的倍率。|
|fur|string|一组 `类别/材质` 格式的字符串，决定剃毛时的产出。|
|detail_JP|string|此种族的日文详情/背景故事。|
|detail|string|此种族的英文详情/背景故事。|

## 标签参考

`tag` 列中常用的标签：

|标签|描述|
|-|-|
|`human`|该种族可使用通用语。|
|`fairy`|此种族为妖精。|
|`humanSpeak`|非人形种族但可使用通用语。|
|`gelatin`| 相当于material列里填写 `jelly`，表示种族的材质是胶状物（比如波球）。注意：不建议使用 `gelatin`标签。|
|`sand`|此种族会在沙地地图生成。|
|`ride`|此种族骑乘适应性良好。|
|`mofu`|此种族将无差别地遭到所有人和事物的骚扰与狂撸。|
|`fish`|此种族被视为鱼类。用于灾厄判定。|
|`undead`|此种族被视为亡灵。用于灾厄判定。无法被心灵感应侦测。|
|`god`|此种族被视为神。不要和神一起看鸟。|
|`animal`|此种族被视为动物。用于灾厄判定；可出现在动物驯师处。|
|`sleepBeside`|此种族若在你的阵营和地图中，会试图睡在你身边。|
|`noRide`|此种族骑乘适应性较差。|
|`insect`|此种族被视为昆虫。|
|`plant`|此种族被视为植物。可被库米罗米支配。|
|`filth`|用途不明。|
|`dragon`|此种族被视为龙。|
|`webfree`|此种族可自由穿越蛛网；用于蜘蛛。|
|`cat`|此种族是猫。不要吃。|
|`water`|此种族会在水域地图生成。|
|`machine`|此种族被视为机械。可被玛尼支配。可被玛尼霰弹枪阵营效果升级。|
|`horror`|此种族被视为异形。无法被心灵感应侦测。|

## 部位参考

`figure` 列使用竖线（`|`）分隔的汉字来表示身体部位：

|汉字|身体部位|
|-|-|
|`頭`|头部|
|`首`|颈部|
|`体`|躯体|
|`背`|背部|
|`手`|手部|
|`指`|手指|
|`腕`|手臂|
|`腰`|腰部|
|`脚`|腿部|
|`足`|脚部|
