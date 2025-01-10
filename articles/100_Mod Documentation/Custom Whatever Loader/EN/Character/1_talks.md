---
title: Dialog & Drama
date: 2025/1/3 01:00
hide: true
---

## Barks

Sometimes you want the character to banter/bark at certain conditions. They barks pop up above character's head.

![](./assets/bark.png)

These barks are written in **CharaText** sheet, and your Chara sheet uses **idText** to link their IDs together.

![](./assets/charatext.png)

|Cell|calm|fov|aggro|dead|kill|
|-|-|-|-|-|-|
|Condition|Random default|On sight|In combat|Death rattle|Kill confirmed|

## Dialog

To add some chatty chat texts to the character, you'll need to have a `dialog.xlsx` sheet in your `LangMod/**/Dialog/` folder.

![img](./assets/dialog.png)

The sheet format is the same as game's dialog sheet at **Elin/Package/_Elona/Lang/_Dialog/dialog.xlsx**, but you only need the `unique` sheet and the row with your character's ID.

## Drama

A drama is the rich dialog that usually has options and additional actions. 

![](./assets/drama_eg.png)

To define a custom drama for the character, use tag `addDrama_DramaSheetName` and CWL will reroute the drama automatically.

Your custom drama sheet must be placed in your `LangMod/**/Dialog/Drama/` folder, and the name must match the tag. For example, use `addDrama_MyCharaDrama` with `Dialog/Drama/MyCharaDrama.xlsx`.

You may reference the game drama sheets when making your own at **Elin/Package/_Elona/Lang/_Dialog/Drama**, or the Tiny Mita example which has a template drama sheet:
<LinkCard t="CWL Example: Tiny Mita" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3396774199" />

![img](./assets/drama.png)

::: tip Hot Reload
Drama sheet can be edited and hot reloaded during game play.
:::
