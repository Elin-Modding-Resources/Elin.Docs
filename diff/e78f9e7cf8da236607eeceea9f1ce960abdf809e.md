---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 8 files modified. 1 new file created.
version: EA 23.248 Nightly
changes: BaseTileMap/CardRenderer/DramaOutcome/QuestManager/TaskBaseBuild/TileTypeObjFloat/Trait/+TraitASMR/Zone_Nymelle
---

# EA 23.248 Nightly

December 17, 2025

8 files modified. 1 new file created.

## Important Changes

**None.**
## BaseTileMap

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2537-L2548)
```cs:line-numbers=2537
	float num21 = 0f;
	bool flag10 = false;
	float num22 = 0f;
	bool flag11 = false; // [!code --]
	float num23 = 0f;
	bool flag11 = false; // [!code ++]
	float num24 = 0f; // [!code ++]
	if (detail.things.Count > 0 && isSeen)
	{
		_ = zSetting.max1;
		float num24 = 0f; // [!code --]
		float num25 = 0f; // [!code ++]
		for (int m = 0; m < detail.things.Count; m++)
		{
			Thing t = detail.things[m];
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2557-L2568)
```cs:line-numbers=2557
			{
				pref = rendererObjDummy.shadowPref;
			}
			float num25 = ((tileType.UseMountHeight && isInstalled) ? 0f : ((pref.height < 0f) ? 0f : ((pref.height == 0f) ? 0.1f : pref.height))); // [!code --]
			float num26 = ((tileType.UseMountHeight && isInstalled) ? 0f : ((pref.height < 0f) ? 0f : ((pref.height == 0f) ? 0.1f : pref.height))); // [!code ++]
			if (t.ignoreStackHeight)
			{
				thingPos.y -= num20; // [!code --]
				thingPos = Vector3.zero; // [!code ++]
				num23 = 0f; // [!code ++]
			}
			shadow = thingPos.y < 0.16f && num23 < 0.16f; // [!code --]
			shadow = thingPos.y < 0.16f && num24 < 0.16f; // [!code ++]
			_ = pref.bypassShadow;
			param.shadowFix = 0f - thingPos.y;
			param.liquidLv = ((thingPos.y + (float)t.altitude < 0.1f) ? liquidLv : 0);
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2572-L2578)
```cs:line-numbers=2572
				SetRoofHeight(param, this.cell, cx, cz);
				_actorPos.x = param.x;
				_actorPos.y = param.y;
				_actorPos.z = param.z + num24; // [!code --]
				_actorPos.z = param.z + num25; // [!code ++]
				if (this.room != null)
				{
					param.color = GetRoofLight(this.room.lot);
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2585-L2591)
```cs:line-numbers=2585
				param.snow = snowed;
				_actorPos.x = orgX + num21;
				_actorPos.y = orgY;
				_actorPos.z = orgZ + num24 + thingPos.z; // [!code --]
				_actorPos.z = orgZ + num25 + thingPos.z; // [!code ++]
				if (tileType.CanStack || !isInstalled)
				{
					if (thing?.id != t.id)
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2618-L2624)
```cs:line-numbers=2618
						freePos.z += rampFix2.z;
						if (!this.cell.IsTopWater || t.altitude > 0)
						{
							num23 += rampFix2.y; // [!code --]
							num24 += rampFix2.y; // [!code ++]
						}
						liquidLv -= (int)(rampFix2.y * 150f);
						if (liquidLv < 0)
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2628-L2639)
```cs:line-numbers=2628
					}
					else if (!flag11 && t.trait.IsChangeFloorHeight && !t.ignoreStackHeight)
					{
						orgY += num25 + (float)t.altitude * altitudeFix.y; // [!code --]
						orgY += num26 + (float)t.altitude * altitudeFix.y; // [!code ++]
						orgZ += (float)t.altitude * altitudeFix.z;
						freePos.y += num25 + (float)t.altitude * altitudeFix.y; // [!code --]
						freePos.y += num26 + (float)t.altitude * altitudeFix.y; // [!code ++]
						if (!this.cell.IsTopWater || t.altitude > 0)
						{
							num23 += num25 + (float)t.altitude * altitudeFix.y; // [!code --]
							num24 += num26 + (float)t.altitude * altitudeFix.y; // [!code ++]
						}
						_actorPos.x += pref.x * (float)((!t.flipX) ? 1 : (-1));
						_actorPos.z += pref.z;
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2645-L2657)
```cs:line-numbers=2645
					}
					else
					{
						thingPos.y += num25; // [!code --]
						thingPos.y += num26; // [!code ++]
						_actorPos.x += pref.x * (float)((!t.flipX) ? 1 : (-1));
						_actorPos.z += pref.z;
						if (pref.height >= 0f)
						{
							thingPos.z += pref.z;
						}
						if (!t.TileType.UseMountHeight) // [!code ++]
						{ // [!code ++]
							thingPos.y += (float)t.altitude * altitudeFix.y; // [!code ++]
							thingPos.z += (float)t.altitude * altitudeFix.z; // [!code ++]
						} // [!code ++]
					}
					if (!tileType.UseMountHeight && m > 10)
					{
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2660-L2666)
```cs:line-numbers=2660
				}
				else
				{
					thingPos.y += num25; // [!code --]
					thingPos.y += num26; // [!code ++]
					_actorPos.x += pref.x * (float)((!t.flipX) ? 1 : (-1));
					_actorPos.z += pref.z;
					thingPos.z += pref.z;
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2668-L2680)
```cs:line-numbers=2668
				if (t.isFloating && isWater && !hasBridge && !flag)
				{
					flag = true;
					float num26 = ((this.cell._bridge != 0) ? sourceBridge.tileType.FloorHeight : sourceFloor.tileType.FloorHeight); // [!code --]
					orgY += 0.01f * floatY - num26; // [!code --]
					float num27 = ((this.cell._bridge != 0) ? sourceBridge.tileType.FloorHeight : sourceFloor.tileType.FloorHeight); // [!code ++]
					orgY += 0.01f * floatY - num27; // [!code ++]
					if (!t.trait.IsChangeFloorHeight)
					{
						num22 = num25; // [!code --]
						num22 = num26; // [!code ++]
					}
					_actorPos.y += 0.01f * floatY - num26; // [!code --]
					_actorPos.y += 0.01f * floatY - num27; // [!code ++]
					if (liquidLv > 10)
					{
						liquidLv = TileType.FloorWaterShallow.LiquidLV * 10;
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2686-L2695)
```cs:line-numbers=2686
					}
					param.liquidLv = liquidLv;
				}
				num20 = num25; // [!code --]
				num20 = num26; // [!code ++]
				if (t.sourceCard.multisize && !t.trait.IsGround)
				{
					num24 += zSetting.multiZ; // [!code --]
					num25 += zSetting.multiZ; // [!code ++]
				}
				orgZ += t.renderer.data.stackZ;
				if (param.liquidLv > 0)
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2747-L2756)
```cs:line-numbers=2747
				if (t.altitude != 0)
				{
					_actorPos += altitudeFix * t.altitude;
					if (t.altitude > 2 && ((this.cell.Back.room != null && this.cell.Back.IsRoomEdge) || (this.cell.Left.room != null && this.cell.Left.IsRoomEdge)) && hideHang && (this.cell.room?.lot != currentLot || (!this.cell.lotWall && this.cell.room != currentRoom))) // [!code --]
					{ // [!code --]
						continue; // [!code --]
					} // [!code --]
					num23 += (float)t.altitude; // [!code ++]
				} // [!code ++]
				if (num23 >= 2f && ((this.cell.Back.room != null && this.cell.Back.IsRoomEdge) || (this.cell.Left.room != null && this.cell.Left.IsRoomEdge)) && hideHang && (this.cell.room?.lot != currentLot || (!this.cell.lotWall && this.cell.room != currentRoom))) // [!code ++]
				{ // [!code ++]
					continue; // [!code ++]
				}
				if (t.freePos)
				{
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2766-L2800)
```cs:line-numbers=2766
			{
				if (iconMode != 0)
				{
					int num27 = 0; // [!code --]
					int num28 = 0; // [!code ++]
					switch (iconMode)
					{
					case CardIconMode.Visibility:
						if (t.isMasked)
						{
							num27 = 17; // [!code --]
							num28 = 17; // [!code ++]
						}
						break;
					case CardIconMode.State:
						if (t.placeState == PlaceState.installed)
						{
							num27 = 18; // [!code --]
							num28 = 18; // [!code ++]
						}
						break;
					case CardIconMode.Deconstruct:
						if (t.isDeconstructing)
						{
							num27 = 14; // [!code --]
							num28 = 14; // [!code ++]
						}
						break;
					}
					if (t.isNPCProperty && !EMono.debug.godBuild)
					{
						num27 = 13; // [!code --]
						num28 = 13; // [!code ++]
					}
					if (num27 != 0) // [!code --]
					if (num28 != 0) // [!code ++]
					{
						passGuideBlock.Add(_actorPos.x, _actorPos.y, _actorPos.z - 10f, num27); // [!code --]
						passGuideBlock.Add(_actorPos.x, _actorPos.y, _actorPos.z - 10f, num28); // [!code ++]
					}
				}
				t.SetRenderParam(param);
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2839-L2845)
```cs:line-numbers=2839
	{
		return;
	}
	param.shadowFix = 0f - num23; // [!code --]
	param.shadowFix = 0f - num24; // [!code ++]
	param.color += 1310720f;
	float max = zSetting.max2;
	for (int n = 0; n < detail.charas.Count; n++)
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2864-L2872)
```cs:line-numbers=2864
				{
					Vector3 position = restrainer.owner.renderer.position;
					float defCharaHeight = EMono.setting.render.defCharaHeight;
					float num28 = getRestrainPos.y + defCharaHeight - ((chara.Pref.height == 0f) ? defCharaHeight : chara.source.pref.height); // [!code --]
					float num29 = getRestrainPos.y + defCharaHeight - ((chara.Pref.height == 0f) ? defCharaHeight : chara.source.pref.height); // [!code ++]
					_actorPos.x = position.x + getRestrainPos.x * (float)((restrainer.owner.dir % 2 == 0) ? 1 : (-1));
					_actorPos.y = position.y + num28; // [!code --]
					_actorPos.y = position.y + num29; // [!code ++]
					_actorPos.z = position.z + getRestrainPos.z;
					param.liquidLv = 0;
					param.shadowFix = orgY - _actorPos.y;
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2881-L2902)
```cs:line-numbers=2881
		{
			if (chara.IsDeadOrSleeping && chara.IsPCC)
			{
				float num29 = chara.renderer.data.size.y * 0.3f; // [!code --]
				float num30 = chara.renderer.data.size.y * 0.3f; // [!code ++]
				if (thingPos.y > max)
				{
					thingPos.y = max;
				}
				float num30 = thingPos.y + num29; // [!code --]
				float num31 = (float)n * -0.01f; // [!code --]
				if (num30 > zSetting.thresh1) // [!code --]
				float num31 = thingPos.y + num30; // [!code ++]
				float num32 = (float)n * -0.01f; // [!code ++]
				if (num31 > zSetting.thresh1) // [!code ++]
				{
					num31 = zSetting.mod1; // [!code --]
					num32 = zSetting.mod1; // [!code ++]
				}
				_actorPos.x += thingPos.x;
				_actorPos.y += thingPos.y;
				_actorPos.z += renderSetting.laydownZ + num31; // [!code --]
				_actorPos.z += renderSetting.laydownZ + num32; // [!code ++]
				param.liquidLv = ((thingPos.y == 0f && liquidLv > 0) ? 90 : 0);
				thingPos.y += num29 * 0.8f; // [!code --]
				thingPos.y += num30 * 0.8f; // [!code ++]
				chara.renderer.Draw(param, ref _actorPos, liquidLv == 0);
			}
			else
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2906-L2916)
```cs:line-numbers=2906
				{
					if (chara.Pref.FloatUnderwater)
					{
						float num32 = ((this.cell._bridge != 0) ? sourceBridge.tileType.FloorHeight : sourceFloor.tileType.FloorHeight); // [!code --]
						float num33 = floatYs[chara.uid % 10] + 10f + (float)(chara.uid % 30); // [!code --]
						orgY += 0.01f * num33 - num32; // [!code --]
						_actorPos.y += 0.01f * num33 - num32; // [!code --]
						param.shadowFix -= 0.01f * num33 - num32; // [!code --]
						float num33 = ((this.cell._bridge != 0) ? sourceBridge.tileType.FloorHeight : sourceFloor.tileType.FloorHeight); // [!code ++]
						float num34 = floatYs[chara.uid % 10] + 10f + (float)(chara.uid % 30); // [!code ++]
						orgY += 0.01f * num34 - num33; // [!code ++]
						_actorPos.y += 0.01f * num34 - num33; // [!code ++]
						param.shadowFix -= 0.01f * num34 - num33; // [!code ++]
					}
				}
				else if (liquidLv > 0)
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2919-L2930)
```cs:line-numbers=2919
					{
						if (liquidLv > 20)
						{
							float num34 = ((this.cell._bridge != 0) ? sourceBridge.tileType.FloorHeight : sourceFloor.tileType.FloorHeight); // [!code --]
							orgY += 0.01f * floatY - num34; // [!code --]
							_actorPos.y += 0.01f * floatY - num34; // [!code --]
							int num35 = TileType.FloorWaterShallow.LiquidLV * 10; // [!code --]
							num35 -= (int)(floatY * 0.5f); // [!code --]
							param.liquidLv = num35; // [!code --]
							float num35 = ((this.cell._bridge != 0) ? sourceBridge.tileType.FloorHeight : sourceFloor.tileType.FloorHeight); // [!code ++]
							orgY += 0.01f * floatY - num35; // [!code ++]
							_actorPos.y += 0.01f * floatY - num35; // [!code ++]
							int num36 = TileType.FloorWaterShallow.LiquidLV * 10; // [!code ++]
							num36 -= (int)(floatY * 0.5f); // [!code ++]
							param.liquidLv = num36; // [!code ++]
						}
						else
						{
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L2984-L2999)
```cs:line-numbers=2984
			{
				if (sourceEffect2.anime.Length > 2)
				{
					float num36 = Time.realtimeSinceStartup * 1000f / (float)sourceEffect2.anime[1] % (float)sourceEffect2.anime[2]; // [!code --]
					if (!(num36 >= (float)sourceEffect2.anime[0])) // [!code --]
					float num37 = Time.realtimeSinceStartup * 1000f / (float)sourceEffect2.anime[1] % (float)sourceEffect2.anime[2]; // [!code ++]
					if (!(num37 >= (float)sourceEffect2.anime[0])) // [!code ++]
					{
						param.tile += num36; // [!code --]
						param.tile += num37; // [!code ++]
					}
				}
				else
				{
					float num37 = Time.realtimeSinceStartup * 1000f / (float)sourceEffect2.anime[1] % (float)sourceEffect2.anime[0]; // [!code --]
					param.tile += num37; // [!code --]
					float num38 = Time.realtimeSinceStartup * 1000f / (float)sourceEffect2.anime[1] % (float)sourceEffect2.anime[0]; // [!code ++]
					param.tile += num38; // [!code ++]
				}
			}
			if (this.cell.effect.IsFire)
