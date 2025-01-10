---
title: カスタム信仰
date: 2025/1/3 01:00
hide: true
---

## カスタム信仰

随便ロードは、あなたのカスタム信仰表（表名: Religion）をインポートし、ゲームに追加することができます。ただし、あなたのカスタム信仰IDは **cwl_** で始まる必要があります。例えば：**cwl_spaghettigod**。

デフォルトでは、この信仰は参加可能であり、弱神ではありません。また、IDにオプションのタグを追加することもできます：
- 弱神に設定するには、**#minor** を追加します。
- 参加不可にするには、**#cannot** を追加します。

例えば：**cwl_spaghettigod#minor#cannot** は、弱神の信仰として設定され、参加できなくなります。しかし、あなたの信仰の実際のIDは依然として **cwl_spaghettigod** であり、インポート時にタグは削除されます。

随便ロードは、あなたのカスタム **god_talk.xlsx** をゲームに統合します。このファイルは必須です。ゲームの表を参照できます。パスは **Elin/Package/_Elona/Lang/JP/Data/god_talk.xlsx** です。

![img](https://i.postimg.cc/P5V71tTq/image.png)

あなたのカスタム **god_talk.xlsx** には、自分の信仰IDの対話のみを含めるべきです，**LangMod/*/Data** フォルダーに置いてください。

あなたの信仰のためにオプションのカスタム肖像を作成するには、**.png** 画像を **Texture** フォルダに入れ、信仰IDと同じファイル名を使用します。例えば **cwl_spaghettigod.png** です。