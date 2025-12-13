---
title: 実行時 C# スクリプト
description: 本ガイドでは、**CWL** を使用してゲーム実行中に C# スクリプトを実行する方法、および Mod 用のスクリプトコードの作成と管理方法を紹介します
date: 2025/12/13 14:00
author: DK
tags: Guide/CWL/C#
hide: true
---

::: warning
**バージョン要件**：CWL **1.21.0** 以上
:::

## コンソールスクリプト

デバッグ、バグ修正、数値テスト、またはちょっとした実験用。

### C# 式を直接実行

次のコンソールコマンドを使用します：

```cs
cwl.cs.eval EClass.pc.party.members
```

スクリプトの戻り値はそのままコンソールに表示され、
コレクションは自動的に展開されます。

### 簡単なロジックコードの実行

1 行の中で変数定義や少し複雑な処理を書くこともできます：

```cs
cwl.cs.eval var i = EClass.rnd(150) * 2; EClass.pc.AddElement("featMetal", i);
```

### 外部スクリプトファイルの実行

スクリプトが長い場合や、繰り返し使用したい場合は、
ファイルを直接実行できます（**絶対パス**が必要）：

```
cwl.cs.file D:\...\demo_script.cs
```

## スクリプトステート（Script State）

**スクリプトステート**は、複数回の `cwl.cs.eval` 実行の間で
**変数を保持する**ための仕組みです。

CWL はスクリプトステートのスタックを提供しており、
すべてのスクリプトはスタックの最上位にあるステートを通して
データを共有できます。

### スクリプトステートを有効化してスタックの先頭に追加

```
cwl.cs.state.push my_state
```

### 共有変数の読み書き

```cs
cwl.cs.eval Script["counter"] = 25;
cwl.cs.eval var value = (int)Script["counter"];
```

**注意**：有効なスクリプトステートが存在しない場合、
各スクリプトの実行は**完全に独立**となり、
`Script[...]` は使用できません。

### スクリプトステートの管理

現在のステートをポップ（データは保持）：

```
cwl.cs.state.pop
```

指定したステートをクリアして削除：

```
cwl.cs.state.remove my_state
```

現在のステートスタックを表示：

```
cwl.cs.state
```

## スクリプトのコンパイル

::: tip
初めてスクリプト Mod を作成し、より多くの機能を使いたい場合は、
IDE を使った開発方法について
[スクリプト Mod ガイド](../../../../2_Getting%20Started/Script%20Mods/script_mod)
を読むことを強くおすすめします。
:::

CWL には **組み込みのスクリプトコンパイラ** が用意されています。

### Script フォルダの自動コンパイル

Mod の **`Script`** フォルダに `.cs` ファイルを置くと、
CWL が自動的にアセンブリへコンパイルし、
デバッグ用の PDB も生成します。
**追加のコンパイルツールやプロジェクトファイルは不要**です。

カスタム型やイベントを提供するだけの
シンプルなコードに適しています。

### 例：カスタム型の定義

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

### コンパイル特性について

スクリプトは、ゲーム本体および
ロード済みのすべてのアセンブリ（Mod 含む）を自動的に参照します。
コンパイル後、未使用の参照は自動的に削除されます。

**C# 14** の構文機能に対応しています。

## スクリプトのライフサイクルイベント

`CwlScript` クラスを定義することで、
スクリプトのロード／アンロード時のイベントを監視できます。

```cs
public class CwlScript
{
    internal static void CwlScriptLoad()
    {
        // スクリプトアセンブリがロードされた時に呼び出される
    }

    internal static void CwlScriptUnload()
    {
        // スクリプトアセンブリがアンロードされた時に呼び出される
    }
}
```
