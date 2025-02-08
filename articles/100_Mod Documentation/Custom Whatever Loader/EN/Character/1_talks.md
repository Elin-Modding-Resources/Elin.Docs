---
title: Dialog & Drama
date: 2025/1/3 01:00
hide: true
---

## Barks

Sometimes you want the character to banter/bark at certain conditions. They barks pop up above character's head.

![](./assets/bark.png)

These barks are written in **CharaText** sheet, and your Chara sheet uses **idText** to link their IDs together.

![](./assets/charatext.png)

|Cell|calm|fov|aggro|dead|kill|
|-|-|-|-|-|-|
|Condition|Random default|On sight|In combat|Death rattle|Kill confirmed|

## Dialog

To add some chatty chat texts to the character, you'll need to have a `dialog.xlsx` sheet in your `LangMod/**/Dialog/` folder.

![img](./assets/dialog.png)

The sheet format is the same as game's dialog sheet at **Elin/Package/_Elona/Lang/_Dialog/dialog.xlsx**, but you only need the `unique` sheet and the row with your character's ID.

## Drama

A drama is the rich dialog that usually has options and additional actions. 

![](./assets/drama_eg.png)

To define a custom drama for the character, use tag `addDrama_DramaSheetName` and CWL will reroute the drama automatically.

Your custom drama sheet must be placed in your `LangMod/**/Dialog/Drama/` folder, and the name must match the tag. For example, use `addDrama_MyCharaDrama` with `Dialog/Drama/MyCharaDrama.xlsx`.

You may reference the game drama sheets when making your own at **Elin/Package/_Elona/Lang/_Dialog/Drama**, or the Tiny Mita example which has a template drama sheet:
<LinkCard t="CWL Example: Tiny Mita" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3396774199" />

![img](./assets/drama.png)

::: tip Hot Reload
Drama sheet can be edited and hot reloaded during game play.
:::

## Drama Expansion

::: warning Temporary Version
This part of documentation is a partially written stub, and API usagse may change at any time.
:::

Struggling with the built-in `action` of the drama sheet not achieving the desired effect? CWL allows you to add custom drama extension methods in the DLL and call them in the drama sheet.

This feature requires the CWL configuration value `Dialog.ExpandedActions` to be set to `true`, which is enabled by default.

### Adding Custom Expansions

First, define a class derived from `DramaOutcome`. This will allow CWL to add all methods in this class that conform to the drama expansion format to the method table.

Next, your drama expansion methods must use the following CWL format: `static`, return `bool`, and accept three parameters: `DramaManager dm, Dictionary<string, string> line, params string[] parameters`.

```cs
internal class MyDramaExpansion : DramaOutcome
{
    internal static bool honk_honk(DramaManager dm, Dictionary<string, string> line, params string[] parameters)
    {
        return true;
    }
}
```

The return value is to determine whether to use specified `jump` cell (if any) after invoking this `action`.

### Calling Methods

In the drama sheet, you can use the CWL special action `invoke*` to call your method:
![](./assets/dramae_invoke.png)

### Passing Parameters

Parameters are separated by commas `,` and written within the parentheses of the expansion method, similar to code syntax:

```
invoke* honk_honk(arg1, arg2)
```

In your expansion method code, the parameters will be passed as `string[] parameters`, and you can perform parameter assertions using C# 8 syntax or manually check them:

```cs
internal static bool honk_honk(DramaManager dm, Dictionary<string, string> line, params string[] parameters)
{
    // assert must be 2 parameters
    if (parameters is not [{ } soundId, { } arg2]) {
        return false;
    }

    pc.PlaySound(soundId);
    // use arg2

    return true;
}
```

You can also use your preferred method to ensure parameter validity. Common ways to check parameters include, but are not limited to:

```cs
[{ } arg1, { } arg2] // must be 2 parameters
[{ } arg1, .. { } args] // must be atleast 1 parameter
```

If your method does not require any parameters, no checks are necessary.

### Exception Handling

In your expansion method code, any errors that should prevent further execution (such as invalid parameters, invalid IDs, etc.) can be thrown as exceptions. For example, when CWL internally checks parameters, it will throw the following exceptions: 

```cs
if (parameters is not [{ } id, { } tag]) {
    throw new DramaActionArgumentException(parameters);
}
```

After catching an exception, the method's return value defaults to `false` and will prompt a drama warning in the game.

### CWL Expansions

CWL comes with a small set of built-in drama expansion methods, which you can [checkout code here](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/API/Drama/DramaExpansion.cs).

Notably, `build_ext` and `emit_call` are two expansion methods that allow you to directly invoke certain static methods from external assemblies, for example:

![](./assets/dramae_ext.png)

This feature requires the CWL configuration value `Dialog.ExpandedActionsAllowExternal` to be set to `true`, which is enabled by default.