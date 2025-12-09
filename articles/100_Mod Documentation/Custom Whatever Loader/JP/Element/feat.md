---
title: カスタムFeat
date: 2025/1/3 01:00
hide: true
---

## カスタムFeat

カスタムFeatクラスは **Feat** から継承する必要があります。 
```cs
internal class FeatMyExample: Feat
```

Elin はすべてのFeat効果を `Feat.Apply` メソッドに記述しているため、CWL はイベント `_OnApply` を提供しています。これは、Featクラス内でオプションのイベントハンドラー `_OnApply` を定義することで、自分のFeat効果を適用することができます：
```cs
internal class FeatMyExample : Feat
{
    internal void _OnApply(int add, ElementContainer eleOwner, bool hint) // [!code focus]
    { // [!code focus]
        // 属性の変更、潜在能力の設定、効果の適用など // [!code focus]
        owner.ModBase(SKILL.life, add * 15);
        owner.ModPotential(SKILL.DEX, add * 2);
    } // [!code focus]
}
```

これには CustomWhateverLoader.dll の参照は必要ありません。

カスタムFeatはカスタムアイコンを持つこともでき、要素アイコンは **Texture** フォルダーに配置する必要があります。ファイル名は **alias** と同じにする必要があり、例えば **featMyExample.png** です。その後、`GetIcon` メソッドをオーバーライドして、アイコンを自分のアイコンにリダイレクトする必要があります：
```cs
internal class FeatMyExample : Feat
{
    public override Sprite GetIcon(string suffix = "") // [!code focus]
    { // [!code focus]
        return SpriteSheet.Get(source.alias); // [!code focus]
    } // [!code focus]
}
```

テクスチャのサイズが32x32でない場合、CWLはそれを32x32に調整します。

タグ **addEleOnLoad** を使用すると、プレイヤーはロード時に自動的にこのFeatを取得します。

<LinkCard t="CWL Example: Donakoko" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3400267207" i="https://raw.githubusercontent.com/gottyduke/Elin.Plugins/refs/heads/master/CwlExamples/Donakoko/preview.jpg" />
<LinkCard t="Donakoko Source Code" u="https://github.com/gottyduke/Elin.Plugins/tree/master/CwlExamples/Donakoko" />