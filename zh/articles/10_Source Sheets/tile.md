---
title: Tile 瓦片
author: DK
description: Block、Floor、Obj、Deco、CellEffect 五张地图瓦片源表的列参考。
date: 2026/9/6 18:30
tags: SourceSheet/Tile
---

# 瓦片表 (Block / Floor / Obj / Deco / CellEffect)

<LinkCard t="SourceBlock (Block / Floor / Obj / Deco / CellEffect / Material)" u="https://docs.google.com/spreadsheets/d/13oxL_cQEqoTUlcWsjKZyNuAaITFGK56v/edit" />

五张瓦片表的大部分列是共用的。放在地图格子上的一切——一面墙、一块地板、一株作物、一张地毯、一个装饰、一层液体效果——都是其中某张表里的一行。

**制作源表时，必须完整复制官方源表的前三行，并将你的数据从第四行开始录入。**

::: details 关于列、空行和空格子
**缺少的列会被填成空值。** 列顺序不同时按表头名匹配。

**空格子不等于空值**：它会取**你自己这张表**第 3 行的值。这就是必须复制前三行的原因。第 3 行留空的话，`_tileType` 变成空、该行永远不会出现在建造菜单，`category` 变成空、回退到 `obj`，诸如此类。

**`id` 留空的那一行会让整张表在那里截止。** 不要在数据中间留空行。
:::

## ID 与 alias

`id` 用任意正整数都行。**256–65535** 是最合适的区间：存档文件会更小。**避开 Elin 本体使用的区间 0–255。**

+ 两个 mod 用了同一个 id 会互相覆盖那一行，后加载的赢。
+ `alias` 必须唯一，凡是按名字引用这一行的地方都会使用：贴图文件名、`defBlock` / `bridgeBlock` / `autoFloor`、种子。建议加上你的 mod 前缀。

## 共用列

|列|类型|描述|
|-|-|-|
|id|整数|唯一的数字 id，见上文。|
|alias|文本|唯一的名字，贴图、跨表引用和种子都靠它。|
|name_JP / name|文本|显示名。**两个都要填**；`name` 只在日语以外的语言下作为回退。|
|sort|整数|在建造菜单页签里的位置。留空 = 排在上一行之后，所以 mod 的行会排到最后。|
|reqHarvest|文本[]|拆除它需要的 `技能,等级`：`mining`、`digging`、`gathering` 或 `lumberjack`。留空时回退到该表的默认值。|
|hp|整数|坚固程度；hp 越高，挖掘越久。|
|_tileType|文本|瓦片类型。Block：`Block`、`Wall`、`WallOpen`、`Fence`、`FenceClosed`、`HalfBlock`、`Slope`、`Stairs`、`Pillar`、`BlockDeco`。Floor：`Floor`、`FloorWater`、`FloorWaterShallow`、`FloorWaterDeep`、`Bridge`。Obj：`Obj`、`ObjBig`、`ObjHuge`、`Tree`、`Road`、`Chasm`、`WallMount`、`WallHang`、`Roof`、`Door`、`ObjWater`……拼错会让该行从建造菜单消失。|
|_idRenderData|文本|瓦片怎么画，也就决定了格子尺寸：Block 留空 / `block_thin` / `fence` / `halfblock`（64×64），Floor 留空 / `floor_obj`（64×48），Obj `obj`（64×64）、`obj_S` / `obj_S flat`（32×32）、`obj_L` / `obj_LV`（80×64）。|
|tiles|整数[]|精灵表里的格子号（`行*100+列`，就是纹理查看器显示的数字）。放了 `Texture/<表名>/<alias>.png` 就留空，游戏会自己填。负数表示水平翻转。|
|anime|整数[]|`帧数,毫秒[,循环[,音效]]` 动画。只对 Floor / Deco / CellEffect 有效；Obj 行会忽略它。|
|snowTile|整数|Block：保持默认（屋顶积雪）。Obj：`>0` 时被雪盖住不显示，改显示一种雪地地面。|
|colorMod|整数|材质颜色对美术的染色强度。`100` = 和 vanilla 一样染色，`0` = 原样显示（手绘作物请用 `0`）。|
|colorType|文本|Block / Obj：`alt` 改用材质的第二种颜色染色，`random` 随机取色。|
|value|整数|基础价值。|
|LV|整数|需要的制作技能等级。|
|recipeKey|文本[]|`*` = 玩家第一次打开对应工作台时自动学会；`-` = 不会作为随机配方出现；商店名（`Starter`、`Loytel`……）= 在那里作为配方卷轴出售。|
|factory|文本[]|工作台的物品 id：`factory_wall`、`factory_block`、`factory_floor`、`workbench`。`self` = 快速制作，`x` = 永不列出，`none` = 不可制作。不是物品的 id 会让配方被禁用。|
|components|文本[]|材料：`id[/数量]`；`,` 分隔多种材料；`\|` 表示可替代；`id@tag` 要求带某个 tag（`chunk@soil/1`）；`$` 标记决定颜色的材料；`#` 表示分类；`+` 表示可选。留空或 `-` = 一根原木。写错会让配方被丢弃。|
|defMat|文本|图标和地图生成用的材质 alias。`!alias` 锁定材质。**不是**玩家建出来的东西的材质——那由玩家选的材料决定。|
|category|文本|建造菜单页签：`wall`、`fence` → 墙；`foundation`；`floor`、`floor_field` → 地板；`obj`；`deco`。未知值回退到 `obj`。|
|tag|文本[]|标记。Floor：`noFloor`、`noBridge`、`noSnow`、`noTransition`、`beach`、`snowtile`、`nonGradient`。Obj：`autotile`、`seed`、`crop`、`rareSeed`、`crime`。通用：`hiddenRecipe`、`oneblock_only`。|
|detail_JP / detail|文本|说明文字。|

