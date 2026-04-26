---
title: Built-In Actions
author: DK
description: Drama system and how to make rich dialogs.
date: 2026/4/19 17:00
tags: Guide/CWL/Drama
---

## Built-In Actions

**Text lines** are the most common. They only fill `text` and `id` (optionally `if` condition). They require player input (click or key press) to advance.

**Action lines** (except `choice`) execute automatically without input. If both `action` and `text` are present, `text` is ignored.

For example, an action line placed after a text line won't execute until the text line is clicked to advance.

|action|param|description|
|-|-|-|
|`inject`|`Unique`|Insert "Let's Talk" and a lot of useful steps|
|`choice`||Add a choice to the last text line. Requires `text` and `jump`|
|`choice/bye`||Insert a default bye choice|
|`cancel`||Set right click / escape key behavior. Requires `jump`, usually set to `end`|
|`setFlag`|flag name,value(optional)|Set a flag with value or default 1 if not provided|
|`reload`||Reload the drama so any flag changes made in the current drama can be applied. Requires `jump`, usually set to `main`. Don't confuse this with hot reload during development - for that you only need to save the changes and it will be reloaded next time you start the drama|
|`enableTone`||Enable dialog tone for the entire drama|
|`addActor`||Add a drama actor to use later, `text` can be used to set a name override. This is done automatically when you fill in new id in `actor` cell. Requires [character id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657) in `actor`|
|`invoke`|method name|Call a method. All of them are hardcoded for specific use. Check CWL Expansion below|
|`setBG`|image name(optional)|Set an image as background or use empty to clear it. CWL allows you to supply your own png image in **Texture** folder|
|`BGM`|BGM id|Switch the BGM to specific one by id. Check the [CWL Sound & BGM page](../Other/sound) for custom BGM|
|`stopBGM`||Stop the BGM and do not continue|
|`lastBGM`||Stop the BGM and continue the last one played|
|`sound`|sound id|Play a sound by id. Check the [CWL Sound & BGM page](../Other/sound) for custom sounds|
|`wait`|duration|Pause the execution in this line for seconds, good to use when you want the animation or stuff to finish|
|`alphaIn` `alphaOut`|duration|Alpha transition(transparency) in seconds|
|`alphaInOut`|duration,wait time|`alphaIn` first, wait in seconds, then `alphaOut`|
|`fadeIn` `fadeOut`|duration,`white`/`black`(optional)|Fade transition in seconds|
|`fadeInOut`|duration,wait time,`white`/`black`(optional)|`fadeIn` first, wait in seconds, then `fadeOut`|
|`hideUI`|transition|Hide the HUD elements with a transition in seconds. Restored when exiting drama|
|`hideDialog`||Hide the drama dialog so you can do cutscenes, however text lines force show dialogs, so you need to combine this with `wait`|
|`end`||Explicitly end the drama. Same as `jump` to drama step `end`|
|`addKeyItem`|[keyitem id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107)|Add keyitem with id to the player|
|`drop`|[item id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439)|Drop an item as reward at player's position|
|`addResource`|[resource name](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-homeresource-md),count|Add home resource by count|
|`shake`||Shake the screen|
|`slap`||Slap the drama owner character|
|`destroyItem`|[item id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439)|Find and destroy the item with id from player's inventory|
|`focus`||Immediately move and focus camera to the drama owner character|
|`focusChara`|[character id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657),speed(optional)|Move and focus camera to the character with id **on the same map**|
|`focusPC`|speed(optional)|Move and focus camera to the player|
|`unfocus`||Reset and unfocus camera|
|`destroy`|[character id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657)|Destroy a character with id **on the same map**|
|`save`||Save game|
|`setHour`|hour|Set the game time in hours|

When providing multiple parameters, they are **separated by comma(`,`) with no spaces in between**.

## Built-In Steps

After executing `inject/Unique` action, a lot of builtin drama steps will be injected into current drama sheet. To utilize them, simply set them as the `jump` target. Some steps are already used in the default `inject/Unique` dialogues and you do not need to re-use them on your own.

|step name|usage|
|-|-|
|`_banish`|End the drama|
|`_bye`|End the drama|
|`_toggleSharedEquip`|Toggle `tg` shared equipment usage|
|`_daMakeMaid`|Set `tg` as maid|
|`_joinParty`|If `tg` trait is joinable, set as party member. **THIS IS NOT INVITING**|
|`_leaveParty`|Remove `tg` from party, and sent to home zone|
|`_makeLivestock`|Set `tg` as faction livestock|
|`_makeResident`|Set `tg` as faction resident|
|`_depart`|Remove `tg` from faction|
|`_rumor`|Rumor|
|`_sleepBeside`|Toggle `tg` sleep beside player state|
|`_disableLoyal`|Toggle `tg` loyal state|
|`_suck`|`tg` sucks pc. **Prioritizes blood sucking over cat huffing**|
|`_insult`|Toggle `tg` taunt state|
|`_makeHome`|Set current zone branch as `tg` home branch|
|`_invite`|Try inviting `tg` as ally, checks player attributes and `tg` invitable state. To unconditionally invite as ally, use CWL drama action [`join_party()`](./3_invoke#actions)|
|`_Guide`|Guide player to a list of locations|
|`_tail`|Have sex, for money|
|`_whore`|Have sex, cost money|
|`_bloom`|Deepen bond with `tg`|
|`_buy`|Buy stuff from `tg`|
|`_buyPlan`|Buy research plan from `tg`|
|`_give`|Give stuff to `tg`|
|`_blessing`|Blessing upon party|
|`_train`|Train skills with `tg`|
|`_changeDomain`|Change `tg` domain|
|`_revive`|Revive dead allies|
|`_buySlave`|Buy slave from `tg`|
|`_trade`|Trade items with `tg`|
|`_identify`|Identify items with `tg`|
|`_identifyAll`|Identify all items with `tg`|
|`_identifySP`|Identify items with `tg` using superior skill|
|`_bout`|Challenge to a duel|
|`_news`|Spawn a random dungeon on map|
|`_heal`|Heal the player|
|`_food`|Buy some food from `tg`|
|`_deposit`|Deposit with `tg`|
|`_withdraw`|Withdraw with `tg`|
|`_copyItem`|Duplicate item with `tg`|
|`_extraTax`|Pay additional tax|
|`_upgradeHearth`|Upgrade hearth stone|
|`_sellFame`|Sell fame|
|`_investZone`|Invest current zone|
|`_investShop`|Invest `tg` barter shop|
|`_changeTitle`|Change player title|
|`_buyLand`|Expand current zone map|
|`_disableMove`|Set `tg` to not move|
|`_enableMove`|Set `tg` can move|
