---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 16 files modified. 2 new files created.
version: EA 23.211 Nightly Patch 1
changes: +AI_Churyu/AI_Idle/ActEffect/Affinity/Card/Chara/CoreDebug/Effect/GoalCombat/Map/Religion/SKILL/SLOT/SPELL/TaskCut/+TraitFoodChuryu/TraitRope/TraitRuneMold
---

# EA 23.211 Nightly Patch 1

October 4, 2025

16 files modified. 2 new files created.

## Important Changes

Possible breaking changes. Click the filename to view the chunk.
### [Card (2)](#card)
```cs:no-line-numbers
public void DamageHP(int dmg, AttackSource attackSource = AttackSource.None, Card origin = null) // [!code --]
public void DamageHP(long dmg, AttackSource attackSource = AttackSource.None, Card origin = null) // [!code ++]
```
```cs:no-line-numbers
public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource = AttackSource.None, Card origin = null, bool showEffect = true, Thing weapon = null, Chara originalTarget = null) // [!code --]
public void DamageHP(long dmg, int ele, int eleP = 100, AttackSource attackSource = AttackSource.None, Card origin = null, bool showEffect = true, Thing weapon = null, Chara originalTarget = null) // [!code ++]
```
## +AI_Churyu

::: details File Created
```cs
using System.Collections.Generic;

public class AI_Churyu : AIWork
{
	public Card churyu;

	public Chara slave;

	public override int MaxRestart => 100000;

	public override IEnumerable<Status> Run()
	{
		if (!slave.ExistsOnMap || churyu.GetRootCard() != slave)
		{
			yield return Success();
		}
		if (owner.Dist(slave) < 2)
		{
			if (owner.TalkTopic().IsEmpty())
			{
				owner.Talk("idle");
			}
			owner.PlaySound("Animal/Cat/cat");
			yield return DoWait(1 + EClass.rnd(3));
		}
		else
		{
			yield return DoGoto(slave.pos.GetNearestPoint(allowBlock: false, allowChara: false));
		}
		yield return Restart();
	}
}
```

