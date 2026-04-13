---
title: Variations
author: DK
description: How to add directional, skinsets, and snow variations.
date: 2026/4/9 9:00
tags: Texture/Variation
---

# Variation Is Not Mandatory

Variations are applied when provided and conditions are met, but they are not mandatory. The base sprite always works.

You can provide a variation by adding a corresponding suffix to your sprite filename, such as:

+ `doorframe_arch.png`
+ `doorframe_arch_snow.png`
+ `doorframe_arch_dir0.png`
+ `doorframe_arch_dir0_snow.png`
+ `doorframe_arch_skin1_snow.png`
+ `doorframe_arch_skin1_dir3_snow.png`
+ ...

The variation system works with [custom skins](./skins), character sprites, and [animated sprites](./animation).

## Chara Skinsets

These are gender-dependent textures in pairs, selected randomly during creation.

For example, to give `ninja` one sprite for male and a different sprite for non-male, put `0,1` into the `tiles` column, then provide `ninja_skin0.png` and `ninja_skin1.png` as variations.

You can add more pairs to support additional skinsets. For example, for three pairs of gender-based sprites (2 images per pair, 6 in total), you need to put `0,1,2,3,4,5` into the `tiles` column. The pairs will be picked randomly. Even indices are male, and odd indices are non-male.

If your character has a non-random gender but you still wish to provide random skinsets, you can use the same skin id in each pair. For example, for three sprites, you need to put `0,0,1,1,2,2` into the `tiles` column.

There is no limit to how many variations you can define.

## Directional Sprites

This is usually needed for furniture. You can provide up to 4 directional variations with `id_dir0.png`, `id_dir1.png`, `id_dir2.png`, and `id_dir3.png`. Each direction is optional and can be skipped.

Characters can also use directional sprites; however, it is not recommended.

## Snow Variation

You can provide an `id_snow.png` variation to enable automatic switching in snow zones or winter.

These can be combined with the above variations in the following order:

+ `_skinN_dirN_snow`
+ `_skinN_snow`
+ `_dirN_snow`
+ `_snow`