```

[`void Draw(int tile)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L3203-L3209)
```cs:line-numbers=3203

	public Vector3 GetThingPosition(Card tg, Point p)
	{
		Vector3 zero = Vector3.zero; // [!code --]
		Vector3 vector = Vector3.zero; // [!code ++]
		Vector3 vector2 = vector; // [!code ++]
		float num = 0f;
		cell = p.cell;
		sourceFloor = cell.sourceFloor;
```

[`public Vector3 GetThingPosition(Card tg, Point p)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L3211-L3243)
```cs:line-numbers=3211
	{
		if (cell.isFloating && !cell.IsSnowTile)
		{
			zero.z -= 1f; // [!code --]
			vector.z -= 1f; // [!code ++]
		}
		else if (!tg.sourceCard.multisize)
		{
			float num2 = ((cell._bridge != 0) ? cell.sourceBridge.tileType.FloorHeight : sourceFloor.tileType.FloorHeight);
			zero.y += num2; // [!code --]
			zero.z -= num2 * heightMod.z; // [!code --]
			vector.y += num2; // [!code ++]
			vector.z -= num2 * heightMod.z; // [!code ++]
		}
		if (cell.HasRamp)
		{
			Vector3 rampFix = cell.sourceBlock.tileType.GetRampFix(cell.blockDir);
			zero.x += rampFix.x; // [!code --]
			zero.y += rampFix.y; // [!code --]
			zero.z += rampFix.z; // [!code --]
			vector.x += rampFix.x; // [!code ++]
			vector.y += rampFix.y; // [!code ++]
			vector.z += rampFix.z; // [!code ++]
		}
	}
	if (tg.sourceCard.multisize)
	{
		zero.z -= 1f; // [!code --]
		vector.z -= 1f; // [!code ++]
	}
	SourcePref pref = tg.Pref;
	zero.x += pref.x * (float)((!tg.flipX) ? 1 : (-1)); // [!code --]
	zero.z += pref.z; // [!code --]
	vector.x += pref.x * (float)((!tg.flipX) ? 1 : (-1)); // [!code ++]
	vector.z += pref.z; // [!code ++]
	detail = cell.detail;
	if (tg.isChara)
	{
		return zero; // [!code --]
		return vector; // [!code ++]
	}
	bool flag = false;
	if (tg.TileType.UseMountHeight && !EMono.scene.actionMode.IsRoofEditMode(tg))
```

[`public Vector3 GetThingPosition(Card tg, Point p)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L3248-L3260)
```cs:line-numbers=3248
	{
		if (tg.altitude != 0)
		{
			zero += altitudeFix * tg.altitude; // [!code --]
			vector += altitudeFix * tg.altitude; // [!code ++]
		}
		flag = true;
	}
	if (EMono.scene.actionMode.IsRoofEditMode(tg))
	{
		return zero; // [!code --]
		return vector; // [!code ++]
	}
	float num3 = 0f;
	if (detail != null && detail.things.Count > 0)
```

