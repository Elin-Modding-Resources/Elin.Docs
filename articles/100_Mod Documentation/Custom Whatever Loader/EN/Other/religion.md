---
title: Custom Religion
date: 2025/1/3 01:00
hide: true
---

## Custom Religion

Custom Whatever Loader can import the Religion source sheet and patch it into the game. However, your custom religion ID must begin with **cwl_**, for example: **cwl_spaghettigod**.

By default the religion is **joinable** and **not minor**. You can append optional tags to the ID:
- To make it a minor god, append **#minor**
- To make it unjoinable, append **#cannot**

For example: **cwl_spaghettigod#minor#cannot** will make it a minor god religion and unjoinable. However, do note that the actual ID of your religion is still **cwl_spaghettigod**, the tags will be removed upon importing.

Custom Whatever Loader will merge your custom **god_talk.xlsx** into base game, this is necessary for the religion to function. You may reference the base game sheet at **Elin/Package/_Elona/Lang/EN/Data/god_talk.xlsx**.

![img](https://i.postimg.cc/P5V71tTq/image.png)

Your custom **god_talk.xlsx** should only contain the talks of your own religion ID, and be placed under **LangMod/*/Data** folder.

To create an optional custom portrait for your religion, put a **.png** image in the **Texture** folder using the same religion ID as the file name, such as **cwl_spaghettigod.png**.
