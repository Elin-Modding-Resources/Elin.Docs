---
title: 固定附魔
date: 2025/7/16 01:00
hide: true
---

## 固定/ランダム要素

ゲームがアイテムを生成する際、最終的なエンチャント効果が必ずしも期待通りになるとは限りません。この違いは、アイテムが装備品であるかどうか、ユニークであるかどうか、または他の固有の属性など、いくつかの要因から生じます。生成プロセスには一定のランダム性が加わります。

しかし、アイテムをソーステーブルの **elements** 列に指定された正確な要素に従って生成したい場合は、**`fixedElement`** タグを追加することができます。このタグはランダム生成の部分を上書きし、リストに記載された正確な要素が正確に適用されることを保証します。

逆に、**`randomElement`** を使用することで、ランダム性を加えることができます。