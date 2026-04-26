---
title: Translation
author: DK
description: How to provide translations for your source sheets
date: 2026/4/8 00:00
tags: SourceSheet/Localization
---

# Source Sheet Translation

Source sheets by default contain translatable columns for English and Japanese, such as `name` and `name_JP`, `aka` and `aka_JP`.

These entries are provided in the `EN` or `JP` folders.

## Adding Translations for Other Languages

To add translations for languages other than English and Japanese:

1. Switch the game to the desired language.
2. Restart the game to export the translatable entries.

You should now see a `SourceLocalization.json` file in your mod's `LangMod/XX` folder, where `XX` is the current language code (e.g., `CN` for Simplified Chinese).

Edit this file to provide your translations.

## Providing Translations for Other Mods

If you want to provide translations for other mods:

1. Copy the other mod to your local `Package` folder.
2. Start the game in the language you wish to support.

You should then be able to edit the `SourceLocalization.json` file in that mod's folder. When you are done editing:

- Send this file to the mod author, or
- Publish a new mod on the Workshop containing only this translation file in the correct folder structure.