---
title: Creating Custom Actions
author: VHS
description: Adding Custom Actions to Elin
date: 2024/11/27 00:00
tags: Guide/VHS/C#
---

### Adding Custom Actions to Elin
Heya! Ever wanted to do something cool in Elin- a move of your own machination? Yeah? Well, sadly, it's a tad hard, since there's no one telling you how to do it right now. That's where I step in!

Actions in-game refer to available states your character can perform, such as attacking, casting spells, meditating, watering plants, chopping down trees, or sleeping. Players can use these moves directly, or can be forced to by other scripts.

Actions are made up of a few things: A data-storing Element, a function-running Action Class, and the relevant graphical assets.

To set up an action, you need to create an Element to represent the action. Elements store stuff like the name of the action and how much it costs to use. The code snippet below shows how to add data from an excel file to the elements library.

```c#
var dir = Path.GetDirectoryName(Info.Location);
SharedPokemonSprites.loadPath = dir + "/Texture/";
var excel = dir + "/PokeRaces.xlsx";
var sources = Core.Instance.sources;
ModUtil.ImportExcel(excel, "Elements", sources.elements);
```

Next up, you have to create an action class for the action. This handles function calls and other bells and whistles. 

```c#
using UnityEngine;

public class ActTestyact : Act
{
    public override bool Perform()
    {
        Debug.Log("My action is running!");

        return true;
    }
}
```

This action needs to be in the class cache, a repitoir the game uses to track all action scripts. You can add it to the library during Initialization as so:

```c#
ClassCache.caches.Create<ActyTestyact>("ActTestyact", "MyNamespace");
```

Finally, to test this ability out, you need to give it to your character. You can do it like so:

```c#
[HarmonyPatch(typeof(Chara), nameof(Chara.Tick))]
class testy
{
    static void Prefix(Chara __instance)
    {
            var alreadyHasAbility = __instance.HasElement(80000);
            if (alreadyHasAbility == false)
            {
                __instance.GainAbility(80000);
            }
    }
}

```
Important to note, inside the elements file, you want the alias and type to be the name of the Act you made.

To add a custom icon to the action, you need to add a sprite to the sprites library with the name of the action class. You can do it like so, assuming you have an images folder in your mod:
```c#
string[] spriteDir = Directory.GetFiles(dir + "/Icons");
foreach (string path in spriteDir)
{
    Texture2D tex = IO.LoadPNG(path);
    tex.name = Path.GetFileNameWithoutExtension(path);
    Sprite newSprite = Sprite.Create(tex,new Rect(0,0,tex.width, tex.height), Vector2.one * 0.5f);
    newSprite.name = tex.name;
    SpriteSheet.Add(newSprite);
    Debug.Log(tex.name);
}
```

That's all I've deciphered from setting up custom actions. Fly free, my modders! Reign down terror upon Elin!