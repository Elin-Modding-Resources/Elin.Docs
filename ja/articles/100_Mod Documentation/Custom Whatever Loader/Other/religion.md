---
title: カスタム信仰
date: 2025/1/3 01:00
hide: true
---

## カスタム信仰

随便ロードは、あなたのカスタム信仰表（表名: Religion）をインポートし、ゲームに追加することができます。ただし、あなたのカスタム信仰IDは **cwl_** で始まる必要があります。例えば：**cwl_spaghettigod**。

デフォルトでは、この信仰は参加可能であり、弱神ではありません。また、IDにオプションのタグを追加することもできます：
- 弱神に設定するには、**#minor** を追加します。
- 参加不可にするには、**#cannot** を追加します。

例えば：**cwl_spaghettigod#minor#cannot** は、弱神の信仰として設定され、参加できなくなります。しかし、あなたの信仰の実際のIDは依然として **cwl_spaghettigod** であり、インポート時にタグは削除されます。

信仰のためのオプションのカスタムポートレートを作成するには、**Texture** フォルダーに **.png** 画像を入れ、信仰 ID と同じファイル名を使用してください。例えば、**cwl_spaghettigod.png** のように。

コマンドコンソールの `cwl.spawn_altar` を使用して、指定したカスタム信仰祭壇を生成することができます。

## 信仰会話

随便ロードは、あなたのカスタム **god_talk.xlsx** をゲームに統合します。このファイルは必須です。ゲームの表を参照できます。パスは **Elin/Package/_Elona/Lang/JP/Data/god_talk.xlsx** です。

![img](https://i.postimg.cc/P5V71tTq/image.png)

あなたのカスタム **god_talk.xlsx** には、自分の信仰IDの対話のみを含めるべきです，`LangMod/**/Data` フォルダーに置いてください。

コンソールコマンド `cwl.data.load_god_talk` を使用して、すべての神の会話を再読み込みできます。

## 信仰能力

カスタム信仰の能力として能力を作成するには、その能力にタグ **godAbility,religion_id** を追加します。例えば、カスタム信仰 **cwl_spaghettigod** の使用時に神の会話をトリガーする能力を作成するには、タグ **godAbility,cwl_spaghettigod** を使用します。

## 信仰Artifact

カスタムアイテムを神のアーティファクトとして願いを叶えられるようにするには、そのアイテムにタグ **godArtifact,religion_id** を追加します。

## ファクションElement

カスタム信仰がアクティブなときにのみ適用されるファクションElementのリストを定義することもできます。これは、`LangMod/**/Data/` フォルダー内に `religion_elements.json` という名前のシンプルなJSONファイルを提供することで行います。
```json
{
    "cwl_spaghettigod": [
        "vopal",
        "eleLightning",
        "bane_all",
        "r_life"
    ],
    "cwl_example_religion2": [
        data...
    ]
}
```

カスタム信仰のためにファクションElementが定義されると、カスタム神のアーティファクトアイテムの一致するElementはファクションElementに変わり、カスタム信仰がアクティブなときにのみ有効になります。

コンソールコマンド `cwl.data.load_religion_elements` を使用して、すべての信仰ファクションElementを再読み込みできます。

## 信仰奉納

信仰奉納の倍数はカテゴリごとに表で定義されていますが、`LangMod/**/Data/` フォルダ内に `religion_offerings.json` というシンプルなJSONファイルを置くことで、特定のアイテムに対してカスタム倍数を設定することも可能です。
```json
{
    "cwl_spaghettigod": {
        "spaghetti": 5
    },
    "cwl_religion2": {
        "random_item": 2
    }
}
```

例えば、信仰 `cwl_spaghettigod` に対してアイテム `spaghetti` を供えると、その奉納価値は5倍になります。

すべての信仰奉納倍数を再読み込みするには、コンソールコマンド `cwl.data.load_religion_offerings` を使用してください。