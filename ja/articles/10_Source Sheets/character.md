---
title: Chara キャラ
author: DK
description: 新しいキャラクターシートの作成方法
date: 2026/5/2 03:00
tags: SourceSheet/Chara
---

# キャラシート (Chara)

## 表の説明

<LinkCard t="SourceChara" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />

ソーステーブルを作成するときは、**必ず公式ソーステーブルの最初の3行をそのままコピー**して、4行目以降にデータを入力してください。列の順番は絶対に変えないでください。

|列|タイプ|説明|
|-|-|-|
|id|テキスト|その項目を唯一無二に識別するための最重要IDです。キャラ表内で他のすべての項目と区別するために使われます。このIDがバニラや他のMODのIDと被った場合、最後に読み込まれたテーブルが優先されます。スペースは絶対に入れず、必要なら`snakecase`（例：`mymod_chara_yajyuu_senpai`）を使うことをおすすめします。|
|_id|整数|図鑑での表示順を決める数値です。重複しても問題ありません。|
|name_JP|テキスト|ゲーム内で実際に表示される日本語の名前です。|
|name|テキスト|ゲーム内英語名です。他の言語はSourceLocalization.jsonで対応します。|
|aka_JP|テキスト|ゲーム内で表示される二つ名・肩書きの日本語表記です。|
|aka|テキスト|二つ名・肩書きの英語表記です。他の言語はSourceLocalization.jsonで対応します。|
|idActor|テキスト|PCCパーツを使って描画するかどうかを制御します。例：`pcc,unique,jure` と書くと、`pcc/unique/jure`からPCCパーツを読み込みます。|
|sort|テキスト|SourceCharaでは使用していません。|
|size|テキスト|このキャラが占めるタイルサイズです。通常は空欄。`2,2`のように指定すると2×2タイルを占有し、押し出されなくなります。|
|_idRenderData|テキスト|スプライトシートの参照先を制御します。`chara`/`chara_L`などは**Texture Replace**のテクスチャと`tiles`のタイルIDを使用（スロットに限りがあり上書きされる可能性あり）。`@chara`は**Texture**内にある同じIDのテクスチャを直接使用します。MODキャラは**必ず**`@chara`を使用してください。|
|tiles|整数|スプライトシートのタイルID、またはMODキャラの場合は[skinset](../15_Texture%20Mods/skins)です。|
|tiles_snow|整数|雪マップで使用する代替タイルIDです。MODキャラは[テクスチャバリエーション](../15_Texture%20Mods/variation)を使用してください。|
|colorMod|整数|主に`100`と組み合わせて使用し、グレースケールのスプライトに`mainElement`の色を乗せる機能です。|
|components|テキスト|SourceCharaでは使用していません。|
|defMat|テキスト|デフォルトの死体素材エイリアス。空欄の場合は種族のデフォルト素材を使用します。|
|LV|整数|キャラの「危険度」。マップの危険度に応じた生成判定、選択コスト（奴隷商人・調教師）、種族/職業ごとの基礎ステータス生成に影響します。|
|chance|整数|マップ生成確率の補正値（販売リストにも影響する可能性あり）。初期値は`100`です。|
|quality|整数|`0–2`：通常モンスター。`3`：ユニークモンスター（卵入手可能だが友達・捕獲・調教不可）。`4`：ユニークキャラ（卵のみ。友達にはなれるが捕獲・調教不可）。|
|hostility|テキスト|プレイヤー・味方・傍観者に対する性格。空欄だと`Hostile`（敵対）。`Neutral`は攻撃されない限り先制攻撃しない。`Friend`は味方に対して敵対的な対象を攻撃し、プレイヤーが怒っているときも攻撃します。|
|biome|テキスト|指定した床タイプでの生成率が上昇（場合により2倍）、それ以外では低下（場合により半減）します。例：`Water`にすると水上の床を強く好みます。|
|tag|テキスト|既知のタグ：`mini`（スプライト半分サイズ）、`noRandomProduct`（幸運の太鼓で下着が出ない可能性）、`random_color`（`colorMod=100`時に髪の色をランダム化）、`randomFish`、`staticSkin`（性別によるスプライト割り当てを固定）、`snow`（雪マップを好む）、`water`（水タイルを好む）など。|
|trait|テキスト|複雑な特性の羅列です。特性ドキュメントと`Trait*`クラスの実装を参照してください。|
|race|テキスト|SourceRaceの種族IDを指定します。|
|job|テキスト|SourceJobの職業ID。省略時は`none`になります。|
|tactics|テキスト|割り当てられた職業のデフォルト戦術を上書きします。|
|aiIdle|テキスト|待機時のAI行動を追加・上書きします。例：`Stand`（完全に動かず攻撃されても反応しない）、`Root`（攻撃されるか勧誘されるまで動かない）。|
|aiParam|テキスト|3つの数値（敵との理想距離、毎ターンその距離に移動する確率、まれに使う再移動確率）。|
|actCombat|テキスト|戦闘中に使用可能なSourceElementのIDをカンマ区切りで指定。`/N`で使用確率を固定できます。バフ系は`/pt`を付けるとパーティ全体に効果（味方バフのみ）。例：`ActThrowPotion/30,SpWeakness,SpSpeedDown,SpWisdom/50/pt`。省略時は確率100。|
|mainElement|テキスト|主要属性親和性。`Fire`、`Cold`、`Lightning`、`Darkness`、`Nether`、`Sound`、`Chaos`、`Poison`、`Cut`、`Acid`、`Impact`から選択。|
|elements|テキスト|受動的なSourceElementをカンマ区切りで指定。`/N`でレベル・数値を設定可能。`0`や負の値で種族からの継承を無効化・調整できます。例：`invisibility/1`（有効）、`invisibility/0`（継承無効）、`antidote/-30`（肉に毒を付与）など。|
|equip|テキスト|職業のランダム装備テンプレートを上書きします（**種族のEQが空でない場合のみ有効**）。例：盗賊職業に`equip=Archer`とすると弓兵装備になりますが、犬種族のように種族EQが空の場合は装備が生成されません。|
|loot|テキスト|追加ドロップアイテム（Thing/ThingVのID）をカンマ区切りで指定。後ろに`/N`を付け、20で+1%のドロップ率になります。例：`medal/500`=25%、`medal/3000`=150%（確定1個＋50%でもう1個）。|
|category|テキスト|ほとんどの項目はデフォルトの`chara`を使用します。|
|filter|テキスト|SourceCharaでは使用していません。|
|gachaFilter|テキスト|ガチャで最初にカテゴリ（resident/livestock/Unique/defaultなど）を選び、このフィルターで条件に合うキャラを抽出します。例：livestockカテゴリではlivestockタグを持つものだけが対象になります。|
|tone|テキスト|日本語テキストの会話トーン修飾子です。|
|actIdle|テキスト|非戦闘時の特殊行動。例：`readBook`（ランダム本を生成・読書・削除）、`buffMage`（定期的に`spResElement`や`spHero`などのバフ魔法を唱える）など。|
|lightData|テキスト|SourceCharaでは使用していません。発光色を設定できます。|
|idExtra|テキスト|SourceCharaでは使用していません。追加の描画データ。|
|bio|テキスト|スラッシュ区切りの値（空白なし）：`gender`（`m`/`f`/`n`、必須）、`age`（任意）、`height`（任意）、`weight`（任意）、`chara_tone.xlsx`の`tone`（任意）、`chara_talk.xlsx`の`talk`（任意）。例：`f/51044/152/46/friendly\|私\|あなた`|
|faith|テキスト|固定の信仰。設定するとゲーム内で変更できなくなります。|
|works|テキスト|SourceHobbyのaliasを指定します。|
|hobbies|テキスト|SourceHobbyのaliasを指定します。|
|idText|テキスト|`CharaText`テーブル内の対応するIDと紐付けます。|
|moveAnime|テキスト|移動アニメーションの種類。`hop`または空欄。|
|factory|テキスト|SourceCharaでは使用していません。|
|components|テキスト|SourceCharaでは使用していません（重複列）。|
|recruitItems|テキスト|特殊な勧誘会話用アイテム。現在はmani専用です。|
|detail_JP|テキスト|SourceCharaでは使用しません。メモ用途としてご自由にどうぞ。|
|detail|テキスト|SourceCharaでは使用しません。メモ用途としてご自由にどうぞ。|

