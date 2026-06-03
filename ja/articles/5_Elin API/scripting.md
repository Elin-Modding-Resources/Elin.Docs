---
title: Scripting
author: DK
description: Plugins.Scripting とランタイム C# コンパイル
date: 2026/6/2 19:00
tags: API/Scripting/C#
---

# Plugins.Scripting

`Elin/Elin_Data/Managed/Plugins.Scripting.dll`

このアセンブリには `EScript` クラスとそのAPIが含まれており、Roslynコンパイラ（バージョン5.3.0）を使ってゲーム実行中にC#スクリプトをコンパイル・実行できます。

## ランタイムの仕様

+ C#言語バージョン：14
+ 既定の参照：現在のAppDomain内の全アセンブリ
+ 既定の名前空間：
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

## スクリプトの書き方

C#スクリプトは、完全な構文のコードでも、トップレベルステートメントでもどちらも使えます。以下はすべて有効です：

::: code-group

```cs [トップレベルステートメント]
var i = 100; return i << 5;
```

```cs [直接実行]
EClass._map.FindChara("tinymita").MakeAlly()
```

```cs [完全な構文]
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

### コンソールでの実行

コンソールから直接C#コードを実行できます：
```
cs.eval <ここにコードを入力>
```

スクリプトはフルパスまたは相対パスで読み込むことも可能です。相対パスの場合はゲーム本体の `Elin` フォルダか、任意のMOD内の `Exec` フォルダを参照します。
```
cs.file D:/MyScript/DoStuff.cs
cs.file /exporters/DoStuff
```

### API

```cs
string EScript.EvaluateScript(string script)
```
スクリプトを実行し、整形された結果を返します。このメソッドはスクリプトをキャッシュせず、呼び出すたびに再コンパイルします。

```cs
object? EScript.EvaluateAsCSharp(this string script, 
                                 object? globals = null,
                                 string useState = null, 
                                 bool useCache = true, 
                                 bool throwOnError = false)
```
スクリプトを実行し、実際の戻り値を返します。

+ `globals`：スクリプト内から直接アクセスできるオブジェクト（publicフィールドのみ）
+ `useState`：スクリプトの状態を識別するID。同じIDを使うことで、複数回の実行間でデータを保持できます
+ `useCache`：コンパイル済みスクリプトをキャッシュして再利用（ゲーム再起動で無効化）
+ `throwOnError`：コンパイルエラー時に `EScriptCompilationException` を投げる

## 提出（Submission）

`EScriptSubmission` はスクリプトを永続化するための専用APIです。初回作成時はコストがかかりますが、同じスクリプトを繰り返し実行する場合は高速で、ゲーム再起動後も保持されます。

### 提出グループ

```cs
EScriptSubmission EScriptSubmission.Create(string submissionKey)
```

`submissionKey` でスクリプト提出をグループ化できます。Dramaの各テーブルごとに一意のバッチを割り当てる、といった使い方が可能です。

### コンパイル

```cs
EScriptRunner EScriptSubmission.Compile<T>(string script)
```
スクリプトをコンパイル（または既存キャッシュから読み込み）し、`EScriptRunner` デリゲートを返します。既に同じ提出グループ内に存在する場合は再コンパイルせずキャッシュを利用します。

+ `EScriptRunner`：`Func<object?, object?>` のエイリアス
+ `T`：グローバルオブジェクトの型

### 実行

```cs
// グローバルオブジェクトの型
public class CustomScriptState : EScriptState {
    public int somethingy = 114514;
}
// runnerの作成
var runner = batch.Compile<CustomScriptState>("Debug.Log(somethingy)");
// 実行
runner(new CustomScriptState());
```

### API

```cs
void EScriptSubmission.Remove(string submissionKey)
```
指定した提出グループを削除します。

```cs
string EScriptSubmission.ListAllSubmissions()
```
現在存在するすべての提出グループ一覧を取得します。

## IScriptProvider

Roslynコンパイラへのより低レベルなアクセスを提供するインターフェースです。

### 現在の実装

```cs
IScriptProvider EScript.ScriptProvider { get; }
```
現在のプロバイダを取得します。通常はElin Modding Kit内蔵のRoslynコンパイラです。

```cs
void EScript.SetProvider(IScriptProvider provider = null)
```
新しいプロバイダを設定します。`null` を渡すと無効化されます。

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