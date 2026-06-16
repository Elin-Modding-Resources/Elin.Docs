---
title: Sam 的 _idRenderData 笔记
author: SamInJapan
description: _idRenderData 对控制物品在游戏中的放置至关重要。
date: 2024/12/20 22:00
tags: Texture/Color
---

# obj _idRenderData

制作自定义物品时，在 obj 后面使用 _idRenderData 字符串对控制物品在游戏中的放置方式至关重要。

以下是具有独特显示效果的 _idRenderData（截至 2024/12/20）及其显示示例。

术语说明：
+ **焦点列（Focus Column）：** 物品（放置时显示的亮色菱形）所放置的地面网格主列。
+ **焦点行（Focus Row）：** 物品所放置的地面网格主行。
+ **物体中心（obj center）：** 三条线组成的向下的箭头，表示物体在没有任何修饰符时默认放置在地面网格上的位置。
+ **裁剪行（Clipping Row）：** 地面网格中裁剪物品边缘的行，使物品看起来像是放在地面上。从放置位置向下编号。
+ **常规（Regular）：** 物品默认的放置方式。
+ **替代（Alternate）：** 旋转或翻转物品后的显示方式。

以下示例以一张 64×64 像素的图片作为参考。

![pixel_refe](https://i.postimg.cc/XvPC9qq7/ptb.png)

此参考物品标出了图像的左、右和中心，还有一个用于展示小物品的 32×32px 网格，以及一个用于显示大致地面位置的偏移立方体。

作为参考，Elin 中方块的倾斜角度为水平 2 像素对应垂直 1 像素。

## @obj ceil

|ceil|注释|
|-|-|
|![](https://i.postimg.cc/VLv49QZv/r-ceil.png)|![](https://i.postimg.cc/X7PLQHt8/r-ceil-notes.png)|

物体上移 2 行，对齐物体中心。

## @obj door

这是最常用的设置之一，因此理解它很重要。

![r-door](https://i.postimg.cc/66YYG50F/r-door.gif)

|door-常规|注释|
|-|-|
|![](https://i.postimg.cc/Dwsr52rv/r-door-regular.png)|![](https://i.postimg.cc/HLgQhfzQ/r-door-regular-notes.png)|
|物体从焦点格略微下移，物体中心与焦点中心对齐|**裁剪于第 1 行**|

|door-替代|注释|
|-|-|
|![](https://i.postimg.cc/mrfwGcL1/r-door-alternate.png)|![](https://i.postimg.cc/Dzrcf20j/r-door-alternate-notes.png)|
|物体略微上移，物体中心与焦点右侧的列对齐|**裁剪于第 1 行**|

总览：

![r-door-both2](https://i.postimg.cc/gJ4qRNv3/r-door-both2.png)

## @obj doorcurtain

|doorcurtain|注释|
|-|-|
|![](https://i.postimg.cc/fyL7vmKp/r-doorcurtain.png)|![](https://i.postimg.cc/D0Mrp0pZ/r-doorcurtain-notes.png)|
|物体略微下移，物体中心与焦点对齐|**裁剪于第 2 行**|

## @obj doorframe

这个放置方式曾让我做了最多的噩梦，也是我启动整个研究的起因。我至今仍不太理解它为什么会这样处理。

![r-doorframe](https://i.postimg.cc/sf64gHfr/r-doorframe.gif)

|doorframe|doorframe-替代|
|-|-|
|![](https://i.postimg.cc/CLRHBCdf/r-doorframe.png)|![](https://i.postimg.cc/7Yj1gCTt/r-doorframe-alt.png)|
|物体下移 1 行、左移 1 列|相同位置但略微上移|
|**均裁剪于第 1 行**|**均裁剪于第 1 行**|

## @obj eq

这是为手持物品设计的，因此它在精灵图上对齐得很好，除非有特殊的用途，否则一般不用于放置物体。

|eq-常规|eq|
|-|-|
|![](https://i.postimg.cc/Twkghh69/r-eq-regular.png)|![](https://i.postimg.cc/PqQms2V0/r-EQ.gif)|
|物体左移 16px 并略微上移|**均裁剪于第 1 行**|

## @obj flat

|flat|注释|
|-|-|
|![](https://i.postimg.cc/4ymtcZ4T/r-flat.png)|![](https://i.postimg.cc/MZF1SctZ/r-flat-notes.png)|
|物体在水平和垂直方向上都下移到焦点的中间位置|**裁剪于第 1 行**|

## @obj hangboard

这个比我预想的更有趣，潜力很大，但要注意裁剪发生的位置。

|hangboard|hangboard-位置|
|-|-|
|![](https://i.postimg.cc/m21C2b6Y/r-hangboard.gif)|![](https://i.postimg.cc/8CN6HLk4/r-hangboard-placement.png)|

|hangboard-常规|hangboard-替代|
|-|-|
|![](https://i.postimg.cc/0NnJHrbs/r-hangboard-regular.png)|![](https://i.postimg.cc/Z5k3W111/r-hangboard-alternate.png)|
|物体左移 16px，下移到"第 2 行"上|物体略微上移但保持中心与常规相同|
|**裁剪于第 3 行**|**裁剪于第 1 行**|

## @obj hangroof

|hangroof-位置|hangroof-注释|
|-|-|
|![](https://i.postimg.cc/j2ww5Xvx/r-hangroof-placement.png)|![](https://i.postimg.cc/FF8k6Ms7/r-hangroof-notes.png)|

![r-hangroof](https://i.postimg.cc/TwPW8GDW/r-hangroof.gif)

|hangroof-常规|hangroof-替代|
|-|-|
|![](https://i.postimg.cc/mkvcFH6Q/r-hangroof-regular.png)|![](https://i.postimg.cc/d1SZwX2N/r-hangroof-alternative.png)|
|物体左移 1 列、下移 2 行|物体左移 16px、下移 1 行|
|**裁剪于第 3 行**|**裁剪于第 2 行**|

## @obj tall

|tall|注释|
|-|-|
|![](https://i.postimg.cc/zXhHYxVp/r-tall.png)|![](https://i.postimg.cc/RZz6Swtm/r-tal-notesl.png)|
|物体上移约 6px|**裁剪于第 1 行**|

## @obj vine

|vine|注释|
|-|-|
|![vine](https://i.postimg.cc/GmJBH9Py/r-vine.gif)|![](https://i.postimg.cc/XJhqT5WT/r-vine-regular-notes.png)|

|vine-常规|vine-替代|
|-|-|
|![](https://i.postimg.cc/PqSPQcRf/r-vine-regular.png)|![](https://i.postimg.cc/FKrYcmGn/r-vine-alternate.png)|
|物体右移约 8px、上移约 8px|物体左移约 8px、下移约 8px|
|**裁剪于第 1 行**|**裁剪于第 2 行**|

## 最后一点

对于你自己的物品，你可以将这张图片叠加到游戏截图上，帮助你了解物品的位置，从而微调你的设计。

![Sprite](https://i.postimg.cc/FR11WZMy/Sprite-0010a.png)

<style scoped>
.vp-doc h1,
.vp-doc h2,
.vp-doc h3,
.vp-doc h4,
.vp-doc h5,
.vp-doc h6 {
  text-transform: none;
}
</style>
