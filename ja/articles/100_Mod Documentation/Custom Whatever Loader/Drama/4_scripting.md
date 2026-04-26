---
title: スクリプト
author: DK
date: 2026/4/19 17:00
hide: true
---

## ドラマスクリプト

剧情表内で `eval` アクションを使用すると、**C#コード**を直接実行できます。

通常のCWLと同等のスクリプト機能を提供しますが、以下の点が異なります：

- スクリプトの状態は現在のドラマインスタンスに紐付けられます（ドラマ終了まで保持され、終了後に自動リセット）。
- ショートカット：`dm` = `DramaManager`、`line` = 現在の行（`Dictionary<string, string>`）、`tg` = 対象 `Chara`、`pc` = プレイヤー `Chara`。

![](./assets/drama_eval.png)

**戻り値の挙動：**
- `bool`型を返し、有効な `jump` 先が指定されている → ジャンプを実行するかどうかを決定。
- `string`型を返し、`jump` セルが `eval_result` に設定されている → その文字列を新しいジャンプ先として使用。
- 戻り値なし → 通常のアクションとして実行。

同じフォルダからスクリプトファイルをインポートするには：`<<<script_snippet.cs`

## 変数の受け渡し

共有の `Script` 辞書を使用します：

```cs
// 最初のeval
var value = EClass.rnd(100) * 5;
Script["random_value"] = value;

// 後続のeval
var value = (int)Script["random_value"];
```

## よく使う例

| 機能                    | コード                                                |
|-------------------------|-------------------------------------------------------|
| 指定ステップへジャンプ  | `DramaExpansion.Goto("my_new_step");`                |
| 「話そうぜ！」選択肢追加 | `DramaExpansion.InjectUniqueRumor();`                |
| 一時会話追加            | `DramaExpansion.AddTempTalk("topic", "actor", "jump");` |
| Charaインスタンス取得   | `var chara = dm.GetChara("tg");`                      |
| パーティに勧誘          | `chara.MakeAlly();`                                   |
| レベル変更              | `chara.SetLv(chara.LV + 5);`                          |

ご質問がある場合は、Elona Discordの **@freshcloth** または [メール](mailto:dk@elin-modding.net) までお気軽にご連絡ください。
