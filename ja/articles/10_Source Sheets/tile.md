---
title: Tile タイル
author: DK
description: マップタイルである Block、Floor、Obj、Deco、CellEffect の各ソースシートの列リファレンスと、コードを書かずに建築・栽培・テクスチャ付けを可能にする方法です。
date: 2026/9/6 18:30
tags: SourceSheet/Tile
---

# タイルシート (Block / Floor / Obj / Deco / CellEffect)

<LinkCard t="SourceBlock (Block / Floor / Obj / Deco / CellEffect / Material)" u="https://docs.google.com/spreadsheets/d/13oxL_cQEqoTUlcWsjKZyNuAaITFGK56v/edit" />

5つのタイルシートは、ほとんどの列を共有しています。マップのセルに置かれるもの——壁、床、作物、カーペット、装飾、液体エフェクト——は、すべてそのいずれかのシートの1行です。

**ソーステーブルを作成するときは、必ず公式ソーステーブルの最初の3行をそのままコピーし、4行目以降にデータを入力してください。**

::: details 列、空行、空セルについて
**足りない列は空の値で埋められます。** 列の順序が違う場合はヘッダー名で照合されます。

**空セルは空の値ではありません**：**あなた自身のシート**の3行目の値を取ります。最初の3行をコピーしなければならないのはこのためです。3行目が空のままだと、`_tileType` が空になってその行は建築メニューに一切現れず、`category` が空になって `obj` にフォールバックする……といった具合です。

**`id` が空の行があると、そこから先のシートの読み込みが打ち切られます。** データの間に空行を残さないでください。
:::

## ID と alias

`id` には任意の正の数値を使えます。**256〜65535** が最適な範囲です：セーブデータがコンパクトに保たれます。**ゲーム本体が使う 0〜255 は避けてください。**

+ 同じIDを使う2つのModは互いの行を上書きし、ロード順で後のものが勝ちます。
+ `alias` は一意でなければならず、行を名前で参照するものすべてに必要です：テクスチャのファイル名、`defBlock` / `bridgeBlock` / `autoFloor`、そして種。Mod名を接頭辞に付けてください。

## 共通の列

|列|タイプ|説明|
|-|-|-|
|id|整数|一意の数値ID。上記を参照。|
|alias|テキスト|テクスチャ、他シートからの参照、種で使われる一意の名前。|
|name_JP / name|テキスト|表示名。**両方**記入してください。`name` は日本語以外の言語でのフォールバックにすぎません。|
|sort|整数|建築メニューのタブ内での並び順。空欄 = 前の行の次になるため、Modの行は末尾に並びます。|
|reqHarvest|テキスト[]|撤去に必要な `skill,level`：`mining`、`digging`、`gathering`、`lumberjack` のいずれか。空欄の場合はシートのデフォルトにフォールバックします。|
|hp|整数|頑丈さ。hp が高いほど採掘や掘削に時間がかかります。|
|_tileType|テキスト|タイルの種類。Block：`Block`、`Wall`、`WallOpen`、`Fence`、`FenceClosed`、`HalfBlock`、`Slope`、`Stairs`、`Pillar`、`BlockDeco`。Floor：`Floor`、`FloorWater`、`FloorWaterShallow`、`FloorWaterDeep`、`Bridge`。Obj：`Obj`、`ObjBig`、`ObjHuge`、`Tree`、`Road`、`Chasm`、`WallMount`、`WallHang`、`Roof`、`Door`、`ObjWater`……。綴りを誤ると、その行は建築メニューから隠されます。|
|_idRenderData|テキスト|タイルの描き方、つまりセルサイズを決めます：Block は空欄 / `block_thin` / `fence` / `halfblock`（64×64）、Floor は空欄 / `floor_obj`（64×48）、Obj は `obj`（64×64）、`obj_S` / `obj_S flat`（32×32）、`obj_L` / `obj_LV`（80×64）。|
|tiles|整数[]|スプライトシート内のセル番号（`row*100+column`、テクスチャビューアーに表示される数値）。`Texture/<テーブル名>/<alias>.png` を同梱する場合は空欄にしておくと、ゲームが埋めてくれます。負の値は左右反転になります。|
|anime|整数[]|`frames,ms[,loop[,sound]]` のアニメーション。Floor / Deco / CellEffect のみで有効で、Obj 行は無視します。|
|snowTile|整数|Block：デフォルトのままにしてください（屋根の積雪）。Obj：`>0` にするとそのオブジェクトを雪の下で隠し、代わりに雪の床バリアントを表示します。|
|colorMod|整数|素材の色がアートをどれだけ着色するか。`100` = バニラと同じ着色、`0` = 描いたとおりに表示（手描きの作物には `0` を使ってください）。|
|colorType|テキスト|Block / Obj：`alt` はマテリアルの2番目の色で着色し、`random` はランダムに選びます。|
|value|整数|基本価値。|
|LV|整数|クラフトに必要なスキルレベル。|
|recipeKey|テキスト[]|`*` = 対応する作業台をプレイヤーが初めて開いたときに自動的に習得；`-` = ランダムレシピとして出現しない；ショップ名（`Starter`、`Loytel` など）= そこでレシピの巻物として販売。|
|factory|テキスト[]|作業台のアイテムID：`factory_wall`、`factory_block`、`factory_floor`、`workbench`。`self` = クイッククラフト、`x` = 一覧に出さない、`none` = クラフト不可。アイテムではないIDを指定するとレシピが無効になります。|
|components|テキスト[]|材料：`id[/count]`。材料同士は `,` で区切り、`\|` は代替、`id@tag` はタグを要求（`chunk@soil/1`）、`$` は色を与える材料の印、`#` はカテゴリの指定、`+` は任意の材料の印。空欄または `-` = 丸太1つ。書式が不正だとレシピが失われます。|
|defMat|テキスト|アイコンとマップ生成に使う素材の alias。`!alias` で素材を固定します。プレイヤーが建てたものの素材では**ありません**——それはプレイヤーが選んだ材料で決まります。|
|category|テキスト|建築メニューのタブ：`wall`、`fence` → Wall；`foundation`；`floor`、`floor_field` → Floor；`obj`；`deco`。未知の値は `obj` にフォールバックします。|
|tag|テキスト[]|フラグ。Floor：`noFloor`、`noBridge`、`noSnow`、`noTransition`、`beach`、`snowtile`、`nonGradient`。Obj：`autotile`、`seed`、`crop`、`rareSeed`、`crime`。共通：`hiddenRecipe`、`oneblock_only`。|
|detail_JP / detail|テキスト|説明文。|

