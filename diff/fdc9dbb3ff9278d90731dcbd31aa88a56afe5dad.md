---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 19 files modified.
version: EA 23.287 Stable
changes: AIAct/AI_Fuck/AI_Shear/AI_Slaughter/ActEffect/ActPlan/ActZap/AttackProcess/Chara/EClass/GrowSystem/ListPeopleParty/Recipe/TaskBuild/TaskPlow/TaskPoint/Trait/TraitChara/UIMultiList
---

# EA 23.287 Stable

March 20, 2026

19 files modified.

## Important Changes

Possible breaking changes. Click the filename to view the chunk.
### [AIAct (1)](#aiact)
```cs:no-line-numbers
public Status DoGoto(Card card, int dist, Func<Status> _onChildFail = null) // [!code --]
public Status DoGoto(Card card, int dist, bool ignoreConnection = false, Func<Status> _onChildFail = null) // [!code ++]
```
### [AI_Fuck (1)](#ai-fuck)
```cs:no-line-numbers
public override void OnSetOwner() // [!code --]

```
### [AI_Shear (1)](#ai-shear)
```cs:no-line-numbers
public override void OnSetOwner() // [!code --]

```
### [AI_Slaughter (1)](#ai-slaughter)
```cs:no-line-numbers
public override void OnSetOwner() // [!code --]

```
### [ListPeopleParty (1)](#listpeopleparty)
```cs:no-line-numbers
public override void OnCreate() // [!code --]

```
### [TaskPlow (1)](#taskplow)
```cs:no-line-numbers
public override void OnSetOwner() // [!code --]

```
### [TaskPoint (1)](#taskpoint)
```cs:no-line-numbers
public override void OnSetOwner() // [!code --]

```
## AIAct

