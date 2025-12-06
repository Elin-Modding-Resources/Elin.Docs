---
title: 会話とシナリオ
date: 2025/1/3 01:00
hide: true
---

## バーク（叫び）

特定の状況で、キャラクターが頭上に表示する専用の会話をトリガーします。

![](./assets/bark.png)

これらの会話は **CharaText** テーブルに記述され、キャラクターは **idText** セルに対応する会話IDを入力してリンクさせます。

![](./assets/charatext.png)

|セル|calm|fov|aggro|dead|kill|
|------------|-------|-------|-------|-------|-------|
|トリガー|冷静時|視界内|敵対時|死亡時|撃破時|

各エントリに [カスタム音声](../Other/sound) タグを挿入することもでき、音声付きの叫びにすることができます。例えば、`「通過できない！！<sound=gandalf,0.8>」` とすると、この叫びがトリガーされた際に、80%の確率でIDが `gandalf` のオーディオが再生されます。

## 会話

キャラクターと話すための会話を追加するには、`LangMod/**/Dialog/` フォルダ内に `dialog.xlsx` ファイルを準備します。

![img](./assets/dialog.png)

このテーブルの形式はゲーム内の **Elin/Package/_Elona/Lang/_Dialog/dialog.xlsx** と同じですが、`unique` テーブルとキャラクターIDに対応する行のみが必要です。

![](./assets/unique.png)

ここでのIDはキャラクターIDと同一です。

::: warning フォーマット
データはテーブルの5行目から開始します。
:::

## シナリオ

シナリオは、複数選択肢の会話と追加アクションで構成される高度なインタラクションシステムです。

![](./assets/drama_eg.png)

カスタムシナリオを定義するには、`addDrama_シナリオテーブル名` タグを使用します。CWLは自動的に該当シナリオを参照します。

カスタムシナリオテーブルは `LangMod/**/Dialog/Drama/` フォルダに配置し、ファイル名はタグと一致させる必要があります。例：`addDrama_drama_example` には `Dialog/Drama/drama_example.xlsx` を対応させます。

**<span class="text-amber-300">重要</span>**: あなたは **1** つのシナリオ表を提供するだけでよく、それは任意の言語のサブフォルダーに配置できます。CWLは、同じ表内で多言語のローカライズをサポートしています。

作成時はゲーム内蔵のシナリオテーブル **Elin/Package/_Elona/Lang/_Dialog/Drama** や、テンプレートを含む「Tiny Mita」サンプルを参考にしてください：
<LinkCard t="CWLサンプル：Tiny Mita" u="https://steamcommunity.com/sharedfiles/filedetails/?id=3396774199" i="https://raw.githubusercontent.com/gottyduke/Elin.Plugins/refs/heads/master/CwlExamples/TinyMita/preview.jpg" />

![img](./assets/drama.png)

::: tip ホットリロード
シナリオテーブルはゲーム実行中に編集・保存後、ホットリロードが可能です。
:::

### 基本構造

シナリオテーブルは上から順に実行され、複数の「シナリオユニット」行で構成されます。各ユニットは以下の列を持ちます（ヘッダー行で定義）：

- `step`：次の`step`が現れるまでの実行範囲の起点
- `jump`：実行時にジャンプするターゲットステップ
- `if`/`if2`：実行条件。`if2`列が存在する場合は両条件を満たす必要あり
- `action`：実行するアクション
- `param`：アクションのパラメータ
- `actor`：発言キャラクターID（複数キャラ会話用）。デフォルト `tg`。接尾辞 `?` は名前 `???` を表示します
- `id`：テキスト行の一意識別子（テキスト行のみ必須）
- `text_XX`/`text_JP`/`text_EN`：実際の対話内容。`XX` は言語コードで、例えば `text_CN`, `text_ZHTW`。`text` 列は欠落している言語コードの代替として使用されます。

シナリオはステップで実行され、各ステップ内で会話/アクション/条件分岐を組み合わせられます。

`main` がデフォルト開始ステップ、`end` が終了ステップです。カスタムステップ名はアンダースコア `_` や `flag` プレフィックスを避けてください。

### シナリオアクション

テキスト行はプレイヤーの入力（クリック/キー操作）で次へ進み、アクション行（`choice`除く）は連続実行され、テキストと共存できません。

主なアクション：

