---
title: About CWL
date: 2025/1/3 01:00
hide: true
---

![Version](https://raw.githubusercontent.com/gottyduke/Elin.Plugins/master/CustomWhateverLoader/assets/CWL_banner.png)

ゲームが自動的にモジュールディレクトリからモジュール制作者のカスタムリソースをロードできるようにし、モジュール制作者がさまざまなゲーム機能を利用するプロセスを簡素化し、追加の手順を必要とせず、ローカライズサポートを拡張します。

新しいアイテム、キャラクター、要素、または音声を導入するモジュールに非常に適しており、CWLはDLLを使用して表をインポートする手間を省きます。

## サポート

- ソース表（キャラクター、アイテム、種族、対話など）
- カスタム冒険者
- カスタム商人
- カスタム能力
- カスタム宗教
- カスタムマテリアル (Feat, Ability, Spell)
- セリフ・ドラマ
- 本のテキスト
- 上記のすべてには拡張ローカリゼーション サポートが含まれています
- 音声/BGM
- 多くの修正と最適化
    - 統合インポートによりロード時間が短縮されます
    - ソーステーブルの互換性を自動的に検出します
    - ソーステーブル解析例外を再スローし、詳細情報を添付します
    - 読み込みを妨げるカスタム要素/タスク/カードを削除します
- 機能豊富な API

必要に応じて新機能を追加します。

## サンプルモジュール設定

CWLは、Modを**LangMod**フォルダーに配置することを要求します。**Lang**ではありません。そうしないと、ゲームは翻訳ツリー全体をあなたのモジュールフォルダーにコピーします。**LangMod**フォルダー内では、言語コードを使用してサブフォルダーを命名することで、任意の数のサポート言語を追加できます。例えば：

![img](https://i.postimg.cc/tJypn1Ys/image.png)

CWLがリソースをインポートする際は、現在の言語フォルダーから優先的にインポートされ、現在のElin xlsxの翻訳問題を効果的に解決します。なぜなら、ほとんどのワークシートには通常JPとENのエントリしか含まれていないからです。

## カスタムソース表

各言語フォルダーにxlsxファイルを単純に置くだけで、各xlsxワークシート上で**ModUtil.ImportExcel**を手動で呼び出す必要はありません。CWLは、SourceDataまたはSourceLangと一致する表名に基づいて、すべてのローカライズされたソースをインポートします。

注意すべきは**表名**であり、ファイル名ではありません！例えば、これはそれぞれ**SourceThing**、**SourceChara**、**LangGeneral**をインポートします。
![img](https://i.postimg.cc/vZqGNjfC/Screenshot-1.png)

サポートされている`SourceData`：
```:no-line-numbers
Chara, CharaText, Tactics, Race, Job, Hobby
Thing, ThingV, Food, Recipe, SpawnList, Category, Collectible, KeyItem
Element, Calc, Stat, Check, Faction, Religion, Zone, ZoneAffix, Quest, Area, HomeResource, Research, Person
GlobalTile, Block, Floor, Obj, CellEffect, Material
```

サポートされている`SourceLang`：
```
General, Game, List, Word, Note
```

管理を容易にするために、ワークシートを複数のxlsxファイルに分割することもできます。xlsxファイル名は関係ありません。

ゲーム中のアイテム/キャラクター/さまざまなソースのIDを参照したい場合は、Elin Sourcesを確認してください：

![img](https://i.postimg.cc/15wF6V2L/image.png)

## 使用例

CWLの使用例をいくつか確認するには、以下のモジュール（およびその他）をご覧ください：

<LinkCard t="Mods Using CWL" u="https://steamcommunity.com/workshop/filedetails/discussion/3370512305/501685815345180661/" />

## コードのローカライズ

テキストエントリを`General`テーブルにエクスポートし、CWLに`LangGeneral`にインポートさせることで、実行時に **`"my_lang_str".lang()`** を使用してコードをローカライズできます。

![img](https://i.postimg.cc/76HS3t8M/image.png)
