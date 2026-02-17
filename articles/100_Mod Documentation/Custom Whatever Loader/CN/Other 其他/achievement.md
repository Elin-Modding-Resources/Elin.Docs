---
title: 自定义成就系统
description: 如何添加模组自定义成就并在游戏中使用
date: 2026/2/17 15:00
author: DK
tags: Guide/CWL/C#
hide: true
---

::: warning
需要 CWL 1.21.14 或更高版本。
:::

## 成就定义

通过在你的模组目录 `LangMod/**/Data/` 文件夹中放置一个名为 `achievement.json` 的简单 JSON 文件，即可添加自定义成就列表。

文件内容为一个 `SerializableAchievement` 定义的数组：

```json
[
  {
    "Id": "mymod_achievement_1",
    "Name": "<color=green>模组成就</color>",
    "Description": "你做到了！"
  },
  {
    "Id": "mymod_achievement_2",
    "Name": "模组成就 2",
    "Description": "你又做到了！",
    "Prerequisites": [
      "mymod_achievement_1"
    ]
  },
  {
    "Id": "mymod_achievement_3",
    "Name": "模组成就 3",
    "Description": "你达成了目标！",
    "Prerequisites": [
      "mymod_achievement_2"
    ],
    "AutoUnlockProgress": 200
  }
]
```

上面定义了三个成就模板：  
- `mymod_achievement_1` 是最基本的直接解锁类型  
- `mymod_achievement_2` 需要前置成就 `mymod_achievement_1` 解锁后才能解锁  
- `mymod_achievement_3` 需要前置成就 `mymod_achievement_2` 且进度达到 200 才会自动解锁

你可以使用控制台命令 `cwl.achievement.reimport` 来热重载所有成就定义文件。

### 字段说明

|字段|类型|必填|说明|
|-|-|-|-|
|`Id`|`string`|✅|成就的唯一标识符|
|`Name`|`string`|✅|UI 弹窗中显示的名称，支持富文本|
|`Description`|`string?`|❌|可选，显示在标题下方的描述文本|
|`Prerequisites`|`string[]?`|❌|前置成就 ID 列表，必须全部解锁才能解锁本成就|
|`AutoUnlockProgress`|`float?`|❌|如果设置，当进度 ≥ 此值时自动解锁（需同时满足前置条件）|

### 成就图标

在 **Texture** 文件夹中放置一个 png 格式的图片，文件命名规则为 `acv_ID.png` 或 `achievement_ID.png`

其中 `ID` 替换为上面定义的成就 Id。

建议使用正方形图片以获得最佳显示效果。

## 在代码中使用

定义好成就模板后，可以通过 `CustomAchievement` API 来管理它们。

### 获取 CustomAchievement 对象（非必需）

```cs
var achievement = CustomAchievement.GetAchievement("mymod_achievement_1");
```

### 解锁相关方法

#### 普通解锁（会检查前置条件与进度）

```cs
CustomAchievement.Unlock("mymod_achievement_1");
```

#### 强制解锁（忽略所有前置条件与进度要求）

```cs
CustomAchievement.UnlockForce("mymod_achievement_1");
```

#### 全局解锁（跨存档保存）

```cs
CustomAchievement.UnlockPersistent("mymod_achievement_1");
```

全局解锁的状态会独立保存，即使更换存档也能保留。

### 进度相关操作

当定义了 `AutoUnlockProgress` 时，进度达到要求且前置条件满足后会自动解锁。

#### 设置进度

```cs
CustomAchievement.SetProgress("mymod_achievement_3", 150f);
```

#### 修改进度（可正可负）

```cs
CustomAchievement.ModProgress("mymod_achievement_3", -10f);
```

#### 获取当前进度

```cs
float progress = CustomAchievement.GetProgress("mymod_achievement_3");
```

当进度 ≥ `AutoUnlockProgress` 且所有前置成就已解锁时，会自动触发解锁。

### 重置成就

```cs
CustomAchievement.Reset("mymod_achievement_1");
```

此操作会清除：

- `IsUnlocked` 状态
- 进度值
- 解锁时间
- 持久化标记（如果存在）

## 控制台命令

所有命令都位于命名空间：

```
cwl.achievement
```

|命令|功能描述|
|-|-|
|`add`|运行时添加新的成就模板（主要用于测试）|
|`unlock`|解锁成就（会检查条件）|
|`unlock_persistent`|解锁并设置为持久化|
|`reset`|重置成就|
|`set_progress`|设置进度值|
|`get_progress`|查询当前进度|
|`reimport`|重新加载所有成就定义文件|

示例：
```
cwl.achievement.unlock mymod_achievement_1
```

## 解锁条件判断逻辑

成就可被解锁的条件为：

```
IsPrerequisiteMet && IsProgressMet
```

其中：

- `IsPrerequisiteMet`：所有前置成就都已解锁  
- `IsProgressMet`：进度 ≥ `AutoUnlockProgress`（若有定义此字段）

如果任一条件不满足，普通 `Unlock()` 将什么都不做（除非使用 `force = true`）。

## 运行时动态注册

你也可以不使用 json 文件，而直接在代码中动态添加成就：

```cs
CustomAchievement.AddAchievement(new SerializableAchievement {
    Id = "runtime_achievement",
    Name = "运行时成就",
    Description = "通过代码创建的成就",
    Prerequisites = new[] { "mymod_achievement_1" },
    AutoUnlockProgress = 50f,
});
```