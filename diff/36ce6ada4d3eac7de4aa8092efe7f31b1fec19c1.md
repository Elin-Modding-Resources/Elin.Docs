---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 28 files modified.
version: EA 23.96 Nyaightly
changes: AI_Torture/AM_Adv/ActEffect/ActMelee/BaseListPeople/Card/Chara/CharaBody/CoreDebug/FACTION/Game/GameIndex/GamePrincipal/GrowSystem/GrowSystemTree/HotItemContext/InvOwner/LayerEditBio/LayerLoadGame/LayerWorldSetting/Map/Player/Scene/TraitBaseContainer/TraitBoat/TraitCrafter/UICharaMaker/WindowChara
---

# EA 23.96 Nyaightly

February 26, 2025

28 files modified.

## Important Changes

Possible breaking changes. Click the filename to view the chunk.
### [GamePrincipal (6)](#gameprincipal)
```cs:no-line-numbers
public int GetGrade(int score) // [!code --]

```
```cs:no-line-numbers
public string GetTitle() // [!code --]

```
```cs:no-line-numbers
public int GetScore() // [!code --]
public List<Item> ListItems() // [!code ++]
```
```cs:no-line-numbers
public int GetScore(string s) // [!code --]

```
```cs:no-line-numbers
public int GetValidScore() // [!code --]

```
```cs:no-line-numbers
public void Apply() // [!code --]

```
### [LayerWorldSetting (2)](#layerworldsetting)
```cs:no-line-numbers
public void Refresh() // [!code --]
public void RefreshTemplate() // [!code ++]
```
```cs:no-line-numbers
public void RefreshScore() // [!code --]
public void StartGame() // [!code ++]
```
### [UICharaMaker (1)](#uicharamaker)
```cs:no-line-numbers
public void ListDifficulties() // [!code --]

```
## AI_Torture

