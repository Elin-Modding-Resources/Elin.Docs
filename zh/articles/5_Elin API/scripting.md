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
cs.file /exporters/DoStuff
```

### API

```cs
string EScript.EvaluateScript(string script)
```
执行脚本并返回格式化后的结果。该方法不缓存脚本，每次调用都会重新编译。

```cs
object? EScript.EvaluateAsCSharp(this string script, 
                                 object? globals = null,
                                 string useState = null, 
                                 bool useCache = true, 
                                 bool throwOnError = false)
```
执行脚本并返回实际返回值。

+ `globals`：一个对象，其所有公共字段可在脚本中直接访问。
+ `useState`：脚本状态的 ID，用于创建或复用一个特殊的全局对象，该对象包含一个 `Dictionary<string, object> Script`，可用于在多次执行间持久化数据。
+ `useCache`：缓存编译后的脚本，后续相同脚本可跳过编译以提升性能（重启游戏后失效）。
+ `throwOnError`：当脚本存在编译错误时抛出 `EScriptCompilationException`。

## 提交

`EScriptSubmission` 是一种用于持久化脚本的专用 API，首次创建开销较大，但当脚本内容未变化时执行速度更快，且支持跨游戏重启。

### 提交组

```cs
EScriptSubmission EScriptSubmission.Create(string submissionKey)
```

通过 `submissionKey` 对脚本提交进行分组，例如在 Drama 剧情表格中，每个 Drama 剧情表格会分配一个唯一的 batch。

### 编译

```cs
EScriptRunner EScriptSubmission.Compile<T>(string script)
```
编译或从该提交组中加载一个 `EScriptRunner` 委托。若脚本已存在于提交组中，则会直接使用已有缓存，而非重新编译。

+ `EScriptRunner`：`Func<object?, object?>` 委托的别名。
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