## 人間らしい会話にするには

Race表で`human`または`humanSpeak`タグを付ける以外に、Chara表に`humanSpeak`タグを付けることで、会話時に括弧（）を使わない自然な話し方になります。

## 生成設定

`tag` 欄を使って、キャラクターの生成条件を細かく設定できます。

::: warning CWL旧フォーマット
CWLフォーマットはWikiから削除されました。互換性は維持されていますが、新しいフォーマットへの移行を推奨します。
:::

Possible tag actions:
+ `addZone(zoneId@level)`
+ `addEq(ItemId#Rarity)` / `addEquipment(ItemId#Rarity)`
+ `addThing(ItemId#Count)`
+ `addFlag(FlagName)` / `addInt(FlagName=1)`
+ `addFlagValue(FlagName=some_value)` / `addStr(FlagName=some_value)`
+ `addBio(BioFileId)` / `addBiography(BioFileId)`
+ `addStock(StockFileId)`
+ `addDrama(DramaFileId)`

### 特定のエリアへ自動生成

キャラクターをエリアに生成するには、ソース行に `addZone(*)` タグを追加し、`*`（アスタリスク）をエリア **id** に置き換えます。アスタリスクのままにするとランダムなエリアに生成されます。また `@n` でエリアの階層を指定することもできます。

