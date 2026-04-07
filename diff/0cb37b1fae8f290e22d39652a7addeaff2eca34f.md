---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 17 files modified.
version: EA 23.292 Nightly
changes: AI_Fuck/ActEffect/Affinity/Card/CardActor/CardRenderer/Chara/ConStrife/ConTransmuteHuman/Core/DramaCustomSequence/EffectId/RenderRow/SpriteData/SpriteReplacer/Trait/TraitMerchantTravel
---

# EA 23.292 Nightly

April 7, 2026

17 files modified.

## Important Changes

Possible breaking changes. Click the filename to view the chunk.
### [ConStrife (1)](#constrife)
```cs:no-line-numbers
private ElementContainer ec = new ElementContainer(); // [!code --]
private ElementContainer ec = new ElementContainerCondition(); // [!code ++]
```
### [SpriteData (3)](#spritedata)
```cs:no-line-numbers
public Sprite[] GetSprites() // [!code --]

```
```cs:no-line-numbers
public Sprite GetSprite(bool snow = false) // [!code --]
public void LoadAnimationIni() // [!code ++]
```
```cs:no-line-numbers
public void Load(bool dateMatched, ref Texture2D tex, ref Sprite[] sprites, string suffix) // [!code --]
public void Load() // [!code ++]
```
### [SpriteReplacer (1)](#spritereplacer)
```cs:no-line-numbers
public bool HasSprite(string id, RenderData renderData = null) // [!code --]
public Sprite GetSprite(string suffix = "") // [!code ++]
```
## AI_Fuck

[`public enum Variation`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/AI_Fuck.cs#L17-L23)
```cs:line-numbers=17
		NTR,
		Bloodsuck,
		Slime,
		Tentacle // [!code --]
		Tentacle, // [!code ++]
		MotherMilk // [!code ++]
	}

	public Variation variation;
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/AI_Fuck.cs#L142-L147)
```cs:line-numbers=142
		switch (Type)
		{
		case FuckType.fuck:
		{ // [!code ++]
			if (this.variation == Variation.NTR)
			{
				cc.Say("ntr", cc, tc);
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/AI_Fuck.cs#L154-L171)
```cs:line-numbers=154
				cc.renderer.PlayAnime(AnimeID.Attack, tc);
				if (EClass.rnd(3) == 0 || sell)
				{
					cc.Talk("tail"); // [!code --]
					if (cc.IsPC && this.variation == Variation.MotherMilk) // [!code ++]
					{ // [!code ++]
						EClass.player.forceTalk = true; // [!code ++]
					} // [!code ++]
					cc.Talk((this.variation == Variation.MotherMilk) ? "play_baby" : "tail"); // [!code ++]
				}
				break;
			case 2:
				tc.renderer.PlayAnime(AnimeID.Shiver);
				if (EClass.rnd(3) == 0)
				{
					tc.Talk("tailed"); // [!code --]
					if (tc.IsPC && this.variation == Variation.MotherMilk) // [!code ++]
					{ // [!code ++]
						EClass.player.forceTalk = true; // [!code ++]
					} // [!code ++]
					tc.Talk((this.variation == Variation.MotherMilk) ? "play_mama" : "tailed"); // [!code ++]
				}
				break;
			}
			if (((cc.HasElement(1216) || tc.HasElement(1216)) ? 100 : 20) > EClass.rnd(100)) // [!code --]
			int num5 = ((cc.HasElement(1216) || tc.HasElement(1216)) ? 100 : 20); // [!code ++]
			if (this.variation == Variation.MotherMilk) // [!code ++]
			{ // [!code ++]
				num5 *= 5; // [!code ++]
			} // [!code ++]
			if (num5 > EClass.rnd(100)) // [!code ++]
			{
				((EClass.rnd(2) == 0) ? cc : tc).PlayEffect("love2");
			}
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/AI_Fuck.cs#L189-L194)
```cs:line-numbers=189
				owner.pos.TryWitnessCrime(cc, tc, 4, (Chara c) => EClass.rnd(cc.HasCondition<ConTransmuteBat>() ? 50 : 20) == 0);
			}
			break;
		} // [!code ++]
		case FuckType.tame:
		{
			int num = 100;
```

## ActEffect

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L1135-L1150)
```cs:line-numbers=1135
		}
		List<Chara> list2 = new List<Chara>();
		bool flag4 = false;
		foreach (Chara chara2 in EClass._map.charas) // [!code --]
		foreach (Chara chara3 in EClass._map.charas) // [!code ++]
		{
			if (!chara2.IsPCFactionOrMinion && chara2.id == (flag3 ? "cat_silver" : "littleOne")) // [!code --]
			if (!chara3.IsPCFactionOrMinion && chara3.id == (flag3 ? "cat_silver" : "littleOne")) // [!code ++]
			{
				if (flag4)
				{
					flag4 = false;
					continue;
				}
				list2.Add(chara2); // [!code --]
				list2.Add(chara3); // [!code ++]
				flag4 = true;
			}
		}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L1684-L1694)
```cs:line-numbers=1684
			}
			if (id == EffectId.Gate && CC.IsPC)
			{
				foreach (Chara chara3 in EClass._map.charas) // [!code --]
				foreach (Chara chara4 in EClass._map.charas) // [!code ++]
				{
					if (!chara3.HasHost && chara3 != tc && (chara3.IsPCParty || chara3.IsPCPartyMinion)) // [!code --]
					if (!chara4.HasHost && chara4 != tc && (chara4.IsPCParty || chara4.IsPCPartyMinion)) // [!code ++]
					{
						chara3.Teleport(tc.pos.GetNearestPoint(allowBlock: false, allowChara: false) ?? tc.pos); // [!code --]
						chara4.Teleport(tc.pos.GetNearestPoint(allowBlock: false, allowChara: false) ?? tc.pos); // [!code ++]
					}
				}
			}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L1718-L1732)
```cs:line-numbers=1718
		break;
	case EffectId.StripBlessing:
	{
		List<Condition> list4 = new List<Condition>(); // [!code --]
		List<Condition> list6 = new List<Condition>(); // [!code ++]
		foreach (Condition condition4 in TC.conditions)
		{
			if (GetBlessingDifficulty(condition4) > 0 && EClass.rnd(GetBlessingDifficulty(condition4)) == 0)
			{
				list4.Add(condition4); // [!code --]
				list6.Add(condition4); // [!code ++]
			}
		}
		if (list4.Count == 0) // [!code --]
		if (list6.Count == 0) // [!code ++]
		{
			CC.SayNothingHappans();
			break;
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L1734-L1742)
```cs:line-numbers=1734
		TC.pos.PlayEffect("holyveil");
		TC.pos.PlaySound("holyveil");
		TC.Say("unpolluted", TC);
		list4.Shuffle(); // [!code --]
		list6.Shuffle(); // [!code ++]
		{
			foreach (Condition item5 in list4) // [!code --]
			foreach (Condition item5 in list6) // [!code ++]
			{
				item5.Kill();
				if (CC.IsHostile(TC))
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L1753-L1767)
```cs:line-numbers=1753
		{
			break;
		}
		int num14 = 0; // [!code --]
		int num11 = 0; // [!code ++]
		foreach (Condition condition5 in TC.conditions)
		{
			if (condition5.Type == ConditionType.Debuff)
			{
				num14++; // [!code --]
				num11++; // [!code ++]
			}
		}
		if (num14 == 0) // [!code --]
		if (num11 == 0) // [!code ++]
		{
			CC.SayNothingHappans();
			break;
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L1778-L1791)
```cs:line-numbers=1778
		});
		TC.Say("abShutterHex", TC);
		Point center = CC.pos.Copy();
		List<Chara> list10 = TC.pos.ListCharasInRadius(TC, 4, (Chara c) => c == TC || c.IsHostile(CC)); // [!code --]
		for (int m = 0; m < num14; m++) // [!code --]
		List<Chara> list4 = TC.pos.ListCharasInRadius(TC, 4, (Chara c) => c == TC || c.IsHostile(CC)); // [!code ++]
		for (int k = 0; k < num11; k++) // [!code ++]
		{
			TweenUtil.Delay((float)m * 0.1f, delegate // [!code --]
			TweenUtil.Delay((float)k * 0.1f, delegate // [!code ++]
			{
				center.PlaySound("shutterhex");
			});
			foreach (Chara item6 in list10) // [!code --]
			foreach (Chara item6 in list4) // [!code ++]
			{
				if (item6.ExistsOnMap)
				{
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L1794-L1805)
```cs:line-numbers=1794
					Color startColor = (componentInChildren.endColor = EClass.Colors.elementColors["eleHoly"]);
					componentInChildren.startColor = startColor;
					Point pos = item6.pos.Copy();
					TweenUtil.Delay((float)m * 0.1f, delegate // [!code --]
					TweenUtil.Delay((float)k * 0.1f, delegate // [!code ++]
					{
						effect.Play(center, 0f, pos);
					});
					int num15 = Dice.Create("SpShutterHex", power, CC, (actRef.refThing != null) ? null : actRef.act).Roll(); // [!code --]
					item6.DamageHP(num15, 919, power, AttackSource.None, CC, showEffect: false); // [!code --]
					int num12 = Dice.Create("SpShutterHex", power, CC, (actRef.refThing != null) ? null : actRef.act).Roll(); // [!code ++]
					item6.DamageHP(num12, 919, power, AttackSource.None, CC, showEffect: false); // [!code ++]
				}
			}
		}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L1855-L1861)