|アクション|パラメータ|説明|
|----|-----|------|
|`inject`|`Unique`|「話す」オプションと汎用ステップを挿入|
|`choice`||テキストに選択肢を追加（`text`と`jump`と併用）|
|`choice/bye`||デフォルトの別れオプションを追加|
|`cancel`||右クリック/ESCキーの動作を設定（通常は`end`に`jump`）|
|`setFlag`|flag, 値（省略可）|flagを設定（デフォルト値1）|
|`reload`||ストーリーを再読み込みし、現在のストーリーで行ったフラグの変更を適用します。通常は`jump`と組み合わせて使用し、通常は`main`です。**これはホットリロードを指しているわけではなく、開発時のホットリロードはファイルの変更を保存し、再度ダイアログを開くだけで済みます**|
|`enableTone`||会話のトーン切り替えを有効化|
|`addActor`||キャラクター識別子を追加（`actor`列に新ID入力時自動発動）|
|`invoke`|メソッド名|メソッドを呼び出し|
|`setBG`|画像名（省略可）|背景画像を設定（Textureフォルダのカスタムpng対応）、空で解除|
|`BGM`|BGM ID|BGMを変更（詳細は[Sound オーディオ/BGM](../Other/sound)参照）|
|`stopBGM`||BGM停止|
|`lastBGM`||BGM停止し、以前のBGMを復元|
|`sound`|効果音ID|効果音再生|
|`wait`|秒数|実行を一時停止（アニメーション待機用）|
|`alphaIn`|秒数|フェードイン効果|
|`alphaOut`|秒数|フェードアウト効果|
|`alphaInOut`|秒数, 待機, 秒数|フェードイン→待機→フェードアウト|
|`fadeIn`|秒数, `white`/`black`|画面を白/黒で徐々に表示|
|`fadeOut`|秒数, `white`/`black`|画面を白/黒で徐々に非表示|
|`fadeInOut`|秒数, 待機, 秒数|フェードイン→待機→フェードアウト|
|`hideUI`|遷移時間|UIを非表示（シナリオ終了時復元）|
|`hideDialog`||ダイアログを非表示（`wait`と併用）|
|`end`||シナリオを終了|
|`addKeyItem`|[キーアイテムID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107)|キーアイテムを付与|
|`drop`|[アイテムID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439)|プレイヤー位置にアイテム生成|
|`addResource`|[資源タイプ](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-homeresource-md), 数量|ホーム資源追加|
|`shake`||画面振動|
|`slap`||シナリオ所有者を平手打ち|
|`destroyItem`|[アイテムID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439)|指定アイテムを削除|
|`focus`||カメラをシナリオ所有者に即時フォーカス|
|`focusChara`|[キャラID](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657), 速度|同マップ内キャラにカメラ移動|
|`focusPC`|速度（省略可）|プレイヤーにフォーカス|
|`unfocus`||カメラリセット|
|`destroy`|[キャラID](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657)|同マップ内キャラを削除|
|`save`||セーブ|
|`setHour`|時間数|ゲーム内時間を設定|

複数パラメータはカンマ区切り（スペースなし）。

### トリガー条件

`if`/`if2`列で条件を追加：

