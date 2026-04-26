---
title: Material 材质
date: 2025/1/3 01:00
hide: true
---

## 自定义材质

假设你已经在Material表中定义好了你的自定义材质，默认情况下游戏会因为缺失材质颜色而无法加载自定义材质。

使用 CWL 时，你可以通过标签设定自定义颜色。

在你的材质行 **tag** 单元格中, 使用 **addCol_Main(color_hex)** 和 **addCol_Alt(color_hex)** 来定义材质的主色和副色。颜色采用十六进制格式，并且必须包含透明度(RGBA)，形成一个 8 位数字。

例如： **addCol_Main(a38737ff),addCol_Alt(a38737ff)**

![img](https://i.postimg.cc/QxRmp0ZY/image.png)

颜色十六进制字符串不区分大小写，且 **不以** **#** 或 **0x** 开头。