[`public Status DoGoto(Point pos, int dist = 0, bool ignoreConnection = false, Fun`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AIAct.cs#L455-L464)
```cs:line-numbers=455

	public Status DoGoto(Card card, Func<Status> _onChildFail = null)
	{
		return DoGoto(card, (card.isChara || card.pos.cell.blocked) ? 1 : 0, _onChildFail); // [!code --]
		return DoGoto(card, (card.isChara || card.pos.cell.blocked) ? 1 : 0, ignoreConnection: false, _onChildFail); // [!code ++]
	}

	public Status DoGoto(Card card, int dist, Func<Status> _onChildFail = null) // [!code --]
	public Status DoGoto(Card card, int dist, bool ignoreConnection = false, Func<Status> _onChildFail = null) // [!code ++]
	{
		if (card != null && card == owner.held)
		{
```

[`public Status DoGoto(Card card, int dist, Func<Status> _onChildFail = null)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AIAct.cs#L468-L474)
```cs:line-numbers=468
		{
			return _onChildFail?.Invoke() ?? Cancel();
		}
		SetChild(new AI_Goto(card, dist), _onChildFail); // [!code --]
		SetChild(new AI_Goto(card, dist, ignoreConnection), _onChildFail); // [!code ++]
		return TickChild();
	}

```

## AI_Fuck

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AI_Fuck.cs#L105-L111)
```cs:line-numbers=105
	int destDist = ((Type == FuckType.fuck) ? 1 : 1);
	if (owner.host != target)
	{
		yield return DoGoto(target.pos, destDist); // [!code --]
		yield return DoGoto(target.pos, destDist, ignoreConnection: true); // [!code ++]
	}
	cc.Say((variation == Variation.Slime) ? "slime_start" : ((variation == Variation.Bloodsuck) ? "suck_start" : (Type.ToString() + "_start")), cc, tc);
	isFail = () => !tc.IsAliveInCurrentZone || tc.Dist(owner) > 3;
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AI_Fuck.cs#L132-L138)
```cs:line-numbers=132
		progress = i;
		if (owner.host != target)
		{
			yield return DoGoto(target.pos, destDist); // [!code --]
			yield return DoGoto(target.pos, destDist, ignoreConnection: true); // [!code ++]
		}
		switch (Type)
		{
```

[`static void SuccubusExp(Chara c, Chara tg)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AI_Fuck.cs#L540-L551)
```cs:line-numbers=540
			}
		}
	}
 // [!code --]
	public override void OnSetOwner() // [!code --]
	{ // [!code --]
		if (parent is AI_Goto aI_Goto) // [!code --]
		{ // [!code --]
			aI_Goto.ignoreConnection = true; // [!code --]
		} // [!code --]
	} // [!code --]
}
```

## AI_Shear

[`public override bool Perform()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AI_Shear.cs#L32-L38)
```cs:line-numbers=32

	public override IEnumerable<Status> Run()
	{
		yield return DoGoto(target); // [!code --]
		yield return DoGoto(target, 1, ignoreConnection: true); // [!code ++]
		int furLv = GetFurLv(target.Chara);
		Progress_Custom seq = new Progress_Custom
		{
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AI_Shear.cs#L81-L94)
```cs:line-numbers=81
		yield return Do(seq);
	}

	public override void OnSetOwner() // [!code --]
	{ // [!code --]
		if (parent is AI_Goto aI_Goto) // [!code --]
		{ // [!code --]
			aI_Goto.ignoreConnection = true; // [!code --]
		} // [!code --]
	} // [!code --]
 // [!code --]
	public static int GetFurLv(Chara c)
	{
		return Mathf.Clamp(c.c_fur / 10 + 1, 1, 5);
```

## AI_Slaughter

[`public override bool Perform()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AI_Slaughter.cs#L30-L36)
```cs:line-numbers=30

	public override IEnumerable<Status> Run()
	{
		yield return DoGoto(target); // [!code --]
		yield return DoGoto(target, 1, ignoreConnection: true); // [!code ++]
		if (target != owner)
		{
			target.Chara.AddCondition<ConWait>(1000, force: true);
```

[`public override void OnCancelOrSuccess()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AI_Slaughter.cs#L129-L140)
```cs:line-numbers=129
			target.SetCensored(enable: false);
		}
	}
 // [!code --]
	public override void OnSetOwner() // [!code --]
	{ // [!code --]
		if (parent is AI_Goto aI_Goto) // [!code --]
		{ // [!code --]
			aI_Goto.ignoreConnection = true; // [!code --]
		} // [!code --]
	} // [!code --]
}
```

## ActEffect

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1098-L1110)
```cs:line-numbers=1098
	{
		CC.PlaySound("clean_floor");
		Msg.Say("exterminate");
		List<Chara> list2 = EClass._map.charas.Where((Chara c) => c.isCopy && !c.IsPCFaction).ToList(); // [!code --]
		if (list2.Count == 0) // [!code --]
		List<Chara> list3 = EClass._map.charas.Where((Chara c) => c.isCopy && !c.IsPCFaction).ToList(); // [!code ++]
		if (list3.Count == 0) // [!code ++]
		{
			Msg.SayNothingHappen();
			return;
		}
		foreach (Chara item in list2) // [!code --]
		foreach (Chara item in list3) // [!code ++]
		{
			item.Say("split_fail", item);
			item.PlayEffect("vanish");
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1118-L1173)
```cs:line-numbers=1118
		{
			return;
		}
		Thing thing2 = ThingGen.Create("mine"); // [!code --]
		thing2.c_idRefCard = "dog_mine"; // [!code --]
		Thing thing3 = ThingGen.Create("mine"); // [!code ++]
		thing3.c_idRefCard = "dog_mine"; // [!code ++]
		Zone.ignoreSpawnAnime = true;
		EClass._zone.AddCard(thing2, CC.pos).Install(); // [!code --]
		EClass._zone.AddCard(thing3, CC.pos).Install(); // [!code ++]
		break;
	}
	case EffectId.LittleSisterMigration:
	case EffectId.SilverCatMigration:
	{
		bool flag6 = id == EffectId.SilverCatMigration; // [!code --]
		if (!EClass.game.IsSurvival && ((flag6 && EClass._zone.id != "startVillage2") || (!flag6 && !(EClass._zone is Zone_LittleGarden)))) // [!code --]
		bool flag3 = id == EffectId.SilverCatMigration; // [!code ++]
		if (!EClass.game.IsSurvival && ((flag3 && EClass._zone.id != "startVillage2") || (!flag3 && !(EClass._zone is Zone_LittleGarden)))) // [!code ++]
		{
			Msg.SayNothingHappen();
			return;
		}
		List<Chara> list3 = new List<Chara>(); // [!code --]
		bool flag7 = false; // [!code --]
		List<Chara> list2 = new List<Chara>(); // [!code ++]
		bool flag4 = false; // [!code ++]
		foreach (Chara chara2 in EClass._map.charas)
		{
			if (!chara2.IsPCFactionOrMinion && chara2.id == (flag6 ? "cat_silver" : "littleOne")) // [!code --]
			if (!chara2.IsPCFactionOrMinion && chara2.id == (flag3 ? "cat_silver" : "littleOne")) // [!code ++]
			{
				if (flag7) // [!code --]
				if (flag4) // [!code ++]
				{
					flag7 = false; // [!code --]
					flag4 = false; // [!code ++]
					continue;
				}
				list3.Add(chara2); // [!code --]
				flag7 = true; // [!code --]
				list2.Add(chara2); // [!code ++]
				flag4 = true; // [!code ++]
			}
		}
		if (list3.Count == 0) // [!code --]
		if (list2.Count == 0) // [!code ++]
		{
			Msg.SayNothingHappen();
			return;
		}
		EClass.pc.PlaySound("chime_angel");
		foreach (Chara item2 in list3) // [!code --]
		foreach (Chara item2 in list2) // [!code ++]
		{
			item2.PlayEffect("revive");
			item2.Destroy();
		}
		Msg.Say(flag6 ? "cat_migration" : "little_migration", list3.Count.ToString() ?? ""); // [!code --]
		EClass._zone.ModInfluence(list3.Count); // [!code --]
		if (flag6) // [!code --]
		Msg.Say(flag3 ? "cat_migration" : "little_migration", list2.Count.ToString() ?? ""); // [!code ++]
		EClass._zone.ModInfluence(list2.Count); // [!code ++]
		if (flag3) // [!code ++]
		{
			EClass.player.stats.catDepart += list3.Count; // [!code --]
			EClass.player.stats.catDepart += list2.Count; // [!code ++]
		}
		else
		{
			EClass.player.stats.sistersDepart += list3.Count; // [!code --]
			EClass.player.stats.sistersDepart += list2.Count; // [!code ++]
		}
		break;
	}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1224-L1232)
```cs:line-numbers=1224
		TC.PlaySound("curse3");
		TC.PlayEffect("curse");
		TC.Say("forgetItems", TC);
		int num2 = power / 50 + 1 + EClass.rnd(3); // [!code --]
		int num4 = power / 50 + 1 + EClass.rnd(3); // [!code ++]
		List<Thing> source = TC.things.List((Thing t) => t.c_IDTState == 0);
		for (int i = 0; i < num2; i++) // [!code --]
		for (int i = 0; i < num4; i++) // [!code ++]
		{
			source.RandomItem().c_IDTState = 5;
		}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1238-L1247)
