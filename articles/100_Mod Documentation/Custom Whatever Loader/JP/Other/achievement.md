---
title: カスタム実績システム
description: MODでカスタム実績を追加し、ゲーム内で使用する方法
date: 2026/2/17 15:00
author: DK
tags: Guide/CWL/C#
hide: true
---

::: warning
CWL 1.21.14 以降のバージョンが必要です。
:::

## 実績の定義

MODフォルダ内の `LangMod/**/Data/` に `achievement.json` という名前のJSONファイルを置くだけで、カスタム実績リストを追加できます。

ファイルの内容は `SerializableAchievement` の配列です：

```json
[
  {
    "Id": "mymod_achievement_1",
    "Name": "<color=green>MOD実績</color>",
    "Description": "やりましたね！"
  },
  {
    "Id": "mymod_achievement_2",
    "Name": "MOD実績 2",
    "Description": "またやりましたね！",
    "Prerequisites": [
      "mymod_achievement_1"
    ]
  },
  {
    "Id": "mymod_achievement_3",
    "Name": "MOD実績 3",
    "Description": "目標を達成しました！",
    "Prerequisites": [
      "mymod_achievement_2"
    ],
    "AutoUnlockProgress": 200
  }
]
```

上記では3つの実績テンプレートを定義しています：

- `mymod_achievement_1` → 最も基本的な即時解除タイプ
- `mymod_achievement_2` → 前提実績 `mymod_achievement_1` が解除済みである必要がある
- `mymod_achievement_3` → 前提実績 `mymod_achievement_2` ＋ 進捗が200以上で自動解除

コンソールコマンド `cwl.achievement.reimport` を使用すると、すべての実績定義ファイルをホットリロードできます。

### フィールド説明

|フィールド              |型          |必須|説明|
|-----------------------|------------|----|---------------------------------------------------|
|`Id`                   |`string`   |○  |実績の一意な識別子                                 |
|`Name`                 |`string`   |○  |UIポップアップに表示される名前（リッチテキスト可）   |
|`Description`          |`string?`  |×  |任意。タイトル下に表示される説明文                  |
|`Prerequisites`        |`string[]?`|×  |前提となる実績IDのリスト（すべて解除済みである必要）|
|`AutoUnlockProgress`   |`float?`   |×  |設定した場合、進捗 ≥ この値 かつ前提条件を満たすと自動解除|

### 実績アイコン

**Texture** フォルダにpng形式の画像を配置します。  
ファイル命名規則： `acv_ID.png` または `achievement_ID.png`

`ID` の部分は上で定義した実績のIdに置き換えます。

表示が最も綺麗になるよう、正方形の画像を推奨します。

## コードでの使用方法

実績テンプレートを定義した後、`CustomAchievement` APIを使って管理できます。

### CustomAchievementオブジェクトの取得（必須ではない）

```cs
var achievement = CustomAchievement.GetAchievement("mymod_achievement_1");
```

### 解除関連メソッド

#### 通常解除（前提条件・進捗をチェックします）

```cs
CustomAchievement.Unlock("mymod_achievement_1");
```

#### 強制解除（すべての条件を無視）

```cs
CustomAchievement.UnlockForce("mymod_achievement_1");
```

#### グローバル（永続）解除（セーブ間で共有）

```cs
CustomAchievement.UnlockPersistent("mymod_achievement_1");
```

永続解除した実績はセーブデータを変えても状態が保持されます。

### 進捗関連操作

`AutoUnlockProgress` が定義されている場合、進捗が条件を満たし、かつ前提実績がすべて解除済みだと自動で解除されます。

#### 進捗を設定

```cs
CustomAchievement.SetProgress("mymod_achievement_3", 150f);
```

#### 進捗を増減（プラスもマイナスも可）

```cs
CustomAchievement.ModProgress("mymod_achievement_3", -10f);
```

#### 現在の進捗を取得

```cs
float progress = CustomAchievement.GetProgress("mymod_achievement_3");
```

進捗 ≥ `AutoUnlockProgress` かつすべての前提実績が解除済みの場合、自動で解除処理が発動します。

### 実績のリセット

```cs
CustomAchievement.Reset("mymod_achievement_1");
```

以下の情報をすべてクリアします：

- `IsUnlocked` 状態
- 進捗値
- 解除時刻
- 永続フラグ（存在する場合）

## コンソールコマンド

すべて `cwl.achievement` 名前空間に属します。

|コマンド             |機能説明                             |
|---------------------|--------------------------------------|
|`add`                |実行時に新しい実績テンプレートを追加（主にテスト用）|
|`unlock`             |実績を解除（条件をチェック）          |
|`unlock_persistent`  |実績を解除＋永続化                   |
|`reset`              |実績をリセット                       |
|`set_progress`       |進捗値を設定                         |
|`get_progress`       |現在の進捗を確認                     |
|`reimport`           |すべての実績定義ファイルを再読み込み  |

例：
```
cwl.achievement.unlock mymod_achievement_1
```

## 解除条件の判定ロジック

実績が解除可能な状態になる条件：

```
IsPrerequisiteMet && IsProgressMet
```

- `IsPrerequisiteMet`：すべての前提実績が解除済み  
- `IsProgressMet`：進捗 ≥ `AutoUnlockProgress`（定義されている場合）

どちらか一方でも満たさない場合、通常の `Unlock()` は何も行いません（`force = true` を除く）。

## 実行時動的登録

JSONファイルを使わず、コードで直接実績を追加することも可能です：

```cs
CustomAchievement.AddAchievement(new SerializableAchievement {
    Id = "runtime_achievement",
    Name = "実行時実績",
    Description = "コードから作成された実績",
    Prerequisites = new[] { "mymod_achievement_1" },
    AutoUnlockProgress = 50f,
});
```

以上がカスタム実績システムの日本語訳となります。
```

必要に応じてさらに口語的な表現にしたり、特定の用語をゲームコミュニティの慣習に合わせたりできますので、追加の要望があれば教えてください！