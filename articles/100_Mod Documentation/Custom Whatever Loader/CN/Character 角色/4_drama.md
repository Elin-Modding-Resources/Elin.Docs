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

大多数方法还会将 `actor` 单元格作为目标角色来执行该方法，例如 `pc` 或 `tg`（剧情绑定角色），或任何有效的[角色id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657)。为空时默认指定 `tg`。

若同一行中的 `jump` 格存在值，则拓展方法的返回值将决定是否执行该 `jump` 指令。返回 `true` 时会执行跳转，反之则不执行。

**数值表达式**: `+5`, `*10`, `=69`, `!=114` 等用于判定或赋值的表达式。

## 拓展方法

### 动作

|方法|参数|说明|跳转条件|
|-|-|-|-|
|`add_item`|[物品id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439), [材质alias](https://docs.google.com/spreadsheets/d/13oxL_cQEqoTUlcWsjKZyNuAaITFGK56v/edit?gid=33087043#gid=33087043)(可选), 等级(可选), 数量(可选)|为`actor`添加指定物品，默认随机材质，自动等级，数量 `1`|总是|
|`join_party`||使`actor`加入队伍|总是|
|`join_faith`|[信仰id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=729486062#gid=729486062)(可选)|使`actor`加入信仰，为空时则退出当前信仰|成功时|
|`apply_condition`|[状态alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)，强度|为`actor`施加状态|总是|
|`cure_condition`|[状态alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|为`actor`治愈状态|成功时|
|`remove_condition`|[状态alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|为`actor`移除状态|总是|
|`build_ext`|程序集名称|尽可能地将指定程序集中的方法添加至剧情拓展表|成功时|
|`emit_call`|ext.方法名|调用一个外部静态方法|总是|

通过 `build_ext` 和 `emit_call` 调用外部程序集方法，需启用 `Dialog.ExpandedActionsAllowExternal` 配置。默认启用。

![](./assets/dramae_ext.png)

### 演出

|方法|参数|说明|跳转条件|
|-|-|-|-|
|`move_next_to`|[角色id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657)|使`actor`移动到**同地图角色**身旁|总是|
|`move_tile`|X, Y偏移|使`actor`进行**相对坐标**移动，例如 `1,1`|总是|
|`move_zone`|[区域id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752)，层数(可选)|传送`actor`到指定区域，默认 `0` 层|总是|
|`play_anime`|[动画id](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-animeid-md)|使`actor`执行动画|总是|
|`play_effect`|[特效id](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-effects-md)|使`actor`播放特效|总是|
|`play_emote`|[表情id](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-emo-md)|使`actor`显示表情|总是|
|`play_screen_effect`|[屏幕特效id](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-screeneffect-md)|播放屏幕特效|总是|
|`pop_text`|文本|使`actor`发出喊叫文本(气泡框)|总是|
|`portrait_set`|立绘id(可选)|设置`actor`对话立绘，为空时重置，支持**Portrait**文件夹自定义立绘，例如 `UN_myChara_happy.png` 则使用 `happy` 或 `UN_myChara_happy`|总是|
|`show_book`|书籍id, 类别(`Book` 或 `Scroll`)|打开一本书籍, 支持**LangMod/_*_*/Text**文件夹，例如 `Text/Book/ok.txt` 则使用 `(ok, Book)`|成功时|

### 修改

|方法|参数|说明|跳转条件|
|-|-|-|-|
|`mod_affinity`|数值表达式|调整`actor`好感度|成功时|
|`mod_currency`|货币种类, 数值表达式|为`actor`修改指定的货币。`money` `money2` `plat` `medal` `influence` `casino_coin` `ecopo`|总是|
|`mod_element`|[元素alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1766305727#gid=1766305727), 强度(可选)|为`actor`修改指定元素(特质/抗性/技能等)，默认强度 `1`，不同类型的元素使用的强度不同|总是|
|`mod_element_exp`|[元素alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1766305727#gid=1766305727)，数值表达式|为`actor`修改指定元素的经验值|成功时|
|`mod_fame`|数值表达式|修改玩家的名声|总是|
|`mod_flag`|flag, 数值表达式|修改`actor`的flag值|总是|
|`mod_keyitem`|[关键物品alias](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107)，数值表达式(可选)|修改玩家的关键物品值，默认 `=1`|成功时|

### 条件

这些也是拓展方法(通过 `invoke*` 动作调用)，但是它们的返回值可以用于判定 `jump` 跳转。

|方法|参数|说明|跳转条件|
|-|-|-|-|
|`if_affinity`|数值表达式|检查`actor`好感度|满足时|
|`if_condition`|[状态alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|检查`actor`是否拥有状态|满足时|
|`if_currency`|货币种类, 数值表达式|检查`actor`是否拥有符合的货币。`money` `money2` `plat` `medal` `influence` `casino_coin` `ecopo`|满足时|
|`if_element`|[元素alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1766305727#gid=1766305727), 数值表达式|检查`actor`是否拥有符合的元素|满足时|
|`if_faith`|[信仰id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=729486062#gid=729486062), 奉献等级(可选)|检查`actor`是否加入特定信仰且不少于特定等级，默认 `0` 级|满足时|
|`if_fame`|数值表达式|检查玩家名声|满足时|
|`if_flag`|flag, 数值表达式|检查`actor`的flag值|满足时|
|`if_keyitem`|[关键物品alias](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107), 数值表达式(可选)|检查玩家是否拥有符合表达式的关键物品值，默认 `>0`|满足时|
|`if_race`|[种族id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=140821251#gid=140821251)|检查`actor`是否为对应种族|满足时|
|`if_tag`|标签|检查`actor`是否拥有标签|满足时|
|`if_zone`|[区域id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752), 层数(可选)|检查`actor`所在区域|满足时|

有三种特殊的复合条件，它们将上述条件作为参数：

|方法|示例|跳转条件|
|-|-|-|
|`and`|`and(if_flag(flag1, >0), if_flag(flag2, <0))`|全部满足时|
|`or`|`or(if_race(lich), if_race(snail))`|任意满足时|
|`not`|`not(if_zone(dungeon), if_zone(field), if_zone(underground))`|全部不满足时|

::: tip `if_flag` 还是 `hasFlag`？
`if` 列中的 `hasFlag` 是一个静态条件，**仅在剧情表加载时判定一次**，这意味着之后更改的flag值不会产生影响，除非使用 **`reload`** 动作或 **重新打开剧情表**。CWL 的 `if_flag()` 扩展条件是动态的，也可以用于剧情分支。  
:::

## 实现自定义方法

CWL 提供了[简单的 API](../API/Custom/drama)，允许您在自己的脚本 DLL 中添加拓展方法，甚至无需引用 CWL 的程序集。