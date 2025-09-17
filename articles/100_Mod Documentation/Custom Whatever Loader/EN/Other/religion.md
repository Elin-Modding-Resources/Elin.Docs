---
title: Custom Religion
date: 2025/1/3 01:00
hide: true
---

## Custom Religion

Custom Whatever Loader can import the Religion source sheet and patch it into the game. However, your custom religion ID must begin with **cwl_**, for example: **cwl_spaghettigod**.

By default the religion is **joinable** and **not minor**. You can append optional tags to the ID:
- To make it a minor god, append **#minor**
- To make it unjoinable, append **#cannot**

For example: **cwl_spaghettigod#minor#cannot** will make it a minor god religion and unjoinable. However, do note that the actual ID of your religion is still **cwl_spaghettigod**, the tags will be removed upon importing.

To create an optional custom portrait for your religion, put a **.png** image in the **Texture** folder using the same religion ID as the file name, such as **cwl_spaghettigod.png**.

You can use console command `cwl.spawn_altar` to spawn an altar of a specified religion for testing.

## God Talks

Custom Whatever Loader will merge your custom **god_talk.xlsx** into base game, this is necessary for the religion to function. You may reference the base game sheet at **Elin/Package/_Elona/Lang/EN/Data/god_talk.xlsx**.

![img](https://i.postimg.cc/P5V71tTq/image.png)

Your custom **god_talk.xlsx** should only contain the talks of your own religion ID, and be placed under `LangMod/**/Data` folder.

You can use console command `cwl.data.load_god_talk` to reload all god talks.

## God Ability

To make an ability as god ability of your custom religion, add tag **godAbility,religion_id** to that ability. For example, to make your ability trigger god talks upon using for custom religion **cwl_spaghettigod**, use tag **godAbility,cwl_spaghettigod**.

## God Artifact

To make your custom item a god artifact and wish-able, add tag **godArtifact,religion_id** to the item.

## Faction Elements

You can define a list of faction elements that is only applied when your custom religion is active. This is done by providing a simple JSON file located in your `LangMod/**/Data/` folder, named `religion_elements.json`.
```json
{
    "cwl_spaghettigod": [
        "vopal",
        "eleLightning",
        "bane_all",
        "r_life"
    ],
    "cwl_example_religion2": [
        data...
    ]
}
```

When the faction elements are defined for your custom religion, the matching elements on your custom god artifact item will turn into faction elements and are only activated when the custom religion is active.  

You can use console command `cwl.data.load_religion_elements` to reload all faction elements.

## Offering Multiplier

Religion offerings are defined by categories in the sheet, however, you can define a custom multiplier for specific items by providing a simple JSON file located in your `LangMod/**/Data/` folder, named `religion_offerings.json`.
```json
{
    "cwl_spaghettigod": {
        "spaghetti": 5
    },
    "cwl_religion2": {
        "random_item": 2
    }
}
```

When offering item `spaghetti` to the religion `cwl_spaghettigod`, its offering value will be multiplied by 5.

You can use console command `cwl.data.load_religion_offerings` to reload all religion offering multipliers.