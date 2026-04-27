---
title: Add & Replace BGM
description: Add or replace in game BGMs
date: 2025/1/3 01:00
hide: true
---

## Custom BGM

Game comes with 100+ BGMs, they are defined by a numeric ID and sound file ID. You may check them out here:
::: details BGM Items
|bgm ID|sound ID|bgm name|
<!--@include: ./assets/bgm_items.md-->
:::

## Add New BGM

Custom BGMs are placed in the **Sound/BGM** sub folder, unlike custom sounds, you need to manually edit the `id` field in the metadata JSON. Be sure to launch game once to generate the JSON files first.

Using **ogg** format is recommended for streaming loading and avoiding codec errors.

![](./assets/new_bgm.png)

The `id` is an arbitrary number, set it to larger than what game uses and make it less likely to collide with other BGM's ID. 

**Important to note,** this `id` is purely for the BGM. Your sound ID is still the file name without extension, e.g. **`BGM/MySoundFile`**

## Replace Ingame BGM

When you assign an existing ID to your BGM, then it becomes a global BGM replacement. E.g. Assigning ID `56` to the song metadata JSON, it will replace the in game BGM `056 orc01`. This is why you want your new BGM (non-replacement ones) to use a unique ID, otherwise the next BGM with the same ID will replace yours.

> `056 orc01` is the title menu BGM.