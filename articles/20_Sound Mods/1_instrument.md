---
title: Custom Instrument Tracks
description: Add or replace instrument tracks
date: 2025/1/3 01:00
hide: true
---

## Custom Instrument Tracks

First, prepare a sound file in the **Sound/Instrument** folder, with filename using one of the following Sound ID:
::: details In Game Instruments Sound ID
|Instrument ID|Sound ID|CN|EN|JP|
<!--@include: ./assets/instrument_id.md-->
:::

If you are making a **new** instrument, use instrument's ID (Thing ID) as Sound ID.

Launch the game once to generate a metadata json file for the newly added sound, exit game, edit the metadata json to use **type: BGM**, and add some parts for the instrument play:

::: details cello_prelude.json
<<< ./assets/cello_prelude.json
:::

Each part has a start timestamp and a duration in seconds. Parts will be randomly selected during instrument play.
