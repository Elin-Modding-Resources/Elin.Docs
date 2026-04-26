---
title: Drama File Basic
author: DK
description: Drama definitions and how to make rich dialogs.
date: 2026/4/19 17:00
tags: Guide/CWL/Drama
---

## Drama

A drama is the rich dialog that usually has options and additional actions. 

![](./assets/drama_eg.png)

## Rerouting

To give character a default drama, place `id.xlsx` in `LangMod/**/Dialog/Drama/`, using the character's ID as the file name (e.g., `tinymita.xlsx` for `tinymita`).

To use a different drama file, use the tag `addDrama_DramaFileName` to the character's source row. CWL will automatically reroute to `Dialog/Drama/DramaFileName.xlsx` (e.g., `addDrama_MyCharaDrama` with `MyCharaDrama.xlsx`).

**<span class="text-amber-300">Important</span>**: Only one copy of the sheet is needed. It can be in any language folder, CWL supports in-file localization.

Refer to the game's sheets in `Elin/Package/_Elona/Lang/_Dialog/Drama`, or the Tiny Mita example for a template.

<LinkCard t="CWL Example: Tiny Mita" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3396774199" i="https://raw.githubusercontent.com/gottyduke/Elin.Plugins/refs/heads/master/CwlExamples/TinyMita/preview.jpg" /> 

::: tip Hot Reload
You can edit drama sheets during gameplay. Changes apply the next time a dialog opens.
:::

## Definition

A drama sheet is read top to bottom and consists of multiple lines. Each line has these fields (defined in the first row):

* **step**: Marks the start of a step; all following lines belong to this step until another `step` appears.
* **jump**: The step to jump to after this line runs.
* **if / if2**: Conditions to check before execution. If `if2` is present, both must be true.
* **action**: The action to perform.
* **param**: Parameters for the action.
* **actor**: The speaker. Defaults to `tg`. Add `?` to display as `???`.
* **id**: Unique ID, required only for `text` and `choice` lines. Do not set it for other lines.
* **text_XX / text_JP / text_EN / text**: Dialogue content. `XX` is a language code (e.g., `text_CN`, `text_RU`). `text` is the fallback if a language is missing.
  
(Click to zoom)
![img](./assets/drama.png)

Drama flow is organized into steps. Each step contains one or more lines, which can include dialogue, actions, with conditions.

`main` is the default starting step, and `end` exits the drama.

When creating a sheet, avoid creating step names starting with `_` or `flag` to prevent conflicts with internal steps.

## Mod Help Integration

Sometimes you may want to provide a bit of hint for players, so they can better experience your awesome drama story. By making mods with CWL, you already gain access to Mod Help, check it out to deliver custom made help pages!

<LinkCard t="Mod Help" u="/100_Mod Documentation/Mod Help/0_mod_help.md" i="https://raw.githubusercontent.com/Drakeny/Elin.ModHelp/refs/heads/main/package/ModHelp.png" />
