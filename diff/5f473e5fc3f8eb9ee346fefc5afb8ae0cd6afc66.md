---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 11 files modified.
version: EA 23.249 Nightly
changes: BaseCondition/Card/Chara/ConBuffStats/ConWeapon/Quest/QuestDialog/QuestIntoDarkness/QuestIntroInspector/QuestVernis/TraitASMR
---

# EA 23.249 Nightly

December 19, 2025

11 files modified.

## Important Changes

**None.**
## BaseCondition

[`public virtual bool ShouldOverride(Condition c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/BaseCondition.cs#L142-L147)
```cs:line-numbers=142
		return false;
	}

	public virtual bool IsOverrideConditionMet(Condition c, int turn) // [!code ++]
	{ // [!code ++]
		return turn > value; // [!code ++]
	} // [!code ++]
 // [!code ++]
	public virtual bool TryMove(Point p)
	{
		return true;
```

## Card

[`public void Create(string _id, int _idMat = -1, int genLv = -1)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/Card.cs#L2767-L2773)
```cs:line-numbers=2767
	{
		rarity = bp.rarity;
	}
	else if (category.slot != 0 && category.slot != 45 && category.slot != 44) // [!code --]
	else if ((category.slot != 0 && category.slot != 45 && category.slot != 44) || IsRangedWeapon) // [!code ++]
	{
		if (EClass.rnd(10) == 0)
		{
```

## Chara

[`public void RestockEquip(bool onCreate)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/Chara.cs#L4864-L4869)
```cs:line-numbers=4864
			EQ_ID("staff_magius");
		}
		break;
	case "sorin": // [!code ++]
		if (onCreate) // [!code ++]
		{ // [!code ++]
			EQ_ID("staff_insanity"); // [!code ++]
		} // [!code ++]
		break; // [!code ++]
	case "robot":
		if (onCreate)
		{
```

[`public Condition AddCondition(Condition c, bool force = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/Chara.cs#L9328-L9334)
```cs:line-numbers=9328
		{
			if (conditions[j].ShouldOverride(c))
			{
				if (num2 > conditions[j].value || num2 * conditions[j].value < 0 || c is ConWeapon) // [!code --]
				if (conditions[j].IsOverrideConditionMet(c, num2)) // [!code ++]
				{
					conditions[j].Kill(silent: true);
					continue;
```

## ConBuffStats

[`public override ConditionType Type`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/ConBuffStats.cs#L23-L28)
```cs:line-numbers=23

	public override bool UseElements => true;

	public override bool IsOverrideConditionMet(Condition c, int turn) // [!code ++]
	{ // [!code ++]
		if ((c as ConBuffStats).isDebuff == isDebuff) // [!code ++]
		{ // [!code ++]
			return base.IsOverrideConditionMet(c, turn); // [!code ++]
		} // [!code ++]
		return true; // [!code ++]
	} // [!code ++]
 // [!code ++]
	public override int EvaluateTurn(int p)
	{
		if (base.refVal2 == 268)
```

## ConWeapon

[`public class ConWeapon : BaseBuff`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/ConWeapon.cs#L9-L14)
```cs:line-numbers=9

	public override int P2 => cha;

	public override bool IsOverrideConditionMet(Condition c, int turn) // [!code ++]
	{ // [!code ++]
		return true; // [!code ++]
	} // [!code ++]
 // [!code ++]
	public override void Tick()
	{
	}
```

## Quest

[`public virtual bool Deliver(Chara c, Thing t = null)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/Quest.cs#L712-L715)
```cs:line-numbers=712
	{
		return false;
	}
 // [!code ++]
	public Chara AddResident(string id) // [!code ++]
	{ // [!code ++]
		Chara chara = CharaGen.Create(id); // [!code ++]
		EClass.Branch.AddMemeber(EClass._zone.AddCard(chara, EClass.pc.pos.GetNearestPoint(allowBlock: false, allowChara: false)) as Chara); // [!code ++]
		Msg.Say("hire".langGame(chara.Name)); // [!code ++]
		return chara; // [!code ++]
	} // [!code ++]
}
```

## QuestDialog

[`public override void OnDropReward()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/QuestDialog.cs#L46-L52)
```cs:line-numbers=46
		EClass.game.quests.Add("exile_meet", "quru").startDate = EClass.world.date.GetRaw() + 43200;
		break;
	case "exile_meet":
		EClass.Branch.AddMemeber(EClass._zone.AddCard(CharaGen.Create("demitas"), EClass.pc.pos.GetNearestPoint(allowBlock: false, allowChara: false)) as Chara); // [!code --]
		AddResident("demitas"); // [!code ++]
		EClass.game.quests.Add("exile_quru", "quru").startDate = EClass.world.date.GetRaw() + 1440;
		break;
	case "exile_quru":
```

[`public override void OnDropReward()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/QuestDialog.cs#L75-L82)
```cs:line-numbers=75
		EClass.game.quests.Add("kettle_join", "loytel").startDate = EClass.world.date.GetRaw() + 1440;
		break;
	case "kettle_join":
		EClass.Branch.AddMemeber(EClass._zone.AddCard(CharaGen.Create("kettle"), EClass.pc.pos.GetNearestPoint(allowBlock: false, allowChara: false)) as Chara); // [!code --]
		EClass.Branch.AddMemeber(EClass._zone.AddCard(CharaGen.Create("quru"), EClass.pc.pos.GetNearestPoint(allowBlock: false, allowChara: false)) as Chara); // [!code --]
		AddResident("kettle"); // [!code ++]
		AddResident("quru"); // [!code ++]
		EClass.game.quests.Add("quru_morning", "loytel").startDate = EClass.world.date.GetRaw() + 1440;
		break;
	case "quru_morning":
```

## QuestIntoDarkness

[`public override void OnStart()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/QuestIntoDarkness.cs#L9-L14)
```cs:line-numbers=9

	public override bool CanUpdateOnTalk(Chara c)
	{
		if (phase == 6) // [!code ++]
		{ // [!code ++]
			return EClass._zone.IsPCFaction; // [!code ++]
		} // [!code ++]
		return false;
	}
 // [!code ++]
	public override void OnComplete() // [!code ++]
	{ // [!code ++]
		AddResident("sorin"); // [!code ++]
	} // [!code ++]
}
```

## QuestIntroInspector

[`public class QuestIntroInspector : QuestProgression`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/QuestIntroInspector.cs#L2-L11)
```cs:line-numbers=2
{
	public override void OnComplete()
	{
		Chara chara = CharaGen.Create("loytel"); // [!code --]
		Chara chara = AddResident("loytel"); // [!code ++]
		chara.SetInt(100, 1);
		EClass._zone.AddCard(chara, EClass.pc.pos.GetNearestPoint()); // [!code --]
		EClass.Branch.AddMemeber(chara); // [!code --]
		EClass.game.quests.globalList.Add(Quest.Create("shippingChest").SetClient(chara, assignQuest: false));
		EClass.game.quests.globalList.Add(Quest.Create("exploration").SetClient(EClass.game.cards.globalCharas.Find("ashland"), assignQuest: false));
	}
```

## QuestVernis

[`public override bool CanUpdateOnTalk(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/QuestVernis.cs#L86-L95)
```cs:line-numbers=86

	public override void OnComplete()
	{
		Chara chara = CharaGen.Create("corgon"); // [!code --]
		chara.SetInt(100, 1); // [!code --]
		EClass._zone.AddCard(chara, EClass.pc.pos.GetNearestPoint()); // [!code --]
		EClass.Branch.AddMemeber(chara); // [!code --]
		AddResident("corgon").SetInt(100, 1); // [!code ++]
		EClass.game.quests.Add("mokyu", "corgon").startDate = EClass.world.date.GetRaw() + 14400;
		EClass.game.quests.Add("pre_debt", "farris").startDate = EClass.world.date.GetRaw() + 28800;
	}
```

## TraitASMR

[`using System;`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/TraitASMR.cs#L1-L4)
```cs:line-numbers=1
using System; // [!code --]
using UnityEngine; // [!code ++]

public class TraitASMR : Trait
{
```

[`public class TraitASMR : Trait`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/5f473e5fc3f8eb9ee346fefc5afb8ae0cd6afc66/Elin/TraitASMR.cs#L6-L21)
```cs:line-numbers=6

	public override bool HaveUpdate => true;

	public override void OnCreate(int lv) // [!code ++]
	{ // [!code ++]
		owner.c_idRefCard = GetParam(1) ?? ((EClass.rnd(EClass.debug.enable ? 2 : 10) == 0) ? "opatos" : ((EClass.rnd(2) == 0) ? "jure" : "")); // [!code ++]
	} // [!code ++]
 // [!code ++]
	public override void OnImportMap() // [!code ++]
	{ // [!code ++]
		if (owner.c_idRefCard.IsEmpty()) // [!code ++]
		{ // [!code ++]
			owner.c_idRefCard = GetParam(1); // [!code ++]
		} // [!code ++]
	} // [!code ++]
 // [!code ++]
	public override void Update()
	{
		if (IsOn) // [!code --]
		if (!IsOn) // [!code ++]
		{ // [!code ++]
			return; // [!code ++]
		} // [!code ++]
		tick++; // [!code ++]
		if (tick % 5 == 0) // [!code ++]
		{
			tick++; // [!code --]
			string[] source = Lang.Get("_ASMR").Split(Environment.NewLine.ToCharArray()); // [!code --]
			if (tick % 5 == 0) // [!code --]
			Debug.Log(owner.c_idRefCard); // [!code ++]
			string[] dialog = Lang.GetDialog("asmr", owner.c_idRefCard.IsEmpty("eyth")); // [!code ++]
			if (dialog.IsEmpty()) // [!code ++]
			{
				owner.TalkRaw(source.RandomItem()); // [!code --]
				dialog = Lang.GetDialog("asmr", "eyth"); // [!code ++]
			}
			owner.TalkRaw(dialog.RandomItem()); // [!code ++]
		}
	}
}
```
