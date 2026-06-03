---
title: Scripting
author: DK
description: Plugins.Scripting and runtime C# compilation.
date: 2026/6/2 19:00
tags: API/Scripting/C#
---

# Plugins.Scripting

`Elin/Elin_Data/Managed/Plugins.Scripting.dll`

This assembly contains the `EScript` class and its API definitions for runtime C# scripting and compilation, using [Roslyn compiler 5.3.0](https://www.nuget.org/packages/Microsoft.CodeAnalysis.CSharp.Scripting/5.3.0).

## Runtime Spec

+ C# language version: 14
+ Default references: current domain
+ Default namespaces:
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

## Scripting

The C# script can be either fully syntaxed C# code or top-level style statements. The following are all valid:

::: code-group

```cs [top level statement]
var i = 100; return i << 5;
```

```cs [direct execution]
EClass._map.FindChara("tinymita").MakeAlly()
```

```cs [full syntax]
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

### Console

You can evaluate C# directly in console:
```
cs.eval <code here>
```

Script can also be loaded from a file using full path, or relative path under `Elin` game folder or any mod's `Exec` folder.
```
cs.file D:/MyScript/DoStuff.cs
cs.file /exporters/DoStuff
```

### API

```cs
string EScript.EvaluateScript(string script)
```
Evaluate and get the pretty formatted result. This does not cache the script, meaning each invocation will go through the compilation process.

```cs
object? EScript.EvaluateAsCSharp(this string script, 
                                 object? globals = null,
                                 string useState = null, 
                                 bool useCache = true, 
                                 bool throwOnError = false)
```
Evaluate and get the actual return value.

+ `globals`: an object that all public fields can be accessed inside the script directly.
+ `useState`: id of the script state to use or create, it is a special globals object that exposes a `Dictionary<string, object> Script` that script can use to persist values in between evaluations.
+ `useCache`: cache the compiled script so the following invocations of the same script can skip compilation to speed up time. This does not persist through game restarts.
+ `throwOnError`: throw `EScriptCompilationException` if the script has compilation errors.

## Submission

`EScriptSubmission` is a specialized API for persistent scripts, they are more expensive on first creation but much faster when the script content is unchanged, even after game restarts.

### Batch

```cs
EScriptSubmission EScriptSubmission.Create(string submissionKey)
```

A batch groups all scripts by `submissionKey`, for example, in Drama sheet scripting, each Drama sheet is assigned a unique batch.

### Compile

```cs
EScriptRunner EScriptSubmission.Compile<T>(string script)
```
Compile or load a `EScriptRunner` delegate from this batch. If the script already exists in the batch, it will be loaded using existing chunk instead of new compilation.

+ `EScriptRunner`: alias of `Func<object?, object?>` delegate.
+ `T`: type of globals object.

### Execute

```cs
// globals type
public class CustomScriptState : EScriptState {
    public int somethingy = 114514;
}
// create runner
var runner = batch.Compile<CustomScriptState>("Debug.Log(somethingy)");
// execute
runner(new CustomScriptState());
```

### API

```cs
void EScriptSubmission.Remove(string submissionKey)
```
Delete a batch.

```cs
string EScriptSubmission.ListAllSubmissions()
```
Get the list of all submission batches.

## IScriptProvider

The backend API provides a lower level access to the roslyn compiling features.

### Current Provider

```cs
IScriptProvider EScript.ScriptProvider { get; }
```
Get the current provider, usually this is the roslyn compiler bundled in Elin Modding Kit.

```cs
void EScript.SetProvider(IScriptProvider provider = null)
```
Set the new provider, or disable with `null`.

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