例えば、リトルガーデンに生成するには `addZone(little_garden)` を使います。テルフィの地下にも生成したい場合は、もう一つ `addZone(derphy@-1)` タグを追加します。[SourceGame/Zone](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752) を確認し、**id** 列を参照してください。

![spawn_ex](./assets/spawn_chara.png)

使用する `addZone` タグごとに、その場所にキャラクターが1体生成されます。例えば `addZone(lumiest),addZone(little_garden),addZone(specwing),addZone(*)` とすると、指定した3つのエリアに加えランダムなエリアにもこのキャラクターが（重複して）生成されます。

### 初期装備・アイテムの設定

生成時に特定の装備やアイテムを持たせることができます。

**装備を指定する場合**  
`addEq(アイテムID#希少度)` または `addEquipment(アイテムID#希少度)` を使用します。

希少度は以下のいずれかです：  
Random / Crude / Normal / Superior / Legendary / Mythical / Artifact

**例**（メインウェポンに設定）
```
addEq(BS_Flydragonsword#Legendary),addEq(axe_machine)
```

**アイテムを指定する場合**  
`addThing(アイテムID#個数)` を使用します。個数を省略すると1個になります。

**例**
```
addThing(padoru_gift#10),addThing(1174#5)
```

### 冒険者として登録する

::: warning CWL旧フォーマット
CWLフォーマットは`AdventurerBacker`を使用しています。互換性はありますが、新しいフォーマットへの移行をお勧めします。
:::

キャラクターのtraitに **`AdventurerCustom`** を設定すると、冒険者ランキングに登録され、冒険者リストに表示されるようになります。

冒険者が勝手に移動するのを防ぎたい場合は、`addFlag(StayHomeZone)` タグを追加してください。

## 独自の商人在庫を設定する

`addStock`タグと在庫用JSONファイルを使って、商人独自の在庫を定義できます。

在庫ファイルは`LangMod/**/Data/`フォルダに`stock_識別子.json`という名前で配置します（識別子はキャラIDや任意の文字列でOK）。例：`stock_my_cnpc.json`、`stock_unique_armor.json`

`addStock`タグだけ書くと、そのキャラのIDがそのまま使用されます。複数の在庫を組み合わせることも可能です。
例：`addStock,addStock(unique_items),addStock(unique_armor)`

### 在庫ファイルの構造
```json
{
  "Items": [
    {
      "Id": "example_item",
      "Material": "",
      "Num": 1,
      "Restock": true,
      "Type": "Item",
      "Rarity": "Random",
      "IdentifyLevel": "Identified"
    },
    {
      "Id": "example_item_limited",
      "Material": "granite",
      "Num": 1,
      "Restock": false,
      "Type": "Item",
      "Rarity": "Artifact",
      "IdentifyLevel": "Identified"
    },
    {
      "Id": "example_item_craftable",
      "Material": "",
      "Num": 1,
      "Restock": false,
      "Type": "Recipe",
      "Rarity": "Random",
      "IdentifyLevel": "Identified"
    },
    {
      "Id": "SpShutterHex",
      "Num": 5,
      "Type": "Spell"
    }
  ]
}
```

