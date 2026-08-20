---
title: Zone 区域
author: DK
description: 如何创建新的区域表和地图。
date: 2026/6/16 01:00
tags: SourceSheet/Zone
---

# 区域表 (Zone)

<LinkCard t="SourceGame/Zone" u="https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_" />

**制作源表时，必须完整复制官方源表的前三行，并将你的数据从第四行开始录入。**

::: details 关于列、空行和空格子
**缺少的列会被填成空值**——游戏会在日志（Player.log）里输出 `#source ill-format` 警告并继续加载；列顺序被打乱时会按表头名自动重新映射。尽管如此，还是建议把官方表头整行原样复制，从源头避免这两种情况。

**`id` 留空的那一行会中止整张表的读取**，它之后的所有行都不会被载入，同样没有提示。除非你是有意为之，否则不要用空行给数据分组。

**空格子不等于空值**——游戏会回落到第 3 行的默认值。本表的默认值有：`type`=`Zone`、`LV`=1、`chance`=100、`idBiome`=`Plain`、`dev`=0、`image`=`default`。

你也可以改第 3 行的默认值，让它作用到其余所有行。你的数据应从第 4 行开始录入。
:::

## 表格列

|列|类型|描述|
|-|-|-|
|id|文本|区域的唯一标识符。若与官方条目或其他模组的条目 ID 相同，最后加载的表格将覆盖之前的。此值不能包含空格 — 如有需要请使用 `snake_case` 风格，例如 `mymod_zone_funk_house`。|
|parent|文本|上级节点的 ID。**开新游戏**时，游戏从 `world` 开始递归建树，把每一行 `parent` 等于当前节点的条目创建为它的子节点。想挂到北堤里斯大陆上就填 `ntyris`。详见 [让区域出现在世界地图上](#让区域出现在世界地图上)。|
|name_JP|文本|日文显示名称。|
|name|文本|英文显示名称。其他语言请使用 [`SourceLocalization`](./localization)。|
|type|文本|区域的 C# 类型名称。可以使用现有的 Zone 类型或 DLL 中的 Zone 子类。如果用代码（DLL）来自定义类型，请参见下方 [自定义区域类型](#自定义区域类型)。|
|LV|整数|危险等级，写入区域的基础危险度。子楼层的危险度按 `顶层区域危险度 + abs(lv) - 1` 计算。|
|chance|整数|抽取随机地点时的权重，只有配合 `random` 标签才有意义。|
|faction|文本|该区域所属的派系 ID。|
|value|整数|用于家园排行榜的区域价值。只有 `lv == 0` 且 `value > 0` 的区域会参与排名。|
|idProfile|文本|区域配置文件 ID，决定**随机生成**的地图长什么样。区域加载了地图文件时该列不起作用。参见 [区域配置文件](#区域配置文件)。|
|idFile|文本[]|地图文件的基础名。实际只会用到第一个元素，参见 [游戏如何查找地图文件](#游戏如何查找地图文件)。找不到文件时会随机生成地图。|
|idBiome|文本|生物群系类型。必须是已存在的 `BiomeProfile` ID，填错会直接抛异常。若地图文件里的地图配置带有群系覆盖，则以地图文件为准。|
|idGen|文本|未使用。游戏中没有任何代码读取这一列——地牢生成器来自 C# 类型的 `IDGenerator` 属性。|
|idPlaylist|文本|播放列表。`lv != 0` 的区域留空时会回落到 `Underground`。目前自定义播放列表需要 CWL。|
|tag|文本[]|应用于该区域的标签列表，以逗号分隔。参见下方 [标签参考](#标签参考)。|
|costSkyTravel|整数|天空旅行（moongate）的费用，同时用作生存模式的目的地条件。|
|cost|整数|未使用。|
|dev|整数|默认区域发展等级。|
|image|文本|区域选择界面显示的图片名，从游戏内置的 `Media/Graphics/Image/Zone/` 资源中读取。留空即 `default`。不支持自定义图片。|
|pos|整数[]|区域在世界地图上的位置，格式为 `x,y,iconID`。**三个值都必须填写**——只要格子非空，游戏就会无条件读取第三个值。留空则区域被放在 `-1000,-1000`，即世界地图之外。`iconID` 的查找方法请参见下方 [世界图标ID](#世界图标id)。|
|questTag|文本[]|该区域可能出现的任务类型，每一项的格式是 `标签/权重`，例如 `deliver/7,food/8`。若为玩家派系区域则忽略本列（改用固定列表）。|
|textFlavor_JP|文本|进入区域时显示的描述文字（日文）。|
|textFlavor|文本|进入区域时显示的描述文字（英文）。其他语言请使用 [`SourceLocalization`](./localization)。|
|detail_JP|文本|区域的描述（日文）。|
|detail|文本|区域的描述（英文）。其他语言请使用 [`SourceLocalization`](./localization)。|

## 标签参考

`tag` 列可识别的标签：

|标签|描述|
|-|-|
|`addMap`|有两个作用。一是即使 `idFile` 为空，也允许该区域到模组包里去找地图文件；二是让游戏在**每次读档**时把该区域生成到世界中——因此**对已有存档同样生效**。可以指定父级：`addMap(ntyris)`（也接受旧版 CWL 写法 `addMap_ntyris`）。详见 [让区域出现在世界地图上](#让区域出现在世界地图上)。|
|`random`|允许该区域作为世界地图上的随机地点出现，按 `chance` 加权。|
|`debug`|只有在开发模式下才会被创建 / 参与随机地点抽取。适合放测试用区域。|
|`closed`|标记为封闭：从世界地图进入会被拒绝并提示 `zoneClosed`，无法快速旅行，不会被选为投递目的地，世界地图上该格还会叠加一个封闭标记。|
|`return`|即使不是玩家的家园区域，也可用作归还地点。|
|`light`|即使不是玩家派系区域，也启用照明。|
|`tech`|商人库存背景使用科技风格的箱子。|
|`iconFlag`|强制把世界地图图标换成旗帜图块，覆盖 `pos` 里的 `iconID`。|

## 世界图标ID

`pos` 列使用 `x,y,iconID` 格式。第三个值 `iconID` 是游戏内置图块集中世界地图图标的数字 ID。将鼠标悬停在下方的图块上可查看每个图标的 ID，然后在 `pos` 列中使用。

目前尚未支持来自外部精灵的自定义区域图标。

::: details 图块查看器
<TilesetViewer src="/assets/world.png" />
:::

此外，确定区域的 `x,y` 坐标时，可使用控制台命令 `mod.pos` 来得到当前玩家角色所处的大地图坐标。

## 自定义区域类型

你可以使用在 C# DLL 中定义的自定义区域类型。

```cs
public class Zone_MyFunkHouse : Zone_Civilized
{
    // overrides
}
```

基类必须派生自 `Zone`，你可以自由选择使用哪种 `Zone` 类型。

`type` 列是通过反射解析的：游戏先在本体程序集里找，再遍历所有已注册的模组程序集，按类型名匹配（程序集已注册时也支持带命名空间的全名）。**解析失败不会报任何错**——游戏会静默回落成一个普通的 `Zone`。所以当你的自定义逻辑完全没生效时，先检查拼写。

写子类时常用的钩子：

|成员|用途|
|-|-|
|`OnVisitNewMapOrRegenerate()`|地图**首次生成或首次导入**后触发。对手工地图做后处理就用它。|
|`OnActivate()`|每次玩家进入该区域都会触发。|
|`GetNewZoneID(int level)`|新建某一楼层时应使用哪一行区域数据，参见 [多层区域](#多层区域)。|
|`StartLV`|新建区域的初始 `lv`（默认 `0`）。|
|`IDGenerator`|返回非 null 时，改用 DunGen 地牢生成器生成地图。|
|`IdProfile` / `IdBiome` / `IDPlayList`|在运行时覆盖对应的源表列。|

## 创建地图！

noa 原话：
> 所有地图的创建——比如放置NPC、家具，铺设方块——完全在游戏内的建造模式（开发模式）中进行。地图完成后，我使用 F1 键的 "Export Map" 功能导出。然后在 SourceGame.xlsx 的 Zone 表中复制一个已有的区域条目，修改 id、name、type、pos 等字段，并将 idFile 设为我刚导出的地图文件名。基本上，向游戏中添加新地图就只有这些步骤。

下面按当前版本的实际行为把这套流程展开。

### 进入开发模式

用控制台命令 `mod.elin_dev`，或者带 `-dev` 参数启动游戏。`mod.elin_dev false` 可以不重启直接退出开发模式。

### 编辑地图

所有编辑都在普通的建造模式里完成。建造模式激活时可用的开发者快捷键：

|按键|作用|
|-|-|
|`F1`|打开调试命令面板（导出命令就在这里）。|
|`F2`|强制该区域重新生成——也就是重新导入地图文件。用来确认你的 `.z` 确实被读到了。|
|复制工具中的 `K` / `L`|导出 / 导入**地图片段**（`.mp`），也就是可以粘贴到其他地图里的矩形区块。地图片段存放在 `Map Piece/`，和整张区域地图不是一回事。|

### 导出地图

按 `F1` 打开面板，使用其中之一：

|命令|结果|
|-|-|
|`Export Zone`|写入 `<游戏目录>/Package/_Elona/Map/<idFile>.z`，并先把同名旧文件复制一份到 `Map/Backup/`。如果该区域的 `idFile` 为空，文件会被命名为 `_new.z`，而游戏是**刻意不会加载**这个名字的——所以**导出前先把 `idFile` 填好**。|
|`Export Zone(Dialog)`|同样的导出，但由你自己选择保存路径。|
|`Import Zone(Dialog)`|选择任意 `.z`，游戏会为它创建一个 `Zone_User`，并在你脚下放一个通往它的传送器。适合在不动源表的情况下预览别人的地图。|

::: warning 只有玩家创造物会被导出
地形（方块、地板、物件、桥、屋顶、高度、痕迹、装饰……）总是会被完整写出。**而物件与角色只有在 `isPlayerCreation` 标记为真时才会被写出**，地图生成器或调试生成命令放下的东西在导出时会被直接丢弃。

你在建造模式里自己摆的东西属于玩家创造物，所以家具一般能保住；角色通常不行。noa 自己的工具会在导出前把整张地图上的对象都打上这个标记，脚本 mod 也可以照做：

```cs
foreach (var t in EClass._map.things) t.isPlayerCreation = true;
foreach (var c in EClass._map.charas) c.isPlayerCreation = true;
```
:::

::: details .z 文件里有什么
`.z` 是一个 zip 压缩包，包含：
+ 逐格地形的字节数组（`blocks`、`floors`、`objs`、`heights`、`bridges`、`roofBlocks` 等）
+ `map` —— 序列化后的 `Map` 对象，含 `MapConfig`（群系覆盖、室内标记、场景配置、LUT、雾、天气……），但物件列表已被剥离
+ `export` —— 序列化的卡片（那些标记为玩家创造物的物件与角色）
+ `meta` —— 名称、id、tag 以及导出时的游戏版本；版本过旧会导致地图校验失败
+ `Texture Replace/` —— 该区域的本地贴图替换文件夹（如果有）
:::

### 游戏如何查找地图文件

区域首次激活时，查找顺序是：

1. `<游戏目录>/Package/_Elona/Map/<idExport>.z`，其中 `idExport` = `idFile[0]` + 非 0 楼层的 `_F<lv>` 后缀。`_new.z` 被显式排除。
2. 如果上面那个文件不存在，**且**该行的 `idFile` 非空或带有 `addMap` 标签，就依次到所有已启用的模组包里找这些相对路径：
   + `Maps/<idExport>.z`
   + `Maps/Zone_<id>@<lv>.z`
   + `Map/<idExport>.z`
   + `Map/Zone_<id>@<lv>.z`
3. 都找不到，就按 `idProfile` 随机生成。

有两点值得记住：

+ `Zone_<id>@<lv>` 这种写法（区域的*全名*）让你**完全不用填 `idFile`** 也能提供地图，只要该行带 `addMap` 标签即可。
+ 多个包提供了同一个相对路径时，**最后加载的那个**胜出。而且因为第 1 步优先级最高，`Package/_Elona/Map/` 里残留的导出文件会盖掉你 mod 里的那份——测试时记得删掉或改名。

### 打包进你的 mod

把导出的 `.z` 放进 mod 包根目录下名为 `Maps` 的文件夹，和源表放在一起：

```
MyMod/
├─ package.xml
├─ SourceGame.xlsx        (你的 Zone 行)
└─ Maps/
   ├─ mymod_funk_house.z
   └─ mymod_funk_house_F-1.z
```

::: tip 已访问过的区域会保留自己的副本
玩家一旦进入过某个区域，它的地图就被存进存档里，此后不再读取 `.z`。更新地图文件不会改变已经访问过的区域，除非它重新生成。反复调试时，要么开新档，要么在建造模式里按 `F2`。
:::

## 让区域出现在世界地图上

有两套机制，行为并不相同。

**`parent` —— 只对新游戏生效。** 创建世界时，游戏从 `world` 行开始递归，把 `parent` 指向当前节点的所有行实例化出来。所以把 `parent` 设成 `ntyris` 之类的大陆 ID，只会对*之后*创建的角色生效。带 `debug` 标签的行在非开发模式下会被跳过。已有存档不受影响。

**`addMap` —— 每次读档都执行，包括已有存档。** 对来自模组包的区域行，这个标签会注册一条自定义内容记录：每次读档时检查该区域是否已存在，不存在就创建它，并按该行的 `pos` 把它盖到大陆的世界地图上。父级按以下顺序解析：

1. 标签里带的值，例如 `addMap(ntyris)`——也接受旧版 CWL 语法 `addMap_ntyris`
2. `parent` 列
3. `ntyris`

父级是按*区域全名*查找的，所以 `Zone_<id>@<lv>` 和光写 `<id>` 都可以；如果目标楼层还不存在，会按需创建。

::: warning
`pos` 必须写满三个值，并且指向一个空闲的世界地图格。没有 `pos` 的区域会落在 `-1000,-1000`，无论用哪个标签都永远看不见也去不了。
:::

## 多层区域

### 层级模型

区域构成一棵很浅的树：`world` → 大陆 → **顶层区域** → 它的各个楼层。`lv` 为 `0` 表示地表，负数表示地下，正数表示空中。`GetTopZone()` 只向上追溯一级，所以楼层必须是顶层区域的直接子节点——**楼层里不能再套楼层**。

默认情况下，地牢的每一层都复用**同一行源表数据**，靠地图文件名上的 `_F<lv>` 后缀区分：

```
Maps/mymod_dungeon.z        →  lv  0
Maps/mymod_dungeon_F-1.z    →  lv -1
Maps/mymod_dungeon_F-2.z    →  lv -2
Maps/mymod_dungeon_F1.z     →  lv  1   （天空层）
```

全名写法同理：`Maps/Zone_mymod_dungeon@-1.z`。

没有对应地图文件的楼层会回落到随机生成——所以你完全可以只手工做入口层，让更深的楼层随机生成。

### 楼梯

`TraitStairsDown` / `TraitStairsUp`（以及它们的子类 `TraitMineEntrance`、`TraitManhole`）在使用时才解析目的地：

1. 目标层 = 当前 `lv` ∓ 1
2. `GetTopZone().FindZone(目标层)` —— 楼层已存在就直接复用
3. 否则创建：`SpatialGen.Create(GetTopZone().GetNewZoneID(目标层), 顶层区域, …)`，并把 `lv` 设为目标层

由于默认的 `GetNewZoneID` 返回的就是区域自己的 id，第 3 步会让所有楼层共用一行数据。当某一层需要不同的数据（不同的名字、类型、派系、Boss）时，在 `Zone` 子类里覆写它：

```cs
public override string GetNewZoneID(int level)
{
    if (level == -5) return "mymod_dungeon_boss";
    return base.GetNewZoneID(level);
}
```

::: tip 通常不需要手动摆返回楼梯
当两侧都不使用 DunGen 生成器时，走楼梯会排入一个进入前事件：在目标楼层的同一坐标上，按群系风格自动生成一部方向相反的楼梯。如果那一格上已经有合适方向的楼梯（或 `TraitStairsLocked`），则跳过——所以你手工摆的楼梯会被尊重。
:::

还有两种在同一顶层区域内部移动的方式：

+ `TraitElevator` —— 列出顶层区域及其所有已存在的楼层供选择。
+ `TraitTeleporter` —— 与刻印了相同 id 的其他传送器配对，先在本地图内找，再跨区域找。

### 通往另一个区域

要把玩家送到*不属于*当前区域楼层的地方，就得给 trait 传参数。`Trait.Params` 取自物件的 `trait` 源表列，或者按实例取自 `c_editorTraitVal`——后者会被前置一个逗号，所以你写的第一个值对应 `GetParam(1)`：

|参数|含义|
|-|-|
|`GetParam(1)`|目标区域 ID。对非传送类 trait，只要这个值非空，该 trait 就变成*外部区域*链接：目的地会作为当前区域的子节点创建，并标记 `isExternalZone`。|
|`GetParam(2)`|目标层级（`lv`），默认 `0`。|
|`GetParam(3)`|用于决定落点的传送标记 id。|

所以一个专用的物件行，比如 `TraitStairsDown,mymod_funk_house,0`，就是一部固定通向你那个区域的楼梯。

::: warning 实例参数在游戏内没有编辑入口
`c_editorTraitVal` 与 `c_idTrait` 只在 Unity 编辑器的 Inspector 里暴露，正式版并不带这个界面。在公开版本里，你要么定义一个把参数写死在 `trait` 列里的专用物件行，要么用脚本 mod 直接给字段赋值。

另外要注意 `TraitNewZone.OnImportMap()` 会在导入时清空 `c_uidZone`：**地图文件永远不会记住某部楼梯曾指向哪个具体的区域实例**。这个链接必须能从 trait 参数或层级运算里重新推导出来。
:::

## 区域配置文件

`idProfile` 指向 `World/Zone/Profile/` 下的一个 `ZoneProfile` 资源，只对随机生成地图的区域有意义。留空时游戏会自动选择：`lv < 0` 用 `Underground`，`lv > 0` 用 `Sky`；直接挂在大陆下的地表区域则采用世界地图上那一格所指定的配置。

内置配置包括 `Default`、`Dungeon`、`DungeonForest`、`DungeonWater`、`DungeonFactory`、`DungeonDead`、`DungeonCursedManor`、`Lesimas`、`Mine`、`Sky`、`Underground`、`U_Hill`、`U_Plain`、`U_PlainSmall`、`U_Seaside`、`U_Snow`、`U_Valley`，以及 `Random/` 系列（`Random/R_Plain`、`Random/R_Forest`、`Random/R_Mountain`、`Random/R_Shore`、`Random/R_Snow`、`Random/R_Water`、`Random/R_Undersea` 等）。它们是 Unity 资源，模组无法通过源表新增。

## 排错

|现象|可能原因|
|-|-|
|区域加载的是随机地图而不是你的地图|`idFile` 与文件名不匹配、文件不在 `Maps/` 下，或该区域在本存档中已经被访问过。|
|自定义 `Zone` 子类完全不生效|`type` 解析失败，静默回落成了普通 `Zone`。检查拼写，以及你的程序集是否已注册。|
|世界地图上什么都没有|`pos` 为空或不足三个值；或者该行既没有能从 `world` 递归到的 `parent`，也没有 `addMap` 标签。|
|区域存在但进不去|带了 `closed` 标签。|
|导入的地图里 NPC 和家具都不见了|导出时它们没有被标记为 `isPlayerCreation`。|
|某一行之后的数据全都没加载|中间有一行 `id` 是空的，读表在那里中止了。|
|楼梯走不通|解析不到目的地时会提示"什么也没发生"，通常是外部区域链接缺少 `GetParam(1)`。|
