---
title: Chara 角色
author: DK
description: 如何填写角色数据
date: 2026/5/2 03:00
tags: SourceSheet/Chara
---

# SourceChara

## 表格解释

<LinkCard t="SourceCard/Chara" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />

制作源表时，请务必复制官方源表的前三行，并将数据录入始于第四行。切勿更改列的顺序。

|列|类型|描述|
|-|-|-|
|id|文本|条目中最重要的标识单元，用于在角色表中将其与其他所有内容区分开来。如果该 ID 与原版条目或其他模组条目的 ID 匹配，则最后加载的表格将覆盖其他表格。该值不能包含任何空格，必要时建议使用 snake_case 风格，例如 `mymod_chara_yajyuu_senpai`。|
|_id|整数|用于图鉴中的排序，可以是任意数值。该值不必唯一。|
|name_JP|文本|角色的游戏内显示的日文名称。|
|name|文本|角色的游戏内显示的英文名称。其他语言使用  [SourceLocalization.json](./localization) 。|
|aka_JP|文本|角色的游戏内别名/称号的日文名称。|
|aka|文本|角色的游戏内别名/称号的英文名称。其他语言使用  [SourceLocalization.json](./localization) 。|
|idActor|文本|控制角色是否使用 PCC 部件渲染。示例：`pcc,unique,jure` 会从 `pcc/unique/jure` 加载 PCC 部件。|
|sort|文本|在 SourceChara 中未使用。|
|size|文本|角色占用的图块尺寸；通常为空。示例：`2,2` 会使角色占用 2×2 图块并防止被推挤。|
|_idRenderData|文本|控制精灵表引用。`chara`/`chara_L` 等使用 **Texture Replace** 中的纹理和 `tiles` 中的图块 ID（插槽有限，可被覆盖）。`@chara` 使用 **Texture** 中相同 ID 的纹理。模组角色**必须**使用`@chara`。|
|tiles|整数|精灵表的图块 ID，或模组角色的 [skinset](../15_Texture%20Mods/skins)。|
|tiles_snow|整数|在雪地地图上使用的替代图块序列。模组角色改为使用 [贴图变体](../15_Texture%20Mods/variation)。|
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
|bio|文本|用斜杠分隔的值（无空格）：`gender`（`m`/`f`/`n`，必填）、`birthyear`（可选）、`height`（可选）、`weight`（可选）、来自 `chara_tone.xlsx` 的 `tone`（可选）、来自 `chara_talk.xlsx` 的 `talk`（可选）。示例：`f/51044/152/46/friendly\|私\|あなた`。|
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

## 使用人类对话

除了在种族 Race 表中添加 `human` 或 `humanSpeak` 标签外，你还可以在角色 Chara 表中使用 `humanSpeak` 标签，让你的角色在对话中不使用括号。

## 生成配置

使用 `tag` 标签列来定义生成配置。

::: warning CWL旧格式
CWL 格式已经从Wiki移除，它们仍然兼容，但推荐更换并使用新格式。
:::

Possible tag actions:
+ `addZone(zoneId@level)`
+ `addEq(ItemId#Rarity)` / `addEquipment(ItemId#Rarity)`
+ `addThing(ItemId#Count)`
+ `addFlag(FlagName)` / `addInt(FlagName=1)`
+ `addFlagValue(FlagName=some_value)` / `addStr(FlagName=some_value)`
+ `addBio(BioFileId)` / `addBiography(BioFileId)`
+ `addStock(StockFileId)`
+ `addDrama(DramaFileId)`

### 自动生成到区域

要将角色生成到某个区域，请使用标签 `addZone(*)`，并用区域 **id** 替换 `*`（星号），或者保留星号以生成到随机区域。

例如，要在起始原野中生成角色，请使用 `addZone(startSite)`。要在特尔斐地下一层生成角色，请使用 `addZone(derphy@-1)`。请查看 [SourceGame/Zone](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752) 并参考 **id** 列。

每一个 `addZone` 标签都会确保在该区域生成一个角色。例如，`addZone(lumiest),addZone(little_garden),addZone(specwing),addZone(*)` 将会在所选的三个区域以及随机一个区域中生成一个角色（同时存在）。

![img](./assets/spawn_chara.png)

### 添加初始装备/物品

当生成你的角色时，你还可以为该角色定义起始装备和物品。

