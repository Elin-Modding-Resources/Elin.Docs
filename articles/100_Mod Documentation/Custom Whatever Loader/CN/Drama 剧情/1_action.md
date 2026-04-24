---
title: 剧情动作
author: DK
date: 2026/4/19 17:00
hide: true
---

## 剧情动作

文本行需要玩家输入(点击/按键)继续到下一行, 动作行(`choice`除外)自动执行且不可与文本共存(若共存则忽略文本)。

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

多参数使用 `,` **半角逗号**分隔，中间不要有空格。

## 内置跳转

执行 `inject/Unique` 动作后，会有大量内置的剧情步骤被注入当前剧情表。要使用它们，只需将它们设置为 `jump` 目标即可。有些步骤已经在默认的 `inject/Unique` 对话中使用了，你无需再次使用。

|步骤名称|用途|
|-|-|
|`_banish`|结束剧情|
|`_bye`|结束剧情|
|`_toggleSharedEquip`|切换 `tg` 的共享装备状态|
|`_daMakeMaid`|将 `tg` 设为女仆|
|`_joinParty`|如果 `tg` 的特质允许加入，则将其设为队伍成员。**这不是邀请！**|
|`_leaveParty`|将 `tg` 从队伍移除，并送回据点区域|
|`_makeLivestock`|将 `tg` 设为派系家畜|
|`_makeResident`|将 `tg` 设为派系居民|
|`_depart`|将 `tg` 从派系移除|
|`_rumor`|查看流言|
|`_sleepBeside`|切换 `tg` 是否在玩家旁睡觉|
|`_disableLoyal`|切换 `tg` 忠诚心状态|
|`_suck`|`tg` 吸血或者吸猫。**优先吸血，其次吸猫**|
|`_insult`|切换 `tg` 嘲讽状态|
|`_makeHome`|将当前区域分支设为 `tg` 的家|
|`_invite`|尝试邀请 `tg` 成为同伴，会检查玩家属性和 `tg` 可邀请状态。无条件邀请入队请使用CWL拓展动作[`join_party()`](./3_invoke#动作)|
|`_Guide`|引导玩家前往一系列地点|
|`_tail`|纯洁的肉体关系|
|`_whore`|有金钱交易的肉体关系|
|`_bloom`|加深与 `tg` 的羁绊|
|`_buy`|从 `tg` 购买物品|
|`_buyPlan`|从 `tg` 购买研究图纸|
|`_give`|给 `tg` 物品|
|`_blessing`|对队伍施加祝福|
|`_train`|与 `tg` 进行技能训练|
|`_changeDomain`|改变 `tg` 的领域|
|`_revive`|复活死亡的同伴|
|`_buySlave`|从 `tg` 购买奴隶|
|`_trade`|与 `tg` 交换物品|
|`_identify`|与 `tg` 鉴定物品|
|`_identifyAll`|与 `tg` 鉴定所有物品|
|`_identifySP`|与 `tg` 使用高级技能鉴定物品|
|`_bout`|发起决斗|
|`_news`|在地图上生成随机地城|
|`_heal`|治疗玩家|
|`_food`|从 `tg` 购买食物|
|`_deposit`|向 `tg` 存款|
|`_withdraw`|向 `tg` 取款|
|`_copyItem`|与 `tg` 复制物品|
|`_extraTax`|缴纳额外税金|
|`_upgradeHearth`|升级炉石|
|`_sellFame`|出售声望|
|`_investZone`|投资当前区域|
|`_investShop`|投资 `tg` 的商店|
|`_changeTitle`|更改玩家称号|
|`_buyLand`|扩展当前区域地图|
|`_disableMove`|使 `tg` 无法移动|
|`_enableMove`|使 `tg` 可以移动|
