---
exclude: true
aside: false
footer: false
editLink: false
lastUpdated: false
description: 26 files modified. 1 new file created.
version: EA 23.61 hotfix 1
changes: AI_Fuck/AI_Sleep/AI_UseCrafter/ActEffect/AttackProcess/BaseTileMap/Card/Chara/DNA/FactionBranch/GoalGraze/GoalSleep/Hobby/ListPeopleBed/Region/SpawnSetting/ThingContainer/TraitBed/TraitCrafter/+TraitFortuneBall/TraitMoongateEx/TraitObj/TraitRollingFortune/Widget/WidgetDate/Zone/ZonePreEnterEncounter
---

# EA 23.61 hotfix 1

December 19, 2024

26 files modified. 1 new file created.

## Breaking Changes

Click the file name to view the chunk.
### [AI_Fuck (2)](#ai_fuck)
```cs:no-line-numbers
public override void OnCancel() // [!code --]

```
```cs:no-line-numbers
public override void OnSuccess() // [!code --]

```
### [SpawnSetting (1)](#spawnsetting)
```cs:no-line-numbers
public static SpawnSetting Mob(string id, int fixedLv = -1) // [!code --]
public static SpawnSetting Mob(string id, string idEle = null, int fixedLv = -1) // [!code ++]
```
## AI_Fuck

[`@@ -279,14 +279,4 @@ static void SuccubusExp(Chara c, Chara tg)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/AI_Fuck.cs#L279)
```cs:line-numbers=279
			}
		}
	}
 // [!code --]
	public override void OnCancel() // [!code --]
	{ // [!code --]
		Debug.Log("Cancel"); // [!code --]
	} // [!code --]
 // [!code --]
	public override void OnSuccess() // [!code --]
	{ // [!code --]
		Debug.Log("SUCCESS"); // [!code --]
	} // [!code --]
}
```

## AI_Sleep

[`@@ -7,10 +7,12 @@ public override void OnProgressComplete()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/AI_Sleep.cs#L7)
```cs:line-numbers=7
		if (!owner.CanSleep())
		{
			Msg.Say((EClass._zone.events.GetEvent<ZoneEventQuest>() != null) ? "badidea" : "notSleepy");
			return; // [!code ++]
		}
		else // [!code --]
		if (base.target != null && !owner.pos.Equals(base.target.pos)) // [!code ++]
		{
			owner.Sleep(base.target); // [!code --]
			owner._Move(base.target.pos); // [!code ++]
		}
		owner.Sleep(base.target); // [!code ++]
	}
}
```

## AI_UseCrafter

[`@@ -69,6 +69,7 @@ public void OnEnd()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/AI_UseCrafter.cs#L69)
```cs:line-numbers=69
		{
			layer.OnEndCraft();
		}
		crafter.OnEndAI(this); // [!code ++]
	}

	public override IEnumerable<Status> Run()
```

## ActEffect

[`@@ -998,6 +998,7 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/ActEffect.cs#L998)
```cs:line-numbers=998
			if (num4 < 0 || num4 > 10000000)
			{
				num4 = 10000000;
				flag3 = false; // [!code ++]
			}
			if (flag3)
			{
```

## AttackProcess

