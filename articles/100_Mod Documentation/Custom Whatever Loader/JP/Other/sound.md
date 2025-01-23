---
title: 音声/BGM
date: 2025/1/3 01:00
hide: true
---

## 音声/BGM

オーディオファイルは **acc**、**mp3**、**ogg**、**wav** 形式で、ファイル名がオーディオIDとして使用されます。音声を使用すると、デフォルトの同名メタデータJSONが生成され、編集して次回ゲーム起動時に音声ファイルのメタデータを適用することができます。

メタデータで"type": "BGM"を設定すると、オーディオは**BGMData**としてではなく**SoundData**としてインスタンス化されます。また、メタデータ内でBGMの小節部分をカスタマイズすることもできます。

**同じIDを使用して、既存のゲーム内音声を上書きすることができます**。例えば、ひよこの鳴き声はID **Animal/Chicken/chicken**を使用しているので、**Sound/Animal/Chicken/**フォルダーに**chicken**という名前の音声ファイルを用意して上書きすることができます。

**Sound**フォルダー内のサブディレクトリはオーディオIDのプレフィックスとして使用されます。たとえば、`AI_PlayMusic`は`Instrument/sound_id`を使用するため、楽器音楽を置き換える場合は、同名のオーディオファイルを`Instrument`フォルダーに配置してください。

例：
![](../../assets/clown_horn.png)
```cs
pc.PlaySound("clown_horn"); // <- Card.PlaySound
SE.PlaySound("clown_horn");
```

## カスタムBGM/プレイリスト

::: tip バージョン要件
この機能はCWL **`1.19.0`** 以降のバージョンが必要です。
:::

ゲームには100以上のBGMが含まれており、それぞれに数字IDと音声IDがあります。
::: details BGM
|BGM ID|音频 ID|BGM 名称|
|-|-|-|
|1|001 no bgm|No BGM|
|2|002 pop01|Pop01|
|3|003 PSML516|PSML516|
|4|004 hoshinokiseki|Hoshi No Kiseki|
|5|005 elomap1|Tyris 1|
|6|006 elomap2|Tyris 2|
|7|007 elomap3|Tyris 3|
|8|008 town2 magic|Town 2|
|9|009 fun village|Fun Village|
|10|010 bouken no junbi|Bouken No Junbi|
|11|011 bukikoubou|Buki Kobo|
|12|012 kiminoita natsu|Kiminoita Natsu|
|13|013 ruins|Ruins|
|14|014 village1|Village|
|15|015 Atlantean_Twilight256|Atlantean Twilight|
|16|016 intro2|Intro 2|
|17|017 cobalt|Cobalt|
|18|018 mitologia|Mitologia|
|19|019 morning breeze|Morning Breeze|
|20|020 morning breeze(sunny day)|Morning Breeze(Sunny Day)|
|21|021 PSML047|PSML047|
|22|022 Pyramid-naibu|Pyramid|
|23|023 mysterious-forest|Mysterious Forest|
|24|024 PSML514|PSML514|
|25|025 nodokana mura|Nodokana Mura|
|26|026 kokyo|Kokyo|
|27|027 fun game|Mayonakano Omochabako|
|28|028 kagayaku tsuki|Kagayaku Tsuki|
|29|029 MapBGM|Map BGM|
|30|030 a moment in the morning|A Moment In The Morning|
|31|031 SBGMv2_05|SBGM 5|
|32|032 daybreak|Daybreak|
|33|033 hoshi to tsuki|Hoshi To Tsuki No Oka|
|34|034 ep2|Epilogue 2|
|35|035 nibiiro no sora|Nibiiro No Sora|
|36|036 oita kataribe|Oita Kataribe|
|37|037 kaerimichi piano|Kaerimichi(Piano)|
|38|038 mori|Mori|
|39|039 raina|Raina|
|40|040 laid back guitars|Laid Back Guitars|
|41|041 earlgrey|Earlgrey Guitar|
|42|042 mayonakano-park|Mayonakano Park|
|43|043 Along-the-riverside-road|Along the riverside road|
|44|044 heya_guitar 1|Heya Guitar|
|45|045 Sancho_Panza 1|Sancho Panza|
|46|046 dwarf|Dwarf|
|47|047 nonbiri dwarf|Nonbiri Dwarf|
|48|048 nazoooki shinden|Nazoooki Shinden|
|49|049 kamigamiga nemuru basho|Kamigamiga Nemuru Basho|
|50|050 title|Title|
|51|051 yuki|Yuki|
|52|052 dark theme|Fear 2|
|53|053 hoard|Hoard|
|54|054 The House of Leaves|The House of Leaves|
|55|055 BGM_0 sirube-2|Sirube|
|56|056 orc01|Orc01|
|57|057 Village|Mearas Village 2|
|58|058 PSML060|PSML060|
|59|059 tyris4|Tyris 4|
|60|060 mayoimichi|Mayoimichi|
|61|061 hyousetsu|Hyousetsu|
|62|062 workshop|Mearas Workshop|
|63|063 shop|Shop|
|64|064 Town|Mearas Town|
|65|065 soaring|Soaring|
|66|066 soraochi|Soraochiruhi|
|67|067 Wizartorium|Wizartorium|
|68|068 gray|Gray|
|69|069 escape|Escape|
|70|070 arifureta shiawase|Arifureta Shiawase|
|71|071 Taikutsu|Taikutsu|
|72|072 Netherworld_Shanty|Netherworld Shanty|
|73|073 tabinohajime|Tabino Hajime|
|74|074 gag|Gag|
|75|075 happy|Mearas Happy|
|76|076 village|Mearas Village 3|
|77|077 dragon and toast|Dragon and Toast|
|78|078 legend of one|Legend of One|
|79|079 koudou|Koudou|
|80|080 big mojo|Big Mojo|
|81|081 exotics|Exotics|
|82|082 magic city|Mearas Magic City|
|83|083 gothic|Gothic|
|84|084 field|Field|
|85|085 PSML0515|PSML515|
|86|086 anosora|Anosorano Mukouni|
|87|087 memory|Memory|
|88|088 memory 2|Memory 2|
|89|089 semi yuugata|Semi. Yuugata.|
|90|090 hirusagari|Hirusagari Kibun|
|91|091 nichiyo|Nichiyo No Gogo|
|92|092 itazura|Itazura Kids|
|93|093 cat life|Cat Life|
|94|094 ensolarado|Ensolarado|
|95|095 BGM3 11|BGM3-11|
|96|096 BGM3 7var|BGM3-7 Var|
|97|097 BGM3 11var 1|BGM3-11 Var|
|98|098 Pixel Myth|Pixel Myth|
|99|099 Tsukitowatashi|Tsukito Watashi|
|100|100 Tsukino Kobune|Tsukino Kobune|
|101|101 flashback|Flashback|
|102|102 punipuni|Punipunichuiho|
|103|103 sabaku|Sabakuwo Iku|
|104|104 butou|Butoukai|
|105|105 anime OP|Elin OP|
|106|106 anime ED|Elin ED|
|107|107 BGM3-1 1|BGM3-1|
|108|108 wafu|Wafu|
|109|109 Into Legend|And Thus Into Legend|
|110|110 defender|Defender|
|111|111 snow forest|Snow Forest|
|112|112 hirahira|Hirahira|
|113|113 luna|Luna|
|114|114 orc05|Orchestra 5|
|115|115 xmas|Holy Night|
|116|116 xmas 2|Jingle Bell|
|117|117 atonement|Shokuzai No Mori|
:::

### 新しいBGMの追加

カスタムBGMは **Sound/BGM** サブフォルダーに配置されます。カスタム音效とは異なり、メタデータJSONの `id` フィールドを手動で編集する必要があります。CWLがファイルを生成できるように、最初にゲームを一度起動してください。

CWLは、ElinのUnityバージョン（2021.3.34f1）で使用されているデコーダーがMP3デコードエラーを起こしやすいため、**ogg**または**wav**形式の使用をお勧めします。

![](../../assets/new_bgm.png)

`id` は任意のユニークな数字で、ゲームで最後に使用されたBGM ID（`117`）より大きく、衝突を避けるために十分ユニークである必要があります。

**重要な注意事項、** この `id` はBGM専用です。音效のIDは拡張子なしのファイル名のままです。

既存の `id` をBGMに割り当てると、それはグローバルBGMの置き換えになります。例えば、`Adventure-YOASOBI.json` の曲メタデータに `56` を割り当てると、ゲーム内のBGM `056 orc01` は `Adventure-YOASOBI` に置き換えられます。これが、新しいBGM（置き換え音楽ではない）がユニークな `id` を使用する理由です。そうでないと、次に同じ `id` を持つBGMがあなたの音楽を置き換えてしまいます。

> `056 orc01` はタイトルメニューのBGMです。

### プレイリストの追加

あなたのプレイリストファイルは **Sound/BGM/Playlist** サブフォルダーに配置されます。これらはシンプルなJSONファイルの形式です。 
```json
{
    "shuffle": true,
    "list": [
        "megalovania"
    ],
    "remove": [
        "024 PSML514",
        "023 mysterious-forest"
    ]
}
```

`list` に含まれるオーディオID（**BGM IDではありません**）はプレイリストに追加され、`remove` はプレイリストからエントリーを削除します（存在する場合）。既存のゲームオーディオIDを使用することもできます。`shuffle` はそのリストがランダムに並べ替えられるかどうかを設定します。

あなたは `list` と `remove` リストでワイルドカードを使用することもできます。現在、2つのモードが提供されています：
```json
"remove": [
	"**"
]
```
これは、マージ前にすべてのトラックをクリアします。

```json
"remove": [
	"<dir>/*"
]
```
これは、マージ前に **`Sound/BGM/<dir>/`** フォルダーからのすべてのトラックをクリアします。

### プレイリストタイプ

プレイリストのJSONファイル名は、以下のいずれかと一致する必要があります：

+ `"Global"`
+ 既存のプレイリスト名
+ 地域タイプ名

ここにゲーム内で既に存在するプレイリストがあります：
::: details プレイリスト
+ Battle               [1]
	+ 054 The House of Leaves
+ Blank                [4]
	+ 041 earlgrey
	+ 090 hirusagari
	+ 044 heya_guitar 1
	+ 043 Along-the-riverside-road
+ Day                  [1]
	+ 004 hoshinokiseki        
+ Dungeon              [4]
	+ 024 PSML514                             
	+ 022 Pyramid-naibu     
	+ 023 mysterious-forest   
	+ 048 nazoooki shinden        
+ Dungeon2             [6]
	+ 072 Netherworld_Shanty       
	+ 077 dragon and toast                   
	+ 078 legend of one                        
	+ 079 koudou                            
	+ 080 big mojo                          
	+ 081 exotics     
+ Dungeon_Boss         [1]
	+ 098 Pixel Myth  
+ EloMap               [3]
	+ 006 elomap2      
	+ 007 elomap3      
	+ 059 tyris4      
+ Festival_Noyel       [1]
	+ 051 yuki  
+ Festival_Olvina      [1]
	+ 051 yuki 
+ Festival_Yowyn       [1]
	+ 093 cat life      
+ Field                [1]
	+ 015 Atlantean_Twilight256 
+ Hoard                [1]
	+ 053 hoard                               
+ Lot                  [1]
	+ 061 hyousetsu                           
+ Night                [2]
	+ 005 elomap1                             
	+ 004 hoshinokiseki                       
+ Underground          [2]
	+ 046 dwarf                                
	+ 047 nonbiri dwarf                        
:::

`Blank` は、明示的に指定されたプレイリストがないすべてのZoneのデフォルトプレイリストです。

Zoneタイプ名とそのプレイリストを確認してください：
<LinkCard t="SourceZone" u="https://docs.google.com/spreadsheets/d/16-LkHtVqjuN9U0rripjBn-nYwyqqSGg_/edit?gid=2144211469#gid=2144211469" />

![](../../assets/zone_type.png)

### 全局カバレッジ

`Global`という特別なプレイリストを準備することができ、これはすべてのプレイリストに統合されます。

### 指定プレイリスト

例えば、すべてのダンジョンエリア（`Zone_RandomDungeon`、`Zone_RandomDungeonFactory`、`Zone_Mine`など）は、`Dungeon`という名前のプレイリストを共有しています。このプレイリストに曲を追加または削除したい場合は、**Sound/BGM/Playlist/**フォルダー内に`Dungeon.json`を準備する必要があります。

![](../../assets/playlists.png)

`Dungeon.json`内の変更は、ゲームの`Dungeon`プレイリストに統合され、曲の追加や削除が行われます。これは、このプレイリストを共有するすべてのエリアに影響します。

もう一つの一般的なユースケースは、大マップにいるときに曲を追加することです。大マップはエリアタイプ`Region`で、プレイリスト`EloMap`があります。

### エリアカバレッジ

プレイリストの統合に加えて、各エリアタイプに対してエリアカバレッジを指定することもできます。これらのプレイリストはエリアタイプ名を使用し、その内容はエリアのデフォルトプレイリストに統合されます（表に指定がない場合は`Blank`）。

したがって、`EloMap.json`の代わりに`Region.json`を使用して大マップのプレイリストに曲を追加することもできます。

### マージ順序

3種類のプレイリストは同時に存在でき、それらは全局カバレッジ、指定プレイリスト、エリアカバレッジの順に統合されます。重複する曲は削除されます。プレイリストの統合順序はModの読み込み順序にも影響されます。`remove`リストでワイルドカードを使用する際には、プレイリストの統合順序が曲に影響を与えることを忘れないでください。

### ホットリロード/BGM ビュー

CWL は、プレイリストをより簡単に編集できるように、ゲーム内のコンソールコマンドのセットを提供します。セーブデータをロードした後、コンソールを開き `cwl.bgm.view` を使用して現在のZoneのプレイリストと曲を表示します。

![](../../assets/cwl_bgm_view.png)

また、`cwl.bgm.next`、`cwl.bgm.last`、`cwl.bgm.shuffle` を使用してプレイリストをテストすることもできます。プレイリストの効果に満足したら、`cwl.bgm.hide` を使用してポップアップウィンドウを閉じてください。

ゲームが実行中にプレイリスト JSON を編集した後、`cwl.bgm.rebuild` を使用してすべてのプレイリストをホットリロードできます。CWL には新しいオーディオのホットリロード用のコマンドがありますが、インデックスの問題が発生する可能性があるため、使用は推奨されません。

### 最後の例
大マップ探索のすべてのデフォルト曲を削除し、新しい曲を追加したい場合は、`Sound/BGM/Playlist/EloMap.json` または `Sound/BGM/Playlist/Region.json` を使用します：
```json
{
    "shuffle": true,
    "list": [
        "my new BGM sound id1",
        "my new BGM sound id2"
    ],
    "remove": [
        "**"
    ]
}
```