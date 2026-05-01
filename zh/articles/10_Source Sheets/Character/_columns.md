---
title: SourceChara 解释
author: Puddles
description: Comments about columns of Chara sheet.
date: 2025/8/30 00:00
tags: SourceSheet/Chara
---

# Chara表

<LinkCard t="SourceCard/Chara" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />

制作源表时，请务必复制官方源表的前三行，并将数据录入始于第四行。切勿更改列的顺序。

|列|类型|描述|
|-|-|-|
|id|文本|条目中最重要的标识单元，用于在角色表中将其与其他所有内容区分开来。如果该 ID 与原版条目或其他模组条目的 ID 匹配，则最后加载的表格将覆盖其他表格。该值不能包含任何空格，必要时建议使用 snake_case 风格，例如 `mymod_chara_yajyuu_senpai`。|
|_id|整数|用于图鉴中的排序，可以是任意数值。该值不必唯一。|
|name_JP|文本|角色的游戏内显示的日文名称。|
|name|文本|角色的游戏内显示的英文名称。其他语言使用 SourceLocalization.json。|
|aka_JP|文本|角色的游戏内别名/称号的日文名称。|
|aka|文本|角色的游戏内别名/称号的英文名称。其他语言使用 SourceLocalization.json。|
|idActor|文本|控制角色是否使用 PCC 部件渲染。示例：`pcc,unique,jure` 会从 `pcc/unique/jure` 加载 PCC 部件。|
|sort|文本|在 SourceChara 中未使用。|
|size|文本|角色占用的图块尺寸；通常为空。示例：`2,2` 会使角色占用 2×2 图块并防止被推挤。|
|_idRenderData|文本|控制精灵表引用。`chara`/`chara_L` 等使用 **Texture Replace** 中的纹理和 `tiles` 中的图块 ID（插槽有限，可被覆盖）。`@chara` 使用 **Texture** 中相同 ID 的纹理。模组角色**必须**使用`@chara`。|
|tiles|整数|精灵表的图块 ID，或模组角色的 [skinset](../../15_Texture%20Mods/skins)。|
|tiles_snow|整数|在雪地地图上使用的替代图块序列。模组角色改为使用 [variation](../../15_Texture%20Mods/variation)。|
|colorMod|整数|目前主要与 `100` 配合使用，允许灰度精灵继承 `mainElement` 的颜色。|
|components|文本|在 SourceChara 中未使用。|
|defMat|文本|在 SourceChara 中未使用。|
|LV|整数|角色的“危险等级”；影响根据地图危险度生成的生成阈值、选择成本（奴隶主/驯兽师）以及基于种族/职业特征的基础属性生成。|
|chance|整数|地图生成几率的修正值（可能也影响销售列表）。默认值为 `100`。|
|quality|整数|`0–2`：普通等级。`3`：独特怪物（可获得蛋；无法成为朋友/捕捉/驯服）。`4`：独特角色（仅鸡蛋；可以成为朋友但无法捕捉/驯服）。|
|hostility|文本|对玩家/盟友/旁观者的性情。留空为 `Hostile`（敌对）。`Neutral`：除非被攻击否则不会主动攻击。`Friend`：会攻击任何对友方单位敌对的目标，若玩家被激怒也会攻击。|
|biome|文本|在指定地板类型上增加（可能翻倍）生成几率，在其他类型上减少（可能减半）。示例：`Water` 会强烈偏好在水面地板生成。|
|tag|文本|已知标签包括：`mini`（精灵尺寸减半）、`noRandomProduct`（Fortune Drum 不会出内裤；可能也不会出同人志）、`random_color`（当 `colorMod=100` 时为灰度区域随机分配头发颜色）、`randomFish`、`staticSkin`（覆盖基于性别的精灵分配）、`snow`（偏好雪地图块）、`water`（偏好水图块）。|
|trait|文本|复杂的特性列表；请参考特性文档和 `Trait*` C# 类。|
|race|文本|来自 SourceRace 的种族 ID。|
|job|文本|来自 SourceJob 的职业 ID；默认为 `none`。|
|tactics|文本|覆盖所分配职业的默认战术。|
|aiIdle|文本|AI 行为的补充或覆盖。示例：`Stand`（完全静止，即使被攻击也不动）、`Root`（静止直到被攻击或招募）。|
|aiParam|文本|三个数值：首选与敌人的距离、每回合移动到该距离的概率，以及（很少使用）再次移动的额外概率。|
|actCombat|文本|战斗中可使用的主动 SourceElement 条目，用逗号分隔。添加 `/N` 可设置固定使用概率。增益效果可添加 `/pt` 使其作用于整个队伍（仅限友方状态）。示例：`ActThrowPotion/30,SpWeakness,SpSpeedDown,SpWisdom/50/pt`。默认概率为 100。|
|mainElement|文本|主要元素亲和力：`Fire`、`Cold`、`Lightning`、`Darkness`、`Nether`、`Sound`、`Chaos`、`Poison`、`Cut`、`Acid`、`Impact`。|
|elements|文本|被动 SourceElement 条目，用逗号分隔。适用时添加 `/N` 表示等级/数值。`0` 或负值可修改继承自种族的元素。示例：`invisibility/1` 为启用，`invisibility/0` 为禁用继承效果；`antidote/-30` 会让肉带毒，`antidote/30` 可解毒或抵消种族的 `-30`。|
|equip|文本|覆盖随机的职业装备模板，**仅在种族 EQ 不为空时生效**。示例：盗贼职业单位若设置 `equip=Archer`，则会获得弓箭手装备；但狗种族若种族 EQ 为空，即使设置 `equip` 也不会生成装备。|
|loot|文本|额外掉落物（Thing/ThingV ID），用逗号分隔，每个后面跟 `/N`。每 20 点相当于 +1% 掉落率。示例：`medal/500` = 25%；`medal/3000` = 150%（必定掉 1 个 + 50% 概率再掉 1 个）。|
|category|文本|大多数条目使用默认的 `chara`。|
|filter|文本|在 SourceChara 中未使用。|
|gachaFilter|文本|扭蛋先选择类别（例如 resident/livestock/Unique/default），再根据此过滤器挑选符合条件的角色。示例：livestock 结果只会包含标记为 livestock 的条目。|
|tone|文本|日文文本的对话语气修饰符。|
|actIdle|文本|非战斗时的行为指令。示例：`readBook`（生成/阅读/移除随机书籍）、`buffMage`（定期施放 `spResElement` 或 `spHero` 等增益魔法）。|
|lightData|文本|在 SourceChara 中未使用。发出的光颜色。|
|idExtra|文本|在 SourceChara 中未使用。额外的渲染数据。|
|bio|文本|用斜杠分隔的值（无空格）：`gender`（`m`/`f`/`n`，必填）、`birthyear`（可选）、`height`（可选）、`weight`（可选）、来自 `chara_tone.xlsx` 的 `tone`（可选）、来自 `chara_talk.xlsx` 的 `talk`（可选）。示例：`f/51044/152/46/friendly|私|あなた`。|
|faith|文本|固定的宗教。设置后游戏内无法更改。|
|works|文本|来自 SourceHobby 的 alias。|
|hobbies|文本|来自 SourceHobby 的 alias。|
|idText|文本|链接到 `CharaText` 表格中的对应条目。|
|moveAnime|文本|移动动画类型。`hop` 或留空。|
|factory|文本|在 SourceChara 中未使用。|
|components|文本|在 SourceChara 中未使用；此列为重复列。|
|recruitItems|文本|特殊招募对话物品，目前仅 mani 使用。|
|detail_JP|文本|在 SourceChara 中未使用；可用于备注。|
|detail|文本|在 SourceChara 中未使用；可用于备注。|