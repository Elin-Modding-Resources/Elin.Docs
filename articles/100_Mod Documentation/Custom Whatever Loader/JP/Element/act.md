---
title: カスタム能力と法術
date: 2025/1/3 01:00
hide: true
---

## カスタム能力と法術の作成方法

**Element** テーブルで要素を設定していると仮定します。以下の項目が重要です。

**id**: 一意の数値である必要があります。これは能力IDです。
**alias**: 要素のエイリアス（別名）、文字列IDです。
**type**: この能力に対応するC\#の型名です。
**group**: **FEAT**（特技）、**ABILITY**（能力）、**SPELL**（法術）のいずれかです。
**tag**: 能力をゲームロード時にプレイヤーに自動的に適用させたい場合は、**addEleOnLoad** を追加します。

**[Elin Sources](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=859322825#gid=859322825)** を参照してください。

### アイコン

要素のアイコンは、**Texture** フォルダ内に、エイリアス（alias）と同じファイル名で配置する必要があります。例：**ActLionDance.png**。**パターンマッチング**を使用して、複数の要素に単一のアイコンを割り当てることもできます。例えば、すべての **alias** が `my_ele` で始まる要素の場合、ファイル名は `@my_ele.png` にする必要があります。これは `my_ele_1`、`my_ele_2`、`my_ele_fire`、`my_ele_cold`、`my_ele_error`、`my_ele_xxx` などに一致します。完全一致の名前がパターンマッチングよりも優先されます。

テクスチャサイズが48x48でない場合、CWLが自動的にリサイズします。

または、`GetSprite` メソッドをオーバーライドして独自のアイコンを提供することもできます。

### タグ

**`addEleOnLoad`**: プレイヤーはロード時にこの能力を自動的に獲得します。
**`addDice`**: **Calc** テーブル内で要素エイリアス（alias）と同じIDを持つダイスを使用します。
**`godAbility,religion_id`**: 能力使用時に神のフレーズをトリガーさせます。カスタム信仰に使用します。例として、信仰が **cwl_spaghettigod** の場合、タグ **godAbility,cwl_spaghettigod** を使用します。

### フレーズ

能力がトリガーされたときのフレーズを、`LangMod/**/Data/chara_talk.xlsx` ファイル内に `phrase_alias` テキストを提供することで定義できます。これは **_Elona/Lang/JP/Data/chara_talk.xlsx** で行われているのと同様です。

## スクリプトなし

Elinが提供する既存の `proc` を利用し、組み合わせて、C#スクリプトを記述せずにカスタムの能力や魔法を作成できます。

`type` 列には、**Elin Sources** にある既存の `type` のいずれかを使用する必要があります。

## C#スクリプトの使用

例えば、**ActLionDance** という能力を追加したいとします。以下のように設定する必要があります。

![img](https://i.postimg.cc/90PTN1r1/doc-custom-ele.png)

![img](https://i.postimg.cc/XY6Nv31Z/image.png)

エイリアス（alias）と型（type）は**同じである必要はありません**が、能力アイコンのテクスチャには**alias**が使用され、要素オブジェクトは**type**にリンクされます。

スクリプトdll内には、以下のコードが必要です。

```cs
internal class ActLionDance : Act
{
    public override bool Perform()
    {
        pc.Say("Lion Dance!!");
        return true;
    }
}
```

このクラスは **Element** から派生している必要があります。一般的な能力タイプには、用途や意図に応じて **Act**、**AIAct**、**Ability**、**Spell** などがあります。

クラスは任意の名前空間で宣言できます。CWLは型名を修飾するため、要素型はクラス名自体であるだけで十分です。