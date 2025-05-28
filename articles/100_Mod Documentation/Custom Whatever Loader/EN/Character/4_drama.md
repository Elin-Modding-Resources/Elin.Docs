---
title: Drama Expansion
date: 2025/5/24 01:00
hide: true
---

## Expanded Drama Actions

::: tip Temporary Version
This part of documentation is a partially written stub, and API usages may change at any time.
:::

CWL comes with a small set of built-in drama expansion methods, which you can [checkout code here](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/API/Drama/Expansions).

This feature requires the CWL configuration value `Dialog.ExpandedActions` set to `true`, enabled by default.

In the drama sheet, you can use the CWL special action `invoke*` to call expansion method:
![](./assets/dramae_invoke.png)

## Parameter Passing

Parameters are separated by comma `, ` and written within the parentheses of the expansion method, similar to code syntax:

|action|param|actor|
|-|-|-|
|`invoke*`|honk_honk(arg1, arg2)|`pc`|

Most of the methods also take `actor` cell as the target character to execute the method on, such as `pc` or `tg`(the drama owner character), or any valid [character id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657). Default is `tg`.

If the `jump` in the same line has any value, then the return value of the expansion method will be used to determine if the `jump` will be executed. Returns `true` will execute the `jump`, otherwise not.

**Value Expression**: `+5`, `*10`, `=69`, `!=114` etc, used to evaluate or assign values.

## CWL Methods

### Actions

|method|param|description|jump|
|-|-|-|-|
|`add_item`|[item id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439), [material alias](https://docs.google.com/spreadsheets/d/13oxL_cQEqoTUlcWsjKZyNuAaITFGK56v/edit?gid=33087043#gid=33087043)(optional), level(optional), count(optional)|Add the item with id to `actor`, default random material, auto level, and count of `1`|always|
|`join_party`||Make `actor` join player party|always|
|`join_faith`|[religion id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=729486062#gid=729486062)(optional)|Make `actor` join the specific religion with id or leave the current religion with empty value|if success|
|`apply_condition`|[condition alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246), power|Apply a condition with id to `actor`, default power `100`|always|
|`cure_condition`|[condition alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|Cure the condition on `actor`|if cured|
|`remove_condition`|[condition alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|Remove the condition on `actor`|always|
|`build_ext`|assembly partial name|Attempt to add static methods from assembly to drama expansion table|if success|
|`emit_call`|ext.method|Invoke an external static method|always|

`build_ext` and `emit_call` requires the CWL configuration value `Dialog.ExpandedActionsAllowExternal` set to `true`, enabled by default.

![](./assets/dramae_ext.png)

### Scene Play

|method|param|description|jump|
|-|-|-|-|
|`move_next_to`|[character id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657)|Move `actor` next to character with id **on the same map**|always|
|`move_tile`|x, y|Move `actor` with **relative** tile offset, such as `1, 1` or `2, -1`|always|
|`move_zone`|[zone id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752), level(optional)|Move `actor` to a specific zone with id, and specific level, default `0`|always|
|`play_anime`|[anime id](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-animeid-md)|Play animation on `actor`|always|
|`play_effect`|[effect id](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-effects-md)|Play effect on `actor`|always|
|`play_emote`|[emote id](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-emo-md)|Play emote on `actor`|always|
|`play_screen_effect`|[screen effect id](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-screeneffect-md)|Play screen effect|always|
|`pop_text`|text|Pop a text bubble above `actor` head|always|
|`portrait_set`|portrait id(optional)|Set `actor` portrait in dialog to the specific one or reset with empty value, from **Portrait** folder, e.g. `UN_myChara_happy.png` could be set with `happy` or `UN_myChara_happy`|always|
|`show_book`|book id, category(`Book` or `Scroll`)|Open a book, supports **LangMod/_*_*/Text** folder, for example `Text/Book/ok.txt` would use `(ok, Book)`|If success|

### Modifications

|method|param|description|jump|
|-|-|-|-|
|`mod_affinity`|value expression|Modify `actor` affinity with value expression|if success|
|`mod_currency`|currency type, value expression|Modify `actor` currency with value expression. `money` `money2` `plat` `medal` `influence` `casino_coin` `ecopo`|always|
|`mod_element`|[element alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1766305727#gid=1766305727), power(optional)|Modifies a specified element (feat/resistance/skill, etc.) for the `actor`, default power `1`. Different types of elements use varying strengths|always|
|`mod_element_exp`|[element alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1766305727#gid=1766305727), value expression|Modifies the exp of a specified element for the `actor`|If success|
|`mod_fame`|value expression|Modify player fame with value expression|always|
|`mod_flag`|flag, value expression|Modify the flag value from `actor` with value expression, such as `+1`, `=1`, `0`. This supports non player character|always|
|`mod_keyitem`|[keyitem id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107), value expression(optional)|Modify player's keyitem value with expression, default `+1`|if success|

### Conditions

These are still expansion methods that uses `invoke*` action same as above, but their return value is important.

|method|param|description|jump|
|-|-|-|-|
|`if_affinity`|value expression|Check `actor` affinity with expression, such as `<5`, `>=90`, `!=0`|if satisfies|
|`if_condition`|[condition alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|Check if `actor` has active condition with alias|if active|
|`if_currency`|currency type, value expression|Check `actor` currency with value expression. `money` `money2` `plat` `medal` `influence` `casino_coin` `ecopo`|if satisfies|
|`if_element`|[element alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1766305727#gid=1766305727), value expression|Check `actor` element with expression|if satisfies|
|`if_faith`|[religion id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=729486062#gid=729486062), reward rank(optional)|Check if `actor` is certain religion and above reward rank, default `>0`|if satisfies|
|`if_fame`|value expression|Check player's fame with value expression|if satisfies|
|`if_flag`|flag name, value expression|Check `actor` flag value with expression, such as `=5`, `1`, `!=0`|if satisfies|
|`if_keyitem`|[key item id](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107), value expression(optional)|Check if player has key item with expression, default `>0`|if satisfies|
|`if_race`|[race id](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=140821251#gid=140821251)|Check if `actor` is of certain race|if satisfies|
|`if_tag`|tag|Check if `actor` has certain tag defined in Chara row|if defined|
|`if_zone`|[zone id](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752), level(optional)|Check if `actor` is in certain zone and optionally check level|if present|

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
