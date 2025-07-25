---
title: Config 配置
date: 2025/1/3 01:00
hide: true
---

The configuration file is located at:  
配置文件位置:  
配置ファイルの位置:  
`Elin/BepInEx/config/dk.elinplugins.customdialogloader.cfg`  

### Logging.Verbose = false
Verbose information that may be helpful(spamming) for debugging  
Debug用的信息输出  
デバッグ用の詳細情報を出力(大量ログ発生の可能性あり)  

### Logging.Execution = true
Measure the extra loading time added by CWL, this is displayed in Player.log  
记录CWL运行时间  
CWLの実行時間を記録  

### BGM.SeamlessStreaming = true
When switching to a new playlist, if current playing BGM is included in the new playlist, seamlessly stream it  
当切换播放列表时，如果当前播放的曲目在新播放列表中，则尝试无缝衔接  
再生リスト切り替え時に、現在再生中の曲が新しいリストに含まれる場合、シームレスな継続再生を試行  

### Caching.Talks = true
Cache GetDialog/HasTopic talks instead of loading & building map everytime  
缓存GetDialog/HasTopic构建的对话文本表而不是每次都重新加载+构建  
GetDialog/HasTopicを使用して構築された対話テキスト表を毎回再読み込みして構築するのではなく、キャッシュを利用する  

### Caching.Types = true
Cache ClassCache types early instead of roundtrip lookup & querying all assemblies  
提前ClassCache的类缓存优先级而不是每次重新搜索  
クラスキャッシュ（ClassCache）のクラスキャッシュの優先度を前もって設定し、毎回再検索するのではなくします  

### Caching.Paths = true
Cache paths relocated by CWL instead of iterating new paths  
缓存CWL重定向的路径而不是每次重新搜索  
CWLで再配置されたパスをキャッシュし、毎回の再検索を省略  

### Caching.Sprites = true
Cache sprites created by CWL instead of creating new from textures  
缓存CWL生成的贴图而不是每次重新构建  
CWLで生成した画像を毎回再構築せずキャッシュ  

### Dialog.ExpandedActions = true
Expand the actions table for drama sheets for mod authors to utilize  
为剧情表启用action拓展，Mod作者能够利用更多功能设计剧情表  
台本シートのアクションテーブルを拡張し、MOD作者が追加機能を利用可能に  

### Dialog.ExpandedActionsAllowExternal = true
Allow invoking external methods from other assemblies within the drama sheet, this may be unstable  
为剧情表启用action拓展时同时允许调用外部程序集的方法，这可能不稳定  
アクション拡張時に外部アセンブリのメソッド呼び出しを許可(不安定性あり)  

### Dialog.NoOverlappingSounds = true
During dialogs, prevent sound actions from overlapping with each other by stopping previous sound first  
对话中的sound动作不会彼此重叠 - 上一个音源会先被停止  
会話中のsoundアクションが重複しないように、前回音源を停止してから再生  

### Dialog.VariableQuote = true
For talk texts, allow both JP quote `「」` and EN quote `""` with current language quote to be used as `Msg.colors.Talk` identifier  
对话文本允许日语引号和英语引号以及当前语言的引号同时作为Talk颜色检测词  
台本テキストで日本語括弧「」と英語引用符""、および現在言語の引用符を`Msg.colors.Talk`識別子として共用可能に  

### Exceptions.Analyze = true
Analyze the unhandled exception during gameplay and log the results  
分析游戏运行时抛出的异常  
ゲーム実行時に発生した例外を分析記録  

### Exceptions.Popup = true
Display a popup for the analyzed unhandled exception  
在游戏中显示运行时抛出的异常  
ゲーム画面に解析済み例外のポップアップを表示  

### Patches.FixBaseGameAvatar = true
When repositioning custom character icons, let CWL fix base game characters too  
E.g. fairy icons are usually clipping through upper border  
在重新调整自定义角色头像位置时，让CWL也修复游戏本体角色头像位置。例如，妖精角色的头像通常会超出边界  
カスタムキャラクターアイコン位置調整時、本体キャラクターの位置も修正(例：妖精アイコンが境界を超える問題)  

### Patches.FixBaseGamePopup = true
When repositioning custom character pop ups, let CWL fix base game characters too  
E.g. using custom skins will result the speech bubble and emote icons shown way above their heads  
在重新调整自定义角色气泡位置时，让CWL也修复游戏本体角色气泡位置。例如，更改贴图皮肤的角色的气泡框会显示的很高  
カスタムキャラクター吹き出し位置調整時、本体キャラクターの位置も修正(例：スキン変更時の吹き出し位置ズレ)  

### Patches.QualifyTypeName = true
When importing custom classes for class cache, let CWL qualify its type name  
`Element`, `BaseCondition`, `Trait`, `Zone`, `Quest`  
当为类缓存导入自定义类时，让CWL为其生成限定类型名  
クラスキャッシュへのカスタムクラスインポート時、CWLに完全修飾型名を生成させる  

### Patches.SafeCreateClass = true
When custom classes fail to create from save, let CWL replace it with a safety cone and keep the game going  
当自定义类无法加载时，让CWL将其替换为安全锥以保持游戏进行  
カスタムクラスのロード失敗時、安全コーンで代替してゲームを継続  

### Source.AllowProcessors = true
Allow CWL to run pre/post processors for workbook, sheet, and cells.  
允许CWL为工作簿、工作表、单元格执行预/后处理  
ワークブック・ワークシート・セルに対する前処理/後処理の実行を許可  

### Source.NamedImport = true
When importing incompatible source sheets, try importing via column name instead of order  
当导入可能不兼容的源表时，允许CWL使用列名代替列序导入  
互換性のないソースシートインポート時、列番号ではなく列名を使用したインポートを許可  

### Source.OverrideSameId = true
When importing rows with an existing ID, replace it instead of adding duplicate rows  
当导入重复ID的单元行时，覆盖旧行而不是添加新行  
重複IDの行をインポート時、新規追加せず既存行を上書き  

### Source.RethrowException = true
Rethrow the excel exception as SourceParseException with more details attached  
当捕获Excel解析异常时，生成当前单元格详细信息并重抛为SourceParseException  
Excel解析例外発生時、セル詳細情報を付加したSourceParseExceptionとして再送出  

### Source.SheetInspection = true
When importing incompatible source sheets, dump headers for debugging purposes  
当导入可能不兼容的源表时，吐出该表的详细信息  
互換性のないソースシートインポート時、デバッグ用に詳細情報を出力  

### Source.SheetMigrate = false
(Experimental, disabled due to frequent game update)  
When importing incompatible source sheets, generate migrated file in the same directory  
(实验性, 游戏更新频繁暂时禁用)  
当导入可能不兼容的源表时，在同一目录生成当前版本的升级表  
(実験的機能、ゲーム更新頻度により一時的に無効化)  
互換性のないソースシートインポート時、同ディレクトリに移行済みファイルを生成  

### Source.TrimSpaces = true
Trim all leading and trailing spaces from cell value  
Requires Source.AllowProcessors set to true  
移除单元格数据的前后空格文本，需要允许执行单元格后处理  
セルデータの前後空白文字を削除(セル後処理の実行許可が必要)  
