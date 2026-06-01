---
title: Religion
author: DK
description: How to make new custom Religion.
date: 2026/5/31 18:00
tags: SourceSheet/Religion
---

# Religion Sheet

<LinkCard t="SourceGame/Religion" u="https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_" />

When making source sheets, always copy the first 3 rows from official rows and start your data at the 4th row. Do not alter the column order.

## Sheet Columns

|Column|Type|Description|
|-|-|-|
|id|string|Custom religion ID must begin with **custom**, for example: **custom_spaghettigod**|
|name_JP|string|Display name in Japanese|
|name|string|Display name in English. For other languages, use [`SourceLocalization`](./localization)|
|name2_JP|string[]|Domain name, short name, in Japanese|
|name2|string[]|Domain name, short name, in English|
|type|string|Use `ReligionCustom` for custom religions. Or your own C# Religion type's full name|
|idMaterial|string|Material alias of the altar|
|faith|string|Unused|
|domain|string|Unused|
|tax|int|Religion tax percentage|
|relation|int|Starting relation|
|elements|int[]|Religion elements bonus given to chara|
|cat_offer|string[]|Offering category|
|rewards|string[]|Gift rank 1 & 2 rewards|
|textType_JP|string|Avatar type in Japanese|
|textType|string|Avatar type in English|
|textAvatar|string|Avatar information|
|detail_JP|string|Detail in Japanese|
|detail|string|Detail in English|
|textBenefit_JP|string|Blessing information in Japanese|
|textBenefit|string|Blessing information in English|
|textPet_JP|string|God pet information in Japanese|
|textPet|string|God pet information in English|

Mods using CWL spec are still compatible, such as `cwl_xxx#minor#cannot`, though we recommend switching to the new format.

## Portrait

To create an optional custom portrait for your religion, put a **.png** image in the **Texture** folder using the same religion ID as the file name, such as **custom_spaghettigod.png**.

## God Talks

A god talk sheet placed at `LangMod/**/Data/god_talk.xlsx` is necessary for the religion to function. You may reference the base game sheet at **Elin/Package/_Elona/Lang/EN/Data/god_talk.xlsx**.

![](./assets/god_talk.png)

## Religion Data

You can define the supplementary religion data by providing a simple JSON file located in your `LangMod/**/Data/` folder, named `religion_data.json`.
```json
{
    "custom_spaghettigod": {
        "CanJoin": true,
        "IsMinorGod": false,
        "NoPunish": false,
        "NoPunishTakeover": false,
        "Artifacts": [
            "my_awesome_weapon",
            "my_awesome_armor"
        ],
        "Elements": [
            "vopal",
            "eleLightning",
            "bane_all",
            "r_life"
        ],
        "GodAbilities": [
            "my_awesome_ability"
        ],
        "OfferingMtp": {
            "spaghetti": 20
        },
        "OfferingValue": {
            "mushroom": "base * 16 + 520 + lv * 3 + rarity * 2"
        }
    },
    "custom_example_religion2": {
        data...
    }
}
```

* `CanJoin`  
  Can join this religion.  
  Default value: `true`  
* `IsMinorGod`  
  A minor religion.  
  Default value: `false`  
* `NoPunish`  
  No punishment when leaving.  
  Default value: `false`  
* `NoPunishTakeover`  
  No punishment when taking over.  
* `Artifacts`  
  List of Thing IDs as the artifact. CWL mods that used `godArtifact,religion_id` tag spec will be added automatically.  
* `Elements`  
  List of Element aliases that only works on the artifact when the religion is active. CWL mods that used `religion_elements.json` spec will be added automatically.  
* `GodAbilities`  
  List of Element aliases that count as god abilities, which will trigger `ability` god talk upon performing. CWL mods that used `godAbility,religion_id` tag spec will be added automatically.  
* `OfferingMtp`  
  Offering multiplier override for specific Thing IDs. CWL mods that used `religion_offerings.json` spec will be added automatically.  
* `OfferingValue`  
  Offering value override for specific Thing IDs, this is arithmetic expression.  
  Arguments: `base` (base price), `lv` (item level), `rarity` (item rarity)  
* You may omit any field to use their default values.
