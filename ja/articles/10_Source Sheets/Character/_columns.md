---
title: 表を作成
author: Puddles
description: Comments about columns of Chara sheet.
date: 2025/8/30 00:00
tags: SourceSheet/Chara
---

## Chara Sheet

<LinkCard t="SourceCard/Chara" u="https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1953808581#gid=1953808581" />

ソース表を作成する際は、必ず公式ソース表の最初の3行をそのままコピーしてください。データ入力は4行目以降から開始し、**列の順序は絶対に変更しないでください**。

|列|種類|説明|
|-|-|-|
|id|テキスト|エントリを一意に識別するための最も重要なIDです。キャラ表内で他のすべての項目と区別するために使用されます。このIDがバニラや他MODのIDと被った場合、最後に読み込まれたテーブルが優先されて上書きされます。スペースは絶対に入れず、必要に応じてsnake_case（例：`mymod_chara_yajyuu_senpai`）を使用してください。|
|_id|整数|図鑑での並び順を制御します。任意の数値を設定可能で、重複しても問題ありません。|
|name_JP|テキスト|ゲーム内で表示されるキャラクターの日本語名です。|
|name|テキスト|ゲーム内で表示されるキャラクターの英語名です。他の言語はSourceLocalization.jsonで管理します。|
|aka_JP|テキスト|ゲーム内で表示される別名・肩書きの日本語表記です。|
|aka|テキスト|ゲーム内で表示される別名・肩書きの英語表記です。他の言語はSourceLocalization.jsonで管理します。|
|idActor|テキスト|PCCパーツを使用したレンダリングを制御します。例：`pcc,unique,jure` と指定すると、`pcc/unique/jure`からPCCパーツを読み込みます。|
|sort|テキスト|SourceCharaでは使用されていません。|
|size|テキスト|キャラクターが占有するタイルサイズです。通常は空欄にします。例：`2,2`にすると2×2タイルを占有し、押し出されなくなります。|
|_idRenderData|テキスト|スプライトシートの参照方法を制御します。`chara`/`chara_L`などは**Texture Replace**のテクスチャと`tiles`のタイルIDを使用（スロットに限りがあり上書きされる可能性あり）。`@chara`は**Texture**内にある同じIDのテクスチャを使用します。**MODキャラは必ず`@chara`を使用してください**。|
|tiles|整数|スプライトシートのタイルID、またはMODキャラの場合は[skinset](../../15_Texture%20Mods/skins)を指定します。|
|tiles_snow|整数|雪原マップで使用する代替タイルIDです。MODキャラの場合は[variation](../../15_Texture%20Mods/variation)を使用してください。|
|colorMod|整数|現在は主に`100`と組み合わせて使用し、グレースケールスプライトが`mainElement`の色を継承できるようにします。|
|components|テキスト|SourceCharaでは使用されていません。|
|defMat|テキスト|SourceCharaでは使用されていません。|
|LV|整数|キャラクターの「危険度レベル」です。マップ危険度による生成閾値、選択コスト（奴隷商人・調教師）、種族/職業特性に基づく基礎ステータス生成に影響します。|
|chance|整数|マップ生成確率の補正値です（販売リストにも影響する可能性があります）。デフォルトは`100`です。|
|quality|整数|`0–2`：通常ランク。`3`：ユニークモンスター（卵入手可能。ただし友達・捕獲・調教不可）。`4`：ユニークキャラクター（卵のみ。友達にはなれるが捕獲・調教不可）。|
|hostility|テキスト|プレイヤー・味方・傍観者に対する気性です。空欄の場合は`Hostile`（敵対）になります。<br>`Neutral`：攻撃されない限り積極的に攻撃しません。<br>`Friend`：味方ユニットに敵対的な対象を攻撃し、プレイヤーが怒っている場合も攻撃します。|
|biome|テキスト|指定した床タイプでの生成率を上昇（場合により2倍）、それ以外では下降（場合により半減）させます。例：`Water`にすると水上の床に強く偏って生成されます。|
|tag|テキスト|使用可能なタグ例：<br>`mini`（スプライトを半分サイズに）、`noRandomProduct`（Fortune Drumでパンツが出なくなる。同人誌も出にくくなる可能性あり）、`random_color`（`colorMod=100`時にグレースケール部分の髪色をランダム化）、`randomFish`、`staticSkin`（性別によるスプライト割り当てを上書き）、`snow`（雪タイルを好む）、`water`（水タイルを好む）など。|
|trait|テキスト|複雑な特性の設定一覧です。特性ドキュメントおよび`Trait*` C#クラスを参照してください。|
|race|テキスト|SourceRaceで定義されている種族IDです。|
|job|テキスト|SourceJobで定義されている職業IDです。デフォルトは`none`です。|
|tactics|テキスト|割り当てられた職業のデフォルト戦術を上書きします。|
|aiIdle|テキスト|AI行動の追加・上書き設定です。例：`Stand`（完全に静止し、攻撃されても動きません）、`Root`（攻撃されるかスカウトされるまでその場で待機）。|
|aiParam|テキスト|3つの数値で「敵との最適距離」「毎ターンその距離に移動する確率」「（稀に使用）再移動の追加確率」を指定します。|
|actCombat|テキスト|戦闘中に使用可能なアクティブSourceElementをカンマ区切りで指定します。`/N`で使用確率を固定できます。バフ系は`/pt`を付けるとパーティ全体に効果を及ぼします（味方ステータスのみ）。<br>例：`ActThrowPotion/30,SpWeakness,SpSpeedDown,SpWisdom/50/pt`<br>デフォルト確率は100です。|
|mainElement|テキスト|主要属性親和性です。`Fire`、`Cold`、`Lightning`、`Darkness`、`Nether`、`Sound`、`Chaos`、`Poison`、`Cut`、`Acid`、`Impact`から選択。|
|elements|テキスト|パッシブSourceElementをカンマ区切りで指定します。`/N`でレベル/数値を設定可能。`0`や負の値で種族からの継承を修正できます。<br>例：`invisibility/1`（有効）、`invisibility/0`（継承無効）、`antidote/-30`（肉に毒を持たせる）、`antidote/30`（解毒or種族の-30を打ち消す）。|
|equip|テキスト|職業のランダム装備テンプレートを上書きします。**種族のEQが空でない場合のみ有効**です。<br>例：シーフ職業に`equip=Archer`を設定すると弓兵装備になりますが、犬種族など種族EQが空の場合は`equip`を設定しても装備は生成されません。|
|loot|テキスト|追加ドロップアイテム（Thing/ThingVのID）をカンマ区切りで指定し、`/N`でドロップ率を調整します。20ポイントにつき+1%のドロップ率になります。<br>例：`medal/500`=25%、 `medal/3000`=150%（確定1個＋50%でさらに1個）。|
|category|テキスト|ほとんどの場合はデフォルトの`chara`を使用します。|
|filter|テキスト|SourceCharaでは使用されていません。|
|gachaFilter|テキスト|ガチャで最初にカテゴリ（resident/livestock/Unique/defaultなど）を選択した後、このフィルターで条件に合うキャラクターを抽出します。例：livestockを選択した場合はlivestockタグ付きのエントリのみが対象になります。|
|tone|テキスト|日本語テキストの会話トーン修飾子です。|
|actIdle|テキスト|非戦闘時の特殊行動指示です。<br>例：`readBook`（ランダムな本を生成・読書・削除）、`buffMage`（定期的に`spResElement`や`spHero`などのバフ魔法を唱える）。|
|lightData|テキスト|SourceCharaでは使用されていません。発光する光の色を設定します。|
|idExtra|テキスト|SourceCharaでは使用されていません。追加のレンダリングデータを指定します。|
|bio|テキスト|スラッシュ区切りの値（スペース禁止）です。`gender`（`m`/`f`/`n`、必須）、`birthyear`（任意）、`height`（任意）、`weight`（任意）、`chara_tone.xlsx`の`tone`（任意）、`chara_talk.xlsx`の`talk`（任意）。<br>例：`f/51044/152/46/friendly|私|あなた`|
|faith|テキスト|固定の信仰です。設定するとゲーム内で変更できなくなります。|
|works|テキスト|SourceHobbyのaliasを指定します。|
|hobbies|テキスト|SourceHobbyのaliasを指定します。|
|idText|テキスト|`CharaText`テーブル内の対応する項目と紐付けます。|
|moveAnime|テキスト|移動アニメーションの種類です。`hop` または空欄にします。|
|factory|テキスト|SourceCharaでは使用されていません。|
|components|テキスト|SourceCharaでは使用されていません（重複列）。|
|recruitItems|テキスト|特殊なスカウト会話用アイテムです。現在はmaniのみ使用されています。|
|detail_JP|テキスト|SourceCharaでは使用されません。メモや備考としてご自由にお使いください。|
|detail|テキスト|SourceCharaでは使用されません。メモや備考としてご自由にお使いください。|