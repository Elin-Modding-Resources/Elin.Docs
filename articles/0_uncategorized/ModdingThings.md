---
title: Elin Modding Improvements
date: 2025/12/9 05:00
hide: true
---

# Elin Modding Improvements

The ideas below are collected from the Elin-Modding Discord channel and the Chinese Elin modding community. Many of them are inspired by or directly borrowed from the mod *Custom Whatever Loader* (CWL).

**CWL References**  
- [CWL Wiki](https://elin-modding.net/articles/100_Mod%20Documentation/Custom%20Whatever%20Loader/EN/0_README)  
- [CWL on Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=3370512305)  
- [CWL Source on GitHub](https://github.com/gottyduke/Elin.Plugins/tree/master/CustomWhateverLoader)

## Mod Localization

Currently, most moddable data only supports `_JP` and `_EN` entries.

**Proposal:** Adopt CWL's `LangMod/**/` folder structure along with its path-relocation system to enable true multilingual support for mod resources.

This approach is not perfect, but it avoids modifying existing Elin data structures, preserving backward compatibility.

Suggested mod package layout:

```
📦 Mod Package
├── 📂 LangMod
│   ├── 📂 EN
│   │   ├── 📂 Data
│   │   │   └── 📘 Data Files, JSON configurations
│   │   ├── 📂 Dialog
│   │   │   ├── 📂 Drama
│   │   │   │   └── 📗 drama_example.xlsx
│   │   │   ├── 📗 dialog.xlsx
│   │   │   └── 📗 god_talk.xlsx
│   │   └── 📗 ModSources.xlsx
│   ├── 📂 CN
│   ├── 📂 JP (Can be omitted)
│   ├── 📂 ZHTW (Can be omitted)
│   └── 📂 KR/RU/ES (Other Langs)
├── 📂 Sound
│   ├── 📂 BGM
│   │   └── 🎵 bgm_xxx.mp3/ogg/wav
│   └── 🎵 new_sound.mp3/ogg/wav
├── 📄 package.xml
└── 🖼 preview.jpg
```

## Source Sheet Loading

The most used used CWL feature is loading mod source workbooks without requiring a compiled DLL.

The `ModUtil.ImportExcel` loads only one sheet at a time, which becomes slow when a mod contains many sheets (unless every sheet is split into separate files). CWL instead iterates all sheets automatically and imports them into the correct `SourceData` collection (`Chara`, `Thing`, `Job`, `Race`, etc.) based on sheet name.

**Proposal:** Add native support for automatically importing mod-provided source Excel workbooks.

**Optional:** Implement SourceData caching (as done in CWL): after the first parse, store the processed data as JSON blobs keyed by file hash/last-modified timestamp. This dramatically improves load times because most mods rarely update after publishing.

### Character Spawning

CWL includes an system that spawns modded characters in the world or as adventurers based on tags. While popular, the current implementation is not considered stable enough for official adoption without some rework.

## Dialog and Drama Systems

### Dialog (Let's Talk!)

CWL merges each mod's `dialog.xlsx` into the game's `Lang.excelDialog`, allowing modded characters to have their own random lines using the same format.

**Proposal:** Natively support loading per-mod `dialog.xlsx` files for modded characters.

### Drama Sheet Loading

Elin hard-codes drama sheet lookup to `CorePath.DramaData`. CWL patches this to use its path-relocation system, enabling mods to supply their own drama sheets.

**Proposal:**  
- Allow drama sheets to be loaded from the appropriate `LangMod/**/Dialog/Drama/` folder.  
- Extend the existing `Load` method to accept full file paths so scripts can load drama sheets at runtime.

### Drama Text Localization

For very long drama sheets, maintaining separate language folders becomes cumbersome. CWL therefore supports optional `text_XX` columns (e.g., `text_EN`, `text_CN`, `text_ZHTW`) directly inside the drama sheet.

**Proposal:** Modify `ParseLine` to also look for the `text_XX` column matching the current `LangCode`.

### Drama Invoke Actions

CWL introduces a lightweight DSL-style `invoke*` action system (similar to `DramaOutcome`) that calls external C# methods. Many mod authors find this extremely useful and some also register their own methods via reflection.

**Proposal:** Provide an API for script DLLs to register custom drama invoke handlers.

## Game Events / Hook System

Most script-DLL functionality today relies on Harmony patches. These patches are fragile: any change to method signatures or mod conflicts can break mods or causes undefined behaviours.

**Proposal:** Introduce an official event-dispatcher system for commonly requested events (examples: `OnPickupItem`, `OnCharaDie`, `OnMoveZone`, `OnDamageCalculated`, etc.). Mods would simply subscribe to these events instead of patching methods just to get a callback.

This would not eliminate the need for Harmony entirely but would drastically reduce its use for simple event triggers.

## Sound & BGM

**Proposal:**  
- Automatically load sound effect and BGM files placed in a mod's `Sound/` folder.  
- Provide a simple `SoundData` configuration file so modders can define clip names, volume, pitch, looping behavior, etc.

**Optional:** Support custom BGM playlists (with scene/zone overrides). This is entirely optional because there are a lot of hard-coded BGM switches in Elin.

## Custom Effects

Creating new effects can be done using Unity AssetBundle, which is overly complex for simple sprite-based effects.

**Proposal:** Add runtime effect creation similar to `SpriteAnimation` and CWL's implementation: automatically slice provided sprite sheets into frames and generate `Effect` objects that mods can reference by id.

## UI & Widgets

Creating new UI & Widgets right now can only be done with a lot of runtime patching or importing Unity AssetBundle to generate a Layer or new Widget.

**Suggestion:** I'm not sure if this feature is entirely needed, because there are mods providing similar functionality (YKFramework for Layer creations).

## Exception Reporting (Optional)

CWL displays a detailed error popup that lists the full stack trace and highlights which Harmony patches (and therefore which mods) are involved. This is invaluable for debugging but may confuse or disturb non-modding players.

**Suggestion:** Include this feature as an opt-in dev mode or enable it only when mods are detected.
