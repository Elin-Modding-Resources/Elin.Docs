---
title: Custom Achievements
description: How to add mod achievements and utilize them in game.
date: 2026/2/17 15:00
author: DK
tags: Guide/CWL/C#
---

::: warning
Requires CWL 1.21.14 and above.
:::

## Achievement Definition

A list of custom achievements can be added by providing a simple JSON file located in your `LangMod/**/Data/` folder, named `achievement.json`.

Each file should contain an array of `SerializableAchievement` definitions:
```json
[
  {
    "Id": "mymod_achievement_1",
    "Name": "<color=green>Mod Achievement</color>",
    "Description": "You did it!"
  },
  {
    "Id": "mymod_achievement_2",
    "Name": "Mod Achievement 2",
    "Description": "You did it again!",
    "Prerequisites": [
      "mymod_achievement_1"
    ]
  },
  {
    "Id": "mymod_achievement_3",
    "Name": "Mod Achievement 3",
    "Description": "You reached the goal!",
    "Prerequisites": [
      "mymod_achievement_2"
    ],
    "AutoUnlockProgress": 200
  },
]
```

Here we defined 3 achievement templates, `mymod_achievement_1` is the basic fire and forget type, `mymod_achievement_2` can only be unlocked when `mymod_achievement_1` is unlocked, and `mymod_achievement_3` can only be unlocked when `mymod_achievement_2` is unlocked and progress reaches `200`.

You can use console command `cwl.achievement.reimport` to hot reload all achievement definition files.

### Fields

|Field|Type|Required|Description|
|-|-|-|-|
|`Id`|`string`|✅|Unique identifier of the achievement.|
|`Name`|`string`|✅|Display name shown in UI popup. Rich text is supported.|
|`Description`|`string?`|❌|Optional description displayed under the title.|
|`Prerequisites`|`string[]?`|❌|List of achievement IDs that must be unlocked first.|
|`AutoUnlockProgress`|`float?`|❌|If set, achievement auto-unlocks when progress ≥ this value.|

### Achievement Icon

A texture file can be provided by placing a `png` file in **Texture** folder named `acv_ID.png` or `achievement_ID.png` where `ID` is replaced by the achievement id defined above.

It's recommended to use a square image to display correctly.

Here is a completed and expanded version of your documentation based directly on the implementation:

## Using in Code

After defining achievement templates, you can manage them via the `CustomAchievement` API.

### Getting CustomAchievement Object (Not Required)

```cs
var achievement = CustomAchievement.GetAchievement("mymod_achievement_1");
```

### Unlocking

#### Normal Unlock (checks prerequisites & progress)

```cs
CustomAchievement.Unlock("mymod_achievement_1");
```

#### Force Unlock (ignores requirements)

```cs
CustomAchievement.UnlockForce("mymod_achievement_1");
```

#### Persistent Unlock (saved across sessions)

```cs
CustomAchievement.UnlockPersistent("mymod_achievement_1");
```

Persistent unlocks are stored separately and its unlock states are persistent across saves.

### Working with Progress

If `AutoUnlockProgress` is defined, the achievement unlocks automatically when progress meets the requirement.

#### Set Progress

```cs
CustomAchievement.SetProgress("mymod_achievement_3", 150f);
```

#### Modify Progress

```cs
CustomAchievement.ModProgress("mymod_achievement_3", -10f);
```

#### Get Progress

```cs
float progress = CustomAchievement.GetProgress("mymod_achievement_3");
```

When progress reaches the defined `AutoUnlockProgress` and meets all prerequisites(if any), it unlocks automatically.

### Resetting

```cs
CustomAchievement.Reset("mymod_achievement_1");
```

This clears:

* `IsUnlocked`
* `Progress`
* `TimeUnlocked`
* Persistent flag (if set)

## Console Commands

All commands are under the namespace:

```
cwl.achievement
```

|Command|Description|
|-|-|
|`add`|Add a new achievement template at runtime(for testing purpose)|
|`unlock`|Unlock achievement (checks conditions)|
|`unlock_persistent`|Unlock and persist|
|`reset`|Reset achievement|
|`set_progress`|Set progress|
|`get_progress`|Get progress|
|`reimport`|Reload achievement definitions|

Example:

```
cwl.achievement.unlock mymod_achievement_1
```

## Unlock Conditions

An achievement is unlockable when:

```
IsPrerequisiteMet && IsProgressMet
```

Where:

* `IsPrerequisiteMet` → All prerequisite achievements are unlocked
* `IsProgressMet` → `Progress >= AutoUnlockProgress` (if defined)

If either condition fails, `Unlock()` will silently do nothing unless `force = true`.

## Runtime Registration

You may also register achievements dynamically in code if not providing a definition file:

```cs
CustomAchievement.AddAchievement(new SerializableAchievement {
    Id = "runtime_achievement",
    Name = "Runtime Achievement",
    Description = "Created in code",
    Prerequisites = [ "mymod_achievement_1" ],
    AutoUnlockProgress = 50f,
});
```
