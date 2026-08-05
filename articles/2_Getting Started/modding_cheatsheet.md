---
title: Modding Cheatsheet
author: Drakeny
description: Quick and easy recurring knowledge for modders.
date: 2024/12/8 2:53
tags: Cheatsheet
---

# Cheatsheet

This article will be ever evolving, so its formatting may be a bit wonky.

## Where is...?

Need to know where a specific data from the game is? Here are your answers:

### Game Log (Player.log)

> [!Important] %localappdata%low/Lafrontier/Elin/Player.log
> :::info In addition to the path above, you can also open it by following these steps:
> In-game `ESC → Config → Other → Open error Log`
>
> Locate the Player.log file in the folder.
> :::
> If someone asks you for Player.log, please send them the entire file instead of copying the text.

### Graphical assets

#### PCC related

<!-- prettier-ignore -->
> [!Important] (SteamPath)/Elin/Package/_Elona/Actor
> The player's sprite, also known as the PCC.

#### Object/Character/Blocks/etc Sprites {#sprites}

<!-- prettier-ignore -->
> [!Important] (SteamPath)/Elin/Package/_Elona/Textures
> ::: info Access all spritesheets in-game with these steps: `Esc > Tools > Texture Viewer`.
>
> You can also check their tile number in there
>
> The tile numbers of characters in the base game of Elin correspond to the `tile` column in the `SourceChara` source sheet.
> :::

#### Portraits {#portrait}

<!-- prettier-ignore -->
> [!Important] (SteamPath)/Elin/Package/_Elona/Portraits

### Game Data

Elin records most of the game data in **Source Sheets**.

For detailed instructions on Source Sheets, please head over to the `Source Sheets` section in the Menu.

#### Source Game

> [!Important]Contains the sheets for:
> `Elements`, `Formulas(Calc)`, `Stats`, `Checks`, `Factions`, `Religions`, `Zones`, `Zone Affixes`, `Quests`, `Areas`, `Home Resources`, `Research` and `Persons`.
> <LinkCard t="SourceGame.xlsx" u="https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_"/>

#### Source Chara

> [!Important]Contains the sheets for:
> `Characters(Chara)`, `Barks (CharaTalk)`, `Tactics`, `Races`, `Jobs` and `Hobbies`.
> <LinkCard t="SourceChara.xlsx" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn"/>

#### Source Card

> [!Important] Contains the sheets for:
> `Things`, `Foods`, `Recipes`, `SpawnLists`, `Categories`, `Collectables` and `KeyItems`.
> <LinkCard t="SourceCard.xlsx" u="https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z"/>

#### Exporting Source Sheets Manually

> [!Important] Exporting Source Sheets Manually
> When launched with the `-exportsource` parameter in Steam, Elin will automatically export the source sheet data into CSV files and save them to the (SteamPath)/Elin/SourceExport directory.
>
> ::: details Detailed Steps and Troubleshooting
> 1. Right-click Elin in Steam, then click Properties
> 2. Enter `-exportsource` in Launch Options
> 3. After launching the game, CSV files will appear in the (SteamPath)/Elin/SourceExport directory
>
> Troubleshooting:
> 
> If the export fails, please try disabling all mods and restarting the game. The [Mod Viewer](#mod-viewer) allows you to disable all mods with one click.
> 
> If text appears garbled, please see [Opening CSV UTF-8 files correctly in Excel](https://support.microsoft.com/Excel/opening-csv-utf-8-files-correctly-in-excel)
> :::

### Mod Files

#### Mod Viewer

> [!Important] Mod Viewer
> :::info You can open the Mod Viewer by following these steps:
> In-game `ESC → Tool → Mod Viewer`
>
> After opening the Mod Viewer, click on a mod, then click `Open in explorer`
> to find the mod files.
> :::
> Mod file names containing `[Local]` are local mods located in the package folder.
>
> Mods subscribed from the Workshop will be in the workshop folder.

## How do I...?

### Add/Replace a portrait

> [!Important] To add a new portrait:
> Create a subfolder called `Portrait` in your mod folder and add your new portrait image.
>
> <LinkCard t="Portrait" u="15_Texture Mods/portraits.md" />

> [!Important] To replace a portrait:
> Create a subfolder called `Portrait` in your mod folder and add the image you want to replace with the name of the portrait you want to replace
>
> Eg.: `portrait/UN_adv_gaki.png` will replace the portrait of the adventurer Gaki.
>
> <LinkCard t="Portrait" u="15_Texture Mods/portraits.md" />

### Replace a Sprite

> [!Important] To replace a sprite: 
> Use in game tool `Esc > Tools > Texture Viewer` .
>
> Middle-click to zoom in, left-click and drag

> [!Important] You can also replace a sprite by this:
> Create a subfolder called `Texture Replace` in your mod folder and add the sprite image you want to replace using the name of the spritesheet and tile of the sprite you want to replace.
>
> Eg.: `Texture Replace/objC_2115.png` will replace the sprite of the adventurer Gaki.
> ::: info You can find the spritesheet names and tile numbers in [**Texture Viewer**](#sprites)  

For the complete content, please head over to the `Texture Mods` section in the Menu.  <!--Menu=总目录=メニュー。Texture Mods=贴图模组=テクスチャMOD--> 