### Block

|列|タイプ|説明|
|-|-|-|
|idThing|テキスト|ブロックを撤去したときに手に入るアイテム（`block`、`wall`、`fence`）。|
|roof|整数|ブロックが部屋に接しているときに使われる屋根のスタイル。|
|autoFloor|テキスト|ブロックを採掘した後に残る床の alias（空欄 = 素の地面。未知の alias は `floor_raw` にフォールバックします）。|
|concrete / transparent|真偽値|建築用のフラグ。似ている公式の行からコピーしてください。|
|transition|整数[]|傾斜/遷移のセル。`-1` = なし。|
|soundFoot|テキスト|足音のID。|

### Floor

|列|タイプ|説明|
|-|-|-|
|defBlock|テキスト|床をブロックに変えるときに使うブロックの alias。**必須**です（ほとんどの行は `block_raw`）。未知の alias はデフォルトのブロックにフォールバックします。|
|bridgeBlock|テキスト|この床で架けた橋の下に置かれる柱ブロックの alias（`pillar31`）。|
|soundFoot|テキスト|足音のID（`wood`、`dirt`、`carpet` など）。|
|autotilePriority|整数|隣り合う2つの床のどちらが、その境目を描くか。|
|idBiome|テキスト|マップ生成に使うバイオームID。存在するものでなければなりません。|

すべての Floor 行には橋のレシピも付きます。`tag` に `noBridge` が含まれるか、`factory` が `x` の場合は除きます。

### Obj

