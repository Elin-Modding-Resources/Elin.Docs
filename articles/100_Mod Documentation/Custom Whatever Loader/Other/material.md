---
title: Custom Material
date: 2025/1/3 01:00
hide: true
---

## Import Custom Material

Assumes you already have a material row defined in your Material sheet, by default game will not be able to load custom materials due to no color mapping.

With CWL, you can add custom color for custom material via tagging.

In the tag column of your material row, use **addCol_Main(color_hex)** and **addCol_Alt(color_hex)** to define the main and alt color of your material. The color is in hex format and must include alpha too(RGBA), which forms an 8 bit number.

For example: **addCol_Main(ffff00ff),addCol_Alt(ff0000ff)**

![img](https://i.postimg.cc/QxRmp0ZY/image.png)

The color hex string is case insensitive, and **does not** begin with **#** or **0x**.
