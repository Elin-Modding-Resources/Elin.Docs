---
title: EffectData/Gun
date: 2025/1/16 01:00
hide: true
---

## 遠隔武器データのインポート

時には、遠隔武器にカスタムデータを設定したいと思うことがあります。gunsデータはJSONファイルで、あなたの`LangMod/**/Data/`フォルダーに保存されており、名前は`EffectSetting.guns.json`です。
```json
{
    "biubiu_gun": {
        "Num": 1,
        "Delay": 0.1,
        "IdEffect": "gunfire",
        "IdSound": "attack_gun",
        "IdSprite": "ranged_gun",
        "Eject": true,
        "FirePos": {
            "x": 0.23,
            "y": 0.04
        },
        "CaneColor": "03fcdf",
        "CaneColorBlend": false
    }
}
```

これは`biubiu_gun`という名前のgunデータをインポートします。これはあなたの遠隔武器IDと同じである必要があります。そうでない場合、ゲームはあなたの遠隔武器にそのタイプのデフォルトデータをロードします。また、ゲーム内に既存の武器IDを使用して上書きすることもできます。

+ `Num` は連発回数です。  
+ `Delay` はアニメーションフレームの遅延です。  
+ `IdEffect` は発動[エフェクトのIDです](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-effects-md)。  
+ `IdSound` は発動音のIDです。カスタムオーディオを使用する場合は、**Sound** フォルダーに配置する必要があります。  
+ `IdSprite` は発射物のテクスチャ名で、ゲーム内に存在するテクスチャ名または**Texture** フォルダーに配置したテクスチャ名（.pngを除く）である必要があります。  
+ `Eject` は弾殻を投げ出すアニメーションが付随するかどうかを決定します。  
+ `FirePos` は武器の中心に対する発動エフェクトの位置です。  
+ `CaneColor` はオプションの杖類武器の色調オーバーレイで、空白の場合は武器のデフォルト要素の色が使用されます。
+ `CaneColorBlend` は、杖類武器の色調オーバーレイ時に元の色と混合するかどうかを決定します。
+ 
このファイルに好きなだけ銃のデータを追加できます。単に `,` カンマで区切ってください。
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

::: warning フォーマットの変更
CWL 1.20.14から、以前のエントリ`SpriteId`は上記の`IdSprite`によって非推奨となりましたが、引き続き受け入れられます。  
:::