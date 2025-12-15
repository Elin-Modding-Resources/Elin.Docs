---
title: Drama Expansion (Invoke*)
date: 2025/5/24 01:00
hide: true
---

## Expanded Drama Invoke*

::: tip Temporary Version
This part of documentation is a partially written stub, and API usages may change at any time.
:::

CWL comes with a small set of built-in drama expansion methods, which you can [checkout code here](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/API/Drama/Expansions).

This feature requires the CWL configuration value `Dialog.ExpandedActions` set to `true`, enabled by default.

In the drama sheet, you can use the CWL special action `invoke*` or `i*` for short to call expansion method:
![](./assets/dramae_invoke.png)

## Parameter Passing

Parameters are separated by comma `, ` and written within the parentheses of the expansion method, similar to code syntax:

|action|param|actor|
|-|-|-|
|`invoke*`/`i*`|honk_honk(arg1, arg2)|`pc`|

Most of the methods also take `actor` cell as the target character to execute the method on, such as `pc` or `tg`(the drama owner character), or any valid [character id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657). Default is `tg`.

If the `jump` in the same line has any value, then the return value of the expansion method will be used to determine if the `jump` will be executed. Returns `true` will execute the `jump`, otherwise not.

**Value Expression**: `+5`, `*10`, `=69`, `!=114` etc, used to evaluate or assign values.

|Expression|Meaning|
|-|-|
|`69`|Assign value `69`|
|`=69`|Assign value `69`|
|`+5`|Increase original value by `5`|
|`-3`|Decrease original value by `3`|
|`*10`|Multiply original value by `10`|
|`/2`|Divide original value by `2`|
|`==69`|Check if equal to `69`|
|`!=114`|Check if not equal to `114`|
|`>10`|Check if greater than `10`|
|`>=20`|Check if greater than or equal to `20`|
|`<5`|Check if less than `5`|
|`<=3`|Check if less than or equal to `3`|

## Actions

