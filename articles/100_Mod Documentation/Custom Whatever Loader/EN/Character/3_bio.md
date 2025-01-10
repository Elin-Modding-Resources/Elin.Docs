---
title: Biography
date: 2025/1/3 01:00
hide: true
---

## custom bio

To add more flavor to your character, you may use tag `addBio_CharaId` to define a custom biography. The bio file is (yet another) json file placed in your `LangMod/**/Data/` folder, with name `bio_CharaId.json`, for example, you have a custom character with id `example_chara`, you should have a file `bio_example_chara.json` in `LangMod/EN/Data/`, `LangMod/CN/Data/`, ...and other language sub folders.

Within the bio file, it's simply as follows:
```json
{
    "Birthday": 11,
    "Birthmonth": 4,
    "Birthyear": 514,
    "Birthplace": "Earth",
    "Birthplace_JP": "Earth",
    "Birthlocation": "Nihon",
    "Birthlocation_JP": "Nihon",
    "Mom": "Best Mom@Mommy",
    "Mom_JP": "Best Mom",
    "Dad": "Best Dad",
    "Dad_JP": "Best Dad",
    "Background": "An absolutely normal living been\nBut on ylva...",
    "Background_JP": "An absolutely normal living been\nBut on ylva..."
}
```

The entries for `Mom` and `Dad` can be overwritten with the `@` alias, for example, the `Mom Best Mom` will be displayed as `Mommy Best Mom`.

The `_JP` entries are for Japanese localization, so that you don't have to prepare a `LangMod/JP/` folder and resources.