要为角色分配特定装备，使用标签 `addEq(ItemID#Rarity)` 或者 `addEquipment(ItemID#Rarity)`，其中 `ItemID` 替换为物品的ID，`Rarity` 为以下之一：**随机（Random）、粗制品,（Crude）、凡品（Normal）、优质品（Superior）、奇迹（Legendary）、神器（Mythical）、特殊物品（Artifact）**。如果省略 `#Rarity`，将使用默认稀有度 `#Random`。

例如，要将奇迹的 `BS_Flydragonsword` 和随机的 `axe_machine` 设置为角色的主要武器：
```
addEq(BS_Flydragonsword#Legendary),addEq(axe_machine)
```

要为角色添加起始物品，使用标签 `addThing(ItemID#Count)`。如果省略 `#Count`，将生成默认的 `1` 件物品。

例如，要为角色添加 `padoru_gift` x10 和 `援军卷轴` x5：
```
addThing(padoru_gift#10),addThing(1174#5)
```

### 创建冒险者

::: warning CWL旧格式
CWL 格式使用了 `AdventurerBacker`，它们仍然兼容，但推荐更换并使用新格式。
:::

如果您的角色 trait 设定为 **`AdventurerCustom`**，将登录该角色为冒险者，并出现在冒险者排名列表中。

如果不想您的冒险者角色随机移动，使用标签 `addFlag(StayHomeZone)`。

## 自定义商人库存

你可以使用 `addStock` 标签和库存文件来定义自定义商人库存。

库存文件是一个简单的 JSON 文件，放置在你的 `LangMod/**/Data/` 文件夹中，文件名为 `stock_ID.json`。其中 ID 是该库存文件或角色的唯一标识符。例如：`stock_my_cnpc.json` 或 `stock_unique_armor.json`。

使用 `addStock` 标签不带 ID 时，将默认使用角色 ID。你也可以通过多个标签指定或组合多个库存文件，例如：
`addStock,addStock(unique_items),addStock(unique_armor)`。

### 库存结构

```json
{
  "Items": [
    {
      "Id": "example_item",
      "Material": "",
      "Num": 1,
      "Restock": true,
      "Type": "Item",
      "Rarity": "Random",
      "Identified": true
    },
    {
      "Id": "example_item_limited",
      "Material": "granite",
      "Num": 1,
      "Restock": false,
      "Type": "Item",
      "Rarity": "Artifact",
      "Identified": true
    },
    {
      "Id": "example_item_craftable",
      "Material": "",
      "Num": 1,
      "Restock": false,
      "Type": "Recipe",
      "Rarity": "Random",
      "Identified": true
    },
    {
      "Id": "SpShutterHex",
      "Num": 5,
      "Type": "Spell"
    }
  ]
}
```

* `Items` 是一个包含库存物品的数组。
* `Id`  
  物品（Thing）的 ID。此字段**必需**。  
  对于某些库存类型，此处可以是元素的别名、数字 ID 或名称。
* `Material`  
  物品所使用的材质。留空则使用 Thing 数据中定义的默认材质。  
  默认值：`""`
* `Num`  
  物品数量。  
  默认值：`1`
* `Restock`  
  决定物品是否会补货。  
  设置为 `false` 表示该物品为限量，只能购买一次。  
  默认值：`true`
* `Rarity`  
  可选值：`Random`、`Crude`、`Normal`、`Superior`、`Legendary`、`Mythical`、`Artifact`  
  默认值：`Normal`
* `IdentifyLevel`  
  决定物品初始的鉴定状态。  
  可选值：`Identified`、`RequireSuperiorIdentify`、`KnowQuality`、`Unknown`  
  默认值：`Identified`
* `BlessedState`  
  决定物品的祝福状态。  
  可选值：`Doomed`、`Cursed`、`Normal`、`Blessed`  
  默认值：`Normal`
* `NoCopy`  
  无法被复制。  
  默认值：`false`
* `NoRandomSocket`  
  不生成随机的远程枪械插槽。  
  默认值：`false`
* `Sockets`  
  要作为插槽附加的远程枪械附魔别名列表。空字符串表示空插槽。  
* `PriceCalc`  
  用于覆盖物品价格的算术计算表达式。  
  参数：`base`（基础价格）、`lv`（物品等级）、`rarity`（物品稀有度）  
  示例：`"base * 0.2 + lv * 5"`
