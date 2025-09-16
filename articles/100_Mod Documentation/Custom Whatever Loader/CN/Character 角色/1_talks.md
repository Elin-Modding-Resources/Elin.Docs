---
title: 对话与剧情
date: 2025/1/3 01:00
hide: true
---

## 喊叫

在某些情况下, 角色会触发特定的对话并作为气泡显示在其头顶。

![](./assets/bark.png)

这些对话写在 **CharaText** 表格中, 而你的角色则在 **idText** 单元格中填入该对话的 ID 将其链接。

![](./assets/charatext.png)

|单元格|calm|fov|aggro|dead|kill|
|-|-|-|-|-|-|
|触发|冷静|视线|激怒|亡语|击杀|

您还可以在每个条目中插入 [自定义音频](../Other%20其他/sound) 标签，使其成为有声音的喊叫，例如，`"你不能通过！！<sound=gandalf,0.8>"` 在触发此喊叫时，有80%的概率播放ID为 `gandalf` 的音频。

## 对话

想添加一些角色**来聊天吧**时的对话, 可以在 `LangMod/**/Dialog/` 文件夹中准备一个 `dialog.xlsx` 表格。

![img](./assets/dialog.png)

此表格的格式与游戏的对话表格 **Elin/Package/_Elona/Lang/_Dialog/dialog.xlsx** 相同, 但你只需 `unique` 表格和包含你角色 ID 的那一行。

![](./assets/unique.png)

此处 ID 和角色 ID 相同。

::: warning 格式
数据从表格第5行开始。
:::

## 剧情

剧情是通过多选项对话和附加动作构成的丰富交互系统。

![](./assets/drama_eg.png)

要为角色定义自定义剧情, 请使用 `addDrama_剧情表名称` 标签, CWL将自动定向该剧情。

自定义剧情表必须放置在 `LangMod/**/Dialog/Drama/` 文件夹下, 且名称需与标签匹配。例如：使用 `addDrama_drama_example` 时需对应`Dialog/Drama/drama_example.xlsx`文件。

**<span class="text-amber-300">重要</span>**: 您只需提供 **1** 份剧情表，它可以放置在任何语言子文件夹中。CWL支持在同一表格内提供多语言的本地化。

制作时可参考游戏内置剧情表 **Elin/Package/_Elona/Lang/_Dialog/Drama**, 或含有模板的Tiny Mita范例：
<LinkCard t="CWL范例：Tiny Mita" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3396774199" i="https://raw.githubusercontent.com/gottyduke/Elin.Plugins/refs/heads/master/CwlExamples/TinyMita/preview.jpg" />

![img](./assets/drama.png)

::: tip 热重载
剧情表支持在游戏运行时编辑保存后热重载。
:::

### 基础结构

剧情表按从上至下顺序执行, 由多行剧情单元构成。每行剧情单元包含以下列(由首行定义)：

- `step`：标记后续行为剧情步骤起点, 直至遇到下一个step标记
- `jump`：执行该行时跳转的目标步骤
- `if`/`if2`：执行条件。若同时存在`if2`列, 则需同时满足两个条件
- `action`：执行的动作
- `param`：动作参数
- `actor`：当前说话角色 ID, 用于多人对话场景。默认 `tg`。后缀 `?` 以显示名称为 `???`
- `id`：文本行唯一标识(仅文本行必需)
- `text_XX`/`text_JP`/`text_EN`：实际对话内容。`XX` 为语言代码，例如 `text_CN`, `text_ZHTW`。`text` 列将作为缺失语言代码的备选。

剧情通过步骤串联执行, 每个步骤包含若干行剧情单元, 可混合对话/动作/条件判断。

`main`是默认起始步骤, `end`是默认结束步骤。自定义步骤名请避免使用下划线`_`或`flag`前缀, 以免与内部步骤冲突。

### 剧情动作

文本行需要玩家输入(点击/按键)继续到下一行, 动作行(`choice`除外)连续执行且不可与文本共存(若共存则忽略文本)。

常用动作：