|列|タイプ|説明|
|-|-|-|
|_growth|テキスト[]|`Class,stageFrame,harvestFrame,harvestThing,maxCount` —— [成長](#growth) を参照。|
|costSoil|整数|植えるときに消費する土壌。|
|objType|テキスト|`resource`、`crop`、`tree`、`plant`。効果があるのは `crop` だけで（種の食料ボーナス）、残りはただのラベルです。|
|vals|整数[]|`vals[0]` = どの種のアイコンを使うか（`seed` アイテムのスキン一覧の番号）。|
|valType|テキスト|`None`、`Growth`、`Material` のいずれか。綴りを誤ると `None` として扱われます。|
|matCategory|テキスト|マップ生成でのみ使われるランダム素材プール。|
|chance|整数|ランダムな種プールでの重み（`tag` に `seed` を含む行）。|

## 建築メニュー

Block / Floor / Obj の行は、次のすべてを満たしたときに建築メニューへ表示されます。

1. `_tileType` が実在するタイルの種類であること（空欄でも `Marker` でもない）；
2. `factory` が作業台のアイテムID（`factory_wall`、`factory_block`、`factory_floor`、`workbench`）であり、`x` / `none` ではないこと；
3. プレイヤーがそのレシピを**習得している**こと。`recipeKey` = `*` なら、その作業台を初めて開いたときに習得します。それ以外は、同種のタイルを採掘して見つけるか、巻物として購入できます（`recipeKey` にショップ名）；
4. `category` が今見ているタブに対応していること。

`components` が材料を決め、プレイヤーが選んだ材料が成果物の素材を決めます。

## 成長 {#growth}

`_growth = Class,stageFrame,harvestFrame,harvestThing,maxCount` は Obj を作物・樹木・雑草に変えます。`Class` は成長の種類です：`Crop`、`Wheat`、`Rice`、`Tree`、`Weed`、`Flower`、`Herb`、`Rose`、`Cactus`、`Cha`、`Kinoko`、`Berry`、`Pasture`、`Seaweed` など。未知のクラスの場合、その行は何も育ちません。

+ **ステージ**：植物は時間とともにステージを進みます。ほとんどの種類では、最後のステージが枯れた状態です。
+ **収穫**では `harvestThing`（アイテムID、またはそのカテゴリのランダムなアイテムを表す `#category`）が 1〜`maxCount` 個手に入ります。植物を掘り起こすと `components` の最後の項目がドロップします。
+ **種**に専用のアイテム行は必要ありません：バニラの `seed` アイテムが、どの Obj を植えるかを覚えています。`tag` に `seed` を追加し（食料ボーナスには `objType` を `crop` に）、`vals` に種のアイコンを、`chance` にランダムな種プール用の値を設定します。`rareSeed` を付けるとそのプールから除外されます。
+ **テクスチャ**：各ステージを1本のストリップとして `Texture/Obj/<alias>.png` に描き、`stageFrame` / `harvestFrame` にはそのストリップ内のフレーム番号（0から数えます）を書きます。クラスごとのフレームの並びは [テクスチャ差し替えとタイルテクスチャ](/ja/articles/15_Texture%20Mods/replacement#growth) にあります。テクスチャ差し替えのスロットを使う場合は、これらはスロット番号になります。

7フレームのストリップを使う、最小限の麦系作物：

|id|alias|name_JP|name|_growth|costSoil|objType|vals|tag|_idRenderData|colorMod|components|defMat|
|-|-|-|-|-|-|-|-|-|-|-|-|-|
|3006|mymod_wheat|麦|my wheat|`Wheat,0,5,wheat,2`|30|crop|2|crop,seed|obj|0|grass|grass|

## マテリアル

マテリアルは別のシートで、それ自体はテクスチャを持ちません。[マテリアル](/ja/articles/10_Source%20Sheets/material) を参照してください。新しい鉱石に必要なのは、`category` = `ore`、`tier`、`chance` と色のタグを設定した Material 行だけです——バニラの鉱脈がそれを拾い、自分自身を着色します。

## ローカライズ

`name` / `name_JP` が英語と日本語をカバーします。それ以外の言語については、初回起動時に（またはModビューアーの **Export Text** から）ゲームが `LangMod/<LANG>/SourceLocalization.json` をModフォルダへ書き出します。`SourceBlock.mymod_wall.name` のようにテキストごとに1つのキーが並ぶので、値を記入してください。

## 落とし穴

+ シートの3行目はデフォルト行です。公式シートからコピーしてください。
+ `alias` はテクスチャと種に必須です。バニラは多くの行で空欄のままですが、あなたはそうすべきではありません。
+ `factory` は実在するアイテムIDでなければならず、`components` は書式が正しくなければなりません。そうでないとレシピが消えます。
+ `defBlock` / `bridgeBlock` / `autoFloor` には実在する alias を指定してください。誤った名前はフォールバックに置き換えられます。
+ Obj 行に `anime` を書かないでください。また、PNG を同梱する行では `tiles` を自分で埋めないでください。
+ すべてはゲームの起動時に再構築されます。xlsx や PNG を編集したら、ゲームを再起動するだけで済みます。
