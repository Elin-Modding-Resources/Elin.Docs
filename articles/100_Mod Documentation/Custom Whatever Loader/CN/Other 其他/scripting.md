---
title: 运行时 C# 脚本
description: 本指南介绍如何使用 **CWL** 在游戏运行时执行 C# 脚本，以及如何为 Mod 编写和管理脚本代码
date: 2025/12/13 14:00
author: DK
tags: Guide/CWL/C#
hide: true
---

::: warning 
**版本要求**：CWL **1.21.0** 及以上
:::

## 控制台脚本

调试、修 Bug、测试数值或玩点花样。

### 直接执行 C# 表达式

使用控制台命令：
```cs
cwl.cs.eval EClass.pc.party.members
```

脚本的返回值会直接显示在控制台，集合会自动展开

### 执行简单逻辑代码

你也可以在一行里写变量和复杂逻辑：
```cs
cwl.cs.eval var i = EClass.rnd(150) * 2; EClass.pc.AddElement("featMetal", i);
```

### 执行外部脚本文件

当脚本较长或需要反复使用时，可以直接执行文件（**绝对路径**）：
```
cwl.cs.file D:\...\demo_script.cs
```

## 脚本状态（Script State）

**脚本状态**用于在多次 `cwl.cs.eval` 执行之间**保存变量**。

CWL 提供了一个脚本状态栈，所有脚本都可以从处于脚本栈顶的状态处共享数据。

### 启用脚本状态并置入栈顶
```
cwl.cs.state.push my_state
```

### 读写共享变量

```cs
cwl.cs.eval Script["counter"] = 25;
cwl.cs.eval var value = (int)Script["counter"];
```

**注意**：如果当前没有激活的脚本状态，每次脚本执行都是**完全独立的**，`Script[...]` 将不可用。

### 管理脚本状态

弹出当前状态（不清数据）：
```
cwl.cs.state.pop
```

清除并移除指定状态：
```
cwl.cs.state.remove my_state
```

查看当前状态栈：
```
cwl.cs.state
```

## 脚本编译

::: tip
如果你是第一次写脚本 Mod 并需要更多功能，强烈建议阅读[脚本 Mod 指南](../../../../2_Getting%20Started/Script%20Mods/script_mod)来使用IDE进行辅助开发。
:::

CWL 提供了内置的脚本编译器。

### Script 文件夹自动编译

将 `.cs` 文件放入 Mod 的 **`Script`** 文件夹，CWL 会自动将其编译为程序集并生成调试用的 PDB，**不需要**额外的编译工具或项目文件。适用于只想提供一些自定义类型和事件的简单代码。

### 示例：自定义类型

```cs
namespace MyMod;

public class ReligionGeeGeeBon : Religion;

public class FeatGoodStuff : Feat
{
    internal void _OnApply(int add, ElementContainer eleOwner, bool hint)
    {
        eleOwner.SetFeat(FEAT.featMetal, add * 50);
    }
}
```

### 编译特性说明

脚本会自动引用游戏本体和所有已加载的程序集（包含mod），编译后会自动移除未使用的引用。

支持 **C# 14** 语法特性。


## 脚本生命周期事件

你可以定义一个 `CwlScript` 类，用于监听脚本的加载与卸载。

```cs
public class CwlScript
{
    internal static void CwlScriptLoad()
    {
        // 脚本程序集加载时调用
    }

    internal static void CwlScriptUnload()
    {
        // 脚本程序集卸载时调用
    }
}
```