[`public Vector3 GetThingPosition(Card tg, Point p)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L3273-L3302)
```cs:line-numbers=3273
			if (thing.TileType.IsRamp)
			{
				Vector3 rampFix2 = thing.TileType.GetRampFix(thing.dir, pref2);
				zero.x += rampFix2.x; // [!code --]
				zero.y += rampFix2.y; // [!code --]
				zero.z += rampFix2.z; // [!code --]
				vector.x += rampFix2.x; // [!code ++]
				vector.y += rampFix2.y; // [!code ++]
				vector.z += rampFix2.z; // [!code ++]
			}
			if (!flag && tileType.CanStack)
			{
				if (thing.ignoreStackHeight)
				{
					zero.y -= num3; // [!code --]
					vector = vector2; // [!code ++]
				}
				zero.y += num4; // [!code --]
				zero.x += pref2.stackX * (float)((!thing.flipX) ? 1 : (-1)); // [!code --]
				zero.z += pref2.z + thing.renderer.data.stackZ; // [!code --]
				vector.y += num4; // [!code ++]
				vector.x += pref2.stackX * (float)((!thing.flipX) ? 1 : (-1)); // [!code ++]
				vector.z += pref2.z + thing.renderer.data.stackZ; // [!code ++]
				if (!tileType.UseMountHeight && thing.altitude != 0)
				{
					zero += altitudeFix * thing.altitude; // [!code --]
					vector += altitudeFix * thing.altitude; // [!code ++]
					num4 += altitudeFix.y * (float)thing.altitude;
				}
				if (thing.trait.IgnoreLastStackHeight && (card == null || !card.trait.IgnoreLastStackHeight))
				{
					zero.y -= num3; // [!code --]
					vector.y -= num3; // [!code ++]
				}
				num3 = num4;
				zero.z += renderSetting.thingZ + num + (float)i * -0.01f + zSetting.mod1 * zero.y; // [!code --]
				vector.z += renderSetting.thingZ + num + (float)i * -0.01f + zSetting.mod1 * vector.y; // [!code ++]
				if (thing.TileType.IsRamp || (thing.trait.IsChangeFloorHeight && !thing.ignoreStackHeight)) // [!code ++]
				{ // [!code ++]
					vector2 = vector; // [!code ++]
				} // [!code ++]
				if (thing.sourceCard.multisize)
				{
					num += zSetting.multiZ;
```

[`public Vector3 GetThingPosition(Card tg, Point p)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/BaseTileMap.cs#L3307-L3323)
```cs:line-numbers=3307
		}
		if (flag)
		{
			return zero; // [!code --]
			return vector; // [!code ++]
		}
		if (tg.ignoreStackHeight)
		{
			zero.y -= num3; // [!code --]
			vector = vector2; // [!code ++]
			vector.z += (float)(detail?.things.Count ?? 0) * -0.01f; // [!code ++]
		}
		if (tg.altitude != 0)
		{
			zero += altitudeFix * tg.altitude; // [!code --]
			vector += altitudeFix * tg.altitude; // [!code ++]
		}
		return zero; // [!code --]
		return vector; // [!code ++]
	}

	public int GetApproximateBlocklight(Cell cell)
```

## CardRenderer

[`public void AddExtra(string id)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/CardRenderer.cs#L456-L462)
```cs:line-numbers=456
public void RefreshExtra()
{
	string idExtra = owner.sourceCard.idExtra;
	if (!idExtra.IsEmpty()) // [!code --]
	if (!idExtra.IsEmpty() && (owner.placeState != 0 || EClass.pc.held == owner || owner.isRoofItem)) // [!code ++]
	{
		AddExtra(idExtra);
	}
```

## DramaOutcome

[`public void QuestExploration_AfterCrystal()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/DramaOutcome.cs#L119-L126)
```cs:line-numbers=119
		quest.ChangePhase(5);
		Chara chara = EMono.game.cards.globalCharas.Find("fiama");
		EMono._zone.AddCard(ThingGen.CreateScroll(8220).Identify(show: false), chara.pos);
		chara.MoveZone(EMono.game.StartZone); // [!code --]
		chara.MoveHome(EMono.game.StartZone); // [!code ++]
		chara.RemoveEditorTag(EditorTag.AINoMove);
		chara = EMono.game.cards.globalCharas.Find("ashland"); // [!code ++]
		EMono.ui.Say("Possible mod bug: 404 Ashland Not Found"); // [!code ++]
		chara = CharaGen.Create("ashland"); // [!code ++]
		chara.SetGlobal(); // [!code ++]
		chara.MoveHome(EMono.game.StartZone); // [!code ++]
	}

	public void QuestExploration_AfterComplete()
```

## QuestManager

[`public bool OnShowDialog(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/QuestManager.cs#L104-L109)
```cs:line-numbers=104
{
	foreach (Quest item in list)
	{
		if (!item.person.hasChara && item is QuestExploration && item.phase == 5 && c.id == "ashland") // [!code ++]
		{ // [!code ++]
			EClass.ui.Say("Bug: Quest Ash not found"); // [!code ++]
			item.person.uidChara = c.uid; // [!code ++]
		} // [!code ++]
		if (item.person.chara == c && (item.CanUpdateOnTalk(c) || (item.CanAutoAdvance && EClass.debug.autoAdvanceQuest)))
		{
			return item.UpdateOnTalk();
```

## TaskBaseBuild

[`bool InstallCheck<T>() where T : Trait`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/TaskBaseBuild.cs#L15-L21)
```cs:line-numbers=15
		}
		foreach (Thing thing in pos.Things)
		{
			if (thing.trait is T) // [!code --]
			if (thing != c && thing.trait is T) // [!code ++]
			{
				return false;
			}
```

## TileTypeObjFloat

[`using UnityEngine;`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/TileTypeObjFloat.cs#L1-L3)
```cs:line-numbers=1
using UnityEngine; // [!code ++]
 // [!code ++]
public class TileTypeObjFloat : TileTypeObj
{
	public override bool CanStack => false;
```

[`public class TileTypeObjFloat : TileTypeObj`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/TileTypeObjFloat.cs#L9-L12)
```cs:line-numbers=9
	public override bool UseMountHeight => true;

	public override bool AlwaysShowShadow => true;
 // [!code ++]
	public override void GetMountHeight(ref Vector3 v, Point p, int d, Card target = null) // [!code ++]
	{ // [!code ++]
		v = p.Position(); // [!code ++]
		v += EClass.screen.tileMap.altitudeFix * target.altitude; // [!code ++]
	} // [!code ++]
}
```

## Trait

[`public Thing CreateStock()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/Trait.cs#L2357-L2363)
```cs:line-numbers=2357
				}
				return Create("firework");
			case ShopType.Festival:
				if (EClass.rnd(3) == 0) // [!code --]
				if (EClass.rnd(3) != 0) // [!code ++]
				{
					if (IsFestival("olvina"))
					{
```

[`public Thing CreateStock()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/Trait.cs#L2369-L2375)
```cs:line-numbers=2369
					}
					if (IsFestival("noyel"))
					{
						return Create(new string[9] { "1127", "1128", "xmas_sled", "xmas_bigbag", "xmas_bigbox", "xmas_blackcat", "xmas_blackcat", "xmas_jure", "xmas_crown" }.RandomItem()); // [!code --]
						return Create(new string[13] // [!code ++]
						{ // [!code ++]
							"1127", "1128", "xmas_sled", "xmas_bigbag", "xmas_bigbox", "xmas_blackcat", "xmas_blackcat", "xmas_jure", "xmas_crown", "xmas_ball", // [!code ++]
							"xmas_ball", "xmas_ball", "xmas_string" // [!code ++]
						}.RandomItem()); // [!code ++]
					}
				}
				if (EClass.rnd(2) == 0)
```

## +TraitASMR

::: details File Created
```cs
using System;

public class TraitASMR : Trait
{
	public int tick;

	public override bool HaveUpdate => true;

	public override void Update()
	{
		if (IsOn)
		{
			tick++;
			string[] source = Lang.Get("_ASMR").Split(Environment.NewLine.ToCharArray());
			if (tick % 5 == 0)
			{
				owner.TalkRaw(source.RandomItem());
			}
		}
	}
}
```

:::
## Zone_Nymelle

[`public override void OnBeforeSimulate()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/e78f9e7cf8da236607eeceea9f1ce960abdf809e/Elin/Zone_Nymelle.cs#L104-L109)
```cs:line-numbers=104
	if (IsCrystalLv)
	{
		Chara chara = EClass.game.cards.globalCharas.Find("fiama");
		if (chara == null) // [!code ++]
		{ // [!code ++]
			EClass.ui.Say("Possible mod bug: 404 Fiama Not Found"); // [!code ++]
			chara = CharaGen.Create("fiama"); // [!code ++]
			chara.SetGlobal(); // [!code ++]
		} // [!code ++]
		chara.MoveHome(EClass._zone, 43, 67);
		chara.AddEditorTag(EditorTag.AINoMove);
	}
```