```cs:line-numbers=1238
	case EffectId.EnchantArmorGreat:
	{
		bool armor = id == EffectId.EnchantArmor || id == EffectId.EnchantArmorGreat;
		bool flag8 = id == EffectId.EnchantWeaponGreat || id == EffectId.EnchantArmorGreat; // [!code --]
		bool flag7 = id == EffectId.EnchantWeaponGreat || id == EffectId.EnchantArmorGreat; // [!code ++]
		if (!tc.isThing)
		{
			LayerDragGrid.CreateEnchant(CC, armor, flag8, state); // [!code --]
			LayerDragGrid.CreateEnchant(CC, armor, flag7, state); // [!code ++]
			return;
		}
		cc.PlaySound("identify");
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1252-L1259)
```cs:line-numbers=1252
			tc.ModEncLv(-1);
			break;
		}
		int num7 = (flag8 ? 4 : 2) + (blessed ? 1 : 0); // [!code --]
		if (tc.encLV >= num7) // [!code --]
		int num5 = (flag7 ? 4 : 2) + (blessed ? 1 : 0); // [!code ++]
		if (tc.encLV >= num5) // [!code ++]
		{
			cc.Say("enc_resist", tc);
			break;
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1265-L1285)
```cs:line-numbers=1265
	case EffectId.Identify:
	case EffectId.GreaterIdentify:
	{
		bool flag3 = id == EffectId.GreaterIdentify; // [!code --]
		bool flag6 = id == EffectId.GreaterIdentify; // [!code ++]
		if (flag)
		{
			Redirect(EffectId.ForgetItems, flag3 ? BlessedState.Cursed : BlessedState.Normal, default(ActRef)); // [!code --]
			Redirect(EffectId.ForgetItems, flag6 ? BlessedState.Cursed : BlessedState.Normal, default(ActRef)); // [!code ++]
			break;
		}
		if (!tc.isThing)
		{
			int count = ((!blessed) ? 1 : (flag3 ? (2 + EClass.rnd(2)) : (3 + EClass.rnd(3)))); // [!code --]
			LayerDragGrid.CreateIdentify(CC, flag3, state, 0, count); // [!code --]
			int count = ((!blessed) ? 1 : (flag6 ? (2 + EClass.rnd(2)) : (3 + EClass.rnd(3)))); // [!code ++]
			LayerDragGrid.CreateIdentify(CC, flag6, state, 0, count); // [!code ++]
			return;
		}
		cc.PlaySound("identify");
		cc.PlayEffect("identify");
		tc.Thing.Identify(cc.IsPCParty, (!flag3) ? IDTSource.Identify : IDTSource.SuperiorIdentify); // [!code --]
		tc.Thing.Identify(cc.IsPCParty, (!flag6) ? IDTSource.Identify : IDTSource.SuperiorIdentify); // [!code ++]
		break;
	}
	case EffectId.Uncurse:
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1289-L1305)
```cs:line-numbers=1289
			LayerDragGrid.CreateUncurse(CC, state);
			return;
		}
		Thing thing = tc.Thing; // [!code --]
		if (thing.blessedState == BlessedState.Cursed) // [!code --]
		Thing thing2 = tc.Thing; // [!code ++]
		if (thing2.blessedState == BlessedState.Cursed) // [!code ++]
		{
			thing.SetBlessedState(BlessedState.Normal); // [!code --]
			thing2.SetBlessedState(BlessedState.Normal); // [!code ++]
		}
		else if (thing.blessedState == BlessedState.Doomed) // [!code --]
		else if (thing2.blessedState == BlessedState.Doomed) // [!code ++]
		{
			thing.SetBlessedState(BlessedState.Normal); // [!code --]
			thing2.SetBlessedState(BlessedState.Normal); // [!code ++]
		}
		thing.GetRootCard()?.TryStack(thing); // [!code --]
		LayerInventory.SetDirty(thing); // [!code --]
		thing2.GetRootCard()?.TryStack(thing2); // [!code ++]
		LayerInventory.SetDirty(thing2); // [!code ++]
		break;
	}
	case EffectId.Lighten:
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1315-L1336)
```cs:line-numbers=1315
		}
		cc.PlaySound("offering");
		cc.PlayEffect("buff");
		int num = (tc.isWeightChanged ? tc.c_weight : tc.Thing.source.weight); // [!code --]
		int num3 = (tc.isWeightChanged ? tc.c_weight : tc.Thing.source.weight); // [!code ++]
		tc.isWeightChanged = true;
		Element orCreateElement = tc.elements.GetOrCreateElement(64);
		Element orCreateElement2 = tc.elements.GetOrCreateElement(65);
		Element orCreateElement3 = tc.elements.GetOrCreateElement(67);
		Element orCreateElement4 = tc.elements.GetOrCreateElement(66);
		bool flag2 = tc.IsEquipmentOrRangedOrAmmo || tc.IsThrownWeapon; // [!code --]
		bool flag5 = tc.IsEquipmentOrRangedOrAmmo || tc.IsThrownWeapon; // [!code ++]
		if (flag)
		{
			num = (int)(0.01f * (float)num * (float)power * 0.75f + 500f); // [!code --]
			if (num < 0 || num > 10000000) // [!code --]
			num3 = (int)(0.01f * (float)num3 * (float)power * 0.75f + 500f); // [!code ++]
			if (num3 < 0 || num3 > 10000000) // [!code ++]
			{
				num = 10000000; // [!code --]
				flag2 = false; // [!code --]
				num3 = 10000000; // [!code ++]
				flag5 = false; // [!code ++]
			}
			if (flag2) // [!code --]
			if (flag5) // [!code ++]
			{
				if (tc.IsWeapon || tc.IsThrownWeapon || tc.IsAmmo)
				{
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1347-L1358)
```cs:line-numbers=1347
		}
		else
		{
			num = num * (100 - power / 10) / 100; // [!code --]
			num3 = num3 * (100 - power / 10) / 100; // [!code ++]
			if (blessed)
			{
				power /= 4;
			}
			if (flag2) // [!code --]
			if (flag5) // [!code ++]
			{
				if (tc.IsWeapon || tc.IsThrownWeapon || tc.IsAmmo)
				{
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1367-L1373)
```cs:line-numbers=1367
			}
			cc.Say("lighten", tc);
		}
		tc.c_weight = num; // [!code --]
		tc.c_weight = num3; // [!code ++]
		tc.SetDirtyWeight();
		if (tc.parent == null)
		{
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1391-L1423)
```cs:line-numbers=1391
		cc.PlayEffect("identify");
		cc.Say("reconstruct", tc);
		EClass.game.cards.uidNext += EClass.rnd(30);
		int num5 = Mathf.Max(tc.genLv, tc.LV, EClass.player.stats.deepest); // [!code --]
		int num6 = Mathf.Max(tc.genLv, tc.LV, EClass.player.stats.deepest); // [!code ++]
		CardBlueprint.Set(new CardBlueprint
		{
			blesstedState = state
		});
		Thing thing3 = ThingGen.Create(tc.id, -1, (int)((long)num5 * (long)power / 400)); // [!code --]
		thing3.genLv = num5; // [!code --]
		Thing thing4 = ThingGen.Create(tc.id, -1, (int)((long)num6 * (long)power / 400)); // [!code ++]
		thing4.genLv = num6; // [!code ++]
		if (tc.c_uidAttune != 0)
		{
			thing3.c_uidAttune = tc.c_uidAttune; // [!code --]
			if (thing3.id == "amulet_engagement" || thing3.id == "ring_engagement") // [!code --]
			thing4.c_uidAttune = tc.c_uidAttune; // [!code ++]
			if (thing4.id == "amulet_engagement" || thing4.id == "ring_engagement") // [!code ++]
			{
				if (tc.c_uidAttune != EClass.pc.uid)
				{
					thing3.elements.ModBase(484, 3); // [!code --]
					thing4.elements.ModBase(484, 3); // [!code ++]
				}
				if (thing3.rarity < Rarity.Mythical) // [!code --]
				if (thing4.rarity < Rarity.Mythical) // [!code ++]
				{
					thing3.rarity = Rarity.Mythical; // [!code --]
					thing4.rarity = Rarity.Mythical; // [!code ++]
				}
			}
		}
		tc.Destroy();
		CC.Pick(thing3, msg: false); // [!code --]
		CC.Pick(thing4, msg: false); // [!code ++]
		if (!CC.IsPC)
		{
			CC.TryEquip(thing3); // [!code --]
			CC.TryEquip(thing4); // [!code ++]
		}
		break;
	}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1435-L1465)
