---
title: 遠距離武器
author: DK
description: Add custom guns with custom effects.
date: 2025/1/16 01:00
tags: Mod/CWL/Guns
---

## 指定スロット

アイテム表（Thing）で `addSocket` および `addSocket(エンチャントalias)` タグを使用することで、銃器のスロットを指定できます。例えば、`addSocket,addSocket,addSocket(bane_god)` と記述すると、空のスロットが2つと、エンチャント「God Bane」が付いたスロットが1つ追加されることが保証されます。

また、`noRandomSocket` タグを使用すると、カスタムスロットを適用する前にすべてのランダム生成スロットを削除できます。

## 遠距離武器データのインポート

遠距離武器のデータをカスタマイズしたい場合があります。ガンのデータは、`LangMod/**/Data/`フォルダー内にある`EffectSetting.guns.json`という名前の**JSONファイル**です。

```json
{
    "biubiu_gun": {
        "Num": 1,
        "Delay": 0.1,
        "IdEffect": "gunfire",
        "IdSprite": "ranged_gun",
        "IdSound": "attack_gun",
        "IdSoundEject": "bullet_drop",
        "Eject": true,
        "FirePos": {
            "x": 0.23,
            "y": 0.04
        },
        "FireFromMuzzle": false,
        "CaneColor": "",
        "CaneColorBlend": false,
        "ForceLaser": false,
        "ForceRail": false,
    }
}
```

これは、遠距離武器のIDと一致するはずの`biubiu_gun`という名前のガンデータをインポートします。ゲーム内の既存の武器IDを使用して、それを**上書き**することもできます。

ゲーム内の既存のガンデータは次のとおりです。

::: details ガンデータ
<<< ../../assets/guns.json
:::

+ `Num` は、バースト（連射）内の**ショット数**です。
+ `Delay` は、**アニメーションの遅延時間**を秒単位で指定します。
+ `IdEffect` は、[マズルフラッシュエフェクトのID](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-effects-md)です。[カスタムエフェクト](../Other/effects)を使用できます。デフォルト値は`gunfire`です。レーザーやケイン（杖）タイプの武器ではこの値は使用されません。
+ `IdSprite` は、**弾丸のテクスチャ名**です。ゲーム内の既存のテクスチャ、または**Texture**フォルダーに配置したテクスチャである必要があります。レーザーではこの値は使用されません。
+ `IdSound` は、**発射音のID**です。[カスタムサウンド](../Other/sound)を使用できます。これはすべての種類のガンに設定できます。
+ `IdSoundEject` は、**排弾丸音のID**です。[カスタムサウンド](../Other/sound)を使用できます。これはすべての種類のガンに設定できます。
+ `Eject` は、**弾丸排出アニメーション**があるかどうかを決定します。これはすべての種類のガンに設定できます。
+ `FirePos` は、**武器の中心を基準としたマズルフラッシュエフェクトのオフセット位置**です。これはすべての種類のガンに設定できます。
+ `FireFromMuzzle`（**new!**）は、**弾丸が銃口から発射されるか、デフォルトでプレイヤーの体から発射されるか**を決定します。これはすべての種類のガンに設定できます。
+ `CaneColor` は、**ケイン（杖）タイプ**の武器用のオプションの**色合いのオーバーライド**です。空白のままにすると、武器のデフォルトの元素の色が使用されます。形式は `RRGGBB` 16 進文字列です。特性`ToolRangeCane`を持つガンのみがこの値を使用できます。
+ `CaneColorBlend` は、ケインタイプ武器の**デフォルトカラーとオーバーライドカラーのブレンド**を有効にします。特性`ToolRangeCane`を持つガンのみがこの値を使用できます。
+ `ForceLaser` は、ガンに**レーザーアニメーション**の使用を強制します（23.206 Nightlyで追加）。ガンが特性`ToolRangeGunEnergy`を持っている場合、これは**不要**です。
+ `ForceRail` は、ガンに**レールガンアニメーション**の使用を強制します。**これは、特性`ToolRangeGunEnergy`を持つガンのデフォルトの動作ではなくなりました。**

このファイルには、必要な数のガンデータを追加できます。単純に`,`コンマで区切ってください。例：

```json
{
    "biubiu_gun": { 
        data 
    },
    "rainbow_wand": {
        data
    }
}
```

コンソールコマンド `cwl.data.load_effect_setting` を使用して、すべてのガンデータを**リロード**できます。