[`@@ -87,7 +87,7 @@ public override void OnCancelOrSuccess()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/AI_Torture.cs#L87-L93)
```cs:line-numbers=87
	{
		return;
	}
	owner.AddCondition<ConInvulnerable>(); // [!code --]
	_owner.AddCondition<ConInvulnerable>(); // [!code ++]
	foreach (Chara chara in EClass._map.charas)
	{
		if (chara != _owner && (chara.enemy == _owner || chara.enemy == _owner.parasite || chara.enemy == _owner.ride))
```

## AM_Adv

[`@@ -861,7 +861,7 @@ public override void _OnUpdateInput()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/AM_Adv.cs#L861-L867)
```cs:line-numbers=861
		break;
	}
	case EAction.QuickSave:
		if (EClass.debug.enable || EClass.game.Difficulty.allowManualSave) // [!code --]
		if (EClass.debug.enable || !EClass.game.principal.disableManualSave) // [!code ++]
		{
			if (!EClass.pc.HasNoGoal)
			{
```

[`@@ -875,7 +875,7 @@ public override void _OnUpdateInput()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/AM_Adv.cs#L875-L881)
```cs:line-numbers=875
		break;
	case EAction.QuickLoad:
	{
		if (!EClass.debug.enable && !EClass.game.Difficulty.allowManualSave) // [!code --]
		if (!EClass.debug.enable && EClass.game.principal.disableManualSave) // [!code ++]
		{
			SE.Beep();
			break;
```

## ActEffect

[`@@ -2172,7 +2172,7 @@ public static void LoveMiracle(Chara tc, Chara c, int power)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/ActEffect.cs#L2172-L2178)
```cs:line-numbers=2172
		tc.Say("love_chara", c, tc);
	}
	tc.ModAffinity(EClass.pc, power / 4);
	if (EClass.rnd(2) != 0) // [!code --]
	if (EClass.rnd(2) != 0 && (!EClass._zone.IsUserZone || tc.IsPCFaction || !EClass.game.principal.disableUsermapBenefit)) // [!code ++]
	{
		if (EClass.rnd(2) == 0)
		{
```

[`@@ -2274,6 +2274,7 @@ public static bool Wish(string s, string name, int power, BlessedState state)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/ActEffect.cs#L2274-L2279)
```cs:line-numbers=2274
				}
				Thing thing = ThingGen.Create(r.id, -1, wishLv);
				int num = 1;
				bool flag2 = thing.trait is TraitDeed || thing.rarity >= Rarity.Artifact || thing.source._origin == "artifact_summon"; // [!code ++]
				switch (thing.id)
				{
				case "rod_wish":
```

[`@@ -2291,30 +2292,24 @@ public static bool Wish(string s, string name, int power, BlessedState state)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/ActEffect.cs#L2291-L2320)
```cs:line-numbers=2291
				case "medal":
					num = EClass.rndHalf(wishValue / 3000 + 4);
					break;
				} // [!code --]
				if (num < 1) // [!code --]
				{ // [!code --]
					num = 1; // [!code --]
				} // [!code --]
				if (num == 1 && thing.trait.CanStack) // [!code --]
				{ // [!code --]
					int num2 = wishValue; // [!code --]
					int price = thing.GetPrice(); // [!code --]
					for (int i = 0; i < 1000; i++) // [!code --]
				default: // [!code ++]
					if (!flag2 && thing.trait.CanStack) // [!code ++]
					{
						int num3 = price + 500 + i * Mathf.Max(price, 200); // [!code --]
						if (num2 > num3) // [!code --]
						int num2 = wishValue; // [!code ++]
						int price = thing.GetPrice(); // [!code ++]
						for (int i = 0; i < 1000; i++) // [!code ++]
						{
							num++; // [!code --]
							num2 -= num3; // [!code --]
							int num3 = price + 500 + i * Mathf.Max(price, 200); // [!code ++]
							if (num2 > num3) // [!code ++]
							{ // [!code ++]
								num++; // [!code ++]
								num2 -= num3; // [!code ++]
							} // [!code ++]
						}
					}
					break; // [!code ++]
				}
				if (thing.trait is TraitDeed) // [!code --]
				{ // [!code --]
					num = 1; // [!code --]
				} // [!code --]
				if (thing.source._origin == "artifact_summon") // [!code --]
				if (num < 1) // [!code ++]
				{
					num = 1;
				}
```

## ActMelee

[`@@ -146,6 +146,7 @@ public bool Attack(float dmgMulti = 1f, bool maxRoll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/ActMelee.cs#L146-L151)
```cs:line-numbers=146
	void _Attack(BodySlot slot)
	{
		Act.TC = orgTC;
		Act.TP = orgPos; // [!code ++]
		Thing w;
		int splash;
		int chaser;
```

[`@@ -163,7 +164,7 @@ void _Attack(BodySlot slot)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/ActMelee.cs#L163-L169)
```cs:line-numbers=163
				}
				w = slot.thing;
			}
			int num = ((w == null) ? 1 : (w.Evalue(666) + 1)); // [!code --]
			int num = 1 + Mathf.Max(Act.CC.Evalue(666), (w != null) ? w.Evalue(666) : 0); // [!code ++]
			if (dist <= 1 || dist <= num)
			{
				if (w != null)
```

## BaseListPeople

[`@@ -287,25 +287,7 @@ public override void OnClick(Chara c, ItemGeneral i)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/BaseListPeople.cs#L287-L311)
```cs:line-numbers=287
				}
			});
		});
		if (c == EClass.pc) // [!code --]
		{ // [!code --]
			if (EClass.game.Difficulty.tier > 0) // [!code --]
			{ // [!code --]
				uIContextMenu.AddButton("changeDifficulty", delegate // [!code --]
				{ // [!code --]
					Dialog.YesNo("dialog_changeDifficulty".lang(EClass.game.Difficulty.Name), delegate // [!code --]
					{ // [!code --]
						SE.Play("mutation"); // [!code --]
						if (!EClass.game.Difficulty.allowRevive) // [!code --]
						{ // [!code --]
							EClass.pc.SetFeat(1220, 0); // [!code --]
						} // [!code --]
						EClass.game.idDifficulty--; // [!code --]
					}); // [!code --]
				}); // [!code --]
			} // [!code --]
		} // [!code --]
		else // [!code --]
		if (c != EClass.pc) // [!code ++]
		{
			if (c.sourceCard.idActor.IsEmpty() && c.host == null)
			{
```

## Card

[`@@ -2772,6 +2772,10 @@ public void AddExp(int a)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Card.cs#L2772-L2777)
```cs:line-numbers=2772
		if (IsPCFaction)
		{
			a = a * Mathf.Clamp(100 + Chara.affinity.value / 10, 50, 200) / 100;
			if (EClass.game.principal.petFeatExp) // [!code ++]
			{ // [!code ++]
				a = a * (50 + EClass.game.principal.petFeatExpMtp * 50) / 100; // [!code ++]
			} // [!code ++]
		}
	}
	a = a * (100 + Evalue(1237) * 30) / 100;
```

[`@@ -4651,7 +4655,7 @@ public void SpawnLoot(Card origin)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Card.cs#L4651-L4657)
```cs:line-numbers=4651
		}
		list.Add(thing3);
	}
	if (!IsPCFaction && chance(200)) // [!code --]
	if (!IsPCFaction && (!isUserZone || !EClass.game.principal.disableUsermapBenefit) && chance(200)) // [!code ++]
	{
		list.Add(Chara.MakeGene());
	}
```

[`@@ -4715,6 +4719,10 @@ public void SpawnLoot(Card origin)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Card.cs#L4715-L4720)
```cs:line-numbers=4715
			{
				num5 += 2;
			}
			if (num5 > 0 && EClass.game.principal.dropRate) // [!code ++]
			{ // [!code ++]
				num5 = Mathf.Max(1, num5 * (50 + EClass.game.principal.dropRateMtp * 50) / 100); // [!code ++]
			} // [!code ++]
			List<Thing> list2 = new List<Thing>();
			foreach (Thing thing4 in things)
			{
```

## Chara

[`@@ -498,7 +498,7 @@ public string IDPCCBodySet`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Chara.cs#L498-L504)
```cs:line-numbers=498

	public string NameBraced => GetName(NameStyle.Full);

	public string NameTitled => ((EClass.game.idDifficulty == 0) ? "" : ((EClass.game.idDifficulty == 1) ? "☆" : "★")) + NameBraced; // [!code --]
	public string NameTitled => (EClass.game.principal.permadeath ? "★" : "") + NameBraced; // [!code ++]

	public override string actorPrefab
	{
```

[`@@ -4615,7 +4615,7 @@ public void Revive(Point p = null, bool msg = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Chara.cs#L4615-L4621)
```cs:line-numbers=4615
		{
			Msg.Say("noDeathPenalty2", this);
		}
		else if (EClass.player.stats.days <= 90 && !EClass.debug.enable) // [!code --]
		else if (EClass.player.stats.days <= 90 && !EClass.game.principal.disableDeathPenaltyProtection) // [!code ++]
		{
			Msg.Say("noDeathPenalty", this);
		}
```

## CharaBody

[`@@ -409,7 +409,7 @@ public int GetAttackIndex(Thing t)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/CharaBody.cs#L409-L415)
```cs:line-numbers=409

	public int GetMeleeDistance()
	{
		int num = 0; // [!code --]
		int num = owner.Evalue(666); // [!code ++]
		foreach (BodySlot slot in slots)
		{
			if (slot.elementId == 35 && slot.thing != null && slot.thing.Evalue(666) > num)
```

## CoreDebug

[`@@ -237,8 +237,6 @@ public class DebugCommand`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/CoreDebug.cs#L237-L244)
```cs:line-numbers=237

	public bool allStory;

	public bool skipInitialQuest; // [!code --]
 // [!code --]
	[Header("Log")]
	public bool logAdv;

```

[`@@ -355,8 +353,6 @@ public void QuickStart()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/CoreDebug.cs#L355-L362)
```cs:line-numbers=355
		break;
	}
	EClass.game.StartNewGame();
	EClass.game.principal = IO.DeepCopy(EClass.setting.start.principals[0]); // [!code --]
	EClass.player.validScore = -1; // [!code --]
	EClass.player.flags.OnEnableDebug();
	EClass.player.pref.lastIdTabAbility = 3;
	Zone homeZone = EClass.game.spatials.Find(EClass.game.Prologue.idStartZone);
```

[`@@ -2007,6 +2003,17 @@ public static string ResetPetUpgrades()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/CoreDebug.cs#L2007-L2012)
```cs:line-numbers=2007
		return "Not Implemented.";
	}

	[ConsoleCommand("")] // [!code ++]
	public static string ResetPrincipalSeals() // [!code ++]
	{ // [!code ++]
		if (!CheatEnabled()) // [!code ++]
		{ // [!code ++]
			return EnableCheat; // [!code ++]
		} // [!code ++]
		EClass.game.principal.modified.Clear(); // [!code ++]
		return "Done."; // [!code ++]
	} // [!code ++]
 // [!code ++]
	[ConsoleCommand("")]
	public static string GodMode()
	{
```

## FACTION

[`@@ -398,7 +398,7 @@ public void OnAdvanceMonth()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/FACTION.cs#L398-L404)
```cs:line-numbers=398
	Msg.Say("getBill", Lang._currency(num, "money"));
	TryPayBill(thing2);
	Msg.Say("bills", EClass.player.taxBills.ToString() ?? "");
	if (EClass.player.taxBills >= 4 && !EClass.debug.godMode) // [!code --]
	if (EClass.player.taxBills >= 4 && EClass.game.principal.tax && !EClass.debug.godMode) // [!code ++]
	{
		EClass.player.ModKarma(-50);
	}
```

## Game

[`@@ -256,8 +256,6 @@ private void _OnDeserialized(StreamingContext context)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Game.cs#L256-L263)
```cs:line-numbers=256

	public Prologue Prologue => EClass.setting.start.prologues[idPrologue];

	public GameDifficultySetting Difficulty => EClass.setting.start.difficulties[idDifficulty]; // [!code --]
 // [!code --]
	public bool UseGrid => EClass.core.config.game.useGrid;

	public bool altUI => EClass.core.config.game.altUI;
```

[`@@ -464,10 +462,18 @@ public void OnLoad()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Game.cs#L464-L473)
```cs:line-numbers=464
		}
	}
	TryAddQuest("into_darkness", "exile_kettle");
	if (version.IsBelow(0, 23, 94)) // [!code --]
	if (version.IsBelow(0, 23, 96)) // [!code ++]
	{
		EClass.game.principal = IO.DeepCopy(EClass.setting.start.principals[0]);
		player.validScore = -1; // [!code --]
		player.resetPrincipal = true; // [!code ++]
		GameDifficultySetting gameDifficultySetting = EClass.setting.start.difficulties[idDifficulty]; // [!code ++]
		EClass.game.principal.id = -1; // [!code ++]
		EClass.game.principal.permadeath = gameDifficultySetting.deleteGameOnDeath; // [!code ++]
		EClass.game.principal.disableManualSave = !gameDifficultySetting.allowManualSave; // [!code ++]
		EClass.core.actionsNextFrame.Add(delegate // [!code ++]
		{ // [!code ++]
			EClass.ui.AddLayer<LayerWorldSetting>(); // [!code ++]
		}); // [!code ++]
	}
	if (version.IsBelow(0, 23, 93))
	{
```

[`@@ -717,6 +723,8 @@ public void OnGameInstantiated()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Game.cs#L717-L722)
```cs:line-numbers=717

	public void _Create()
	{
		principal = IO.DeepCopy(EClass.setting.start.principals[0]); // [!code ++]
		idDifficulty = 1; // [!code ++]
		config.snapFreePos = (config.slope = (config.autoWall = true));
		config.autoCombat.abortOnAllyDead = true;
		config.autoCombat.abortOnHalfHP = true;
```

[`@@ -725,7 +733,6 @@ public void _Create()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Game.cs#L725-L731)
```cs:line-numbers=725
	config.autoCombat.bDontChangeTarget = true;
	config.autoCombat.abortOnKill = true;
	config.autoCombat.abortOnItemLoss = true;
	idDifficulty = 1; // [!code --]
	seed = EClass.rnd(10000);
	Debug.Log("creating game: " + id + " seed:" + seed);
	uniforms.Import();
```

## GameIndex

[`@@ -14,8 +14,6 @@ public class GameIndex : EClass`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/GameIndex.cs#L14-L21)
```cs:line-numbers=14

	public string color;

	public int difficulty; // [!code --]
 // [!code --]
	public int days;

	public int deepest;
```

[`@@ -42,6 +40,8 @@ public class GameIndex : EClass`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/GameIndex.cs#L42-L47)
```cs:line-numbers=42

	public bool cloud;

	public bool permaDeath; // [!code ++]
 // [!code ++]
	public Dictionary<string, string> fallbackTypes = new Dictionary<string, string>();

	[JsonIgnore]
```

[`@@ -75,8 +75,8 @@ public GameIndex Create(Game game)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/GameIndex.cs#L75-L82)
```cs:line-numbers=75
		zoneName = game.player.zone.Name;
		pcName = EClass.pc.c_altName;
		aka = EClass.pc.Aka;
		permaDeath = game.principal.permadeath; // [!code ++]
		date = game.world.date.Copy();
		difficulty = game.idDifficulty; // [!code --]
		idPortrait = EClass.pc.c_idPortrait;
		idRace = EClass.pc.race.id;
		idJob = EClass.pc.job.id;
```

## GamePrincipal

[`@@ -1,12 +1,114 @@`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/GamePrincipal.cs#L1-L12)
```cs:line-numbers=1
using System;
using System.Collections.Generic; // [!code ++]
using Newtonsoft.Json;
using UnityEngine; // [!code --]

[Serializable]
public class GamePrincipal : EClass
{
	public enum Type // [!code ++]
	{ // [!code ++]
		Oath, // [!code ++]
		Workaround // [!code ++]
	} // [!code ++]
 // [!code ++]
	public class Item // [!code ++]
	{ // [!code ++]
		public string id; // [!code ++]
 // [!code ++]
		public Type type; // [!code ++]
 // [!code ++]
		public Func<bool> _get; // [!code ++]
 // [!code ++]
		public Action<bool> _set; // [!code ++]
 // [!code ++]
		public int grade; // [!code ++]
 // [!code ++]
		public bool IsEmbark // [!code ++]
		{ // [!code ++]
			get // [!code ++]
			{ // [!code ++]
				if (EClass.core.IsGameStarted) // [!code ++]
				{ // [!code ++]
					return EClass.player.resetPrincipal; // [!code ++]
				} // [!code ++]
				return true; // [!code ++]
			} // [!code ++]
		} // [!code ++]
 // [!code ++]
		public bool Get() // [!code ++]
		{ // [!code ++]
			return _get(); // [!code ++]
		} // [!code ++]
 // [!code ++]
		public void Set(bool value) // [!code ++]
		{ // [!code ++]
			_set(value); // [!code ++]
		} // [!code ++]
 // [!code ++]
		public bool IsModified() // [!code ++]
		{ // [!code ++]
			return Get() != EClass.game.principal.GetField<bool>(id); // [!code ++]
		} // [!code ++]
 // [!code ++]
		public bool WasSealed() // [!code ++]
		{ // [!code ++]
			if (EClass.game.principal.modified.Contains(id) || IsEmbark) // [!code ++]
			{ // [!code ++]
				return false; // [!code ++]
			} // [!code ++]
			bool num = type == Type.Oath; // [!code ++]
			bool field = EClass.game.principal.GetField<bool>(id); // [!code ++]
			if (num) // [!code ++]
			{ // [!code ++]
				return field; // [!code ++]
			} // [!code ++]
			return !field; // [!code ++]
		} // [!code ++]
 // [!code ++]
		public bool IsSealed() // [!code ++]
		{ // [!code ++]
			if (EClass.game.principal.modified.Contains(id)) // [!code ++]
			{ // [!code ++]
				return false; // [!code ++]
			} // [!code ++]
			bool num = type == Type.Oath; // [!code ++]
			bool flag = Get(); // [!code ++]
			bool flag2 = (IsEmbark ? flag : EClass.game.principal.GetField<bool>(id)); // [!code ++]
			if (num) // [!code ++]
			{ // [!code ++]
				return flag2 && flag; // [!code ++]
			} // [!code ++]
			if (!flag2) // [!code ++]
			{ // [!code ++]
				return !flag; // [!code ++]
			} // [!code ++]
			return false; // [!code ++]
		} // [!code ++]
	} // [!code ++]
 // [!code ++]
	public class ItemSlider : Item // [!code ++]
	{ // [!code ++]
		public int max; // [!code ++]
 // [!code ++]
		public Func<int> _getInt; // [!code ++]
 // [!code ++]
		public Action<int> _setInt; // [!code ++]
 // [!code ++]
		public Func<int, string> funcText; // [!code ++]
 // [!code ++]
		public int GetInt() // [!code ++]
		{ // [!code ++]
			return _getInt(); // [!code ++]
		} // [!code ++]
 // [!code ++]
		public void SetInt(int value) // [!code ++]
		{ // [!code ++]
			_setInt(value); // [!code ++]
		} // [!code ++]
	} // [!code ++]
 // [!code ++]
	[JsonProperty]
	public int idTemplate; // [!code --]
	public int id; // [!code ++]

	[JsonProperty]
	public int socre;
```

[`@@ -14,6 +116,9 @@ public class GamePrincipal : EClass`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/GamePrincipal.cs#L14-L19)
```cs:line-numbers=14
	[JsonProperty]
	public int dropRateMtp;

	[JsonProperty] // [!code ++]
	public int petFeatExpMtp; // [!code ++]
 // [!code ++]
	[JsonProperty]
	public bool ignoreEvaluate;

```

[`@@ -41,101 +146,66 @@ public class GamePrincipal : EClass`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/GamePrincipal.cs#L41-L141)
```cs:line-numbers=41
	[JsonProperty]
	public bool dropRate;

	public bool IsCustom => idTemplate == -1; // [!code --]
	[JsonProperty] // [!code ++]
	public bool petFeatExp; // [!code ++]

	public int GetGrade(int score) // [!code --]
	{ // [!code --]
		return Mathf.Clamp(score / 20, 0, 5); // [!code --]
	} // [!code --]
	[JsonProperty] // [!code ++]
	public HashSet<string> modified = new HashSet<string>(); // [!code ++]

	public string GetTitle() // [!code --]
	{ // [!code --]
		int grade = GetGrade(GetScore()); // [!code --]
		return Lang.GetList("pp_titles")[grade]; // [!code --]
	} // [!code --]
	public bool IsCustom => id == -1; // [!code ++]

	public int GetScore() // [!code --]
	public List<Item> ListItems() // [!code ++]
	{
		if (ignoreEvaluate) // [!code --]
		{ // [!code --]
			return 0; // [!code --]
		} // [!code --]
		int num = 0; // [!code --]
		if (tax) // [!code --]
		{ // [!code --]
			num += GetScore("tax"); // [!code --]
		} // [!code --]
		if (disableManualSave) // [!code --]
		List<Item> list = new List<Item>(); // [!code ++]
		Add(1, Type.Oath, "disableManualSave", () => disableManualSave, delegate(bool a) // [!code ++]
		{
			num += GetScore("disableManualSave"); // [!code --]
		} // [!code --]
		if (disableDeathPenaltyProtection) // [!code --]
			disableManualSave = a; // [!code ++]
		}); // [!code ++]
		Add(1, Type.Oath, "disableDeathPenaltyProtection", () => disableDeathPenaltyProtection, delegate(bool a) // [!code ++]
		{
			num += GetScore("disableDeathPenaltyProtection"); // [!code --]
		} // [!code --]
		if (disableUsermapBenefit) // [!code --]
			disableDeathPenaltyProtection = a; // [!code ++]
		}); // [!code ++]
		Add(1, Type.Oath, "disableUsermapBenefit", () => disableUsermapBenefit, delegate(bool a) // [!code ++]
		{
			num += GetScore("disableUsermapBenefit"); // [!code --]
		} // [!code --]
		if (permadeath) // [!code --]
			disableUsermapBenefit = a; // [!code ++]
		}); // [!code ++]
		Add(3, Type.Oath, "permadeath", () => permadeath, delegate(bool a) // [!code ++]
		{
			num += GetScore("permadeath"); // [!code --]
		} // [!code --]
		if (infiniteMarketFund) // [!code --]
			permadeath = a; // [!code ++]
		}); // [!code ++]
		AddSlider(2, Type.Workaround, "dropRate", () => dropRate, delegate(bool a) // [!code ++]
		{
			num += GetScore("infiniteMarketFund"); // [!code --]
		} // [!code --]
		if (opMilk) // [!code --]
			dropRate = a; // [!code ++]
		}, () => dropRateMtp, delegate(int a) // [!code ++]
		{
			num += GetScore("opMilk"); // [!code --]
		} // [!code --]
		if (dropRate) // [!code --]
			dropRateMtp = a; // [!code ++]
		}, (int a) => 0.5f + 0.5f * (float)a + "x", 5); // [!code ++]
		return list; // [!code ++]
		void Add(int grade, Type type, string id, Func<bool> _get, Action<bool> _set) // [!code ++]
		{
			num += GetScore("dropRate"); // [!code --]
		} // [!code --]
		if (num >= 0) // [!code --]
		{ // [!code --]
			return num; // [!code --]
		} // [!code --]
		return 0; // [!code --]
	} // [!code --]
 // [!code --]
	public int GetScore(string s) // [!code --]
	{ // [!code --]
		if (ignoreEvaluate) // [!code --]
		{ // [!code --]
			return 0; // [!code --]
			list.Add(new Item // [!code ++]
			{ // [!code ++]
				type = type, // [!code ++]
				grade = grade, // [!code ++]
				id = id, // [!code ++]
				_get = _get, // [!code ++]
				_set = _set // [!code ++]
			}); // [!code ++]
		}
		return s switch // [!code --]
		{ // [!code --]
			"tax" => 20,  // [!code --]
			"disableManualSave" => 20,  // [!code --]
			"disableDeathPenaltyProtection" => 10,  // [!code --]
			"disableUsermapBenefit" => 20,  // [!code --]
			"permadeath" => 50,  // [!code --]
			"infiniteMarketFund" => -40,  // [!code --]
			"opMilk" => -40,  // [!code --]
			"dropRate" => 20 + dropRateMtp * -10,  // [!code --]
			_ => 0,  // [!code --]
		}; // [!code --]
	} // [!code --]
 // [!code --]
	public int GetValidScore() // [!code --]
	{ // [!code --]
		int score = GetScore(); // [!code --]
		if (EClass.player.validScore != -1) // [!code --]
		void AddSlider(int grade, Type type, string id, Func<bool> _get, Action<bool> _set, Func<int> _getInt, Action<int> _setInt, Func<int, string> funcText, int max) // [!code ++]
		{
			if (score >= EClass.player.validScore) // [!code --]
			list.Add(new ItemSlider // [!code ++]
			{
				return EClass.player.validScore; // [!code --]
			} // [!code --]
			return score; // [!code --]
				type = type, // [!code ++]
				grade = grade, // [!code ++]
				id = id, // [!code ++]
				_get = _get, // [!code ++]
				_set = _set, // [!code ++]
				_getInt = _getInt, // [!code ++]
				_setInt = _setInt, // [!code ++]
				funcText = funcText, // [!code ++]
				max = max // [!code ++]
			}); // [!code ++]
		}
		return score; // [!code --]
	} // [!code --]
 // [!code --]
	public void Apply() // [!code --]
	{ // [!code --]
		EClass.player.validScore = GetScore(); // [!code --]
	}
}
```

## GrowSystem

[`@@ -573,6 +573,10 @@ public Thing TryPopSeed(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/GrowSystem.cs#L573-L578)
```cs:line-numbers=573
		{
			num /= 5;
		}
		if (EClass._zone.IsUserZone && EClass.game.principal.disableUsermapBenefit) // [!code ++]
		{ // [!code ++]
			return null; // [!code ++]
		} // [!code ++]
		if (EClass.player.isAutoFarming || EClass.rnd(num) < EClass.rnd(source.chance))
		{
			Thing thing = TraitSeed.MakeSeed(source, EClass._map.TryGetPlant(cell));
```

## GrowSystemTree

[`@@ -170,7 +170,7 @@ public override void OnMineObj(Chara c = null)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/GrowSystemTree.cs#L170-L176)
```cs:line-numbers=170
		TryPick(GrowSystem.cell, IsPalulu ? "leaf_palulu" : "bark", -1, 1 + PlantBonus() / 2);
		TryPick(GrowSystem.cell, "log", id, 1 + EClass.rnd(3) + PlantBonus(), applySeed: true);
		TryPick(GrowSystem.cell, "resin", -1, 1 + PlantBonus() / 2);
		if (!EClass.player.isAutoFarming) // [!code --]
		if ((!EClass._zone.IsUserZone || !EClass.game.principal.disableUsermapBenefit) && !EClass.player.isAutoFarming) // [!code ++]
		{
			if (EClass.rnd(500) == 0)
			{
```

[`@@ -185,7 +185,7 @@ public override void OnMineObj(Chara c = null)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/GrowSystemTree.cs#L185-L191)
```cs:line-numbers=185
	}
	TryPick(GrowSystem.cell, "bark", -1, EClass.rnd(3) + PlantBonus());
	TryPick(GrowSystem.cell, "resin", -1, 1 + PlantBonus() / 2);
	if (!EClass.player.isAutoFarming) // [!code --]
	if ((!EClass._zone.IsUserZone || !EClass.game.principal.disableUsermapBenefit) && !EClass.player.isAutoFarming) // [!code ++]
	{
		TryPick(GrowSystem.cell, TraitSeed.MakeSeed(GrowSystem.cell.sourceObj, plant).SetNum(1 + EClass.rnd(3)), c);
		if (EClass.rnd(100) == 0)
```

## HotItemContext

[`@@ -137,7 +137,7 @@ public static void Show(string id, Vector3 pos)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/HotItemContext.cs#L137-L143)
```cs:line-numbers=137
				EClass.ui.AddLayer<LayerHoard>();
			});
			i.AddSeparator();
			if (EClass.game.Difficulty.allowManualSave || EClass.debug.enable) // [!code --]
			if (!EClass.game.principal.disableManualSave || EClass.debug.enable) // [!code ++]
			{
				i.AddButton("save", delegate
				{
```

## InvOwner

[`@@ -1447,7 +1447,7 @@ public ListInteraction ListInteractions(ButtonGrid b, bool context)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/InvOwner.cs#L1447-L1453)
```cs:line-numbers=1447
					t.ShowSplitMenu(b, (HasTrader && currency != 0 && !owner.IsPC) ? new Transaction(b) : null);
				});
			}
			if (owner.IsPC && AllowDrop(t)) // [!code --]
			if (owner.IsPC) // [!code ++]
			{
				flag4 = true;
				listInteraction.Add(t.c_isImportant ? "important_off" : "important_on", 299, delegate
```

[`@@ -1456,7 +1456,7 @@ public ListInteraction ListInteractions(ButtonGrid b, bool context)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/InvOwner.cs#L1456-L1462)
```cs:line-numbers=1456
					LayerInventory.SetDirty(t);
					SE.ClickOk();
				});
				if (!EClass._zone.IsRegion) // [!code --]
				if (AllowDrop(t)) // [!code ++]
				{
					listInteraction.Add(flag ? "dragForget" : "actDrop", 300, delegate
					{
```

## LayerEditBio

[`@@ -12,8 +12,6 @@ public class LayerEditBio : ELayer`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/LayerEditBio.cs#L12-L19)
```cs:line-numbers=12

	public Image imageBG;

	private bool started; // [!code --]
 // [!code --]
	public override void OnAfterAddLayer()
	{
		if (ELayer.game == null)
```

[`@@ -42,35 +40,9 @@ public void SetChara(Chara c, UnityAction _onKill = null)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/LayerEditBio.cs#L42-L76)
```cs:line-numbers=42

	public void OnClickStart()
	{
		if (!ELayer.game.Difficulty.allowManualSave) // [!code --]
		{ // [!code --]
			Dialog.YesNo("dialog_warnManualSave".lang(ELayer.game.Difficulty.Name), delegate // [!code --]
			{ // [!code --]
				Start(); // [!code --]
			}); // [!code --]
		} // [!code --]
		else // [!code --]
		{ // [!code --]
			Start(); // [!code --]
		} // [!code --]
		void Start() // [!code --]
		if (!ELayer.ui.GetLayer<LayerWorldSetting>()) // [!code ++]
		{
			if (!started) // [!code --]
			{ // [!code --]
				started = true; // [!code --]
				if (!ELayer.debug.skipInitialQuest) // [!code --]
				{ // [!code --]
					if (!LayerDrama.Instance) // [!code --]
					{ // [!code --]
						LayerDrama.ActivateMain("mono", "1-1"); // [!code --]
					} // [!code --]
					else // [!code --]
					{ // [!code --]
						LayerTitle.KillActor(); // [!code --]
						ELayer.game.StartNewGame(); // [!code --]
					} // [!code --]
				} // [!code --]
			} // [!code --]
			ELayer.ui.AddLayer<LayerWorldSetting>(); // [!code ++]
		}
	}

```

## LayerLoadGame

[`@@ -123,7 +123,7 @@ public void RefreshList()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/LayerLoadGame.cs#L123-L129)
```cs:line-numbers=123
			string s = a.Title + ((ELayer.core.IsGameStarted && a.id == Game.id) ? "currentSave".lang() : "") + Environment.NewLine;
			b.mainText.SetText(s, c);
			b.subText.SetText(a.RealDate ?? "");
			b.subText2.SetText(((a.difficulty == 2) ? "★" : ((a.difficulty == 1) ? "☆" : "")) + a.pcName + " (" + a.zoneName + ")", c); // [!code --]
			b.subText2.SetText((a.permaDeath ? "★" : "") + a.pcName + " (" + a.zoneName + ")", c); // [!code ++]
			b.GetComponent<UIItem>().text1.SetText(a.version.GetText() + (cloud ? (" " + "isCloud".lang()) : ""));
		},
		onClick = delegate(GameIndex a, UIButton b)
```

## LayerWorldSetting

[`@@ -1,4 +1,5 @@`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/LayerWorldSetting.cs#L1-L4)
```cs:line-numbers=1
using System.Collections.Generic;
using System.Linq; // [!code ++]
using UnityEngine;
using UnityEngine.UI;

```

[`@@ -8,6 +9,8 @@ public class LayerWorldSetting : ELayer`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/LayerWorldSetting.cs#L8-L13)
```cs:line-numbers=8

	public List<UIButton> buttonTemplates;

	public GamePrincipal pp; // [!code ++]
 // [!code ++]
	public UIButton toggleEvaluate;

	public UIButton toggleDeathPenaltyProtection;
```

[`@@ -32,16 +35,54 @@ public class LayerWorldSetting : ELayer`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/LayerWorldSetting.cs#L32-L47)
```cs:line-numbers=32

	public UIText textValidScore;

	public UIText textDetail; // [!code ++]
 // [!code ++]
	public UISlider sliderDropRate;

	public Image imageScoreBar;

	public GamePrincipal pp => ELayer.game.principal; // [!code --]
	public UIButton moldToggle; // [!code ++]
 // [!code ++]
	public UIButton moldSlider; // [!code ++]
 // [!code ++]
	public UIButton buttonEmbark; // [!code ++]
 // [!code ++]
	public UIButton buttonWorkaround; // [!code ++]
 // [!code ++]
	public UIItem moldHeader; // [!code ++]
 // [!code ++]
	public Transform transCustom; // [!code ++]
 // [!code ++]
	public Transform transMold; // [!code ++]
 // [!code ++]
	public List<Sprite> sprites; // [!code ++]
 // [!code ++]
	private bool started; // [!code ++]

	public int IdxCustom => 3;

	public bool IsEmbark // [!code ++]
	{ // [!code ++]
		get // [!code ++]
		{ // [!code ++]
			if (ELayer.core.IsGameStarted) // [!code ++]
			{ // [!code ++]
				return ELayer.player.resetPrincipal; // [!code ++]
			} // [!code ++]
			return true; // [!code ++]
		} // [!code ++]
	} // [!code ++]
 // [!code ++]
	public override void OnInit()
	{
		buttonEmbark.SetActive(IsEmbark); // [!code ++]
		buttonWorkaround.SetActive(!IsEmbark); // [!code ++]
		if (IsEmbark) // [!code ++]
		{ // [!code ++]
			ELayer.game.principal.modified.Clear(); // [!code ++]
		} // [!code ++]
		pp = IO.DeepCopy(ELayer.game.principal); // [!code ++]
		transMold.SetActive(enable: false); // [!code ++]
		for (int j = 0; j < buttonTemplates.Count; j++)
		{
			int i = j;
```

[`@@ -56,24 +97,29 @@ public override void OnInit()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/LayerWorldSetting.cs#L56-L79)
```cs:line-numbers=56
				SetTemplate(i);
			});
		}
		buttonWorkaround.SetToggle(ELayer.player.showWorkaround, delegate(bool a) // [!code ++]
		{ // [!code ++]
			ELayer.player.showWorkaround = a; // [!code ++]
			Refresh(); // [!code ++]
		}); // [!code ++]
		Refresh();
	}

	public void SetTemplate(int idx)
	{
		pp.idTemplate = idx; // [!code --]
		pp.id = idx; // [!code ++]
		if (idx == IdxCustom)
		{
			pp.idTemplate = -1; // [!code --]
			pp.id = -1; // [!code ++]
		}
		else
		{
			ELayer.game.principal = IO.DeepCopy(ELayer.setting.start.principals[idx]); // [!code --]
			pp = IO.DeepCopy(ELayer.setting.start.principals[idx]); // [!code ++]
		}
		Refresh();
	}

	public void Refresh() // [!code --]
	public void RefreshTemplate() // [!code ++]
	{
		if (pp.IsCustom)
		{
```

[`@@ -81,76 +127,107 @@ public void Refresh()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/LayerWorldSetting.cs#L81-L156)
```cs:line-numbers=81
		}
		else
		{
			groupTemplate.Select(pp.idTemplate); // [!code --]
			groupTemplate.Select(pp.id); // [!code ++]
		}
		toggleEvaluate.SetToggleWithScore(pp.ignoreEvaluate, delegate(bool a) // [!code --]
		{ // [!code --]
			Toggle(ref pp.ignoreEvaluate, a); // [!code --]
			Refresh(); // [!code --]
		}, 0); // [!code --]
		toggleTax.SetToggleWithScore(pp.tax, delegate(bool a) // [!code --]
		{ // [!code --]
			Toggle(ref pp.tax, a); // [!code --]
		}, pp.GetScore("tax")); // [!code --]
		toggleDeathPenaltyProtection.SetToggleWithScore(pp.disableDeathPenaltyProtection, delegate(bool a) // [!code --]
		{ // [!code --]
			Toggle(ref pp.disableDeathPenaltyProtection, a); // [!code --]
		}, pp.GetScore("disableDeathPenaltyProtection")); // [!code --]
		toggleManualSave.SetToggleWithScore(pp.disableManualSave, delegate(bool a) // [!code --]
		{ // [!code --]
			Toggle(ref pp.disableManualSave, a); // [!code --]
		}, pp.GetScore("disableManualSave")); // [!code --]
		toggleUsermapBenefit.SetToggleWithScore(pp.disableUsermapBenefit, delegate(bool a) // [!code --]
		{ // [!code --]
			Toggle(ref pp.disableUsermapBenefit, a); // [!code --]
		}, pp.GetScore("disableUsermapBenefit")); // [!code --]
		toggleDropRate.SetToggleWithScore(pp.dropRate, delegate(bool a) // [!code --]
		{ // [!code --]
			Toggle(ref pp.dropRate, a); // [!code --]
		}, pp.GetScore("dropRate")); // [!code --]
		togglePermadeath.SetToggleWithScore(pp.permadeath, delegate(bool a) // [!code --]
		{ // [!code --]
			Toggle(ref pp.permadeath, a); // [!code --]
		}, pp.GetScore("permadeath")); // [!code --]
		toggleInfiniteMarketFund.SetToggleWithScore(pp.infiniteMarketFund, delegate(bool a) // [!code --]
		{ // [!code --]
			Toggle(ref pp.infiniteMarketFund, a); // [!code --]
		}, pp.GetScore("infiniteMarketFund")); // [!code --]
		toggleOPMilk.SetToggleWithScore(pp.opMilk, delegate(bool a) // [!code --]
		{ // [!code --]
			Toggle(ref pp.opMilk, a); // [!code --]
		}, pp.GetScore("opMilk")); // [!code --]
		sliderDropRate.SetSlider(pp.dropRateMtp, (float a) => (float)(int)a * 0.5f + "x", 0, 10, notify: false); // [!code --]
		sliderDropRate.onValueChanged.RemoveAllListeners(); // [!code --]
		sliderDropRate.onValueChanged.AddListener(delegate(float a) // [!code --]
		textDetail.SetText(("vow_" + pp.id).lang()); // [!code ++]
	} // [!code ++]
 // [!code ++]
	public void Refresh() // [!code ++]
	{ // [!code ++]
		RefreshTemplate(); // [!code ++]
		transCustom.DestroyChildren(); // [!code ++]
		List<GamePrincipal.Item> items = pp.ListItems(); // [!code ++]
		AddCategory(GamePrincipal.Type.Oath); // [!code ++]
		if (!IsEmbark && ELayer.player.showWorkaround) // [!code ++]
		{
			pp.dropRateMtp = (int)a; // [!code --]
			Refresh(); // [!code --]
		}); // [!code --]
		RefreshScore(); // [!code --]
		void Toggle(ref bool flag, bool on) // [!code --]
			AddCategory(GamePrincipal.Type.Workaround); // [!code ++]
		} // [!code ++]
		transCustom.RebuildLayout(); // [!code ++]
		void AddCategory(GamePrincipal.Type type) // [!code ++]
		{
			flag = on; // [!code --]
			if (!pp.IsCustom) // [!code --]
			Util.Instantiate(moldHeader, transCustom).text1.SetText(("pp_" + type).lang()); // [!code ++]
			foreach (GamePrincipal.Item item in items.Where((GamePrincipal.Item a) => a.type == type)) // [!code ++]
			{
				pp.idTemplate = -1; // [!code --]
				groupTemplate.Select(buttonTemplates.LastItem()); // [!code --]
				UIButton b = null; // [!code ++]
				GamePrincipal.ItemSlider itemSlider = item as GamePrincipal.ItemSlider; // [!code ++]
				if (itemSlider == null) // [!code ++]
				{ // [!code ++]
					if (item != null) // [!code ++]
					{ // [!code ++]
						_ = item; // [!code ++]
						b = Util.Instantiate(moldToggle, transCustom); // [!code ++]
					} // [!code ++]
				} // [!code ++]
				else // [!code ++]
				{ // [!code ++]
					b = Util.Instantiate(moldSlider, transCustom); // [!code ++]
					b.GetComponentInChildren<UISlider>().SetSlider(itemSlider.GetInt(), delegate(float a) // [!code ++]
					{ // [!code ++]
						itemSlider.SetInt((int)a); // [!code ++]
						return itemSlider.funcText((int)a); // [!code ++]
					}, 0, itemSlider.max, notify: false); // [!code ++]
				} // [!code ++]
				bool flag = item.id == "permadeath" && !IsEmbark && !item.WasSealed(); // [!code ++]
				b.mainText.SetText(("pp_" + item.id).lang()); // [!code ++]
				b.icon.SetActive(item.IsSealed() || item.WasSealed()); // [!code ++]
				b.icon.SetAlpha(item.IsSealed() ? 1f : 0.3f); // [!code ++]
				b.icon.sprite = sprites[item.grade]; // [!code ++]
				b.icon.SetNativeSize(); // [!code ++]
				b.GetOrCreate<CanvasGroup>().alpha = (flag ? 0.5f : 1f); // [!code ++]
				b.interactable = !flag; // [!code ++]
				b.SetToggle(item.Get(), delegate(bool a) // [!code ++]
				{ // [!code ++]
					item.Set(a); // [!code ++]
					if (!pp.IsCustom) // [!code ++]
					{ // [!code ++]
						pp.id = -1; // [!code ++]
						RefreshTemplate(); // [!code ++]
					} // [!code ++]
					b.icon.SetActive(item.IsSealed() || item.WasSealed()); // [!code ++]
					b.icon.SetAlpha(item.IsSealed() ? 1f : 0.3f); // [!code ++]
				}); // [!code ++]
			}
			RefreshScore(); // [!code --]
		}
	}

	public void RefreshScore() // [!code --]
	public void StartGame() // [!code ++]
	{
		textTitle.text = pp.GetTitle() ?? ""; // [!code --]
		textScore.text = "pp_score".lang(pp.ignoreEvaluate ? " - " : (pp.GetScore().ToString() ?? "")); // [!code --]
		textValidScore.text = "pp_validScore".lang(pp.GetValidScore().ToString() ?? ""); // [!code --]
		textValidScore.SetActive(!pp.ignoreEvaluate); // [!code --]
		imageScoreBar.rectTransform.sizeDelta = new Vector2(Mathf.Clamp(300f * (float)pp.GetScore() / 100f, 0f, 300f), 50f); // [!code --]
		if (ELayer.player.resetPrincipal) // [!code ++]
		{ // [!code ++]
			Close(); // [!code ++]
			return; // [!code ++]
		} // [!code ++]
		started = true; // [!code ++]
		Close(); // [!code ++]
		if (!LayerDrama.Instance) // [!code ++]
		{ // [!code ++]
			LayerDrama.ActivateMain("mono", "1-1"); // [!code ++]
		} // [!code ++]
	}

	public override void OnKill()
	{
		pp.Apply(); // [!code --]
		Apply(); // [!code ++]
	} // [!code ++]
 // [!code ++]
	public void Apply() // [!code ++]
	{ // [!code ++]
		if (!IsEmbark) // [!code ++]
		{ // [!code ++]
			pp.modified = ELayer.game.principal.modified; // [!code ++]
			foreach (GamePrincipal.Item item in pp.ListItems()) // [!code ++]
			{ // [!code ++]
				if (item.IsModified()) // [!code ++]
				{ // [!code ++]
					pp.modified.Add(item.id); // [!code ++]
				} // [!code ++]
			} // [!code ++]
		} // [!code ++]
		ELayer.game.principal = pp; // [!code ++]
		if (ELayer.player.resetPrincipal) // [!code ++]
		{ // [!code ++]
			ELayer.player.resetPrincipal = false; // [!code ++]
		} // [!code ++]
		ELayer.pc.SetFeat(1220, pp.permadeath ? 1 : 0); // [!code ++]
	}
}
```

## Map

[`@@ -737,18 +737,21 @@ public static MapMetaData GetMetaData(string pathZip)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Map.cs#L737-L754)
```cs:line-numbers=737
		ZipEntry zipEntry = zipFile["meta"];
		if (zipEntry != null)
		{
			Debug.Log(zipEntry); // [!code --]
			using MemoryStream stream = new MemoryStream(); // [!code --]
			zipEntry.Extract(stream); // [!code --]
			MapMetaData mapMetaData = IO.LoadStreamJson<MapMetaData>(stream); // [!code --]
			Debug.Log(mapMetaData); // [!code --]
			mapMetaData.path = pathZip; // [!code --]
			return mapMetaData; // [!code --]
			using (MemoryStream stream = new MemoryStream()) // [!code ++]
			{ // [!code ++]
				zipEntry.Extract(stream); // [!code ++]
				MapMetaData mapMetaData = IO.LoadStreamJson<MapMetaData>(stream); // [!code ++]
				mapMetaData.path = pathZip; // [!code ++]
				return mapMetaData; // [!code ++]
			} // [!code ++]
		}
	}
	catch (Exception message)
	{
		Debug.Log(message); // [!code --]
		if (Application.isEditor) // [!code ++]
		{ // [!code ++]
			Debug.Log(message); // [!code ++]
		} // [!code ++]
	}
	return null;
}
```

[`@@ -1958,19 +1961,14 @@ public void _ValidateInstalled(int x, int y)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Map.cs#L1958-L1976)
```cs:line-numbers=1958
		HitResult hitResult = item.TileType._HitTest(point, item.Thing, canIgnore: false);
		if (item.Thing.stackOrder != detail.things.IndexOf(item.Thing) || (hitResult != HitResult.Valid && hitResult != HitResult.Warning))
		{
			bool flag = true; // [!code --]
			if (EClass._zone.IsPCFaction || item.rarity >= Rarity.Legendary || item.trait is TraitFigure) // [!code --]
			if (EClass._zone.IsPCFaction || !item.isNPCProperty) // [!code ++]
			{
				flag = false; // [!code --]
				item.SetPlaceState(PlaceState.roaming); // [!code ++]
			}
			if (flag) // [!code --]
			else if (item.rarity < Rarity.Legendary) // [!code ++]
			{
				item.Die();
			}
			else // [!code --]
			{ // [!code --]
				item.SetPlaceState(PlaceState.roaming); // [!code --]
			} // [!code --]
		}
	}
}
```

## Player

[`@@ -797,6 +797,9 @@ public void OnLeaveZone()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Player.cs#L797-L802)
```cs:line-numbers=797
	[JsonProperty]
	public bool openContainerCenter;

	[JsonProperty] // [!code ++]
	public bool showWorkaround; // [!code ++]
 // [!code ++]
	[JsonProperty]
	public string title;

```

[`@@ -971,6 +974,8 @@ public void OnLeaveZone()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Player.cs#L971-L976)
```cs:line-numbers=971

	public bool willAutoSave;

	public bool resetPrincipal; // [!code ++]
 // [!code ++]
	public bool simulatingZone;

	public bool isAutoFarming;
```

[`@@ -1216,10 +1221,6 @@ public void OnStartNewGame()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Player.cs#L1216-L1225)
```cs:line-numbers=1216
	dateTravel = EClass.world.date.GetRaw();
	uidLastTravelZone = EClass.pc.currentZone.uid;
	GenerateBackgroundText();
	if (!EClass.game.Difficulty.allowRevive) // [!code --]
	{ // [!code --]
		EClass.pc.SetFeat(1220); // [!code --]
	} // [!code --]
	EClass.pc.elements.CheckSkillActions();
	EClass.pc.hunger.value = 30;
	EClass.pc.CalculateMaxStamina();
```

## Scene

[`@@ -562,7 +562,7 @@ public void OnUpdate()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Scene.cs#L562-L568)
```cs:line-numbers=562
			EMono.Sound.Play("dead_pc");
			string[] list = Lang.GetList("lastWords");
			string lastWord = list.RandomItem();
			if (EMono.game.Difficulty.deleteGameOnDeath) // [!code --]
			if (EMono.game.principal.permadeath) // [!code ++]
			{
				GameIO.DeleteGame(Game.id, EMono.game.isCloud);
			}
```

[`@@ -590,7 +590,7 @@ public void OnUpdate()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Scene.cs#L590-L596)
```cs:line-numbers=590
				List<string> list2 = new List<string>();
				Zone lastTown = EMono.game.spatials.Find(EMono.player.uidLastTown);
				bool addTownRevive = lastTown != null && !EMono._zone.IsInstance;
				if (EMono.game.Difficulty.allowRevive) // [!code --]
				if (!EMono.game.principal.permadeath) // [!code ++]
				{
					if (addTownRevive)
					{
```

[`@@ -610,7 +610,7 @@ public void OnUpdate()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/Scene.cs#L610-L616)
```cs:line-numbers=610
					Dialog.List("pc_deathChoice".lang(), list2, (string j) => j, delegate(int c, string d)
					{
						EMono.player.deathDialog = false;
						if (EMono.game.Difficulty.allowRevive && (c == 0 || (addTownRevive && c == 1))) // [!code --]
						if (!EMono.game.principal.permadeath && (c == 0 || (addTownRevive && c == 1))) // [!code ++]
						{
							EMono.pc.MakeGrave(lastWord);
							EMono.pc.Revive();
```

## TraitBaseContainer

[`@@ -2,6 +2,20 @@`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/TraitBaseContainer.cs#L2-L7)
```cs:line-numbers=2

public class TraitBaseContainer : Trait
{
	public bool HasChara => owner.c_idRefCard != null; // [!code ++]
 // [!code ++]
	public override bool ShowChildrenNumber // [!code ++]
	{ // [!code ++]
		get // [!code ++]
		{ // [!code ++]
			if (!HasChara) // [!code ++]
			{ // [!code ++]
				return base.ShowChildrenNumber; // [!code ++]
			} // [!code ++]
			return false; // [!code ++]
		} // [!code ++]
	} // [!code ++]
 // [!code ++]
	public override string IDInvStyle
	{
		get
```

[`@@ -82,8 +96,6 @@ public override bool UseAltTiles`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/TraitBaseContainer.cs#L82-L89)
```cs:line-numbers=82
		}
	}

	public bool HasChara => owner.c_idRefCard != null; // [!code --]
 // [!code --]
	public override void OnCreate(int lv)
	{
		owner.things.SetSize(Width, Height);
```

## TraitBoat

[`@@ -2,6 +2,8 @@`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/TraitBoat.cs#L2-L7)
```cs:line-numbers=2

public class TraitBoat : Trait
{
	public override bool CanBeDestroyed => false; // [!code ++]
 // [!code ++]
	public override bool IsFloating => true;

	public override bool IsGround => true;
```

## TraitCrafter

[`@@ -330,8 +330,13 @@ public virtual Thing Craft(AI_UseCrafter ai)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/TraitCrafter.cs#L330-L337)
```cs:line-numbers=330
		foreach (Element item in list)
		{
			SocketData runeEnc = eq.GetRuneEnc(item.id);
			item.vLink = 0; // [!code ++]
			if (runeEnc != null)
			{
				if (item.vBase + item.vSource != runeEnc.value) // [!code ++]
				{ // [!code ++]
					item.vLink = item.vBase + item.vSource; // [!code ++]
				} // [!code ++]
				item.vBase = runeEnc.value;
				item.vSource = 0;
			}
```

[`@@ -354,7 +359,7 @@ public virtual Thing Craft(AI_UseCrafter ai)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/TraitCrafter.cs#L354-L360)
```cs:line-numbers=354
			EClass.pc.PlayEffect("intonation");
		}, delegate(Element a, ItemGeneral b)
		{
			b.SetSubText((a.vBase + a.vSource).ToString() ?? "", 200, FontColor.Default, TextAnchor.MiddleRight); // [!code --]
			b.SetSubText(a.vBase + a.vSource + ((a.vLink != 0) ? (" (" + a.vLink + ")") : ""), 200, FontColor.Default, TextAnchor.MiddleRight); // [!code ++]
			b.Build();
			if (a.HasTag("noRune"))
			{
```

## UICharaMaker

[`@@ -51,8 +51,6 @@ public class UICharaMaker : EMono`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/UICharaMaker.cs#L51-L58)
```cs:line-numbers=51

	public UIText textMode;

	public UIText textDifficulty; // [!code --]
 // [!code --]
	public int ageIndex;

	public Vector2 posList;
```

[`@@ -74,7 +72,6 @@ public void SetChara(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/UICharaMaker.cs#L74-L80)
```cs:line-numbers=74
	listMode = Lang.GetList("startMode");
	listDifficulties = Lang.GetList("difficulties");
	textMode.SetText(listMode[EMono.game.idPrologue]);
	textDifficulty.SetText(listDifficulties[EMono.game.idDifficulty]); // [!code --]
	chara = c;
	BuildRaces();
	SetPortraitSlider();
```

[`@@ -175,7 +172,7 @@ public void Refresh()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/UICharaMaker.cs#L175-L181)
```cs:line-numbers=175
	chara.elements.AddNote(note2, (Element e) => e.source.category == "skill" && e.ValueWithoutLink > 1 && e.source.categorySub != "weapon", null, ElementContainer.NoteMode.CharaMake);
	note2.Space();
	note2.AddHeaderTopic("feats".lang());
	chara.elements.AddNote(note2, (Element e) => e is Feat, null, ElementContainer.NoteMode.CharaMake, addRaceFeat: true); // [!code --]
	chara.elements.AddNote(note2, (Element e) => e is Feat && e.id != 1220, null, ElementContainer.NoteMode.CharaMake, addRaceFeat: true); // [!code ++]
	note2.Build();
	if (!addShadow)
	{
```

[`@@ -209,50 +206,6 @@ public void ListModes()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/UICharaMaker.cs#L209-L258)
```cs:line-numbers=209
			.SetTitles("wStartMode");
	}

	public void ListDifficulties() // [!code --]
	{ // [!code --]
		TooltipManager.Instance.HideTooltips(immediate: true); // [!code --]
		TooltipManager.Instance.disableHide = "note"; // [!code --]
		bool first = true; // [!code --]
		EMono.ui.AddLayer<LayerList>().SetPivot(0.5f, 0.2f).SetSize(260f) // [!code --]
			.SetList2(EMono.setting.start.difficulties, (GameDifficultySetting a) => a.Name, delegate(GameDifficultySetting a, ItemGeneral b) // [!code --]
			{ // [!code --]
				EMono.game.idDifficulty = a.ID; // [!code --]
				textDifficulty.SetText(listDifficulties[EMono.game.idDifficulty]); // [!code --]
				Refresh(); // [!code --]
			}, delegate(GameDifficultySetting a, ItemGeneral item) // [!code --]
			{ // [!code --]
				UIButton b2 = item.button1; // [!code --]
				b2.SetTooltip(delegate(UITooltip t) // [!code --]
				{ // [!code --]
					t.note.Clear(); // [!code --]
					t.note.AddHeader(a.Name); // [!code --]
					t.note.Space(8); // [!code --]
					t.note.AddText("NoteText_medium", "vow_" + a.ID).Hyphenate(); // [!code --]
					t.note.Space(8); // [!code --]
					t.note.Build(); // [!code --]
				}); // [!code --]
				if (first) // [!code --]
				{ // [!code --]
					TooltipManager.Instance.GetComponent<CanvasGroup>().alpha = 0f; // [!code --]
					TooltipManager.Instance.GetComponent<CanvasGroup>().DOFade(1f, 0.3f); // [!code --]
					EMono.core.actionsNextFrame.Add(delegate // [!code --]
					{ // [!code --]
						b2.ShowTooltipForced(); // [!code --]
					}); // [!code --]
				} // [!code --]
				first = false; // [!code --]
			}) // [!code --]
			.SetTitles("wDifficulty"); // [!code --]
		RectTransform rectTransform = EMono.ui.GetLayer<LayerList>().windows[0].Rect(); // [!code --]
		rectTransform.pivot = new Vector2(0.5f, 0.5f); // [!code --]
		rectTransform.anchoredPosition = posList2; // [!code --]
		TweenUtil.Tween(0.3f, null, delegate // [!code --]
		{ // [!code --]
			UIButton.TryShowTip(); // [!code --]
		}); // [!code --]
	} // [!code --]
 // [!code --]
	public void RerollAlias()
	{
		chara._alias = AliasGen.GetRandomAlias();
```

## WindowChara

[`@@ -270,8 +270,7 @@ public void RefreshStatic()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/36ce6ada4d3eac7de4aa8092efe7f31b1fec19c1/Elin/WindowChara.cs#L270-L277)
```cs:line-numbers=270
	@object = Portrait.modPortraitBGFs.GetItem(chara.GetStr(24) ?? "BGF_1").GetObject();
	@object.texture.filterMode = FilterMode.Bilinear;
	portrait.imageFrame.sprite = @object;
	string text = Lang.GetList("difficulties_title")[EClass.game.idDifficulty]; // [!code --]
	window.SetCaption(((text.IsEmpty() || !chara.IsPC) ? "" : (text + " - ")) + chara.NameBraced); // [!code --]
	window.SetCaption(chara.NameBraced); // [!code ++]
	listAttaribute.Clear();
	listAttaribute.callbacks = new UIList.Callback<Element, ButtonElement>
	{
```
