---
title: シナリオの拡張
date: 2025/5/24 01:00
hide: true
---

::: tip 暫定版
このセクションのAPIは変更される可能性があります。
:::

CWLには、内蔵された一連のスクリプト拡張メソッドが付属しています。ここで[コードを確認](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/API/Drama/Expansions)できます。

`Dialog.ExpandedActions` 設定を有効にする必要があります。デフォルトで有効になっています。

ストーリーテーブルでは、CWLの特別なアクション `invoke*` を使用して拡張メソッドを呼び出すことができます：
![](./assets/dramae_invoke.png)

### パラメータ渡し

カンマ区切りで指定：

|action|param|actor|
|-|-|-|
|`invoke*`|honk_honk(arg1, arg2)|`pc`|

`actor` 列はターゲットキャラ(`pc` `tg` または任意の[キャラID](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657))を示します。

`jump` 列が存在する場合、拡張メソッドの戻り値が `true` ならジャンプを実行します。

**数値式**: `+5`、`*10`、`=69`、`!=114` などは、判定または代入に使用される表現です。

## 拡張方法

### アクション

|メソッド|パラメータ|説明|ジャンプ条件|
|-|-|-|--|
|`add_item`|[アイテムID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=1479265439#gid=1479265439), [材質alias](https://docs.google.com/spreadsheets/d/13oxL_cQEqoTUlcWsjKZyNuAaITFGK56v/edit?gid=33087043#gid=33087043)(省略可), レベル(省略可), 数量(省略可)|`actor`に指定された物品を追加し、デフォルトではランダムな材質、自動レベル、数量は `1`|常時|
|`add_element`|[エレメントエイリアス](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1766305727#gid=1766305727), レベル(省略可)|`actor`に指定されたエレメント/特技/能力を追加し、デフォルトレベルは `1`|常時|
|`join_party`||`actor`をパーティーに加入|常時|
|`join_faith`|[信仰ID](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=729486062#gid=729486062)(任意)|`actor`を信仰に加入させ、空の場合は現在の信仰から退出する|成功時|
|`apply_condition`|[状態alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246), 強度|状態を付与|常時|
|`cure_condition`|[状態alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|状態を治療|成功時|
|`remove_condition`|[状態alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|状態を解除|常時|

`build_ext` と `emit_call` を通じて外部アセンブリメソッドを呼び出すには、 `Dialog.ExpandedActionsAllowExternal` 設定を有効にする必要があります。デフォルトでは有効になっています。

![](./assets/dramae_ext.png)

### 演劇パフォーマンス

|メソッド|パラメータ|説明|ジャンプ条件|
|-|-|-|--|
|`move_next_to`|[キャラID](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=1622484657#gid=1622484657)|`actor`を**同じマップのキャラクター**の隣に移動させる|常時|
|`move_tile`|X, Yオフセット|`actor`を相対座標移動|常時|
|`move_zone`|[エリアID](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752), 階層(省略可)|`actor`を転送|常時|
|`play_anime`|[アニメID](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-animeid-md)|アニメーション実行|常時|
|`play_effect`|[エフェクトID](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-effects-md)|エフェクト再生|常時|
|`play_emote`|[表情ID](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-elin-emo-md)|表情を表示|常時|
|`play_screen_effect`|[スクリーンエフェクトID](https://gist.github.com/gottyduke/6e2847e37d205a5621bfd0615e5bd9e7#file-screeneffect-md)|スクリーンエフェクトを再生|常時|
|`pop_text`|テキスト|`actor`に叫びのテキスト(吹き出し)を発声させる|常時|
|`portrait_set`|立ち絵ID(省略可)|`actor`の対話立ち絵を設定し、空の場合はリセットされ、**Portaitフォルダー**のカスタムファイルをサポートします。例：`UN_doodoo2`|常時|

### その他

|`mod_affinity`|数値式(例: `+5`)|`actor`の好感度を調整|成功時|
|`mod_flag`|数値式|`actor`のflag値を変更|常時|
|`mod_keyitem`|[キーアイテムID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107), 値式(省略可)|プレイヤーの重要アイテムの値を変更します。デフォルトは `+1`|成功時|
|`build_ext`|アセンブリ名|指定されたアセンブリ内のメソッドを可能な限りストーリー拡張テーブルに追加する|成功時|
|`emit_call`|ext.メソッド名|外部の静的メソッドを呼び出す|常時|

外部アセンブリメソッドを呼び出すには、`build_ext` と `emit_call` を使用し、`Dialog.ExpandedActionsAllowExternal` 設定を有効にする必要があります。デフォルトで有効になっています。

![](./assets/dramae_ext.png)

### 条件

これらも拡張メソッド(`invoke*` アクションを通じて呼び出される)ですが、それらの戻り値は `jump` ジャンプの判定に使用できます。

|メソッド|パラメータ|説明|ジャンプ条件|
|-|-|-|-|
|`if_affinity`|数値式|`actor`の好感度をチェック|条件が満たされた時|
|`if_condition`|[状態alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=921112246#gid=921112246)|`actor`が状態を持っているかチェック|条件が満たされた時|
|`if_element`|[元素alias](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1766305727#gid=1766305727), 数値式|`actor`が条件に合った元素を持っているか確認|条件が満たされた時|
|`if_faith`|[信仰ID](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=729486062#gid=729486062), レベル(省略可)|`actor`が特定の信仰に加入しており、特定のレベル(デフォルトは0レベル)以上であるかを確認|条件が満たされた時|
|`if_flag`|数値式|`actor`のフラグ値をチェック|条件が満たされた時|
|`if_keyitem`|[キーアイテムID](https://docs.google.com/spreadsheets/d/175DaEeB-8qU3N4iBTnaal1ZcP5SU6S_Z/edit?gid=836018107#gid=836018107), 数値式(省略可)|プレイヤーが表現に合ったキーアイテムの値を持っているかを確認する、デフォルトは `>0`|条件が満たされた時|
|`if_race`|[種族ID](https://docs.google.com/spreadsheets/d/1CJqsXFF2FLlpPz710oCpNFYF4W_5yoVn/edit?gid=140821251#gid=140821251)|`actor`が対応する種族であるかを確認|条件が満たされた時|
|`if_tag`|tag|`actor`がタグを持っているかチェック|条件が満たされた時|
|`if_zone`|[エリアID](https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=1819250752#gid=1819250752), 階層数(省略可)|`actor`のいるエリアをチェック|条件が満たされた時|

## カスタムメソッド実装

CWLは[シンプルなAPI](../API/Custom/drama)を提供し、独自のスクリプトDLLに拡張メソッドを追加できます。
