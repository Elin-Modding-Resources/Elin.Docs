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

### Graphical assets

#### PCC related

<!-- prettier-ignore -->
> [!Important] (SteamPath)/Elin/Package/_Elona/Actor

#### Object/Character/Blocks/etc Sprites {#sprites}

<!-- prettier-ignore -->
> [!Important] (SteamPath)/Elin/Package/_Elona/Textures
> ::: info Access all spritesheets in-game with these steps: `Esc > Tools > Texture Viewer`.
> You can also check their tile number in there
> :::

#### Portraits {#portrait}

<!-- prettier-ignore -->
> [!Important] (SteamPath)/Elin/Package/_Elona/Portraits

### Game Data

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

## How do I...?

### Replace a portrait

> [!Important] To replace a portrait:
> Create a subfolder called `Portrait` in your mod folder and add the image you want to replace with the name of the portrait you want to replace
> Eg.: `portrait/UN_adv_gaki.png` will replace the portrait of the adventurer Gaki.
> ::: info You can find the name of the originals [**here**](#portrait)
> :::

### Add a new portrait

> [!Important] To add a new portrait:
> Create a subfolder called `Portrait` in your mod folder and add your new portrait image.
> Eg.: `portrait/my_portrait.png`

### Replace a Sprite

> [!Important] To replace a sprite:
> Create a subfolder called `Texture Replace` in your mod folder and add the sprite image you want to replace using the name of the spritesheet and tile of the sprite you want to replace.
> Eg.: `Texture Replace/objC_2115.png` will replace the sprite of the adventurer Gaki.
> ::: info You can find the spritesheet names and tile numbers [**here**](#sprites)
> :::
