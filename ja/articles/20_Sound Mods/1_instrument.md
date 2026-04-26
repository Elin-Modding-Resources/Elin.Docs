---
title: カスタム楽器音楽
description: Add or replace instrument tracks
date: 2025/1/3 01:00
hide: true
---

## カスタム楽器音楽

まず、**Sound/Instrument** フォルダー内にオーディオファイルを用意します。ファイル名には、以下のいずれかの**オーディオID**を使用してください。

**新しい**楽器を作成する場合は、その楽器の **ID**（Thing ID）をオーディオIDとして使用してください。

::: details ゲーム内楽器のオーディオID
|楽器ID|オーディオID|CN|EN|JP|
<!--@include: ./assets/instrument_id.md-->
:::

ゲームを一度起動して、新しく追加したオーディオファイルの**メタデータ json ファイル**を生成し、その後ゲームを終了します。このメタデータ json ファイルを編集し、**type** を **BGM** に設定し、楽器演奏用にいくつかの **parts**（断片）を追加します。

::: details cello_prelude.json
<<< ./assets/cello_prelude.json
:::

各 **part** には、**秒単位**の開始時間（**start**）と継続時間（**duration**）があります。楽器が演奏されている間、システムはこれらの断片をランダムに選択して再生します。
