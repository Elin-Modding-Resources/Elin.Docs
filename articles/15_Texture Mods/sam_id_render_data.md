---
title: Sam's Notes on _idRenderData
author: SamInJapan
description: _idRenderData is essential for controlling the placement of items in game.
date: 2024/12/20 22:00
tags: Texture/Color
---

# _idRenderData

When building custom objects, using the _idRenderData strings after the obj is essential for controlling the placement of items in game.

Here are the ones that display uniquely (as of 12/20/2024) with examples of how they are displayed.

Keywords:
+ **Focus Column:** This is the main column on the ground grid that the item (the light diamond for placing items) is being placed on.
+ **Focus Row:** This is the main row on the ground grid that the item is being placed on.
+ **Object Center (obj center):** These three lines, making a kind of downward arrow, shows where the object sits on the ground grid by default, without any modifiers of any kind.
+ **Clipping Row:** This is the row on the ground grid that clips the edge of the item, giving it the appearance of sitting on the ground. Each row is numbered from the placement down.
+ **Regular:** How the item is placed by default.
+ **Alternate:** When you rotate or flip the item, how it displays.

This example uses a 64 x 64 pixel image as a reference.

![pixel_refe](https://i.postimg.cc/XvPC9qq7/ptb.png)

This reference item shows the left, right, and center of the image, as well as a smaller 32x32px grid for showing smaller items, and an offset cube to show the general floor positions.

For reference, Elin uses an angle of 2 pixels horizontally to 1 pixel vertically for the blocks.

## @obj ceil

|ceil|notes|
|-|-|
|![](https://i.postimg.cc/VLv49QZv/r-ceil.png)|![](https://i.postimg.cc/X7PLQHt8/r-ceil-notes.png)|

Obj goes up 2 rows, aligns obj center.

## @obj door

This is one of the most commonly used settings, so understanding it is important.

![r-door](https://i.postimg.cc/66YYG50F/r-door.gif)

_**Regular:**_ Obj drops down slightly from the focus cell, aligns the obj center with the focus center.

**Clips on Row 1.**

|door-regular|notes|
|-|-|
|![](https://i.postimg.cc/Dwsr52rv/r-door-regular.png)|![](https://i.postimg.cc/HLgQhfzQ/r-door-regular-notes.png)|

_**Alternate:**_ Obj raises up a bit, aligns obj center with the column to the right of the focus.

**Clips on Row 1.**

|door-alternate|notes|
|-|-|
|![](https://i.postimg.cc/mrfwGcL1/r-door-alternate.png)|![](https://i.postimg.cc/Dzrcf20j/r-door-alternate-notes.png)|

Overview:

![r-door-both2](https://i.postimg.cc/gJ4qRNv3/r-door-both2.png)

## @obj doorcurtain

Obj drops down slightly, aligns the obj center with the focus.

**Clips on Row 2.**

|doorcurtain|notes|
|-|-|
|![](https://i.postimg.cc/fyL7vmKp/r-doorcurtain.png)|![](https://i.postimg.cc/D0Mrp0pZ/r-doorcurtain-notes.png)|

## @obj doorframe

This placement gave me the most nightmares and inspired this whole endeavor. I still don't quite understand why it handles the way it does.

![r-doorframe](https://i.postimg.cc/sf64gHfr/r-doorframe.gif)

Obj drops by 1 row and moves left by 1 column. The alternate is the same placement but slightly raised up.

**Both clips on Row 1.**

|doorframe|doorframe-alt|
|-|-|
|![](https://i.postimg.cc/CLRHBCdf/r-doorframe.png)|![](https://i.postimg.cc/7Yj1gCTt/r-doorframe-alt.png)|

## @obj eq

This is designed to be handheld items so it sets up nicely on the sprite, so not really used for objects unless you have interesting use cases.

![r-EQ](https://i.postimg.cc/PqQms2V0/r-EQ.gif)

Obj shifts to the left by 16px and up a little bit.

**Both clip on Row 1.**

![r-eq-regular](https://i.postimg.cc/Twkghh69/r-eq-regular.png)

## @obj flat

|flat|notes|
|-|-|
|![](https://i.postimg.cc/4ymtcZ4T/r-flat.png)|![](https://i.postimg.cc/MZF1SctZ/r-flat-notes.png)|

Obj drops down to the middle of the focus on both horizontal and vertical.

**Clips on Row 1.**

## @obj hangboard

I wasn't expecting this one to be as interesting as it is, and has a lot of potential, but be aware of where the clipping happens.

![r-hangboard](https://i.postimg.cc/m21C2b6Y/r-hangboard.gif)

_**Regular:**_ Obj shifts to the left by 16px, drops down to be 'on' Row 2.

**Clips on Row 3.**

|hangboard-placement|hangboard-regular|
|-|-|
|![](https://i.postimg.cc/8CN6HLk4/r-hangboard-placement.png)|![](https://i.postimg.cc/0NnJHrbs/r-hangboard-regular.png)|

_**Alternate:**_ Obj shifts up slightly but keeps the center the same as regular.

**Clips on Row 1.**

![r-hangboard-alternate](https://i.postimg.cc/Z5k3W111/r-hangboard-alternate.png)

## @obj hangroof

![r-hangroof](https://i.postimg.cc/TwPW8GDW/r-hangroof.gif)

_**Regular:**_ Obj shifts to the left by 1 column, down by 2 rows.

**Clips on Row 3.**

|hangroof-placement|hangroof-regular|
|-|-|
|![](https://i.postimg.cc/j2ww5Xvx/r-hangroof-placement.png)|![](https://i.postimg.cc/mkvcFH6Q/r-hangroof-regular.png)|

_**Alternate:**_ Obj shifts to the left by 16px, down by 1 row.

**Clips on Row 2.**

|hangroof-alternative|notes|
|-|-|
|![](https://i.postimg.cc/d1SZwX2N/r-hangroof-alternative.png)|![](https://i.postimg.cc/FF8k6Ms7/r-hangroof-notes.png)|

## @obj tall

|tall|notes|
|-|-|
|![](https://i.postimg.cc/zXhHYxVp/r-tall.png)|![](https://i.postimg.cc/RZz6Swtm/r-tal-notesl.png)|

Obj shifts up by 6px or so.

**Clips on Row 1.**

## @obj vine

|vine|notes|
|-|-|
|![vine](https://i.postimg.cc/GmJBH9Py/r-vine.gif)|![](https://i.postimg.cc/XJhqT5WT/r-vine-regular-notes.png)|

_**Regular:**_ Obj shifts right by 8px or so, and up by 8px or so.

**Clips on Row 1.**

_**Alternate:**_ Obj shifts left by 8px or so, down by 8px or so.

**Clips on Row 2.**

|vine-regular|vine-alternative|
|-|-|
|![](https://i.postimg.cc/PqSPQcRf/r-vine-regular.png)|![](https://i.postimg.cc/FKrYcmGn/r-vine-alternate.png)|

## One final note:

For your own items, to give you an idea of where they are positioned, you can overlay this image on a screen shot to help get an idea of where it is and where it's going to help tweak your designs.

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