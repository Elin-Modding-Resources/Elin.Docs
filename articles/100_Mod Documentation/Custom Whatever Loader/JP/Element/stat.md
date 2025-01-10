---
title: カスタム状態
date: 2025/1/3 01:00
hide: true
---

## カスタム状態

カスタム状態クラスは **Condition** から派生する必要があり、一般的なクラスには **Condition**、**BadCondition**、**BaseDebuff** などがあります。
```cs
internal class ConCarbonated: ConDrunk;
```

カスタム状態はカスタムアイコンを持つこともでき、アイコンは **Texture** フォルダーに配置する必要があります。ファイル名は **alias** と同じにする必要があり、例えば **ConCarbonated.png** です。

テクスチャのサイズが32x32でない場合、CWLはそれを32x32に調整します。