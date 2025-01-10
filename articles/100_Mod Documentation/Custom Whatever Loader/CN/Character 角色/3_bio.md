---
title: 传记与背景
date: 2025/1/3 01:00
hide: true
---

## 自定义传记

为了为你的角色增添更多风味，你可以使用标签 `addBio_CharaId` 来指定自定义传记。传记文件是一份 JSON 文件，存放在你的 `LangMod/**/Data/` 文件夹中，名称为 `bio_CharaId.json`，例如，如果你有一个自定义角色，其 ID 为 `example_chara`，那么你应该在 `LangMod/EN/Data/`、`LangMod/CN/Data/` 等其他语言子文件夹中有一个文件 `bio_example_chara.json`。
```json
{
    "Birthday": 11,
    "Birthmonth": 4,
    "Birthyear": 514,
    "Birthplace": "地球",
    "Birthplace_JP": "地球",
    "Birthlocation": "咩咩村",
    "Birthlocation_JP": "咩咩村",
    "Mom": "最棒的母亲@母上大人",
    "Mom_JP": "最棒的母亲",
    "Dad": "最棒的爹地",
    "Dad_JP": "最棒的爹地",
    "Background": "在这普通的一天\n我穿着普通的鞋\n很普通地走在这普通的街\n掏出普通的耳机\n找点普通的感觉\n来一首我最爱的普通音乐\n普通的disco我们普通的摇",
    "Background_JP": "在这普通的一天\n我穿着普通的鞋\n很普通地走在这普通的街\n掏出普通的耳机\n找点普通的感觉\n来一首我最爱的普通音乐\n普通的disco我们普通的摇"
}
```

`Mom` 和 `Dad` 对应的母亲和父亲条目可以用`@`符号覆写掉，比如`母亲 最棒的母亲`将会显示为`母上大人 最棒的母亲`。

带有 `_JP` 的条目用于日语本地化，这样就不用单独准备一份 `LangMod/JP/` 资源了。
