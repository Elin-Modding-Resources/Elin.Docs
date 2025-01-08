---
title: Custom Element
date: 2025/1/3 01:00
hide: true
---

## How to Create Custom Element

Assumes you have setup your element in an Element sheet already, the following entries are important:

**id**: this should be a unique number, this is the ability id.  
**alias**: the actual string id of your element.  
**type**: this C# type name corresponding to this ability.  
**group**: be it **FEAT**, **ABILITY** or **SPELL**.  
**tag**: add **addEleOnLoad** if you want your ability to be applied to player on game load.  

The rest are up to you to define. You may take references from [Elin Modding Wiki](https://elin-modding-resources.github.io/Elin.Docs/) or Elin Sources.

### Ability/Spell

For example, we want to add an ability **ActLionDance**, it should look like this:

![img](https://i.postimg.cc/90PTN1r1/doc-custom-ele.png)

![img](https://i.postimg.cc/XY6Nv31Z/image.png)

Your alias and type does not need to be the same, however, the texture of the ability icon will be using the **alias**, and the element object will be linked to **type**.

In your script dll, you should have the following code:
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

The class must derive from **Element**, common ones are **Act**, **AIAct`**, **Ability**, **Spell** for ability types, depending on the usage and intention.

You can declare your class in any namespace, CWL will qualify the type name, so the element type only needs to be the class name itself.

Your element icon needs to be placed within **Texture** folder, using the same alias as the file name, such as **ActLionDance.png**. You may also use pattern matching to assign a single icon to multiple elements, such as for all elements that have **alias** starting with `my_ele`, the file name should be `@my_ele.png`, and it will match `my_ele_1`, `my_ele_2`, `my_ele_fire`, `my_ele_cold`, `my_ele_error`, `my_ele_xxx` etc. Full name matching happens before pattern matching.

If the texture size is not 48x48, CWL will resize it for you.

With the tag **addEleOnLoad**, player will gain this ability automatically upon loading.

If you do not need to utilize CWL API, then no need to reference CustomWhateverLoader.dll.

### Feat

A custom feat is kinda similiar, but your custom feat class must derive from **Feat**. 
```cs
internal class FeatMyExample: Feat
```

Since Elin hardcodes its feat effects in the big ol `Feat.Apply` non-virtual method, CWL offers you an event `OnApply` to apply your own feat effects when that happens, by defining an optional event handler `_OnApply` in the feat class:
```cs
internal class FeatMyExample : Feat
{
    internal void _OnApply(int add, ElementContainer eleOwner, bool hint) // [!code focus]
    { // [!code focus]
        // mod attributes, set potential, apply effects, etc // [!code focus]
    } // [!code focus]
}
```

This does not require your dll to reference CustomWhateverLoader.dll.

Custom feats may also have custom icons, by placing the texture within **Texture** folder, using the same alias as the file name, such as **featMyExample.png**. Then you'll need to override the `GetIcon` method to reroute the icon to your own:
```cs
internal class FeatMyExample : Feat
{
    public override Sprite GetIcon(string suffix = "") // [!code focus]
    { // [!code focus]
        return SpriteSheet.Get(source.alias); // [!code focus]
    } // [!code focus]
}
```

If the texture size is not 32x32, CWL will resize it for you.

With the tag **addEleOnLoad**, player will gain this feat automatically upon loading.

## 自定义元素

随便加载器可以导入您的自定义元素表（表名: Element）并将其添加到游戏中。然而，您的自定义元素有以下几项需要注意：

**id**：一个唯一的数字，这是元素的ID。  
**alias**：元素的别名，字符串ID。  
**type**：与此元素对应的C#类型名称。  
**group**：可以是**FEAT**, **ABILITY**, 或**SPELL**。  
**tag**：如果您希望在游戏加载时将元素自动赋予给玩家，请添加**addEleOnLoad**。  

其余的由您定义。您可以参考[Elin Modding Wiki](https://elin-modding-resources.github.io/Elin.Docs/)或Elin Sources。

### 自定义能力/法术

例如，我们想添加一个能力**ActLionDance**，它应该看起来像这样：

![img](https://i.postimg.cc/90PTN1r1/doc-custom-ele.png)

![img](https://i.postimg.cc/XY6Nv31Z/image.png)

**alias**和**type**不需要相同，但是，能力图标的纹理将参照**alias**，而元素对象实例将链接到**type**。

在您的脚本dll中，您应该有以下代码：
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

该类必须从**Element**派生，常见的有**Act**、**AIAct**、**Ability**、**Spell**，具体取决于使用和意图。

您可以在任何命名空间中声明您的类，CWL会自动为您限定类型名称，因此**type**只需要是类名本身。

您的元素图标需要放置在**Texture**文件夹中，使用与**alias**相同的文件名，例如**ActLionDance.png**。也可以使用模式匹配为多个元素分配同一个图标，例如为所有**alias**以`my_ele`开头的元素分配同一个图标，该文件名应为`@my_ele.png`，此图标会匹配至`my_ele_1`, `my_ele_2`, `my_ele_fire`, `my_ele_cold`, `my_ele_error`, `my_ele_xxx`等元素。全名匹配会优先于模式匹配。

如果纹理大小不是48x48，CWL会将其调整为48x48。

使用标签**addEleOnLoad**，玩家角色将自动获得此能力。

如果不需要使用CWL的API，那么无需引用CustomWhateverLoader.dll。

### 自定义专长

自定义专长类必须继承自 **Feat**。 
```cs
internal class FeatMyExample: Feat
```

由于 Elin 将所有专长效果都写在 `Feat.Apply` 这个方法中，CWL 提供了一个事件 `OnApply`，通过在你的专长类中定义一个可选的事件处理 `_OnApply` 以便应用你自己的专长效果：
```cs
internal class FeatMyExample : Feat
{
    internal void _OnApply(int add, ElementContainer eleOwner, bool hint) // [!code focus]
    { // [!code focus]
        // 修改属性，设置潜力，应用效果等 // [!code focus]
    } // [!code focus]
}
```

这并不要求引用 CustomWhateverLoader.dll。

自定义专长还可以拥有自定义图标，您的元素图标需要放置在**Texture**文件夹中，使用与**alias**相同的文件名，例如**featMyExample.png**。然后你需要重写 `GetIcon` 方法，将图标重定向到你自己的图标：
```cs
internal class FeatMyExample : Feat
{
    public override Sprite GetIcon(string suffix = "") // [!code focus]
    { // [!code focus]
        return SpriteSheet.Get(source.alias); // [!code focus]
    } // [!code focus]
}
```

如果纹理大小不是32x32，CWL会将其调整为32x32。

使用标签 **addEleOnLoad**，玩家在加载时将自动获得这个专长。

## カスタムElement

随便ロードは、あなたのカスタム要素テーブル（テーブル名: Element）をインポートし、ゲームに追加することができます。ただし、あなたのカスタム要素には以下の点に注意する必要があります：

**id**：ユニークな数字で、これは要素のIDです。  
**alias**：要素のエイリアス、文字列ID。  
**type**：この要素に対応するC#のタイプ名。  
**group**：**FEAT**, **ABILITY**または**SPELL**のいずれか。  
**tag**：ゲームのロード時に要素を自動的にプレイヤーに付与したい場合は、**addEleOnLoad**を追加してください。  

残りはあなたが定義します。あなたは[Elin Modding Wiki](https://elin-modding-resources.github.io/Elin.Docs/)やElin Sourcesを参考にできます。

### カスタムAbility/Spell

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

### カスタムFeat

カスタム特技クラスは **Feat** から継承する必要があります。 
```cs
internal class FeatMyExample: Feat
```

Elin はすべての特技効果を `Feat.Apply` メソッドに記述しているため、CWL はイベント `OnApply` を提供しています。これは、特技クラス内でオプションのイベントハンドラー `_OnApply` を定義することで、自分の特技効果を適用することができます：
```cs
internal class FeatMyExample : Feat
{
    internal void _OnApply(int add, ElementContainer eleOwner, bool hint) // [!code focus]
    { // [!code focus]
        // 属性の変更、潜在能力の設定、効果の適用など // [!code focus]
    } // [!code focus]
}
```

これには CustomWhateverLoader.dll の参照は必要ありません。

カスタム特技はカスタムアイコンを持つこともでき、要素アイコンは **Texture** フォルダーに配置する必要があります。ファイル名は **alias** と同じにする必要があり、例えば **featMyExample.png** です。その後、`GetIcon` メソッドをオーバーライドして、アイコンを自分のアイコンにリダイレクトする必要があります：
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

タグ **addEleOnLoad** を使用すると、プレイヤーはロード時に自動的にこの特技を取得します。