---
title: カスタムAbility/Spell
date: 2025/1/3 01:00
hide: true
---

## カスタムElement

CWL、あなたのカスタム要素テーブル（テーブル名: Element）をインポートし、ゲームに追加することができます。ただし、あなたのカスタム要素には以下の点に注意する必要があります：

**id**：ユニークな数字で、これは要素のIDです。  
**alias**：要素のエイリアス、文字列ID。  
**type**：この要素に対応するC#のタイプ名。  
**group**：**FEAT**, **ABILITY**または**SPELL**のいずれか。  
**tag**：ゲームのロード時に要素を自動的にプレイヤーに付与したい場合は、**addEleOnLoad**を追加してください。  

残りはあなたが定義します。あなたは[Elin Modding Wiki](https://elin-modding-resources.github.io/Elin.Docs/)やElin Sourcesを参考にできます。

## カスタムAbility/Spell

例えば、私たちは能力**ActLionDance**を追加したいと思っています。これは以下のようになります：

![img](https://i.postimg.cc/90PTN1r1/doc-custom-ele.png)

![img](https://i.postimg.cc/XY6Nv31Z/image.png)

**alias**と**type**は同じである必要はありませんが、能力アイコンのテクスチャは**alias**を参照し、要素オブジェクトの例は**type**にリンクされます。

あなたのスクリプトdllには、以下のコードが必要です：
```cs
internal class ActLionDance : Act
{
    public override bool Perform()
    {
        pc.Say("ライオンダンス!!");
        return true;
    }
}
```

このクラスは**Element**から派生しなければなりません。一般的には**Act**、**AIAct**、**Ability**、**Spell**などがあり、使用目的によって異なります。

あなたのクラスは任意の名前空間で宣言できます。CWLは自動的にタイプ名を制限するため、**type**はクラス名そのものだけで構いません。

あなたの要素アイコンは**Texture**フォルダーに配置する必要があり、**alias**と同じファイル名を使用してください。例えば**ActLionDance.png**のように。また、パターンマッチングを使用して複数の要素に同じアイコンを割り当てることもできます。例えば、すべての**alias**が`my_ele`で始まる要素に同じアイコンを割り当てる場合、そのファイル名は`@my_ele.png`である必要があります。このアイコンは`my_ele_1`、`my_ele_2`、`my_ele_fire`、`my_ele_cold`、`my_ele_error`、`my_ele_xxx`などの要素にマッチします。フルネームマッチはパターンマッチよりも優先されます。

もしテクスチャサイズが48x48でない場合、CWLはそれを48x48に調整します。

**addEleOnLoad**タグを使用すると、プレイヤーキャラクターはこの能力を自動的に獲得します。

CWLのAPIを使用しない場合は、CustomWhateverLoader.dllを参照する必要はありません。

## 信仰能力

もしあなたのカスタム能力がカスタム信仰の能力である場合、**godAbility,信仰 ID**というタグを使用してください。例えば、あなたの能力を**cwl_spaghettigod**という信仰の能力に設定する場合、タグは**godAbility,cwl_spaghettigod**となります。信仰能力を使用すると、その信仰の神の対話がトリガーされます。