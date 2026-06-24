---
title: Zone 区域
author: DK
description: 如何创建新的区域表和地图。
date: 2026/6/16 01:00
tags: SourceSheet/Zone
---

# 区域表 (Zone)

<LinkCard t="SourceGame/Zone" u="https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_" />

制作源表时，请务必复制官方源表的前三行，并将数据录入始于第四行。切勿更改列的顺序。

## 表格列

|列|类型|描述|
|-|-|-|
|id|文本|区域的唯一标识符。若与官方条目或其他模组的条目 ID 相同，最后加载的表格将覆盖之前的。此值不能包含空格 — 如有需要请使用 `snake_case` 风格，例如 `mymod_zone_funk_house`。|
|parent|文本|上级区域的 ID。|
|name_JP|文本|日文显示名称。|
|name|文本|英文显示名称。其他语言请使用 [`SourceLocalization`](./localization)。|
|type|文本|区域的 C# 类型名称。可以使用现有的 Zone 类型或 DLL 中的 Zone 子类。如果用代码（DLL）来自定义类型，请参见下方 [自定义区域类型](#自定义区域类型)。|
|LV|整数|危险等级。|
|chance|整数|当 `tag` 包含 `random` 时，作为随机地点生成的权重。|
|faction|文本|该区域所属的派系 ID。|
|value|整数|用于家园排行榜的区域价值。|
|idProfile|文本|区域配置文件 ID；决定地图的生成方式。|
|idFile|文本|放置在 **Maps** 文件夹中的地图文件名。为空时，将使用随机地图。|
|idBiome|文本|生物群系类型。|
|idGen|文本|地下城生成器类型。未使用。|
|idPlaylist|文本|播放列表。目前自定义播放列表需要 CWL。|
|tag|文本|应用于该区域的标签列表，以逗号分隔。常见标签请参见下方 [标签参考](#标签参考)。|
|cost|整数|未使用。|
|dev|整数|默认区域发展等级。|
|image|文本|未使用。|
|pos|整数[]|区域在世界地图上的位置，格式为 `x,y,iconID`。第三个值 `iconID`的查找方法请参见下方 [世界图标ID](#世界图标id)。|
|questTag|文本|该区域可能出现的任务类型。若为玩家派系区域则忽略。|
|textFlavor_JP|文本|进入区域时显示的描述文字（日文）。|
|textFlavor|文本|进入区域时显示的描述文字（英文）。其他语言请使用 [`SourceLocalization`](./localization)。|
|detail_JP|文本|区域的描述（日文）。|
|detail|文本|区域的描述（英文）。其他语言请使用 [`SourceLocalization`](./localization)。|

## 标签参考

`tag` 列中常用的标签：

|标签|描述|
|-|-|
|`addMap`|自动将该地图生成到世界中。|
|`return`|即使不是玩家的家园区域，也可用作归还地点。|
|`tech`|商人库存背景使用科技风格的箱子。|
|`light`|即使不是玩家派系区域，也启用照明。|
|`random`|允许该区域作为世界地图上的随机地点出现。|
|`closed`|将该区域标记为封闭/无法进入。|

## 世界图标ID

`pos` 列使用 `x,y,iconID` 格式。第三个值 `iconID` 是游戏内置图块集中世界地图图标的数字 ID。将鼠标悬停在下方的图块上可查看每个图标的 ID，然后在 `pos` 列中使用。

目前尚未支持来自外部精灵的自定义区域图标。

::: details 图块查看器
<TilesetViewer src="/assets/world.png" />
:::

此外，确定区域的 `x,y`坐标时，可使用控制台命令 `mod.get_pos`来得到当前玩家角色所处的大地图坐标。

## 自定义区域类型

你可以使用在 C# DLL 中定义的自定义区域类型。

```cs
public class Zone_MyFunkHouse : Zone_Civilized
{
    // overrides
}
```

基类必须派生自 `Zone`，你可以自由选择使用哪种 `Zone` 类型。

## 创建地图！

noa 原话：
> 所有地图的创建——比如放置NPC、家具，铺设方块——完全在游戏内的建造模式（开发模式）中进行。地图完成后，我使用 F1 键的 "Export Map" 功能导出。然后在 SourceGame.xlsx 的 Zone 表中复制一个已有的区域条目，修改 id、name、type、pos 等字段，并将 idFile 设为我刚导出的地图文件名。基本上，向游戏中添加新地图就只有这些步骤。

你可以通过控制台命令 `mod.elin_dev` 或使用 `-dev` 参数启动游戏来进入开发模式。
