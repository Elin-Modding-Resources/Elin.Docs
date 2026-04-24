---
title: ドラマ基礎
author: DK
date: 2026/4/19 17:00
hide: true
---

## ドラマ

ドラマは、複数選択肢の対話と追加アクションによって構成される、豊かで没入感のあるインタラクションシステムです。

![](./assets/drama_eg.png)

キャラクターに独自のドラマを定義するには、`addDrama_ドラマテーブル名` タグを使用してください。CWLは自動的にそのドラマへ関連付けを行います。

カスタムドラマテーブルは `LangMod/**/Dialog/Drama/` フォルダ内に配置し、ファイル名はタグ名と一致させる必要があります。
例：`addDrama_drama_example` を使用する場合は、`Dialog/Drama/drama_example.xlsx` ファイルに対応させます。

**<span class="text-amber-300">重要</span>**: ドラマテーブルは **1つだけ** 提供してください。どの言語のサブフォルダに置いても構いません。CWLは同一テーブル内で多言語ローカライズに対応しています。

制作時はゲーム内蔵のドラマテーブル **Elin/Package/_Elona/Lang/_Dialog/Drama** を参考にしてください。また、テンプレート付きのサンプル「Tiny Mita」も非常に参考になります：
<LinkCard t="CWLサンプル：Tiny Mita" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3396774199" i="https://raw.githubusercontent.com/gottyduke/Elin.Plugins/refs/heads/master/CwlExamples/TinyMita/preview.jpg" />

::: tip ホットリロード
ドラマテーブルはゲーム実行中に編集・保存すると、次に会話を開いたタイミングで自動的に再読み込みされます。
:::

## 基本構造

ドラマテーブルは上から順に実行されます。複数の「剧情单元（ドラマ行）」で構成され、各行は以下の列（1行目で定義）を持ちます：

- `step`：以降の行動がこのステップに属することを示す。次の `step` が出現するまで有効
- `jump`：この行が実行されたときにジャンプする対象のステップ名
- `if` / `if2`：実行条件。`if2` も存在する場合は両方の条件を満たす必要がある
- `action`：実行するアクション
- `param`：アクションのパラメータ
- `actor`：現在発言するキャラクターのID（複数人会話用）。デフォルトは `tg`。後ろに `?` を付けると名前が `???` で表示される
- `id`：テキスト行の一意の識別子（テキスト行の場合必須）
- `text_XX` / `text_JP` / `text_EN`：実際の会話テキスト。`XX` は言語コード（例：`text_CN`、`text_ZHTW`）。`text` 列は言語コードが欠落した場合の代替として使用される

![img](../../assets/drama/drama.png)

ドラマは「ステップ」を単位として連結して実行されます。1つのステップには複数のドラマ行を含めることができ、対話・アクション・条件分岐を混在させることが可能です。

`main` はデフォルトの開始ステップ、`end` はデフォルトの終了ステップです。
カスタムステップ名にはアンダースコア `_` や `flag` 接頭辞を使用しないでください（内部ステップと衝突する恐れがあります）。

## Mod Help との連携

プレイヤーに、あなたの素晴らしいドラマをより深く楽しんでもらうためのヒントを提供したい場合があります。CWLでMODを作成している場合、**Mod Help** を利用して、独自のヘルプページをゲーム内に追加することができます。

<LinkCard t="Mod Help" u="/100_Mod Documentation/Mod Help/1_mod_help_jp.md" i="https://raw.githubusercontent.com/Drakeny/Elin.ModHelp/refs/heads/main/package/ModHelp.png" />
