---
title: Religion 信仰
author: DK
description: 如何创建自定义信仰。
date: 2026/5/31 18:00
tags: SourceSheet/Religion
---

# 信仰表格

<LinkCard t="SourceGame/Religion" u="https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_" />

在制作源表格时，请始终从官方行复制前三行，并从第四行开始填写数据。不要更改列的顺序。

## 表格解释

|列名|类型|说明|
|-|-|-|
|id|string|自定义信仰 ID 必须以 **custom** 开头，例如：**custom_spaghettigod**|
|name_JP|string|日文显示名称|
|name|string|英文显示名称。其他语言请使用 [`SourceLocalization`](./localization)|
|name2_JP|string[]|领域名称、简称（日文）|
|name2|string[]|领域名称、简称（英文）|
|type|string|自定义信仰请使用 `ReligionCustom`，或填写你自定义的 C# Religion 类型的完整名称|
|idMaterial|string|祭坛的材质别名|
|faith|string|未使用|
|domain|string|未使用|
|tax|int|信仰税百分比|
|relation|int|初始关系值|
|elements|int[]|给予角色的信仰元素加成|
|cat_offer|string[]|供品类别|
|rewards|string[]|礼物等级 1 和 2 的奖励|
|textType_JP|string|头像类型（日文）|
|textType|string|头像类型（英文）|
|textAvatar|string|头像信息|
|detail_JP|string|详情（日文）|
|detail|string|详情（英文）|
|textBenefit_JP|string|祝福信息（日文）|
|textBenefit|string|祝福信息（英文）|
|textPet_JP|string|神宠信息（日文）|
|textPet|string|神宠信息（英文）|

使用 CWL 规范的模组仍然兼容，例如 `cwl_xxx#minor#cannot`，但我们建议切换到新格式。

## 肖像

如需为信仰创建可选的自定义肖像，请在 **Texture** 文件夹中放置一个 **.png** 图像，文件名与信仰 ID 相同，例如 **custom_spaghettigod.png**。

## 神对话

必须在 `LangMod/**/Data` 放置 `god_talk.xlsx` 表格，信仰才能正常运行。你可以参考游戏本体表格：**Elin/Package/_Elona/\_Lang\_Chinese/Lang/CN/Data/god_talk.xlsx**。

![](./assets/god_talk.png)

## 信仰数据

你可以通过在 `LangMod/**/Data/` 文件夹中提供一个简单的 JSON 文件来定义补充信仰数据，文件名为 `religion_data.json`。
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
  是否可以加入该信仰。
  默认值：`true`
* `IsMinorGod`
  是否为次级神明。
  默认值：`false`
* `NoPunish`
  离开信仰时是否不施加惩罚。
  默认值：`false`
* `NoPunishTakeover`
  接管时是否不施加惩罚。
* `Artifacts`
  作为神器的事物 ID 列表。使用 `godArtifact,religion_id` 标签规范的 CWL 模组会自动添加。
* `Elements`
  仅在该信仰激活时对神器生效的元素别名列表。使用 `religion_elements.json` 旧规范的 CWL 模组会自动添加。
* `GodAbilities`
  视为神明能力的元素别名列表，施放时会触发 `ability` 类型的神明对话。使用 `godAbility,religion_id` 旧标签规范的 CWL 模组会自动添加。
* `OfferingMtp`
  特定事物 ID 的供品倍率覆盖。使用 `religion_offerings.json` 旧规范的 CWL 模组会自动添加。
* `OfferingValue`
  特定事物 ID 的供品价值覆盖，使用算术表达式。
  参数：`base`（基础价格）、`lv`（物品等级）、`rarity`（物品稀有度）
* 你可以省略任意字段以使用其默认值。