### Block

|列|类型|描述|
|-|-|-|
|idThing|文本|拆除方块时得到的物品（`block`、`wall`、`fence`）。|
|roof|整数|方块紧邻房间时使用的屋顶样式。|
|autoFloor|文本|挖掉方块后留下的地板 alias（留空 = 原始地面；未知 alias 会改用 `floor_raw`）。|
|concrete / transparent|布尔|建造相关的标记；照抄相近的官方行。|
|transition|整数[]|坡道/过渡格；`-1` = 无。|
|soundFoot|文本|脚步声 id。|

### Floor

|列|类型|描述|
|-|-|-|
|defBlock|文本|地板被转成方块时使用的方块 alias。**必填**（大多数行是 `block_raw`）。未知 alias 会改用默认方块。|
|bridgeBlock|文本|用这种地板架桥时桥下柱子的方块 alias（`pillar31`）。|
|soundFoot|文本|脚步声 id（`wood`、`dirt`、`carpet`……）。|
|autotilePriority|整数|两块相邻地板中由哪一块绘制它们之间的过渡边。|
|idBiome|文本|地图生成用的生物群系 id。必须存在。|

每个地板行都会附带一个桥配方，除非 `tag` 含 `noBridge` 或 `factory` 是 `x`。

### Obj

|列|类型|描述|
|-|-|-|
|_growth|文本[]|`类型,阶段帧,收获帧,收获物,最大数量`——见[生长](#growth)。|
|costSoil|整数|种植时消耗的土壤。|
|objType|文本|`resource`、`crop`、`tree`、`plant`。只有 `crop` 有实际作用（种子的食物加成），其余只是标签。|
|vals|整数[]|`vals[0]` = 用哪个种子图标（种子物品皮肤列表里的编号）。|
|valType|文本|`None`、`Growth` 或 `Material`。拼错按 `None` 处理。|
|matCategory|文本|仅地图生成时用的随机材质池。|
|chance|整数|在随机种子池里的权重（`tag` 含 `seed` 的行）。|

## 建造菜单

Block / Floor / Obj 行满足以下全部条件才会出现在建造菜单：

1. `_tileType` 是真实的瓦片类型（不为空，不是 `Marker`）；
2. `factory` 是工作台的物品 id（`factory_wall`、`factory_block`、`factory_floor`、`workbench`），不是 `x` / `none`；
3. 玩家**已学会**该配方。`recipeKey` = `*` 时玩家第一次打开那个工作台就会学会；否则可以通过挖掘同类瓦片领悟，或购买卷轴（`recipeKey` = 商店名）；
4. `category` 对应你正在看的页签。

`components` 决定材料，玩家选的材料决定成品的材质。

## 生长 {#growth}

`_growth = 类型,阶段帧,收获帧,收获物,最大数量` 能把一个 Obj 变成作物、树或杂草。`类型` 是生长类型：`Crop`、`Wheat`、`Rice`、`Tree`、`Weed`、`Flower`、`Herb`、`Rose`、`Cactus`、`Cha`、`Kinoko`、`Berry`、`Pasture`、`Seaweed`……类型写错时该行只是不会生长。

+ **阶段**：植物会随时间推进阶段；大多数类型的最后一个阶段是枯萎。
+ **收获**得到 `收获物`（物品 id，或 `#分类` 表示该分类的随机物品），1 到 `最大数量` 个。铲掉植物会掉落 `components` 的最后一项。
+ **种子**不需要单独的物品行：vanilla 的 `seed` 物品会记住它种的是哪个 Obj。往 `tag` 加 `seed`（想要食物加成就把 `objType` 设为 `crop`），`vals` 填种子图标，`chance` 填随机种子池权重。`rareSeed` 会把它排除在随机池之外。
+ **贴图**：把各阶段画成一条条带放在 `Texture/Obj/<alias>.png`，`阶段帧` / `收获帧` 填条带里的帧号（从 0 起）。各类型的帧排布见[纹理替换与瓦片贴图](/zh/articles/15_Texture%20Mods/replacement#growth)。如果你用的是纹理替换槽位，这两项就是槽位号。

带 7 帧条带的最小小麦型作物：

|id|alias|name_JP|name|_growth|costSoil|objType|vals|tag|_idRenderData|colorMod|components|defMat|
|-|-|-|-|-|-|-|-|-|-|-|-|-|
|3006|mymod_wheat|麦|my wheat|`Wheat,0,5,wheat,2`|30|crop|2|crop,seed|obj|0|grass|grass|

## 材质

材质是单独一张表，自己没有贴图；见[材质](/zh/articles/10_Source%20Sheets/material)。新矿石只需要一行 Material：`category` = `ore`、`tier`、`chance` 和颜色 tag——vanilla 的矿脉会自动使用它并染色。

## 本地化

`name` / `name_JP` 覆盖英语和日语。其他语言由游戏在首次启动时（或在 mod 查看器里点**导出文本**）往你的 mod 目录写一份 `LangMod/<语言>/SourceLocalization.json`，每条文本一个键，例如 `SourceBlock.mymod_wall.name`；把值填上即可。

## 常见坑

+ 你表里的第 3 行是默认行。从官方表复制过来。
+ 贴图和种子都必须有 `alias`；vanilla 很多行留空，你不要留空。
+ `factory` 必须是存在的物品 id，`components` 必须写对；否则配方会消失。
+ `defBlock` / `bridgeBlock` / `autoFloor` 必须是存在的 alias；写错会换成兜底值。
+ 不要给 Obj 行写 `anime`；自带 PNG 的行不要自己填 `tiles`。
+ 游戏启动时会重建一切；改完 xlsx 或 PNG 之后重启游戏即可。