```cs:line-numbers=1855
			break;
		}
		Thing thing7 = null;
		bool flag11 = actRef.n1 == "food"; // [!code --]
		bool flag10 = actRef.n1 == "food"; // [!code ++]
		if (actRef.n1 == "money")
		{
			int currency = TC.GetCurrency();
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L1869-L1879)
```cs:line-numbers=1869
		else
		{
			Func<Thing, bool> func = (Thing t) => true;
			if (flag11) // [!code --]
			if (flag10) // [!code ++]
			{
				func = (Thing t) => t.IsFood;
			}
			List<Thing> list9 = TC.things.List(delegate(Thing t) // [!code --]
			List<Thing> list10 = TC.things.List(delegate(Thing t) // [!code ++]
			{
				if (t.parentCard?.trait is TraitChestMerchant || t.trait is TraitTool || t.IsThrownWeapon)
				{
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L1881-L1889)
```cs:line-numbers=1881
				}
				return t.trait.CanBeDestroyed && t.things.Count == 0 && t.invY != 1 && t.trait.CanBeStolen && !t.trait.CanOnlyCarry && !t.IsUnique && !t.isEquipped && t.blessedState == BlessedState.Normal && func(t);
			}, onlyAccessible: true);
			if (list9.Count > 0) // [!code --]
			if (list10.Count > 0) // [!code ++]
			{
				thing7 = list9.RandomItem(); // [!code --]
				thing7 = list10.RandomItem(); // [!code ++]
				if (thing7.Num > 1)
				{
					thing7 = thing7.Split(1);
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2027-L2044)
```cs:line-numbers=2027
				text3 = text4;
			}
		}
		Condition condition = Condition.Create(text3, power, delegate(Condition con) // [!code --]
		Condition condition2 = Condition.Create(text3, power, delegate(Condition con) // [!code ++]
		{
			if (!actRef.aliasEle.IsEmpty())
			{
				con.SetElement(EClass.sources.elements.alias[actRef.aliasEle].id);
			}
		});
		condition.isPerfume = TC.IsPC && actRef.isPerfume; // [!code --]
		Condition condition2 = TC.AddCondition(condition); // [!code --]
		if (condition2 != null && condition2.isPerfume) // [!code --]
		condition2.isPerfume = TC.IsPC && actRef.isPerfume; // [!code ++]
		Condition condition3 = TC.AddCondition(condition2); // [!code ++]
		if (condition3 != null && condition3.isPerfume) // [!code ++]
		{
			condition2.value = 3; // [!code --]
			condition3.value = 3; // [!code ++]
			Msg.Say("perfume", TC);
		}
		if (!text4.IsEmpty())
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2051-L2062)
```cs:line-numbers=2051
	{
		EClass.game.religions.Trickery.Talk("ability");
		bool hex = CC.IsHostile(TC);
		List<SourceStat.Row> list7 = EClass.sources.stats.rows.Where((SourceStat.Row con) => con.tag.Contains("random") && con.group == (hex ? "Debuff" : "Buff")).ToList(); // [!code --]
		List<SourceStat.Row> list8 = EClass.sources.stats.rows.Where((SourceStat.Row con) => con.tag.Contains("random") && con.group == (hex ? "Debuff" : "Buff")).ToList(); // [!code ++]
		int power2 = power;
		for (int k = 0; k < 4 + EClass.rnd(2); k++) // [!code --]
		for (int l = 0; l < 4 + EClass.rnd(2); l++) // [!code ++]
		{
			SourceStat.Row row2 = list7.RandomItem(); // [!code --]
			list7.Remove(row2); // [!code --]
			SourceStat.Row row2 = list8.RandomItem(); // [!code ++]
			list8.Remove(row2); // [!code ++]
			Proc(hex ? EffectId.DebuffKizuami : EffectId.Buff, CC, TC, power2, new ActRef
			{
				n1 = row2.alias
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2079-L2091)
```cs:line-numbers=2079
			power = power * 2 / 3;
		}
		int a2 = power;
		int num12 = TC.WIL * (isPowerful ? 20 : 5); // [!code --]
		ConHolyVeil condition3 = TC.GetCondition<ConHolyVeil>(); // [!code --]
		if (condition3 != null) // [!code --]
		int num13 = TC.WIL * (isPowerful ? 20 : 5); // [!code ++]
		ConHolyVeil condition = TC.GetCondition<ConHolyVeil>(); // [!code ++]
		if (condition != null) // [!code ++]
		{
			num12 += condition3.power * 5; // [!code --]
			num13 += condition.power * 5; // [!code ++]
		}
		if (id != EffectId.DebuffKizuami && EClass.rnd(a2) < num12 / EClass.sources.stats.alias[n].hexPower && EClass.rnd(10) != 0) // [!code --]
		if (id != EffectId.DebuffKizuami && EClass.rnd(a2) < num13 / EClass.sources.stats.alias[n].hexPower && EClass.rnd(10) != 0) // [!code ++]
		{
			TC.Say("debuff_resist", TC);
			CC.DoHostileAction(TC);
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2124-L2137)
```cs:line-numbers=2124
	case EffectId.Ally:
	{
		Msg.Say("gainAlly");
		Chara chara = CharaGen.CreateFromFilter("chara", cc.LV); // [!code --]
		EClass._zone.AddCard(chara, cc.pos.GetNearestPoint(allowBlock: false, allowChara: false)); // [!code --]
		Chara chara2 = CharaGen.CreateFromFilter("chara", cc.LV); // [!code ++]
		EClass._zone.AddCard(chara2, cc.pos.GetNearestPoint(allowBlock: false, allowChara: false)); // [!code ++]
		if (cc.IsPCFactionOrMinion)
		{
			chara.MakeAlly(msg: false); // [!code --]
			chara2.MakeAlly(msg: false); // [!code ++]
		}
		chara.PlaySound("identify"); // [!code --]
		chara.PlayEffect("teleport"); // [!code --]
		chara2.PlaySound("identify"); // [!code ++]
		chara2.PlayEffect("teleport"); // [!code ++]
		break;
	}
	case EffectId.Wish:
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2192-L2207)
```cs:line-numbers=2192
		tc.bio.SetGender(gender2);
		tc.Say("transGender", tc, Gender.Name(tc.bio.gender));
		tc.Talk("tail");
		int age3 = tc.bio.GetAge(tc.Chara); // [!code --]
		if (blessed && age3 > 1) // [!code --]
		int age2 = tc.bio.GetAge(tc.Chara); // [!code ++]
		if (blessed && age2 > 1) // [!code ++]
		{
			tc.Say("ageDown", tc);
			tc.bio.SetAge(tc.Chara, age3 - 1); // [!code --]
			tc.bio.SetAge(tc.Chara, age2 - 1); // [!code ++]
		}
		else if (flag)
		{
			tc.Say("ageUp", tc);
			tc.bio.SetAge(tc.Chara, age3 + 1); // [!code --]
			tc.bio.SetAge(tc.Chara, age2 + 1); // [!code ++]
		}
		break;
	}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2209-L2228)