|条件|パラメータ|説明|
|-----|-----|----------|
|`hasFlag`|flag|プレイヤーが非ゼロ値のflagを所持|
|`!hasFlag`|flag|プレイヤーがflag未所持または値ゼロ|
|`hasMelilithCurse`||プレイヤーがメリリスの呪い所持|
|`merchant`||プレイヤーが商人ギルド所属|
|`fighter`||戦士ギルド所属|
|`thief`||盗賊ギルド所属|
|`mage`||魔術師ギルド所属|
|`hasItem`|[アイテムID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439)|指定アイテム所持|
|`isCompleted`|[クエストID](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=785701697#gid=785701697)|クエスト完了済み|

条件フォーマットは `条件,パラメータ`。拡張式も可能：

```
=,test_flag,1
>,flag,5
,counter,20
!,flag,69
```

基本的に `if` 列のみ使用。複雑な条件は `if2` 列を追加。

::: warning 条件判定
`if` 列はストーリー表が読み込まれる際に一度だけ判定されます。これは、行を動的に有効/無効にすることができないことを意味します。`reload` または CWL の `invoke*` 拡張条件を使用してください。
:::

## 組み込みジャンプ

`inject/Unique` アクションを実行すると、多くの組み込みドラマステップが現在のドラマシートに挿入されます。これらを利用するには、単に `jump` の遷移先として設定するだけで構いません。いくつかのステップはデフォルトの `inject/Unique` 会話内ですでに使用されているため、改めて使用する必要はありません。

|ステップ名|用途|
|-|-|
|`_banish`|ドラマを終了する|
|`_bye`|ドラマを終了する|
|`_toggleSharedEquip`|`tg` の共有装備使用を切り替える|
|`_daMakeMaid`|`tg` をメイドに設定する|
|`_joinParty`|`tg` が参加可能な特性を持つ場合、パーティメンバーに設定する。**これは「招待」ではない！**|
|`_leaveParty`|`tg` をパーティから外し、ホームゾーンへ戻す|
|`_makeLivestock`|`tg` を勢力の家畜に設定する|
|`_makeResident`|`tg` を勢力の住民に設定する|
|`_depart`|勢力から `tg` を離脱させる|
|`_rumor`|噂話|
|`_sleepBeside`|`tg` がプレイヤーの隣で寝る状態を切り替える|
|`_disableLoyal`|`tg` の忠誠状態を切り替える|
|`_suck`|`tg` pc を吸う。優先度は吸血が最優先、次に猫吸い|
|`_insult`|`tg` の嘲弄状態を切り替える|
|`_makeHome`|現在のゾーン分岐を `tg` のホームとして設定する|
|`_invite`|`tg` を仲間として招待することを試みる。プレイヤー属性および `tg` の招待可能状態をチェックする。無条件でパーティーに勧誘する場合は、CWL拡張アクション[`join_party()`](https://elin-modding-resources.github.io/Elin.Docs/articles/100_Mod%20Documentation/Custom%20Whatever%20Loader/JP/Character/4_drama#%E3%82%A2%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3)を使用してください|
|`_Guide`|プレイヤーを複数の場所へ案内する|
|`_tail`|純粋な肉体関係|
|`_whore`|金銭の発生する肉体関係|
|`_bloom`|`tg` との絆を深める|
|`_buy`|`tg` から物を買う|
|`_buyPlan`|`tg` から研究図面を買う|
|`_give`|`tg` に物を渡す|
|`_blessing`|パーティに祝福を与える|
|`_train`|`tg` とスキルトレーニングを行う|
|`_changeDomain`|`tg` のドメインを変更する|
|`_revive`|倒れた仲間を蘇生させる|
|`_buySlave`|`tg` から奴隷を購入する|
|`_trade`|`tg` と物品を交換する|
|`_identify`|`tg` とアイテムを鑑定する|
|`_identifyAll`|`tg` と全アイテムを鑑定する|
|`_identifySP`|`tg` と上位技能を使ってアイテムを鑑定する|
|`_bout`|決闘を申し込む|
|`_news`|マップにランダムダンジョンを生成する|
|`_heal`|プレイヤーを回復する|
|`_food`|`tg` から食料を買う|
|`_deposit`|`tg` に預け入れる|
|`_withdraw`|`tg` から引き出す|
|`_copyItem`|`tg` とアイテムを複製する|
|`_extraTax`|追加税を支払う|
|`_upgradeHearth`|炉石をアップグレードする|
|`_sellFame`|名声を売る|
|`_investZone`|現在のゾーンに投資する|
|`_investShop`|`tg` の商店に投資する|
|`_changeTitle`|プレイヤーの称号を変更する|
|`_buyLand`|現在のゾーンのマップを拡張する|
|`_disableMove`|`tg` を移動不可にする|
|`_enableMove`|`tg` を移動可能にする|

## 拡張機能

スクリプトテーブル内蔵の `action` を使用して期待した効果が得られませんでしたか？追加の条件チェックが必要ですか？CWL は、DLL にカスタム拡張メソッドを追加し、スクリプトテーブル内でそれらを呼び出すことを許可します。

<LinkCard t="CWL シナリオの拡張" u="https://elin-modding-resources.github.io/Elin.Docs/articles/100_Mod%20Documentation/Custom%20Whatever%20Loader/JP/Character/4_drama"/>

## Mod Help集成

有时、プレイヤーにいくつかのヒントを提供して、あなたの素晴らしいストーリーをより良く体験してもらいたいと思うことがあります。CWLを使用してモジュールを作成することで、Mod Helpを利用してカスタマイズされたヘルプページを提供できます。

<LinkCard t="Mod Help" u="https://elin-modding-resources.github.io/Elin.Docs/articles/100_Mod%20Documentation/Mod%20Help/1_mod_help_jp" i="https://raw.githubusercontent.com/Drakeny/Elin.ModHelp/refs/heads/main/package/ModHelp.png" />
