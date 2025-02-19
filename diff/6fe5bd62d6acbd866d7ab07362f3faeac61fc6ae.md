---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 20 files modified.
version: EA 23.93 Nightly
changes: ActEffect/BaseBuff/ButtonElement/Chara/CharaRenderer/ConStrife/CoreDebug/Game/InvOwnerCraft/InvOwnerMod/LayerInfo/Map/Player/Props/Recipe/RecipeCard/TaskDump/Thing/TraitItemProc/Zone
---

# EA 23.93 Nightly

February 19, 2025

20 files modified.

## Important Changes

**None.**
## ActEffect

[`@@ -211,7 +211,7 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L211-L217)
```cs:line-numbers=211
			}
			else
			{
				Dice dice = Dice.Create(text2, power, CC, actref.act); // [!code --]
				Dice dice = Dice.Create(text2, power, CC, (actref.refThing != null) ? null : actref.act); // [!code ++]
				if (dice == null)
				{
					Debug.Log(text2);
```

[`@@ -857,10 +857,10 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L857-L866)
```cs:line-numbers=857
		{
			return;
		}
		Thing thing3 = ThingGen.Create("mine"); // [!code --]
		thing3.c_idRefCard = "dog_mine"; // [!code --]
		Thing thing = ThingGen.Create("mine"); // [!code ++]
		thing.c_idRefCard = "dog_mine"; // [!code ++]
		Zone.ignoreSpawnAnime = true;
		EClass._zone.AddCard(thing3, CC.pos).Install(); // [!code --]
		EClass._zone.AddCard(thing, CC.pos).Install(); // [!code ++]
		break;
	}
	case EffectId.MagicMap:
```

[`@@ -892,7 +892,7 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L892-L898)
```cs:line-numbers=892
	case EffectId.AbsorbMana:
	{
		EClass.game.religions.Element.Talk("ability");
		Dice dice = Dice.Create("ActManaAbsorb", power, CC, actRef.act); // [!code --]
		Dice dice = Dice.Create("ActManaAbsorb", power, CC, (actRef.refThing != null) ? null : actRef.act); // [!code ++]
		TC.mana.Mod(dice.Roll());
		TC.PlaySound("heal");
		TC.PlayEffect("heal");
```

[`@@ -978,17 +978,17 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L978-L994)
```cs:line-numbers=978
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

[`@@ -1080,13 +1080,13 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L1080-L1092)
```cs:line-numbers=1080
		cc.PlayEffect("identify");
		cc.Say("reconstruct", cc, tc);
		EClass.game.cards.uidNext += EClass.rnd(30);
		Thing thing2 = ThingGen.Create(tc.id, -1, tc.LV * power / 100); // [!code --]
		thing2.SetBlessedState(state); // [!code --]
		Thing thing3 = ThingGen.Create(tc.id, -1, tc.LV * power / 100); // [!code ++]
		thing3.SetBlessedState(state); // [!code ++]
		tc.Destroy();
		CC.Pick(thing2, msg: false); // [!code --]
		CC.Pick(thing3, msg: false); // [!code ++]
		if (!CC.IsPC)
		{
			CC.TryEquip(thing2); // [!code --]
			CC.TryEquip(thing3); // [!code ++]
		}
		break;
	}
```

[`@@ -1285,7 +1285,7 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L1285-L1291)
```cs:line-numbers=1285
				{
					break;
				}
				int dmg2 = Dice.Create("SpShutterHex", power * hex, CC, actRef.act).Roll(); // [!code --]
				int dmg2 = Dice.Create("SpShutterHex", power * hex, CC, (actRef.refThing != null) ? null : actRef.act).Roll(); // [!code ++]
				item3.DamageHP(dmg2, 919, power, AttackSource.None, CC);
			}
		});
```

[`@@ -1322,26 +1322,26 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L1322-L1347)
```cs:line-numbers=1322
			TC.Say((actRef.n1 == "money") ? "abStealNegateMoney" : "abStealNegate", TC);
			break;
		}
		Thing thing4 = null; // [!code --]
		bool flag6 = actRef.n1 == "food"; // [!code --]
		Thing thing6 = null; // [!code ++]
		bool flag7 = actRef.n1 == "food"; // [!code ++]
		if (actRef.n1 == "money")
		{
			int currency = TC.GetCurrency();
			if (currency > 0)
			{
				currency = Mathf.Clamp(EClass.rnd(currency / 10), 1, 100 + EClass.rndHalf(CC.LV * 200));
				thing4 = ThingGen.Create("money").SetNum(currency); // [!code --]
				thing6 = ThingGen.Create("money").SetNum(currency); // [!code ++]
				TC.ModCurrency(-currency);
			}
		}
		else
		{
			Func<Thing, bool> func = (Thing t) => true;
			if (flag6) // [!code --]
			if (flag7) // [!code ++]
			{
				func = (Thing t) => t.IsFood;
			}
			List<Thing> list3 = TC.things.List(delegate(Thing t) // [!code --]
			List<Thing> list5 = TC.things.List(delegate(Thing t) // [!code ++]
			{
				if (t.parentCard?.trait is TraitChestMerchant || t.trait is TraitTool || t.IsThrownWeapon)
				{
```