[`@@ -405,7 +405,7 @@ public bool Perform(int count, bool hasHit, float dmgMulti = 1f, bool maxRoll =`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/AttackProcess.cs#L405)
```cs:line-numbers=405
		num = Dice.RollMax(dNum, dDim, dBonus);
		if (ammo != null && !flag)
		{
			num += Dice.RollMax(dNumAmmo, dDimAmmo); // [!code --]
			num += Dice.RollMax(dNumAmmo, dDimAmmo, dBonusAmmo); // [!code ++]
		}
		if (crit && (IsMartial || IsMartialWeapon))
		{
```

[`@@ -458,6 +458,10 @@ public bool Perform(int count, bool hasHit, float dmgMulti = 1f, bool maxRoll =`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/AttackProcess.cs#L458)
```cs:line-numbers=458
	{
		SourceRace.Row race = TC.Chara.race;
		bane = CC.Evalue(468);
		if (IsRanged) // [!code ++]
		{ // [!code ++]
			bane += toolRange.owner.Evalue(468); // [!code ++]
		} // [!code ++]
		AddBane(race.IsUndead, 461);
		AddBane(race.IsAnimal, 463);
		AddBane(race.IsHuman, 464);
```

[`@@ -683,6 +687,10 @@ void AddBane(bool valid, int idEle)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/AttackProcess.cs#L683)
```cs:line-numbers=683
	{
		if (valid)
		{
			if (IsRanged) // [!code ++]
			{ // [!code ++]
				bane += toolRange.owner.Evalue(idEle); // [!code ++]
			} // [!code ++]
			bane += CC.Evalue(idEle);
		}
	}
```

## BaseTileMap

[`@@ -2591,7 +2591,7 @@ public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/BaseTileMap.cs#L2591)
```cs:line-numbers=2591
							liquidLv = 0;
						}
					}
					else if (!flag11 && t.trait.IsChangeFloorHeight) // [!code --]
					else if (!flag11 && t.trait.IsChangeFloorHeight && !t.ignoreStackHeight) // [!code ++]
					{
						orgY += num25 + (float)t.altitude * altitudeFix.y;
						orgZ += (float)t.altitude * altitudeFix.z;
```

## Card

[`@@ -3647,13 +3647,16 @@ public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Card.cs#L3647)
```cs:line-numbers=3647
	int num5 = Mathf.Clamp(dmg * 6 / MaxHP, 0, 4) + ((dmg > 0) ? 1 : 0);
	if (Evalue(1421) > 0)
	{
		int num6 = dmg; // [!code --]
		int num6 = 0; // [!code ++]
		int num7 = dmg; // [!code ++]
		if (hp > 0)
		{
			num6 = dmg - hp; // [!code --]
			num7 = dmg - hp; // [!code ++]
			hp -= dmg;
			num6 += dmg; // [!code ++]
			if (hp < 0 && Chara.mana.value >= 0)
			{
				num6 += hp; // [!code ++]
				hp = 0;
			}
		}
```

[`@@ -3661,19 +3664,22 @@ public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Card.cs#L3661)
```cs:line-numbers=3661
		{
			if (Evalue(1421) >= 2)
			{
				num6 /= 2; // [!code --]
				num7 /= 2; // [!code ++]
			}
			dmg = num6; // [!code --]
			dmg = num7; // [!code ++]
			if (Chara.mana.value > 0)
			{
				num6 -= Chara.mana.value; // [!code --]
				num7 -= Chara.mana.value; // [!code ++]
				Chara.mana.value -= dmg;
				num6 += dmg; // [!code ++]
			}
			if (Chara.mana.value <= 0)
			{
				hp -= num6; // [!code --]
				hp -= num7; // [!code ++]
				num6 += num7; // [!code ++]
			}
		}
		dmg = num6; // [!code ++]
	}
	else
	{
```

[`@@ -3693,9 +3699,9 @@ public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Card.cs#L3693)
```cs:line-numbers=3693
				if (e != Element.Void)
				{
					c2 = EClass.Colors.elementColors.TryGetValue(e.source.alias);
					float num7 = (c2.r + c2.g + c2.b) / 3f; // [!code --]
					num7 = ((num7 > 0.5f) ? 0f : (0.6f - num7)); // [!code --]
					c2 = new Color(c2.r + num7, c2.g + num7, c2.b + num7, 1f); // [!code --]
					float num8 = (c2.r + c2.g + c2.b) / 3f; // [!code ++]
					num8 = ((num8 > 0.5f) ? 0f : (0.6f - num8)); // [!code ++]
					c2 = new Color(c2.r + num8, c2.g + num8, c2.b + num8, 1f); // [!code ++]
				}
				popper.SetText(dmg.ToString() ?? "", c2);
			}
```

[`@@ -3763,7 +3769,7 @@ public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Card.cs#L3763)
```cs:line-numbers=3763
					if (EClass.player.invlunerable)
					{
						EvadeDeath();
						goto IL_095f; // [!code --]
						goto IL_0992; // [!code ++]
					}
				}
				if (IsPC && Evalue(1220) > 0 && Chara.stamina.value >= Chara.stamina.max / 2)
```

[`@@ -3775,8 +3781,8 @@ public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Card.cs#L3775)
```cs:line-numbers=3775
			}
		}
	}
	goto IL_095f; // [!code --]
	IL_095f: // [!code --]
	goto IL_0992; // [!code ++]
	IL_0992: // [!code ++]
	if (trait.CanBeAttacked)
	{
		renderer.PlayAnime(AnimeID.HitObj);
```

[`@@ -3906,8 +3912,8 @@ public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Card.cs#L3906)
```cs:line-numbers=3906
	}
	else if (isChara)
	{
		int num8 = ((attackSource != AttackSource.Condition && attackSource != AttackSource.WeaponEnchant) ? 1 : 2); // [!code --]
		if (num5 >= num8) // [!code --]
		int num9 = ((attackSource != AttackSource.Condition && attackSource != AttackSource.WeaponEnchant) ? 1 : 2); // [!code ++]
		if (num5 >= num9) // [!code ++]
		{
			if (e != Element.Void)
			{
```

[`@@ -3946,29 +3952,29 @@ public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Card.cs#L3946)
```cs:line-numbers=3946
		}
		if (origin.HasElement(662) && attackSource == AttackSource.Melee && origin.isChara && Chara.IsHostile(origin as Chara))
		{
			int num9 = EClass.rnd(3 + Mathf.Clamp(dmg / 100, 0, origin.Evalue(662) / 10)); // [!code --]
			origin.Chara.stamina.Mod(num9); // [!code --]
			int num10 = EClass.rnd(3 + Mathf.Clamp(dmg / 100, 0, origin.Evalue(662) / 10)); // [!code ++]
			origin.Chara.stamina.Mod(num10); // [!code ++]
			if (IsAliveInCurrentZone)
			{
				Chara.stamina.Mod(-num9); // [!code --]
				Chara.stamina.Mod(-num10); // [!code ++]
			}
		}
		if (origin.HasElement(1350) && attackSource == AttackSource.Melee)
		{
			int num10 = EClass.rndHalf(2 + Mathf.Clamp(dmg / 10, 0, origin.Chara.GetPietyValue() + 10)); // [!code --]
			origin.Chara.mana.Mod(num10); // [!code --]
			int num11 = EClass.rndHalf(2 + Mathf.Clamp(dmg / 10, 0, origin.Chara.GetPietyValue() + 10)); // [!code ++]
			origin.Chara.mana.Mod(num11); // [!code ++]
			if (IsAliveInCurrentZone)
			{
				Chara.mana.Mod(-num10); // [!code --]
				Chara.mana.Mod(-num11); // [!code ++]
			}
		}
		if (origin.HasElement(661) && attackSource == AttackSource.Melee)
		{
			int num11 = EClass.rnd(2 + Mathf.Clamp(dmg / 10, 0, origin.Evalue(661) + 10)); // [!code --]
			origin.Chara.mana.Mod(num11); // [!code --]
			int num12 = EClass.rnd(2 + Mathf.Clamp(dmg / 10, 0, origin.Evalue(661) + 10)); // [!code ++]
			origin.Chara.mana.Mod(num12); // [!code ++]
			if (IsAliveInCurrentZone)
			{
				Chara.mana.Mod(-num11); // [!code --]
				Chara.mana.Mod(-num12); // [!code ++]
			}
		}
	}
```

[`@@ -3986,15 +3992,15 @@ public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Card.cs#L3986)
```cs:line-numbers=3986
			elements.ModExp(123, a3);
		}
	}
	int num12 = ((EClass.rnd(2) == 0) ? 1 : 0); // [!code --]
	int num13 = ((EClass.rnd(2) == 0) ? 1 : 0); // [!code ++]
	if (attackSource == AttackSource.Condition)
	{
		num12 = 1 + EClass.rnd(2); // [!code --]
		num13 = 1 + EClass.rnd(2); // [!code ++]
	}
	if (num12 > 0) // [!code --]
	if (num13 > 0) // [!code ++]
	{
		bool flag = Chara.HasCondition<ConPoison>() || ((e.id == 915 || e.id == 923) && ResistLv(Evalue(955)) < 4);
		AddBlood(num12, flag ? 6 : (-1)); // [!code --]
		AddBlood(num13, flag ? 6 : (-1)); // [!code ++]
	}
	bool flag2 = true;
	switch (e.id)
```

[`@@ -4150,14 +4156,14 @@ public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Card.cs#L4150)
```cs:line-numbers=4150
	}
	if (IsPC)
	{
		float num13 = (float)hp / (float)MaxHP; // [!code --]
		float num14 = (float)hp / (float)MaxHP; // [!code ++]
		if (Evalue(1421) > 0)
		{
			num13 = (float)Chara.mana.value / (float)Chara.mana.max; // [!code --]
			num14 = (float)Chara.mana.value / (float)Chara.mana.max; // [!code ++]
		}
		if (num13 < 0.3f) // [!code --]
		if (num14 < 0.3f) // [!code ++]
		{
			PlaySound("heartbeat", 1f - num13 * 2f); // [!code --]
			PlaySound("heartbeat", 1f - num14 * 2f); // [!code ++]
		}
	}
	if (!IsPC && hp < MaxHP / 5 && Evalue(423) <= 0 && dmg * 100 / MaxHP + 10 > EClass.rnd(IsPowerful ? 400 : 150) && !HasCondition<ConFear>())
```

## Chara

[`@@ -1338,7 +1338,7 @@ public override void OnCreate(int genLv)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Chara.cs#L1338)
```cs:line-numbers=1338
			string[] array = mainElement[i].Split('/');
			SourceElement.Row row = EClass.sources.elements.alias["ele" + array[0]];
			int num2 = source.LV * row.eleP / 100 + base.LV - source.LV;
			if (list.Count == 0 || num2 < genLv) // [!code --]
			if (list.Count == 0 || num2 < genLv || array[0] == bp.idEle) // [!code ++]
			{
				list.Add(new Tuple<string, int, int>(array[0], (array.Length > 1) ? int.Parse(array[1]) : 0, num2));
			}
```

[`@@ -1346,7 +1346,7 @@ public override void OnCreate(int genLv)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Chara.cs#L1346)
```cs:line-numbers=1346
		Tuple<string, int, int> tuple = list.RandomItemWeighted((Tuple<string, int, int> a) => 10000 / (100 + (genLv - a.Item3) * 25));
		if (!bp.idEle.IsEmpty())
		{
			tuple = list.Where((Tuple<string, int, int> a) => a.Item1 == bp.idEle).First(); // [!code --]
			tuple = list.Where((Tuple<string, int, int> a) => a.Item1 == bp.idEle).FirstOrDefault() ?? tuple; // [!code ++]
		}
		SetMainElement(tuple.Item1, (tuple.Item2 == 0) ? 10 : tuple.Item2, elemental: true);
		if (list.Count >= 2)
```

[`@@ -5852,7 +5852,7 @@ public override void SetRenderParam(RenderParam p)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Chara.cs#L5852)
```cs:line-numbers=5852
	else if (sourceCard._tiles.Length > 1)
	{
		int num2 = ((base.idSkin != 0 || source.staticSkin) ? base.idSkin : (base.uid % sourceCard._tiles.Length / 2 * 2 + ((!base.IsMale) ? 1 : 0)));
		p.tile = sourceCard._tiles[(num2 < sourceCard._tiles.Length) ? num2 : 0] * ((!flipX) ? 1 : (-1)); // [!code --]
		p.tile = sourceCard._tiles[(num2 >= 0 && num2 < sourceCard._tiles.Length) ? num2 : 0] * ((!flipX) ? 1 : (-1)); // [!code ++]
	}
	else
	{
```

[`@@ -6347,7 +6347,7 @@ public TraitBed FindBed()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Chara.cs#L6347)
```cs:line-numbers=6347

	public TraitBed TryAssignBed()
	{
		if (memberType == FactionMemberType.Livestock || (!IsPCFaction && !IsGuest())) // [!code --]
		if (!IsPCFaction && !IsGuest()) // [!code ++]
		{
			return null;
		}
```

[`@@ -8385,10 +8385,6 @@ public void Cure(CureType type, int p = 100, BlessedState state = BlessedState.N`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Chara.cs#L8385)
```cs:line-numbers=8385
		}
		CureCondition<ConWait>();
		CureCondition<ConSleep>();
		if (type == CureType.Death && hunger.value > 30) // [!code --]
		{ // [!code --]
			hunger.value = 30; // [!code --]
		} // [!code --]
		if (type == CureType.Jure)
		{
			SAN.Mod(-999);
```

## DNA

[`@@ -244,6 +244,7 @@ public void Generate(Type _type, Chara model = null)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/DNA.cs#L244)
```cs:line-numbers=244
	int body = 0;
	int action = 0;
	int feat = 0;
	int maxSlot = 1; // [!code ++]
	List<Element> listAttb = model.elements.ListBestAttributes();
	List<Element> listSkill = model.elements.ListBestSkills();
	List<Element> listFeat = model.elements.ListGeneFeats();
```

[`@@ -336,7 +337,14 @@ void AddFeat()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/DNA.cs#L336)
```cs:line-numbers=336
		{
			feat++;
			Element e = listFeat.RandomItem();
			AddVal(e.id, 1, allowStack: false, (int v) => e.source.cost[0] * 5); // [!code --]
			if (maxSlot <= 1 || e.source.geneSlot <= 1) // [!code ++]
			{ // [!code ++]
				if (e.source.geneSlot > maxSlot) // [!code ++]
				{ // [!code ++]
					maxSlot = e.source.geneSlot; // [!code ++]
				} // [!code ++]
				AddVal(e.id, 1, allowStack: false, (int v) => e.source.cost[0] * 5); // [!code ++]
			} // [!code ++]
		}
	}
	void AddRandom(int n)
```

## FactionBranch

[`@@ -287,7 +287,7 @@ public void OnAfterSimulate()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/FactionBranch.cs#L287)
```cs:line-numbers=287
	}
	foreach (Chara chara in EClass._map.charas)
	{
		if (!chara.IsPCParty && !chara.noMove && (chara.pos.cell.IsBlocked || chara.pos.cell.hasDoor) && !chara.isRestrained && !chara.HasCondition<ConSuspend>()) // [!code --]
		if (!chara.IsPCParty && !chara.noMove && (chara.pos.cell.HasBlock || chara.pos.cell.hasDoor) && !chara.isRestrained && !chara.HasCondition<ConSuspend>()) // [!code ++]
		{
			chara.MoveImmediate(chara.pos.GetNearestPoint(allowBlock: false, allowChara: false) ?? chara.pos);
		}
```

## GoalGraze

[`@@ -14,7 +14,6 @@ public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/GoalGraze.cs#L14)
```cs:line-numbers=14

	public Point GetPos()
	{
		owner.ClearBed(); // [!code --]
		Thing thing = null;
		Rand.SetSeed(owner.uid);
		if (thing == null)
```

## GoalSleep

[`@@ -54,7 +54,7 @@ public override void OnSimulatePosition()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/GoalSleep.cs#L54)
```cs:line-numbers=54
	{
		owner.TryAssignBed();
	}
	if (bed != null && !bed.pos.HasChara) // [!code --]
	if (bed != null) // [!code ++]
	{
		owner.MoveImmediate(bed.pos);
		return;
```

## Hobby

[`@@ -44,10 +44,13 @@ public int GetEfficiency(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Hobby.cs#L44)
```cs:line-numbers=44
		{
			return 0;
		}
		TraitBed traitBed = c.FindBed(); // [!code --]
		if (traitBed != null) // [!code --]
		if (c.memberType != FactionMemberType.Livestock) // [!code ++]
		{
			num += 30 + traitBed.owner.GetTotalQuality() + traitBed.owner.Evalue(750); // [!code --]
			TraitBed traitBed = c.FindBed(); // [!code ++]
			if (traitBed != null) // [!code ++]
			{ // [!code ++]
				num += 30 + traitBed.owner.GetTotalQuality() + traitBed.owner.Evalue(750); // [!code ++]
			} // [!code ++]
		}
	}
	if (source.alias == "Breeding")
```

## ListPeopleBed

[`@@ -2,6 +2,8 @@ public class ListPeopleBed : ListPeople`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/ListPeopleBed.cs#L2)
```cs:line-numbers=2
{
	public TraitBed bed;

	public BedType bedType => bed.owner.c_bedType; // [!code ++]
 // [!code ++]
	public override void OnInstantiate(Chara c, ItemGeneral i)
	{
		UIButton uIButton = i.AddSubButton(EClass.core.refs.icons.bed, delegate
```

[`@@ -37,12 +39,23 @@ public override void OnList()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/ListPeopleBed.cs#L37)
```cs:line-numbers=37
{
	foreach (Chara chara in EClass._map.charas)
	{
		if (!chara.IsPCFaction || chara.memberType != 0) // [!code --]
		if (!chara.IsPCFaction || (chara.memberType != 0 && chara.memberType != FactionMemberType.Livestock)) // [!code ++]
		{
			continue;
		}
		if (main)
		{
			if (bedType == BedType.livestock) // [!code ++]
			{ // [!code ++]
				if (chara.memberType != FactionMemberType.Livestock) // [!code ++]
				{ // [!code ++]
					continue; // [!code ++]
				} // [!code ++]
			} // [!code ++]
			else if (chara.memberType == FactionMemberType.Livestock) // [!code ++]
			{ // [!code ++]
				continue; // [!code ++]
			} // [!code ++]
			if (!bed.IsHolder(chara))
			{
				list.Add(chara);
```

## Region

[`@@ -308,7 +308,7 @@ public override void OnAdvanceHour()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Region.cs#L308)
```cs:line-numbers=308
			}
		}
	}
	if (ListMobs().Count >= 6 || EClass.rnd(3) != 0) // [!code --]
	if (ListMobs().Count >= (EClass.debug.enable ? 100 : 6) || EClass.rnd(3) != 0) // [!code ++]
	{
		return;
	}
```

## SpawnSetting

[`@@ -16,6 +16,8 @@ public class SpawnSetting`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/SpawnSetting.cs#L16)
```cs:line-numbers=16

	public string id;

	public string idEle; // [!code ++]
 // [!code ++]
	public Rarity rarity = Rarity.Random;

	public SpawnHostility hostility = SpawnHostility.Enemy;
```

[`@@ -63,11 +65,12 @@ public static SpawnSetting Encounter(int lv)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/SpawnSetting.cs#L63)
```cs:line-numbers=63
		};
	}

	public static SpawnSetting Mob(string id, int fixedLv = -1) // [!code --]
	public static SpawnSetting Mob(string id, string idEle = null, int fixedLv = -1) // [!code ++]
	{
		return new SpawnSetting
		{
			id = id,
			idEle = idEle, // [!code ++]
			fixedLv = fixedLv
		};
	}
```

## ThingContainer

[`@@ -790,17 +790,18 @@ public List<Thing> List(Func<Thing, bool> func, bool onlyAccessible = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/ThingContainer.cs#L790)
```cs:line-numbers=790

	public void _List(Func<Thing, bool> func, bool onlyAccessible = false)
	{
		if (onlyAccessible && !owner.trait.CanSearchContents) // [!code ++]
		{ // [!code ++]
			return; // [!code ++]
		} // [!code ++]
		using Enumerator enumerator = GetEnumerator();
		while (enumerator.MoveNext())
		{
			Thing current = enumerator.Current;
			if (!onlyAccessible || !(current.parent is Card) || (current.parent as Card).c_lockLv <= 0) // [!code --]
			current.things._List(func, onlyAccessible); // [!code ++]
			if (func(current)) // [!code ++]
			{
				current.things._List(func, onlyAccessible); // [!code --]
				if (func(current)) // [!code --]
				{ // [!code --]
					tempList.Add(current); // [!code --]
				} // [!code --]
				tempList.Add(current); // [!code ++]
			}
		}
	}
```

## TraitBed

[`@@ -54,7 +54,7 @@ public override void TrySetAct(ActPlan p)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/TraitBed.cs#L54)
```cs:line-numbers=54
				SE.Play("jingle_embark");
			});
		}
		if (owner.c_bedType == BedType.resident || owner.c_bedType == BedType.residentOne) // [!code --]
		if (owner.c_bedType == BedType.resident || owner.c_bedType == BedType.residentOne || owner.c_bedType == BedType.livestock) // [!code ++]
		{
			uIContextMenu.AddButton("assignBed", delegate
			{
```

[`@@ -65,17 +65,15 @@ public override void TrySetAct(ActPlan p)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/TraitBed.cs#L65)
```cs:line-numbers=65
		{
			BedType.resident,
			BedType.residentOne,
			BedType.livestock, // [!code ++]
			BedType.guest
		})
		{
			if (t != BedType.livestock && t != BedType.patient) // [!code --]
			uIContextMenu.AddButton(((t == owner.c_bedType) ? "context_checker".lang() : "") + ("bed_" + t).lang(), delegate // [!code ++]
			{
				uIContextMenu.AddButton(((t == owner.c_bedType) ? "context_checker".lang() : "") + ("bed_" + t).lang(), delegate // [!code --]
				{ // [!code --]
					SetBedType(t); // [!code --]
					SE.ClickOk(); // [!code --]
				}); // [!code --]
			} // [!code --]
				SetBedType(t); // [!code ++]
				SE.ClickOk(); // [!code ++]
			}); // [!code ++]
		}
		CursorSystem.ignoreCount = 5;
		uIContextMenu.Show();
```

## TraitCrafter

[`@@ -461,4 +461,8 @@ public override bool OnUse(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/TraitCrafter.cs#L461)
```cs:line-numbers=461
		LayerDragGrid.CreateCraft(this);
		return false;
	}
 // [!code ++]
	public virtual void OnEndAI(AI_UseCrafter ai) // [!code ++]
	{ // [!code ++]
	} // [!code ++]
}
```

## +TraitFortuneBall

::: details File Created
```cs
public class TraitFortuneBall : Trait
{
}
```

:::
## TraitMoongateEx

[`@@ -19,6 +19,7 @@ public override bool OnUse(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/TraitMoongateEx.cs#L19)
```cs:line-numbers=19
			MapMetaData metaData = Map.GetMetaData(item.FullName);
			if (metaData != null && metaData.IsValidVersion())
			{
				metaData.path = item.FullName; // [!code ++]
				list.Add(metaData);
			}
		}
```

[`@@ -28,13 +29,45 @@ public override bool OnUse(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/TraitMoongateEx.cs#L28)
```cs:line-numbers=28
			EClass.pc.SayNothingHappans();
			return false;
		}
		EClass.ui.AddLayer<LayerList>().SetList2(list, (MapMetaData a) => a.name, delegate(MapMetaData a, ItemGeneral b) // [!code --]
		LayerList layer = null; // [!code ++]
		bool skipDialog = false; // [!code ++]
		layer = EClass.ui.AddLayer<LayerList>().SetList2(list, (MapMetaData a) => a.name, delegate(MapMetaData a, ItemGeneral b) // [!code ++]
		{
			LoadMap(a);
		}, delegate // [!code --]
		}, delegate(MapMetaData a, ItemGeneral b) // [!code ++]
		{
			b.AddSubButton(EClass.core.refs.icons.trash, delegate // [!code ++]
			{ // [!code ++]
				if (skipDialog) // [!code ++]
				{ // [!code ++]
					func(); // [!code ++]
				} // [!code ++]
				else // [!code ++]
				{ // [!code ++]
					Dialog.Choice("dialogDeleteGame", delegate(Dialog d) // [!code ++]
					{ // [!code ++]
						d.AddButton("yes".lang(), delegate // [!code ++]
						{ // [!code ++]
							func(); // [!code ++]
						}); // [!code ++]
						d.AddButton("yesAndSkip".lang(), delegate // [!code ++]
						{ // [!code ++]
							func(); // [!code ++]
							skipDialog = true; // [!code ++]
						}); // [!code ++]
						d.AddButton("no".lang()); // [!code ++]
					}); // [!code ++]
				} // [!code ++]
			}); // [!code ++]
			void func() // [!code ++]
			{ // [!code ++]
				IO.DeleteFile(a.path); // [!code ++]
				list.Remove(a); // [!code ++]
				layer.list.List(); // [!code ++]
				SE.Trash(); // [!code ++]
			} // [!code ++]
		}).SetSize(500f)
			.SetTitles("wMoongate"); // [!code --]
			.SetTitles("wMoongate") as LayerList; // [!code ++]
		return false;
	}
}
```

## TraitObj

[`@@ -1,6 +1,4 @@`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/TraitObj.cs#L1)
```cs:line-numbers=1
public class TraitObj : TraitTile
{
	public override TileRow source => EClass.sources.objs.rows[owner.refVal];
 // [!code --]
	public override bool CanBeOnlyBuiltInHome => true; // [!code --]
}
```

## TraitRollingFortune

[`@@ -14,4 +14,16 @@ public override int GetDuration(AI_UseCrafter ai, int costSp)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/TraitRollingFortune.cs#L14)
```cs:line-numbers=14
	{
		return GetSource(ai).time;
	}
 // [!code ++]
	public override void OnEndAI(AI_UseCrafter ai) // [!code ++]
	{ // [!code ++]
		if (EClass.pc.isDead || !owner.ExistsOnMap) // [!code ++]
		{ // [!code ++]
			return; // [!code ++]
		} // [!code ++]
		foreach (Card item in owner.pos.ListThings<TraitFortuneBall>(onlyInstalled: false)) // [!code ++]
		{ // [!code ++]
			EClass.pc.Pick(item.Thing, msg: false); // [!code ++]
		} // [!code ++]
	} // [!code ++]
}
```

## Widget

[`@@ -332,11 +332,14 @@ public virtual void OnManagerActivate()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Widget.cs#L332)
```cs:line-numbers=332
	goCover = Util.Instantiate("UI/Widget/CoverWidget", base.transform).gameObject;
	RectTransform rectTransform = goCover.transform.Rect();
	RectTransform rectTransform2 = dragPanel.Rect();
	rectTransform.pivot = rectTransform2.pivot; // [!code --]
	rectTransform.anchorMin = rectTransform2.anchorMin; // [!code --]
	rectTransform.anchorMax = rectTransform2.anchorMax; // [!code --]
	rectTransform.anchoredPosition = rectTransform2.anchoredPosition; // [!code --]
	rectTransform.sizeDelta = rectTransform2.sizeDelta; // [!code --]
	if ((bool)rectTransform && (bool)rectTransform2) // [!code ++]
	{ // [!code ++]
		rectTransform.pivot = rectTransform2.pivot; // [!code ++]
		rectTransform.anchorMin = rectTransform2.anchorMin; // [!code ++]
		rectTransform.anchorMax = rectTransform2.anchorMax; // [!code ++]
		rectTransform.anchoredPosition = rectTransform2.anchoredPosition; // [!code ++]
		rectTransform.sizeDelta = rectTransform2.sizeDelta; // [!code ++]
	} // [!code ++]
	UIDragPanel componentInChildren = goCover.GetComponentInChildren<UIDragPanel>();
	componentInChildren.autoAnchor = config.userAnchor == RectPosition.Auto;
	componentInChildren.onDrag = OnChangePosition;
```

## WidgetDate

[`@@ -117,6 +117,10 @@ public void _Refresh()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/WidgetDate.cs#L117)
```cs:line-numbers=117
	{
		text += item2.TextWidgetDate;
	}
	if (EMono.debug.enable) // [!code ++]
	{ // [!code ++]
		text += " *DEBUG MODE*"; // [!code ++]
	} // [!code ++]
	textTime.text = text;
	rectClock.SetActive(extra.clock);
	if (extra.clock)
```

## Zone

[`@@ -2511,7 +2511,8 @@ public Chara SpawnMob(Point pos = null, SpawnSetting setting = null)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/Zone.cs#L2511)
```cs:line-numbers=2511
	int dangerLv = DangerLv;
	CardBlueprint cardBlueprint = new CardBlueprint
	{
		rarity = Rarity.Normal // [!code --]
		rarity = Rarity.Normal, // [!code ++]
		idEle = setting.idEle // [!code ++]
	};
	int num = ((setting.filterLv == -1) ? dangerLv : setting.filterLv);
	if (ScaleMonsterLevel)
```

## ZonePreEnterEncounter

[`@@ -24,7 +24,7 @@ public override void Execute()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/c0ebf95b518e7a5aaf01b6aefd2b682ab5cb87ea/Elin/ZonePreEnterEncounter.cs#L24)
```cs:line-numbers=24
			Point randomPointInRadius = EClass.pc.pos.GetRandomPointInRadius(2, 5, requireLos: false, allowChara: false);
			if (randomPointInRadius != null)
			{
				Chara chara = EClass._zone.SpawnMob(randomPointInRadius, SpawnSetting.Mob(mob.id)); // [!code --]
				Chara chara = EClass._zone.SpawnMob(randomPointInRadius, SpawnSetting.Mob(mob.id, (mob.MainElement == Element.Void) ? null : mob.MainElement.source.alias.Substring(3))); // [!code ++]
				Hostility hostility2 = (chara.c_originalHostility = Hostility.Enemy);
				chara.hostility = hostility2;
				chara.enemy = EClass.pc.party.members.RandomItem();
```

<style scoped>.vp-doc h1,.vp-doc h2,.vp-doc h3,.vp-doc h4,.vp-doc h5,.vp-doc h6 {text-transform: none;} .h3 {}</style>