:::
## AI_Idle

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/AI_Idle.cs#L163-L182)
```cs:line-numbers=163
			Thing thing2 = owner.things.Find("polish_powder");
			if (thing2 != null && EClass._map.props.installed.Find<TraitGrindstone>() != null)
			{
				foreach (Thing thing8 in owner.things) // [!code --]
				foreach (Thing thing9 in owner.things) // [!code ++]
				{
					if (!thing8.IsEquipment || thing8.encLV >= 0) // [!code --]
					if (!thing9.IsEquipment || thing9.encLV >= 0) // [!code ++]
					{
						continue;
					}
					for (int j = 0; j < 5; j++)
					{
						if (thing8.encLV >= 0) // [!code --]
						if (thing9.encLV >= 0) // [!code ++]
						{
							break;
						}
						owner.Say("polish", owner, thing8); // [!code --]
						thing8.ModEncLv(1); // [!code --]
						owner.Say("polish", owner, thing9); // [!code ++]
						thing9.ModEncLv(1); // [!code ++]
						thing2.ModNum(-1);
						if (thing2.isDestroyed)
						{
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/AI_Idle.cs#L500-L508)
```cs:line-numbers=500
		{
			if (owner.noMove)
			{
				foreach (Thing thing9 in owner.pos.Things) // [!code --]
				foreach (Thing thing10 in owner.pos.Things) // [!code ++]
				{
					if (thing9.IsInstalled && thing9.trait is TraitGeneratorWheel) // [!code --]
					if (thing10.IsInstalled && thing10.trait is TraitGeneratorWheel) // [!code ++]
					{
						owner.Talk("labor");
						owner.PlayAnime(AnimeID.Shiver);
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/AI_Idle.cs#L608-L616)
```cs:line-numbers=608
	{
		owner.AddCondition<ConSleep>(1000 + EClass.rnd(1000), force: true);
	}
	if (EClass.rnd(100) == 0 && !owner.noMove && (owner.HasHobbyOrWork("Pet") || owner.HasHobbyOrWork("Fluffy"))) // [!code --]
	if (!owner.noMove) // [!code ++]
	{
		yield return Do(new AI_Mofu()); // [!code --]
		if (EClass.rnd(3) == 0 && owner.IsCat) // [!code ++]
		{ // [!code ++]
			Chara chara2 = ((EClass.rnd(5) == 0) ? EClass.pc.party.members.RandomItem() : EClass._map.charas.RandomItem()); // [!code ++]
			Thing thing5 = chara2.things.Find<TraitFoodChuryu>(); // [!code ++]
			if (chara2 != owner && thing5 != null) // [!code ++]
			{ // [!code ++]
				yield return Do(new AI_Churyu // [!code ++]
				{ // [!code ++]
					churyu = thing5, // [!code ++]
					slave = chara2 // [!code ++]
				}); // [!code ++]
			} // [!code ++]
		} // [!code ++]
		if (EClass.rnd(100) == 0 && (owner.HasHobbyOrWork("Pet") || owner.HasHobbyOrWork("Fluffy"))) // [!code ++]
		{ // [!code ++]
			yield return Do(new AI_Mofu()); // [!code ++]
		} // [!code ++]
	}
	if (EClass.rnd((owner.host != null && owner.GetInt(106) != 0) ? 1000 : 40) == 0 && owner.IsHuman)
	{
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/AI_Idle.cs#L622-L633)
```cs:line-numbers=622
	}
	if (EClass.rnd(100) == 0 && owner.trait is TraitBitch)
	{
		Chara chara2 = DoSomethingToNearChara((Chara c) => c.IsIdle && !c.IsPCParty && !(c.trait is TraitBitch) && c.Evalue(418) <= 0); // [!code --]
		if (chara2 != null) // [!code --]
		Chara chara3 = DoSomethingToNearChara((Chara c) => c.IsIdle && !c.IsPCParty && !(c.trait is TraitBitch) && c.Evalue(418) <= 0); // [!code ++]
		if (chara3 != null) // [!code ++]
		{
			yield return Do(new AI_Fuck
			{
				target = chara2, // [!code --]
				target = chara3, // [!code ++]
				bitch = true
			});
		}
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/AI_Idle.cs#L686-L705)
```cs:line-numbers=686
	}
	if (EClass.rnd(35) == 0 && owner.id == "child" && owner.pos.cell.IsSnowTile)
	{
		foreach (Chara chara3 in EClass._map.charas) // [!code --]
		foreach (Chara chara4 in EClass._map.charas) // [!code ++]
		{
			if (EClass.rnd(3) != 0 && chara3 != owner && chara3.pos.cell.IsSnowTile && chara3.Dist(owner) <= 6 && Los.IsVisible(chara3, owner)) // [!code --]
			if (EClass.rnd(3) != 0 && chara4 != owner && chara4.pos.cell.IsSnowTile && chara4.Dist(owner) <= 6 && Los.IsVisible(chara4, owner)) // [!code ++]
			{
				Thing t3 = ThingGen.Create("snow");
				ActThrow.Throw(owner, chara3.pos, t3); // [!code --]
				ActThrow.Throw(owner, chara4.pos, t3); // [!code ++]
				break;
			}
		}
	}
	if (EClass.rnd(EClass.debug.enable ? 3 : 30) == 0)
	{
		Thing thing5 = owner.things.Find<TraitBall>(); // [!code --]
		if (thing5 == null) // [!code --]
		Thing thing6 = owner.things.Find<TraitBall>(); // [!code ++]
		if (thing6 == null) // [!code ++]
		{
			owner.pos.ForeachNeighbor(delegate(Point p)
			{
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/AI_Idle.cs#L712-L722)
```cs:line-numbers=712
		}
		else
		{
			foreach (Chara chara4 in EClass._map.charas) // [!code --]
			foreach (Chara chara5 in EClass._map.charas) // [!code ++]
			{
				if (EClass.rnd(3) != 0 && chara4 != owner && chara4.Dist(owner) <= 6 && chara4.Dist(owner) >= 3 && Los.IsVisible(chara4, owner)) // [!code --]
				if (EClass.rnd(3) != 0 && chara5 != owner && chara5.Dist(owner) <= 6 && chara5.Dist(owner) >= 3 && Los.IsVisible(chara5, owner)) // [!code ++]
				{
					ActThrow.Throw(owner, chara4.pos, thing5); // [!code --]
					ActThrow.Throw(owner, chara5.pos, thing6); // [!code ++]
					break;
				}
			}
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/AI_Idle.cs#L772-L796)
```cs:line-numbers=772
				break;
			}
			List<Thing> list3 = owner.things.List((Thing a) => a.parent == owner && (a.category.id == "spellbook" || a.category.id == "ancientbook" || a.category.id == "skillbook"), onlyAccessible: true);
			Thing thing6 = null; // [!code --]
			Thing thing7 = null; // [!code ++]
			if (list3.Count > 0)
			{
				thing6 = list3.RandomItem(); // [!code --]
				if (!thing6.trait.CanRead(owner)) // [!code --]
				thing7 = list3.RandomItem(); // [!code ++]
				if (!thing7.trait.CanRead(owner)) // [!code ++]
				{
					thing6 = null; // [!code --]
					thing7 = null; // [!code ++]
				}
			}
			if (thing6 == null) // [!code --]
			if (thing7 == null) // [!code ++]
			{
				if (owner.things.IsFull())
				{
					break;
				}
				thing6 = ThingGen.CreateFromCategory((EClass.rnd(5) != 0) ? "spellbook" : "ancientbook"); // [!code --]
				thing6.isNPCProperty = true; // [!code --]
				thing7 = ThingGen.CreateFromCategory((EClass.rnd(5) != 0) ? "spellbook" : "ancientbook"); // [!code ++]
				thing7.isNPCProperty = true; // [!code ++]
			}
			if (!(thing6.id == "1084") || !owner.IsPCFaction) // [!code --]
			if (!(thing7.id == "1084") || !owner.IsPCFaction) // [!code ++]
			{
				if (!owner.HasElement(285))
				{
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/AI_Idle.cs#L798-L804)
```cs:line-numbers=798
				}
				yield return Do(new AI_Read
				{
					target = thing6 // [!code --]
					target = thing7 // [!code ++]
				});
			}
			break;
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/AI_Idle.cs#L860-L869)
```cs:line-numbers=860
	}
	if (EClass.rnd(100) == 0 && owner.id == "bee")
	{
		Thing thing7 = EClass._map.ListThing<TraitBeekeep>()?.RandomItem(); // [!code --]
		if (thing7 != null) // [!code --]
		Thing thing8 = EClass._map.ListThing<TraitBeekeep>()?.RandomItem(); // [!code ++]
		if (thing8 != null) // [!code ++]
		{
			yield return DoGoto(thing7.pos); // [!code --]
			yield return DoGoto(thing8.pos); // [!code ++]
		}
	}
	if (EClass.rnd(10) == 0 && !EClass._zone.IsUnderwater && (owner.race.tag.Contains("water") || owner.source.tag.Contains("water")) && !owner.pos.IsDeepWater)
```

## ActEffect

[`public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/ActEffect.cs#L1473-L1487)
```cs:line-numbers=1473
		{
			break;
		}
		int hex2 = 0; // [!code --]
		int num10 = 0; // [!code ++]
		foreach (Condition condition4 in TC.conditions)
		{
			if (condition4.Type == ConditionType.Debuff)
			{
				hex2++; // [!code --]
				num10++; // [!code ++]
			}
		}
		if (hex2 == 0) // [!code --]
		if (num10 == 0) // [!code ++]
		{
			CC.SayNothingHappans();
			break;
```

[`public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/ActEffect.cs#L1491-L1513)
```cs:line-numbers=1491
		TC.pos.PlaySound("atk_eleSound");
		TC.conditions.ForeachReverse(delegate(Condition c)
		{
			if (c.Type == ConditionType.Debuff) // [!code --]
			if (c.Type == ConditionType.Debuff && EClass.rnd(3) == 0) // [!code ++]
			{
				c.Kill();
			}
		});
		TC.Say("abShutterHex", TC);
		TC.pos.ForeachNeighbor(delegate(Point p) // [!code --]
		Point center = CC.pos.Copy(); // [!code ++]
		List<Chara> list6 = TC.pos.ListCharasInRadius(TC, 4, (Chara c) => !c.IsFriendOrAbove(CC)); // [!code ++]
		for (int l = 0; l < num10; l++) // [!code ++]
		{
			foreach (Chara item4 in p.ListCharas()) // [!code --]
			TweenUtil.Delay((float)l * 0.1f, delegate // [!code ++]
			{
				if (!item4.IsFriendOrAbove(CC)) // [!code --]
				center.PlaySound("shutterhex"); // [!code ++]
			}); // [!code ++]
			foreach (Chara item4 in list6) // [!code ++]
			{ // [!code ++]
				if (item4.ExistsOnMap) // [!code ++]
				{
					int num10 = Dice.Create("SpShutterHex", power, CC, (actRef.refThing != null) ? null : actRef.act).Roll(); // [!code --]
					item4.DamageHP(num10 * hex2, 919, power, AttackSource.None, CC); // [!code --]
					Effect effect = Effect.Get("spell_moonspear"); // [!code ++]
					TrailRenderer componentInChildren = effect.GetComponentInChildren<TrailRenderer>(); // [!code ++]
					Color startColor = (componentInChildren.endColor = EClass.Colors.elementColors["eleHoly"]); // [!code ++]
					componentInChildren.startColor = startColor; // [!code ++]
					Point pos = item4.pos.Copy(); // [!code ++]
					TweenUtil.Delay((float)l * 0.1f, delegate // [!code ++]
					{ // [!code ++]
						effect.Play(center, 0f, pos); // [!code ++]
					}); // [!code ++]
					int num11 = Dice.Create("SpShutterHex", power, CC, (actRef.refThing != null) ? null : actRef.act).Roll(); // [!code ++]
					item4.DamageHP(num11, 919, power, AttackSource.None, CC, showEffect: false); // [!code ++]
				}
			}
		}); // [!code --]
		} // [!code ++]
		break;
	}
	case EffectId.Draw:
```

[`public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/ActEffect.cs#L1633-L1639)
```cs:line-numbers=1633
		{
			break;
		}
		List<Thing> list8 = TC.things.List(delegate(Thing t) // [!code --]
		List<Thing> list9 = TC.things.List(delegate(Thing t) // [!code ++]
		{
			if (!t.isEquipped || t.blessedState == BlessedState.Doomed || t.IsToolbelt)
			{
```

[`public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/ActEffect.cs#L1641-L1652)
```cs:line-numbers=1641
			}
			return (t.blessedState < BlessedState.Blessed || EClass.rnd(10) == 0) ? true : false;
		});
		if (list8.Count == 0) // [!code --]
		if (list9.Count == 0) // [!code ++]
		{
			CC.SayNothingHappans();
			break;
		}
		Thing thing6 = list8.RandomItem(); // [!code --]
		Thing thing6 = list9.RandomItem(); // [!code ++]
		TC.Say("curse_hit", TC, thing6);
		thing6.SetBlessedState((thing6.blessedState == BlessedState.Cursed) ? BlessedState.Doomed : BlessedState.Cursed);
		LayerInventory.SetDirty(thing6);
```

[`public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/ActEffect.cs#L1668-L1693)
```cs:line-numbers=1668
		List<Thing> list = new List<Thing>();
		TC.things.Foreach(delegate(Thing t)
		{
			int num11 = 0; // [!code --]
			int num13 = 0; // [!code ++]
			if ((t.isEquipped || t.IsRangedWeapon || blessed) && t.blessedState < BlessedState.Normal)
			{
				if (t.blessedState == BlessedState.Cursed)
				{
					num11 = EClass.rnd(200); // [!code --]
					num13 = EClass.rnd(200); // [!code ++]
				}
				if (t.blessedState == BlessedState.Doomed)
				{
					num11 = EClass.rnd(1000); // [!code --]
					num13 = EClass.rnd(1000); // [!code ++]
				}
				if (blessed)
				{
					num11 /= 2; // [!code --]
					num13 /= 2; // [!code ++]
				}
				if (id == EffectId.UncurseEQGreater)
				{
					num11 /= 10; // [!code --]
					num13 /= 10; // [!code ++]
				}
				if (power >= num11) // [!code --]
				if (power >= num13) // [!code ++]
				{
					TC.Say("uncurseEQ_success", t);
					t.SetBlessedState(BlessedState.Normal);
```

[`public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/ActEffect.cs#L1755-L1766)
```cs:line-numbers=1755
	{
		EClass.game.religions.Trickery.Talk("ability");
		bool hex = CC.IsHostile(TC);
		List<SourceStat.Row> list7 = EClass.sources.stats.rows.Where((SourceStat.Row con) => con.tag.Contains("random") && con.group == (hex ? "Debuff" : "Buff")).ToList(); // [!code --]
		List<SourceStat.Row> list8 = EClass.sources.stats.rows.Where((SourceStat.Row con) => con.tag.Contains("random") && con.group == (hex ? "Debuff" : "Buff")).ToList(); // [!code ++]
		int power2 = power;
		for (int l = 0; l < 4 + EClass.rnd(2); l++) // [!code --]
		for (int m = 0; m < 4 + EClass.rnd(2); m++) // [!code ++]
		{
			SourceStat.Row row2 = list7.RandomItem(); // [!code --]
			list7.Remove(row2); // [!code --]
			SourceStat.Row row2 = list8.RandomItem(); // [!code ++]
			list8.Remove(row2); // [!code ++]
			Proc(hex ? EffectId.DebuffKizuami : EffectId.Buff, CC, TC, power2, new ActRef
			{
				n1 = row2.alias
```

[`public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/ActEffect.cs#L2199-L2206)
```cs:line-numbers=2199
		if (TC.HasElement(1211))
		{
			TC.Say("drinkSaltWater_snail", TC);
			int dmg = ((TC.hp > 10) ? (TC.hp - EClass.rnd(10)) : 10000); // [!code --]
			TC.DamageHP(dmg, AttackSource.None, CC); // [!code --]
			int num12 = ((TC.hp > 10) ? (TC.hp - EClass.rnd(10)) : 10000); // [!code ++]
			TC.DamageHP(num12, AttackSource.None, CC); // [!code ++]
		}
		else if (TC.IsPC)
		{
```

[`public static bool DamageEle(Card CC, EffectId id, int power, Element e, List<Po`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/ActEffect.cs#L2366-L2375)
```cs:line-numbers=2366
		{
			power /= 4;
		}
		List<Thing> list6 = TC.things.List((Thing t) => (t.Num <= 1 && t.IsEquipmentOrRanged && !t.IsToolbelt && !t.IsLightsource && t.isEquipped) ? true : false); // [!code --]
		if (list6.Count != 0) // [!code --]
		List<Thing> list7 = TC.things.List((Thing t) => (t.Num <= 1 && t.IsEquipmentOrRanged && !t.IsToolbelt && !t.IsLightsource && t.isEquipped) ? true : false); // [!code ++]
		if (list7.Count != 0) // [!code ++]
		{
			Thing thing5 = list6.RandomItem(); // [!code --]
			Thing thing5 = list7.RandomItem(); // [!code ++]
			TC.Say("acid_hit", TC);
			if (thing5.isAcidproof)
			{
```

## Affinity

[`public Thing OnGift(Thing t)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Affinity.cs#L132-L157)
```cs:line-numbers=132
	Thing result = CC.AddThing(t.Thing);
	EClass.pc.PlaySound("build_resource");
	int num = 0;
	bool num2 = t.HasTag(CTAG.gift); // [!code --]
	bool flag = t.category.IsChildOf(CC.GetFavCat()); // [!code --]
	bool flag2 = t.id == CC.GetFavFood().id; // [!code --]
	bool flag = t.HasTag(CTAG.gift); // [!code ++]
	if (t.trait is TraitFoodChuryu && CC.IsCat) // [!code ++]
	{ // [!code ++]
		flag = true; // [!code ++]
	} // [!code ++]
	bool flag2 = t.category.IsChildOf(CC.GetFavCat()); // [!code ++]
	bool flag3 = t.id == CC.GetFavFood().id; // [!code ++]
	if (EClass.debug.alwaysFavFood && t.trait is TraitFood)
	{
		flag2 = true; // [!code --]
		flag3 = true; // [!code ++]
	}
	num = Mathf.Clamp(t.GetPrice() / (flag2 ? 10 : (flag ? 20 : 200)), 0, 50) + (flag2 ? 20 : (flag ? 5 : 0)); // [!code --]
	num = Mathf.Clamp(t.GetPrice() / (flag3 ? 10 : (flag2 ? 20 : 200)), 0, 50) + (flag3 ? 20 : (flag2 ? 5 : 0)); // [!code ++]
	num = num * (100 + (t.HasElement(757) ? 50 : 0)) / (100 + CC.LV * 10);
	if (num2) // [!code --]
	if (flag) // [!code ++]
	{
		num += 100;
		CC.Say("give_ring", CC);
		CC.Talk("thanks3");
	}
	else if (flag2 || num > 20) // [!code --]
	else if (flag3 || num > 20) // [!code ++]
	{
		CC.Talk("thanks3");
	}
	else if (flag || num > 10) // [!code --]
	else if (flag2 || num > 10) // [!code ++]
	{
		CC.Talk("thanks");
	}
```

## Card

[`public virtual int ApplyProtection(int dmg, int mod = 100)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L3971-L3982)
```cs:line-numbers=3971
		return dmg;
	}

	public void DamageHP(int dmg, AttackSource attackSource = AttackSource.None, Card origin = null) // [!code --]
	public void DamageHP(long dmg, AttackSource attackSource = AttackSource.None, Card origin = null) // [!code ++]
	{
		DamageHP(dmg, 0, 0, attackSource, origin);
	}

	public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource = AttackSource.None, Card origin = null, bool showEffect = true, Thing weapon = null, Chara originalTarget = null) // [!code --]
	public void DamageHP(long dmg, int ele, int eleP = 100, AttackSource attackSource = AttackSource.None, Card origin = null, bool showEffect = true, Thing weapon = null, Chara originalTarget = null) // [!code ++]
	{
		if (hp < 0)
		{
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4058-L4064)
```cs:line-numbers=4058
			{
				num3++;
			}
			dmg = Element.GetResistDamage(dmg, Evalue(e.source.aliasRef), num3); // [!code --]
			dmg = Element.GetResistDamage((int)dmg, Evalue(e.source.aliasRef), num3); // [!code ++]
			dmg = dmg * 100 / (100 + Mathf.Clamp(Evalue(961) * 5, -50, 200));
			dmg = dmg * Mathf.Max(100 - Evalue(93), 10) / 100;
		}
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4069-L4075)
```cs:line-numbers=4069
			Chara chara2 = Chara;
			if (chara2 != null && chara2.isWet)
			{
				dmg /= 3; // [!code --]
				dmg /= 3L; // [!code ++]
			}
			break;
		}
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4110-L4116)
```cs:line-numbers=4110
		{
			dmg = dmg * 100 / (100 + Evalue(435) * 2);
		}
		dmg = dmg * Mathf.Max(0, 100 - Mathf.Min(Evalue((e == Element.Void || e.id == 926) ? 55 : 56), 100) / ((!flag) ? 1 : 2)) / 100; // [!code --]
		dmg = (int)(dmg * Mathf.Max(0, 100 - Mathf.Min(Evalue((e == Element.Void || e.id == 926) ? 55 : 56), 100) / ((!flag) ? 1 : 2)) / 100); // [!code ++]
		if (origin != null && origin.IsPC && EClass.player.codex.Has(id))
		{
			dmg = dmg * (100 + Mathf.Min(10, EClass.player.codex.GetOrCreate(id).weakspot)) / 100;
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4166-L4194)
```cs:line-numbers=4166
		if (dmg >= MaxHP / 10 && Evalue(68) > 0)
		{
			int num7 = MaxHP / 10;
			int num8 = dmg - num7; // [!code --]
			long num8 = dmg - num7; // [!code ++]
			num8 = num8 * 100 / (200 + Evalue(68) * 10);
			dmg = num7 + num8;
		}
	}
	if (origin != null && origin.IsPC && EClass.pc.Evalue(654) > 0)
	{
		dmg = 0; // [!code --]
		dmg = 0L; // [!code ++]
	}
	if (dmg < 0)
	{
		dmg = 0; // [!code --]
		dmg = 0L; // [!code ++]
	} // [!code ++]
	if (dmg > 99999999) // [!code ++]
	{ // [!code ++]
		dmg = 99999999L; // [!code ++]
	}
	int num9 = Mathf.Clamp(dmg * 6 / MaxHP, 0, 4) + ((dmg > 0) ? 1 : 0); // [!code --]
	float num9 = Mathf.Clamp(dmg * 6 / MaxHP, 0f, 4f) + (float)((dmg > 0) ? 1 : 0); // [!code ++]
	int num10 = hp;
	if (Evalue(1421) > 0)
	{
		int num11 = 0; // [!code --]
		int num12 = dmg; // [!code --]
		long num11 = 0L; // [!code ++]
		long num12 = dmg; // [!code ++]
		if (hp > 0)
		{
			num12 = dmg - hp;
			hp -= dmg; // [!code --]
			hp -= (int)dmg; // [!code ++]
			num11 += dmg;
			if (hp < 0 && Chara.mana.value >= 0)
			{
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4206-L4217)
```cs:line-numbers=4206
			if (Chara.mana.value > 0)
			{
				num12 -= Chara.mana.value;
				Chara.mana.value -= dmg; // [!code --]
				Chara.mana.value -= (int)dmg; // [!code ++]
				num11 += dmg;
			}
			if (Chara.mana.value <= 0)
			{
				hp -= num12; // [!code --]
				hp -= (int)num12; // [!code ++]
				num11 += num12;
			}
		}
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4219-L4227)
```cs:line-numbers=4219
	}
	else
	{
		hp -= dmg; // [!code --]
		hp -= (int)dmg; // [!code ++]
	}
	if (isSynced && dmg != 0) // [!code --]
	if (isSynced && dmg != 0L) // [!code ++]
	{
		float ratio = (float)dmg / (float)MaxHP;
		Card c = ((parent is Chara) ? (parent as Chara) : this);
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4230-L4236)
```cs:line-numbers=4230
			c.PlayEffect("blood").SetParticleColor(EClass.Colors.matColors[material.alias].main).Emit(20 + (int)(30f * ratio));
			if (EClass.core.config.test.showNumbers || isThing)
			{
				EClass.scene.damageTextRenderer.Add(this, c, dmg, e); // [!code --]
				EClass.scene.damageTextRenderer.Add(this, c, (int)dmg, e); // [!code ++]
			}
		});
	}
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4291-L4297)
```cs:line-numbers=4291
							Chara.AddCondition<ConFractured>((int)Mathf.Max(10f, 30f - Mathf.Sqrt(Evalue(436))));
							hp = Mathf.Min(half * (int)Mathf.Sqrt(Evalue(436) * 2) / 100, MaxHP / 3);
						});
						goto IL_0f1d; // [!code --]
						goto IL_0f83; // [!code ++]
					}
				}
				if (zoneInstanceBout != null && (bool)LayerDrama.Instance)
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4319-L4325)
```cs:line-numbers=4319
						if (EClass.player.invlunerable)
						{
							EvadeDeath(null);
							goto IL_0f1d; // [!code --]
							goto IL_0f83; // [!code ++]
						}
					}
					if (Evalue(1220) > 0 && Chara.stamina.value >= (IsPC ? (Chara.stamina.max / 2) : (Chara.stamina.max / 3 * 2)))
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4337-L4344)
```cs:line-numbers=4337
			}
		}
	}
	goto IL_0f1d; // [!code --]
	IL_0f1d: // [!code --]
	goto IL_0f83; // [!code ++]
	IL_0f83: // [!code ++]
	if (trait.CanBeAttacked)
	{
		renderer.PlayAnime(AnimeID.HitObj);
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4530-L4542)
```cs:line-numbers=4530
	else if (isChara)
	{
		int num13 = ((attackSource != AttackSource.Condition && attackSource != AttackSource.WeaponEnchant) ? 1 : 2);
		if (num9 >= num13) // [!code --]
		if (num9 >= (float)num13) // [!code ++]
		{
			if (e != Element.Void)
			{
				Say("dmg_" + e.source.alias, this);
			}
			if (e == Element.Void || num9 >= 2) // [!code --]
			if (e == Element.Void || num9 >= 2f) // [!code ++]
			{
				Say("dmg" + num9, this);
			}
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4570-L4582)
```cs:line-numbers=4570
						ele2 = 922;
					}
					Say("reflect_thorne", this, origin);
					origin.DamageHP(Mathf.Clamp(dmg / 10, 1, MaxHP / (origin.IsPowerful ? 200 : 20)), ele2, Power, AttackSource.Condition, this); // [!code --]
					origin.DamageHP((int)Mathf.Clamp(dmg / 10, 1f, MaxHP / (origin.IsPowerful ? 200 : 20)), ele2, Power, AttackSource.Condition, this); // [!code ++]
				}
				if (HasElement(1223) && num14 <= Evalue(1223))
				{
					int ele3 = ((Chara.MainElement == Element.Void) ? 923 : Chara.MainElement.id);
					Say("reflect_acid", this, origin);
					origin.DamageHP(Mathf.Clamp(dmg / 10, 1, MaxHP / (origin.IsPowerful ? 200 : 20)), ele3, Power * 2, AttackSource.Condition, this); // [!code --]
					origin.DamageHP((int)Mathf.Clamp(dmg / 10, 1f, MaxHP / (origin.IsPowerful ? 200 : 20)), ele3, Power * 2, AttackSource.Condition, this); // [!code ++]
				}
			}
			ProcAbsorb();
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4588-L4594)
```cs:line-numbers=4588
	}
	if (dmg > 0)
	{
		int a2 = (int)(100L * (long)(dmg * 100 / MaxHP) / 100) + 1; // [!code --]
		int a2 = (int)(100 * (dmg * 100 / MaxHP) / 100) + 1; // [!code ++]
		a2 = Mathf.Min(a2, Chara.isRestrained ? 15 : 200);
		if (a2 > 0)
		{
```

[`public void DamageHP(int dmg, int ele, int eleP = 100, AttackSource attackSource`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4635-L4641)
```cs:line-numbers=4635
	{
		Chara.AddCondition<ConFear>(100 + EClass.rnd(100));
	}
	if (Chara.ai.Current.CancelWhenDamaged && attackSource != AttackSource.Hunger && attackSource != AttackSource.Fatigue && (!EClass.core.config.test.dontCancelIfZeroDamage || dmg != 0 || !IsPC)) // [!code --]
	if (Chara.ai.Current.CancelWhenDamaged && attackSource != AttackSource.Hunger && attackSource != AttackSource.Fatigue && (!EClass.core.config.test.dontCancelIfZeroDamage || dmg != 0L || !IsPC)) // [!code ++]
	{
		Chara.ai.Current.TryCancel(origin);
	}
```

[`void ProcAbsorb()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4699-L4705)
```cs:line-numbers=4699
			int valueOrDefault2 = (origin.Evalue(661) + weapon?.Evalue(661, ignoreGlobalElement: true)).GetValueOrDefault();
			if (valueOrDefault > 0 && attackSource == AttackSource.Melee && origin.isChara && !origin.Chara.ignoreSPAbsorb && Chara.IsHostile(origin as Chara))
			{
				int num17 = EClass.rnd(3 + Mathf.Clamp(dmg / 100, 0, valueOrDefault / 10)); // [!code --]
				int num17 = EClass.rnd(3 + (int)Mathf.Clamp(dmg / 100, 0f, valueOrDefault / 10)); // [!code ++]
				origin.Chara.stamina.Mod(num17);
				if (IsAliveInCurrentZone)
				{
```

[`void ProcAbsorb()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4708-L4714)
```cs:line-numbers=4708
			}
			if (origin.HasElement(1350) && attackSource == AttackSource.Melee)
			{
				int num18 = EClass.rndHalf(2 + Mathf.Clamp(dmg / 10, 0, origin.Chara.GetPietyValue() + 10)); // [!code --]
				int num18 = EClass.rndHalf(2 + (int)Mathf.Clamp(dmg / 10, 0f, origin.Chara.GetPietyValue() + 10)); // [!code ++]
				origin.Chara.mana.Mod(num18);
				if (IsAliveInCurrentZone)
				{
```

[`void ProcAbsorb()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Card.cs#L4717-L4723)
```cs:line-numbers=4717
			}
			if (valueOrDefault2 > 0 && attackSource == AttackSource.Melee)
			{
				int num19 = EClass.rnd(2 + Mathf.Clamp(dmg / 10, 0, valueOrDefault2 + 10)); // [!code --]
				int num19 = EClass.rnd(2 + (int)Mathf.Clamp(dmg / 10, 0f, valueOrDefault2 + 10)); // [!code ++]
				origin.Chara.mana.Mod(num19);
				if (IsAliveInCurrentZone)
				{
```

## Chara

[`public bool IsPlant`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Chara.cs#L981-L986)
```cs:line-numbers=981
		}
	}

	public bool IsCat // [!code ++]
	{ // [!code ++]
		get // [!code ++]
		{ // [!code ++]
			if (!(race.id == "cat") && !(race.id == "catsister")) // [!code ++]
			{ // [!code ++]
				return race.id == "catgod"; // [!code ++]
			} // [!code ++]
			return true; // [!code ++]
		} // [!code ++]
	} // [!code ++]
 // [!code ++]
	public int DestDist => tactics.DestDist;

	public bool HasNoGoal => ai.IsNoGoal;
```

[`public void RestockEquip(bool onCreate)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Chara.cs#L4610-L4615)
```cs:line-numbers=4610
	{
		return;
	}
	bool flag = true; // [!code ++]
	switch (id)
	{
	case "kettle":
```

[`public void RestockEquip(bool onCreate)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Chara.cs#L4745-L4754)
```cs:line-numbers=4745
			EQ_ID("EtherDagger");
		}
		break;
	case "mech_angel": // [!code ++]
		if (onCreate) // [!code ++]
		{ // [!code ++]
			Thing thing = ThingGen.Create("pole_holy"); // [!code ++]
			thing.SetReplica(on: true); // [!code ++]
			thing.rarity = Rarity.Normal; // [!code ++]
			thing.elements.SetTo(60, -15); // [!code ++]
			thing.elements.SetTo(418, -100); // [!code ++]
			thing.elements.SetTo(93, 50); // [!code ++]
			AddThing(thing); // [!code ++]
			body.Equip(thing); // [!code ++]
			flag = false; // [!code ++]
		} // [!code ++]
		break; // [!code ++]
	}
	if (onCreate || !TryEquipRanged())
	{
		if (id == "mech_scarab") // [!code --]
		string text = id; // [!code ++]
		if (text == "trooper" || text == "mech_scarab") // [!code ++]
		{
			AddThing("gun_laser");
		}
```

[`public void RestockEquip(bool onCreate)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Chara.cs#L4780-L4798)
```cs:line-numbers=4780
	}
	for (int k = 0; k < ((!(race.id == "mutant")) ? 1 : (2 + base.LV / 30)); k++)
	{
		if (source.ContainsTag("boxer")) // [!code --]
		{ // [!code --]
			EQ_CAT("martial"); // [!code --]
		} // [!code --]
		else if (!job.weapon.IsEmpty()) // [!code --]
		if (flag) // [!code ++]
		{
			if (race.id == "mutant" || (body.slotMainHand != null && body.slotMainHand.thing == null)) // [!code --]
			if (source.ContainsTag("boxer")) // [!code ++]
			{
				EQ_CAT(job.weapon.RandomItem()); // [!code --]
				EQ_CAT("martial"); // [!code ++]
			}
			if (race.id == "mutant" || (Evalue(131) > 0 && EClass.rnd(2) == 0)) // [!code --]
			else if (!job.weapon.IsEmpty()) // [!code ++]
			{
				EQ_CAT(job.weapon.RandomItem()); // [!code --]
				if (race.id == "mutant" || (body.slotMainHand != null && body.slotMainHand.thing == null)) // [!code ++]
				{ // [!code ++]
					EQ_CAT(job.weapon.RandomItem()); // [!code ++]
				} // [!code ++]
				if (race.id == "mutant" || (Evalue(131) > 0 && EClass.rnd(2) == 0)) // [!code ++]
				{ // [!code ++]
					EQ_CAT(job.weapon.RandomItem()); // [!code ++]
				} // [!code ++]
			}
		}
		EQ_CAT("torso");
```

[`public void Vomit()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Chara.cs#L5141-L5147)
```cs:line-numbers=5141
	}
	if (hunger.GetPhase() >= 4)
	{
		DamageHP(9999, AttackSource.Hunger); // [!code --]
		DamageHP(9999L, AttackSource.Hunger); // [!code ++]
	}
	hunger.Mod(30);
}
```

[`public void TryDropBossLoot()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Chara.cs#L5528-L5535)
```cs:line-numbers=5528
	{
		bool num2 = EClass._map.FindChara((id == "fairy_raina") ? "fairy_poina" : "fairy_raina") == null;
		QuestNasu questNasu = EClass.game.quests.Get<QuestNasu>();
		if (num2 && questNasu != null && questNasu.phase == 1) // [!code --]
		if (num2 && questNasu != null && questNasu.phase <= 1) // [!code ++]
		{
			if (questNasu.phase == 0) // [!code ++]
			{ // [!code ++]
				questNasu.NextPhase(); // [!code ++]
			} // [!code ++]
			num = 5;
			flag = (flag2 = true);
			EClass.Sound.StopBGM(3f);
```

[`public void Cuddle(Chara c, bool headpat = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Chara.cs#L6101-L6107)
```cs:line-numbers=6101
				ele = 922;
			}
			Say("reflect_thorne", c, this);
			DamageHP(10, ele, Power, AttackSource.Condition); // [!code --]
			DamageHP(10L, ele, Power, AttackSource.Condition); // [!code ++]
		}
	}

```

## CoreDebug

[`public void UpdateInput()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/CoreDebug.cs#L1165-L1171)
```cs:line-numbers=1165
				{
					if (c.IsHostile(EClass.pc))
					{
						c.DamageHP(9999999, AttackSource.Finish, EClass.pc); // [!code --]
						c.DamageHP(9999999L, AttackSource.Finish, EClass.pc); // [!code ++]
					}
				});
			}
```

[`public void UpdateInput()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/CoreDebug.cs#L1173-L1179)
```cs:line-numbers=1173
			{
				for (int num = hitPoint.detail.charas.Count - 1; num >= 0; num--)
				{
					hitPoint.detail.charas[num].DamageHP(9999999, AttackSource.Finish, EClass.pc); // [!code --]
					hitPoint.detail.charas[num].DamageHP(9999999L, AttackSource.Finish, EClass.pc); // [!code ++]
				}
			}
			EInput.Consume();
```

## Effect

[`public Effect _Play(Point from, Vector3 fromV, float fixY = 0f, Point to = null,`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Effect.cs#L123-L129)
```cs:line-numbers=123
	{
		sr.sprite = sprite;
	}
	if (setColor) // [!code --]
	if (setColor && from.IsValid) // [!code ++]
	{
		float num = 0.07f * (float)(int)from.cell.light + EMono.core.screen.tileMap._baseBrightness;
		num += ((from.cell.HasRoof || from.cell.isShadowed) ? (-0.2f) : 0f);
```

## GoalCombat

[`public virtual bool TryUseAbility(int dist, bool beforeMove = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/GoalCombat.cs#L837-L846)
```cs:line-numbers=837
			{
				foreach (Chara member2 in EClass.pc.party.members)
				{
					float num3 = 100f - (float)(member2.mana.value * 100) / MathF.Max(1f, member2.mana.max); // [!code --]
					if (num3 > (float)num) // [!code --]
					float num4 = 100f - (float)(member2.mana.value * 100) / MathF.Max(1f, member2.mana.max); // [!code ++]
					if (num4 > (float)num) // [!code ++]
					{
						num = (int)num3; // [!code --]
						num = (int)num4; // [!code ++]
					}
				}
			}
```

[`public virtual bool TryUseAbility(int dist, bool beforeMove = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/GoalCombat.cs#L856-L861)
```cs:line-numbers=856
			}
			num = 100 - owner.hp * 100 / Mathf.Max(1, owner.MaxHP);
			break;
		case 9200: // [!code ++]
		{ // [!code ++]
			int num3 = 0; // [!code ++]
			foreach (Condition condition in tc.conditions) // [!code ++]
			{ // [!code ++]
				if (condition.Type == ConditionType.Debuff) // [!code ++]
				{ // [!code ++]
					num3++; // [!code ++]
				} // [!code ++]
			} // [!code ++]
			num = num3 * 15; // [!code ++]
			break; // [!code ++]
		} // [!code ++]
		}
		if (s.target == "Neighbor")
		{
```

[`int HealFactor(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/GoalCombat.cs#L909-L944)
```cs:line-numbers=909
			{
				return 0;
			}
			float num4 = (float)c.hp / (float)c.MaxHP; // [!code --]
			if (num4 > (isHOT ? 0.85f : 0.75f)) // [!code --]
			float num5 = (float)c.hp / (float)c.MaxHP; // [!code ++]
			if (num5 > (isHOT ? 0.85f : 0.75f)) // [!code ++]
			{
				return 0;
			}
			int num5 = tactics.P_Heal - (int)((float)tactics.P_Heal * num4) + (isHOT ? 50 : 25); // [!code --]
			foreach (Condition condition in c.conditions) // [!code --]
			int num6 = tactics.P_Heal - (int)((float)tactics.P_Heal * num5) + (isHOT ? 50 : 25); // [!code ++]
			foreach (Condition condition2 in c.conditions) // [!code ++]
			{
				if (condition is ConFear) // [!code --]
				if (condition2 is ConFear) // [!code ++]
				{
					num5 += 10; // [!code --]
					num6 += 10; // [!code ++]
				}
				else if (condition is ConPoison) // [!code --]
				else if (condition2 is ConPoison) // [!code ++]
				{
					num5 += 2; // [!code --]
					num6 += 2; // [!code ++]
				}
				else if (condition is ConConfuse) // [!code --]
				else if (condition2 is ConConfuse) // [!code ++]
				{
					num5 += 4; // [!code --]
					num6 += 4; // [!code ++]
				}
				else if (condition is ConDim) // [!code --]
				else if (condition2 is ConDim) // [!code ++]
				{
					num5 += 6; // [!code --]
					num6 += 6; // [!code ++]
				}
				else if (condition is ConBleed) // [!code --]
				else if (condition2 is ConBleed) // [!code ++]
				{
					num5 += 8; // [!code --]
					num6 += 8; // [!code ++]
				}
			}
			return num5; // [!code --]
			return num6; // [!code ++]
		}
	}
	abilities.Sort((ItemAbility a, ItemAbility b) => b.priority - a.priority);
```

[`void BuildCharaList()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/GoalCombat.cs#L1024-L1031)
```cs:line-numbers=1024
		{
			if (chara2 != owner)
			{
				int num8 = owner.Dist(chara2); // [!code --]
				if (num8 > sightRadius || !owner.CanSeeLos(chara2, num8)) // [!code --]
				int num9 = owner.Dist(chara2); // [!code ++]
				if (num9 > sightRadius || !owner.CanSeeLos(chara2, num9)) // [!code ++]
				{
					continue;
				}
```

[`int ForeachChara(ItemAbility a, Func<Chara, int> func, bool isFriendlyAbility)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/GoalCombat.cs#L1041-L1051)
```cs:line-numbers=1041
			return func(owner);
		}
		BuildCharaList();
		int num9 = 0; // [!code --]
		int num10 = 0; // [!code ++]
		foreach (Chara chara3 in charas)
		{
			int num10 = func(chara3); // [!code --]
			if (num10 > 0) // [!code --]
			int num11 = func(chara3); // [!code ++]
			if (num11 > 0) // [!code ++]
			{
				if (isFriendlyAbility)
				{
```

[`int ForeachChara(ItemAbility a, Func<Chara, int> func, bool isFriendlyAbility)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/GoalCombat.cs#L1062-L1082)
```cs:line-numbers=1062
					}
					if (chara3 != owner)
					{
						num10 += tactics.P_Party; // [!code --]
						num11 += tactics.P_Party; // [!code ++]
					}
				}
				else if (!owner.IsHostile(chara3))
				{
					continue;
				}
				if (num10 >= num9) // [!code --]
				if (num11 >= num10) // [!code ++]
				{
					a.tg = chara3;
					num9 = num10; // [!code --]
					num10 = num11; // [!code ++]
				}
			}
		}
		return num9; // [!code --]
		return num10; // [!code ++]
	}
	int GetAttackMod(Act a)
	{
```

[`int GetAttackMod(Act a)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/GoalCombat.cs#L1084-L1117)
```cs:line-numbers=1084
		{
			return 0;
		}
		int num6 = ((a.source.aliasRef == "mold") ? owner.MainElement.id : EClass.sources.elements.alias[a.source.aliasRef].id); // [!code --]
		int num7 = -15 * tc.ResistLvFrom(num6); // [!code --]
		int num7 = ((a.source.aliasRef == "mold") ? owner.MainElement.id : EClass.sources.elements.alias[a.source.aliasRef].id); // [!code ++]
		int num8 = -15 * tc.ResistLvFrom(num7); // [!code ++]
		if (a is ActSword)
		{
			num7 = 0; // [!code --]
			num8 = 0; // [!code ++]
		}
		switch (num6) // [!code --]
		switch (num7) // [!code ++]
		{
		case 910:
			if (tc.isWet)
			{
				num7 -= 30; // [!code --]
				num8 -= 30; // [!code ++]
			}
			break;
		case 911:
			if (tc.HasCondition<ConBurning>())
			{
				num7 -= 30; // [!code --]
				num8 -= 30; // [!code ++]
			}
			break;
		case 912:
			if (tc.isWet)
			{
				num7 += 30; // [!code --]
				num8 += 30; // [!code ++]
			}
			break;
		}
		return num7; // [!code --]
		return num8; // [!code ++]
	}
	void GetNumEnemy(int radius)
	{
```

## Map

[`public void Burn(int x, int z, bool instant = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Map.cs#L1464-L1470)
```cs:line-numbers=1464
			}
			else
			{
				item.DamageHP(30, 910); // [!code --]
				item.DamageHP(30L, 910); // [!code ++]
			}
		}
	}
```

## Religion

[`public void Punish(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Religion.cs#L491-L497)
```cs:line-numbers=491
	if (c.HasCondition<ConWrath>())
	{
		recentWrath = this;
		c.DamageHP(999999, AttackSource.Wrath); // [!code --]
		c.DamageHP(999999L, AttackSource.Wrath); // [!code ++]
		recentWrath = null;
		return;
	}
```

[`public void PunishTakeOver(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/Religion.cs#L533-L539)
```cs:line-numbers=533
	if (c.HasCondition<ConWrath>())
	{
		recentWrath = this;
		c.DamageHP(999999, AttackSource.Wrath); // [!code --]
		c.DamageHP(999999L, AttackSource.Wrath); // [!code ++]
		recentWrath = null;
		return;
	}
```

## SKILL

[`public class SKILL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SKILL.cs#L122-L128)
```cs:line-numbers=122

	public const int INT = 80;

	public const int LUC = 78; // [!code --]
	public const int SPD = 79; // [!code ++]

	public const int CHA = 77;

```

[`public class SKILL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SKILL.cs#L132-L138)
```cs:line-numbers=132

	public const int gathering = 250;

	public const int SPD = 79; // [!code --]
	public const int LUC = 78; // [!code ++]

	public const int blacksmith = 256;

```

[`public class SKILL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SKILL.cs#L274-L280)
```cs:line-numbers=274
	108, 71, 70, 68, 67, 66, 65, 72, 64, 61,
	60, 57, 56, 55, 51, 62, 73, 74, 75, 107,
	106, 105, 104, 103, 101, 100, 93, 92, 91, 90,
	80, 78, 77, 76, 245, 250, 79, 256, 916, 917, // [!code --]
	80, 79, 77, 76, 245, 250, 78, 256, 916, 917, // [!code ++]
	918, 920, 921, 922, 923, 924, 925, 926, 950, 951,
	952, 953, 915, 954, 956, 957, 958, 959, 960, 961,
	962, 963, 964, 965, 970, 971, 972, 255, 955, 914,
```

## SLOT

[`public class SLOT`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SLOT.cs#L1-L10)
```cs:line-numbers=1
public class SLOT
{
	public const int tool = 40; // [!code --]
	public const int lightsource = 45; // [!code ++]

	public const int torso = 32;

	public const int lightsource = 45; // [!code --]
	public const int tool = 40; // [!code ++]

	public const int back = 33;

```

[`public class SLOT`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SLOT.cs#L34-L40)
```cs:line-numbers=34

	public static readonly int[] IDS = new int[16]
	{
		40, 32, 45, 33, 38, 34, 35, 37, 36, 31, // [!code --]
		45, 32, 40, 33, 38, 34, 35, 37, 36, 31, // [!code ++]
		39, 44, 42, 41, 30, 43
	};
}
```

## SPELL

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SPELL.cs#L6-L19)
```cs:line-numbers=6

	public const int weapon_Sound = 50807;

	public const int hand_Mind = 50404; // [!code ++]
 // [!code ++]
	public const int puddle_Sound = 50907;

	public const int sword_Sound = 51007;

	public const int ball_Nerve = 50108;

	public const int hand_Mind = 50404; // [!code --]
 // [!code --]
	public const int bolt_Nerve = 50308;

	public const int hand_Nerve = 50408;
```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SPELL.cs#L48-L60)
```cs:line-numbers=48

	public const int arrow_Sound = 50507;

	public const int bolt_Poison = 50305; // [!code --]
	public const int ball_Poison = 50105; // [!code ++]

	public const int hand_Sound = 50407;

	public const int arrow_Mind = 50504;

	public const int ball_Poison = 50105; // [!code --]
	public const int bolt_Poison = 50305; // [!code ++]

	public const int sword_Mind = 51004;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SPELL.cs#L234-L240)
```cs:line-numbers=234

	public const int puddle_Darkness = 50903;

	public const int arrow_Fire = 50500; // [!code --]
	public const int hand_Fire = 50400; // [!code ++]

	public const int miasma_Darkness = 50703;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SPELL.cs#L364-L376)
```cs:line-numbers=364

	public const int SpMutation = 8380;

	public const int weapon_Darkness = 50803; // [!code --]
 // [!code --]
	public const int SpSpeedDown = 8710;

	public const int SpTelepathy = 8770; // [!code ++]
 // [!code ++]
	public const int SpInvisibility = 8775;

	public const int hand_Fire = 50400; // [!code --]
	public const int arrow_Fire = 50500; // [!code ++]

	public const int funnel_Fire = 50600;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SPELL.cs#L430-L439)
```cs:line-numbers=430

	public const int bolt_Fire = 50300;

	public const int SpTelepathy = 8770; // [!code --]
 // [!code --]
	public const int puddle_Void = 50916;

	public const int ball_Fire = 50100; // [!code ++]
 // [!code ++]
	public const int SpDrawBacker = 9503;

	public const int SpSeeInvisible = 8776;
```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SPELL.cs#L464-L472)
```cs:line-numbers=464

	public const int SpSummonYeek = 9006;

	public const int SpSummonOrc = 9007; // [!code --]
	public const int weapon_Darkness = 50803; // [!code ++]

	public const int SpSummonFish = 9008; // [!code --]
	public const int SpSummonOrc = 9007; // [!code ++]

	public const int SpSummonTako = 9009;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SPELL.cs#L476-L481)
```cs:line-numbers=476

	public const int SpSummonTidalWave = 9051;

	public const int SpSummonTrooper = 9052; // [!code ++]
 // [!code ++]
	public const int SpMeteor = 9150;

	public const int SpEarthquake = 9151;
```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SPELL.cs#L494-L508)
```cs:line-numbers=494

	public const int SpDrawMetal = 9502;

	public const int ball_Fire = 50100; // [!code --]
	public const int SpSummonFish = 9008; // [!code ++]

	public const int sword_Void = 51016;

	public static readonly int[] IDS = new int[249] // [!code --]
	public static readonly int[] IDS = new int[250] // [!code ++]
	{
		50607, 50707, 50807, 50907, 51007, 50108, 50404, 50308, 50408, 50508, // [!code --]
		50607, 50707, 50807, 50404, 50907, 51007, 50108, 50308, 50408, 50508, // [!code ++]
		50608, 50708, 50304, 50808, 50908, 51008, 50109, 50709, 50309, 50409,
		50509, 50609, 50104, 50507, 50305, 50407, 50504, 50105, 51004, 50405, // [!code --]
		50509, 50609, 50104, 50507, 50105, 50407, 50504, 50305, 51004, 50405, // [!code ++]
		50505, 50605, 50705, 50805, 50905, 51005, 50106, 50904, 50804, 50704,
		50306, 50406, 50506, 50606, 50706, 50806, 50604, 50906, 51006, 50107,
		50307, 50809, 50413, 51009, 50813, 50913, 51013, 50114, 50314, 50414,
```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/SPELL.cs#L511-L530)
```cs:line-numbers=511
		50716, 50816, 50415, 50613, 50513, 51003, 50110, 50310, 50410, 50510,
		50610, 50710, 50810, 50910, 51010, 50111, 50311, 50411, 50511, 50611,
		50711, 50811, 50911, 51011, 50112, 50312, 50412, 50512, 50612, 50712,
		50812, 50912, 51012, 50113, 50313, 50909, 50903, 50500, 50703, 8401, // [!code --]
		50812, 50912, 51012, 50113, 50313, 50909, 50903, 50400, 50703, 8401, // [!code ++]
		8402, 8403, 8404, 8405, 8406, 8430, 8450, 8470, 8471, 8480,
		8490, 8491, 8500, 8501, 8502, 8503, 8504, 8506, 8507, 8510,
		8550, 8555, 8700, 8702, 8704, 8705, 8706, 8707, 8400, 8708,
		8390, 8300, 7001, 7002, 7003, 7004, 7005, 7006, 7007, 7008,
		7800, 8200, 8201, 8202, 8220, 8221, 8230, 8232, 8240, 8241,
		8250, 8251, 8255, 8256, 8260, 8280, 8281, 8284, 8285, 8286,
		8288, 8380, 50803, 8710, 8775, 50400, 50600, 50700, 50800, 50900, // [!code --]
		8288, 8380, 8710, 8770, 8775, 50500, 50600, 50700, 50800, 50900, // [!code ++]
		51000, 50101, 50301, 50401, 50501, 50601, 50701, 50801, 50901, 51001,
		50102, 50302, 50402, 50502, 50602, 50702, 50802, 50902, 51002, 50103,
		50303, 50403, 50503, 50603, 50300, 8770, 50916, 9503, 8776, 8780, // [!code --]
		50303, 50403, 50503, 50603, 50300, 50916, 50100, 9503, 8776, 8780, // [!code ++]
		8790, 8791, 8792, 8800, 8801, 9000, 9001, 9002, 9003, 9004,
		9005, 9006, 9007, 9008, 9009, 9010, 9050, 9051, 9150, 9151, // [!code --]
		9155, 9156, 9160, 9200, 9500, 9501, 9502, 50100, 51016 // [!code --]
		9005, 9006, 50803, 9007, 9009, 9010, 9050, 9051, 9052, 9150, // [!code ++]
		9151, 9155, 9156, 9160, 9200, 9500, 9501, 9502, 9008, 51016 // [!code ++]
	};
}
public class Spell : Ability
```

## TaskCut

[`public override void OnProgress()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/TaskCut.cs#L60-L66)
```cs:line-numbers=60
		pos.Animate(AnimeID.HitObj);
		if (IsToolValid() && EClass.setting.toolConsumeHP)
		{
			Act.TOOL.DamageHP(1); // [!code --]
			Act.TOOL.DamageHP(1L); // [!code ++]
		}
	}

```

## +TraitFoodChuryu

::: details File Created
```cs
public class TraitFoodChuryu : TraitFoodPrepared
{
}
```

:::
## TraitRope

[`public override bool OnUse(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/TraitRope.cs#L5-L11)
```cs:line-numbers=5
	Dialog.YesNo("dialog_rope", delegate
	{
		EClass.player.EndTurn();
		EClass.pc.DamageHP(99999, AttackSource.Hang); // [!code --]
		EClass.pc.DamageHP(99999L, AttackSource.Hang); // [!code ++]
	});
	return false;
}
```

## TraitRuneMold

[`public class TraitRuneMold : TraitCrafter`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fa8e49e14d65bd4035f0fc7bdfcb5956f7ebdc0d/Elin/TraitRuneMold.cs#L18-L24)
```cs:line-numbers=18

	public override bool IsIngredient(string cat, Card c)
	{
		if (c.rarity > MaxRarity || c.c_isImportant) // [!code --]
		if (c.rarity > MaxRarity || c.c_isImportant || c.isReplica) // [!code ++]
		{
			return false;
		}
```
