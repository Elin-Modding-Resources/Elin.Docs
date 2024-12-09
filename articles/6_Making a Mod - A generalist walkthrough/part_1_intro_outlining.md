---
title: Part 1 - Intro and Outlining
author: Drakeny
desc: A Generalist guide on making mods - part 1
date: 2024/12/06 01:01
tags: Guide/General
---

# Making a mod; A generalist walkthrough

::: info
This article is based on the process of adding the Gene transfer feature for [FarmDoctor](https://steamcommunity.com/sharedfiles/filedetails/?id=3366547733).
:::

This is a walkthough of the steps that I've taken while developing a new feature, from the beginning to the end, including aspects as defining what I need to patch and what is needed for it to work in general.

::: warning

This article also assumes you already have basic knowledge on how to make atleast a basic mod. If you don't, go read this: [Basic Elin mod Package](https://elin-modding-resources.github.io/Elin.Docs/articles/2_Getting%20Started/basic_mod) and this: [Setting up script mods](https://elin-modding-resources.github.io/Elin.Docs/articles/2_Getting%20Started/Script%20Mods/script_mod)

:::

## Outlining

First things first, lets take note of what we want to achieve. In this specific case I'm looking into adding a new feature for FarmDoctor that enables you to transfer enchantments from one plant to another. So lets figure out our tentative steps:

-   Extract the enchantment from the plant.
-   Store said enchantment somewhere.
-   Reapply the enchantment using the storage we've used.

Simple enough, now, how you would do that in-game will come from your own creativity and designs, for me, as I'd like to keep balance in play when designing my changes and addition to mechanics, I've decided that instead of removing the enchantments directly from plants, I'm going to take them from the seeds, this way i can add a cost of multiple seeds in a destructive way (meaning that the player HAS to spend a resource). For storing the enchantments, well, Genetic Guns are an actual thing so why not go with that, that makes our last step even easier, we just need to shoot to apply the enchantments to a target. Additionally, I want for the weapon to be craftable using a brand crafting station. (Why? Future proofing and wanted to do it.)

::: tip Enchantment
For clarity, going forward in this article you'll notice that the word `Enchantment` does not appear at all in code blocks, that is because an `Enchantment` is actually an Element and Elements casts a wide net over several things they can be such as feats, skills, attributes and others so bear this in mind.
:::

Now that we've figured out how we want to do things we should update our steps to reflect the newly decided details:

-   Add a new crafting station `Thing`.
    -   Choose a sprite for it while we are at it.
-   Add a new craftable `Thing` and set its recipe to use seeds.
    -   Its sprite its pretty obvious what we are using, we just have to find the correct spritesheet and tile number
-   Make the new craftable `Thing` inherit the enhancement from the seed ingredients when crafted
-   Add the ability for our new item to "shoot" plants with their new enchantment
    -   Add Sound and effects for the action

Next up, we start executing our planned steps.
