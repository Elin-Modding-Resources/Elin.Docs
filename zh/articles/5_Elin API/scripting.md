---
title: Scripting
author: DK
description: Plugins.Scripting 与运行时 C# 编译
date: 2026/6/2 19:00
tags: API/Scripting/C#
---

# Plugins.Scripting

`Elin/Elin_Data/Managed/Plugins.Scripting.dll`

该程序集包含 `EScript` 类及其 API 定义，用于运行时 C# 脚本与编译，基于 [Roslyn 编译器 5.3.0](https://www.nuget.org/packages/Microsoft.CodeAnalysis.CSharp.Scripting/5.3.0)。

## 运行时规格

+ C# 语言版本：14
+ 默认引用：当前程序域
+ 默认命名空间：
  + `System`
  + `System.Collections`
  + `System.Collections.Generic`
  + `System.IO`
  + `System.Linq`
  + `System.Text`
  + `System.Text.RegularExpressions`
  + `System.Reflection`
  + `HarmonyLib`
  + `EModding`
  + `EModding.API`
  + `EModding.Helper`
  + `EModding.Helper.Runtime`
  + `EModding.Helper.Runtime.Exceptions`
  + `UnityEngine`
  + `UnityEngine.UI`
  + `ReflexCLI.Attributes`
  + `Newtonsoft.Json`
  + `Newtonsoft.Json.Serialization`

## 脚本编写

C# 脚本既可以是完整的语法代码，也可以是顶层语句。以下写法均有效：

::: code-group

```cs [顶层语句]
var i = 100; return i << 5;
```

```cs [直接执行]
EClass._map.FindChara("tinymita").MakeAlly()
```

```cs [完整语法]
using SomeLib;

public class A(string thingy) 
{
    public string MakeThingy() 
    {
        return thingy;
    } 
}

new A("somethingy").MakeThingy()
```

:::

### 控制台

你可以在控制台中直接执行 C# 代码：
```
cs.eval <在此输入代码>
```

脚本也可以通过完整路径或相对路径加载，相对路径支持 `Elin` 游戏目录或任意模组的 `Exec` 文件夹。
```
cs.file D:/MyScript/DoStuff.cs
cs.file exporters/DoStuff
```

### API

```cs
string EScript.EvaluateScript(string script)
```
执行脚本并返回格式化后的结果。该方法不缓存脚本，每次调用都会重新编译。

```cs
object? EScript.EvaluateAsCsharp(this string script, 
                                 object? globals = null,
                                 string useState = null, 
                                 bool useCache = true, 
                                 bool throwOnError = false)
```
执行脚本并返回实际返回值。

+ `globals`：一个对象，其所有公共字段可在脚本中直接访问。
+ `useState`：已存在的脚本状态 ID（需先用控制台命令 `cs.state push <id>` 创建）。该状态是一个特殊的全局对象，提供 `Script["key"]` 索引器用于在多次执行间持久化数据。传入未注册的 ID 时，每次调用都会得到一个一次性的临时状态，数据不会保留。
+ `useCache`：缓存编译后的脚本，后续相同脚本可跳过编译以提升性能（重启游戏后失效）。
+ `throwOnError`：当脚本存在编译错误时抛出 `EScriptCompilationException`。

## 提交

`EScriptSubmission` 是一种用于持久化脚本的专用 API，首次创建开销较大，但当脚本内容未变化时执行速度更快，且支持跨游戏重启。

### 提交组

```cs
EScriptSubmission EScriptSubmission.Create(string submissionKey)
```

提交组按 `submissionKey` 把所有脚本归到一起，例如在 Drama 剧情表的脚本中，每张 Drama 表都会分配到一个唯一的提交组。

### 编译

```cs
Func<T, object> EScriptSubmission.Compile<T>(string script)
```
编译或从该提交组中加载一个脚本调用委托。若脚本已存在于提交组中，则会直接使用已有缓存，而非重新编译。

+ `T`：全局对象的类型。

### 执行

```cs
// 全局对象类型
public class CustomScriptState : EScriptState {
    public int somethingy = 1000;
}
// 创建 runner
var runner = batch.Compile<CustomScriptState>("Debug.Log(somethingy)");
// 执行
runner(new CustomScriptState());
```

### API

```cs
void EScriptSubmission.Remove(string submissionKey)
```
删除一个提交组。

```cs
string EScriptSubmission.ListAllSubmissions()
```
获取所有提交组的列表。

## IScriptProvider

后端 API 提供了对 Roslyn 编译功能的更底层访问。

### 当前实现

```cs
IScriptProvider EScript.ScriptProvider { get; }
```
获取当前实现，通常为 Elin Modding Kit 内置的 Roslyn 编译器。

```cs
void EScript.SetProvider(IScriptProvider provider = null)
```
设置新的实现，或传入 `null` 以禁用。

### API

```cs
public delegate object EScriptRunner(object globals);

public interface IScriptProvider 
{
	bool IsAvailable { get; }
	string GetApiVersion();
	object EvaluateScript(string script, object globals = null, bool throwOnError = false);
	EScriptRunner CompileScript(string script, Type globalsType = null, bool throwOnError = false);
	byte[] CompileScriptAssembly(string script, Type globalsType = null, bool throwOnError = false);
	byte[] CompileAssembly((string content, string filePath)[] codes, string assemblyName, bool throwOnError = false);
}
```