```cs:line-numbers=2209
	{
		tc.PlaySound("mutation");
		tc.PlayEffect("mutation");
		int num13 = ((actRef.refThing != null) ? actRef.refThing.GetInt(118) : actRef.refVal); // [!code --]
		if (num13 == 0) // [!code --]
		int num10 = ((actRef.refThing != null) ? actRef.refThing.GetInt(118) : actRef.refVal); // [!code ++]
		if (num10 == 0) // [!code ++]
		{
			num13 = tc.GetInt(118); // [!code --]
			if (num13 == 0) // [!code --]
			num10 = tc.GetInt(118); // [!code ++]
			if (num10 == 0) // [!code ++]
			{
				num13 = EClass.game.seed + tc.uid; // [!code --]
				num10 = EClass.game.seed + tc.uid; // [!code ++]
			}
			num13++; // [!code --]
			num10++; // [!code ++]
		}
		tc.Say("transBlood", tc);
		tc.Talk("tail");
		tc.c_bloodData = null;
		tc.SetInt(118, num13); // [!code --]
		tc.SetInt(118, num10); // [!code ++]
		break;
	}
	case EffectId.Youth:
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2249-L2255)
```cs:line-numbers=2249
			tc.SayNothingHappans();
			break;
		}
		int age2 = tc.bio.GetAge(tc.Chara); // [!code --]
		int age3 = tc.bio.GetAge(tc.Chara); // [!code ++]
		if (flag)
		{
			if (tc.c_lockedAge != 0)
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2257-L2263)
```cs:line-numbers=2257
				tc.Say("eternalYouth2", tc);
				tc.c_lockedAge = 0;
				tc.elements.Remove(1243);
				tc.bio.SetAge(tc.Chara, age2); // [!code --]
				tc.bio.SetAge(tc.Chara, age3); // [!code ++]
			}
			Redirect(EffectId.Youth, BlessedState.Cursed, default(ActRef));
		}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2269-L2275)
```cs:line-numbers=2269
		{
			tc.PlaySound("dropRewardXmas");
			tc.Say("eternalYouth1", tc);
			tc.c_lockedAge = age2 + 1; // [!code --]
			tc.c_lockedAge = age3 + 1; // [!code ++]
			tc.elements.SetBase(1243, 1);
			if (blessed)
			{
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2313-L2328)
```cs:line-numbers=2313
		break;
	case EffectId.Revive:
	{
		List<KeyValuePair<int, Chara>> list8 = EClass.game.cards.globalCharas.Where((KeyValuePair<int, Chara> a) => a.Value.isDead && a.Value.faction == EClass.pc.faction && !a.Value.isSummon && a.Value.c_wasInPcParty).ToList(); // [!code --]
		List<KeyValuePair<int, Chara>> list9 = EClass.game.cards.globalCharas.Where((KeyValuePair<int, Chara> a) => a.Value.isDead && a.Value.faction == EClass.pc.faction && !a.Value.isSummon && a.Value.c_wasInPcParty).ToList(); // [!code ++]
		if (TC.IsPCFaction || TC.IsPCFactionMinion)
		{
			if (TC.IsPC && list8.Count == 0) // [!code --]
			if (TC.IsPC && list9.Count == 0) // [!code ++]
			{
				list8 = EClass.game.cards.globalCharas.Where((KeyValuePair<int, Chara> a) => a.Value.CanRevive() && a.Value.isDead && a.Value.faction == EClass.pc.faction && !a.Value.isSummon).ToList(); // [!code --]
				list9 = EClass.game.cards.globalCharas.Where((KeyValuePair<int, Chara> a) => a.Value.CanRevive() && a.Value.isDead && a.Value.faction == EClass.pc.faction && !a.Value.isSummon).ToList(); // [!code ++]
			}
			if (list8.Count > 0) // [!code --]
			if (list9.Count > 0) // [!code ++]
			{
				list8.RandomItem().Value.Chara.GetRevived(); // [!code --]
				list9.RandomItem().Value.Chara.GetRevived(); // [!code ++]
				break;
			}
		}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2337-L2348)
```cs:line-numbers=2337
	{
		bool flag12 = id == EffectId.DamageBody || id == EffectId.DamageBodyGreat;
		bool mind2 = id == EffectId.DamageMind || id == EffectId.DamageMindGreat;
		int num11 = ((id == EffectId.DamageBody || id == EffectId.DamageMind) ? 1 : (4 + EClass.rnd(4))); // [!code --]
		int num15 = ((id == EffectId.DamageBody || id == EffectId.DamageMind) ? 1 : (4 + EClass.rnd(4))); // [!code ++]
		if (id == EffectId.Weaken)
		{
			flag12 = EClass.rnd(2) == 0;
			mind2 = !flag12;
			num11 = 1; // [!code --]
			num15 = 1; // [!code ++]
		}
		else
		{
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2350-L2356)
```cs:line-numbers=2350
			TC.PlaySound("debuff");
		}
		TC.Say(flag12 ? "damageBody" : "damageMind", TC);
		for (int l = 0; l < num11; l++) // [!code --]
		for (int m = 0; m < num15; m++) // [!code ++]
		{
			TC.DamageTempElements(power, flag12, mind2, id != EffectId.Weaken);
		}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2380-L2398)
```cs:line-numbers=2380
	case EffectId.RestoreBody:
	case EffectId.RestoreMind:
	{
		bool flag10 = id == EffectId.RestoreBody; // [!code --]
		bool flag11 = id == EffectId.RestoreBody; // [!code ++]
		if (flag)
		{
			Redirect(flag10 ? EffectId.DamageBodyGreat : EffectId.DamageMindGreat, BlessedState.Normal, default(ActRef)); // [!code --]
			Redirect(flag11 ? EffectId.DamageBodyGreat : EffectId.DamageMindGreat, BlessedState.Normal, default(ActRef)); // [!code ++]
			break;
		}
		TC.Say(flag10 ? "restoreBody" : "restoreMind", TC); // [!code --]
		TC.Say(flag11 ? "restoreBody" : "restoreMind", TC); // [!code ++]
		TC.PlaySound("heal");
		TC.PlayEffect("heal");
		TC.CureHost(flag10 ? CureType.CureBody : CureType.CureMind, power, state); // [!code --]
		TC.CureHost(flag11 ? CureType.CureBody : CureType.CureMind, power, state); // [!code ++]
		if (blessed)
		{
			Redirect(flag10 ? EffectId.EnhanceBodyGreat : EffectId.EnhanceMindGreat, BlessedState.Normal, default(ActRef)); // [!code --]
			Redirect(flag11 ? EffectId.EnhanceBodyGreat : EffectId.EnhanceMindGreat, BlessedState.Normal, default(ActRef)); // [!code ++]
		}
		break;
	}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2408-L2424)
```cs:line-numbers=2408
		{
			EClass.game.religions.Healing.Talk("ability");
		}
		int num10 = Dice.Create((actRef.act != null && EClass.sources.calc.map.ContainsKey(actRef.act.ID)) ? actRef.act.ID : "SpHealLight", power, CC, (actRef.refThing != null) ? null : actRef.act).Roll(); // [!code --]
		int num9 = Dice.Create((actRef.act != null && EClass.sources.calc.map.ContainsKey(actRef.act.ID)) ? actRef.act.ID : "SpHealLight", power, CC, (actRef.refThing != null) ? null : actRef.act).Roll(); // [!code ++]
		if (actRef.refThing != null)
		{
			num10 = num10 * (100 + actRef.refThing.Evalue(750) * 10) / 100; // [!code --]
			num9 = num9 * (100 + actRef.refThing.Evalue(750) * 10) / 100; // [!code ++]
		}
		if (flag)
		{
			TC.DamageHP(num10 / 2, 919, power); // [!code --]
			TC.DamageHP(num9 / 2, 919, power); // [!code ++]
			break;
		}
		TC.HealHPHost(num10, (actRef.refThing == null && id != EffectId.JureHeal) ? HealSource.Magic : HealSource.Item); // [!code --]
		TC.HealHPHost(num9, (actRef.refThing == null && id != EffectId.JureHeal) ? HealSource.Magic : HealSource.Item); // [!code ++]
		TC.CureHost(CureType.Heal, power, state);
		TC.Say((power >= 300) ? "heal_heavy" : "heal_light", TC);
		break;
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2468-L2473)
```cs:line-numbers=2468
			TC.ModCorruption(-power * (blessed ? 150 : 200) / 100);
		}
		break;
	case EffectId.Degenerate: // [!code ++]
	{ // [!code ++]
		if (TC == null || TC.HasCondition<ConTransmuteHuman>()) // [!code ++]
		{ // [!code ++]
			CC.SayNothingHappans(); // [!code ++]
			break; // [!code ++]
		} // [!code ++]
		Chara chara = CharaGen.Create("baby"); // [!code ++]
		if (!TC.Aka.IsEmpty()) // [!code ++]
		{ // [!code ++]
			chara.c_altName = TC.c_altName ?? TC.source.GetName(TC); // [!code ++]
		} // [!code ++]
		TC.AddCondition(Condition.Create(power, delegate(ConTransmuteHuman con) // [!code ++]
		{ // [!code ++]
			con.chara = chara; // [!code ++]
		})); // [!code ++]
		break; // [!code ++]
	} // [!code ++]
	case EffectId.Drink:
	case EffectId.DrinkRamune:
	case EffectId.DrinkMilk:
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2523-L2530)
```cs:line-numbers=2523
		if (TC.HasElement(1211))
		{
			TC.Say("drinkSaltWater_snail", TC);
			int num9 = ((TC.hp > 10) ? (TC.hp - EClass.rnd(10)) : 10000); // [!code --]
			TC.DamageHP(num9, AttackSource.None, CC); // [!code --]
			int num14 = ((TC.hp > 10) ? (TC.hp - EClass.rnd(10)) : 10000); // [!code ++]
			TC.DamageHP(num14, AttackSource.None, CC); // [!code ++]
		}
		else if (TC.IsPC)
		{
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ActEffect.cs#L2690-L2699)
```cs:line-numbers=2690
		{
			power /= 4;
		}
		List<Thing> list6 = TC.things.List((Thing t) => (t.Num <= 1 && t.IsEquipmentOrRanged && !t.IsToolbelt && !t.IsLightsource && t.isEquipped) ? true : false); // [!code --]
		if (list6.Count != 0) // [!code --]
		List<Thing> list7 = TC.things.List((Thing t) => (t.Num <= 1 && t.IsEquipmentOrRanged && !t.IsToolbelt && !t.IsLightsource && t.isEquipped) ? true : false); // [!code ++]
		if (list7.Count != 0) // [!code ++]
		{
			Thing thing6 = list6.RandomItem(); // [!code --]
			Thing thing6 = list7.RandomItem(); // [!code ++]
			TC.Say("acid_hit", TC);
			if (thing6.isAcidproof)
			{
```

## Affinity

[`public bool CanInvite()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Affinity.cs#L62-L67)
```cs:line-numbers=62
		return true;
	}

	public bool CanBecomeMama() // [!code ++]
	{ // [!code ++]
		return CurrentStage >= Stage.Respected; // [!code ++]
	} // [!code ++]
 // [!code ++]
	public bool CanGiveCard()
	{
		return CurrentStage >= Stage.Love;
```

## Card

[`public void DamageHP(long dmg, int ele, int eleP = 100, AttackSource attackSourc`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Card.cs#L4374-L4383)
```cs:line-numbers=4374
		dmg = 0L;
	}
	long num9 = 99999999L;
	ConStrife condition = GetCondition<ConStrife>(); // [!code --]
	if (condition != null) // [!code --]
	if (origin != null && (attackSource == AttackSource.Melee || attackSource == AttackSource.Range)) // [!code ++]
	{
		num9 = num9 * (100 + condition.lv * 5) / 100; // [!code --]
		ConStrife condition = origin.GetCondition<ConStrife>(); // [!code ++]
		if (condition != null) // [!code ++]
		{ // [!code ++]
			num9 = num9 * (100 + condition.lv * 5) / 100; // [!code ++]
		} // [!code ++]
	}
	if (dmg > num9)
	{
```

[`public void DamageHP(long dmg, int ele, int eleP = 100, AttackSource attackSourc`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Card.cs#L4495-L4501)
```cs:line-numbers=4495
							Chara.AddCondition<ConFractured>((int)Mathf.Max(10f, 30f - Mathf.Sqrt(Evalue(436))));
							hp = Mathf.Min(half * (int)Mathf.Sqrt(Evalue(436) * 2) / 100, MaxHP / 3);
						});
						goto IL_1092; // [!code --]
						goto IL_10b3; // [!code ++]
					}
				}
				if (zoneInstanceBout != null && (bool)LayerDrama.Instance)
```

[`public void DamageHP(long dmg, int ele, int eleP = 100, AttackSource attackSourc`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Card.cs#L4523-L4529)
```cs:line-numbers=4523
						if (EClass.player.invlunerable)
						{
							EvadeDeath(null);
							goto IL_1092; // [!code --]
							goto IL_10b3; // [!code ++]
						}
					}
					if (Evalue(1220) > 0 && Chara.stamina.value >= (IsPC ? (Chara.stamina.max / 2) : (Chara.stamina.max / 3 * 2)))
```

[`public void DamageHP(long dmg, int ele, int eleP = 100, AttackSource attackSourc`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Card.cs#L4541-L4548)
```cs:line-numbers=4541
			}
		}
	}
	goto IL_1092; // [!code --]
	IL_1092: // [!code --]
	goto IL_10b3; // [!code ++]
	IL_10b3: // [!code ++]
	if (trait.CanBeAttacked)
	{
		renderer.PlayAnime(AnimeID.HitObj);
```

[`void ProcAbsorb()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Card.cs#L4907-L4939)
```cs:line-numbers=4907
	{
		if (origin != null && origin.isChara && isChara && (weapon == null || !weapon.HasElement(486)))
		{
			int valueOrDefault = (origin.Evalue(662) + weapon?.Evalue(662, ignoreGlobalElement: true)).GetValueOrDefault(); // [!code --]
			int valueOrDefault2 = (origin.Evalue(661) + weapon?.Evalue(661, ignoreGlobalElement: true)).GetValueOrDefault(); // [!code --]
			if (valueOrDefault > 0 && attackSource == AttackSource.Melee && origin.isChara && !origin.Chara.ignoreSPAbsorb && Chara.IsHostile(origin as Chara)) // [!code --]
			int num18 = origin.Evalue(662) + (weapon?.Evalue(662, ignoreGlobalElement: true) ?? 0); // [!code ++]
			int num19 = origin.Evalue(661) + (weapon?.Evalue(661, ignoreGlobalElement: true) ?? 0); // [!code ++]
			if (num18 != 0) // [!code ++]
			{ // [!code ++]
				Debug.Log(num18); // [!code ++]
			} // [!code ++]
			if (num18 > 0 && attackSource == AttackSource.Melee && origin.isChara && !origin.Chara.ignoreSPAbsorb && Chara.IsHostile(origin as Chara)) // [!code ++]
			{
				int num18 = EClass.rnd(3 + (int)Mathf.Clamp(dmg / 100, 0f, valueOrDefault / 10)); // [!code --]
				origin.Chara.stamina.Mod(num18); // [!code --]
				int num20 = EClass.rnd(3 + (int)Mathf.Clamp(dmg / 100, 0f, num18 / 10)); // [!code ++]
				origin.Chara.stamina.Mod(num20); // [!code ++]
				if (IsAliveInCurrentZone)
				{
					Chara.stamina.Mod(-num18); // [!code --]
					Chara.stamina.Mod(-num20); // [!code ++]
				}
			}
			if (origin.HasElement(1350) && attackSource == AttackSource.Melee)
			{
				int num19 = EClass.rndHalf(2 + (int)Mathf.Clamp(dmg / 10, 0f, origin.Chara.GetPietyValue() + 10)); // [!code --]
				origin.Chara.mana.Mod(num19); // [!code --]
				int num21 = EClass.rndHalf(2 + (int)Mathf.Clamp(dmg / 10, 0f, origin.Chara.GetPietyValue() + 10)); // [!code ++]
				origin.Chara.mana.Mod(num21); // [!code ++]
				if (IsAliveInCurrentZone)
				{
					Chara.mana.Mod(-num19); // [!code --]
					Chara.mana.Mod(-num21); // [!code ++]
				}
			}
			if (valueOrDefault2 > 0 && attackSource == AttackSource.Melee) // [!code --]
			if (num19 > 0 && attackSource == AttackSource.Melee) // [!code ++]
			{
				int num20 = EClass.rnd(2 + (int)Mathf.Clamp(dmg / 10, 0f, valueOrDefault2 + 10)); // [!code --]
				origin.Chara.mana.Mod(num20); // [!code --]
				int num22 = EClass.rnd(2 + (int)Mathf.Clamp(dmg / 10, 0f, num19 + 10)); // [!code ++]
				origin.Chara.mana.Mod(num22); // [!code ++]
				if (IsAliveInCurrentZone)
				{
					Chara.mana.Mod(-num20); // [!code --]
					Chara.mana.Mod(-num22); // [!code ++]
				}
			}
		}
```

[`public void SpawnLoot(Card origin)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Card.cs#L5486-L5492)
```cs:line-numbers=5486
					}
				}
			}
			if (trait is TraitMerchantTravel) // [!code --]
			if (trait is TraitMerchantTravel && !EClass._zone.IsFestival) // [!code ++]
			{
				trait.OnBarter();
				Thing thing4 = things.Find<TraitChestMerchant>();
```

[`public void Talk(string idTopic, string ref1 = null, string ref2 = null, bool fo`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Card.cs#L6988-L7000)
```cs:line-numbers=6988
	GameLang.refDrama1 = ref1;
	GameLang.refDrama2 = ref2;
	string text = GetTalkText(idTopic, stripPun: true);
	if (HasElement(1232) && idTopic != "baby") // [!code --]
	ConTransmuteHuman condition = GetCondition<ConTransmuteHuman>(); // [!code ++]
	if ((HasElement(1232) || (condition != null && condition.IsBaby)) && idTopic != "baby") // [!code ++]
	{
		BackerContent.GakiConvert(ref text, "babu");
	}
	else
	{
		switch (id) // [!code --]
		switch ((condition != null) ? condition.chara.id : id) // [!code ++]
		{
		case "adv_gaki":
			BackerContent.GakiConvert(ref text);
```

[`public void Say(string lang, Card c1, string ref1 = null, string ref2 = null)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Card.cs#L7118-L7124)
```cs:line-numbers=7118
public string GetTalkText(string idTopic, bool stripPun = false, bool useDefault = true)
{
	bool flag = isChara && Chara.IsHumanSpeak;
	string text = MOD.listTalk.GetTalk(c_idTalk.IsEmpty(id), idTopic, useDefault, flag); // [!code --]
	ConTransmuteHuman condition = GetCondition<ConTransmuteHuman>(); // [!code ++]
	string text = MOD.listTalk.GetTalk((condition != null) ? condition.chara.id : c_idTalk.IsEmpty(id), idTopic, useDefault, flag); // [!code ++]
	if (!text.IsEmpty())
	{
		text = text.Split('|').RandomItem();
```

## CardActor

[`public virtual void OnRender(RenderParam p)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/CardActor.cs#L199-L223)
```cs:line-numbers=199
			mpb2.SetFloat("_Liquid", destLiquid);
			sr2.SetPropertyBlock(mpb2);
		}
		if (owner.sourceCard.replacer.data == null) // [!code --]
		SpriteReplacer replacer = owner.sourceCard.replacer; // [!code ++]
		if (!replacer.HasSprite(owner.sourceCard.idSprite, data)) // [!code ++]
		{
			return;
		}
		SpriteData data2 = owner.sourceCard.replacer.data; // [!code --]
		if (data2.frame <= 1) // [!code --]
		SpriteData spriteData = replacer.data; // [!code ++]
		if (p.snow && replacer.suffixes.TryGetValue("_snow", out var value)) // [!code ++]
		{ // [!code ++]
			spriteData = value; // [!code ++]
		} // [!code ++]
		if (spriteData.frame <= 1) // [!code ++]
		{
			return;
		}
		spriteTimer += Core.delta;
		if (spriteTimer >= data2.time) // [!code --]
		if (spriteTimer >= spriteData.time) // [!code ++]
		{
			spriteTimer -= data2.time; // [!code --]
			spriteTimer -= spriteData.time; // [!code ++]
			spriteIndex++;
			if (spriteIndex >= data2.frame) // [!code --]
			if (spriteIndex >= spriteData.frame) // [!code ++]
			{
				spriteIndex = 0;
			}
			sr.sprite = ((data2.spritesSnow != null && p.snow) ? data2.spritesSnow[spriteIndex] : data2.sprites[spriteIndex]); // [!code --]
			sr.sprite = spriteData.GetSprites()[spriteIndex]; // [!code ++]
		}
	}

```

## CardRenderer

[`public SourcePref GetPref()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/CardRenderer.cs#L782-L787)
```cs:line-numbers=782
		{
			return EClass.core.refs.prefs.pcc;
		}
		if (owner.sourceCard.replacer?.data?.pref != null) // [!code ++]
		{ // [!code ++]
			return owner.sourceCard.replacer.data.pref; // [!code ++]
		} // [!code ++]
		return owner.Pref;
	}
}
```

## Chara

[`public override Sprite GetSprite(int dir = 0)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Chara.cs#L6852-L6862)
```cs:line-numbers=6852
			pCC.Build();
			return pCC.variation.idle[0, 0];
		}
		if (spriteReplacer != null) // [!code --]
		int skin = 0; // [!code ++]
		if (sourceCard.tiles.Length > 1) // [!code ++]
		{
			return spriteReplacer.data.GetSprite(); // [!code --]
			skin = ((base.idSkin == 0 && !source.staticSkin) ? (base.uid % sourceCard.tiles.Length / 2 * 2 + ((!base.IsMale) ? 1 : 0)) : base.idSkin); // [!code ++]
		}
		return sourceCard.GetSprite(0, (sourceCard._tiles.Length > 1) ? ((base.idSkin != 0 || source.staticSkin) ? base.idSkin : (base.uid % sourceCard._tiles.Length / 2 * 2 + ((!base.IsMale) ? 1 : 0))) : 0); // [!code --]
		return sourceCard.GetSprite(0, skin, EClass.core.IsGameStarted && EClass._zone.IsSnowCovered); // [!code ++]
	}

	public void SetTempHand(int right = 0, int left = 0)
```

[`public override string GetHoverText2()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Chara.cs#L7104-L7110)
```cs:line-numbers=7104

	public string GetTopicText(string topic = "calm")
	{
		string key = source.idText.IsEmpty(id); // [!code --]
		ConTransmuteHuman condition = GetCondition<ConTransmuteHuman>(); // [!code ++]
		string key = ((condition == null) ? source : condition.chara.source).idText.IsEmpty((condition == null) ? id : condition.chara.id); // [!code ++]
		if (id == "littleOne" && EClass._zone is Zone_LittleGarden)
		{
			key = "littleOne2";
```

## ConStrife

[`public class ConStrife : BaseBuff`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ConStrife.cs#L5-L11)
```cs:line-numbers=5
public class ConStrife : BaseBuff
{
	[JsonProperty]
	private ElementContainer ec = new ElementContainer(); // [!code --]
	private ElementContainer ec = new ElementContainerCondition(); // [!code ++]

	[JsonProperty]
	public int exp;
```

[`public override void OnWriteNote(List<string> list)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ConStrife.cs#L141-L146)
```cs:line-numbers=141
	list.Add("hintStrife2".lang((lv * 10).ToString() ?? "", (lv * 5).ToString() ?? "").TagColorGoodBad(() => true));
	foreach (Element e in ec.dict.Values)
	{
		if (e.Value == 0) // [!code ++]
		{ // [!code ++]
			continue; // [!code ++]
		} // [!code ++]
		if (e.IsFlag)
		{
			list.Add(e.Name.TagColorGoodBad(() => e.Value >= 0));
```

## ConTransmuteHuman

[`public class ConTransmuteHuman : ConBaseTransmuteMimic`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ConTransmuteHuman.cs#L8-L13)
```cs:line-numbers=8

	public override Card Card => chara;

	public bool IsBaby => chara.HasElement(1232); // [!code ++]
 // [!code ++]
	public override bool HasDuration => false;

	public override bool ShouldRevealOnContact => false;
```

[`public override RendererReplacer GetRendererReplacer()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/ConTransmuteHuman.cs#L28-L52)
```cs:line-numbers=28

	public override void OnBeforeStart()
	{
		List<Chara> list = owner.pos.ListCharasInRadius(owner, 5, delegate(Chara c) // [!code --]
		if (chara == null) // [!code ++]
		{
			if (c.IsHumanSpeak) // [!code --]
			List<Chara> list = owner.pos.ListCharasInRadius(owner, 5, delegate(Chara c) // [!code ++]
			{
				CardRenderer renderer = c.renderer; // [!code --]
				if (renderer != null && !renderer.hasActor) // [!code --]
				if (c.IsHumanSpeak) // [!code ++]
				{
					return !c.HasElement(1427); // [!code --]
					CardRenderer renderer = c.renderer; // [!code ++]
					if (renderer != null && !renderer.hasActor) // [!code ++]
					{ // [!code ++]
						return !c.HasElement(1427); // [!code ++]
					} // [!code ++]
				}
				return false; // [!code ++]
			}); // [!code ++]
			if (list.Count > 0) // [!code ++]
			{ // [!code ++]
				chara = list.RandomItem().Duplicate(); // [!code ++]
			} // [!code ++]
			else // [!code ++]
			{ // [!code ++]
				chara = CharaGen.CreateFromFilter("c_guest"); // [!code ++]
			}
			return false; // [!code --]
		}); // [!code --]
		if (list.Count > 0) // [!code --]
		{ // [!code --]
			chara = list.RandomItem().Duplicate(); // [!code --]
		} // [!code --]
		else // [!code --]
		{ // [!code --]
			chara = CharaGen.CreateFromFilter("c_guest"); // [!code --]
		}
		base.OnBeforeStart();
	}
```

## Core

[`public void OnApplicationFocus(bool focus)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Core.cs#L443-L449)
```cs:line-numbers=443
					}
					foreach (CardRow row in sources.cards.rows)
					{
						if (row.replacer.isChecked && row.replacer.data != null) // [!code --]
						if (row.replacer.isChecked.GetValueOrDefault(row.idSprite) && row.replacer.data != null) // [!code ++]
						{
							row.replacer.data.GetSprite();
						}
```

## DramaCustomSequence

[`public void Build(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/DramaCustomSequence.cs#L208-L213)
```cs:line-numbers=208
			{
				Choice2(flag2 ? "daBird" : "daTail", "_tail");
			}
			ConTransmuteHuman condition = EClass.pc.GetCondition<ConTransmuteHuman>(); // [!code ++]
			if (condition != null && condition.IsBaby) // [!code ++]
			{ // [!code ++]
				Choice2("daMama", "_mama"); // [!code ++]
			} // [!code ++]
			if (c.trait.CanRevive)
			{
				Choice2("daRevive", "_revive").DisableSound();
```

[`public void Build(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/DramaCustomSequence.cs#L821-L826)
```cs:line-numbers=821
		});
		Choice("no2", StepDefault, cancel: true).SetOnClick(RumorChill);
	});
	Step("_mama"); // [!code ++]
	Method(delegate // [!code ++]
	{ // [!code ++]
		if (c.affinity.CanBecomeMama() || EClass.debug.enable) // [!code ++]
		{ // [!code ++]
			TempTalkTopic("mama_yes", StepEnd); // [!code ++]
			EClass.pc.SetAI(new AI_Fuck // [!code ++]
			{ // [!code ++]
				target = c, // [!code ++]
				variation = AI_Fuck.Variation.MotherMilk // [!code ++]
			}); // [!code ++]
		} // [!code ++]
		else // [!code ++]
		{ // [!code ++]
			TempTalkTopic("mama_no", StepDefault); // [!code ++]
			RumorChill(); // [!code ++]
		} // [!code ++]
	}); // [!code ++]
	Step("_whore");
	Method(delegate
	{
```

## EffectId

[`public enum EffectId`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/EffectId.cs#L138-L142)
```cs:line-numbers=138
	SilverCatMigration = 314,
	ChangeRarity = 315,
	ChangeAlias = 316,
	ChangeBiography = 317 // [!code --]
	ChangeBiography = 317, // [!code ++]
	Degenerate = 318 // [!code ++]
}
```

## RenderRow

[`public int ConvertTile(int tile)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/RenderRow.cs#L270-L285)
```cs:line-numbers=270

	public Sprite GetSprite(int dir = 0, int skin = 0, bool snow = false)
	{
		bool flag = this is SourceChara.Row; // [!code ++]
		if (replacer.HasSprite(idSprite, renderData))
		{
			return replacer.data.GetSprite(snow); // [!code --]
			foreach (string item in new List<string> // [!code ++]
			{ // [!code ++]
				$"_skin{skin}_dir{dir}", // [!code ++]
				$"_skin{skin}", // [!code ++]
				$"_dir{dir}", // [!code ++]
				"" // [!code ++]
			}) // [!code ++]
			{ // [!code ++]
				Sprite sprite = null; // [!code ++]
				if (snow) // [!code ++]
				{ // [!code ++]
					sprite = replacer.GetSprite(item + "_snow"); // [!code ++]
				} // [!code ++]
				if ((object)sprite == null) // [!code ++]
				{ // [!code ++]
					sprite = replacer.GetSprite(item); // [!code ++]
				} // [!code ++]
				if ((bool)sprite) // [!code ++]
				{ // [!code ++]
					return sprite; // [!code ++]
				} // [!code ++]
			} // [!code ++]
		}
		int[] array = null ?? _tiles;
		if (sprites == null)
		{
			sprites = new Sprite[(skins == null) ? 1 : (skins.Length + 1), (array.Length == 0) ? 1 : array.Length];
		}
		if (this is SourceChara.Row) // [!code --]
		if (flag) // [!code ++]
		{
			dir = skin;
			skin = 0;
```

## SpriteData

[`using System;`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/SpriteData.cs#L1-L5)
```cs:line-numbers=1
using System;
using System.Globalization; // [!code --]
using System.IO;
using System.Text;
using IniParser;
```

[``](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/SpriteData.cs#L8-L26)
```cs:line-numbers=8

public class SpriteData
{
	public DateTime date; // [!code --]
 // [!code --]
	public Texture2D tex; // [!code --]
 // [!code --]
	public Texture2D texSnow; // [!code --]
	public string id; // [!code ++]

	public string path;

	public Sprite[] sprites; // [!code --]
	public Texture2D tex; // [!code ++]

	public Sprite[] spritesSnow; // [!code --]
	public Sprite[] sprites; // [!code ++]

	public SourcePref pref; // [!code --]
	public DateTime date; // [!code ++]

	public int frame = 1;

```

[`public class SpriteData`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/SpriteData.cs#L28-L60)
```cs:line-numbers=28

	public float time = 0.2f;

	public SourcePref pref; // [!code ++]
 // [!code ++]
	public void Init()
	{
		try
		{
			if (File.Exists(path + ".ini")) // [!code --]
			{ // [!code --]
				IniData iniData = new FileIniDataParser().ReadFile(path + ".ini", Encoding.UTF8); // [!code --]
				frame = int.Parse(iniData.GetKey("frame") ?? "1"); // [!code --]
				scale = int.Parse(iniData.GetKey("scale") ?? "50"); // [!code --]
				time = float.Parse(iniData.GetKey("time") ?? "0.2", CultureInfo.InvariantCulture); // [!code --]
			} // [!code --]
			id = Path.GetFileNameWithoutExtension(path); // [!code ++]
			LoadAnimationIni(); // [!code ++]
			LoadPref(); // [!code ++]
		}
		catch (Exception message) // [!code --]
		catch (Exception exception) // [!code ++]
		{
			Debug.Log(message); // [!code --]
			Debug.Log("exception: Failed to parse:" + path + ".ini"); // [!code --]
			time = 0.2f; // [!code --]
			scale = 50; // [!code --]
			Debug.LogException(exception); // [!code ++]
			Debug.LogError("#sprite failed to init '" + id + "' at " + path); // [!code ++]
		}
	}

	public Sprite[] GetSprites() // [!code --]
	{ // [!code --]
		Validate(); // [!code --]
		return sprites; // [!code --]
	} // [!code --]
 // [!code --]
	public void LoadPref()
	{
		pref = null;
```

[`public void LoadPref()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/SpriteData.cs#L64-L123)
```cs:line-numbers=64
		}
	}

	public Sprite GetSprite(bool snow = false) // [!code --]
	public void LoadAnimationIni() // [!code ++]
	{
		Validate(); // [!code --]
		if (!snow || spritesSnow == null) // [!code --]
		if (!File.Exists(path + ".ini")) // [!code ++]
		{
			return sprites[0]; // [!code --]
			return; // [!code ++]
		}
		return spritesSnow[0]; // [!code --]
		try // [!code ++]
		{ // [!code ++]
			IniData iniData = new FileIniDataParser().ReadFile(path + ".ini", Encoding.UTF8); // [!code ++]
			if (!int.TryParse(iniData.GetKey("frame") ?? "1", out frame)) // [!code ++]
			{ // [!code ++]
				frame = 1; // [!code ++]
			} // [!code ++]
			if (!int.TryParse(iniData.GetKey("scale") ?? "50", out scale)) // [!code ++]
			{ // [!code ++]
				scale = 50; // [!code ++]
			} // [!code ++]
			if (!float.TryParse(iniData.GetKey("time") ?? "0.2", out time)) // [!code ++]
			{ // [!code ++]
				time = 0.2f; // [!code ++]
			} // [!code ++]
		} // [!code ++]
		catch (Exception exception) // [!code ++]
		{ // [!code ++]
			Debug.LogException(exception); // [!code ++]
			frame = 1; // [!code ++]
			scale = 50; // [!code ++]
			time = 0.2f; // [!code ++]
		} // [!code ++]
	} // [!code ++]
 // [!code ++]
	public Sprite[] GetSprites() // [!code ++]
	{ // [!code ++]
		Validate(); // [!code ++]
		return sprites; // [!code ++]
	} // [!code ++]
 // [!code ++]
	public Sprite GetSprite() // [!code ++]
	{ // [!code ++]
		Validate(); // [!code ++]
		return sprites[0]; // [!code ++]
	}

	public void Validate()
	{
		DateTime lastWriteTime = File.GetLastWriteTime(path + ".png");
		bool flag = date.Year != 1 && date == lastWriteTime; // [!code --]
		if (!flag) // [!code --]
		if (date.Year == 1 || !(date == lastWriteTime)) // [!code ++]
		{
			Load(flag, ref tex, ref sprites, ""); // [!code --]
			if (File.Exists(path + "_snow.png")) // [!code --]
			{ // [!code --]
				Load(flag, ref texSnow, ref spritesSnow, "_snow"); // [!code --]
			} // [!code --]
			Load(); // [!code ++]
			date = lastWriteTime;
		}
	}

	public void Load(bool dateMatched, ref Texture2D tex, ref Sprite[] sprites, string suffix) // [!code --]
	public void Load() // [!code ++]
	{
		if (dateMatched && (bool)tex) // [!code --]
		{ // [!code --]
			return; // [!code --]
		} // [!code --]
		if ((bool)tex)
		{
			Texture2D texture2D = IO.LoadPNG(path + suffix + ".png"); // [!code --]
			if (texture2D.width != tex.width || texture2D.height != tex.height) // [!code --]
			{ // [!code --]
				Debug.Log(texture2D.width + "/" + texture2D.height + "/" + path); // [!code --]
				tex.Reinitialize(texture2D.width, texture2D.height); // [!code --]
			} // [!code --]
			tex.SetPixels32(texture2D.GetPixels32()); // [!code --]
			tex.Apply(); // [!code --]
			UnityEngine.Object.Destroy(texture2D); // [!code --]
			UnityEngine.Object.Destroy(tex); // [!code ++]
		}
		else // [!code --]
		tex = IO.LoadPNG(path + ".png"); // [!code ++]
		Debug.Log(tex.width + "/" + tex.height + "/" + path); // [!code ++]
		int num = tex.width / frame; // [!code ++]
		int height = tex.height; // [!code ++]
		sprites = new Sprite[frame]; // [!code ++]
		Vector2 pivot = new Vector2(0.5f, 0.5f); // [!code ++]
		for (int i = 0; i < frame; i++) // [!code ++]
		{
			tex = IO.LoadPNG(path + suffix + ".png"); // [!code --]
			int num = tex.width / frame; // [!code --]
			int height = tex.height; // [!code --]
			sprites = new Sprite[frame]; // [!code --]
			for (int i = 0; i < frame; i++) // [!code --]
			{ // [!code --]
				sprites[i] = Sprite.Create(tex, new Rect(i * num, 0f, num, height), new Vector2(0.5f, 0.5f), 100f, 0u, SpriteMeshType.FullRect); // [!code --]
			} // [!code --]
			sprites[i] = Sprite.Create(tex, new Rect(i * num, 0f, num, height), pivot, 100f, 0u, SpriteMeshType.FullRect); // [!code ++]
		}
		LoadPref(); // [!code --]
	}
}
```

## SpriteReplacer

[`public class SpriteReplacer`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/SpriteReplacer.cs#L9-L18)
```cs:line-numbers=9

	public static Dictionary<string, string> dictModItems = new Dictionary<string, string>();

	public bool isChecked; // [!code --]
 // [!code --]
	public SpriteData data;

	public Dictionary<string, SpriteData> suffixes = new Dictionary<string, SpriteData>(); // [!code ++]
 // [!code ++]
	public Dictionary<string, bool> isChecked = new Dictionary<string, bool>(); // [!code ++]
 // [!code ++]
	public static Dictionary<string, SpriteReplacer> ListSkins()
	{
		List<string> list = new List<string>();
```

[`public static Dictionary<string, SpriteReplacer> ListSkins()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/SpriteReplacer.cs#L27-L90)
```cs:line-numbers=27
		{
			dictSkins.Remove(item);
		}
		FileInfo[] files = new DirectoryInfo(CorePath.custom + "Skin").GetFiles(); // [!code --]
		FileInfo[] files = new DirectoryInfo(CorePath.custom + "Skin").GetFiles("*.png"); // [!code ++]
		foreach (FileInfo fileInfo in files)
		{
			if (fileInfo.Extension == ".png") // [!code --]
			string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileInfo.FullName); // [!code ++]
			if (!dictSkins.ContainsKey(fileNameWithoutExtension)) // [!code ++]
			{
				string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileInfo.FullName); // [!code --]
				if (!dictSkins.ContainsKey(fileNameWithoutExtension)) // [!code --]
				SpriteReplacer spriteReplacer = new SpriteReplacer(); // [!code ++]
				spriteReplacer.data = new SpriteData // [!code ++]
				{
					SpriteReplacer spriteReplacer = new SpriteReplacer(); // [!code --]
					spriteReplacer.data = new SpriteData // [!code --]
					{ // [!code --]
						path = fileInfo.GetFullFileNameWithoutExtension() // [!code --]
					}; // [!code --]
					spriteReplacer.data.Init(); // [!code --]
					dictSkins.Add(fileNameWithoutExtension, spriteReplacer); // [!code --]
				} // [!code --]
					path = fileInfo.GetFullFileNameWithoutExtension() // [!code ++]
				}; // [!code ++]
				spriteReplacer.data.Init(); // [!code ++]
				dictSkins.Add(fileNameWithoutExtension, spriteReplacer); // [!code ++]
			}
		}
		return dictSkins;
	}

	public bool HasSprite(string id, RenderData renderData = null) // [!code --]
	public Sprite GetSprite(string suffix = "") // [!code ++]
	{
		if (!isChecked) // [!code --]
		if (!suffixes.TryGetValue(suffix, out var value)) // [!code ++]
		{
			try // [!code --]
			return null; // [!code ++]
		} // [!code ++]
		return value.GetSprite(); // [!code ++]
	} // [!code ++]
 // [!code ++]
	public void Reload(string id, RenderData renderData = null) // [!code ++]
	{ // [!code ++]
		data = null; // [!code ++]
		suffixes.Clear(); // [!code ++]
		try // [!code ++]
		{ // [!code ++]
			if (dictModItems.ContainsKey(id)) // [!code ++]
			{
				if (dictModItems.ContainsKey(id)) // [!code --]
				foreach (var (text3, path) in dictModItems) // [!code ++]
				{
					Debug.Log(id + ":" + dictModItems[id]); // [!code --]
					data = new SpriteData // [!code --]
					{ // [!code --]
						path = dictModItems[id] // [!code --]
					}; // [!code --]
					data.Init(); // [!code --]
				} // [!code --]
				else // [!code --]
				{ // [!code --]
					string text = CorePath.packageCore + "Texture/Item/" + id; // [!code --]
					if (!File.Exists(text + ".png") && renderData != null) // [!code --]
					{ // [!code --]
						text = CorePath.packageCore + "Texture/Item/" + renderData.name; // [!code --]
					} // [!code --]
					if (File.Exists(text + ".png")) // [!code --]
					if (text3.StartsWith(id)) // [!code ++]
					{
						data = new SpriteData // [!code --]
						string text4 = text3[id.Length..]; // [!code ++]
						SpriteData spriteData = new SpriteData // [!code ++]
						{
							path = text // [!code --]
							path = path // [!code ++]
						};
						data.Init(); // [!code --]
						spriteData.Init(); // [!code ++]
						suffixes[text4] = spriteData; // [!code ++]
						Debug.Log("#sprite replacer init '" + text4 + "' at " + path.ShortPath()); // [!code ++]
					}
				}
				isChecked = true; // [!code --]
				data = suffixes.TryGetValue(""); // [!code ++]
			}
			catch (Exception ex) // [!code --]
			else // [!code ++]
			{
				Debug.Log("Error during fetching spirte:" + ex); // [!code --]
				string text5 = CorePath.packageCore + "Texture/Item/" + id; // [!code ++]
				if (!File.Exists(text5 + ".png") && renderData != null) // [!code ++]
				{ // [!code ++]
					text5 = CorePath.packageCore + "Texture/Item/" + renderData.name; // [!code ++]
				} // [!code ++]
				if (File.Exists(text5 + ".png")) // [!code ++]
				{ // [!code ++]
					data = new SpriteData // [!code ++]
					{ // [!code ++]
						path = text5 // [!code ++]
					}; // [!code ++]
					data.Init(); // [!code ++]
					suffixes[""] = data; // [!code ++]
				} // [!code ++]
			}
			if (data != null) // [!code ++]
			{ // [!code ++]
				Debug.Log(id + ":" + data.path); // [!code ++]
			} // [!code ++]
		} // [!code ++]
		catch (Exception ex) // [!code ++]
		{ // [!code ++]
			Debug.LogError("#sprite error fetching sprite replacer:" + ex); // [!code ++]
		} // [!code ++]
		isChecked[id] = true; // [!code ++]
	} // [!code ++]
 // [!code ++]
	public bool HasSprite(string id, RenderData renderData = null) // [!code ++]
	{ // [!code ++]
		if (!isChecked.GetValueOrDefault(id) || (data != null && data.id != id)) // [!code ++]
		{ // [!code ++]
			Reload(id, renderData); // [!code ++]
		}
		return data != null;
	}
```

## Trait

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L1563-L1569)
```cs:line-numbers=1563
		{
			break;
		}
		int num4 = 0; // [!code --]
		int num5 = 0; // [!code ++]
		foreach (Thing thing10 in c_copyContainer.things)
		{
			if (!owner.trait.CanCopy(thing10))
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L1578-L1595)
```cs:line-numbers=1578
			{
				thing2.elements.Remove(item.id);
			}
			int num5 = 1; // [!code --]
			int num6 = 1; // [!code ++]
			switch (owner.trait.CopyShop)
			{
			case CopyShopType.Item:
			{
				num5 = (1000 + owner.c_invest * 100) / (thing2.GetPrice(CurrencyType.Money, sell: false, PriceType.CopyShop) + 50); // [!code --]
				num6 = (1000 + owner.c_invest * 100) / (thing2.GetPrice(CurrencyType.Money, sell: false, PriceType.CopyShop) + 50); // [!code ++]
				int[] array = new int[3] { 704, 703, 702 };
				foreach (int ele in array)
				{
					if (thing2.HasElement(ele))
					{
						num5 = 1; // [!code --]
						num6 = 1; // [!code ++]
					}
				}
				break;
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L1598-L1610)
```cs:line-numbers=1598
				thing2.c_charges = thing10.c_charges;
				break;
			}
			if (num5 > 1 && thing2.trait.CanStack) // [!code --]
			if (num6 > 1 && thing2.trait.CanStack) // [!code ++]
			{
				thing2.SetNum(num5); // [!code --]
				thing2.SetNum(num6); // [!code ++]
			}
			AddThing(thing2);
			num4++; // [!code --]
			if (num4 > owner.trait.NumCopyItem) // [!code --]
			num5++; // [!code ++]
			if (num5 > owner.trait.NumCopyItem) // [!code ++]
			{
				break;
			}
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L1659-L1671)
```cs:line-numbers=1659
		break;
	case ShopType.RedBook:
	{
		for (int num8 = 0; num8 < 30; num8++) // [!code --]
		for (int num9 = 0; num9 < 30; num9++) // [!code ++]
		{
			AddThing(ThingGen.CreateFromFilter("shop_seeker"));
		}
		break;
	}
	case ShopType.TravelMerchant2:
	{ // [!code ++]
		int seed = EClass.game.seed + EClass._zone.uid + EClass.world.date.year * 12 + EClass.world.date.month; // [!code ++]
		Add("tool_talisman", 1, 0);
		Add("camera", 1, 0);
		Add("dreambug", EClass.rndHalf(10), 0);
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L1695-L1709)
```cs:line-numbers=1695
		Add("block_kiwi", EClass.rndHalf(6), 0);
		Add("block_peach", EClass.rndHalf(6), 0);
		Add("water", 1, 0);
		if (EClass.rndSeed(EClass.debug.enable ? 1 : 5, owner.uid) == 0) // [!code --]
		if (EClass.rndSeed(EClass.debug.enable ? 1 : 5, seed) == 0) // [!code ++]
		{
			Add("hammer_garokk", 1, 0);
		}
		if (EClass.rndSeed(EClass.debug.enable ? 1 : 100, owner.uid) == 0) // [!code --]
		if (EClass.rndSeed(EClass.debug.enable ? 1 : 100, seed) == 0) // [!code ++]
		{
			Add("water_jure", 1, 0);
		}
		break;
	} // [!code ++]
	case ShopType.KeeperOfGarden:
	{
		string[] array2 = new string[11]
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L1731-L1741)
```cs:line-numbers=1731
		AddThing(TraitSeed.MakeSeed("carrot")).SetNum(4 + EClass.rnd(4));
		AddThing(TraitSeed.MakeSeed("potato")).SetNum(4 + EClass.rnd(4));
		AddThing(TraitSeed.MakeSeed("corn")).SetNum(4 + EClass.rnd(4));
		for (int num9 = 0; num9 < EClass.rnd(3) + 1; num9++) // [!code --]
		for (int num10 = 0; num10 < EClass.rnd(3) + 1; num10++) // [!code ++]
		{
			Add("462", 1, 0);
		}
		for (int num10 = 0; num10 < EClass.rnd(3) + 1; num10++) // [!code --]
		for (int num11 = 0; num11 < EClass.rnd(3) + 1; num11++) // [!code ++]
		{
			Add("1167", 1, 0);
		}
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L1817-L1825)
```cs:line-numbers=1817
				break;
			case ShopType.Influence:
			{
				bool num6 = owner.id == "big_sister"; // [!code --]
				TraitTicketFurniture.SetZone(num6 ? EClass.game.spatials.Find("little_garden") : EClass._zone, Add("ticket_furniture", 1, 0).SetNum(99)); // [!code --]
				if (num6) // [!code --]
				bool num7 = owner.id == "big_sister"; // [!code ++]
				TraitTicketFurniture.SetZone(num7 ? EClass.game.spatials.Find("little_garden") : EClass._zone, Add("ticket_furniture", 1, 0).SetNum(99)); // [!code ++]
				if (num7) // [!code ++]
				{
					Add("littleball", 10, 0);
					if (!owner.Chara.affinity.CanGiveCard())
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L1850-L1856)
```cs:line-numbers=1850
				}
				if (EClass._zone is Zone_Exile)
				{
					for (int num7 = 0; num7 < 30; num7++) // [!code --]
					for (int num8 = 0; num8 < 30; num8++) // [!code ++]
					{
						Add("1235", 1, -1);
						Add("1236", 1, -1);
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L1961-L1966)
```cs:line-numbers=1961
				case ShopType.TravelMerchant:
				case ShopType.TravelMerchant2:
					num2 /= 3f;
					if (num2 < 12f) // [!code ++]
					{ // [!code ++]
						num2 = 12f; // [!code ++]
					} // [!code ++]
					num3 = 30;
					break;
				}
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L1968-L1974)
```cs:line-numbers=1968
				num2 = Mathf.Min(num2, num3);
				for (int j = 0; (float)j < num2; j++)
				{
					if (ShopType == ShopType.TravelMerchant) // [!code ++]
					{ // [!code ++]
						int num4 = EClass.game.seed + (EClass.world.date.year * 12 + EClass.world.date.month) * 30 + EClass._zone.uid; // [!code ++]
						Rand.SetBaseSeed(num4 + j); // [!code ++]
						Rand.SetSeed(num4 + j); // [!code ++]
					} // [!code ++]
					Thing thing = CreateStock();
					Rand.SetBaseSeed(); // [!code ++]
					Rand.SetSeed(); // [!code ++]
					if ((!thing.trait.IsNoShop || (ShopType == ShopType.LoytelMart && (EClass.debug.enable || EClass.player.flags.loytelMartLv >= 2))) && (!(thing.trait is TraitRod) || thing.c_charges != 0) && thing.GetPrice() > 0)
					{
						bool tryStack = true;
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L2008-L2030)
```cs:line-numbers=2008
				break;
			case ShopType.Moyer:
			{
				for (int num13 = 1; num13 <= 20; num13++) // [!code --]
				for (int num14 = 1; num14 <= 20; num14++) // [!code ++]
				{
					AddAdvWeek(num13); // [!code --]
					AddAdvWeek(num14); // [!code ++]
				}
				break;
			}
			case ShopType.StrangeGirl:
			{
				int num14 = (EClass.debug.enable ? 20 : (EClass._zone.development / 10)); // [!code --]
				if (num14 > 0) // [!code --]
				int num15 = (EClass.debug.enable ? 20 : (EClass._zone.development / 10)); // [!code ++]
				if (num15 > 0) // [!code ++]
				{
					Add("syringe_gene", num14, 0); // [!code --]
					Add("syringe_gene", num15, 0); // [!code ++]
					Add("diary_little", 1, 0);
				}
				if (num14 > 10) // [!code --]
				if (num15 > 10) // [!code ++]
				{
					Add("syringe_heaven", num14 / 5, 0); // [!code --]
					Add("syringe_heaven", num15 / 5, 0); // [!code ++]
					Add("1276", 1, 0);
				}
				Add("medal", 10, 0);
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L2086-L2097)
```cs:line-numbers=2086
					Add("ticket_armpillow", 1, 0);
					Add("ticket_champagne", 1, 0);
				}
				for (int num11 = 0; num11 < 3; num11++) // [!code --]
				for (int num12 = 0; num12 < 3; num12++) // [!code ++]
				{
					if (EClass.rnd(5) == 0)
					{
						TreasureType treasureType = ((EClass.rnd(10) == 0) ? TreasureType.BossNefia : ((EClass.rnd(10) == 0) ? TreasureType.Map : TreasureType.RandomChest));
						int num12 = EClass.rnd(EClass.rnd(ShopLv + (EClass.debug.enable ? 200 : 50)) + 1) + 1; // [!code --]
						int num13 = EClass.rnd(EClass.rnd(ShopLv + (EClass.debug.enable ? 200 : 50)) + 1) + 1; // [!code ++]
						Thing thing6 = ThingGen.Create(treasureType switch
						{
							TreasureType.Map => "chest_treasure", 
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L2099-L2108)
```cs:line-numbers=2099
							_ => "chest3", 
						});
						thing6.c_lockedHard = true;
						thing6.c_lockLv = num12; // [!code --]
						thing6.c_priceAdd = 2000 + num12 * 250 * ((treasureType == TreasureType.RandomChest) ? 1 : 5); // [!code --]
						thing6.c_lockLv = num13; // [!code ++]
						thing6.c_priceAdd = 2000 + num13 * 250 * ((treasureType == TreasureType.RandomChest) ? 1 : 5); // [!code ++]
						thing6.c_revealLock = true;
						ThingGen.CreateTreasureContent(thing6, num12, treasureType, clearContent: true); // [!code --]
						ThingGen.CreateTreasureContent(thing6, num13, treasureType, clearContent: true); // [!code ++]
						AddThing(thing6);
					}
				}
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L2114-L2120)
```cs:line-numbers=2114
			case ShopType.General:
			case ShopType.Food:
			{
				for (int num15 = 0; num15 < (EClass.debug.enable ? 3 : 3); num15++) // [!code --]
				for (int num16 = 0; num16 < (EClass.debug.enable ? 3 : 3); num16++) // [!code ++]
				{
					if (EClass.rnd(3) == 0)
					{
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L2139-L2144)
```cs:line-numbers=2139
				AddThing(ThingGen.CreatePotion(8791).SetNum(3 + EClass.rnd(3)));
				AddThing(ThingGen.CreatePotion(8792).SetNum(3 + EClass.rnd(3)));
				AddThing(ThingGen.CreatePotion(8794).SetNum(3 + EClass.rnd(3)));
				Add("1341", EClass.rndHalf(5), 0); // [!code ++]
				break;
			case "girl_blue":
				Add("779", 1 + EClass.rnd(3), 0);
```

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/Trait.cs#L2218-L2228)
```cs:line-numbers=2218
			{
				return;
			}
			int num16 = t.things.width * 10; // [!code --]
			if (t.things.Count > num16) // [!code --]
			int num17 = t.things.width * 10; // [!code ++]
			if (t.things.Count > num17) // [!code ++]
			{
				int num17 = t.things.Count - num16; // [!code --]
				for (int num18 = 0; num18 < num17; num18++) // [!code --]
				int num18 = t.things.Count - num17; // [!code ++]
				for (int num19 = 0; num19 < num18; num19++) // [!code ++]
				{
					t.things.LastItem().Destroy();
				}
```

## TraitMerchantTravel

[`public override int ShopLv`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/0cb37b1fae8f290e22d39652a7addeaff2eca34f/Elin/TraitMerchantTravel.cs#L20-L26)
```cs:line-numbers=20
			{
				return base.ShopLv;
			}
			return EClass.pc.FameLv * 2 + 10; // [!code --]
			return EClass.pc.FameLv + EClass.pc.FameLv / 2 + 10; // [!code ++]
		}
	}

```