|method|param|description|jump|
|-|-|-|-|
|`add_item`|[item id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439), [material alias](https://docs.google.com/spreadsheets/d/13oxL_cQEqoTUlcWsjKZyNuAaITFGK56v/edit?gid=33087043#gid=33087043)(optional), level(optional), count(optional)|Add the item with id to `actor`, default random material, auto level, and count of `1`|always|
|`equip_item`|[item id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439), [material alias](https://docs.google.com/spreadsheets/d/13oxL_cQEqoTUlcWsjKZyNuAaITFGK56v/edit?gid=33087043#gid=33087043)(optional), level(optional)|Equip the item with id on `actor`, default random material, auto level|always|
|`join_party`||Make `actor` join player party|always|
|`join_faith`|[religion id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=729486062#gid=729486062)(optional)|Make `actor` join the specific religion with id or leave the current religion with empty value|If success|
|`apply_condition`|[condition alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246), power|Apply a condition with id to `actor`, default power `100`|always|
|`cure_condition`|[condition alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|Cure the condition on `actor`|If cured|
|`remove_condition`|[condition alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|Remove the condition on `actor`|always|
|(deprecated, use `eval`)`build_ext`|assembly partial name|Attempt to add static methods from assembly to drama expansion table|If success|
|(deprecated, use `eval`)`emit_call`|ext.method|Invoke an external static method|always|

`build_ext` and `emit_call` requires the CWL configuration value `Dialog.ExpandedActionsAllowExternal` set to `true`, enabled by default.

![](./assets/dramae_ext.png)

## Scene Play

|method|param|description|jump|
|-|-|-|-|
|`move_next_to`|[character id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657)|Move `actor` next to character with id **on the same map**|always|
|`move_tile`|x, y|Move `actor` with **relative** tile offset, such as `1, 1` or `2, -1`|always|
|`move_to`|x, y|Move `actor` to **absolute** tile offset, such as `1, 1` or `2, -1`|always|
|`move_zone`|[zone id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752), level(optional)|Move `actor` to a specific zone with id, and specific level, default `0`|always|
|`play_anime`|[anime id](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-animeid-md)|Play animation on `actor`|always|
|`play_effect`|[effect id](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-effects-md)|Play effect on `actor`|always|
|`play_emote`|[emote id](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-emo-md)|Play emote on `actor`|always|
|`play_screen_effect`|[screen effect id](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-screeneffect-md)|Play screen effect|always|
|`pop_text`|text|Pop a text bubble above `actor` head|always|
|`portrait_set`|portrait id(optional)|Set `actor` portrait in dialog to the specific one or reset with empty value, from **Portrait** folder, e.g. `UN_myChara_happy.png` could be set with `happy` or `UN_myChara_happy`|always|
|`show_book`|book id, category(`Book` or `Scroll`)|Open a book, supports **LangMod/_*_*/Text** folder, for example `Text/Book/ok.txt` would use `(ok, Book)`|If success|

## Modifications

|method|param|description|jump|
|-|-|-|-|
|`console_cmd`|cmd param1 param2...|Run console command|always|
|`destroy_item`|[item id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439), number|Remove `number` of items from `actor`|always|
|`mod_affinity`|value expression|Modify `actor` affinity with value expression|If success|
|`mod_currency`|currency type, value expression|Modify `actor` currency with value expression. `money` `money2` `plat` `medal` `influence` `casino_coin` `ecopo`|always|
|`mod_element`|[element alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1766305727#gid=1766305727), power(optional)|Modifies a specified element (feat/resistance/skill, etc.) for the `actor`, default power `1`. Different types of elements use different power scaling|always|
|`mod_element_exp`|[element alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1766305727#gid=1766305727), value expression|Modifies the exp of a specified element for the `actor`|If success|
|`mod_fame`|value expression|Modify player fame with value expression|always|
|`mod_flag`|flag, value expression|Modify the flag value from `actor` with value expression, such as `+1`, `=1`, `0`. This supports non player character|always|
|`mod_keyitem`|[keyitem alias](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107), value expression(optional)|Modify player's keyitem value with expression, default `=1`|If success|

## Conditions

These are still expansion methods that uses `invoke*` action same as above, but their return value is important.

|method|param|description|jump|
|-|-|-|-|
|`choice`|expanded condition|Conditionally enable a choice line, such as `choice(if_lv(>=10))`. It's **recommended** to use `choice` action (instead of `invoke*`) with param set to expanded action![](./assets/drama_c.png)|If satisfies|
|`eval`|C# script|Executes the C# script or file with `<<<path.cs` syntax. It's **recommended** to use `eval` action (instead of `invoke*) with param set to the C# script![](./assets/drama_eval.png)|If returns `true`|
|`if_affinity`|value expression|Check `actor` affinity with expression, such as `<5`, `>=90`, `!=0`|If satisfies|
|(deprecated, use `eval`)`if_cint`|[CINT index](https://elin-modding-resources.github.io/Elin-Decompiled/classCINT.html), value expression|Check `actor` CINT value with expression|If satisfies|
|(deprecated, use `eval`)`if_cs_get`|C# member name, value expression(optional)|Check `actor` C# class member value with expression. Value expression can be omitted for `bool` members, or a string for `string` members. See [Chara](https://elin-modding-resources.github.io/Elin-Decompiled/classChara.html) and its base class [Card](https://elin-modding-resources.github.io/Elin-Decompiled/classCard.html)|If satisfies|
|`if_condition`|[condition alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|Check if `actor` has active condition with alias|If active|
|`if_currency`|currency type, value expression|Check `actor` currency with value expression. `money` `money2` `plat` `medal` `influence` `casino_coin` `ecopo`|If satisfies|
|`if_element`|[element alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1766305727#gid=1766305727), value expression|Check `actor` element with expression|If satisfies|
|`if_faith`|[religion id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=729486062#gid=729486062), reward rank(optional)|Check if `actor` is certain religion and above reward rank, default `>0`|If satisfies|
|`if_fame`|value expression|Check player's fame with value expression|If satisfies|
|`if_flag`|flag name, value expression|Check `actor` flag value with expression, such as `=5`, `1`, `!=0`|If satisfies|
|`if_has_item`|[item id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439), value expression(optional)|Checks if `actor` possesses a quantity of the item that meets the expression, default `>=1`|If satisfies|
|`if_hostility`|hostility value expression|Checks if `actor` meets a specific hostility, such as `=Ally` or `>Enemy`. Value in ascending order: `Enemy`, `Neutral`, `Friend`, `Ally`|If satisfies|
|`if_in_party`||Check if `actor` is in player's party|If satisfies|
|`if_keyitem`|[keyitem alias](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107), value expression(optional)|Check if player has keyitem with expression, default `>0`|If satisfies|
|`if_race`|[race id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=140821251#gid=140821251)|Check if `actor` is of certain race|If satisfies|
|`if_tag`|tag|Check if `actor` has certain tag defined in Chara row|If defined|
|`if_zone`|[zone id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752), level(optional)|Check if `actor` is in certain zone and optionally check level|If present|

There are 3 special composite conditions where you put the above condition as parameter:

|method|example|jump|
|-|-|-|
|`and`|`and(if_flag(flag1, >0), if_flag(flag2, <0))`|If all satisfies|
|`or`|`or(if_race(lich), if_race(snail))`|If any satisfies|
|`not`|`not(if_zone(dungeon), if_zone(field), if_zone(underground))`|If none satisfies|

::: tip `if_flag` or `hasFlag`?
`hasFlag` in `if` column is a static condition, which only gets evaluated **once on drama load**, which means your flag value changes later won't reflect unless using **`reload`** action or **reopening the drama**. CWL's `if_flag()` expansion condition is dynamic and can be used for branching.
:::

## Implementing Your Own

CWL offers [easy API to add expansion methods](../API/Custom/drama) in your own script DLL, without even needing to reference CWL's script assembly.
