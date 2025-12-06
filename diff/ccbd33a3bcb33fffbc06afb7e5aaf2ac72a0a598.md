---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 16 files modified.
version: EA 23.244 Nightly
changes: ABILITY/AI_Fuck/AI_Idle/ActPlan/Card/Chara/CharaBody/ConTransmuteBat/CoreDebug/CraftUtil/DramaCustomSequence/QuestDeliver/QuestSupplySpecific/Trait/TraitFoodEggFertilized/WidgetSideScreen
---

# EA 23.244 Nightly

December 6, 2025

16 files modified.

## Important Changes

Possible breaking changes. Click the filename to view the chunk.
### [Card (1)](#card)
```cs:no-line-numbers
public bool HasElement(int ele, int req = 1) // [!code --]
public bool HasElement(int ele, int req) // [!code ++]
```
## ABILITY

[`public class Ability : Act`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/ABILITY.cs#L292-L297)
```cs:line-numbers=292

	public override bool CanPressRepeat => base.source.tag.Contains("repeat");

	public override bool LocalAct => id != 8793; // [!code ++]
 // [!code ++]
	public override bool CanLink(ElementContainer owner)
	{
		if (owner.Card == null)
```

## AI_Fuck

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/AI_Fuck.cs#L85-L91)
```cs:line-numbers=85
	Chara cc = (sell ? target : owner);
	Chara tc = (sell ? owner : target);
	int destDist = ((Type == FuckType.fuck) ? 1 : 1);
	yield return DoGoto(target.pos, destDist); // [!code --]
	if (owner.host != target) // [!code ++]
	{ // [!code ++]
		yield return DoGoto(target.pos, destDist); // [!code ++]
	} // [!code ++]
	cc.Say((variation == Variation.Bloodsuck) ? "suck_start" : (Type.ToString() + "_start"), cc, tc);
	isFail = () => !tc.IsAliveInCurrentZone || tc.Dist(owner) > 3;
	if (Type == FuckType.tame)
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/AI_Fuck.cs#L104-L110)
```cs:line-numbers=104
	for (int i = 0; i < maxProgress; i++)
	{
		progress = i;
		yield return DoGoto(target.pos, destDist); // [!code --]
		if (owner.host != target) // [!code ++]
		{ // [!code ++]
			yield return DoGoto(target.pos, destDist); // [!code ++]
		} // [!code ++]
		switch (Type)
		{
		case FuckType.fuck:
```

## AI_Idle

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/AI_Idle.cs#L104-L109)
```cs:line-numbers=104
					});
				}
			}
			else if (!EClass._zone.IsRegion && owner.HasElement(1250)) // [!code ++]
			{ // [!code ++]
				Chara target = null; // [!code ++]
				for (int j = 0; j < 10; j++) // [!code ++]
				{ // [!code ++]
					Chara chara = EClass._map.charas.RandomItem(); // [!code ++]
					if (chara != owner && chara.Evalue(964) <= 0 && (target == null || (chara.c_bloodData != null && (target.c_bloodData == null || CraftUtil.GetFoodScore(chara.c_bloodData) > CraftUtil.GetFoodScore(target.c_bloodData))))) // [!code ++]
					{ // [!code ++]
						target = chara; // [!code ++]
					} // [!code ++]
				} // [!code ++]
				if (target != null) // [!code ++]
				{ // [!code ++]
					yield return DoGoto(target); // [!code ++]
					owner.UseAbility("ActBloodsuck", target); // [!code ++]
					yield return Success(); // [!code ++]
				} // [!code ++]
			} // [!code ++]
		}
		if (!EClass._zone.IsRegion)
		{
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/AI_Idle.cs#L169-L175)
```cs:line-numbers=169
					{
						continue;
					}
					for (int j = 0; j < 5; j++) // [!code --]
					for (int k = 0; k < 5; k++) // [!code ++]
					{
						if (thing9.encLV >= 0)
						{
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/AI_Idle.cs#L327-L349)
```cs:line-numbers=327
		}
		if (owner.c_uidMaster != 0)
		{
			Chara chara = owner.master; // [!code --]
			if (chara == null || !chara.IsAliveInCurrentZone) // [!code --]
			Chara chara2 = owner.master; // [!code ++]
			if (chara2 == null || !chara2.IsAliveInCurrentZone) // [!code ++]
			{
				chara = owner.FindMaster(); // [!code --]
				chara2 = owner.FindMaster(); // [!code ++]
			}
			if (chara != null && chara.IsAliveInCurrentZone) // [!code --]
			if (chara2 != null && chara2.IsAliveInCurrentZone) // [!code ++]
			{
				if (owner.enemy == null)
				{
					owner.SetEnemy(chara.enemy); // [!code --]
					owner.SetEnemy(chara2.enemy); // [!code ++]
				}
				int num4 = owner.Dist(chara.pos); // [!code --]
				int num4 = owner.Dist(chara2.pos); // [!code ++]
				if (owner.source.aiIdle != "root" && num4 > EClass.game.config.tactics.AllyDistance(owner) && EClass._zone.PetFollow && owner.c_minionType == MinionType.Default)
				{
					if (owner.HasAccess(chara.pos)) // [!code --]
					if (owner.HasAccess(chara2.pos)) // [!code ++]
					{
						owner.TryMoveTowards(chara.pos); // [!code --]
						owner.TryMoveTowards(chara2.pos); // [!code ++]
					}
					yield return KeepRunning();
					continue;
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/AI_Idle.cs#L632-L645)
```cs:line-numbers=632
	{
		if (EClass.rnd(3) == 0 && owner.IsCat)
		{
			Chara chara2 = ((EClass.rnd(5) == 0) ? EClass.pc.party.members.RandomItem() : EClass._map.charas.RandomItem()); // [!code --]
			Thing thing5 = chara2.things.Find<TraitFoodChuryu>(); // [!code --]
			if (chara2 != owner && thing5 != null) // [!code --]
			Chara chara3 = ((EClass.rnd(5) == 0) ? EClass.pc.party.members.RandomItem() : EClass._map.charas.RandomItem()); // [!code ++]
			Thing thing5 = chara3.things.Find<TraitFoodChuryu>(); // [!code ++]
			if (chara3 != owner && thing5 != null) // [!code ++]
			{
				yield return Do(new AI_Churyu
				{
					churyu = thing5,
					slave = chara2 // [!code --]
					slave = chara3 // [!code ++]
				});
			}
		}
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/AI_Idle.cs#L658-L669)
```cs:line-numbers=658
	}
	if (EClass.rnd(100) == 0 && owner.trait is TraitBitch)
	{
		Chara chara3 = DoSomethingToNearChara((Chara c) => c.IsIdle && !c.IsPCParty && !(c.trait is TraitBitch) && c.Evalue(418) <= 0); // [!code --]
		if (chara3 != null) // [!code --]
		Chara chara4 = DoSomethingToNearChara((Chara c) => c.IsIdle && !c.IsPCParty && !(c.trait is TraitBitch) && c.Evalue(418) <= 0); // [!code ++]
		if (chara4 != null) // [!code ++]
		{
			yield return Do(new AI_Fuck
			{
				target = chara3, // [!code --]
				target = chara4, // [!code ++]
				variation = AI_Fuck.Variation.Bitch
			});
		}
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/AI_Idle.cs#L722-L733)
```cs:line-numbers=722
	}
	if (EClass.rnd(35) == 0 && owner.id == "child" && owner.pos.cell.IsSnowTile)
	{
		foreach (Chara chara4 in EClass._map.charas) // [!code --]
		foreach (Chara chara5 in EClass._map.charas) // [!code ++]
		{
			if (EClass.rnd(3) != 0 && chara4 != owner && chara4.pos.cell.IsSnowTile && chara4.Dist(owner) <= 6 && Los.IsVisible(chara4, owner)) // [!code --]
			if (EClass.rnd(3) != 0 && chara5 != owner && chara5.pos.cell.IsSnowTile && chara5.Dist(owner) <= 6 && Los.IsVisible(chara5, owner)) // [!code ++]
			{
				Thing t3 = ThingGen.Create("snow");
				ActThrow.Throw(owner, chara4.pos, t3); // [!code --]
				ActThrow.Throw(owner, chara5.pos, t3); // [!code ++]
				break;
			}
		}
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/AI_Idle.cs#L751-L761)
```cs:line-numbers=751
		}
		else
		{
			foreach (Chara chara5 in EClass._map.charas) // [!code --]
			foreach (Chara chara6 in EClass._map.charas) // [!code ++]
			{
				if (EClass.rnd(3) != 0 && chara5 != owner && chara5.Dist(owner) <= 6 && chara5.Dist(owner) >= 3 && Los.IsVisible(chara5, owner)) // [!code --]
				if (EClass.rnd(3) != 0 && chara6 != owner && chara6.Dist(owner) <= 6 && chara6.Dist(owner) >= 3 && Los.IsVisible(chara6, owner)) // [!code ++]
				{
					ActThrow.Throw(owner, chara5.pos, thing6); // [!code --]
					ActThrow.Throw(owner, chara6.pos, thing6); // [!code ++]
					break;
				}
			}
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/AI_Idle.cs#L907-L913)
```cs:line-numbers=907
	}
	if (EClass.rnd(10) == 0 && !EClass._zone.IsUnderwater && (owner.race.tag.Contains("water") || owner.source.tag.Contains("water")) && !owner.pos.IsDeepWater)
	{
		for (int k = 0; k < 100; k++) // [!code --]
		for (int l = 0; l < 100; l++) // [!code ++]
		{
			Point randomPoint2 = EClass._map.GetRandomPoint();
			if (randomPoint2.IsDeepWater && !randomPoint2.IsBlocked)
```

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/AI_Idle.cs#L940-L948)
```cs:line-numbers=940
	yield return Restart();
	Point FindMovePoint(BaseArea.AccessType type)
	{
		for (int l = 0; l < 20; l++) // [!code --]
		for (int m = 0; m < 20; m++) // [!code ++]
		{
			Point randomPoint3 = owner.pos.GetRandomPoint(5 + l, requireLos: false); // [!code --]
			Point randomPoint3 = owner.pos.GetRandomPoint(5 + m, requireLos: false); // [!code ++]
			if (randomPoint3 != null && randomPoint3.IsInBounds && (randomPoint3.cell.room == null || randomPoint3.cell.room.data.accessType == type))
			{
				return randomPoint3;
```

## ActPlan

[`public void _Update(PointTarget target)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/ActPlan.cs#L548-L553)
```cs:line-numbers=548
							TrySetAct(ACT.Chat, c2);
						}
					}
					if (!c2.IsPC && num <= 2 && ((c2.IsPCFaction && !c2.IsDisabled) || EClass.debug.enable) && input == ActInput.AllAction) // [!code ++]
					{ // [!code ++]
						TrySetAct("actTrade", delegate // [!code ++]
						{ // [!code ++]
							LayerInventory.CreateContainer(c2); // [!code ++]
							return false; // [!code ++]
						}, c2, null, 2); // [!code ++]
					} // [!code ++]
					if (c2.host != EClass.pc)
					{
						TraitShackle traitShackle = c2.pos.FindThing<TraitShackle>();
```

[`public void _Update(PointTarget target)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/ActPlan.cs#L631-L644)
```cs:line-numbers=631
								return false;
							}, c);
						}
						if (!c.IsPC && ((c.IsPCFaction && !c.IsDisabled) || EClass.debug.enable) && input == ActInput.AllAction) // [!code --]
						{ // [!code --]
							TrySetAct("actTrade", delegate // [!code --]
							{ // [!code --]
								LayerInventory.CreateContainer(c); // [!code --]
								return false; // [!code --]
							}, c); // [!code --]
						} // [!code --]
						if (c.host != null && EClass.pc.held != null && altAction)
						{
							bool flag4 = true;
```

## Card

[`public int ResistLv(int res)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/Card.cs#L5897-L5903)
```cs:line-numbers=5897
		return Element.GetResistLv(Evalue(res));
	}

	public bool HasElement(int ele, int req = 1) // [!code --]
	public bool HasElement(int ele, bool includeNagative = false) // [!code ++]
	{ // [!code ++]
		if (elements.Value(ele) <= 0) // [!code ++]
		{ // [!code ++]
			if (includeNagative) // [!code ++]
			{ // [!code ++]
				return elements.Value(ele) < 0; // [!code ++]
			} // [!code ++]
			return false; // [!code ++]
		} // [!code ++]
		return true; // [!code ++]
	} // [!code ++]
 // [!code ++]
	public bool HasElement(int ele, int req) // [!code ++]
	{
		return elements.Value(ele) >= req;
	}
```

## Chara

[`public void TickConditions()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/Chara.cs#L3725-L3735)
```cs:line-numbers=3725
			AddCondition<ConBurning>(1000, force: true);
		}
		break;
	case 15: // [!code --]
		if (HasElement(1250) && !HasCondition<ConVampire>()) // [!code --]
	case 10: // [!code ++]
		if (!HasElement(1250)) // [!code ++]
		{ // [!code ++]
			break; // [!code ++]
		} // [!code ++]
		if (!HasCondition<ConVampire>()) // [!code ++]
		{
			AddCondition<ConVampire>();
		}
		if (!IsPC && !HasCooldown(8793)) // [!code ++]
		{ // [!code ++]
			bool flag = false; // [!code ++]
			flag = ((!HasCondition<ConTransmuteBat>()) ? (!HasElement(431) && pos.IsSunLit) : (body.HasElement(431) || (EClass.world.date.IsNight && !pos.IsSunLit))); // [!code ++]
			if (flag && base.IsPCFactionOrMinion && !EClass._zone.IsPCFactionOrTent && EClass._zone.HasLaw && pos.ListWitnesses(this).Count > 0 && !HasCondition<ConBurning>()) // [!code ++]
			{ // [!code ++]
				flag = false; // [!code ++]
			} // [!code ++]
			if (flag) // [!code ++]
			{ // [!code ++]
				UseAbility("SpTransmuteBat", this); // [!code ++]
			} // [!code ++]
		} // [!code ++]
		break;
	}
	if (turn % 200 == 0)
```

[`public bool CanEat(Thing t, bool shouldEat = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/Chara.cs#L7519-L7524)
```cs:line-numbers=7519
	{
		return false;
	}
	if (HasElement(1250) && !t.HasElement(710)) // [!code ++]
	{ // [!code ++]
		return false; // [!code ++]
	} // [!code ++]
	if (shouldEat && (!(t.trait is TraitFoodPrepared) || t.c_isImportant))
	{
		return false;
```

## CharaBody

[`public bool HasWeapon()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/CharaBody.cs#L387-L392)
```cs:line-numbers=387
		return false;
	}

	public bool HasElement(int idEle) // [!code ++]
	{ // [!code ++]
		foreach (BodySlot slot in slots) // [!code ++]
		{ // [!code ++]
			if (slot.thing != null && slot.thing.elements.Has(idEle)) // [!code ++]
			{ // [!code ++]
				return true; // [!code ++]
			} // [!code ++]
		} // [!code ++]
		return false; // [!code ++]
	} // [!code ++]
 // [!code ++]
	public Thing GetEquippedThing(int elementId)
	{
		foreach (BodySlot slot in slots)
```

## ConTransmuteBat

[`public override void OnStart()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/ConTransmuteBat.cs#L17-L22)
```cs:line-numbers=17
	{
		base.OnStart();
		owner.PlaySound("bat");
		if (!EClass._zone.IsPCFactionOrTent && owner.pos.TryWitnessCrime(owner) && owner == EClass.pc) // [!code ++]
		{ // [!code ++]
			EClass.player.ModKarma(-1); // [!code ++]
		} // [!code ++]
	}

	public override void OnRemoved()
```

[`public override void OnRemoved()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/ConTransmuteBat.cs#L24-L28)
```cs:line-numbers=24
		base.OnRemoved();
		owner.HealHP(owner.MaxHP, HealSource.Item);
		owner.SetCooldown(8793);
		if (!EClass._zone.IsPCFactionOrTent && owner.pos.TryWitnessCrime(owner) && owner == EClass.pc) // [!code ++]
		{ // [!code ++]
			EClass.player.ModKarma(-1); // [!code ++]
		} // [!code ++]
	}
}
```

## CoreDebug

[`public void UpdateInput()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/CoreDebug.cs#L957-L962)
```cs:line-numbers=957
		{
			EClass.pc.Pick(CraftUtil.MakeBloodMeal(EClass.pc, targetChara));
			EClass.pc.Pick(CraftUtil.MakeLoveLunch(targetChara));
			TraitFoodEggFertilized.Incubate(targetChara.MakeEgg(effect: false, 1, addToZone: false, 100), targetChara.pos.GetNearestPoint(allowBlock: false, allowChara: false)); // [!code ++]
		}
		targetChara.ScaleByPrincipal();
		if (EClass.game.quests.Get<QuestDebt>() == null)
```

## CraftUtil

[`public static string GetBloodText(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/CraftUtil.cs#L138-L143)
```cs:line-numbers=138
		return text;
	}

	public static int GetFoodScore(Thing food) // [!code ++]
	{ // [!code ++]
		int num = 0; // [!code ++]
		foreach (Element value in food.elements.dict.Values) // [!code ++]
		{ // [!code ++]
			if (value.IsFoodTraitMain) // [!code ++]
			{ // [!code ++]
				num += value.Value; // [!code ++]
			} // [!code ++]
		} // [!code ++]
		return num; // [!code ++]
	} // [!code ++]
 // [!code ++]
	public static Thing MakeBloodMeal(Chara sucker, Chara feeder, bool msg = true)
	{
		Thing c_bloodData = feeder.c_bloodData;
```

## DramaCustomSequence

[`public void Build(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/DramaCustomSequence.cs#L294-L299)
```cs:line-numbers=294
		{
			Choice2("daJoinParty", "_joinParty");
		}
		if (!c.IsDisabled && (c.HasElement(1250) || (EClass.pc.IsMofuable && c.ability.Has(6627)))) // [!code ++]
		{ // [!code ++]
			Choice2("daSuck", "_suck"); // [!code ++]
		} // [!code ++]
		Choice2("daFactionOther", "_factionOther");
	}
	if (c.trait is TraitLoytel && EClass.game.quests.Get<QuestDebt>() != null)
```

[`public void Build(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/DramaCustomSequence.cs#L576-L581)
```cs:line-numbers=576
	});
	_Talk("tg", GetTopic(c, (c.GetInt(126) == 0) ? "shutup" : "shutup2"));
	End();
	Step("_suck"); // [!code ++]
	_Talk("tg", GetTalk("pervert4")); // [!code ++]
	Method(delegate // [!code ++]
	{ // [!code ++]
		if (c.HasElement(1250)) // [!code ++]
		{ // [!code ++]
			c.UseAbility("ActBloodsuck", EClass.pc); // [!code ++]
		} // [!code ++]
		else // [!code ++]
		{ // [!code ++]
			c.Sniff(EClass.pc); // [!code ++]
		} // [!code ++]
		EClass.player.EndTurn(); // [!code ++]
	}); // [!code ++]
	End(); // [!code ++]
	Step("_insult");
	Method(delegate
	{
```

[`public void Build(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/DramaCustomSequence.cs#L769-L775)
```cs:line-numbers=769
					{
						c.Talk("goodBoy");
						c4.Say("dingExp", c);
						c4.Talk("tailed"); // [!code --]
						c4.Talk("insulted"); // [!code ++]
						c4.SetFeat(1273, 1, msg: true);
						c4.PlayEffect("aura_heaven");
						c4.feat += 10;
```

## QuestDeliver

[`public virtual void SetIdThing()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/QuestDeliver.cs#L62-L68)
```cs:line-numbers=62
	do
	{
		SourceCategory.Row r = GetDeliverCat();
		cardRow = SpawnListThing.Get("cat_" + r.id, (SourceThing.Row s) => EClass.sources.categories.map[s.category].IsChildOf(r.id)).Select(); // [!code --]
		cardRow = SpawnListThing.Get("cat_" + r.id, (SourceThing.Row s) => EClass.sources.categories.map[s.category].IsChildOf(r.id) && (IsDeliver || s.model.trait.CanStack)).Select(); // [!code ++]
	}
	while (cardRow == null);
	idThing = cardRow.id;
```

## QuestSupplySpecific

[`public override void SetIdThing()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/QuestSupplySpecific.cs#L31-L37)
```cs:line-numbers=31
	{
		foreach (SourceThing.Row row in EClass.sources.things.rows)
		{
			if ((i != 0 || !(this is QuestMeal) || row.LV <= num || EClass.rnd(4) == 0) && row.category == idCat && !row.isOrigin && row.chance > 0) // [!code --]
			if ((i != 0 || !(this is QuestMeal) || row.LV <= num || EClass.rnd(4) == 0) && row.category == idCat && !row.isOrigin && row.chance > 0 && row.model.trait.CanStack) // [!code ++]
			{
				list.Add(row);
			}
```

## Trait

[`public void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/Trait.cs#L1896-L1902)
```cs:line-numbers=1896
				break;
			case ShopType.Moyer:
			{
				for (int num12 = 1; num12 <= 16; num12++) // [!code --]
				for (int num12 = 1; num12 <= 17; num12++) // [!code ++]
				{
					AddAdvWeek(num12);
				}
```

[`public Thing CreateStock()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/Trait.cs#L2152-L2158)
```cs:line-numbers=2152
			case ShopType.Dye:
			{
				Thing thing = ThingGen.Create("dye").SetNum(15 + EClass.rnd(30));
				thing.ChangeMaterial(EClass.sources.materials.rows.RandomItem().alias); // [!code --]
				thing.ChangeMaterial(EClass.sources.materials.rows.Where((SourceMaterial.Row r) => r.tier <= 4).RandomItem().alias); // [!code ++]
				return thing;
			}
			case ShopType.GeneralExotic:
```

## TraitFoodEggFertilized

[`public static void MakeBaby(Chara c, int baby)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/TraitFoodEggFertilized.cs#L87-L92)
```cs:line-numbers=87
			c.idSkin = 1;
			break;
		}
		c.bio.birthDay = EClass.world.date.day; // [!code ++]
		c.bio.birthMonth = EClass.world.date.month; // [!code ++]
		c.bio.SetAge(c, 0);
	}

```

## WidgetSideScreen

[`public void SlideMiniGame(float w)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ccbd33a3bcb33fffbc06afb7e5aaf2ac72a0a598/Elin/WidgetSideScreen.cs#L152-L158)
```cs:line-numbers=152

	private void OnEnable()
	{
		Refresh(); // [!code --]
		OnChangeResolution(); // [!code ++]
	}

	private void OnDisable()
```