[`@@ -1349,30 +1349,30 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L1349-L1378)
```cs:line-numbers=1349
				}
				return t.trait.CanBeDestroyed && t.things.Count == 0 && t.invY != 1 && t.trait.CanBeStolen && !t.trait.CanOnlyCarry && !t.IsUnique && !t.isEquipped && t.blessedState == BlessedState.Normal && func(t);
			}, onlyAccessible: true);
			if (list3.Count > 0) // [!code --]
			if (list5.Count > 0) // [!code ++]
			{
				thing4 = list3.RandomItem(); // [!code --]
				if (thing4.Num > 1) // [!code --]
				thing6 = list5.RandomItem(); // [!code ++]
				if (thing6.Num > 1) // [!code ++]
				{
					thing4 = thing4.Split(1); // [!code --]
					thing6 = thing6.Split(1); // [!code ++]
				}
			}
			CC.AddCooldown(6640, 200);
		}
		if (thing4 == null) // [!code --]
		if (thing6 == null) // [!code ++]
		{
			CC.Say("abStealNothing", CC, TC);
			break;
		}
		thing4.SetInt(116, 1); // [!code --]
		TC.PlaySound(thing4.material.GetSoundDrop(thing4.sourceCard)); // [!code --]
		CC.Pick(thing4, msg: false); // [!code --]
		CC.Say("abSteal", CC, TC, thing4.Name); // [!code --]
		thing6.SetInt(116, 1); // [!code ++]
		TC.PlaySound(thing6.material.GetSoundDrop(thing6.sourceCard)); // [!code ++]
		CC.Pick(thing6, msg: false); // [!code ++]
		CC.Say("abSteal", CC, TC, thing6.Name); // [!code ++]
		if (actRef.n1 == "food")
		{
			if (CC.hunger.value != 0)
			{
				CC.InstantEat(thing4); // [!code --]
				CC.InstantEat(thing6); // [!code ++]
			}
		}
		else
```

[`@@ -1397,7 +1397,7 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L1397-L1403)
```cs:line-numbers=1397
		{
			break;
		}
		List<Thing> list7 = TC.things.List(delegate(Thing t) // [!code --]
		List<Thing> list3 = TC.things.List(delegate(Thing t) // [!code ++]
		{
			if (!t.isEquipped || t.blessedState == BlessedState.Doomed || t.IsToolbelt)
			{
```

[`@@ -1405,15 +1405,15 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L1405-L1419)
```cs:line-numbers=1405
			}
			return (t.blessedState < BlessedState.Blessed || EClass.rnd(10) == 0) ? true : false;
		});
		if (list7.Count == 0) // [!code --]
		if (list3.Count == 0) // [!code ++]
		{
			CC.SayNothingHappans();
			break;
		}
		Thing thing6 = list7.RandomItem(); // [!code --]
		TC.Say("curse_hit", TC, thing6); // [!code --]
		thing6.SetBlessedState((thing6.blessedState == BlessedState.Cursed) ? BlessedState.Doomed : BlessedState.Cursed); // [!code --]
		LayerInventory.SetDirty(thing6); // [!code --]
		Thing thing4 = list3.RandomItem(); // [!code ++]
		TC.Say("curse_hit", TC, thing4); // [!code ++]
		thing4.SetBlessedState((thing4.blessedState == BlessedState.Cursed) ? BlessedState.Doomed : BlessedState.Cursed); // [!code ++]
		LayerInventory.SetDirty(thing4); // [!code ++]
		break;
	}
	case EffectId.UncurseEQ:
```

[`@@ -1495,18 +1495,18 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L1495-L1512)
```cs:line-numbers=1495
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

[`@@ -1521,7 +1521,7 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L1521-L1527)
```cs:line-numbers=1521
		bool hex2 = CC.IsHostile(TC);
		List<SourceStat.Row> list6 = EClass.sources.stats.rows.Where((SourceStat.Row con) => con.tag.Contains("random") && con.group == (hex2 ? "Debuff" : "Buff")).ToList();
		int power2 = power;
		for (int m = 0; m < 4 + EClass.rnd(2); m++) // [!code --]
		for (int l = 0; l < 4 + EClass.rnd(2); l++) // [!code ++]
		{
			SourceStat.Row row2 = list6.RandomItem();
			list6.Remove(row2);
```

