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
        "SpriteId": "ranged_gun",
        "Eject": true,
        "FirePos": {
            "x": 0.23,
            "y": 0.04
        }
    }
}
```

これは`biubiu_gun`という名前のgunデータをインポートします。これはあなたの遠隔武器IDと同じである必要があります。そうでない場合、ゲームはあなたの遠隔武器にそのタイプのデフォルトデータをロードします。また、ゲーム内に既存の武器IDを使用して上書きすることもできます。

+ `Num` は連発回数です。  
+ `Delay` はアニメーションフレームの遅延です。  
+ `IdEffect` は発動エフェクトのIDです。  
+ `IdSound` は発動音のIDです。カスタムオーディオを使用する場合は、**Sound** フォルダーに配置する必要があります。  
+ `SpriteId` は発射物のテクスチャ名で、ゲーム内に存在するテクスチャ名または**Texture** フォルダーに配置したテクスチャ名（.pngを除く）である必要があります。  
+ `Eject` は弾殻を投げ出すアニメーションが付随するかどうかを決定します。  
+ `FirePos` は武器の中心に対する発動エフェクトの位置です。  

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