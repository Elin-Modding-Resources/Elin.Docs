---
title: New Sound
description: Add new sounds from file
date: 2025/1/3 01:00
hide: true
---

## Custom Sound

Sound files should be in one of **acc**, **mp3**, **ogg**, **wav** formats, with the filename serving as the sound ID. A default metadata JSON is generated upon **using the sound**, allowing you to edit and apply sound file metadata on the next game launch.

By setting **"type"**: **"BGM"** in the metadata, the sound file will be instantiated as **BGMData** instead of **SoundData**. You can also customize the BGM parts in the metadata.

Subdirectories in the **Sound** folder will serve as ID prefixes. For example, **AI_PlayMusic** will use **Instrument/sound_id**, so you should place the sound file in the `Instrument` folder if you plan to replace instrument sounds.

**You can override existing in-game sounds using the same ID**. For example, chicken uses sound ID **Animal/Chicken/chicken**, if you want to replace this sound, you should put your sound file named **chicken** with one of the supported formats, in **Sound/Animal/Chicken/** folder.

Sounds can be used in the game via sound ID.

![](./assets/clown_horn.png)
```cs
pc.PlaySound("clown_horn"); // <- Card.PlaySound
SE.PlaySound("clown_horn");
```
