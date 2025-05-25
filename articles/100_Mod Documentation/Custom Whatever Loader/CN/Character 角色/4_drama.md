---
title: 剧情拓展
date: 2025/5/24 01:00
hide: true
---

## 拓展功能

::: tip 临时版本
本节文档为临时版本，API可能随时变更。
:::

CWL 附带了一组内置的剧本拓展方法，您可以在这里[查看代码](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/API/Drama/Expansions)。

需启用 `Dialog.ExpandedActions` 配置。默认启用。

在剧情表中，你可以使用 CWL 特殊动作 `invoke*` 来调用拓展方法：
![](./assets/dramae_invoke.png)

## 参数传递

使用逗号分隔参数：

|action|param|actor|
|-|-|-|
|`invoke*`|honk_honk(arg1, arg2)|`pc`|

大多数方法还会将 `actor` 单元格作为目标角色来执行该方法，例如 `pc` 或 `tg`（剧情绑定角色），或任何有效的[角色ID](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657)。为空时默认指定 `tg`。

若同一行中的 `jump` 格存在值，则拓展方法的返回值将决定是否执行该 `jump` 指令。返回 `true` 时会执行跳转，反之则不执行。

**数值表达式**: `+5`，`*10`，`=69`，`!=114` 等用于判定或赋值的表达式。

## 拓展方法

### 动作

|方法|参数|说明|跳转|
|-|-|-|-|
|`add_item`|[物品ID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439)，[材质alias(可选)](https://docs.google.com/spreadsheets/d/13oxL_cQEqoTUlcWsjKZyNuAaITFGK56v/edit?gid=33087043#gid=33087043)(可选)，等级(可选)，数量(可选)|为`actor`添加指定物品，默认随机材质，自动等级，数量 `1`|总是|
|`add_element`|[元素alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1766305727#gid=1766305727)，等级(可选)|为`actor`添加指定元素/专长/能力，默认等级 `1`|总是|
|`join_party`||使`actor`加入队伍|总是|
|`join_faith`|[信仰ID](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=729486062#gid=729486062)(可选)|使`actor`加入信仰，为空时则退出当前信仰|成功时|
|`apply_condition`|[状态alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)，强度|为`actor`施加状态|总是|
|`cure_condition`|[状态alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|为`actor`治愈状态|成功时|
|`remove_condition`|[状态alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|为`actor`移除状态|总是|

### 演出

|方法|参数|说明|跳转|
|-|-|-|-|
|`move_next_to`|[角色ID](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657)|使`actor`移动到**同地图角色**身旁|总是|
|`move_tile`|X，Y偏移|使`actor`进行**相对坐标**移动，例如 `1,1`|总是|
|`move_zone`|[区域ID](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752)，层数(可选)|传送`actor`到指定区域，默认 `0` 层|总是|
|`play_anime`|[动画ID](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-animeid-md)|使`actor`执行动画|总是|
|`play_effect`|[特效ID](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-effects-md)|使`actor`播放特效|总是|
|`play_emote`|[表情ID](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-emo-md)|使`actor`显示表情|总是|
|`play_screen_effect`|[屏幕特效ID](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-screeneffect-md)|播放屏幕特效|总是|
|`pop_text`|文本|使`actor`发出喊叫文本(气泡框)|总是|
|`portrait_set`|立绘ID(可选)|设置`actor`对话立绘，为空时重置，支持**Portait文件夹**自定义文件，例如 `UN_doodoo2`|总是|

### 其他

|方法|参数|说明|跳转|
|-|-|-|-|
|`mod_affinity`|数值表达式|调整`actor`好感度|成功时|
|`mod_flag`|数值表达式|修改`actor`的flag值|总是|
|`mod_keyitem`|[关键物品ID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107)，数值表达式(可选)|修改玩家的关键物品值，默认 `+1`|成功时|
|`build_ext`|程序集名称|尽可能地将指定程序集中的方法添加至剧情拓展表|成功时|
|`emit_call`|ext.方法名|调用一个外部静态方法|总是|

通过`build_ext`和`emit_call`调用外部程序集方法，需启用 `Dialog.ExpandedActionsAllowExternal` 配置。默认启用。

![](./assets/dramae_ext.png)

### 条件

这些也是拓展方法(通过 `invoke*` 动作调用)，但是它们的返回值可以用于判定 `jump` 跳转。

|方法|参数|说明|跳转条件|
|-|-|-|-|
|`if_affinity`|数值表达式|检查`actor`好感度|满足时|
|`if_condition`|[状态alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|检查`actor`是否拥有状态|满足时|
|`if_element`|[元素alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1766305727#gid=1766305727)，数值表达式|检查`actor`是否拥有符合的元素|满足时|
|`if_faith`|[信仰ID](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=729486062#gid=729486062)，等级(可选)|检查`actor`是否加入特定信仰且不少于特定等级，默认 `0` 级|满足时|
|`if_flag`|数值表达式|检查`actor`的flag值|满足时|
|`if_keyitem`|[关键物品ID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107)，数值表达式(可选)|检查玩家是否拥有符合表达式的关键物品值，默认 `>0`|满足时|
|`if_race`|[种族ID](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=140821251#gid=140821251)|检查`actor`是否为对应种族|满足时|
|`if_tag`|标签|检查`actor`是否拥有标签|满足时|
|`if_zone`|[区域ID](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752)，层数(可选)|检查`actor`所在区域|满足时|

## 实现自定义方法

CWL 提供了[简单的 API](../API/Custom/drama)，允许您在自己的脚本 DLL 中添加拓展方法，甚至无需引用 CWL 的程序集。