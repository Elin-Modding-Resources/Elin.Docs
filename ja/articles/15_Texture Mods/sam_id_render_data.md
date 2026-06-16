---
title: Sam の _idRenderData ノート
author: SamInJapan
description: _idRenderData はゲーム内でのアイテム配置を制御するために不可欠です。
date: 2024/12/20 22:00
tags: Texture/Color
---

# obj _idRenderData

カスタムオブジェクトを作成する際、obj の後に _idRenderData 文字列を使用することは、ゲーム内でのアイテム配置を制御するために不可欠です。

以下は、独自の表示を持つもの（2024/12/20 現在）とその表示例です。

キーワード：
+ **フォーカス列：** アイテム（配置用の明るい菱形）が配置される地上グリッドのメインの列です。
+ **フォーカス行：** アイテムが配置される地上グリッドのメインの行です。
+ **オブジェクト中心（obj center）：** この 3 本の線（下向き矢印のような形）は、修飾子なしでデフォルトでオブジェクトが地上グリッドのどこに位置するかを示します。
+ **クリッピング行：** アイテムの端をクリップして地面に置かれているように見せる地上グリッドの行です。各行は配置位置から下に向かって番号が振られています。
+ **通常：** デフォルトでのアイテムの配置方法です。
+ **代替：** アイテムを回転または反転したときの表示方法です。

この例では 64 x 64 ピクセルの画像をリファレンスとして使用しています。

![pixel_refe](https://i.postimg.cc/XvPC9qq7/ptb.png)

このリファレンスアイテムは、画像の左、右、中央、小さなアイテム用の 32x32px グリッド、および一般的な床位置を示すオフセットキューブを示しています。

参考までに、Elin はブロックに水平 2 ピクセル対垂直 1 ピクセルの角度を使用しています。

## @obj ceil

|ceil|notes|
|-|-|
|![](https://i.postimg.cc/VLv49QZv/r-ceil.png)|![](https://i.postimg.cc/X7PLQHt8/r-ceil-notes.png)|

オブジェクトは 2 行上に上がり、オブジェクト中心に揃います。

## @obj door

これは最もよく使われる設定の一つなので、理解することが重要です。

![r-door](https://i.postimg.cc/66YYG50F/r-door.gif)

|door-regular|notes|
|-|-|
|![](https://i.postimg.cc/Dwsr52rv/r-door-regular.png)|![](https://i.postimg.cc/HLgQhfzQ/r-door-regular-notes.png)|
|オブジェクトはフォーカスセルからわずかに下がり、オブジェクト中心をフォーカス中心に揃えます|**行 1 でクリップ**|

|door-alternate|notes|
|-|-|
|![](https://i.postimg.cc/mrfwGcL1/r-door-alternate.png)|![](https://i.postimg.cc/Dzrcf20j/r-door-alternate-notes.png)|
|オブジェクトは少し上がり、オブジェクト中心をフォーカスの右隣の列に揃えます|**行 1 でクリップ**|

Overview:

![r-door-both2](https://i.postimg.cc/gJ4qRNv3/r-door-both2.png)

## @obj doorcurtain

|doorcurtain|notes|
|-|-|
|![](https://i.postimg.cc/fyL7vmKp/r-doorcurtain.png)|![](https://i.postimg.cc/D0Mrp0pZ/r-doorcurtain-notes.png)|
|オブジェクトはわずかに下がり、オブジェクト中心をフォーカスに揃えます|**行 2 でクリップ**|

## @obj doorframe

この配置は最も悪夢を見せられ、この調査全体のきっかけとなりました。なぜこのような動作をするのか、いまだによく理解できていません。

![r-doorframe](https://i.postimg.cc/sf64gHfr/r-doorframe.gif)

|doorframe|doorframe-alternate|
|-|-|
|![](https://i.postimg.cc/CLRHBCdf/r-doorframe.png)|![](https://i.postimg.cc/7Yj1gCTt/r-doorframe-alt.png)|
|オブジェクトは 1 行下がり、1 列左に移動します|同じ配置ですが、少し上がります|
|**両方とも行 1 でクリップ**|**両方とも行 1 でクリップ**|

## @obj eq

これは手持ちアイテム用に設計されているため、スプライト上にうまく配置されます。面白い用途がない限り、オブジェクトにはあまり使われません。

|eq-regular|eq|
|-|-|
|![](https://i.postimg.cc/Twkghh69/r-eq-regular.png)|![](https://i.postimg.cc/PqQms2V0/r-EQ.gif)|
|オブジェクトは左に 16px、少し上にずれます|**両方とも行 1 でクリップ**|

## @obj flat

|flat|notes|
|-|-|
|![](https://i.postimg.cc/4ymtcZ4T/r-flat.png)|![](https://i.postimg.cc/MZF1SctZ/r-flat-notes.png)|
|オブジェクトは水平・垂直ともにフォーカスの中央に下がります|**行 1 でクリップ**|

## @obj hangboard

これは予想以上に興味深く、多くの可能性を秘めていますが、クリッピングがどこで発生するかに注意してください。

|hangboard|hangboard-placement|
|-|-|
|![](https://i.postimg.cc/m21C2b6Y/r-hangboard.gif)|![](https://i.postimg.cc/8CN6HLk4/r-hangboard-placement.png)|

|hangboard-regular|hangboard-alternate|
|-|-|
|![](https://i.postimg.cc/0NnJHrbs/r-hangboard-regular.png)|![](https://i.postimg.cc/Z5k3W111/r-hangboard-alternate.png)|
|オブジェクトは左に 16px ずれ、「行 2」上に下がります|オブジェクトは少し上がりますが、中心は通常と同じです|
|**行 3 でクリップ**|**行 1 でクリップ**|

## @obj hangroof

|hangroof-placement|hangrood-notes|
|-|-|
|![](https://i.postimg.cc/j2ww5Xvx/r-hangroof-placement.png)|![](https://i.postimg.cc/FF8k6Ms7/r-hangroof-notes.png)|

![r-hangroof](https://i.postimg.cc/TwPW8GDW/r-hangroof.gif)

|hangroof-regular|hangroof-alternate|
|-|-|
|![](https://i.postimg.cc/mkvcFH6Q/r-hangroof-regular.png)|![](https://i.postimg.cc/d1SZwX2N/r-hangroof-alternative.png)|
|オブジェクトは左に 1 列、下に 2 行ずれます|オブジェクトは左に 16px、下に 1 行ずれます|
|**行 3 でクリップ**|**行 2 でクリップ**|

## @obj tall

|tall|notes|
|-|-|
|![](https://i.postimg.cc/zXhHYxVp/r-tall.png)|![](https://i.postimg.cc/RZz6Swtm/r-tal-notesl.png)|
|オブジェクトは約 6px 上にずれます|**行 1 でクリップ**|

## @obj vine

|vine|notes|
|-|-|
|![vine](https://i.postimg.cc/GmJBH9Py/r-vine.gif)|![](https://i.postimg.cc/XJhqT5WT/r-vine-regular-notes.png)|

|vine-regular|vine-alternate|
|-|-|
|![](https://i.postimg.cc/PqSPQcRf/r-vine-regular.png)|![](https://i.postimg.cc/FKrYcmGn/r-vine-alternate.png)|
|オブジェクトは右に約 8px、上に約 8px ずれます|オブジェクトは左に約 8px、下に約 8px ずれます|
|**行 1 でクリップ**|**行 2 でクリップ**|

## 最後に

自作アイテムの位置を把握するために、この画像をスクリーンショットに重ねることで、アイテムの位置を確認し、デザインの調整に役立てることができます。

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
