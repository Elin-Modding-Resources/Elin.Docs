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
        "num": 1,
        "delay": 0.1,
        "idEffect": "gunfire",
        "idSound": "attack_gun",
        "spriteId": "ranged_gun",
        "eject": true,
        "firePos": {
            "x": 0.23,
            "y": 0.04
        }
    }
}
```

これは`biubiu_gun`という名前のgunデータをインポートします。これはあなたの遠隔武器IDと同じである必要があります。そうでない場合、ゲームはあなたの遠隔武器にそのタイプのデフォルトデータをロードします。また、ゲーム内に既存の武器IDを使用して上書きすることもできます。

`num`は連射回数、`delay`はアニメーションフレームの遅延、`idEffect`は発射エフェクトのID、`spriteId`は発射物のテクスチャ名で、これはゲーム内に存在するテクスチャ名または**Texture**フォルダーに配置したテクスチャ名（.pngを除く）である必要があります。`eject`は弾殻のアニメーションを伴うかどうかを決定し、`firePos`は武器の中心に対する発射エフェクトの位置です。

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