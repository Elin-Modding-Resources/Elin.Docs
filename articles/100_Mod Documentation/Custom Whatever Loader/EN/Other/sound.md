---
title: Custom Sound
date: 2025/1/3 01:00
hide: true
---

## Custom Sound

Sound files should be in one of **acc**, **mp3**, **ogg**, **wav** formats, with the filename serving as the sound ID. A default metadata JSON is generated upon loading, allowing you to edit and apply sound file metadata upon the next game launch. **You can override existing in-game sounds using the same ID**. 

By setting **"type"**: **"BGM"** in the metadata, the sound file will be instantiated as **BGMData** instead of **SoundData**. You can also customize the BGM parts in the metadata.

Subdirectories in the **Sound** folder will serve as ID prefixes. For example, `AI_PlayMusic` will use **Instrument/sound_id**, so you should place the sound file in the `Instrument` folder if you plan to replace instrument sounds.

Sounds loaded by CWL will be available to use anywhere in the game via sound id.

E.g.
```cs
pc.PlaySound(sound_id) // <- Card.PlaySound
SE.PlaySound(sound_id)
```