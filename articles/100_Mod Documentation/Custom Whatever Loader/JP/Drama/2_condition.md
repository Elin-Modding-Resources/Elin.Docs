---
title: 分岐 & 条件
author: DK
date: 2026/4/19 17:00
hide: true
---

## 実行条件

`if` / `if2` 列を使用して、その行の実行条件を設定できます：

|条件|引数|説明|
|-|-|-|
|`hasFlag`|flag|プレイヤーがそのフラグを持っており、値が0以外|
|`!hasFlag`|flag|プレイヤーがそのフラグを持っていない、または値が0|
|`hasMelilithCurse`||プレイヤーがMelilithの呪いにかかっている|
|`merchant`||プレイヤーが商人ギルドに所属している|
|`fighter`||プレイヤーが戦士ギルドに所属している|
|`thief`||プレイヤーが盗賊ギルドに所属している|
|`mage`||プレイヤーが魔法使いギルドに所属している|
|`hasItem`|[アイテムID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439)|プレイヤーが指定のアイテムを所持している|
|`isCompleted`|[クエストID](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=785701697#gid=785701697)|指定のクエストを既にクリアしている|

**条件の書式**は `条件,引数` です。拡張式もサポートしています：

```
=,test_flag,1
,counter,20
>,flag,0
!,flag,69
```

ほとんどの場合は `if` 列だけで十分です。より複雑な条件が必要な場合は、新しい列を挿入し、1行目の値を `if2` に設定してください。

## 動的条件

組み込みの `if` / `if2` 条件は**ドラマ読み込み時に1回だけ判定**されます。

特定の行を**動的に有効・無効**にしたい場合は、以下の方法を使用してください：

- `invoke*` 条件を使用する
- `bool` 型を返す `eval` アクションを使用する

![](../../assets/drama/drama_condition_line.png)

## 動的分岐

`jump` に `eval_result` を設定し、`string` 型を返す `eval` アクションを使用することで、**実行時にジャンプ先を動的に決定**できます。

![](../../assets/drama/drama_branch_line.png)
