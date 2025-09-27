---
title: Act & Spell
date: 2025/1/3 01:00
hide: true
---

## How to Create Custom Element

Assumes you have setup your element in an Element sheet already, the following entries are important:

**id**: this should be a unique number, this is the ability id.  
**alias**: the actual string id of your element.  
**type**: this C# type name corresponding to this ability.  
**group**: be it **FEAT**, **ABILITY** or **SPELL**.  
**tag**: add **addEleOnLoad** if you want your ability to be applied to player on game load. 

You may take references from [Elin Sources](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=859322825#gid=859322825).  

### Icon

Your element icon needs to be placed within **Texture** folder, using the same alias as the file name, such as **ActLionDance.png**. You may also use pattern matching to assign a single icon to multiple elements, such as for all elements that have **alias** starting with `my_ele`, the file name should be `@my_ele.png`, and it will match `my_ele_1`, `my_ele_2`, `my_ele_fire`, `my_ele_cold`, `my_ele_error`, `my_ele_xxx` etc. Full name matching happens before pattern matching.

If the texture size is not 48x48, CWL will resize it for you.

Optionally, you can also override `GetSprite` method and provide your own icon sprite.

### Tags

**`addEleOnLoad`**: player will gain this ability automatically upon loading.  
**`addDice`**: use the dice from Calc sheet with the same id as element's alias.  
**`godAbility,religion_id`**: make your ability trigger god talks upon using for custom religion. Example religion **cwl_spaghettigod**, use tag **godAbility,cwl_spaghettigod**.  

### Phrases

You can define ability proc phrases by providing `phrase_alias` texts in `LangMod/**/Data/chara_talk.xlsx` file, similarly how it's done in **_Elona/Lang/EN/Data/chara_talk.xlsx**.

## Scriptless

You can make custom abilities/spells without writing C# script using existing `proc` provided by Elin and recombine them.  

The `type` column must be one of the existing `type` in Elin Sources.

## With C# Script

For example, we want to add an ability **ActLionDance**, it should look like this:

![img](https://i.postimg.cc/90PTN1r1/doc-custom-ele.png)

![img](https://i.postimg.cc/XY6Nv31Z/image.png)

Your alias and type does not need to be the same, however, the texture of the ability icon will be using the **alias**, and the element object will be linked to **type**.

In your script dll, you should have the following code:
```cs
internal class ActLionDance : Act
{
    public override bool Perform()
    {
        pc.Say("Lion Dance!!");
        return true;
    }
}
```

The class must derive from **Element**, common ones are **Act**, **AIAct**, **Ability**, **Spell** for ability types, depending on the usage and intention.

You can declare your class in any namespace, CWL will qualify the type name, so the element type only needs to be the class name itself.
