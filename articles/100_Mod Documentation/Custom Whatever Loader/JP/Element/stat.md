---
title: カスタム状態
date: 2025/1/3 01:00
hide: true
---

## カスタム状態

CWLは、あなたのカスタムステータス表（表名: Stat）をインポートし、ゲームに追加することができます。ただし、あなたのカスタムステータスには以下の点に注意が必要です：

**id**：ユニークな数字で、これはステータスのIDです。  
**alias**：ステータスのエイリアス、文字列IDです。  
**type**：このステータスに対応するC#タイプ名です。  

残りはあなたが定義します。あなたは[Elin Modding Wiki](https://elin-modding-resources.github.io/Elin.Docs/)やElin Sourcesを参照することができます。

カスタム状態クラスは **Condition** から派生する必要があり、一般的なクラスには **Condition**、**BadCondition**、**BaseDebuff** などがあります。
```cs
internal class ConCarbonated: ConDrunk;
```

カスタム状態はカスタムアイコンを持つこともでき、アイコンは **Texture** フォルダーに配置する必要があります。ファイル名は **alias** と同じにする必要があり、例えば **ConCarbonated.png** です。

テクスチャのサイズが32x32でない場合、CWLはそれを32x32に調整します。