* `MapStr`  
  物品创建后要合并进来的附加 mapStr 值。
* `MapInt`  
  物品创建后要合并进来的附加 mapInt 值。
* 你可以省略任意字段以使用其默认值。

### 库存物品类型

|Type|说明|
|-|-|
|Item|标准物品。支持材质、等级和堆叠数量。|
|Block|可放置的方块物品，由方块别名和材质生成。|
|Cassette|音乐磁带。`Id` BGM 数字 ID。|
|Currency|货币物品。`Id` 可以是 `money`、`money2`、`plat`、`medal`、`influence`、`casino_coin`、`ecopo`。`Num` 表示金额。|
|Category|从类别生成。`Id` 是类别名称。|
|Filter|从过滤器生成。`Id` 是过滤器名称。|
|Tag|从标签生成。`Id` 是标签名称。|
|Letter|信件物品。`Id` 为信件 ID，txt文本放置于 `LangMod/XX/Text/Scroll`中。|
|Obj|Obj 对象。`Id` 为对象别名。|
|Perfume|香水。`Id` 为元素别名或 ID。|
|Plan|计划书。`Id` 为元素别名或 ID。|
|Potion|药水物品。`Id` 为元素别名或 ID|
|Recipe|用于合成的配方物品。|
|RedBook|红皮书物品。`Id` 为书籍 ID，txt文本放置于 `LangMod/XX/Text/Book`中。|
|Rod|魔杖物品。`Id` 为元素别名或 ID。`Num` 定义充能次数。|
|Rune|符文物品。`Id` 为元素别名或 ID。|
|RuneFree|免费符文物品。`Id` 为元素别名或 ID。|
|Scroll|卷轴物品。`Id` 为元素别名或 ID。|
|Skill|技能书。`Id` 为元素别名或 ID。|
|Spell|法术书。`Id` 为元素别名或 ID。|
|Usuihon|特殊物品。`Id` 为宗教 ID。|

## 对话 & 气泡

### 情景气泡

在某些情况下，角色会触发特定的台词，并以气泡形式显示在其头顶。

![](./assets/bark.png)

这些对话写在 **CharaText** 表格中，而你的角色则在 **idText** 单元格中填入该对话的 ID 将其链接。

![](./assets/charatext.png)

|列|情景|
|-|-|
|calm|平常时|
|fov|出现在视野中时|
|aggro|进入战斗时|
|dead|死亡时|
|kill|击杀单位时|

### 来聊天吧

想添加一些角色 **来聊天吧** 时的对话，可以在 `LangMod/**/Dialog/` 文件夹中准备一个 `dialog.xlsx` 表格。

此表格的格式与游戏的对话表格 **Elin/Package/_Elona/Lang/_Dialog/dialog.xlsx** 相同，但你只需 `unique` 表和包含你角色 ID 的那一行。

![](./assets/unique.png)

此处 ID 和角色 ID 相同。

::: warning 格式
dialog.xlsx的文本数据从表格第5行开始，而非源表格式的第4行。
:::

## 剧情

剧情是通过多选项对话和附加动作构成的丰富交互系统。

剧情部分已移至单独的章节。

<LinkCard t="剧情系统" u="/100_Mod Documentation/Custom Whatever Loader/Drama/0_basic.md" />

## 自定义传记

为了为你的角色增添更多风味，你可以使用标签 `addBio(ID)` 来指定自定义传记。传记文件是一份 JSON 文件，存放在你的 `LangMod/**/Data/` 文件夹中，名称为 `bio_ID.json`，此ID是传记文件的独特ID，例如 `addBio(MyChara)` 对应 `bio_MyChara.json`.

```json
{
    "Birthday": 11,
    "Birthmonth": 4,
    "Birthyear": 514,
    "Birthplace": "地球",
    "Birthlocation": "咩咩村",
    "Mom": "最棒的母亲",
    "Dad": "最棒的爹地",
    "Background": "背景故事",
    "FavFood": "mushroom_rare",
    "FavCategory": "mushroom",
    "LikeThing": "stethoscope",
    "LikeHobby": "martial"
}
```

+ `FavFood`: Thing表/ThingV表/Food表中的id。
+ `FavCategory`: Category表中的id。
+ `LikeThing`: 喜欢的物品id。
+ `LikeHobby`: Element表中的alias。