|动作|参数|说明|
|-|-|-|
|`inject`|`Unique`|插入"Let's Talk"及一些通用步骤|
|`choice`||为文本添加选项(需配合`text`和`jump`)|
|`choice/bye`||插入默认告别选项|
|`cancel`||设置右键/ESC键行为(需配合`jump`, 通常是`end`)|
|`setFlag`|flag, 值(可选)|设置flag值(默认1)|
|`reload`||重新加载剧情，以便应用当前剧情中所做的任何flag更改。需配合`jump`，通常是`main`。**这并不是指热重载，开发时热重载只需要你保存文件更改并再次打开对话即可**|
|`enableTone`||启用对话语气转换|
|`addActor`||添加角色标识(`actor`列填写新ID时自动触发)|
|`invoke`|方法名|调用方法|
|`setBG`|图片名(可选)|设置背景图(支持**Texture文件夹**自定义png), 为空时则清除|
|`BGM`|BGM ID|切换背景音乐, 详见[Sound 音频/BGM](../Other%20其他/sound)|
|`stopBGM`||停止BGM|
|`lastBGM`||停止并恢复之前BGM|
|`sound`|音频ID|播放音频, 详见[Sound 音频/BGM](../Other%20其他/sound)|
|`wait`|时长|暂停执行(秒), 通常用于等待动画效果|
|`alphaIn`|持续时间|淡入效果(秒)|
|`alphaOut`|持续时间|淡出效果|
|`alphaInOut`|持续时间, 等待时间, 持续时间|先淡入, 等待, 再淡出|
|`fadeIn`|时长, `white`/`black`(可选)|渐显(白/黑)|
|`fadeOut`|时长, `white`/`black`(可选)|渐隐|
|`fadeInOut`|持续时间, 等待时间, 持续时间|先渐显, 等待, 再渐隐|
|`hideUI`|过渡时间|隐藏界面(结束剧情时恢复)|
|`hideDialog`||隐藏对话框(需配合`wait`使用)|
|`end`||直接结束剧情|
|`addKeyItem`|[关键物品id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107)|给予玩家关键物品|
|`drop`|[物品id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439)|在玩家位置生成物品|
|`addResource`|[资源类型](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-homeresource-md), 数量|添加家园资源|
|`shake`||屏幕震动|
|`slap`||扇剧情所有者角色|
|`destroyItem`|[物品id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439)|从背包移除指定物品|
|`focus`||立即聚焦镜头到剧情所有者|
|`focusChara`|[角色id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657), 速度(可选)|移动镜头到**同地图角色**|
|`focusPC`|速度(可选)|聚焦玩家角色|
|`unfocus`||重置镜头|
|`destroy`|[角色id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657)|移除**同地图角色**|
|`save`||存档|
|`setHour`|小时数|设置游戏时间|

多参数**使用 `,`（逗号）分隔，中间不要有空格**。

### 触发条件

通过 `if`/`if2` 列添加该行的条件判断：

|条件|参数|说明|
|-|-|-|
|`hasFlag`|flag|玩家拥有非零值flag|
|`!hasFlag`|flag|玩家无flag或值为零|
|`hasMelilithCurse`||玩家有Melilith诅咒|
|`merchant`||玩家在商人公会|
|`fighter`||玩家在战士公会|
|`thief`||玩家在盗贼公会|
|`mage`||玩家在法师公会|
|`hasItem`|[物品id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439)|玩家持有指定物品|
|`isCompleted`|[任务id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=785701697#gid=785701697)|玩家已完成指定任务|

条件格式为 `条件,参数`, 支持扩展表达式：
```
=,test_flag,1
,counter,20
>,flag,0
!,flag,69
```

大多数情况下, 只需要在表格中使用 `if` 列。如果需要更复杂的条件, 可以插入一个新列, 并将首行值设置为 `if2`。

::: warning 条件判定
`if` 列**仅在剧情表加载时判定一次**，这意味着您无法动态启用/禁用行。请使用 `reload` 或 CWL 的 `invoke*` 拓展条件。
:::

## 剧情拓展

在使用剧本表内置的 `action` 时未能达到预期效果？需要更多条件检查？CWL 允许您在 DLL 中添加自定义拓展方法，并在剧本表中调用它们。

<LinkCard t="CWL剧情拓展" u="https://elin-modding-resources.github.io/Elin.Docs/articles/100_Mod%20Documentation/Custom%20Whatever%20Loader/CN/Character%20%E8%A7%92%E8%89%B2/4_drama" />

## Mod Help集成

有时您可能想为玩家提供一些提示，以便他们更好地体验您精彩的剧情故事。通过使用CWL制作模组，您可以使用Mod Help 来提供定制的帮助页面。

<LinkCard t="Mod Help" u="https://elin-modding-resources.github.io/Elin.Docs/articles/100_Mod%20Documentation/Mod%20Help/2_mod_help_cn" i="https://raw.githubusercontent.com/Drakeny/Elin.ModHelp/refs/heads/main/package/ModHelp.png" />
