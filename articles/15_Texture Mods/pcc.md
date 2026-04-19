---
title: PCC Part
author: DK
description: How to create custom PCC parts
date: 2026/4/19 13:00
tags: Texture/PCC
---

# PCC Canvas

A PCC is a sprite sheet made of 32×48 tiles. Each row represents a direction, and each column represents a frame.

![](./assets/pcc_body_1.png)

## Layers & Path

PCC parts use the following layer order:

* hairbk
* mantle
* body
* undie
* boots
* pants
* cloth
* chest
* belt
* glove
* eye
* hair
* subhair
* face
* head
* etc
* mantlebk

`hairbk` and `mantlebk` are the back views of their respective layers.

## Naming

PCC parts must follow this format:
`pcc_layer_uniqueId.png`

Examples:

* `pcc_face_mypccmod01`
* `pcc_cloth_customwardrobe3`

The `uniqueId` must:

* be unique to avoid conflicts
* not contain underscores (`_`)

## File Location

Place PCC files in `Actor/PCC/female` folder inside your [mod package](../2_Getting%20Started/basic_mod).

## Oversized Canvas

To create tiles other than 32×48, install the Variable Sprite Support mod.
