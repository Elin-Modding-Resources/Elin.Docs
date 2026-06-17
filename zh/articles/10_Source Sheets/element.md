---
title: Element 元素
author: Han
description: 元素表各列的参考文档。
date: 2026/6/13 00:00
tags: SourceSheet/Element
---

# 元素表 (Element)

<LinkCard t="SourceGame/Element" u="https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1102059407#gid=1102059407" />

元素表存储在 Game 表内，是第一个可见的标签页。

制作源表时，请始终复制官方行的前 3 行，然后从第 4 行开始填入你的数据。不要更改列的顺序。

## 列说明

|列名|类型|描述|
|-|-|-|
|id|int|元素的唯一标识符。如果 ID 与官方或其它 Mod 的条目重复，最后加载的表将覆盖之前的所有条目。不能包含空格或特殊字符。|
|alias|string|此元素的字符串别名。通常推荐使用 ID 来访问，但这里提供了字符串表示。供下方的其它 `aliasX` 列使用。|
|name_JP|string|日文显示名称。|
|altname_JP|string[]|此元素的替代日文形容词，逗号分隔。主要用于魔法元素（例如：Fire → 赤、燃烧）。|
|altname|string[]|此元素的替代英文形容词，逗号分隔。主要用于魔法元素（例如：Fire → red, burning）。|
|aliasParent|string|父元素的别名。参见下方[aliasParent](#aliasparent)。|
|aliasRef|string|引用元素的别名。参见下方[aliasRef](#aliasref)。|
|aliasMtp|string|作为本行倍率元素的别名（例如：`life` 受 `r_life` 倍率影响）。|
|parentFactor|float|此元素相关计算（潜力、法术威力缩放等）中使用的倍率。|
|lvFactor|int|元素相关计算中使用的值。|
|encFactor|int|为此元素计算附魔（如随机装备生成）时使用的值。|
|encSlot|string|此技能/附魔可出现的装备槽位，逗号分隔。例如：`weapon`、`all`、`shield`、`back`、`finger`、`waist`、`head`。|
|mtp|int|元素计算中使用的整数值。|
|LV|int|此元素的"等级"。参见下方[LV](#lv)。|
|chance|int|出现概率权重。`1000` = 常见，越低越稀有，`0` = 不会自然生成。|
|value|int|此元素专属的物品价值修正（例如：法术的魔法书、技能的专业书）。|
|cost|int[]|法术与能力在等级缩放之前的基础消耗。|
|geneSlot|int|基因编辑时此技能/专长/法术/能力占用的基因槽数。设为 `-1` 则完全排除在基因工程池之外。|
|sort|int|排序权重。主要用于能力和法术，决定在法术/能力列表中的显示顺序。|
|target|string|仅限能力和法术。参见下方[Target](#target)。|
|proc|string[]|一个或逗号分隔的两个字符串。仅限能力和法术。参见下方[Proc](#proc)。|
|type|string|此元素在代码中使用的 C# 类。常见值：`Element`、`Ability`、`Spell`、`Feat`。**Mod 开发的关键：** 请将其指向你自己的自定义类名（例如：`MyCustomFeat` 或 `ActMyCustomAbility`）。|
|group|string|元素的大致类别。参见下方[Group](#group)。|
|category|string|元素的子类别。与 `group` 有些重叠。|
|categorySub|string|更细分的子类。用于技能、领地专长、专长、元素攻击、能力和法术。|
|abilityType|string[]|用于能力和法术：存储效果种类的信息，供战斗 AI 使用。|
|tag|string[]|应用于元素的各种标签。控制法术的出现位置、使用后是否保持隐身、领域关联、负面/正面效果分类等。|
|thing|string|仅限法术。空格分隔的字母：`B` = 魔法书，`S` = 卷轴，`R` = 魔杖。指定法术可以以何种物品形态出现。|
|eleP|int|基础元素威力。主要用于元素法术/能力，计算元素减益时使用。|
|cooldown|int|使用此元素后施加给角色的冷却时间（回合数）。|
|charge|int|获得该法术时给予的基础充能数（例如：阅读 Fire Ball 的魔法书可获得 10 充能 + 额外加成）。|
|radius|float|法术或能力的半径（例如：Bolts 使用 `99` 来命中直线上直到地平线的所有目标）。|
|max|int|专长专用：可达到的最高等级（例如：Metal 最高可达 `999`）。|
|req|string[]|专长或技能专用：解锁所需的前置元素或元素等级（例如：Dream Waker 需要 Casting 技能）。|
|idTrainer|string|可由训练师教授的技能的对应训练师类型。|
|partySkill|int|布尔值（`0` = false，`1` = true）。指定该能力是否可对全队使用。|

## aliasParent

`aliasParent` 列指向父元素的别名，有以下多种用途：

- 将魔法元素映射到其父属性（例如：Fire → MAG，Holy → WIL）。
- 将抗性元素映射到其源魔法元素（例如：`resFire` → `eleFire`）。
- 将正面突变映射到其负面版本（例如：Lithe Leg → Twisted Legs）。
- 将能力和法术映射到其计算用的父属性（例如：Swarm → DEX，Bladestorm → STR）。

## aliasRef

`aliasRef` 列指向引用元素的别名，有以下多种用途：

- 对于倍率元素（例如：`r_life`、`r_mana`、`r_DV`、`r_PV`）：指向被倍率计算的目标元素。
- 对于魔法元素（例如：`eleFire`）：指向对应的抗性元素（例如：`resFire`）。
- 对于能力/法术（例如：Suicide Bomb）：指向伤害元素（例如：`eleImpact`）。
- `mold` 是一个特殊别名，用于生成所有魔法元素的法术（例如：`breathe_` + `mold` 会生成 `breathe_fire`、`breathe_cold` 等）。

## LV

`LV` 列决定此元素的"等级"：

- **法术：** 决定出现条件。Earthquake 等级为 20，Meteor 等级为 30，比等级仅为 15 的 Fire Ball 在低等级法术商贩处更难遇到。
- **附魔：** 决定出现所需的危险等级。火/冰/雷抗性在等级 15 时容易找到，而斩击/冲击抗性在 100 和 200 时难度高得多。

## Target

仅限能力和法术。决定动作的使用方式：

|值|描述|
|-|-|
|Self|以施法者自身为目标，点击即可发动（例如：Ball 系法术）。|
|Ground|以空格为目标（例如：Flare 系法术）。|
|Neighbor|以相邻角色为目标（例如：Hand 系法术）。|
|Chara|以范围内的特定角色为目标（例如：Arrow 系法术）。|
|Party|以整个队伍为目标（例如：Absorb Mana）。|
|SelfParty|适用于玩家队伍。用于以物品栏为目标的法术（例如：武器/防具附魔、鉴定法术），施放后会弹出选择界面。|
|Select|可选择自身或特定角色为目标（例如：Healing 系法术）。|
|Enemy|只能以敌对角色为目标。|

## Proc

仅限能力和法术。可为一个或逗号分隔的两个字符串。有多种用途：

- **增益/减益：** 告知战斗 AI 将施加何种状态。例如，Nature's Embrace 带有 `Buff,ConHOT`——若全队已拥有 ConHOT，AI 将跳过此能力。
- **原版能力/法术：** 作为 `ActEffect` 类中的 `EffectId` 字符串使用（例如：`Breathe` 对应 `EffectId.Breathe`）。
- **召唤法术/能力：** 以 `Summon` 开头，后接被召唤实体的角色 ID（例如：SpSummonMonster 对应 `Summon,monster`）。注意：召唤的缩放和元素类型处理仍在 `ActEffect` 类中有硬编码逻辑，因此添加新的召唤法术可能并非简单直接。

## Group

Elin 中的元素涵盖众多类别。`group` 列基本一目了然：

|Group|描述|
|-|-|
|ELEMENT|卡牌元素|
|SLOT|身体部位|
|SKILL|技能|
|ENC|附魔|
|FOOD|食物效果|
|DOMAIN|领域|
|FEAT|专长|
|MUTATION|突变|
|FACTION|势力技能（可成长，例如：Fertility）|
|POLICY|势力政策（可开关，例如：Weed Pulling Campaign）|
|ABILITY|能力（Bladestorm、Dream Larva；通常消耗体力）|
|SPELL|法术|
