---
title: Thing 物品
author: SamInJapan
description: Thing 源表列参考。
date: 2025/1/10 16:00
tags: SourceSheet/Thing
---

# 物品表 (Thing)

<LinkCard t="SourceCard/Thing" u="https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=654432269#gid=654432269" />

制作源表时，请务必复制官方源表的前三行，并将数据录入始于第四行。切勿更改列的顺序。

## 表格列

|列|类型|描述|
|-|-|-|
|id|文本|物品的唯一标识符。|
|name_JP|文本|日文显示名称。|
|name|文本|英文显示名称。|
|unknown_JP|文本|日文高品质物品未鉴定时的名称。也可能是特殊属性，例如：`#randomBook`、`#randomPotion`。|
|unit_JP|文本|日文量词（助数词）。参见下方 [Unit JP](#unit-jp)。|
|unit|文本|物品的物理形态。参见下方 [Unit](#unit)。|
|unknown|文本|英文高品质物品未鉴定时的名称。也可能是特殊属性，例如：`#randomBook`、`#randomPotion`。|
|category|文本|物品所属的类别。用于自动存放和配方菜单（关联 `Category` 表）。|
|sort|整数|排序顺序。例如 `2200` 会将其归入弓的排序范围。|
|_tileType|文本|地图上的显示方式。参见下方 [Tile Type](#tile-type)。|
|_idRenderData|文本|物品在地面的放置方式与裁剪。参见下方 [idRenderData](#idrenderdata)。|
|tiles|整数|替换纹理的图块 ID。多个图块遵循：正面 → 正面翻转 → 背面 → 背面翻转。例如：`123,-123,456,-456`。|
|altTiles|整数|替代状态的变体图块（例如装有物品的关闭宝箱）。|
|anime|整数[]|两个值：`帧数,每帧持续时间`。当 `idRenderData`列使用@obj 且使用[动画贴图](../15_Texture%20Mods/animation)时，不需要填写此列。|
|skins|整数|皮肤变体引用。当 `idRenderData`列使用@obj 且使用[贴图变体](../15_Texture%20Mods/variation)时，不需要填写此列。|
|size|整数[]|大型物体的网格尺寸：`高度,宽度`。|
|colorMod|整数|颜色饱和度修正。|
|colorType|文本|颜色来源：`default`（第一个合成材料）、`alt`（第二个材料）、`random`（随机）。|
|recipeKey|文本|配方获取方式：`*` = 默认已知；角色 ID = 由该角色出售。|
|factory|文本|制作该物品的工作台。参见下方 [Factory](#factory)。|
|components|文本|合成材料。参见下方 [Components](#components)。|
|disassemble|文本|分解后产出的物品。|
|defMat|文本|默认材质（例如 `oak`）。决定图标/预览的颜色。|
|tierGroup|文本|升级/进阶的层级分组。|
|value|整数|基础售价（奥伦）。|
|LV|整数|制作所需的技能等级。|
|chance|文本|生成概率修正值。|
|quality|整数|物品品质等级。☆★等都是由quality列决定的。**（待补充）**|
|weight|整数|物品重量。例如：种子 = `30`、魔杖 = `500`、床 = `4500`、钢琴 = `85000`。|
|electricity|整数|电力消耗。负值表示消耗电力（例如显示器 = `-10`）。|
|trait|文本|特殊行为。参见下方 [Trait](#trait)。|
|elements|文本|来自 `Element` 表的别名，附带 `/等级`。例如 `lumberjack/4` 在游戏中显示为 `Lumberjack [****]`。|
|range|整数|武器射程（格数）。例如：短弓 = `1`、弓 = `3`、电磁炮 = `5`。|
|attackType|文本|伤害/武器类型：`Blunt`、`Bow`、`Cane`、`Claw`、`Gun`、`Pierce`、`Punch`、`Slash`。|
|offense|整数[4]|攻击属性（4 个数值）。|
|substats|整数|副属性修正。|
|defense|整数[2]|防御属性：`DV,PV`。|
|lightData|文本|发光预设。参见下方 [Light Data](#light-data)。|
|idExtra|文本|额外渲染数据引用。|
|idToggleExtra|文本|可切换的渲染数据（例如开关灯）。|
|idActorEx|文本|物体周围的环境效果。参见下方 [Ambient Effects](#ambient-effects)。|
|idSound|文本|制作时的音效：`glass`、`money`、`paper` 等。|
|tag|文本|内置行为标志。参见下方 [Tags](#tags)。|
|workTag|文本|工作相关标签。|
|filter|文本|合成以外的获取途径：`fish`、`gacha`、`supply` 等。游戏通过 `CreateFromFilter` 随机生成物品。|
|roomNameJP|文本|房间类型定义（日文）。多个条目用逗号分隔。|
|roomName|文本|房间类型定义（英文）。例如：`Bedroom` 或 `Kitchen,Dining Room`。|
|detail_JP|文本|物品描述（日文）。在游戏中显示于属性信息上方。|
|detail|文本|物品描述（英文）。在游戏中显示于属性信息上方。|

## Unit JP

`unit_JP` 列定义了该物品的日文量词（助数词）。这些不直接影响英语版本。

|汉字|罗马音|含义|
|-|-|-|
|塊|katamari|块、团|
|振り|furi|手持、近战|
|対|tai|一对（如手套）|
|台|dai|台、底座、竖琴|
|挺|tei|细长物体（枪、剪刀、锄头等）|
|発|hatsu|弹药|
|本|hon|本体、基础物体|
|枚|mai|薄片|
|粒|tsubu|颗粒|
|巻|maki|卷状物|
|冊|saku|册子|
|錠|jou|药片|
|隻|seki|船只|
|束|taba|捆、束|
|体|karada|形态、雕像|
|袋|fukuro|袋装|
|張|chou / hari|张、拉紧|
|杯|hai|杯|
|匹|biki|（小）动物|
|品|hin|物品|

## Unit

`unit` 列定义物品的物理形态。

|值|值|值|
|-|-|-|
|bottle|box|bucket|
|bundle|can|chunk|
|feather|gift box|grand cross|
|grimoire|handful|letter|
|painting|pair|piece|
|pinch|poster|pot|
|rod|set|signboard|
|spellbook|staff|statue|
|syringe|tree|tuft|
|whip|whistle|

## Tile Type

`_tileType` 列控制物体在地图上的显示方式。

|类型|行为|
|-|-|
|ObjBig|无法越过。|
|ObjHuge|无法越过。|
|Door|需要墙壁；作为门/开口使用。|
|Slope|上下坡时改变移动速度。|
|Stairs|与 Slope 类似，但速度/高度变化更剧烈。|
|Paint|需要附着在墙上。|
|WallHang|需要附着在墙上。|
|Window|需要墙壁；在窗户应隐藏时（如建筑内部）会隐藏。|

## idRenderData

`_idRenderData` 列控制物体在地面的放置方式和裁剪行为。

### `@obj` — 自定义纹理（非替换）

用于**不使用**纹理替换的自定义物品：
- 文件名必须与 `id` 完全一致。
- 使用小写 `.png` 扩展名（`.PNG` 无效）。
- 放置在 Mod 的 `Texture` 文件夹中。

### `obj` — 纹理替换

用于使用纹理替换的物品。这会占用纹理查看器内的一个槽位，可能与其他 Mod 冲突：
- 文件名格式：`obj_tileID`（例如 `objS_5032`）。
- 使用小写 `.png` 扩展名。
- 放置在 Mod 的 `Texture Replace` 文件夹中。

### 雪地变体

|类型|非替换 (`@obj`)|替换 (`obj`)|
|-|-|-|
|普通|`ID.png`|`obj_123.png`|
|雪地|`ID_snow.png`|`objSnow_123.png`|
|小型|—|`objS_456.png`|
|小型雪地|—|`objSSnow_456.png`|

<LinkCard t="Sam 的 _idRenderData 笔记" u="/zh/articles/15_Texture%20Mods/sam_id_render_data" />

## Factory

`factory` 列定义制作该物品的工作台。如果物品不可由玩家制作，请留空。

一些示例（非全部）:
|游戏内名称|值|
|-|-|
|快速制作|`self`|
|制作台|`workbench`|
|杂工的桌子|`factory_tinker`|
|设计台|`workbench2`|
|立牌工坊|`factory_sign`|
|木工的桌子|`factory_wood`|
|铁匠的桌子|`factory_metal`|
|铁砧|`anvil`|
|机械工的桌子|`machinebench`|
|石工的桌子|`factory_stone`|
|玻璃工的桌子|`factory_glass`|
|厨师机|`stove`|

## Components

`components` 列定义合成材料。

|语法|含义|示例|
|-|-|-|
|`id`|需要与物品ID匹配的物品。|`log`|
|`/N`|需要 N 个物品。默认为 `1`。|`log/2`|
|`@材质`|需要指定材质的物品。|`chunk@snow/10` → 10 个雪块。|
|`\|`|「或」— 选择其中一种。|`rock/2\|ingot` → 2 个岩石或 2 个锭。|
|`#类别`|从背包中选择匹配该类别的物品。|`#book` → 选择任意一本书。|

### 示例

**水井:** `rock/10,rope/3,log/2`
→ 10 个岩石材料、3 条绳索、2 根原木。

**镰刀:** `rock/2|ingot,string/1,stick/1`
→ 2 个岩石或 2 个锭、1 条线、1 根棍子。

**书架:** `plank/4,#book,#book`
→ 4 块木板、任意 2 本书。

## Trait

`trait` 列定义特殊行为。对于容器类物体，使用以下格式：

```
Container,行数,列数,背景图片,特殊说明
```

|示例|含义|
|-|-|
|`beekeep,2,2,crate,honey`|2×2 容器（木箱背景），存放蜂蜜。|
|`ChestPractice,7,5,crate`|7×5 容器（木箱背景）。|

## Light Data

`lightData` 列定义发光外观。

|值|
|-|
|`altar_machine`|
|`bonfire`|
|`fireplace`|
|`fridge`|
|`gacha`|
|`general`|
|`kiln`|
|`lamp_sun`|
|`lamp_table`|
|`light_floor`|
|`light_spot`|
|`light_stand`|
|`light_wall`|

## Ambient Effects

`idActorEx` 列定义物体周围的环境效果。

|值|效果|
|-|-|
|`amb_boat`|船只环境音。|
|`amb_crowd`|人群嘈杂声。|
|`amb_fire`|火焰噼啪声。|
|`amb_fountain`|喷泉水声。|
|`amb_smelter`|熔炉声。|

## Tags

`tag` 列分配内置行为标签。

一些标签（非全部）:
|标签|效果|
|-|-|
|`exotic`|视为珍稀物品。|
|`godArtifact`|神器。参考[自定义信仰](./religion)。|
|`noWish`|无法通过许愿获得。|
|`tourism`|计入观光物品。|
|`rareResource`|视为稀有资源。|
|`snowTile`|偏好雪地地块（如已设置雪地 obj 变体则可省略）。|
|`throwWeapon`|投掷后飞回（类似回旋镖）。|
|`noCopy`|不能复制。|
|`noShop`|在对应类型的商店中不生成。|
|`fixedElement`|固定elements附魔数值。|
|`randomElement`|浮动elements附魔数值。|

## 导入远程武器数据

有时您希望自定义您的远程武器的一些数据。枪械数据是一个 **JSON** 文件，位于您的 `LangMod/**/Data/` 文件夹中，文件名为 `EffectSetting.guns.json`。

```json
{
    "biubiu_gun": {
        "Num": 1,
        "Delay": 0.1,
        "IdEffect": "gunfire",
        "IdSprite": "ranged_gun",
        "IdSound": "attack_gun",
        "IdSoundEject": "bullet_drop",
        "Eject": true,
        "FirePos": {
            "x": 0.23,
            "y": 0.04
        },
        "CaneColor": "",
        "CaneColorBlend": false,
        "ForceLaser": false,
        "ForceRail": false,
    }
}
```

这将导入一个名为 `biubiu_gun` 的枪械数据，它应该与您的远程武器 **ID** 匹配。您也可以使用游戏中现有的武器 **ID** 来覆盖它。

这里是游戏中现有的枪械数据：
::: details Gun Data
<<< ./assets/guns.json
:::

+ `Num` 是一个爆发中的射击次数。
+ `Delay` 是动画延迟，单位为秒。
+ `IdEffect` 是**枪口特效的 ID**。您可以使用[自定义特效](../15_Texture%20Mods/effects)。默认值是 `gunfire`。激光和法杖不使用此值。
+ `IdSprite` 是**投射物贴图的名称**，它需要是游戏中现有的贴图，或者您放置在 **Texture** 文件夹中的贴图。激光不使用此值。
+ `IdSound` 是**射击声音的 ID**。您可以使用[自定义声音](../20_Sound%20Mods/0_sound)。这可以为所有类型的枪械设置。
+ `IdSoundEject` 是**弹壳弹出声音的 ID**。您可以使用[自定义声音](../20_Sound%20Mods/0_sound)。这可以为所有类型的枪械设置。
+ `Eject` 决定是否有**弹壳弹出动画**。这可以为所有类型的枪械设置。
+ `FirePos` 是**枪口效果相对于武器中心的位置偏移**。这可以为所有类型的枪械设置。
+ `CaneColor` 是**法杖类武器可选的颜色覆盖**，留空则使用武器默认元素的颜色。格式为 `RRGGBB` 十六进制字符串。只有带有 `ToolRangeCane` **特性**的枪械才能使用此值。
+ `CaneColorBlend` 启用**法杖类武器的默认颜色和覆盖颜色混合**。只有带有 `ToolRangeCane` **特性**的枪械才能使用此值。
+ `ForceLaser` **强制**枪械使用**激光动画**(在 23.206 Nightly 版本中添加)。如果枪械带有 `ToolRangeGunEnergy` 特性，则不需要此项。
+ `ForceRail` **强制**枪械使用**电磁炮动画**。**对于带有 `ToolRangeGunEnergy` 特性的枪械来说，这不再是默认行为。**

任何您希望使用默认值的属性都可以省略。

您可以在此文件中添加任意数量的枪械数据，只需用 `,` **半角逗号**将它们分开，例如：

```json
{
    "biubiu_gun": { 
        data 
    },
    "rainbow_wand": {
        data
    }
}
```

### 指定插槽

您可以通过在物品表 Thing 中使用标签 `addSocket` 和 `addSocket(附魔alias)` 来指定枪械插槽。例如，`addSocket,addSocket,addSocket(bane_god)` 将确保添加两个空插槽和一个带有附魔 `God Bane` 的插槽。

您还可以使用 `noRandomSocket` 标签，在应用自定义插槽之前移除所有随机生成的插槽。
