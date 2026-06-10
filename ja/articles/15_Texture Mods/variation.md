---
title: Sprite Variations
author: DK
description: How to add directional, skinsets, and snow variations.
date: 2026/4/9 9:00
tags: Texture/Variation
---

# Variation Is Not Mandatory

Variations are applied when provided and conditions are met, but they are not mandatory. The base sprite always works.

You can provide a variation by adding a corresponding suffix to your sprite filename.

For example, when `id` is `doorframe_arch` :

+ `doorframe_arch.png`
+ `doorframe_arch_snow.png`
+ `doorframe_arch_dir0.png`
+ `doorframe_arch_dir0_snow.png`
+ `doorframe_arch_skin1_snow.png`
+ `doorframe_arch_skin1_dir3_snow.png`
+ ...

The variation system works with [custom skins](./skins), character sprites, and [animated sprites](./animation).

::: warning Don't Forget the Base Sprite
Even if you provide variations, you still need to provide a base sprite, `myCustomID.png`.
:::

The following introduces the various variations.

## Chara Skinsets

These are gender-dependent textures in pairs, selected randomly during character creation.

### When Character Gender Is Random

**Example 1: Single Skinset Pair**

For example, to give `ninja` one sprite for male and a different sprite for non-male, put `0,1` into the `tiles` column in the Excel, then provide `ninja_skin0.png` and `ninja_skin1.png` as variations. (where "ninja" is the character ID)

**Example 2: Multiple Skinset Pairs**

You can add more pairs to support additional skinsets. 

For example, to give an NPC 6 sprites (3 images for male and 3 images for non-male): 
+ provide sprites `_skin0` to `_skin5`.
+ Then, put `0,1,2,3,4,5` into the `tiles` column in the Excel.

One of the pairs will be picked randomly. Even indices are male, and odd indices are non-male (female and ???).

There is no limit to how many variations you can define.

### When Character Gender Is Fixed to One Type

If your character has a non-random gender but you still wish to provide random skin variations, you can use the same skin index in each pair. 

For example, to use three sprites ( `_skin0`, `_skin1`, `_skin2`), you need to put `0,0,1,1,2,2` into the `tiles` column of the Excel.

There is no limit to how many variations you can define.

### Note

Counting starts from 0.

## Directional Sprites

This is usually needed for furniture. You can provide up to 4 directional variations with `id_dir0.png`, `id_dir1.png`, `id_dir2.png`, and `id_dir3.png`. Each direction is optional and can be skipped.

Characters can also use directional sprites; however, it is not recommended.

## Snow Variation

You can provide an `id_snow.png` variation to enable automatic switching in snow zones or winter.

## Suffix Order

The above variations can all be combined, but pay attention to the suffix order, which is as follows:

+ `_skinN_dirN_snow`
+ `_skinN_snow`
+ `_dirN_snow`
+ `_snow`