* `Items`  
  インベントリに並ぶアイテムの配列です。
* `Id`  
  アイテム（Thing）のIDです。この項目は**必須**です。  
  一部の在庫タイプでは、エイリアス・数字ID・名称のいずれも指定できます。  
* `Material`  
  アイテムに使用する素材です。空欄にするとThing側で定義されたデフォルト素材が使われます。  
  デフォルト値：`""`  
* `Num`  
  アイテムの個数です。  
  デフォルト値：`1`  
* `Restock`
  アイテムを補充するかどうかを決めます。  
  `false` にすると限定品扱いになり、1回しか購入できません。  
  デフォルト値：`true`  
* `Type`  
  下記のtype説明表をご参照ください。
* `Rarity`  
  指定できる値：`Random`、`Crude`、`Normal`、`Superior`、`Legendary`、`Mythical`、`Artifact`  
  デフォルト値：`Normal`  
* `IdentifyLevel`  
  アイテムの初期鑑定状態を決めます。  
  指定できる値：`Identified`、`RequireSuperiorIdentify`、`KnowQuality`、`Unknown`  
  デフォルト値：`Identified`  
* `BlessedState`  
  アイテムの祝福状態を決めます。  
  指定できる値：`Doomed`、`Cursed`、`Normal`、`Blessed`  
  デフォルト値：`Normal`  
* `NoCopy`  
  複製できません。  
  デフォルト値：`false`  
* `NoRandomSocket`  
  ランダムなリモートソケットを生成しません。  
  デフォルト値：`false`  
* `Sockets`  
  ソケットとして追加するリモート銃器エンチャントのエイリアス一覧。空文字で空ソケットになります。  
* `PriceCalc`  
  アイテム価格を上書きするための計算式です。  
  パラメータ：`base`（基本価格）、`lv`（アイテムレベル）、`rarity`（レアリティ）  
  例：`"base * 0.2 + lv * 5"`  
* `MapStr`  
  アイテム生成後にマージする追加のmapStr値。  
* `MapInt`  
  アイテム生成後にマージする追加のmapInt値。  
* 任意の項目を省略すれば、デフォルト値が適用されます。  

### 在庫アイテムの種類

|Type|説明|
|-|-|
|Item|通常のアイテム。素材・レア度・個数に対応|
|Block|ブロック。ブロックaliasと素材から生成|
|Cassette|カセットテープ。`Id`はBGMの数値IDです|
|Currency|通貨。`money`、`money2`、`plat`、`medal`、`influence`、`casino_coin`、`ecopo`などが指定可能|
|Category|カテゴリから生成します。`Id` はカテゴリ名です。|
|Filter|フィルターから生成します。`Id` はフィルター名です。|
|Tag|タグから生成します。`Id` はタグ名です。|
|Letter|手紙。`Id`は手紙ID、本文は`LangMod/XX/Text/Scroll`に配置|
|Obj|Objオブジェクト。aliasを指定|
|Perfume|香水。ElementのaliasまたはID|
|Plan|計画書。ElementのaliasまたはID|
|Potion|ポーション。ElementのaliasまたはID|
|Recipe|レシピ|
|RedBook|赤本。`Id`は書籍ID、本文は`LangMod/XX/Text/Book`に配置|
|Rod|杖。ElementのaliasまたはID。`Num`で充填回数|
|Rune|ルーン。ElementのaliasまたはID|
|RuneFree|無法のルーン。ElementのaliasまたはID|
|Scroll|巻物。ElementのaliasまたはID|
|Skill|技術書。ElementのaliasまたはID|
|Spell|魔法書。ElementのaliasまたはID|
|Usuihon|薄い本。宗教IDを指定|