[`@@ -1542,13 +1542,13 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L1542-L1554)
```cs:line-numbers=1542
		bool isPowerful = TC.IsPowerful;
		string n = actRef.n1;
		int a2 = power;
		int num6 = TC.WIL * (isPowerful ? 20 : 5); // [!code --]
		ConHolyVeil condition3 = TC.GetCondition<ConHolyVeil>(); // [!code --]
		if (condition3 != null) // [!code --]
		int num7 = TC.WIL * (isPowerful ? 20 : 5); // [!code ++]
		ConHolyVeil condition = TC.GetCondition<ConHolyVeil>(); // [!code ++]
		if (condition != null) // [!code ++]
		{
			num6 += condition3.power * 5; // [!code --]
			num7 += condition.power * 5; // [!code ++]
		}
		if (EClass.rnd(a2) < num6 / EClass.sources.stats.alias[n].hexPower && EClass.rnd(10) != 0) // [!code --]
		if (EClass.rnd(a2) < num7 / EClass.sources.stats.alias[n].hexPower && EClass.rnd(10) != 0) // [!code ++]
		{
			TC.Say("debuff_resist", TC);
			CC.DoHostileAction(TC);
```

[`@@ -1696,16 +1696,16 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L1696-L1711)
```cs:line-numbers=1696
		break;
	case EffectId.Revive:
	{
		List<KeyValuePair<int, Chara>> list5 = EClass.game.cards.globalCharas.Where((KeyValuePair<int, Chara> a) => a.Value.isDead && a.Value.faction == EClass.pc.faction && !a.Value.isSummon && a.Value.c_wasInPcParty).ToList(); // [!code --]
		List<KeyValuePair<int, Chara>> list7 = EClass.game.cards.globalCharas.Where((KeyValuePair<int, Chara> a) => a.Value.isDead && a.Value.faction == EClass.pc.faction && !a.Value.isSummon && a.Value.c_wasInPcParty).ToList(); // [!code ++]
		if (TC.IsPCFaction || TC.IsPCFactionMinion)
		{
			if (TC.IsPC && list5.Count == 0) // [!code --]
			if (TC.IsPC && list7.Count == 0) // [!code ++]
			{
				list5 = EClass.game.cards.globalCharas.Where((KeyValuePair<int, Chara> a) => a.Value.CanRevive() && a.Value.isDead && a.Value.faction == EClass.pc.faction && !a.Value.isSummon).ToList(); // [!code --]
				list7 = EClass.game.cards.globalCharas.Where((KeyValuePair<int, Chara> a) => a.Value.CanRevive() && a.Value.isDead && a.Value.faction == EClass.pc.faction && !a.Value.isSummon).ToList(); // [!code ++]
			}
			if (list5.Count > 0) // [!code --]
			if (list7.Count > 0) // [!code ++]
			{
				list5.RandomItem().Value.Chara.GetRevived(); // [!code --]
				list7.RandomItem().Value.Chara.GetRevived(); // [!code ++]
				break;
			}
		}
```

[`@@ -1718,24 +1718,24 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L1718-L1741)
```cs:line-numbers=1718
	case EffectId.DamageMindGreat:
	case EffectId.Weaken:
	{
		bool flag7 = id == EffectId.DamageBody || id == EffectId.DamageBodyGreat; // [!code --]
		bool flag8 = id == EffectId.DamageBody || id == EffectId.DamageBodyGreat; // [!code ++]
		bool mind = id == EffectId.DamageMind || id == EffectId.DamageMindGreat;
		int num7 = ((id == EffectId.DamageBody || id == EffectId.DamageMind) ? 1 : (4 + EClass.rnd(4))); // [!code --]
		int num6 = ((id == EffectId.DamageBody || id == EffectId.DamageMind) ? 1 : (4 + EClass.rnd(4))); // [!code ++]
		if (id == EffectId.Weaken)
		{
			flag7 = EClass.rnd(2) == 0; // [!code --]
			mind = !flag7; // [!code --]
			num7 = 1; // [!code --]
			flag8 = EClass.rnd(2) == 0; // [!code ++]
			mind = !flag8; // [!code ++]
			num6 = 1; // [!code ++]
		}
		else
		{
			TC.PlayEffect("debuff");
			TC.PlaySound("debuff");
		}
		TC.Say(flag7 ? "damageBody" : "damageMind", TC); // [!code --]
		for (int k = 0; k < num7; k++) // [!code --]
		TC.Say(flag8 ? "damageBody" : "damageMind", TC); // [!code ++]
		for (int k = 0; k < num6; k++) // [!code ++]
		{
			TC.DamageTempElements(power, flag7, mind); // [!code --]
			TC.DamageTempElements(power, flag8, mind); // [!code ++]
		}
		if (TC.IsPC)
		{
```

[`@@ -1748,39 +1748,39 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L1748-L1786)
```cs:line-numbers=1748
	case EffectId.EnhanceBodyGreat:
	case EffectId.EnhanceMindGreat:
	{
		bool flag8 = id == EffectId.EnhanceBody || id == EffectId.EnhanceBodyGreat; // [!code --]
		bool flag9 = id == EffectId.EnhanceBody || id == EffectId.EnhanceBodyGreat; // [!code ++]
		bool mind2 = id == EffectId.EnhanceMind || id == EffectId.EnhanceMindGreat;
		int num8 = ((id == EffectId.EnhanceBody || id == EffectId.EnhanceMind) ? 1 : (4 + EClass.rnd(4)));
		TC.Say(flag8 ? "enhanceBody" : "enhanceMind", TC); // [!code --]
		TC.Say(flag9 ? "enhanceBody" : "enhanceMind", TC); // [!code ++]
		TC.PlayEffect("buff");
		TC.PlaySound("buff");
		for (int l = 0; l < num8; l++) // [!code --]
		for (int m = 0; m < num8; m++) // [!code ++]
		{
			TC.EnhanceTempElements(power, flag8, mind2); // [!code --]
			TC.EnhanceTempElements(power, flag9, mind2); // [!code ++]
		}
		break;
	}
	case EffectId.RestoreBody:
	case EffectId.RestoreMind:
	{
		bool flag9 = id == EffectId.RestoreBody; // [!code --]
		bool flag6 = id == EffectId.RestoreBody; // [!code ++]
		if (flag)
		{
			Redirect(flag9 ? EffectId.DamageBodyGreat : EffectId.DamageMindGreat, BlessedState.Normal, default(ActRef)); // [!code --]
			Redirect(flag6 ? EffectId.DamageBodyGreat : EffectId.DamageMindGreat, BlessedState.Normal, default(ActRef)); // [!code ++]
			break;
		}
		TC.Say(flag9 ? "restoreBody" : "restoreMind", TC); // [!code --]
		TC.Say(flag6 ? "restoreBody" : "restoreMind", TC); // [!code ++]
		TC.PlaySound("heal");
		TC.PlayEffect("heal");
		TC.CureHost(flag9 ? CureType.CureBody : CureType.CureMind, power, state); // [!code --]
		TC.CureHost(flag6 ? CureType.CureBody : CureType.CureMind, power, state); // [!code ++]
		if (blessed)
		{
			Redirect(flag9 ? EffectId.EnhanceBodyGreat : EffectId.EnhanceMindGreat, BlessedState.Normal, default(ActRef)); // [!code --]
			Redirect(flag6 ? EffectId.EnhanceBodyGreat : EffectId.EnhanceMindGreat, BlessedState.Normal, default(ActRef)); // [!code ++]
		}
		break;
	}
	case EffectId.HealComplete:
		Dice.Create("SpHealLight", power, CC, actRef.act); // [!code --]
		Dice.Create("SpHealLight", power, CC, (actRef.refThing != null) ? null : actRef.act); // [!code ++]
		TC.HealHPHost(9999, (actRef.refThing == null) ? HealSource.Magic : HealSource.Item);
		TC.CureHost(CureType.HealComplete, power, state);
		TC.Say("heal_heavy", TC);
```

[`@@ -1792,7 +1792,7 @@ public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ActEffect.cs#L1792-L1798)
```cs:line-numbers=1792
		{
			EClass.game.religions.Healing.Talk("ability");
		}
		int num9 = Dice.Create((actRef.act != null && EClass.sources.calc.map.ContainsKey(actRef.act.ID)) ? actRef.act.ID : "SpHealLight", power, CC, actRef.act).Roll(); // [!code --]
		int num9 = Dice.Create((actRef.act != null && EClass.sources.calc.map.ContainsKey(actRef.act.ID)) ? actRef.act.ID : "SpHealLight", power, CC, (actRef.refThing != null) ? null : actRef.act).Roll(); // [!code ++]
		if (flag)
		{
			TC.DamageHP(num9 / 2, 919, power);
```

## BaseBuff

[`@@ -6,4 +6,9 @@ public override int GetPhase()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/BaseBuff.cs#L6-L9)
```cs:line-numbers=6
	{
		return 0;
	}
 // [!code ++]
	public override bool CanStack(Condition c) // [!code ++]
	{ // [!code ++]
		return c.power >= base.power; // [!code ++]
	} // [!code ++]
}
```

## ButtonElement

[`@@ -195,6 +195,12 @@ public void SetGrid(Element e, Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ButtonElement.cs#L195-L200)
```cs:line-numbers=195
		if (element != null)
		{
			num = element.Value;
			if (element.IsGlobalElement && thing.c_idDeity != EClass.pc.faith.id) // [!code ++]
			{ // [!code ++]
				uIItem.text1.SetActive(enable: false); // [!code ++]
				uIItem.image1.color = Color.white.SetAlpha(0.5f); // [!code ++]
				continue; // [!code ++]
			} // [!code ++]
		}
		if (num == 0)
		{
```

## Chara

[`@@ -8696,6 +8696,10 @@ public bool TryNeckHunt(Chara TC, int power, bool harvest = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/Chara.cs#L8696-L8701)
```cs:line-numbers=8696
	{
		return false;
	}
	if (TC.IsPC && EClass.player.invlunerable) // [!code ++]
	{ // [!code ++]
		return false; // [!code ++]
	} // [!code ++]
	PlaySound("hit_finish");
	Say("finish");
	Say("finish2", this, TC);
```

## CharaRenderer

[`@@ -75,7 +75,7 @@ public override void OnEnterScreen()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/CharaRenderer.cs#L75-L81)
```cs:line-numbers=75
	}
	ignoreFirst = false;
	nextframeTimer = 0f;
	if (EClass.core.config.game.haltOnSpotEnemy && owner.ExistsOnMap && !EClass._zone.IsRegion && owner.IsHostile()) // [!code --]
	if (EClass.core.config.game.haltOnSpotEnemy && owner.ExistsOnMap && !EClass._zone.IsRegion && owner.IsHostile() && EClass.pc.CanSeeLos(owner)) // [!code ++]
	{
		EClass.player.enemySpotted = true;
	}
```

## ConStrife

[`@@ -19,6 +19,11 @@ public class ConStrife : BaseBuff`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/ConStrife.cs#L19-L24)
```cs:line-numbers=19

	public int ExpToNext => (lv + 1) * (lv + 1);

	public override bool CanStack(Condition c) // [!code ++]
	{ // [!code ++]
		return true; // [!code ++]
	} // [!code ++]
 // [!code ++]
	public void AddKill(Chara c)
	{
		if (c.IsPCFactionOrMinion)
```

## CoreDebug

[`@@ -905,6 +905,10 @@ public void UpdateInput()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/CoreDebug.cs#L905-L910)
```cs:line-numbers=905
	}
	if (Input.GetKeyDown(KeyCode.F2))
	{
		for (int i = 0; i < 20; i++) // [!code ++]
		{ // [!code ++]
			Debug.Log(Rand.Range(0, 2)); // [!code ++]
		} // [!code ++]
		EClass.player.recipes.Add("b32");
		if (EScriptable.rnd(2) == 0)
		{
```

[`@@ -919,7 +923,7 @@ public void UpdateInput()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/CoreDebug.cs#L919-L925)
```cs:line-numbers=919
	if (Input.GetKeyDown(KeyCode.F3))
	{
		EClass.pc.AddCondition<ConDisease>();
		for (int i = 0; i < 10; i++) // [!code --]
		for (int j = 0; j < 10; j++) // [!code ++]
		{
			Thing thing = ThingGen.Create("egg_fertilized");
			thing.TryMakeRandomItem(40);
```

[`@@ -1021,7 +1025,7 @@ public void UpdateInput()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/CoreDebug.cs#L1021-L1027)
```cs:line-numbers=1021
		if (Input.GetKey(KeyCode.F9))
		{
			EClass.scene.paused = false;
			for (int j = 0; j < advanceMin; j++) // [!code --]
			for (int k = 0; k < advanceMin; k++) // [!code ++]
			{
				EClass.game.updater.FixedUpdate();
			}
```

## Game

[`@@ -461,6 +461,14 @@ public void OnLoad()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/Game.cs#L461-L466)
```cs:line-numbers=461
		}
	}
	TryAddQuest("into_darkness", "exile_kettle");
	if (version.IsBelow(0, 23, 93)) // [!code ++]
	{ // [!code ++]
		RecipeManager.BuildList(); // [!code ++]
		Debug.Log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■feafefaeffaeaffeaaeaefseasfaefaef"); // [!code ++]
		while (TryAddRecipe()) // [!code ++]
		{ // [!code ++]
		} // [!code ++]
	} // [!code ++]
	if (version.IsBelow(0, 23, 72))
	{
		foreach (Chara value2 in EClass.game.cards.globalCharas.Values)
```

[`@@ -610,6 +618,30 @@ void TryAddQuestIfActive(string idQuest, string idReqQuest)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/Game.cs#L610-L615)
```cs:line-numbers=610
			quests.Add(idQuest);
		}
	}
	bool TryAddRecipe() // [!code ++]
	{ // [!code ++]
		foreach (string key in player.recipes.knownRecipes.Keys) // [!code ++]
		{ // [!code ++]
			if (key.Length > 1 && key[0] == 'b') // [!code ++]
			{ // [!code ++]
				RecipeSource recipeSource = RecipeManager.Get(key + "-p"); // [!code ++]
				if (recipeSource != null && !player.recipes.knownRecipes.ContainsKey(recipeSource.id)) // [!code ++]
				{ // [!code ++]
					Debug.Log(recipeSource.id); // [!code ++]
					player.recipes.Add(recipeSource.id, showEffect: false); // [!code ++]
					return true; // [!code ++]
				} // [!code ++]
				recipeSource = RecipeManager.Get(key.Replace("-p", "")); // [!code ++]
				if (recipeSource != null && !player.recipes.knownRecipes.ContainsKey(recipeSource.id)) // [!code ++]
				{ // [!code ++]
					Debug.Log(recipeSource.id); // [!code ++]
					player.recipes.Add(recipeSource.id, showEffect: false); // [!code ++]
					return true; // [!code ++]
				} // [!code ++]
			} // [!code ++]
		} // [!code ++]
		return false; // [!code ++]
	} // [!code ++]
	static bool TryDestroy()
	{
		for (int i = 0; i < EClass.pc.party.members.Count; i++)
```

## InvOwnerCraft

[`@@ -2,7 +2,17 @@ public class InvOwnerCraft : InvOwnerDraglet`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/InvOwnerCraft.cs#L2-L8)
```cs:line-numbers=2
{
	public TraitCrafter crafter;

	public override bool CanTargetAlly => crafter is TraitToolTalisman; // [!code --]
	public override bool CanTargetAlly // [!code ++]
	{ // [!code ++]
		get // [!code ++]
		{ // [!code ++]
			if (!(crafter is TraitToolTalisman)) // [!code ++]
			{ // [!code ++]
				return crafter is TraitRuneMold; // [!code ++]
			} // [!code ++]
			return true; // [!code ++]
		} // [!code ++]
	} // [!code ++]

	public override bool ShowFuel => crafter.IsRequireFuel;

```

## InvOwnerMod

[`@@ -1,5 +1,7 @@`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/InvOwnerMod.cs#L1-L5)
```cs:line-numbers=1
public class InvOwnerMod : InvOwnerDraglet
{
	public override bool CanTargetAlly => true; // [!code ++]
 // [!code ++]
	public override ProcessType processType => ProcessType.None;

	public override string langTransfer => "invMod";
```

## LayerInfo

[`@@ -8,6 +8,10 @@ public class LayerInfo : ELayer`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/LayerInfo.cs#L8-L13)
```cs:line-numbers=8

	public bool examine;

	public Vector2 size; // [!code ++]
 // [!code ++]
	public Vector2 padding; // [!code ++]
 // [!code ++]
	public override void OnAfterInit()
	{
		base.OnAfterInit();
```

[`@@ -28,29 +32,38 @@ public void Set(object o, bool _examine = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/LayerInfo.cs#L28-L56)
```cs:line-numbers=28
		}
	}

	public void Resize() // [!code ++]
	{ // [!code ++]
		windows[0].Rect().sizeDelta = new Vector2(Mathf.Max(info.Rect().sizeDelta.x + padding.x, size.x), size.y); // [!code ++]
	} // [!code ++]
 // [!code ++]
	public void SetThing(Thing t, bool _examine = false)
	{
		examine = _examine;
		windows[0].SetCaption(t.NameSimple.ToTitleCase());
		info.SetThing(t);
		Resize(); // [!code ++]
	}

	public void SetBlock(Cell cell)
	{
		windows[0].SetCaption(cell.GetBlockName());
		info.SetBlock(cell);
		Resize(); // [!code ++]
	}

	public void SetFloor(Cell cell)
	{
		windows[0].SetCaption(cell.GetFloorName());
		info.SetFloor(cell);
		Resize(); // [!code ++]
	}

	public void SetLiquid(Cell cell)
	{
		windows[0].SetCaption(cell.GetLiquidName());
		info.SetLiquid(cell);
		Resize(); // [!code ++]
	}

	public void SetZone(Zone z)
```

[`@@ -59,12 +72,14 @@ public void SetZone(Zone z)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/LayerInfo.cs#L59-L70)
```cs:line-numbers=59
		note.AddHeader(z.Name);
		note.AddText(z.source.GetDetail());
		note.Build();
		Resize(); // [!code ++]
	}

	public void SetObj(Cell cell)
	{
		windows[0].SetCaption(cell.sourceObj.GetName());
		info.SetObj(cell);
		Resize(); // [!code ++]
	}

	public override void OnKill()
```

## Map

[`@@ -1948,14 +1948,19 @@ public void _ValidateInstalled(int x, int y)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/Map.cs#L1948-L1961)
```cs:line-numbers=1948
		HitResult hitResult = item.TileType._HitTest(point, item.Thing, canIgnore: false);
		if (item.Thing.stackOrder != detail.things.IndexOf(item.Thing) || (hitResult != HitResult.Valid && hitResult != HitResult.Warning))
		{
			if (EClass._zone.IsPCFaction) // [!code --]
			bool flag = true; // [!code ++]
			if (EClass._zone.IsPCFaction || item.rarity >= Rarity.Legendary || item.trait is TraitFigure) // [!code ++]
			{
				item.SetPlaceState(PlaceState.roaming); // [!code --]
				flag = false; // [!code ++]
			}
			else // [!code --]
			if (flag) // [!code ++]
			{
				item.Die();
			}
			else // [!code ++]
			{ // [!code ++]
				item.SetPlaceState(PlaceState.roaming); // [!code ++]
			} // [!code ++]
		}
	}
}
```

## Player

[`@@ -2003,7 +2003,6 @@ public void RefreshCurrentHotItem()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/Player.cs#L2003-L2009)
```cs:line-numbers=2003
			currentHotItem = hotItemNoItem;
		}
	}
	Debug.Log(currentHotItem); // [!code --]
	if (currentHotItem != lastHotItem)
	{
		if (lastHotItem != null)
```

## Props

[`@@ -242,8 +242,7 @@ void Find(string id)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/Props.cs#L242-L249)
```cs:line-numbers=242
		{
			foreach (Card item3 in cardMap.GetOrCreate(id))
			{
				Card obj = item3.parent as Card; // [!code --]
				if (obj != null && obj.c_lockLv == 0) // [!code --]
				if (!(item3.parent is Thing thing) || (thing.c_lockLv == 0 && thing.trait.CanUseContent)) // [!code ++]
				{
					TryAdd(item3.Thing);
				}
```

[`@@ -262,12 +261,12 @@ void FindCat(string id)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/Props.cs#L262-L273)
```cs:line-numbers=262
		});
		if (EClass._zone.IsPCFaction || EClass._zone is Zone_Tent || EClass.debug.enable)
		{
			foreach (Thing thing in things) // [!code --]
			foreach (Thing thing2 in things) // [!code ++]
			{
				Card obj2 = thing.parent as Card; // [!code --]
				if (obj2 != null && obj2.c_lockLv == 0 && thing.category.IsChildOf(cat.id) && !thing.IsExcludeFromCraft()) // [!code --]
				Card obj = thing2.parent as Card; // [!code ++]
				if (obj != null && obj.c_lockLv == 0 && thing2.category.IsChildOf(cat.id) && !thing2.IsExcludeFromCraft()) // [!code ++]
				{
					stack.Add(thing); // [!code --]
					stack.Add(thing2); // [!code ++]
				}
			}
		}
```

## Recipe

[`@@ -658,7 +658,7 @@ public virtual void Build(Chara chara, Card t, Point pos, int mat, int dir, int`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/Recipe.cs#L658-L664)
```cs:line-numbers=658
		}
	}
	case "Floor":
		if (pos.sourceObj.tileType.RemoveOnFloorChange && (!BuildMenu.Instance || !EClass.debug.ignoreBuildRule)) // [!code --]
		if (pos.HasObj && pos.sourceObj.tileType.RemoveOnFloorChange && (!BuildMenu.Instance || !EClass.debug.ignoreBuildRule)) // [!code ++]
		{
			EClass._map.SetObj(pos.x, pos.z);
		}
```

## RecipeCard

[`@@ -394,22 +394,30 @@ public override void Build(TaskBuild task)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/RecipeCard.cs#L394-L415)
```cs:line-numbers=394
		}
		card = task.resources[0];
	}
	else if (sourceCard.isChara) // [!code ++]
	{ // [!code ++]
		card = CharaGen.Create(idCard, Mathf.Max(EClass._zone.DangerLv, EClass.pc.LV)); // [!code ++]
	} // [!code ++]
	else
	{
		card = ((!sourceCard.isChara) ? ((Card)ThingGen.Create(idCard, -1, Mathf.Max(EClass._zone.DangerLv, EClass.pc.LV))) : ((Card)CharaGen.Create(idCard, Mathf.Max(EClass._zone.DangerLv, EClass.pc.LV)))); // [!code --]
		if (!card.isChara) // [!code --]
		card = ThingGen.Create(idCard, -1, Mathf.Max(EClass._zone.DangerLv, EClass.pc.LV)); // [!code ++]
		if (!card.IsUnique) // [!code ++]
		{
			if (!card.IsUnique) // [!code --]
			{ // [!code --]
				card.ChangeMaterial(GetMainMaterial()); // [!code --]
			} // [!code --]
			if (base.source.colorIng != 0) // [!code --]
			{ // [!code --]
				card.Dye(GetColorMaterial()); // [!code --]
			} // [!code --]
			if (card.IsContainer) // [!code --]
			card.ChangeMaterial(GetMainMaterial()); // [!code ++]
		} // [!code ++]
		if (base.source.colorIng != 0) // [!code ++]
		{ // [!code ++]
			card.Dye(GetColorMaterial()); // [!code ++]
		} // [!code ++]
		if (card.IsContainer) // [!code ++]
		{ // [!code ++]
			card.RemoveThings(); // [!code ++]
		} // [!code ++]
		foreach (Ingredient ingredient in ingredients) // [!code ++]
		{ // [!code ++]
			if (ingredient.thing != null && ingredient.thing.HasElement(759)) // [!code ++]
			{
				card.RemoveThings(); // [!code --]
				card.elements.SetBase(759, ingredient.thing.Evalue(759)); // [!code ++]
			}
		}
	}
```

## TaskDump

[`@@ -213,20 +213,18 @@ public List<Thing> ListThingsToPut(Thing c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/TaskDump.cs#L213-L232)
```cs:line-numbers=213
		{
			EClass.pc.things.Foreach(delegate(Thing t)
			{
				if (!ExcludeDump(t)) // [!code --]
				if (!list.Contains(t) && !ExcludeDump(t) && t.CanStackTo(ct)) // [!code ++]
				{
					if (data.userFilter)
					{
						switch (data.IsFilterPass(t.GetName(NameStyle.Full, 1))) // [!code --]
						Window.SaveData.FilterResult filterResult = data.IsFilterPass(t.GetName(NameStyle.Full, 1)); // [!code ++]
						if (filterResult != Window.SaveData.FilterResult.Block) // [!code ++]
						{
						case Window.SaveData.FilterResult.Block: // [!code --]
							return; // [!code --]
						case Window.SaveData.FilterResult.PassWithoutFurtherTest: // [!code --]
							_ = 2; // [!code ++]
							list.Add(t);
							return; // [!code --]
						}
					}
					if (t.CanStackTo(ct)) // [!code --]
					else // [!code ++]
					{
						list.Add(t);
					}
```

## Thing

[`@@ -1208,7 +1208,7 @@ public override void WriteNote(UINote n, Action<UINote> onWriteNote = null, IIns`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/Thing.cs#L1208-L1214)
```cs:line-numbers=1208
					return false;
				}
				return (!showEQStats || (e.id != 64 && e.id != 65 && e.id != 66 && e.id != 67)) ? true : false;
			}); // [!code --]
			}, null, ElementContainer.NoteMode.Default, addRaceFeat: false, (Element e, string s) => (mode != IInspect.NoteMode.Info) ? s : (s + " (" + e.Value + ")")); // [!code ++]
		}
		if (sockets != null)
		{
```

## TraitItemProc

[`@@ -30,7 +30,8 @@ public override bool OnUse(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/TraitItemProc.cs#L30-L36)
```cs:line-numbers=30
	}
	ActEffect.Proc(IdEffect, GetParamInt(3, num), owner.blessedState, c, null, new ActRef
	{
		n1 = n1 // [!code --]
		n1 = n1, // [!code ++]
		refThing = owner.Thing // [!code ++]
	});
	if (c.ExistsOnMap)
	{
```

## Zone

[`@@ -1515,7 +1515,7 @@ public void AddGlobalCharasOnActivate()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/6fe5bd62d6acbd866d7ab07362f3faeac61fc6ae/Elin/Zone.cs#L1515-L1521)
```cs:line-numbers=1515
			{
				continue;
			}
			if (c.isRestrained && c.currentZone == EClass.pc.currentZone && c.pos.FindThing<TraitShackle>() == null) // [!code --]
			if (c.isRestrained && c.currentZone == EClass.pc.currentZone && (!c.pos.IsValid || c.pos.FindThing<TraitShackle>() == null)) // [!code ++]
			{
				c.isRestrained = false;
			}
```
