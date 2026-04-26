---
title: 音声
date: 2025/1/3 01:00
hide: true
---

## 音声

オーディオファイルは **acc**、**mp3**、**ogg**、**wav** 形式で、ファイル名がオーディオIDとして使用されます。音声を使用すると、デフォルトの同名メタデータJSONが生成され、編集して次回ゲーム起動時に音声ファイルのメタデータを適用することができます。

メタデータで"type": "BGM"を設定すると、オーディオは**BGMData**としてではなく**SoundData**としてインスタンス化されます。また、メタデータ内でBGMの小節部分をカスタマイズすることもできます。

**同じIDを使用して、既存のゲーム内音声を上書きすることができます**。例えば、ひよこの鳴き声はID **Animal/Chicken/chicken**を使用しているので、**Sound/Animal/Chicken/**フォルダーに**chicken**という名前の音声ファイルを用意して上書きすることができます。

**Sound**フォルダー内のサブディレクトリはオーディオIDのプレフィックスとして使用されます。たとえば、`AI_PlayMusic`は`Instrument/sound_id`を使用するため、楽器音楽を置き換える場合は、同名のオーディオファイルを`Instrument`フォルダーに配置してください。

例：
![](./assets/clown_horn.png)
```cs
pc.PlaySound("clown_horn"); // <- Card.PlaySound
SE.PlaySound("clown_horn");
```
---
