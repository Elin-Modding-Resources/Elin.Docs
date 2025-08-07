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

## アイコン
Elementのアイコンは**Texture**フォルダ内に、ファイル名と同じエイリアスで配置する必要があります（例: **ActLionDance.png**）。また、パターンマッチングを使用して、複数のElementに1つのアイコンを割り当てることも可能です。例えば、エイリアスがmy_eleで始まるすべてのElementには、`alias@my_ele.png`とすることで、`my_ele_1`、`my_ele_2`、`my_ele_fire`、`my_ele_cold`、`my_ele_error`、`my_ele_xxx`などと一致します。完全一致はパターンマッチングよりも優先されます。

テクスチャサイズが48x48でない場合、CWLが自動的にリサイズします。

## タグ
**addEleOnLoad**: プレイヤーはロード時にこのアビリティを自動的に獲得します。  
**addDice**: Elementのaliasと同じidを持つCalcシートのダイスを使用します。  
**godAbility,religion_id**: カスタムの宗教のために、このアビリティを使用すると神の会話がトリガーされるようにします。例: 宗教が`cwl_spaghettigod`の場合、タグは`godAbility,cwl_spaghettigod`を使用します。  

CWL APIを利用する必要がない場合、CustomWhateverLoader.dllを参照する必要はありません。