```cs:line-numbers=1435
		{
			tc = tc.Split(1);
		}
		string name = tc.Name; // [!code --]
		string name2 = tc.Name; // [!code ++]
		if (row == null)
		{
			bool num3 = id == EffectId.ChangeMaterialGreater; // [!code --]
			bool flag4 = id == EffectId.ChangeMaterialLesser; // [!code --]
			bool num7 = id == EffectId.ChangeMaterialGreater; // [!code ++]
			bool flag8 = id == EffectId.ChangeMaterialLesser; // [!code ++]
			string text2 = tc.Thing.source.tierGroup;
			Dictionary<string, SourceMaterial.TierList> tierMap = SourceMaterial.tierMap;
			int num4 = 1; // [!code --]
			int num8 = 1; // [!code ++]
			if (flag)
			{
				num4 -= 2; // [!code --]
				num8 -= 2; // [!code ++]
			}
			if (blessed)
			{
				num4++; // [!code --]
				num8++; // [!code ++]
			}
			if (num3) // [!code --]
			if (num7) // [!code ++]
			{
				num4++; // [!code --]
				num8++; // [!code ++]
			}
			if (flag4) // [!code --]
			if (flag8) // [!code ++]
			{
				num4 -= 2; // [!code --]
				num8 -= 2; // [!code ++]
			}
			num4 = Mathf.Clamp(num4 + EClass.rnd(2), 0, 4); // [!code --]
			num8 = Mathf.Clamp(num8 + EClass.rnd(2), 0, 4); // [!code ++]
			if (EClass.rnd(10) == 0)
			{
				text2 = ((text2 == "metal") ? "leather" : "metal");
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1467-L1473)
```cs:line-numbers=1467
			SourceMaterial.TierList tierList = (text2.IsEmpty() ? tierMap.RandomItem() : tierMap[text2]);
			for (int j = 0; j < 1000; j++)
			{
				row = tierList.tiers[num4].Select(); // [!code --]
				row = tierList.tiers[num8].Select(); // [!code ++]
				if (row != tc.material)
				{
					break;
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1492-L1498)
```cs:line-numbers=1492
			DNA.Type type = DNA.GetType(tc.material.alias);
			tc.c_DNA.Generate(type);
		}
		cc.Say("materialChanged", name, row.GetName()); // [!code --]
		cc.Say("materialChanged", name2, row.GetName()); // [!code ++]
		if (CC != null)
		{
			if (tc.parent == null)
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1515-L1564)
```cs:line-numbers=1515
		{
			tc = tc.Split(1);
		}
		string name2 = tc.Name; // [!code --]
		string name = tc.Name; // [!code ++]
		cc.PlaySound("offering");
		cc.PlayEffect("buff");
		bool flag5 = tc.rarity == Rarity.Legendary; // [!code --]
		bool flag2 = tc.rarity == Rarity.Legendary; // [!code ++]
		CardBlueprint.Set(new CardBlueprint
		{
			rarity = (flag5 ? Rarity.Mythical : Rarity.Legendary), // [!code --]
			rarity = (flag2 ? Rarity.Mythical : Rarity.Legendary), // [!code ++]
			generation = CardBlueprint.Generation.GarokkHammer
		});
		Rand.SetBaseSeed(tc.uid + 1);
		Rand.SetSeed(tc.uid + 2);
		Thing thing4 = ThingGen.Create(tc.id, tc.idMaterial, tc.genLv); // [!code --]
		Thing thing = ThingGen.Create(tc.id, tc.idMaterial, tc.genLv); // [!code ++]
		Rand.SetSeed();
		Rand.SetBaseSeed();
		int num6 = 0; // [!code --]
		foreach (Element item4 in thing4.elements.dict.Values.ToList().Shuffle()) // [!code --]
		thing.SetEncLv(tc.encLV); // [!code ++]
		thing.SetBlessedState(tc.blessedState); // [!code ++]
		int num = 0; // [!code ++]
		foreach (Element item4 in thing.elements.dict.Values.ToList().Shuffle()) // [!code ++]
		{
			if (tc.elements.Has(item4.id) && tc.elements.GetElement(item4.id).vBase == item4.vBase) // [!code --]
			int num2 = (tc.elements.Has(item4.id) ? tc.elements.GetElement(item4.id).vBase : 0); // [!code ++]
			if (num2 != 0 && (Mathf.Abs(item4.vBase) <= Mathf.Abs(num2) || !MathEx.IsSameSign(item4.vBase, num2))) // [!code ++]
			{
				continue;
			}
			tc.elements.SetBase(item4.id, item4.vBase); // [!code --]
			Debug.Log(item4.Name + "/" + item4.vBase); // [!code --]
			int id2 = item4.id;
			if ((uint)(id2 - 64) > 3u) // [!code --]
			if (id2 != 11) // [!code ++]
			{
				num6++; // [!code --]
				if (flag5) // [!code --]
				if ((uint)(id2 - 64) > 3u) // [!code ++]
				{ // [!code ++]
					num++; // [!code ++]
				} // [!code ++]
				tc.elements.SetBase(item4.id, item4.vBase); // [!code ++]
				Debug.Log(item4.Name + "/" + item4.vBase); // [!code ++]
				if (flag2 && num >= 2) // [!code ++]
				{
					_ = 2; // [!code --]
					break; // [!code ++]
				}
			}
		}
		tc.rarity = (flag5 ? Rarity.Mythical : Rarity.Legendary); // [!code --]
		EClass.pc.Say("reconstruct", name2); // [!code --]
		tc.isCrafted = false; // [!code ++]
		tc.rarity = (flag2 ? Rarity.Mythical : Rarity.Legendary); // [!code ++]
		EClass.pc.Say("reconstruct", name); // [!code ++]
		break;
	}
	case EffectId.ChangeAlias:
	{
		Chara c2 = CC;
		if (!c2.IsPC && !c2.trait.UseRandomAlias && blessed) // [!code ++]
		{ // [!code ++]
			c2._alias = null; // [!code ++]
			c2.Say("reconstruct", c2); // [!code ++]
			SE.Change(); // [!code ++]
			c2.PlayEffect("mutation"); // [!code ++]
			break; // [!code ++]
		} // [!code ++]
		EClass.ui.AddLayer<LayerList>().SetStringList(delegate
		{
			List<string> list11 = new List<string>();
			for (int num16 = 0; num16 < 10; num16++) // [!code --]
			for (int num17 = 0; num17 < 10; num17++) // [!code ++]
			{
				list11.Add(AliasGen.GetRandomAlias());
			}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1738-L1752)
```cs:line-numbers=1738
		{
			break;
		}
		int num13 = 0; // [!code --]
		int num14 = 0; // [!code ++]
		foreach (Condition condition5 in TC.conditions)
		{
			if (condition5.Type == ConditionType.Debuff)
			{
				num13++; // [!code --]
				num14++; // [!code ++]
			}
		}
		if (num13 == 0) // [!code --]
		if (num14 == 0) // [!code ++]
		{
			CC.SayNothingHappans();
			break;
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1764-L1770)
```cs:line-numbers=1764
		TC.Say("abShutterHex", TC);
		Point center = CC.pos.Copy();
		List<Chara> list10 = TC.pos.ListCharasInRadius(TC, 4, (Chara c) => c == TC || c.IsHostile(CC));
		for (int m = 0; m < num13; m++) // [!code --]
		for (int m = 0; m < num14; m++) // [!code ++]
		{
			TweenUtil.Delay((float)m * 0.1f, delegate
			{
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1783-L1790)
```cs:line-numbers=1783
					{
						effect.Play(center, 0f, pos);
					});
					int num14 = Dice.Create("SpShutterHex", power, CC, (actRef.refThing != null) ? null : actRef.act).Roll(); // [!code --]
					item6.DamageHP(num14, 919, power, AttackSource.None, CC, showEffect: false); // [!code --]
					int num15 = Dice.Create("SpShutterHex", power, CC, (actRef.refThing != null) ? null : actRef.act).Roll(); // [!code ++]
					item6.DamageHP(num15, 919, power, AttackSource.None, CC, showEffect: false); // [!code ++]
				}
			}
		}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L1949-L1974)
```cs:line-numbers=1949
		List<Thing> list = new List<Thing>();
		TC.things.Foreach(delegate(Thing t)
		{
			int num15 = 0; // [!code --]
			int num16 = 0; // [!code ++]
			if ((t.isEquipped || t.IsRangedWeapon || blessed) && t.blessedState < BlessedState.Normal)
			{
				if (t.blessedState == BlessedState.Cursed)
				{
					num15 = EClass.rnd(200); // [!code --]
					num16 = EClass.rnd(200); // [!code ++]
				}
				if (t.blessedState == BlessedState.Doomed)
				{
					num15 = EClass.rnd(1000); // [!code --]
					num16 = EClass.rnd(1000); // [!code ++]
				}
				if (blessed)
				{
					num15 /= 2; // [!code --]
					num16 /= 2; // [!code ++]
				}
				if (id == EffectId.UncurseEQGreater)
				{
					num15 /= 10; // [!code --]
					num16 /= 10; // [!code ++]
				}
				if (power >= num15) // [!code --]
				if (power >= num16) // [!code ++]
				{
					TC.Say("uncurseEQ_success", t);
					t.SetBlessedState(BlessedState.Normal);
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L2064-L2076)
```cs:line-numbers=2064
			power = power * 2 / 3;
		}
		int a2 = power;
		int num11 = TC.WIL * (isPowerful ? 20 : 5); // [!code --]
		int num12 = TC.WIL * (isPowerful ? 20 : 5); // [!code ++]
		ConHolyVeil condition3 = TC.GetCondition<ConHolyVeil>();
		if (condition3 != null)
		{
			num11 += condition3.power * 5; // [!code --]
			num12 += condition3.power * 5; // [!code ++]
		}
		if (id != EffectId.DebuffKizuami && EClass.rnd(a2) < num11 / EClass.sources.stats.alias[n].hexPower && EClass.rnd(10) != 0) // [!code --]
		if (id != EffectId.DebuffKizuami && EClass.rnd(a2) < num12 / EClass.sources.stats.alias[n].hexPower && EClass.rnd(10) != 0) // [!code ++]
		{
			TC.Say("debuff_resist", TC);
			CC.DoHostileAction(TC);
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L2194-L2213)
```cs:line-numbers=2194
	{
		tc.PlaySound("mutation");
		tc.PlayEffect("mutation");
		int num12 = ((actRef.refThing != null) ? actRef.refThing.GetInt(118) : actRef.refVal); // [!code --]
		if (num12 == 0) // [!code --]
		int num13 = ((actRef.refThing != null) ? actRef.refThing.GetInt(118) : actRef.refVal); // [!code ++]
		if (num13 == 0) // [!code ++]
		{
			num12 = tc.GetInt(118); // [!code --]
			if (num12 == 0) // [!code --]
			num13 = tc.GetInt(118); // [!code ++]
			if (num13 == 0) // [!code ++]
			{
				num12 = EClass.game.seed + tc.uid; // [!code --]
				num13 = EClass.game.seed + tc.uid; // [!code ++]
			}
			num12++; // [!code --]
			num13++; // [!code ++]
		}
		tc.Say("transBlood", tc);
		tc.Talk("tail");
		tc.c_bloodData = null;
		tc.SetInt(118, num12); // [!code --]
		tc.SetInt(118, num13); // [!code ++]
		break;
	}
	case EffectId.Youth:
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L2322-L2333)
```cs:line-numbers=2322
	{
		bool flag12 = id == EffectId.DamageBody || id == EffectId.DamageBodyGreat;
		bool mind2 = id == EffectId.DamageMind || id == EffectId.DamageMindGreat;
		int num10 = ((id == EffectId.DamageBody || id == EffectId.DamageMind) ? 1 : (4 + EClass.rnd(4))); // [!code --]
		int num11 = ((id == EffectId.DamageBody || id == EffectId.DamageMind) ? 1 : (4 + EClass.rnd(4))); // [!code ++]
		if (id == EffectId.Weaken)
		{
			flag12 = EClass.rnd(2) == 0;
			mind2 = !flag12;
			num10 = 1; // [!code --]
			num11 = 1; // [!code ++]
		}
		else
		{
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L2335-L2341)
```cs:line-numbers=2335
			TC.PlaySound("debuff");
		}
		TC.Say(flag12 ? "damageBody" : "damageMind", TC);
		for (int l = 0; l < num10; l++) // [!code --]
		for (int l = 0; l < num11; l++) // [!code ++]
		{
			TC.DamageTempElements(power, flag12, mind2, id != EffectId.Weaken);
		}
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L2393-L2409)
```cs:line-numbers=2393
		{
			EClass.game.religions.Healing.Talk("ability");
		}
		int num9 = Dice.Create((actRef.act != null && EClass.sources.calc.map.ContainsKey(actRef.act.ID)) ? actRef.act.ID : "SpHealLight", power, CC, (actRef.refThing != null) ? null : actRef.act).Roll(); // [!code --]
		int num10 = Dice.Create((actRef.act != null && EClass.sources.calc.map.ContainsKey(actRef.act.ID)) ? actRef.act.ID : "SpHealLight", power, CC, (actRef.refThing != null) ? null : actRef.act).Roll(); // [!code ++]
		if (actRef.refThing != null)
		{
			num9 = num9 * (100 + actRef.refThing.Evalue(750) * 10) / 100; // [!code --]
			num10 = num10 * (100 + actRef.refThing.Evalue(750) * 10) / 100; // [!code ++]
		}
		if (flag)
		{
			TC.DamageHP(num9 / 2, 919, power); // [!code --]
			TC.DamageHP(num10 / 2, 919, power); // [!code ++]
			break;
		}
		TC.HealHPHost(num9, (actRef.refThing == null && id != EffectId.JureHeal) ? HealSource.Magic : HealSource.Item); // [!code --]
		TC.HealHPHost(num10, (actRef.refThing == null && id != EffectId.JureHeal) ? HealSource.Magic : HealSource.Item); // [!code ++]
		TC.CureHost(CureType.Heal, power, state);
		TC.Say((power >= 300) ? "heal_heavy" : "heal_light", TC);
		break;
```

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActEffect.cs#L2508-L2515)
```cs:line-numbers=2508
		if (TC.HasElement(1211))
		{
			TC.Say("drinkSaltWater_snail", TC);
			int num8 = ((TC.hp > 10) ? (TC.hp - EClass.rnd(10)) : 10000); // [!code --]
			TC.DamageHP(num8, AttackSource.None, CC); // [!code --]
			int num9 = ((TC.hp > 10) ? (TC.hp - EClass.rnd(10)) : 10000); // [!code ++]
			TC.DamageHP(num9, AttackSource.None, CC); // [!code ++]
		}
		else if (TC.IsPC)
		{
```

## ActPlan

[`public Func<bool> GetAction()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActPlan.cs#L307-L312)
```cs:line-numbers=307
	Item item = list[0];
	return delegate
	{
		if (item.act is AIAct) // [!code ++]
		{ // [!code ++]
			(item.act as AIAct).owner = EClass.pc; // [!code ++]
		} // [!code ++]
		if (performed && !item.act.CanPressRepeat)
		{
			return false;
```

## ActZap

[`public override bool Perform()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ActZap.cs#L27-L33)
```cs:line-numbers=27
		Act.TC = Act.CC;
		EffectId idEffect = trait.IdEffect;
		long a = trait.Power * (100 + (long)Act.CC.Evalue(305) * 10L + Act.CC.MAG / 2 + Act.CC.PER / 2) / 100;
		ActEffect.ProcAt(idEffect, MathEx.Min(a), trait.owner.blessedState, Act.CC, null, Act.TP, trait.IsNegative, new ActRef // [!code --]
		ActEffect.ProcAt(idEffect, MathEx.ClampToInt(a), trait.owner.blessedState, Act.CC, null, Act.TP, trait.IsNegative, new ActRef // [!code ++]
		{
			refThing = trait.owner.Thing,
			aliasEle = trait.aliasEle,
```

## AttackProcess

[`public class AttackProcess : EClass`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AttackProcess.cs#L11-L16)
```cs:line-numbers=11

	public long toHitBase;

	public long evasion; // [!code ++]
 // [!code ++]
	public int dNum;

	public int dDim;
```

[`public class AttackProcess : EClass`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AttackProcess.cs#L19-L26)
```cs:line-numbers=19

	public int toHitFix;

	public int evasion; // [!code --]
 // [!code --]
	public int penetration;

	public int distMod;
```

[`public void Prepare(Chara _CC, Thing _weapon, Card _TC = null, Point _TP = null,`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AttackProcess.cs#L155-L161)
```cs:line-numbers=155
	toolRange = weapon?.trait as TraitToolRange;
	attackType = AttackType.Slash;
	attackStyle = AttackStyle.Default;
	evasion = 0; // [!code --]
	evasion = 0L; // [!code ++]
	penetration = 0;
	distMod = 100;
	attackIndex = _attackIndex;
```

[`public void Prepare(Chara _CC, Thing _weapon, Card _TC = null, Point _TP = null,`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AttackProcess.cs#L366-L376)
```cs:line-numbers=366
		evasion = EClass.curve(TC.PER / 3 + TC.Evalue(150), 50, 10) + TC.DV + 25;
		if (TC.isChara && TC.Chara.isBlind)
		{
			evasion /= 2; // [!code --]
			evasion /= 2L; // [!code ++]
		}
		if (TC.HasCondition<ConDim>())
		{
			evasion /= 2; // [!code --]
			evasion /= 2L; // [!code ++]
		}
		if (TC.isChara && TC.Chara.HasHigherGround(CC))
		{
```

[`public bool Perform(int count, bool hasHit, float dmgMulti = 1f, bool maxRoll =`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/AttackProcess.cs#L822-L828)
```cs:line-numbers=822
				continue;
			}
			int num10 = 25;
			int num11 = EClass.rnd(num * (100 + item.Value * 10) / 500 + 5); // [!code --]
			long num11 = EClass.rnd(num * (100 + item.Value * 10) / 500 + 5); // [!code ++]
			num11 = num11 * (100 + GetTwoHandEncBonus(CC, weapon)) / 100;
			if (num11 >= 0)
			{
```

## Chara

[`public override void OnCreate(int genLv)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/Chara.cs#L1618-L1628)
```cs:line-numbers=1618
			num = tuple.Item3 + base.LV - source.LV;
		}
	}
	if (source.name == "*r") // [!code --]
	if (trait.UseRandomName) // [!code ++]
	{
		base.c_altName = NameGen.getRandomName();
	}
	if (source.GetText("aka") == "*r" || trait.UseRandomAlias) // [!code --]
	if (trait.UseRandomAlias) // [!code ++]
	{
		_alias = AliasGen.GetRandomAlias();
	}
```

## EClass

[`public static int rndSeed(int a, int seed)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/EClass.cs#L58-L64)
```cs:line-numbers=58

	public static int rnd(long a)
	{
		return Rand.rnd((int)a); // [!code --]
		return Rand.rnd(MathEx.ClampToInt(a)); // [!code ++]
	}

	public static int rnd(int a)
```

## GrowSystem

[`public int Convert(int tile)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/GrowSystem.cs#L34-L44)
```cs:line-numbers=34
		}
	}

	public static SourceObj.Row[] sourceSnowTree = new SourceObj.Row[2] // [!code --]
	{ // [!code --]
		EClass.sources.objs.map[54], // [!code --]
		EClass.sources.objs.map[55] // [!code --]
	}; // [!code --]
	private static SourceObj.Row[] _sourceSnowTree; // [!code ++]

	public const int DivStage = 30;

```

[`public int Convert(int tile)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/GrowSystem.cs#L58-L63)
```cs:line-numbers=58

	public string idHarvestThing;

	public static SourceObj.Row[] SourceSnowTree // [!code ++]
	{ // [!code ++]
		get // [!code ++]
		{ // [!code ++]
			object obj = _sourceSnowTree; // [!code ++]
			if (obj == null) // [!code ++]
			{ // [!code ++]
				obj = new SourceObj.Row[2] // [!code ++]
				{ // [!code ++]
					EClass.sources.objs.map[54], // [!code ++]
					EClass.sources.objs.map[55] // [!code ++]
				}; // [!code ++]
				_sourceSnowTree = (SourceObj.Row[])obj; // [!code ++]
			} // [!code ++]
			return (SourceObj.Row[])obj; // [!code ++]
		} // [!code ++]
	} // [!code ++]
 // [!code ++]
	public virtual RenderData RenderHarvest => source.renderData;

	public virtual int Step => 5;
```

## ListPeopleParty

[``](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/ListPeopleParty.cs#L2-L18)
```cs:line-numbers=2

public class ListPeopleParty : BaseListPeople
{
	public override void OnCreate() // [!code --]
	{ // [!code --]
		list.sorts = new UIList.SortMode[3] // [!code --]
		{ // [!code --]
			UIList.SortMode.ByFeat, // [!code --]
			UIList.SortMode.ByJob, // [!code --]
			UIList.SortMode.ByRace // [!code --]
		}; // [!code --]
		list.sortMode = UIList.SortMode.ByFeat; // [!code --]
	} // [!code --]
 // [!code --]
	public bool CanJoinParty(Chara c)
	{
		if (!c.IsPC)
```

## Recipe

[`public virtual void Build(Chara chara, Card t, Point pos, int mat, int dir, int`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/Recipe.cs#L654-L660)
```cs:line-numbers=654
		EClass._map.SetBlock(pos.x, pos.z, mat, ramp, dir);
		if (tileType.IsBlockPass && pos.HasChara)
		{
			foreach (Chara item in pos.ListCharas()) // [!code --]
			foreach (Chara item in pos.ListCharas().Copy()) // [!code ++]
			{
				chara.Kick(item, ignoreSelf: false, karmaLoss: false);
			}
```

## TaskBuild

[`public override void OnProgressComplete()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/TaskBuild.cs#L354-L362)
```cs:line-numbers=354
	{
		bridgeHeight = 150;
	}
	Chara chara = owner; // [!code ++]
	recipe.Build(this);
	owner = chara; // [!code ++]
	resources.Clear();
	EClass.player.flags.OnBuild(recipe); // [!code --]
	if (owner.IsPC) // [!code ++]
	{ // [!code ++]
		EClass.player.flags.OnBuild(recipe); // [!code ++]
	} // [!code ++]
	EClass._map.RefreshShadow(pos.x, pos.z);
	EClass._map.RefreshShadow(pos.x, pos.z - 1);
	EClass._map.RefreshFOV(pos.x, pos.z);
```

## TaskPlow

[`public class TaskPlow : TaskDesignation`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/TaskPlow.cs#L4-L9)
```cs:line-numbers=4
{
	public override CursorInfo CursorIcon => CursorSystem.Dig;

	public override bool destIgnoreConnection => false; // [!code ++]
 // [!code ++]
	public override bool CanPressRepeat => true;

	public override int destDist
```

[`public override HitResult GetHitResult()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/TaskPlow.cs#L82-L89)
```cs:line-numbers=82
		}
		return HitResult.Valid;
	}
 // [!code --]
	public override void OnSetOwner() // [!code --]
	{ // [!code --]
	} // [!code --]
}
```

## TaskPoint

[`public class TaskPoint : Task, IInspect`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/TaskPoint.cs#L16-L22)
```cs:line-numbers=16

	public virtual int destDist => 0;

	public virtual bool destIgnoreConnection => false; // [!code --]
	public virtual bool destIgnoreConnection => true; // [!code ++]

	public virtual bool isBlock => false;

```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/TaskPoint.cs#L125-L138)
```cs:line-numbers=125
		while (Loop);
	}

	public override void OnSetOwner() // [!code --]
	{ // [!code --]
		if (parent is AI_Goto aI_Goto) // [!code --]
		{ // [!code --]
			aI_Goto.ignoreConnection = true; // [!code --]
		} // [!code --]
	} // [!code --]
 // [!code --]
	public void OnInspect()
	{
	}
```

## Trait

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/Trait.cs#L1676-L1683)
```cs:line-numbers=1676
		{
			AddThing(ThingGen.Create(id2, MATERIAL.GetRandomMaterialFromCategory(50, "rock", EClass.sources.materials.alias["granite"]).id).SetNum(10));
		}
		Add("scroll_alias", 1, 0); // [!code --]
		Add("scroll_biography", 1, 0); // [!code --]
		Add("scroll_alias", 10, 0); // [!code ++]
		Add("scroll_biography", 10, 0); // [!code ++]
		Add("1329", 1, 0);
		break;
	}
```

## TraitChara

[`public virtual bool CanGiveRandomQuest`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/TraitChara.cs#L124-L130)
```cs:line-numbers=124
		}
	}

	public virtual bool UseRandomAlias => false; // [!code --]
	public virtual bool UseRandomName => owner.source.name == "*r"; // [!code ++]
 // [!code ++]
	public virtual bool UseRandomAlias => owner.source.GetText("aka") == "*r"; // [!code ++]

	public virtual bool IsWearingPanty => EClass.pc.faction.IsWearingPanty(owner);

```

## UIMultiList

[`public void Build(UIList.SortMode m = UIList.SortMode.ByNone)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fdc9dbb3ff9278d90731dcbd31aa88a56afe5dad/Elin/UIMultiList.cs#L42-L48)
```cs:line-numbers=42
{
	foreach (ListOwner owner in owners)
	{
		owner.list.sortMode = ((owner is ListPeopleParty) ? UIList.SortMode.ByFeat : m); // [!code --]
		owner.list.sortMode = m; // [!code ++]
	}
	if (Double)
	{
```
