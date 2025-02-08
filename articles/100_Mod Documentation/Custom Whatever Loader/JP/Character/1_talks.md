---
title: 対話 & ドラマ
date: 2025/1/3 01:00
hide: true
---

## 喊叫

特定の状況下で、キャラクターは特定のセリフをトリガーし、そのセリフが頭上に表示されます。

![](./assets/bark.png)

これらのセリフは **CharaText** テーブルに記載されており、あなたのキャラクターは **idText** セルにそのセリフの ID を入力してリンクさせます。

![](./assets/charatext.png)

|セル|calm|fov|aggro|death|kill|
|-|-|-|-|-|-|
|トリガー|通常状態|視界内|怒り|死亡|キル|

## 対話

キャラクターと話すための対話を追加したい場合は、`LangMod/**/Dialog/` フォルダーに `dialog.xlsx` テーブルを準備します。

![img](./assets/dialog.png)

このテーブルの形式はゲームの対話テーブル **Elin/Package/_Elona/Lang/_Dialog/dialog.xlsx** と同じですが、`unique` テーブルとあなたのキャラクター ID を含む行だけを用意すれば大丈夫です。
****
![](./assets/unique.png)

ここでの ID はキャラクター ID と同じです。

## ドラマ

ドラマはキャラクターとの豊かな対話であり、通常は選択肢や分岐、いくつかのトリガーアクションを含みます。

![](./assets/drama_eg.png)

キャラクターにカスタムドラマを追加するには、`addDrama_DramaSheetName` タグを使用します。CWL はそのドラマを自動的にリダイレクトします。

あなたのカスタムドラマテーブルは `LangMod/**/Dialog/Drama/` フォルダーに置く必要があり、名前はタグと一致する必要があります。例えば、`addDrama_MyCharaDrama` を使用すると、`Dialog/Drama/MyCharaDrama.xlsx` に対応します。

自分のドラマを作成する際は、ゲーム内のドラマテーブルを参照することができ、パスは **Elin/Package/_Elona/Lang/_Dialog/Drama** です。また、Tiny Mita の例を参照することもでき、テンプレートドラマテーブルがあります：

<LinkCard t="CWL Example: Tiny Mita" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3396774199" />

![img](./assets/drama.png)

::: tip ホットリロードドラマ
ドラマテーブルはゲーム中に編集して保存することができ、対話のたびにホットリロードされます。
:::

## ドラマ拡張

::: warning 一時的なバージョン
この文書の一部は一時的に作成されたもので、具体的なAPIや使用法は随時変更される可能性があります。
:::

ゲームに付属する `action` が望んだ効果を達成できずに困っていますか？CWLは、カスタムドラマ拡張メソッドをアセンブリに追加し、ドラマ表で呼び出すことを許可します。

この機能を使用するには、CWLの設定値 `Dialog.ExpandedActions` を `true` に設定する必要があります。デフォルトでは有効になっています。

### カスタム拡張の追加

まず、`DramaOutcome` から派生したクラスを定義します。これにより、CWLはこのクラス内のドラマ拡張形式に適合するすべてのメソッドをドラマメソッド表に追加します。

次に、あなたのドラマ拡張メソッドは以下のCWL形式に従う必要があります：静的 `static` で、戻り値は `bool`、受け取るパラメータは `DramaManager dm, Dictionary<string, string> line, params string[] parameters` の3つです。

```cs
internal class MyDramaExpansion : DramaOutcome
{
    internal static bool honk_honk(DramaManager dm, Dictionary<string, string> line, params string[] parameters)
    {
        return true;
    }
}
```

戻り値は、この `action` を実行した後に指定された `jump` セクション（ある場合）にジャンプするかどうかを決定するために使用されます。

### 呼び出し方法

ドラマ表では、CWLの特殊アクション `invoke*` を使用してあなたのメソッドを呼び出すことができます:
![](./assets/dramae_invoke.png)

### パラメータの渡し方

パラメータは英語のカンマ `,` で区切り、拡張メソッドの括弧内に記述します。コードの文法に似ています：

```
invoke* honk_honk(arg1, arg2)
```

あなたの拡張メソッドのコード内では、パラメータは `parameters` として渡され、C# 8の構文を使用してパラメータのアサーションや手動チェックを行うことができます：

```cs
internal static bool honk_honk(DramaManager dm, Dictionary<string, string> line, params string[] parameters)
{
    // パラメータの主張: 2つのパラメータを渡す必要があります
    if (parameters is not [{ } soundId, { } arg2]) {
        return false;
    }

    pc.PlaySound(soundId);
    // arg2を使用

    return true;
}
```

また、パラメータが有効であることを確認するために、好みの方法を使用することもできます。一般的なパラメータチェックの方法には、以下が含まれますが、これに限りません：

```cs
[{ } arg1, { } arg2] // 2つのパラメータを渡す必要があります
[{ } arg1, .. { } args] // 少なくとも1つのパラメータを渡す必要があります
```

もしあなたのメソッドがパラメータを必要としない場合は、何のチェックも必要ありません。

### 例外処理

拡張メソッドのコード内で、続行すべきでないエラー（無効なパラメータや無効なIDなど）が発生した場合、直接例外をスローすることができます。例えば、CWLが内部でパラメータをチェックする際には、以下のような例外を使用します：
例外をスローすると、メソッドの戻り値はデフォルトで `false` となり、ゲーム内でドラマ異常のメッセージが表示されます。

```cs
if (parameters is not [{ } id, { } tag]) {
    throw new DramaActionArgumentException(parameters);
}
```

### CWL拡張

CWLには一部のドラマ拡張メソッドが付属しており、[それらのコード](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/API/Drama/DramaExpansion.cs)を確認できます。

特に `build_ext` と `emit_call` の2つの拡張メソッドは、外部アセンブリの静的メソッドを直接呼び出すことを可能にします。例えば：

![](./assets/dramae_ext.png)

この機能を使用するには、CWLの設定値 `Dialog.ExpandedActionsAllowExternal` を `true` に設定する必要があります。デフォルトでは有効になっています。