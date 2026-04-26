---
title: ドラマアクション
author: DK
date: 2026/4/19 17:00
hide: true
---

## ドラマアクション

テキスト行はプレイヤーの入力（クリック／キー操作）によって次の行へ進みます。
アクション行（`choice`を除く）は**自動実行**され、テキスト行と**共存できません**（両方が同じ行にある場合はテキストが無視されます）。

## よく使われるアクション

|アクション|引数|説明|
|-|-|-|
|`inject`|`Unique`|「Let's Talk」および一部の共通手順を挿入|
|`choice`||テキストに選択肢を追加（`text`および`jump`と組み合わせて使用）|
|`choice/bye`||デフォルトの別れ選択肢を挿入|
|`cancel`||右クリック／ESCキーの挙動を設定（`jump`と組み合わせて使用。通常は`end`）|
|`setFlag`|フラグ名, 値(省略可)|フラグに値を設定（省略時は1）|
|`reload`||現在のフラグ変更を反映させるためドラマを再読み込み。必ず`jump`（通常は`main`）と併用。**開発時のホットリロードではありません。**|
|`enableTone`||会話時の口調変換を有効化|
|`addActor`||アクターIDを追加（`actor`列に新しいIDを記入すると自動的に処理されます）|
|`invoke`|メソッド名|指定したメソッドを呼び出す|
|`setBG`|画像名(省略可)|背景画像を設定（**Textureフォルダ**内のpngも使用可）。空欄で背景を消去|
|`BGM`|BGM ID|BGMを切り替え（[Sound](../Other/sound)参照）|
|`stopBGM`||BGMを停止|
|`lastBGM`||現在のBGMを停止し、前のBGMを復元|
|`sound`|音声ID|効果音を再生（[Sound](../Other/sound)参照）|
|`wait`|秒数|指定秒数だけ処理を停止（アニメーション待ちなどに使用）|
|`alphaIn`|所要時間|フェードイン（秒）|
|`alphaOut`|所要時間|フェードアウト（秒）|
|`alphaInOut`|フェードイン時間, 待機時間, フェードアウト時間|フェードイン→待機→フェードアウト|
|`fadeIn`|所要時間, `white`/`black`(省略可)|画面を徐々に表示（白/黒）|
|`fadeOut`|所要時間, `white`/`black`(省略可)|画面を徐々に暗転（白/黒）|
|`fadeInOut`|フェードイン時間, 待機時間, フェードアウト時間|フェードイン→待機→フェードアウト|
|`hideUI`|トランジション時間|UIを非表示（ドラマ終了時に自動復帰）|
|`hideDialog`||会話ウィンドウを非表示（`wait`と組み合わせて使用）|
|`end`||即座にドラマを終了|
|`addKeyItem`|[重要アイテムID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107)|プレイヤーに重要アイテムを付与|
|`drop`|[アイテムID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439)|プレイヤーの足元にアイテムをドロップ|
|`addResource`|[リソース種別](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-homeresource-md), 数量|ホームリソースを追加|
|`shake`||画面を揺らす|
|`slap`||ドラマ所有者キャラクターをビンタ|
|`destroyItem`|[アイテムID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439)|所持品から指定アイテムを削除|
|`focus`||即座にドラマ所有者へカメラをフォーカス|
|`focusChara`|[キャラクターID](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657), 速度(省略可)|**同一マップ内のキャラクター**へカメラを移動|
|`focusPC`|速度(省略可)|プレイヤーキャラクターへカメラをフォーカス|
|`unfocus`||カメラをリセット|
|`destroy`|[キャラクターID](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657)|**同一マップ内のキャラクター**を削除|
|`save`||セーブを実行|
|`setHour`|時間|ゲーム内時間を設定|

**複数引数は `,`（半角カンマ）で区切り、間にスペースを入れないでください。**

## ビルトインジャンプ（組み込みジャンプ）

`inject/Unique` アクションを実行すると、大量のビルトインステップが現在のドラマテーブルに挿入されます。これらを使用するには、`jump`の対象として名前を指定するだけです。一部はデフォルトの `inject/Unique` 対話ですでに使用されているため、再使用の必要はありません。

|ステップ名|用途|
|-|-|
|`_banish`|ドラマを終了|
|`_bye`|ドラマを終了|
|`_toggleSharedEquip`|`tg`の共有装備状態を切り替え|
|`_daMakeMaid`|`tg`をメイドにする|
|`_joinParty`|`tg`の特性が許可している場合、仲間に入れる（**招待処理ではありません**）|
|`_leaveParty`|`tg`をパーティーから外し、拠点エリアへ戻す|
|`_makeLivestock`|`tg`を派閥の家畜にする|
|`_makeResident`|`tg`を派閥の住人にする|
|`_depart`|`tg`を派閥から除名|
|`_rumor`|流言を閲覧|
|`_sleepBeside`|`tg`がプレイヤーの隣で寝るかどうかを切り替え|
|`_disableLoyal`|`tg`の忠誠心状態を切り替え|
|`_suck`|`tg`が吸血or吸猫（**吸血を優先、次に吸猫**）|
|`_insult`|`tg`の嘲讽状態を切り替え|
|`_makeHome`|現在いるエリア支部を`tg`の家にする|
|`_invite`|`tg`を仲間として招待（プレイヤーの能力と`tg`の状態をチェック）。無条件で加入させたい場合はCWL拡張アクション[`join_party()`](./3_invoke#アクション)を使用|
|`_Guide`|プレイヤーを複数の地点へ順に案内|
|`_tail`|純粋な肉体関係|
|`_whore`|金銭を伴う肉体関係|
|`_bloom`|`tg`との絆を深める|
|`_buy`|`tg`からアイテムを購入|
|`_buyPlan`|`tg`から研究図を購入|
|`_give`|`tg`にアイテムを渡す|
|`_blessing`|パーティー全体に祝福を付与|
|`_train`|`tg`とスキル訓練を行う|
|`_changeDomain`|`tg`の領域を変更|
|`_revive`|死亡した仲間を復活|
|`_buySlave`|`tg`から奴隷を購入|
|`_trade`|`tg`とアイテムを交換|
|`_identify`|`tg`に鑑定を依頼|
|`_identifyAll`|`tg`に全アイテムの鑑定を依頼|
|`_identifySP`|`tg`に上級鑑定を依頼|
|`_bout`|決闘を申し込む|
|`_news`|マップ上にランダムダンジョンを生成|
|`_heal`|プレイヤーを回復|
|`_food`|`tg`から食料を購入|
|`_deposit`|`tg`に預金|
|`_withdraw`|`tg`から引き出し|
|`_copyItem`|`tg`にアイテム複製を依頼|
|`_extraTax`|追加税金を納付|
|`_upgradeHearth`|炉石をアップグレード|
|`_sellFame`|名声を売却|
|`_investZone`|現在のエリアに投資|
|`_investShop`|`tg`の店に投資|
|`_changeTitle`|プレイヤーの称号を変更|
|`_buyLand`|現在のエリアを拡張|
|`_disableMove`|`tg`の移動を禁止|
|`_enableMove`|`tg`の移動を許可|
