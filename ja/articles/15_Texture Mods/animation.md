---
title: スプライトアニメーション
author: DK
description: キャラクターやアイテムのアニメーションスプライトの作り方
date: 2026/4/9 9:00
tags: Texture/Animation
---

# 準備

キャラクターとアイテムの両方でアニメーションスプライトを使用できます。

静止画像をアニメーションスプライトに変換するには、水平方向のスプライトシートと `.ini` ファイルを用意する必要があります。

`.ini` ファイルのファイル名、水平スプライトシートのファイル名、Mod 読み込み用 Excel の id 列は、すべて一致している必要があります。

![](./assets/boxchicken.png)

## INI ファイル

```ini
frame = 6
time = 0.066
```

これは 6 フレーム、66ms 間隔のアニメーションを定義します。

## サンプル Mod

<LinkCard t="Keeper of Garden Pole Dance" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3711895231" i="/pole.gif" />

<LinkCard t="Lost Case Monster Girl Takeover" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3609895215" i="https://images.steamusercontent.com/ugc/13866943819130003260/AF709B61B8CC0DB914A09239906A08359D2B0316/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" />

## バリエーション

アニメーションスプライトと[バリエーション](./variation)を組み合わせて、自動切り替えを行うことができます。


## 実行時の切り替え

特定のキャラクターのスプライトだけを差し替えるには（アニメーションでも静止画でも可）、**Texture** フォルダにある別のテクスチャの id を指定してスプライトオーバーライドを設定します。

```cs
chara.SetSpriteOverride("my_chara_alt");   // my_chara_alt.png、同名の .ini と .pref は任意
chara.SetSpriteOverride();                 // 元のスプライトに戻す
```

ドラマシートでは `set_sprite` を使います。

+ `my_chara_alt_snow.png` は雪バリエーションとして使われます。`.pref` がない場合はキャラクターの設定をそのまま使います。
+ オーバーライドはキャラクターと一緒にセーブされ、[カスタムスキン](./skins)より優先されます。
+ 独立したテクスチャ（`_idRenderData` に `@chara` を指定）を使うキャラクターにのみ有効です。タイルシートや PCC を使うキャラクター（バニラ NPC を含む）のマップ上のスプライトは変わりません。
