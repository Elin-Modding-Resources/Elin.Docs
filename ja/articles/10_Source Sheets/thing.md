---
title: Thing シング
author: SamInJapan
description: Thingシートの列リファレンスです。
date: 2025/1/10 16:00
tags: SourceSheet/Thing
---

# シングシート (Thing)

<LinkCard t="SourceCard/Thing" u="https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=654432269#gid=654432269" />

ソーステーブルを作成するときは、**必ず公式ソーステーブルの最初の3行をそのままコピー**して、4行目以降にデータを入力してください。列の順番は絶対に変えないでください。

## シートの列

|列|タイプ|説明|
|-|-|-|
|id|テキスト|アイテムの一意の識別子。|
|name_JP|テキスト|日本語の表示名。|
|name|テキスト|英語の表示名。|
|unknown_JP|テキスト|未鑑定時の高品質アイテムの日本語名。`#randomBook` や `#randomPotion` のような特殊属性になることもあります。|
|unit_JP|テキスト|日本語の助数詞です。下記の [Unit JP](#unit-jp) を参照してください。|
|unit|テキスト|アイテムの物理的形状です。下記の [Unit](#unit) を参照してください。|
|unknown|テキスト|未鑑定時の高品質アイテムの英語名。`#randomBook` や `#randomPotion` のような特殊属性になることもあります。|
|category|テキスト|アイテムが属するカテゴリ。自動搬入やレシピメニュー（`Category` シートと連携）に使用されます。|
|sort|整数|ソート順。例：`2200` で弓の範囲に配置されます。|
|_tileType|テキスト|マップ上の表示方法です。下記の [Tile Type](#tile-type) を参照してください。|
|_idRenderData|テキスト|地面への設置方法とクリッピングの制御です。下記の [idRenderData](#idrenderdata) を参照してください。|
|tiles|整数|差し替えテクスチャのタイルID。複数ある場合は「正面 → 正面反転 → 背面 → 背面反転」の順。例：`123,-123,456,-456`。|
|altTiles|整数|別状態用のバリアントタイル（例：中身が入った宝箱）。|
|anime|整数|2つの値： `フレーム数, フレーム継続時間`。`idRenderData` 列で @obj を使用し、かつ [Sprite Animation](../articles/15_Texture%20Mods/animation) を使用する場合、この列を記入する必要はありません。|
|skins|整数|スキンバリアントの参照。`idRenderData` 列で @obj を使用し、かつ [Sprite Variations](../articles/15_Texture%20Mods/variation) を使用する場合、この列を記入する必要はありません。|
|size|整数[]|大型オブジェクトのグリッドサイズ：`高さ,幅`。|
|colorMod|整数|色の彩度補正。|
|colorType|テキスト|色の参照元：`default`（クラフトの1番目の素材）、`alt`（2番目の素材）、または `random`。|
|recipeKey|テキスト|レシピの入手方法：`*` = デフォルトで習得済み、キャラID = そのキャラが販売。|
|factory|テキスト|クラフトに使用する設備です。下記の [Factory](#factory) を参照してください。|
|components|テキスト|クラフトの材料です。下記の [Components](#components) を参照してください。|
|disassemble|テキスト|分解時に得られるアイテム。|
|defMat|テキスト|デフォルト素材（例：`oak`）。アイコン/プレビューの色を決定します。|
|tierGroup|テキスト|アップグレード/進行のティアグループ。|
|value|整数|基本売却価格（オレン）。|
|LV|整数|クラフトに必要なスキルレベル。|
|chance|テキスト|生成確率の補正値。|
|quality|整数|アイテムの品質ティア。☆ や ★ は quality 列によって決定されます。**(追記予定)**|
|weight|整数|アイテムの重さ。例：種 = `30`、ロッド = `500`、ベッド = `4500`、ピアノ = `85000`。|
|electricity|整数|消費電力。負の値は電力を消費します（例：モニター = `-10`）。|
|trait|テキスト|特殊な動作です。下記の [Trait](#trait) を参照してください。|
|elements|テキスト|`Element` シートのエイリアスと `/レベル`。例：`lumberjack/4` はゲーム内で `Lumberjack [****]` と表示されます。|
|range|整数|武器の射程（タイル数）。例：ショートボウ = `1`、ボウ = `3`、レールガン = `5`。|
|attackType|テキスト|ダメージ/武器タイプ：`Blunt`、`Bow`、`Cane`、`Claw`、`Gun`、`Pierce`、`Punch`、`Slash`。|
|offense|整数[4]|攻撃ステータス（4つの値）。|
|substats|整数|サブステータス補正。|
|defense|整数[2]|防御ステータス：`DV,PV`。|
|lightData|テキスト|光源のプリセットです。下記の [Light Data](#light-data) を参照してください。|
|idExtra|テキスト|追加レンダーデータの参照。|
|idToggleExtra|テキスト|ON/OFF切り替え可能なレンダーデータ（例：照明）。|
|idActorEx|テキスト|オブジェクト周辺の環境効果です。下記の [Ambient Effects](#ambient-effects) を参照してください。|
|idSound|テキスト|クラフト時の効果音：`glass`、`money`、`paper` など。|
|tag|テキスト|組み込みの動作フラグです。下記の [Tags](#tags) を参照してください。|
|workTag|テキスト|作業関連のタグ。|
|filter|テキスト|クラフト以外の入手経路：`fish`、`gacha`、`supply` など。`CreateFromFilter` でランダム生成に使用されます。|
|roomNameJP|テキスト|部屋タイプの定義（日本語）。カンマ区切りで複数指定可能。|
|roomName|テキスト|部屋タイプの定義（英語）。例：`Bedroom` または `Kitchen,Dining Room`。|
|detail_JP|テキスト|アイテム説明（日本語）。ゲーム内でステータス情報の上に表示されます。|
|detail|テキスト|アイテム説明（英語）。ゲーム内でステータス情報の上に表示されます。|

## Unit

`unit` 列はアイテムの物理的形状を定義します。

|値|値|値|
|-|-|-|
|bottle|box|bucket|
|bundle|can|chunk|
|feather|gift box|grand cross|
|grimoire|handful|letter|
|painting|pair|piece|
|pinch|poster|pot|
|rod|set|signboard|
|spellbook|staff|statue|
|syringe|tree|tuft|
|whip|whistle|

## Tile Type

`_tileType` 列はマップ上でのオブジェクトの表示方法を制御します。

|タイプ|動作|
|-|-|
|ObjBig|通行不可。|
|ObjHuge|通行不可。|
|Door|壁が必要。ドア/開口部として機能。|
|Slope|上り下りの移動速度を変化させます。|
|Stairs|Slope と同様ですが、速度・高さの変化がより顕著です。|
|Paint|壁への取り付けが必要。|
|WallHang|壁への取り付けが必要。|
|Window|壁が必要。窓が非表示になる状況（建物内など）では非表示になります。|

## idRenderData

`_idRenderData` 列は、オブジェクトの地面への設置方法とクリッピングを制御します。

### `@obj` — カスタムテクスチャ（差し替えなし）

テクスチャ置換を使用**しない**カスタムアイテム用です：
- ファイル名は `id` と完全に一致させる必要があります。
- 拡張子は小文字の `.png` を使用してください（`.PNG` は動作しません）。
- Modの `Texture` フォルダに配置してください。

### `obj` — テクスチャ差し替え

テクスチャ置換（Texture Replace）を使用するアイテム用です。これはテクスチャビューアー内のタイルスロットを占有するため、他の Mod と競合する可能性があります：
- ファイル名形式：`obj_tileID`（例：`objS_5032`）。
- 拡張子は小文字の `.png` を使用してください。
- Modの `Texture Replace` フォルダに配置してください。

### 雪バリアント

|種類|差し替えなし (`@obj`)|差し替えあり (`obj`)|
|-|-|-|
|通常|`ID.png`|`obj_123.png`|
|雪|`ID_snow.png`|`objSnow_123.png`|
|小|—|`objS_456.png`|
|小雪|—|`objSSnow_456.png`|

<LinkCard t="Sam's Notes on _idRenderData" u="/ja/articles/15_Texture%20Mods/sam_id_render_data" />

## Factory

`factory` 列はアイテムを作成する設備を定義します。プレイヤーがクラフト不可のアイテムの場合は空欄にします。

|ゲーム内名称|値|
|-|-|
|クイッククラフト|`self`|
|作業台|`workbench`|
|便利屋の机|`factory_tinker`|
|設計台|`workbench2`|
|立札工房|`factory_sign`|
|木工の机|`factory_wood`|
|金属工の机|`factory_metal`|
|金床|`anvil`|
|機械工の机|`machinebench`|
|石工の机|`factory_stone`|
|硝子工の机|`factory_glass`|
|調理機|`stove`|

## Components

`components` 列はクラフトの材料を定義します。

|構文|意味|例|
|-|-|-|
|`タグ/N`|指定した素材タグのアイテムがN個必要。|`rock/10` → 岩素材10個。|
|`\|`|「または」—選択肢のいずれか。|`rock/2\|ingot` → 岩2個 または インゴット2個。|
|`#カテゴリ`|インベントリから一致するカテゴリのアイテムを選択。|`#book` → 任意の本を選択。|

### 例

**井戸:** `rock/10,rope/3,log/2`
→ 岩素材10個、ロープ3個、丸太2個。

**鎌:** `rock/2|ingot,string/1,stick/1`
→ 岩2個 または インゴット2個、紐1個、棒1個。

**本棚:** `plank/4,#book,#book`
→ 板材4枚、任意の本2冊。

## Trait

`trait` 列は特殊な動作を定義します。コンテナタイプのオブジェクトには以下の形式を使用します：

```
Container,行数,列数,背景画像,特記事項
```

|例|意味|
|-|-|
|`beekeep,2,2,crate,honey`|2×2のコンテナ（木箱背景）、蜂蜜を保管。|
|`ChestPractice,7,5,crate`|7×5のコンテナ（木箱背景）。|

## Light Data

`lightData` 列は光源の外観を定義します。

|値|
|-|
|`altar_machine`|
|`bonfire`|
|`fireplace`|
|`fridge`|
|`gacha`|
|`general`|
|`kiln`|
|`lamp_sun`|
|`lamp_table`|
|`light_floor`|
|`light_spot`|
|`light_stand`|
|`light_wall`|

## Ambient Effects

`idActorEx` 列はオブジェクト周辺の環境効果を定義します。

|値|効果|
|-|-|
|`amb_boat`|船の環境音。|
|`amb_crowd`|群衆の雑音。|
|`amb_fire`|火のパチパチ音。|
|`amb_fountain`|噴水の音。|
|`amb_smelter`|精錬所の音。|

## Tags

`tag` 列は組み込みの動作フラグを割り当てます。

一部のタグ（すべてではありません）:
|タグ|効果|
|-|-|
|`exotic`|珍しいアイテムとして扱われます。|
|`godArtifact`|神器。见[信仰テーブル](./religion)。|
|`noWish`|願い（wish）で入手不可。|
|`tourism`|観光アイテムとしてカウントされます。|
|`rareResource`|レア資源として扱われます。|
|`snowTile`|雪タイルを好みます（雪用objバリアント設定時は省略可）。|
|`throwWeapon`|投げた後に戻ってきます（ブーメランのように）。|
|`noCopy`|複製不可。|
|`noShop`|該当ショップに生成されない。|
|`fixedElement`|属性エンチャント値を固定。|
|`randomElement`|属性エンチャント値を変動。|

## 遠距離武器データのインポート

遠距離武器のデータをカスタマイズしたい場合があります。ガンのデータは、`LangMod/**/Data/`フォルダー内にある`EffectSetting.guns.json`という名前の**JSONファイル**です。

```json
{
    "biubiu_gun": {
        "Num": 1,
        "Delay": 0.1,
        "IdEffect": "gunfire",
        "IdSprite": "ranged_gun",
        "IdSound": "attack_gun",
        "IdSoundEject": "bullet_drop",
        "Eject": true,
        "FirePos": {
            "x": 0.23,
            "y": 0.04
        },
        "CaneColor": "",
        "CaneColorBlend": false,
        "ForceLaser": false,
        "ForceRail": false,
    }
}
```

これは、遠距離武器のIDと一致するはずの`biubiu_gun`という名前のガンデータをインポートします。ゲーム内の既存の武器IDを使用して、それを**上書き**することもできます。

ゲーム内の既存のガンデータは次のとおりです。

::: details ガンデータ
<<< ./assets/guns.json
:::

+ `Num` は、バースト（連射）内の**ショット数**です。
+ `Delay` は、**アニメーションの遅延時間**を秒単位で指定します。
+ `IdEffect` は、[マズルフラッシュエフェクトのID](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-effects-md)です。[カスタムエフェクト](../15_Texture%20Mods/effects)を使用できます。デフォルト値は`gunfire`です。レーザーやケイン（杖）タイプの武器ではこの値は使用されません。
+ `IdSprite` は、**弾丸のテクスチャ名**です。ゲーム内の既存のテクスチャ、または**Texture**フォルダーに配置したテクスチャである必要があります。レーザーではこの値は使用されません。
+ `IdSound` は、**発射音のID**です。[カスタムサウンド](../20_Sound%20Mods/0_sound)を使用できます。これはすべての種類のガンに設定できます。
+ `IdSoundEject` は、**排弾丸音のID**です。[カスタムサウンド](../20_Sound%20Mods/0_sound)を使用できます。これはすべての種類のガンに設定できます。
+ `Eject` は、**弾丸排出アニメーション**があるかどうかを決定します。これはすべての種類のガンに設定できます。
+ `FirePos` は、**武器の中心を基準としたマズルフラッシュエフェクトのオフセット位置**です。これはすべての種類のガンに設定できます。
+ `CaneColor` は、**ケイン（杖）タイプ**の武器用のオプションの**色合いのオーバーライド**です。空白のままにすると、武器のデフォルトの元素の色が使用されます。形式は `RRGGBB` 16 進文字列です。特性`ToolRangeCane`を持つガンのみがこの値を使用できます。
+ `CaneColorBlend` は、ケインタイプ武器の**デフォルトカラーとオーバーライドカラーのブレンド**を有効にします。特性`ToolRangeCane`を持つガンのみがこの値を使用できます。
+ `ForceLaser` は、ガンに**レーザーアニメーション**の使用を強制します（23.206 Nightlyで追加）。ガンが特性`ToolRangeGunEnergy`を持っている場合、これは**不要**です。
+ `ForceRail` は、ガンに**レールガンアニメーション**の使用を強制します。**これは、特性`ToolRangeGunEnergy`を持つガンのデフォルトの動作ではなくなりました。**

このファイルには、必要な数のガンデータを追加できます。単純に`,`コンマで区切ってください。例：

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

### 指定スロット

アイテム表（Thing）で `addSocket` および `addSocket(エンチャントalias)` タグを使用することで、銃器のスロットを指定できます。例えば、`addSocket,addSocket,addSocket(bane_god)` と記述すると、空のスロットが2つと、エンチャント「God Bane」が付いたスロットが1つ追加されることが保証されます。

また、`noRandomSocket` タグを使用すると、カスタムスロットを適用する前にすべてのランダム生成スロットを削除できます。