コードエディターを使用していない場合は、[JSONLint](https://jsonlint.com/) を使用して JSON を検証できます。

## セリフ＆吹き出し

### 状況別吹き出し

特定の状況でキャラの頭上に短いセリフを吹き出しで表示できます。

![](./assets/bark.png)

これらのセリフは**CharaText**テーブルに書き、キャラ側の`idText`欄にそのIDを入れることで紐付けます。

![](./assets/charatext.png)

|列|状況|
|-|-|
|calm|普段|
|fov|視界に入ったとき|
|aggro|戦闘開始時|
|dead|死亡時|
|kill|敵を倒したとき|

### 「話がしたい」

キャラに「話がしたい」と話しかけたときの専用会話を追加したい場合は、`LangMod/**/Dialog/`フォルダに`dialog.xlsx`を用意します。

このテーブルの形式はゲーム本体の`Elin/Package/_Elona/Lang/_Dialog/dialog.xlsx`と同じですが、`unique`シートだけ使い、自分のキャラIDの行だけ書けば大丈夫です。

![](./assets/unique.png)

ここでのIDはキャラのIDと完全に一致させてください。

::: warning 注意
dialog.xlsxのデータは5行目から書き始めてください（ソーステーブルの4行目開始とは異なります）。
:::

## 剧情（ドラマ）

選択肢付きの会話や特殊な動作を組み合わせた、深い交流システムです。

剧情に関する詳細は別章に移動しました。

<LinkCard t="剧情" u="/10_Source Sheets/drama.md" />

## カスタム伝記

キャラクターにさらに個性を持たせたいときは、`addBio(ID)` タグを使ってオリジナルの伝記を指定できます。  
伝記ファイルはJSON形式で、`LangMod/**/Data/` フォルダ内に `bio_ID.json` という名前で保存してください。IDは伝記ごとの固有の識別子です。

例：`addBio(MyChara)` の場合は `bio_MyChara.json` に対応します。

```json
{
    "Birthday": 11,
    "Birthmonth": 4,
    "Birthyear": 514,
    "Birthplace": "地球",
    "Birthlocation": "咩咩村",
    "Mom": "最高の母",
    "Dad": "最高の父ちゃん",
    "Background": "ここに背景ストーリーを書いてね",
    "FavFood": "mushroom_rare",
    "FavCategory": "mushroom",
    "LikeThing": "stethoscope",
    "LikeHobby": "martial"
}
```

- `FavFood`: Thing表／ThingV表／Food表のID  
- `FavCategory`: Category表のID  
- `LikeThing`: 好きなアイテムのID  
- `LikeHobby`: Element表のalias  

コードエディターを使用していない場合は、[JSONLint](https://jsonlint.com/) を使用して JSON を検証できます。

## ポートレートとテクスチャ

### ポートレート

ポートレート（立ち絵とも呼ばれます）は、キャラクターと会話する際、ポップアップウィンドウの左側に表示される画像です。

ポートレートは `Portrait` フォルダに配置する必要があります。また、`Portrait` フォルダはあなたの[Modパッケージ](../2_Getting%20Started/basic_mod)内に配置してください。

ポートレートの詳細は、[ポートレート](../15_Texture%20Mods/portraits#新規キャラクターmodのポートレート)に移動し、キャラクターModのポートレートのセクションをお読みください。

### テクスチャ（Sprite）

マップ上のキャラクターのテクスチャですが、より正確にはスプライト（Sprite）と呼びます。

MODキャラクターのテクスチャを追加する際、まずソーステーブルの `_idRenderData` 列に `@chara` と入力する必要があります。

キャラクタースプライト（Sprite）は透明な背景の `.png` 画像であり、`Texture` フォルダに配置する必要があります。そして、`Texture` フォルダはあなたの `ゲームのインストールディレクトリ/Elin/Package/カスタムModフォルダ名` に配置します（ここでの `カスタムModフォルダ名` があなたの[Modパッケージ](../2_Getting%20Started/basic_mod)になります）。

通常、キャラクタースプライト（Sprite）のファイル名は `ID.png` とし、IDにはあなたのキャラクターIDを使用します。

また、アニメーションスプライト、より大きなサイズのキャンバス、さまざまな条件下で変化するスプライトバリエーションを使用することもできます。詳細については、メインメニューの `テクスチャMOD` セクションを参照してください。<!--Menu=总目录=メニュー。Texture Mods=贴图模组=テクスチャMOD--> 

### サンプル

ポートレートとテクスチャについては、Tiny Mitaのサンプルを参考にしてください：

<LinkCard t="CWLサンプル：Tiny Mita" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3396774199" i="https://raw.githubusercontent.com/gottyduke/Elin.Plugins/refs/heads/master/CwlExamples/TinyMita/preview.jpg" />
