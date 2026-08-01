---
title: Job 職業
author: Han
description: Comments about columns of Job sheet.
date: 2025/12/11 00:00
tags: SourceSheet/Job
---

# 職業シート (Job)

<LinkCard t="SourceChara/Job" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />

職業シートは Chara シート内にあり、下部のタブで切り替えられます。

ソースシートを作成する際は、必ず公式行の先頭3行をコピーし、4行目からデータを記入してください。列の順序は変更しないでください。

## 列の説明

|列名|型|説明|
|-|-|-|
|id|string|エントリをシート内の他のすべてのものと区別する最も重要なセルです。IDがバニラのエントリや他のModのエントリと重複した場合、最後に読み込まれたシートがそれ以前のすべてを上書きします。この値にはスペースや特殊文字を含めることはできません。|
|name_JP|string|この職業の日本語表示名。|
|name|string|この職業の英語表示名。他の言語は SourceLocalization.json を使用します。|
|playable|integer|キャラクター作成時にこの職業がプレイヤーに使用可能かどうかを指定します（判定は種族シートと同じ）。`1`：標準で選択可能。`2`–`6`：「追加種族」オプションが必要。`7`–`8`：「全種族」オプションが必要。`9`：どの設定でも選択できません。|
|STR/END/DEX/PER/LER/WIL/MAG/CHA/SPD|integer|この職業からキャラクターに追加される追加属性パラメータ。|
|ratio|—|職業の強さを概算するマクロ。ゲーム内では未使用ですが、シート内に存在する必要があります。空白のままにしてください。|
|elements|elements|この職業に付与される固有エレメント。職業の特技や基本スキルボーナスを追加するために使用されます。フォーマット：`エレメントエイリアス/値`。|
|weapon|string[]|武器アイテム名のリスト。キャラクター生成時にアイテムを装備させるために使用されます。例えば、デフォルトの戦士クラスのNPCは、`sword`、`axe`、`blunt`、`polearm`、`scythe` のいずれかをランダムに装備します。|
|equip|string|遠距離武器の装備テンプレート。実際に効果があるのは3つだけで、いずれも**小文字・大文字小文字を区別**します：`archer`（弓／クロスボウ）、`inquisitor` と `gunner`（銃）。`none` を指定すると装備をまったく生成しません。それ以外の装備は `weapon` 列と種族の EQ で決まり、この列とは関係ありません。|
|domain|elements|この職業が開始時に持つ領域。エレメントのエイリアスで指定します（例：`eleFire,eleCold,eleLightning`）。**空欄＝領域なし ではありません**——この列の既定値が `eleFire,eleCold,eleLightning` です。|
|detail_JP|string|この職業の日本語詳細/背景設定。|
|detail|string|この職業の英語詳細/背景設定。|
