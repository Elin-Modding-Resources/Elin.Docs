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
<ul><li><b>Focus Column:</b> This is the main column on the ground grid that the item (the light diamond for placing items) is being placed on.</li>
<li><b>Focus Row:</b> This is the main row on the ground grid that the item is being placed on.</li>
<li><b>Object Center (obj center):</b> These three lines, making a kind of downward arrow, shows where the object sits on the ground grid by default, without any modifiers of any kind.</li>
<li><b>Clipping Row:</b> This is the row on the ground grid that clips the edge of the item, giving it the appearance of sitting on the ground. Each row is numbered from the placement down.</li>
<li><b>Regular:</b> How the item is placed by default.</li>
<li><b>Alternate:</b> When you rotate or flip the item, how it displays.</li></ul>

This example uses a 64 x 64 pixel image as a reference.

<img src="https://i.postimg.cc/XvPC9qq7/ptb.png" />

This reference item shows the left, right, and center of the image, as well as a smaller 32x32px grid for showing smaller items, and an offset cube to show the general floor positions.

For reference, Elin uses an angle of 2 pixels horizontally to 1 pixel vertically for the blocks.

<h2>@obj ceil</h2>
<img src="https://i.postimg.cc/X7PLQHt8/r-ceil-notes.png" /><img src="https://i.postimg.cc/VLv49QZv/r-ceil.png" />

Obj goes up 2 rows, aligns obj center.

<h2>@obj door</h2>
<img src="https://i.postimg.cc/66YYG50F/r-door.gif" /><img src="https://i.postimg.cc/Dwsr52rv/r-door-regular.png" /><img src="https://i.postimg.cc/HLgQhfzQ/r-door-regular-notes.png" /><img src="https://i.postimg.cc/mrfwGcL1/r-door-alternate.png" /><img src="https://i.postimg.cc/Dzrcf20j/r-door-alternate-notes.png" /><img src="https://i.postimg.cc/gJ4qRNv3/r-door-both2.png" />


This is one of the most commonly used settings, so understanding it is important.

<i>Regular:</i> Obj drops down slightly from the focus cell, aligns the obj center with the focus center.

Clips on Row 1.

<i>Alternate:</i> Obj raises up a bit, aligns obj center with the column to the right of the focus.

Clips on Row 1.

<h2>@obj doorcurtain</h2>
<img src="https://i.postimg.cc/fyL7vmKp/r-doorcurtain.png" /><img src="https://i.postimg.cc/D0Mrp0pZ/r-doorcurtain-notes.png" />

Obj drops down slightly, aligns the obj center with the focus.

Clips on Row 2.

<h2>@obj doorframe</h2>
<img src="https://i.postimg.cc/sf64gHfr/r-doorframe.gif" /><img src="https://i.postimg.cc/CLRHBCdf/r-doorframe.png" /><img src="https://i.postimg.cc/7Yj1gCTt/r-doorframe-alt.png" />

This placement gave me the most nightmares and inspired this whole endeavor. I still don't quite understand why it handles the way it does.

Obj drops by 1 row and moves left by 1 column. The alternate is the same placement but slightly raised up.

Both clips on Row 1.

<h2>@obj eq</h2>
<img src="https://i.postimg.cc/PqQms2V0/r-EQ.gif" /><img src="https://i.postimg.cc/Twkghh69/r-eq-regular.png" />

This is designed to be handheld items so it sets up nicely on the sprite, so not really used for objects unless you have interesting use cases.

Obj shifts to the left by 16px and up a little bit.

Both clip on Row 1.

<h2>@obj flat</h2>
<img src="https://i.postimg.cc/4ymtcZ4T/r-flat.png" /><img src="https://i.postimg.cc/MZF1SctZ/r-flat-notes.png" />

This setting is really useful for certain designs to put them directly on the ground but also allow them to sit nice on tables and the like.

Obj drops down to the middle of the focus on both horizontal and vertical.

Clips on Row 1.

<h2>@obj hangboard</h2>
<img src="https://i.postimg.cc/m21C2b6Y/r-hangboard.gif" /><img src="https://i.postimg.cc/8CN6HLk4/r-hangboard-placement.png" /><img src="https://i.postimg.cc/0NnJHrbs/r-hangboard-regular.png" /><img src="https://i.postimg.cc/W1MZg5Vt/r-hangboard-notes.png" /><img src="https://i.postimg.cc/Z5k3W111/r-hangboard-alternate.png" />


I wasn't expecting this one to be as interesting as it is, and has a lot of potential, but be aware of where the clipping happens.

<i>Regular:</i> Obj shifts to the left by 16px, drops down to be 'on' Row 2.

<b>Clips on Row 3.</b>

<i>Alternate:</i> Obj shifts up slightly but keeps the center the same as regular.

<b>Clips on Row 1.</b>

<h2>@obj hangroof</h2>
<img src="https://i.postimg.cc/TwPW8GDW/r-hangroof.gif" /><img src="https://i.postimg.cc/j2ww5Xvx/r-hangroof-placement.png" /><img src="https://i.postimg.cc/mkvcFH6Q/r-hangroof-regular.png" /><img src="https://i.postimg.cc/FF8k6Ms7/r-hangroof-notes.png" /><img src="https://i.postimg.cc/d1SZwX2N/r-hangroof-alternative.png" />

<i>Regular:</i> Obj shifts to the left by 1 column, down by 2 rows.

<b>Clips on Row 3.</b>

<i>Alternate:</i> Obj shifts to the left by 16px, down by 1 row.

<b>Clips on Row 2.</b>

<h2>@obj tall</h2>
<img src="https://i.postimg.cc/RZz6Swtm/r-tal-notesl.png" /><img src="https://i.postimg.cc/zXhHYxVp/r-tall.png" />

Obj shifts up by 6px or so.

Clips on Row 1.

<h2>@obj vine</h2>
<img src="https://i.postimg.cc/GmJBH9Py/r-vine.gif" /><img src="https://i.postimg.cc/PqSPQcRf/r-vine-regular.png" /><img src="https://i.postimg.cc/XJhqT5WT/r-vine-regular-notes.png" /><img src="https://i.postimg.cc/FKrYcmGn/r-vine-alternate.png" />

<i>Regular:</i> Obj shifts right by 8px or so, and up by 8px or so.

Clips on Row 1.

<i>Alternate:</i> Obj shifts left by 8px or so, down by 8px or so.

Clips on Row 2.

<h2>One final note:</h2>

For your own items, to give you an idea of where they are positioned, you can overlay this image on a screen shot to help get an idea of where it is and where it's going to help tweak your designs.

<img src="https://i.postimg.cc/FR11WZMy/Sprite-0010a.png" />
