---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 26 files modified.
version: EA 23.309 Nightly Patch 1
changes: ABILITY/ACT/AM_Adv/ActEffect/PathFinder/WeightCell/BaseTileMap/Card/Cell/Chara/DOMAIN/ELEMENT/ENC/FACTION/FEAT/FOOD/GameSetting/GoalCombat/IPathfindWalker/MUTATION/POLICY/PathManager/SKILL/SLOT/SPELL/TraitScrollStatic
---

# EA 23.309 Nightly Patch 1

May 23, 2026

26 files modified.

## Important Changes

Possible breaking changes. Click the filename to view the chunk.
### [WeightCell (1)](#weightcell)
```cs:no-line-numbers
public virtual bool IsPathBlocked(PathManager.MoveType moveType) // [!code --]
public virtual bool IsPathBlocked(IPathfindWalker walker, PathManager.MoveType moveType) // [!code ++]
```
### [Cell (1)](#cell)
```cs:no-line-numbers
public override bool IsPathBlocked(PathManager.MoveType moveType) // [!code --]
public override bool IsPathBlocked(IPathfindWalker walker, PathManager.MoveType moveType) // [!code ++]
```
## ABILITY

[`public class ABILITY`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ABILITY.cs#L4-L9)
```cs:line-numbers=4
{
	public const int ActMoneyDump = 5058;

	public const int ActDreamBug = 6020; // [!code ++]
 // [!code ++]
	public const int ActParasite = 6019; // [!code ++]
 // [!code ++]
	public const int ActRide = 6018; // [!code ++]
 // [!code ++]
	public const int AI_SelfHarm = 6015; // [!code ++]
 // [!code ++]
	public const int AI_PassTime = 6013; // [!code ++]
 // [!code ++]
	public const int ActQuickCraft = 6012; // [!code ++]
 // [!code ++]
	public const int AI_Steal = 6011; // [!code ++]
 // [!code ++]
	public const int AI_Meditate = 6003;

	public const int AI_PlayMusic = 6001;
```

[`public class ABILITY`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ABILITY.cs#L20-L56)
```cs:line-numbers=20

	public const int ActBash = 5052;

	public const int ActZap = 5051; // [!code --]
 // [!code --]
	public const int AI_Sleep = 5050; // [!code --]
 // [!code --]
	public const int AI_OpenLock = 5049; // [!code --]
 // [!code --]
	public const int ActItem = 5048; // [!code --]
	public const int ActPray = 6050; // [!code ++]

	public const int ActPick = 5047; // [!code --]
	public const int ActEscape = 6400; // [!code ++]

	public const int ActInstall = 5046; // [!code --]
	public const int ActSuicide = 6410; // [!code ++]

	public const int AI_Drink = 5045; // [!code --]
	public const int ActDuplicate = 6420; // [!code ++]

	public const int ActChat = 5044; // [!code --]
	public const int ActGazeInsane = 6621; // [!code ++]

	public const int AI_TendAnimal = 5043; // [!code --]
	public const int ActGazeDim = 6620; // [!code ++]

	public const int AI_Steal = 6011; // [!code --]
	public const int ActTouchDrown = 6613; // [!code ++]

	public const int ActKick = 5042; // [!code --]
	public const int ActTouchSleep = 6612; // [!code ++]

	public const int ActQuickCraft = 6012; // [!code --]
	public const int ActFear = 6611; // [!code ++]

	public const int AI_SelfHarm = 6015; // [!code --]
	public const int ActWeaken = 6610; // [!code ++]

	public const int ActSlime = 6608;

	public const int ActBurnMana = 6606; // [!code --]
	public const int ActZap = 5051; // [!code ++]

	public const int ActCrySad = 6605; // [!code --]
	public const int ActBurnMana = 6606; // [!code ++]

	public const int ActCryRage = 6604;

```

[`public class ABILITY`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ABILITY.cs#L66-L134)
```cs:line-numbers=66

	public const int ActRush = 6450;

	public const int ActDuplicate = 6420; // [!code --]
	public const int ActCrySad = 6605; // [!code ++]

	public const int ActSuicide = 6410; // [!code --]
	public const int ActGazeMutation = 6622; // [!code ++]

	public const int ActEscape = 6400; // [!code --]
	public const int AI_Sleep = 5050; // [!code ++]

	public const int ActPray = 6050; // [!code --]
	public const int ActItem = 5048; // [!code ++]

	public const int ActDreamBug = 6020; // [!code --]
	public const int Sleep = 5004; // [!code ++]

	public const int ActParasite = 6019; // [!code --]
	public const int Wait = 5005; // [!code ++]

	public const int ActRide = 6018; // [!code --]
	public const int Shoot = 5006; // [!code ++]

	public const int AI_PassTime = 6013; // [!code --]
	public const int Use = 5007; // [!code ++]

	public const int AI_Read = 5041; // [!code --]
	public const int General = 5008; // [!code ++]

	public const int ActRanged = 5040; // [!code --]
	public const int TaskMine = 5009; // [!code ++]

	public const int AI_Fish = 5039; // [!code --]
	public const int TaskDig = 5010; // [!code ++]

	public const int TaskAttack = 5015; // [!code --]
	public const int TaskCut = 5011; // [!code ++]

	public const int TaskTame = 5016; // [!code --]
	public const int AI_Goto = 5012; // [!code ++]

	public const int TaskTalk = 5017; // [!code --]
	public const int ActAttack = 5013; // [!code ++]

	public const int TaskPick = 5018; // [!code --]
	public const int TaskPlow = 5014; // [!code ++]

	public const int TaskReadBoard = 5019; // [!code --]
	public const int TaskAttack = 5015; // [!code ++]

	public const int TaskFarm = 5020; // [!code --]
	public const int TaskTame = 5016; // [!code ++]

	public const int TaskTrain = 5021; // [!code --]
	public const int TaskTalk = 5017; // [!code ++]

	public const int TaskSleepOnBed = 5022; // [!code --]
	public const int TaskPick = 5018; // [!code ++]

	public const int TaskGoOut = 5023; // [!code --]
	public const int Ranged = 5003; // [!code ++]

	public const int AI_Eat = 5024; // [!code --]
	public const int Melee = 5002; // [!code ++]

	public const int AI_Grab = 5025; // [!code --]
	public const int ActMelee = 5001; // [!code ++]

	public const int AI_Haul = 5026; // [!code --]
	public const int ActWait = 5000; // [!code ++]

	public const int GoalSleep = 5027; // [!code --]
	public const int ActPick = 5047; // [!code ++]

	public const int ActReleaseHeld = 5028; // [!code --]
	public const int ActInstall = 5046; // [!code ++]

	public const int AI_Offer = 5029; // [!code --]
	public const int AI_Drink = 5045; // [!code ++]

	public const int AI_ReleaseHeld = 5030; // [!code --]
	public const int ActChat = 5044; // [!code ++]

	public const int AI_Deconstruct = 5031; // [!code --]
	public const int AI_TendAnimal = 5043; // [!code ++]

	public const int TaskPlow = 5014; // [!code --]
	public const int ActKick = 5042; // [!code ++]

	public const int ActAttack = 5013; // [!code --]
	public const int AI_Read = 5041; // [!code ++]

	public const int AI_Goto = 5012; // [!code --]
	public const int AI_OpenLock = 5049; // [!code ++]

	public const int TaskCut = 5011; // [!code --]
	public const int ActRanged = 5040; // [!code ++]

	public const int ActThrow = 5038;

```

[`public class ABILITY`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ABILITY.cs#L144-L260)
```cs:line-numbers=144

	public const int AI_Equip = 5032;

	public const int ActWait = 5000; // [!code --]
 // [!code --]
	public const int ActWeaken = 6610; // [!code --]
 // [!code --]
	public const int ActMelee = 5001; // [!code --]
 // [!code --]
	public const int Ranged = 5003; // [!code --]
 // [!code --]
	public const int Sleep = 5004; // [!code --]
 // [!code --]
	public const int Wait = 5005; // [!code --]
 // [!code --]
	public const int Shoot = 5006; // [!code --]
 // [!code --]
	public const int Use = 5007; // [!code --]
 // [!code --]
	public const int General = 5008; // [!code --]
 // [!code --]
	public const int TaskMine = 5009; // [!code --]
 // [!code --]
	public const int TaskDig = 5010; // [!code --]
 // [!code --]
	public const int Melee = 5002; // [!code --]
	public const int AI_Fish = 5039; // [!code ++]

	public const int ActFear = 6611; // [!code --]
	public const int ActGazeMana = 6623; // [!code ++]

	public const int ActBloodsuck = 6607;

	public const int ActTouchDrown = 6613; // [!code --]
 // [!code --]
	public const int SongValor = 6752; // [!code --]
	public const int ActCatHuffing = 6627; // [!code ++]

	public const int SongEnd = 6753; // [!code --]
	public const int breathe_Magic = 50211; // [!code ++]

	public const int ActManaAbsorb = 6900; // [!code --]
	public const int breathe_Chaos = 50210; // [!code ++]

	public const int ActJureHeal = 6901; // [!code --]
	public const int breathe_Holy = 50209; // [!code ++]

	public const int ActLulwyTrick = 6902; // [!code --]
	public const int ActDrainBlood = 6626; // [!code ++]

	public const int ActKizuamiTrick = 6903; // [!code --]
	public const int breathe_Sound = 50207; // [!code ++]

	public const int ActHeadpat = 6904; // [!code --]
	public const int breathe_Nether = 50206; // [!code ++]

	public const int breathe_ = 7000; // [!code --]
	public const int breathe_Ether = 50212; // [!code ++]

	public const int SpTransmuteBat = 8793; // [!code --]
	public const int breathe_Poison = 50205; // [!code ++]

	public const int SpTransmuteMimic = 8794; // [!code --]
	public const int breathe_Darkness = 50203; // [!code ++]

	public const int ActTouchSleep = 6612; // [!code --]
	public const int breathe_Lightning = 50202; // [!code ++]

	public const int SpTransmuteHuman = 8796; // [!code --]
	public const int breathe_Cold = 50201; // [!code ++]

	public const int breathe_Fire = 50200;

	public const int breathe_Cold = 50201; // [!code --]
 // [!code --]
	public const int breathe_Lightning = 50202; // [!code --]
	public const int SpTransmuteHuman = 8796; // [!code ++]

	public const int breathe_Darkness = 50203; // [!code --]
	public const int SpTransmuteShadow = 8795; // [!code ++]

	public const int breathe_Mind = 50204;

	public const int breathe_Poison = 50205; // [!code --]
	public const int SpTransmuteMimic = 8794; // [!code ++]

	public const int breathe_Nether = 50206; // [!code --]
	public const int breathe_Acid = 50213; // [!code ++]

	public const int breathe_Sound = 50207; // [!code --]
	public const int breathe_Impact = 50215; // [!code ++]

	public const int breathe_Nerve = 50208; // [!code --]
	public const int AI_Deconstruct = 5031; // [!code ++]

	public const int breathe_Holy = 50209; // [!code --]
	public const int AI_ReleaseHeld = 5030; // [!code ++]

	public const int breathe_Chaos = 50210; // [!code --]
	public const int AI_Offer = 5029; // [!code ++]

	public const int breathe_Magic = 50211; // [!code --]
	public const int ActReleaseHeld = 5028; // [!code ++]

	public const int breathe_Ether = 50212; // [!code --]
	public const int GoalSleep = 5027; // [!code ++]

	public const int breathe_Acid = 50213; // [!code --]
	public const int AI_Haul = 5026; // [!code ++]

	public const int breathe_Cut = 50214;

	public const int breathe_Impact = 50215; // [!code --]
 // [!code --]
	public const int breathe_Void = 50216; // [!code --]
 // [!code --]
	public const int SongTulip = 6751; // [!code --]
 // [!code --]
	public const int SongSleep = 6750; // [!code --]
	public const int AI_Grab = 5025; // [!code ++]

	public const int SpTransmuteShadow = 8795; // [!code --]
	public const int TaskGoOut = 5023; // [!code ++]

	public const int StMama = 6701; // [!code --]
	public const int TaskSleepOnBed = 5022; // [!code ++]

	public const int ActGazeDim = 6620; // [!code --]
	public const int TaskTrain = 5021; // [!code ++]

	public const int StManaCost = 6720; // [!code --]
	public const int TaskFarm = 5020; // [!code ++]

	public const int ActGazeInsane = 6621; // [!code --]
	public const int TaskReadBoard = 5019; // [!code ++]

	public const int ActGazeMutation = 6622; // [!code --]
	public const int breathe_Void = 50216; // [!code ++]

	public const int ActGazeMana = 6623; // [!code --]
	public const int AI_Eat = 5024; // [!code ++]

	public const int ActDrainBlood = 6626; // [!code --]
	public const int SpTransmuteBat = 8793; // [!code ++]

	public const int ActCatHuffing = 6627; // [!code --]
	public const int breathe_Nerve = 50208; // [!code ++]

	public const int ActKiss = 6628; // [!code --]
	public const int ActHeadpat = 6904; // [!code ++]

	public const int ActDeepKiss = 6629;

```

[`public class ABILITY`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ABILITY.cs#L264-L280)
```cs:line-numbers=264

	public const int ActSteal = 6640;

	public const int ActStealFood = 6641; // [!code ++]
 // [!code ++]
	public const int ActStealMoney = 6642;

	public const int ActNeckHunt = 6650;

	public const int ActStealFood = 6641; // [!code --]
	public const int ActDropMine = 6660; // [!code ++]

	public const int ActThrowPotion = 6661;

	public const int breathe_ = 7000; // [!code ++]
 // [!code ++]
	public const int ActSwarm = 6662;

	public const int ActMultiHit = 6663; // [!code --]
	public const int ActKiss = 6628; // [!code ++]

	public const int ActBladeStorm = 6664;

```

[`public class ABILITY`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ABILITY.cs#L282-L316)
```cs:line-numbers=282

	public const int ActWhirlwind = 6666;

	public const int ActMissileBarrage = 6667; // [!code --]
 // [!code --]
	public const int ActDropMine = 6660; // [!code --]
	public const int ActMultiHit = 6663; // [!code ++]

	public const int ActSummonSpecial = 6800;

	public const int ActKizuamiTrick = 6903; // [!code ++]
 // [!code ++]
	public const int ActLulwyTrick = 6902; // [!code ++]
 // [!code ++]
	public const int ActJureHeal = 6901; // [!code ++]
 // [!code ++]
	public const int ActManaAbsorb = 6900; // [!code ++]
 // [!code ++]
	public const int SongEnd = 6753; // [!code ++]
 // [!code ++]
	public const int SongValor = 6752; // [!code ++]
 // [!code ++]
	public const int SongTulip = 6751; // [!code ++]
 // [!code ++]
	public const int SongSleep = 6750; // [!code ++]
 // [!code ++]
	public const int ActMissileBarrage = 6667; // [!code ++]
 // [!code ++]
	public const int StManaCost = 6720; // [!code ++]
 // [!code ++]
	public const int ActWombDark = 6801;

	public const int ActDeathSentense = 6802; // [!code --]
	public const int StMama = 6701; // [!code ++]

	public const int StTaunt = 6700;

	public const int ActDeathSentense = 6802; // [!code ++]
 // [!code ++]
	public static readonly int[] IDS = new int[146]
	{
		5058, 6003, 6001, 5057, 5056, 5055, 5054, 5053, 5052, 5051, // [!code --]
		5050, 5049, 5048, 5047, 5046, 5045, 5044, 5043, 6011, 5042, // [!code --]
		6012, 6015, 6608, 6606, 6605, 6604, 6603, 6602, 6601, 6600, // [!code --]
		6500, 6450, 6420, 6410, 6400, 6050, 6020, 6019, 6018, 6013, // [!code --]
		5041, 5040, 5039, 5015, 5016, 5017, 5018, 5019, 5020, 5021, // [!code --]
		5022, 5023, 5024, 5025, 5026, 5027, 5028, 5029, 5030, 5031, // [!code --]
		5014, 5013, 5012, 5011, 5038, 5037, 5036, 5035, 5034, 5033, // [!code --]
		5032, 5000, 6610, 5001, 5003, 5004, 5005, 5006, 5007, 5008, // [!code --]
		5009, 5010, 5002, 6611, 6607, 6613, 6752, 6753, 6900, 6901, // [!code --]
		6902, 6903, 6904, 7000, 8793, 8794, 6612, 8796, 50200, 50201, // [!code --]
		50202, 50203, 50204, 50205, 50206, 50207, 50208, 50209, 50210, 50211, // [!code --]
		50212, 50213, 50214, 50215, 50216, 6751, 6750, 8795, 6701, 6620, // [!code --]
		6720, 6621, 6622, 6623, 6626, 6627, 6628, 6629, 6630, 6631, // [!code --]
		6640, 6642, 6650, 6641, 6661, 6662, 6663, 6664, 6665, 6666, // [!code --]
		6667, 6660, 6800, 6801, 6802, 6700 // [!code --]
		5058, 6020, 6019, 6018, 6015, 6013, 6012, 6011, 6003, 6001, // [!code ++]
		5057, 5056, 5055, 5054, 5053, 5052, 6050, 6400, 6410, 6420, // [!code ++]
		6621, 6620, 6613, 6612, 6611, 6610, 6608, 5051, 6606, 6604, // [!code ++]
		6603, 6602, 6601, 6600, 6500, 6450, 6605, 6622, 5050, 5048, // [!code ++]
		5004, 5005, 5006, 5007, 5008, 5009, 5010, 5011, 5012, 5013, // [!code ++]
		5014, 5015, 5016, 5017, 5018, 5003, 5002, 5001, 5000, 5047, // [!code ++]
		5046, 5045, 5044, 5043, 5042, 5041, 5049, 5040, 5038, 5037, // [!code ++]
		5036, 5035, 5034, 5033, 5032, 5039, 6623, 6607, 6627, 50211, // [!code ++]
		50210, 50209, 6626, 50207, 50206, 50212, 50205, 50203, 50202, 50201, // [!code ++]
		50200, 8796, 8795, 50204, 8794, 50213, 50215, 5031, 5030, 5029, // [!code ++]
		5028, 5027, 5026, 50214, 5025, 5023, 5022, 5021, 5020, 5019, // [!code ++]
		50216, 5024, 8793, 50208, 6904, 6629, 6630, 6631, 6640, 6641, // [!code ++]
		6642, 6650, 6660, 6661, 7000, 6662, 6628, 6664, 6665, 6666, // [!code ++]
		6663, 6800, 6903, 6902, 6901, 6900, 6753, 6752, 6751, 6750, // [!code ++]
		6667, 6720, 6801, 6701, 6700, 6802 // [!code ++]
	};
}
public class Ability : Act
```

## ACT

[`bool DistCheck(Point p1, Point p2)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ACT.cs#L390-L396)
```cs:line-numbers=390
					return false;
				}
			}
			else if ((num != 1 || !CC.IsMultisize) && !Los.IsVisible(p1, p2)) // [!code --]
			else if ((num != 1 || (!CC.IsMultisize && !CC.pos.IsBlocked)) && !Los.IsVisible(p1, p2)) // [!code ++]
			{
				return false;
			}
```

## AM_Adv

[`public void SetPressedAction(ButtonState button)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/AM_Adv.cs#L1238-L1244)
```cs:line-numbers=1238
		return;
	}
	Point pos = ((!isMouseOnMap) ? null : base.hit.Copy());
	if (pos != null && (EClass.pc.pos.Equals(pos) || (EClass.pc.pos.Distance(pos) == 1 && pos.cell.blocked))) // [!code --]
	if (pos != null && (EClass.pc.pos.Equals(pos) || (EClass.pc.pos.Distance(pos) == 1 && pos.cell.blocked && !EClass.pc.IsAstralBody))) // [!code ++]
	{
		return;
	}
```

## ActEffect

[`void AddCon<T>(int rate, int power) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ActEffect.cs#L1103-L1109)
```cs:line-numbers=1103
	{
		CC.PlaySound("clean_floor");
		Msg.Say("exterminate");
		List<Chara> list3 = EClass._map.charas.Where((Chara c) => (c.isCopy || c.isHatchling) && !c.IsPCFaction).ToList(); // [!code --]
		List<Chara> list3 = EClass._map.charas.Where((Chara c) => (c.isCopy || c.isHatchling || c.id == "cocoon" || c.id == "cocoon_alien") && !c.IsPCFactionOrMinion).ToList(); // [!code ++]
		if (list3.Count == 0)
		{
			Msg.SayNothingHappen();
```

## PathFinder

[`public int Compare(int a, int b)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Algorithms/PathFinder.cs#L58-L63)
```cs:line-numbers=58

	private IPathfindGrid grid;

	private IPathfindWalker walker; // [!code ++]
 // [!code ++]
	private int mHEstimate = 2;

	private PriorityQueueB<int> mOpen;
```

[`public void Init(IPathfindGrid _grid, WeightCell[,] _weightMap, int size)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Algorithms/PathFinder.cs#L153-L158)
```cs:line-numbers=153
public void FindPath(PathProgress path)
{
	moveType = path.moveType;
	walker = path.walker; // [!code ++]
	_FindPath(path);
	if (path.nodes.Count > 0)
	{
```

[`private void _FindPath(PathProgress path)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Algorithms/PathFinder.cs#L258-L264)
```cs:line-numbers=258
							mz = mLocationZ;
							index = ((mz >= mLocationZ) ? ((mx > mLocationX) ? 1 : ((mz > mLocationZ) ? 2 : 3)) : 0);
							_weight = weightMap[mLocationX, mLocationZ].weights[index];
							if (weightMap[mx, mz].IsPathBlocked(moveType)) // [!code --]
							if (weightMap[mx, mz].IsPathBlocked(walker, moveType)) // [!code ++]
							{
								_weight = 0;
							}
```

[`private void _FindPath(PathProgress path)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Algorithms/PathFinder.cs#L272-L278)
```cs:line-numbers=272
									mz = mLocationZ + mDirection[i, 1];
									index = ((mz >= mLocationZ) ? ((mx > mLocationX) ? 1 : ((mz > mLocationZ) ? 2 : 3)) : 0);
									_weight = weightMap[mLocationX, mLocationZ].weights[index];
									if (weightMap[mx, mz].IsPathBlocked(moveType)) // [!code --]
									if (weightMap[mx, mz].IsPathBlocked(walker, moveType)) // [!code ++]
									{
										_weight = 0;
									}
```

[`private void _FindPath(PathProgress path)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Algorithms/PathFinder.cs#L289-L295)
```cs:line-numbers=289
							continue;
						}
						_weight += weightMap[mLocationX, mLocationZ].baseWeight;
						if (mEndLocation != mNewLocation && weightMap[mNewLocationX, mNewLocationZ].IsPathBlocked(moveType)) // [!code --]
						if (mEndLocation != mNewLocation && weightMap[mNewLocationX, mNewLocationZ].IsPathBlocked(walker, moveType)) // [!code ++]
						{
							continue;
						}
```

## WeightCell

[`public class WeightCell`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Algorithms/WeightCell.cs#L8-L14)
```cs:line-numbers=8

	public byte baseWeight;

	public virtual bool IsPathBlocked(PathManager.MoveType moveType) // [!code --]
	public virtual bool IsPathBlocked(IPathfindWalker walker, PathManager.MoveType moveType) // [!code ++]
	{
		return blocked;
	}
```

## BaseTileMap

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/BaseTileMap.cs#L1214-L1220)
```cs:line-numbers=1214
	bool flag4 = this.cell.isSurrounded && innerMode != 0 && sourceBlock.tileType.IsFullBlock;
	if (!(!isSeen || flag4))
	{
		goto IL_16bd; // [!code --]
		goto IL_16c3; // [!code ++]
	}
	bool isRoomEdge = this.cell.IsRoomEdge;
	orgY = param.y;
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/BaseTileMap.cs#L1267-L1273)
```cs:line-numbers=1267
	param.color = blockLight;
	if (flag5)
	{
		if (detail == null || !EMono.pc.hasTelepathy) // [!code --]
		if (detail == null || !(EMono.pc.hasTelepathy || flag4)) // [!code ++]
		{
			return;
		}
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/BaseTileMap.cs#L1276-L1284)
```cs:line-numbers=1276
	{
		if (isRoomEdge)
		{
			goto IL_16bd; // [!code --]
			goto IL_16c3; // [!code ++]
		}
		if (detail == null || !EMono.pc.hasTelepathy) // [!code --]
		if (detail == null || !(EMono.pc.hasTelepathy || flag4)) // [!code ++]
		{
			if (noRoofMode || detail == null)
			{
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/BaseTileMap.cs#L1287-L1302)
```cs:line-numbers=1287
			fogged = true;
		}
	}
	goto IL_7eb8; // [!code --]
	IL_7327: // [!code --]
	goto IL_7ebe; // [!code ++]
	IL_732d: // [!code ++]
	int num3;
	if (!showRoof || !roof || this.cell.room == null || this.cell.Front.room == null || this.cell.Right.room == null)
	{
		param.tile = num3;
		rendererFov.Draw(param);
	}
	goto IL_7387; // [!code --]
	IL_7387: // [!code --]
	goto IL_738d; // [!code ++]
	IL_738d: // [!code ++]
	if (isSnowCovered && (sourceBlock.id != 0 || this.cell.hasDoor) && !snowed && !this.cell.isClearSnow && ((!this.cell.Front.HasRoof && !this.cell.Front.HasBlock) || (!this.cell.Right.HasRoof && !this.cell.Right.HasBlock)))
	{
		snowed = true;
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/BaseTileMap.cs#L1514-L1521)
```cs:line-numbers=1514
		param.matColor = 104025f;
		renderFootmark.Draw(param);
	}
	goto IL_7eb8; // [!code --]
	IL_16bd: // [!code --]
	goto IL_7ebe; // [!code ++]
	IL_16c3: // [!code ++]
	if (this.cell.isSlopeEdge)
	{
		float num6 = (float)height * _heightMod.y;
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/BaseTileMap.cs#L2756-L2774)
```cs:line-numbers=2756
	{
		if (this.cell.room != null || !this.cell.IsRoomEdge || !showRoof)
		{
			goto IL_7327; // [!code --]
			goto IL_732d; // [!code ++]
		}
		if (this.cell._block == 0 || !this.cell.sourceBlock.tileType.RepeatBlock)
		{
			Room obj = this.cell.FrontRight.room;
			if (obj == null || !obj.HasRoof)
			{
				goto IL_7327; // [!code --]
				goto IL_732d; // [!code ++]
			}
		}
	}
	goto IL_7387; // [!code --]
	IL_7eb8: // [!code --]
	goto IL_738d; // [!code ++]
	IL_7ebe: // [!code ++]
	if (detail.things.Count == 0 && detail.charas.Count == 0)
	{
		return;
```

[`public virtual void DrawTile()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/BaseTileMap.cs#L3159-L3164)
```cs:line-numbers=3159
		_actorPos.x = orgX;
		_actorPos.y = orgY;
		_actorPos.z = orgZ;
		if (this.cell.IsBlocked && chara.IsAstralBody) // [!code ++]
		{ // [!code ++]
			_actorPos.z += EMono.setting.render.astralBodyFixZ; // [!code ++]
		} // [!code ++]
		chara.SetRenderParam(param);
		_ = chara.IsAliveInCurrentZone;
		if (chara.isRestrained)
```

## Card

[`void ProcAbsorb()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Card.cs#L4944-L4953)
```cs:line-numbers=4944
		{
			int num18 = origin.Evalue(662) + (weapon?.Evalue(662, ignoreGlobalElement: true) ?? 0);
			int num19 = origin.Evalue(661) + (weapon?.Evalue(661, ignoreGlobalElement: true) ?? 0);
			if (num18 != 0) // [!code --]
			{ // [!code --]
				Debug.Log(num18); // [!code --]
			} // [!code --]
			if (num18 > 0 && attackSource == AttackSource.Melee && origin.isChara && !origin.Chara.ignoreSPAbsorb && Chara.IsHostile(origin as Chara))
			{
				int num20 = EClass.rnd(3 + (int)Mathf.Clamp(dmg / 100, 0f, num18 / 10));
```

## Cell

[`public bool HasZoneStairs(bool includeLocked = true)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Cell.cs#L1766-L1778)
```cs:line-numbers=1766
		return false;
	}

	public override bool IsPathBlocked(PathManager.MoveType moveType) // [!code --]
	public override bool IsPathBlocked(IPathfindWalker walker, PathManager.MoveType moveType) // [!code ++]
	{
		if (IsSky) // [!code ++]
		{ // [!code ++]
			return true; // [!code ++]
		} // [!code ++]
		if (moveType == PathManager.MoveType.Default)
		{
			if (walker.IsAstralBody) // [!code ++]
			{ // [!code ++]
				return false; // [!code ++]
			} // [!code ++]
			return blocked;
		}
		if (!blocked) // [!code --]
		if (!blocked || walker.IsAstralBody) // [!code ++]
		{
			if (detail != null)
			{
```

## Chara

[`public class Chara : Card, IPathfindWalker`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Chara.cs#L153-L158)
```cs:line-numbers=153

	public bool isWeakToSunlight;

	public bool isAstralBody; // [!code ++]
 // [!code ++]
	public SpriteReplacer spriteReplacer;

	private Faction _faction;
```

[`public string IDPCCBodySet`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Chara.cs#L501-L506)
```cs:line-numbers=501
		}
	}

	public bool IsAstralBody => isAstralBody; // [!code ++]
 // [!code ++]
	public new TraitChara trait
	{
		get
```

[`public bool CanSeeLos(Point p, int dist = -1)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Chara.cs#L1300-L1305)
```cs:line-numbers=1300
			}
			return false;
		}
		if ((pos.IsBlocked || p.IsBlocked) && dist <= 1) // [!code ++]
		{ // [!code ++]
			return true; // [!code ++]
		} // [!code ++]
		return Los.IsVisible(pos, p);
	}

```

[`public void Refresh(bool calledRecursive = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Chara.cs#L1773-L1778)
```cs:line-numbers=1773
	canSeeInvisible = HasElement(416);
	isWeakToSunlight = HasElement(1251) && !HasElement(431);
	base.isHidden = HasElement(415);
	isAstralBody = HasElement(1430); // [!code ++]
	foreach (Condition condition in conditions)
	{
		condition.OnRefresh();
```

[`public bool CanMoveTo(Point p, bool allowDestroyPath = true)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Chara.cs#L2519-L2525)
```cs:line-numbers=2519
	}
	else
	{
		if (EClass._map.cells[p.x, p.z].blocked || EClass._map.cells[pos.x, pos.z].weights[num] == 0) // [!code --]
		if ((EClass._map.cells[p.x, p.z].blocked && (!IsAstralBody || EClass._map.cells[p.x, p.z].IsSky)) || EClass._map.cells[pos.x, pos.z].weights[num] == 0) // [!code ++]
		{
			return false;
		}
```

[`public bool CanMoveTo(Point p, bool allowDestroyPath = true)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Chara.cs#L2533-L2539)
```cs:line-numbers=2533
			{
				return false;
			}
			if (cells[x, z].blocked) // [!code --]
			if (cells[x, z].blocked && (!IsAstralBody || cells[x, z].IsSky)) // [!code ++]
			{
				return false;
			}
```

[`public bool CanMoveTo(Point p, bool allowDestroyPath = true)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Chara.cs#L2549-L2555)
```cs:line-numbers=2549
			{
				return false;
			}
			if (cells[x, z].blocked) // [!code --]
			if (cells[x, z].blocked && (!IsAstralBody || cells[x, z].IsSky)) // [!code ++]
			{
				return false;
			}
```

[`public override MoveResult _Move(Point newPoint, MoveType type = MoveType.Walk)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Chara.cs#L3190-L3210)
```cs:line-numbers=3190
			}
		}
	}
	lastPos.Things.ForeachReverse(delegate(Thing t) // [!code --]
	{ // [!code --]
		t.trait.OnSteppedOut(this); // [!code --]
	}); // [!code --]
	if (!IsPC) // [!code --]
	{ // [!code --]
		pos.Things.ForeachReverse(delegate(Thing t) // [!code --]
		{ // [!code --]
			t.trait.OnStepped(this); // [!code --]
		}); // [!code --]
	} // [!code --]
	if (CanDestroyPath()) // [!code --]
	{ // [!code --]
		DestroyPath(pos); // [!code --]
	} // [!code --]
	if (IsPC)
	{
		if (renderer.anime == null && renderer.replacer != null && renderer.replacer.pccData == null)
```

[`public override MoveResult _Move(Point newPoint, MoveType type = MoveType.Walk)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Chara.cs#L3233-L3238)
```cs:line-numbers=3233
		wasInWater = flag7;
		RefreshSpeed();
	}
	lastPos.Things.ForeachReverse(delegate(Thing t) // [!code ++]
	{ // [!code ++]
		t.trait.OnSteppedOut(this); // [!code ++]
	}); // [!code ++]
	if (!IsPC) // [!code ++]
	{ // [!code ++]
		pos.Things.ForeachReverse(delegate(Thing t) // [!code ++]
		{ // [!code ++]
			t.trait.OnStepped(this); // [!code ++]
		}); // [!code ++]
	} // [!code ++]
	if (CanDestroyPath()) // [!code ++]
	{ // [!code ++]
		DestroyPath(pos); // [!code ++]
	} // [!code ++]
	if (!isDead && pos.IsBlocked && EClass.rnd(2) == 0) // [!code ++]
	{ // [!code ++]
		stamina.Mod(-1); // [!code ++]
	} // [!code ++]
	hasMovedThisTurn = true;
	return MoveResult.Success;
}
```

[`public void TickConditions()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/Chara.cs#L3986-L3991)
```cs:line-numbers=3986
		Die();
		return;
	}
	if (pos.IsBlocked) // [!code ++]
	{ // [!code ++]
		preventRegen = true; // [!code ++]
	} // [!code ++]
	if (!preventRegen)
	{
		if (EClass.rnd(25) == 0 && base.hp < MaxHP)
```

## DOMAIN

[``](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/DOMAIN.cs#L2-L43)
```cs:line-numbers=2

public class DOMAIN
{
	public const int domTest = 800; // [!code --]
 // [!code --]
	public const int domLuck = 810;

	public const int domOblivion = 813; // [!code --]
	public const int domEyth = 814; // [!code ++]

	public const int domEarth = 812; // [!code --]
	public const int domOblivion = 813; // [!code ++]

	public const int domSurvival = 801; // [!code --]
	public const int domMiracle = 803; // [!code ++]

	public const int domHealing = 811; // [!code --]
	public const int domArcane = 804; // [!code ++]

	public const int domFaith = 802; // [!code --]
	public const int domComm = 805; // [!code ++]

	public const int domHarmony = 815; // [!code --]
	public const int domEarth = 812; // [!code ++]

	public const int domArcane = 804; // [!code --]
	public const int domElement = 806; // [!code ++]

	public const int domMachine = 809; // [!code --]
	public const int domWind = 807; // [!code ++]

	public const int domHarvest = 808;

	public const int domWind = 807; // [!code --]
	public const int domHealing = 811; // [!code ++]

	public const int domElement = 806; // [!code --]
	public const int domMachine = 809; // [!code ++]

	public const int domMiracle = 803; // [!code --]
	public const int domHarmony = 815; // [!code ++]

	public const int domEyth = 814; // [!code --]
	public const int domSurvival = 801; // [!code ++]

	public const int domComm = 805; // [!code --]
	public const int domFaith = 802; // [!code ++]
 // [!code ++]
	public const int domTest = 800; // [!code ++]

	public static readonly int[] IDS = new int[16]
	{
		800, 810, 813, 812, 801, 811, 802, 815, 804, 809, // [!code --]
		808, 807, 806, 803, 814, 805 // [!code --]
		810, 814, 813, 803, 804, 805, 812, 806, 807, 808, // [!code ++]
		811, 809, 815, 801, 802, 800 // [!code ++]
	};
}
public class Domain : EClass
```

## ELEMENT

[``](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ELEMENT.cs#L5-L39)
```cs:line-numbers=5

public class ELEMENT
{
	public const int purity = 759; // [!code --]
 // [!code --]
	public const int hotspring = 756; // [!code --]
	public const int difficulty = 765; // [!code ++]

	public const int blood = 755; // [!code --]
	public const int air = 763; // [!code ++]

	public const int recharge = 761; // [!code --]
	public const int roasted = 762; // [!code ++]

	public const int antidote = 753; // [!code --]
	public const int rare = 751; // [!code ++]

	public const int cute = 752;

	public const int rare = 751; // [!code --]
	public const int antidote = 753; // [!code ++]

	public const int comfort = 750; // [!code --]
	public const int nerve = 754; // [!code ++]

	public const int roasted = 762; // [!code --]
	public const int blood = 755; // [!code ++]

	public const int air = 763; // [!code --]
	public const int hotspring = 756; // [!code ++]

	public const int difficulty = 765; // [!code --]
	public const int purity = 759; // [!code ++]

	public const int stimulant = 760;

	public const int nerve = 754; // [!code --]
	public const int recharge = 761; // [!code ++]
 // [!code ++]
	public const int comfort = 750; // [!code ++]

	public const int _void = 0;

	public const int socket = 5; // [!code --]
	public const int nutrition = 10; // [!code ++]

	public const int lv = 1;

```

[`public class ELEMENT`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ELEMENT.cs#L41-L47)
```cs:line-numbers=41

	public const int d = 3;

	public const int nutrition = 10; // [!code --]
	public const int socket = 5; // [!code ++]

	public const int weight = 11;

```

[`public class ELEMENT`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ELEMENT.cs#L53-L65)
```cs:line-numbers=53

	public const int water = 15;

	public const int decay = 17; // [!code --]
	public const int heat = 16; // [!code ++]

	public const int taste = 18;

	public const int heat = 16; // [!code --]
	public const int poison = 20; // [!code ++]

	public const int fire = 21; // [!code --]
	public const int decay = 17; // [!code ++]

	public const int cut = 22;

```

[`public class ELEMENT`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ELEMENT.cs#L75-L88)
```cs:line-numbers=75

	public const int piety = 85;

	public const int poison = 20; // [!code --]
	public const int fire = 21; // [!code ++]

	public static readonly int[] IDS = new int[36]
	{
		759, 756, 755, 761, 753, 752, 751, 750, 762, 763, // [!code --]
		765, 760, 754, 0, 5, 1, 2, 3, 10, 11, // [!code --]
		12, 13, 14, 15, 17, 18, 16, 21, 22, 23, // [!code --]
		24, 25, 26, 29, 85, 20 // [!code --]
		765, 763, 762, 751, 752, 753, 754, 755, 756, 759, // [!code ++]
		760, 761, 750, 0, 10, 1, 2, 3, 5, 11, // [!code ++]
		12, 13, 14, 15, 16, 18, 20, 17, 22, 23, // [!code ++]
		24, 25, 26, 29, 85, 21 // [!code ++]
	};
}
public class Element : EClass
```

## ENC

[`public class ENC`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ENC.cs#L1-L29)
```cs:line-numbers=1
public class ENC
{
	public const int permaCurse = 656; // [!code ++]
 // [!code ++]
	public const int onlyPet = 655;

	public const int noDamage = 654;

	public const int living = 653; // [!code --]
	public const int r_mana = 641; // [!code ++]

	public const int eco = 652; // [!code --]
	public const int living = 653; // [!code ++]

	public const int r_PV = 651;

	public const int r_mana = 641; // [!code --]
 // [!code --]
	public const int r_DV = 650; // [!code --]
	public const int eco = 652; // [!code ++]

	public const int permaCurse = 656; // [!code --]
	public const int absorbHP = 660; // [!code ++]

	public const int r_life = 640; // [!code --]
	public const int r_DV = 650; // [!code ++]

	public const int absorbHP = 660; // [!code --]
	public const int absorbMP = 661; // [!code ++]

	public const int convertCold = 851;

	public const int absorbSP = 662; // [!code --]
 // [!code --]
	public const int eheluck = 663;

	public const int boostMachine = 664;
```

[`public class ENC`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ENC.cs#L36-L54)
```cs:line-numbers=36

	public const int convertFire = 850;

	public const int mod_frustration = 624; // [!code --]
	public const int r_life = 640; // [!code ++]

	public const int convertImpact = 865;

	public const int convertHoly = 864;

	public const int absorbMP = 661; // [!code --]
	public const int convertLightning = 852; // [!code ++]

	public const int mod_feint = 623; // [!code --]
	public const int absorbSP = 662; // [!code ++]

	public const int convertLightning = 852; // [!code --]
	public const int mod_frustration = 624; // [!code ++]

	public const int mod_flurry = 621; // [!code --]
	public const int sustain_STR = 440; // [!code ++]
 // [!code ++]
	public const int mod_cleave = 622; // [!code ++]
 // [!code ++]
	public const int encTail = 419; // [!code ++]
 // [!code ++]
	public const int negatePoison = 420; // [!code ++]
 // [!code ++]
	public const int negateBlind = 421; // [!code ++]

	public const int negateParalysis = 422;

```

[`public class ENC`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ENC.cs#L78-L106)
```cs:line-numbers=78

	public const int parry = 437;

	public const int knightly = 438; // [!code --]
 // [!code --]
	public const int negateParry = 439; // [!code --]
 // [!code --]
	public const int sustain_STR = 440; // [!code --]
 // [!code --]
	public const int sustain_END = 441; // [!code --]
 // [!code --]
	public const int sustain_DEX = 442; // [!code --]
 // [!code --]
	public const int sustain_PER = 443; // [!code --]
 // [!code --]
	public const int sustain_LER = 444; // [!code --]
 // [!code --]
	public const int negateBlind = 421; // [!code --]
	public const int innocence = 418; // [!code ++]

	public const int sustain_WIL = 445; // [!code --]
	public const int loving = 417; // [!code ++]

	public const int negatePoison = 420; // [!code --]
	public const int seeInvisible = 416; // [!code ++]

	public const int innocence = 418; // [!code --]
	public const int invisibility = 415; // [!code ++]

	public const int mod_cleave = 622; // [!code --]
	public const int counter = 380; // [!code ++]

	public const int basher = 381;

```

[`public class ENC`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ENC.cs#L116-L124)
```cs:line-numbers=116

	public const int expMod = 403;

	public const int weightMod = 404; // [!code --]
	public const int knightly = 438; // [!code ++]

	public const int slowDecay = 405; // [!code --]
	public const int weightMod = 404; // [!code ++]

	public const int resMutation = 406;

```

[`public class ENC`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ENC.cs#L132-L162)
```cs:line-numbers=132

	public const int encSpell = 411;

	public const int slowCorruption = 412; // [!code --]
	public const int mod_feint = 623; // [!code ++]

	public const int encHit = 414;

	public const int invisibility = 415; // [!code --]
 // [!code --]
	public const int seeInvisible = 416; // [!code --]
 // [!code --]
	public const int loving = 417; // [!code --]
 // [!code --]
	public const int encTail = 419; // [!code --]
 // [!code --]
	public const int sustain_MAG = 446; // [!code --]
 // [!code --]
	public const int counter = 380; // [!code --]
 // [!code --]
	public const int sustain_figure = 450; // [!code --]
 // [!code --]
	public const int mod_talisman = 609; // [!code --]
	public const int slowDecay = 405; // [!code ++]

	public const int mod_splash = 608; // [!code --]
	public const int negateParry = 439; // [!code ++]

	public const int mod_scatter = 607; // [!code --]
	public const int slowCorruption = 412; // [!code ++]

	public const int sustain_CHA = 447; // [!code --]
	public const int sustain_END = 441; // [!code ++]

	public const int safetyMeasure = 486;

```

[`public class ENC`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/ENC.cs#L176-L233)
```cs:line-numbers=176

	public const int mod_rapid = 602;

	public const int mod_ammo_knockback = 603; // [!code --]
 // [!code --]
	public const int mod_ammo_recover = 604;

	public const int mod_precision = 605;

	public const int mod_drill = 606; // [!code ++]
 // [!code ++]
	public const int mod_scatter = 607; // [!code ++]
 // [!code ++]
	public const int mod_splash = 608; // [!code ++]
 // [!code ++]
	public const int mod_talisman = 609; // [!code ++]
 // [!code ++]
	public const int mod_chaser = 620; // [!code ++]
 // [!code ++]
	public const int mod_flurry = 621; // [!code ++]
 // [!code ++]
	public const int nonLethal = 485;

	public const int mod_drill = 606; // [!code --]
	public const int slot_rune = 484; // [!code ++]
 // [!code ++]
	public const int mod_ammo_knockback = 603; // [!code ++]
 // [!code ++]
	public const int force_weapon = 482; // [!code ++]

	public const int optimizeMana = 483;

	public const int bane_dragon = 460; // [!code --]
	public const int sustain_DEX = 442; // [!code ++]

	public const int force_weapon = 482; // [!code --]
	public const int sustain_PER = 443; // [!code ++]

	public const int bane_undead = 461; // [!code --]
	public const int sustain_LER = 444; // [!code ++]

	public const int bane_fairy = 462; // [!code --]
	public const int sustain_WIL = 445; // [!code ++]

	public const int mod_chaser = 620; // [!code --]
	public const int sustain_CHA = 447; // [!code ++]
 // [!code ++]
	public const int sustain_figure = 450; // [!code ++]
 // [!code ++]
	public const int bane_dragon = 460; // [!code ++]
 // [!code ++]
	public const int bane_undead = 461; // [!code ++]
 // [!code ++]
	public const int sustain_MAG = 446; // [!code ++]

	public const int bane_animal = 463;

	public const int bane_man = 464;

	public const int revealFaith = 481; // [!code --]
	public const int bane_machine = 465; // [!code ++]

	public const int strongStomach = 480; // [!code --]
	public const int bane_god = 466; // [!code ++]

	public const int bane_machine = 465; // [!code --]
	public const int bane_fish = 467; // [!code ++]

	public const int bane_all = 468;

	public const int slot_rune = 484; // [!code --]
	public const int strongStomach = 480; // [!code ++]

	public const int bane_god = 466; // [!code --]
	public const int bane_fairy = 462; // [!code ++]

	public const int bane_fish = 467; // [!code --]
	public const int revealFaith = 481; // [!code ++]

	public static readonly int[] IDS = new int[108]
	{
		655, 654, 653, 652, 651, 641, 650, 656, 640, 660, // [!code --]
		851, 662, 663, 664, 665, 666, 667, 850, 624, 865, // [!code --]
		864, 661, 623, 852, 621, 422, 423, 424, 425, 426, // [!code --]
		427, 428, 429, 430, 431, 432, 435, 436, 437, 438, // [!code --]
		439, 440, 441, 442, 443, 444, 421, 445, 420, 418, // [!code --]
		622, 381, 382, 383, 400, 401, 402, 403, 404, 405, // [!code --]
		406, 407, 408, 409, 410, 411, 412, 414, 415, 416, // [!code --]
		417, 419, 446, 380, 450, 609, 608, 607, 447, 486, // [!code --]
		487, 488, 489, 490, 491, 600, 601, 602, 603, 604, // [!code --]
		605, 485, 606, 483, 460, 482, 461, 462, 620, 463, // [!code --]
		464, 481, 480, 465, 468, 484, 466, 467 // [!code --]
		656, 655, 654, 641, 653, 651, 652, 660, 650, 661, // [!code ++]
		851, 663, 664, 665, 666, 667, 850, 640, 865, 864, // [!code ++]
		852, 662, 624, 440, 622, 419, 420, 421, 422, 423, // [!code ++]
		424, 425, 426, 427, 428, 429, 430, 431, 432, 435, // [!code ++]
		436, 437, 418, 417, 416, 415, 380, 381, 382, 383, // [!code ++]
		400, 401, 402, 403, 438, 404, 406, 407, 408, 409, // [!code ++]
		410, 411, 623, 414, 405, 439, 412, 441, 486, 487, // [!code ++]
		488, 489, 490, 491, 600, 601, 602, 604, 605, 606, // [!code ++]
		607, 608, 609, 620, 621, 485, 484, 603, 482, 483, // [!code ++]
		442, 443, 444, 445, 447, 450, 460, 461, 446, 463, // [!code ++]
		464, 465, 466, 467, 468, 480, 462, 481 // [!code ++]
	};
}
```

## FACTION

[``](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/FACTION.cs#L4-L28)
```cs:line-numbers=4

public class FACTION
{
	public const int bfSilica = 3802; // [!code --]
	public const int bfRuin = 3702; // [!code ++]

	public const int bfGum = 3803; // [!code --]
	public const int bfForest = 3601; // [!code ++]

	public const int fRation = 2207; // [!code --]
	public const int bfSnow = 3602; // [!code ++]

	public const int actBuildTerrain = 4002; // [!code --]
	public const int bfHill = 3603; // [!code ++]

	public const int actBuildMine = 4001; // [!code --]
	public const int bfBeach = 3604; // [!code ++]

	public const int actBuildCut = 4000; // [!code --]
	public const int bfGeyser = 3701; // [!code ++]

	public const int bfStart = 3900; // [!code --]
	public const int bfUndersea = 3606; // [!code ++]

	public const int bfIce = 3804; // [!code --]
	public const int bfFertile = 3700; // [!code ++]

	public const int bfMushroom = 3801; // [!code --]
	public const int bfPlain = 3600; // [!code ++]

	public const int bfChitin = 3805; // [!code --]
	public const int bfSea = 3605; // [!code ++]
 // [!code ++]
	public const int bfCave = 3500; // [!code ++]
 // [!code ++]
	public const int fLuck = 2118; // [!code ++]

	public const int fSafety = 2205;

```

[`public class FACTION`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/FACTION.cs#L40-L123)
```cs:line-numbers=40

	public const int fTaxEvasion = 2119;

	public const int fLuck = 2118; // [!code --]
 // [!code --]
	public const int fLoyal = 2117;

	public const int fEducation = 2116;

	public const int fAdmin = 2115; // [!code --]
	public const int bfTranquil = 3703; // [!code ++]

	public const int fConstruction = 2003; // [!code --]
	public const int fAttraction = 2206; // [!code ++]

	public const int bfCoal = 3800; // [!code --]
	public const int bfVolcano = 3704; // [!code ++]

	public const int bfLandmark5 = 3784; // [!code --]
	public const int actBuildMine = 4001; // [!code ++]

	public const int fAttraction = 2206; // [!code --]
	public const int bfFish = 3706; // [!code ++]

	public const int bfLandmark3 = 3782; // [!code --]
	public const int actBuildInspect = 4006; // [!code ++]

	public const int bfLandmark4 = 3783; // [!code --]
	public const int actBuildRecipe = 4005; // [!code ++]

	public const int bfHunt = 3705; // [!code --]
	public const int actBuildCollect = 4004; // [!code ++]

	public const int bfVolcano = 3704; // [!code --]
	public const int actBuildAnywhere = 4003; // [!code ++]

	public const int bfTranquil = 3703; // [!code --]
	public const int actBuildTerrain = 4002; // [!code ++]

	public const int bfFish = 3706; // [!code --]
	public const int fAdmin = 2115; // [!code ++]

	public const int bfRuin = 3702; // [!code --]
	public const int actBuildCut = 4000; // [!code ++]

	public const int bfGeyser = 3701; // [!code --]
	public const int bfStart = 3900; // [!code ++]

	public const int bfFertile = 3700; // [!code --]
	public const int bfChitin = 3805; // [!code ++]

	public const int bfUndersea = 3606; // [!code --]
	public const int bfIce = 3804; // [!code ++]

	public const int bfBeach = 3604; // [!code --]
	public const int bfGum = 3803; // [!code ++]

	public const int bfHill = 3603; // [!code --]
	public const int bfSilica = 3802; // [!code ++]

	public const int bfSnow = 3602; // [!code --]
	public const int bfMushroom = 3801; // [!code ++]

	public const int bfForest = 3601; // [!code --]
	public const int bfCoal = 3800; // [!code ++]

	public const int bfSea = 3605; // [!code --]
	public const int bfLandmark5 = 3784; // [!code ++]

	public const int bfCave = 3500; // [!code --]
	public const int bfLandmark4 = 3783; // [!code ++]

	public const int actBuildInspect = 4006; // [!code --]
	public const int bfLandmark3 = 3782; // [!code ++]

	public const int bfLandmark2 = 3781;

	public const int actBuildRecipe = 4005; // [!code --]
 // [!code --]
	public const int actBuildCollect = 4004; // [!code --]
	public const int bfLandmark1 = 3780; // [!code ++]

	public const int actBuildAnywhere = 4003; // [!code --]
	public const int bfBreed = 3710; // [!code ++]

	public const int bfMonster = 3707; // [!code --]
	public const int bfBasin = 3709; // [!code ++]

	public const int bfFreshAir = 3708;

	public const int bfBasin = 3709; // [!code --]
	public const int bfMonster = 3707; // [!code ++]

	public const int bfBreed = 3710; // [!code --]
	public const int bfHunt = 3705; // [!code ++]

	public const int bfPlain = 3600; // [!code --]
	public const int fConstruction = 2003; // [!code ++]

	public const int bfLandmark1 = 3780; // [!code --]
	public const int fRation = 2207; // [!code ++]

	public static readonly int[] IDS = new int[53]
	{
		3802, 3803, 2207, 4002, 4001, 4000, 3900, 3804, 3801, 3805, // [!code --]
		2205, 2204, 2203, 2202, 2201, 2200, 2120, 2119, 2118, 2117, // [!code --]
		2116, 2115, 2003, 3800, 3784, 2206, 3782, 3783, 3705, 3704, // [!code --]
		3703, 3706, 3702, 3701, 3700, 3606, 3604, 3603, 3602, 3601, // [!code --]
		3605, 3500, 4006, 3781, 4005, 4004, 4003, 3707, 3708, 3709, // [!code --]
		3710, 3600, 3780 // [!code --]
		3702, 3601, 3602, 3603, 3604, 3701, 3606, 3700, 3600, 3605, // [!code ++]
		3500, 2118, 2205, 2204, 2203, 2202, 2201, 2200, 2120, 2119, // [!code ++]
		2117, 2116, 3703, 2206, 3704, 4001, 3706, 4006, 4005, 4004, // [!code ++]
		4003, 4002, 2115, 4000, 3900, 3805, 3804, 3803, 3802, 3801, // [!code ++]
		3800, 3784, 3783, 3782, 3781, 3780, 3710, 3709, 3708, 3707, // [!code ++]
		3705, 2003, 2207 // [!code ++]
	};
}
public class Faction : EClass
```

## FEAT

[``](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/FEAT.cs#L3-L328)
```cs:line-numbers=3

public class FEAT
{
	public const int featPER = 1623; // [!code --]
 // [!code --]
	public const int featLER = 1624; // [!code --]
 // [!code --]
	public const int featMAG = 1625; // [!code --]
 // [!code --]
	public const int featHardy = 1630; // [!code --]
	public const int featLightEater = 1235; // [!code ++]

	public const int featCHA = 1627; // [!code --]
	public const int featSorter = 1643; // [!code ++]

	public const int featLuck = 1628; // [!code --]
	public const int featBodyParts = 1644; // [!code ++]

	public const int featSPD = 1629; // [!code --]
	public const int featParty = 1645; // [!code ++]

	public const int featEND = 1622; // [!code --]
	public const int featLonelySoul = 1646; // [!code ++]

	public const int featDefense = 1631; // [!code --]
	public const int featSummoner = 1647; // [!code ++]

	public const int featWIL = 1626; // [!code --]
	public const int featRapidMagic = 1648; // [!code ++]

	public const int featDEX = 1621; // [!code --]
	public const int featDefender = 1649; // [!code ++]

	public const int featManaMeat = 1421; // [!code --]
	public const int featSleeper = 1642; // [!code ++]

	public const int featStamina = 1612; // [!code --]
	public const int featGourmet = 1650; // [!code ++]

	public const int featMana = 1611; // [!code --]
	public const int featRapidArrow = 1652; // [!code ++]

	public const int featLife = 1610; // [!code --]
	public const int featDreamWaker = 1653; // [!code ++]

	public const int featManyFace = 1429; // [!code --]
	public const int featHeavyCasting = 1654; // [!code ++]

	public const int featMurderer = 1428; // [!code --]
	public const int featModelBeliever = 1655; // [!code ++]

	public const int featDisguise = 1427; // [!code --]
	public const int featScavenger = 1656; // [!code ++]

	public const int featNeckHunter = 1426; // [!code --]
	public const int featManaCost = 1657; // [!code ++]

	public const int featMimic = 1425; // [!code --]
	public const int featChef = 1658; // [!code ++]

	public const int featElite = 1424; // [!code --]
	public const int featMagicManner = 1651; // [!code ++]

	public const int featPeaky = 1423; // [!code --]
	public const int featResCurse = 1641; // [!code ++]

	public const int featHealer = 1422; // [!code --]
	public const int featAnimalLover = 1640; // [!code ++]

	public const int featEvade = 1632; // [!code --]
	public const int featFaith = 1636; // [!code ++]

	public const int featExecutioner = 1420; // [!code --]
	public const int featStamina = 1612; // [!code ++]

	public const int featSTR = 1620;

	public const int featSpotting = 1633; // [!code --]
	public const int featDEX = 1621; // [!code ++]

	public const int featDefender = 1649; // [!code --]
	public const int featEND = 1622; // [!code ++]

	public const int featMartial = 1635; // [!code --]
	public const int featPER = 1623; // [!code ++]

	public const int featMilitant = 1419; // [!code --]
	public const int featLER = 1624; // [!code ++]

	public const int featComat = 1750; // [!code --]
	public const int featMAG = 1625; // [!code ++]

	public const int featFastFucker = 1664; // [!code --]
	public const int featWIL = 1626; // [!code ++]

	public const int featFastEater = 1663; // [!code --]
	public const int featCHA = 1627; // [!code ++]

	public const int featGoldenFinger = 1662; // [!code --]
	public const int featLuck = 1628; // [!code ++]

	public const int featDismantler = 1661; // [!code --]
	public const int featSPD = 1629; // [!code ++]

	public const int featLooter = 1660; // [!code --]
	public const int featHardy = 1630; // [!code ++]

	public const int featFisher = 1659; // [!code --]
	public const int featDefense = 1631; // [!code ++]

	public const int featChef = 1658; // [!code --]
	public const int featEvade = 1632; // [!code ++]

	public const int featManaCost = 1657; // [!code --]
	public const int featSpotting = 1633; // [!code ++]

	public const int featScavenger = 1656; // [!code --]
	public const int featNegotiate = 1634; // [!code ++]

	public const int featModelBeliever = 1655; // [!code --]
	public const int featMartial = 1635; // [!code ++]

	public const int featHeavyCasting = 1654; // [!code --]
	public const int featFisher = 1659; // [!code ++]

	public const int featDreamWaker = 1653; // [!code --]
	public const int featMana = 1611; // [!code ++]

	public const int featRapidArrow = 1652; // [!code --]
	public const int featLooter = 1660; // [!code ++]

	public const int featMagicManner = 1651; // [!code --]
	public const int featGoldenFinger = 1662; // [!code ++]

	public const int featGourmet = 1650; // [!code --]
	public const int featManaPrecision = 1214; // [!code ++]

	public const int featRapidMagic = 1648; // [!code --]
	public const int featElea = 1213; // [!code ++]

	public const int featSummoner = 1647; // [!code --]
	public const int featFairyResist = 1212; // [!code ++]

	public const int featLonelySoul = 1646; // [!code --]
	public const int featSnail = 1211; // [!code ++]

	public const int featParty = 1645; // [!code --]
	public const int featUndead = 1210; // [!code ++]

	public const int featBodyParts = 1644; // [!code --]
	public const int featFluffyTail = 1209; // [!code ++]

	public const int featSorter = 1643; // [!code --]
	public const int featFoxLearn = 1208; // [!code ++]

	public const int featSleeper = 1642; // [!code --]
	public const int featDwarf = 1215; // [!code ++]

	public const int featResCurse = 1641; // [!code --]
	public const int featFoxBless = 1207; // [!code ++]

	public const int featAnimalLover = 1640; // [!code --]
	public const int featCannibalism = 1205; // [!code ++]

	public const int featFaith = 1636; // [!code --]
	public const int featFairyWeak = 1204; // [!code ++]

	public const int featNegotiate = 1634; // [!code --]
	public const int featGrowParts = 1203; // [!code ++]

	public const int featSwordsage = 1418; // [!code --]
	public const int featFastLearner = 1202; // [!code ++]

	public const int featGod_trickery1 = 1345; // [!code --]
	public const int featManaBond = 1201; // [!code ++]

	public const int featInquisitor = 1416; // [!code --]
	public const int featSlowFood = 1200; // [!code ++]

	public const int featHeavyEater = 1234;

	public const int featLightEater = 1235; // [!code --]
	public const int featMelilithCurse = 1206; // [!code ++]

	public const int featNorland = 1236; // [!code --]
	public const int featSuccubus = 1216; // [!code ++]

	public const int featRoran = 1237; // [!code --]
	public const int featGolem = 1217; // [!code ++]

	public const int featElder = 1238; // [!code --]
	public const int featMetal = 1218; // [!code ++]

	public const int featDemon = 1239; // [!code --]
	public const int featFastEater = 1663; // [!code ++]

	public const int featMassSummoner = 1240; // [!code --]
	public const int featFastFucker = 1664; // [!code ++]

	public const int featMeatCushion = 1241; // [!code --]
	public const int featComat = 1750; // [!code ++]

	public const int featGeneSlot = 1242; // [!code --]
	public const int featCosmicHorror = 1233; // [!code ++]

	public const int featEternalYouth = 1243; // [!code --]
	public const int featBaby = 1232; // [!code ++]

	public const int featCentaur = 1244; // [!code --]
	public const int featNirvana = 1231; // [!code ++]

	public const int featSevenSense = 1245; // [!code --]
	public const int featAdam = 1230; // [!code ++]

	public const int featPegasus = 1246; // [!code --]
	public const int featDemigod = 1228; // [!code ++]

	public const int featLibra = 1247; // [!code --]
	public const int featServant = 1227; // [!code ++]

	public const int featMiscreation = 1248; // [!code --]
	public const int featUnderground = 1226; // [!code ++]

	public const int featBloodBond = 1249; // [!code --]
	public const int featLoyal = 1225; // [!code ++]

	public const int featVampire = 1250; // [!code --]
	public const int featShiva = 1224; // [!code ++]

	public const int featAshborn = 1251; // [!code --]
	public const int featAcidBody = 1223; // [!code ++]

	public const int featAquatic = 1252; // [!code --]
	public const int featSplit = 1222; // [!code ++]

	public const int featCancer = 1253; // [!code --]
	public const int featSpike = 1221; // [!code ++]

	public const int featWitch = 1417; // [!code --]
	public const int featFate = 1220; // [!code ++]

	public const int featBadKarma = 1271; // [!code --]
	public const int featElderCrab = 1219; // [!code ++]

	public const int featPeacemaker = 1272; // [!code --]
	public const int featDismantler = 1661; // [!code ++]

	public const int featBloom = 1273; // [!code --]
	public const int featLife = 1610; // [!code ++]

	public const int featSlimeEvolution = 1274; // [!code --]
	public const int featLittleOne = 1229; // [!code ++]

	public const int featBelovedOne = 1275; // [!code --]
	public const int featArcher = 1404; // [!code ++]

	public const int featHarem = 1276; // [!code --]
	public const int featBoost = 1409; // [!code ++]

	public const int featGoddess = 1290; // [!code --]
	public const int featReboot = 1410; // [!code ++]

	public const int featSadCreature = 1291; // [!code --]
	public const int featEarthStrength = 1411; // [!code ++]

	public const int featCosmicHorror = 1233; // [!code --]
	public const int featLuckyCat = 1412; // [!code ++]

	public const int featBaby = 1232; // [!code --]
	public const int featFairysan = 1413; // [!code ++]

	public const int featNirvana = 1231; // [!code --]
	public const int featWhiteVixen = 1414; // [!code ++]

	public const int featAdam = 1230; // [!code --]
	public const int featFoxMaid = 1415; // [!code ++]

	public const int featSlowFood = 1200; // [!code --]
	public const int featInquisitor = 1416; // [!code ++]

	public const int featManaBond = 1201; // [!code --]
	public const int featWitch = 1417; // [!code ++]

	public const int featFastLearner = 1202; // [!code --]
	public const int featSwordsage = 1418; // [!code ++]

	public const int featGrowParts = 1203; // [!code --]
	public const int featMilitant = 1419; // [!code ++]

	public const int featFairyWeak = 1204; // [!code --]
	public const int featExecutioner = 1420; // [!code ++]

	public const int featCannibalism = 1205; // [!code --]
	public const int featManaMeat = 1421; // [!code ++]

	public const int featMelilithCurse = 1206; // [!code --]
	public const int featHealer = 1422; // [!code ++]

	public const int featFoxBless = 1207; // [!code --]
	public const int featPeaky = 1423; // [!code ++]

	public const int featFoxLearn = 1208; // [!code --]
	public const int featElite = 1424; // [!code ++]

	public const int featFluffyTail = 1209; // [!code --]
	public const int featMimic = 1425; // [!code ++]

	public const int featUndead = 1210; // [!code --]
	public const int featPaladin2 = 1408; // [!code ++]

	public const int featSnail = 1211; // [!code --]
	public const int featPaladin = 1407; // [!code ++]

	public const int featFairyResist = 1212; // [!code --]
	public const int featTourist = 1406; // [!code ++]

	public const int featElea = 1213; // [!code --]
	public const int featPianist = 1405; // [!code ++]

	public const int featGod_element1 = 1300;

	public const int featManaPrecision = 1214; // [!code --]
	public const int featGod_earth1 = 1305; // [!code ++]

	public const int featSuccubus = 1216; // [!code --]
	public const int featGod_wind1 = 1310; // [!code ++]

	public const int featGolem = 1217; // [!code --]
	public const int featNorland = 1236; // [!code ++]

	public const int featMetal = 1218; // [!code --]
	public const int featGod_machine1 = 1315; // [!code ++]

	public const int featElderCrab = 1219; // [!code --]
	public const int featGod_healing1 = 1320; // [!code ++]

	public const int featFate = 1220; // [!code --]
	public const int featGod_harvest1 = 1325; // [!code ++]

	public const int featSpike = 1221; // [!code --]
	public const int featGod_luck1 = 1330; // [!code ++]

	public const int featSplit = 1222; // [!code --]
	public const int featNeckHunter = 1426; // [!code ++]

	public const int featAcidBody = 1223; // [!code --]
	public const int featGod_harmony1 = 1335; // [!code ++]

	public const int featShiva = 1224; // [!code --]
	public const int featGod_trickery1 = 1345; // [!code ++]

	public const int featLoyal = 1225; // [!code --]
	public const int featGod_moonshadow1 = 1350; // [!code ++]

	public const int featUnderground = 1226; // [!code --]
	public const int featGod_strife1 = 1355; // [!code ++]

	public const int featServant = 1227; // [!code --]
	public const int featWarrior = 1400; // [!code ++]

	public const int featDemigod = 1228; // [!code --]
	public const int featThief = 1401; // [!code ++]

	public const int featLittleOne = 1229; // [!code --]
	public const int featWizard = 1402; // [!code ++]

	public const int featDwarf = 1215; // [!code --]
	public const int featFarmer = 1403; // [!code ++]

	public const int featGod_earth1 = 1305; // [!code --]
	public const int featHarem = 1276; // [!code ++]

	public const int featGoodKarma = 1270; // [!code --]
	public const int featGod_oblivion1 = 1340; // [!code ++]

	public const int featGod_machine1 = 1315; // [!code --]
	public const int featSadCreature = 1291; // [!code ++]

	public const int featWhiteVixen = 1414; // [!code --]
	public const int featDisguise = 1427; // [!code ++]

	public const int featFairysan = 1413; // [!code --]
	public const int featManyFace = 1429; // [!code ++]

	public const int featLuckyCat = 1412; // [!code --]
	public const int featMassSummoner = 1240; // [!code ++]

	public const int featEarthStrength = 1411; // [!code --]
	public const int featMeatCushion = 1241; // [!code ++]

	public const int featReboot = 1410; // [!code --]
	public const int featGeneSlot = 1242; // [!code ++]

	public const int featBoost = 1409; // [!code --]
	public const int featEternalYouth = 1243; // [!code ++]

	public const int featPaladin2 = 1408; // [!code --]
	public const int featCentaur = 1244; // [!code ++]

	public const int featPaladin = 1407; // [!code --]
	public const int featSevenSense = 1245; // [!code ++]

	public const int featTourist = 1406; // [!code --]
	public const int featPegasus = 1246; // [!code ++]

	public const int featGod_wind1 = 1310; // [!code --]
	public const int featLibra = 1247; // [!code ++]

	public const int featPianist = 1405; // [!code --]
	public const int featMiscreation = 1248; // [!code ++]

	public const int featArcher = 1404; // [!code --]
	public const int featBloodBond = 1249; // [!code ++]

	public const int featFarmer = 1403; // [!code --]
	public const int featVampire = 1250; // [!code ++]

	public const int featWizard = 1402; // [!code --]
	public const int featAshborn = 1251; // [!code ++]

	public const int featThief = 1401; // [!code --]
	public const int featAquatic = 1252; // [!code ++]

	public const int featWarrior = 1400; // [!code --]
	public const int featCancer = 1253; // [!code ++]

	public const int featGod_strife1 = 1355; // [!code --]
	public const int featGoodKarma = 1270; // [!code ++]

	public const int featGod_moonshadow1 = 1350; // [!code --]
	public const int featBadKarma = 1271; // [!code ++]

	public const int featGod_oblivion1 = 1340; // [!code --]
	public const int featPeacemaker = 1272; // [!code ++]

	public const int featGod_harmony1 = 1335; // [!code --]
	public const int featDemon = 1239; // [!code ++]

	public const int featGod_luck1 = 1330; // [!code --]
	public const int featMurderer = 1428; // [!code ++]

	public const int featGod_harvest1 = 1325; // [!code --]
	public const int featElder = 1238; // [!code ++]

	public const int featGod_healing1 = 1320; // [!code --]
	public const int featGoddess = 1290; // [!code ++]

	public const int featFoxMaid = 1415; // [!code --]
	public const int featAstralBody = 1430; // [!code ++]
 // [!code ++]
	public const int featBelovedOne = 1275; // [!code ++]
 // [!code ++]
	public const int featSlimeEvolution = 1274; // [!code ++]
 // [!code ++]
	public const int featBloom = 1273; // [!code ++]
 // [!code ++]
	public const int featRoran = 1237; // [!code ++]

	public static readonly int[] IDS = new int[151] // [!code --]
	public static readonly int[] IDS = new int[152] // [!code ++]
	{
		1623, 1624, 1625, 1630, 1627, 1628, 1629, 1622, 1631, 1626, // [!code --]
		1621, 1421, 1612, 1611, 1610, 1429, 1428, 1427, 1426, 1425, // [!code --]
		1424, 1423, 1422, 1632, 1420, 1620, 1633, 1649, 1635, 1419, // [!code --]
		1750, 1664, 1663, 1662, 1661, 1660, 1659, 1658, 1657, 1656, // [!code --]
		1655, 1654, 1653, 1652, 1651, 1650, 1648, 1647, 1646, 1645, // [!code --]
		1644, 1643, 1642, 1641, 1640, 1636, 1634, 1418, 1345, 1416, // [!code --]
		1234, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1242, 1243, // [!code --]
		1235, 1643, 1644, 1645, 1646, 1647, 1648, 1649, 1642, 1650, // [!code ++]
		1652, 1653, 1654, 1655, 1656, 1657, 1658, 1651, 1641, 1640, // [!code ++]
		1636, 1612, 1620, 1621, 1622, 1623, 1624, 1625, 1626, 1627, // [!code ++]
		1628, 1629, 1630, 1631, 1632, 1633, 1634, 1635, 1659, 1611, // [!code ++]
		1660, 1662, 1214, 1213, 1212, 1211, 1210, 1209, 1208, 1215, // [!code ++]
		1207, 1205, 1204, 1203, 1202, 1201, 1200, 1234, 1206, 1216, // [!code ++]
		1217, 1218, 1663, 1664, 1750, 1233, 1232, 1231, 1230, 1228, // [!code ++]
		1227, 1226, 1225, 1224, 1223, 1222, 1221, 1220, 1219, 1661, // [!code ++]
		1610, 1229, 1404, 1409, 1410, 1411, 1412, 1413, 1414, 1415, // [!code ++]
		1416, 1417, 1418, 1419, 1420, 1421, 1422, 1423, 1424, 1425, // [!code ++]
		1408, 1407, 1406, 1405, 1300, 1305, 1310, 1236, 1315, 1320, // [!code ++]
		1325, 1330, 1426, 1335, 1345, 1350, 1355, 1400, 1401, 1402, // [!code ++]
		1403, 1276, 1340, 1291, 1427, 1429, 1240, 1241, 1242, 1243, // [!code ++]
		1244, 1245, 1246, 1247, 1248, 1249, 1250, 1251, 1252, 1253,
		1417, 1271, 1272, 1273, 1274, 1275, 1276, 1290, 1291, 1233, // [!code --]
		1232, 1231, 1230, 1200, 1201, 1202, 1203, 1204, 1205, 1206, // [!code --]
		1207, 1208, 1209, 1210, 1211, 1212, 1213, 1300, 1214, 1216, // [!code --]
		1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, // [!code --]
		1227, 1228, 1229, 1215, 1305, 1270, 1315, 1414, 1413, 1412, // [!code --]
		1411, 1410, 1409, 1408, 1407, 1406, 1310, 1405, 1404, 1403, // [!code --]
		1402, 1401, 1400, 1355, 1350, 1340, 1335, 1330, 1325, 1320, // [!code --]
		1415 // [!code --]
		1270, 1271, 1272, 1239, 1428, 1238, 1290, 1430, 1275, 1274, // [!code ++]
		1273, 1237 // [!code ++]
	};
}
public class Feat : Element
```

## FOOD

[`public class FOOD`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/FOOD.cs#L1-L36)
```cs:line-numbers=1
public class FOOD
{
	public const int creativeDish = 764; // [!code --]
 // [!code --]
	public const int food_human = 708; // [!code --]
 // [!code --]
	public const int justcooked = 757; // [!code --]
 // [!code --]
	public const int food_CHA = 700;

	public const int food_cat = 701;

	public const int food_god = 758; // [!code --]
	public const int food_poison = 702; // [!code ++]

	public const int food_love = 703;

	public const int food_bug = 704; // [!code --]
 // [!code --]
	public const int food_poison = 702; // [!code --]
	public const int gainWeight = 705; // [!code ++]

	public const int loseWeight = 706;

	public const int kirimi = 707;

	public const int food_human = 708; // [!code ++]
 // [!code ++]
	public const int food_undead = 709;

	public const int food_blood = 710;

	public const int gainWeight = 705; // [!code --]
	public const int justcooked = 757; // [!code ++]
 // [!code ++]
	public const int food_god = 758; // [!code ++]
 // [!code ++]
	public const int food_bug = 704; // [!code ++]
 // [!code ++]
	public const int creativeDish = 764; // [!code ++]

	public static readonly int[] IDS = new int[14]
	{
		764, 708, 757, 700, 701, 758, 703, 704, 702, 706, // [!code --]
		707, 709, 710, 705 // [!code --]
		700, 701, 702, 703, 705, 706, 707, 708, 709, 710, // [!code ++]
		757, 758, 704, 764 // [!code ++]
	};
}
```

## GameSetting

[`public class UD_FogSetting : UDictionary<FogType, ScreenGradingProfile.Fog>`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/GameSetting.cs#L195-L200)
```cs:line-numbers=195

		public float hangedObjFixZ;

		public float astralBodyFixZ; // [!code ++]
 // [!code ++]
		public Vector3 shadowScale;

		public Vector3 shadowOffset;
```

## GoalCombat

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/GoalCombat.cs#L335-L340)
```cs:line-numbers=335
			{
				yield return Success();
			}
			if (owner.tactics.DestDist > 4) // [!code ++]
			{ // [!code ++]
				yield return Success(); // [!code ++]
			} // [!code ++]
			yield return DoGoto(tc.pos);
		}
		else if (owner.FindNearestNewEnemy())
```

## IPathfindWalker

[`public interface IPathfindWalker`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/IPathfindWalker.cs#L1-L3)
```cs:line-numbers=1
public interface IPathfindWalker
{
	bool IsAstralBody { get; } // [!code ++]
}
```

## MUTATION

[`public class MUTATION`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/MUTATION.cs#L1-L91)
```cs:line-numbers=1
public class MUTATION
{
	public const int mutationDexN = 1515; // [!code --]
	public const int mutationStr = 1520; // [!code ++]

	public const int mutationSkin = 1510; // [!code --]
	public const int mutationStrN = 1521; // [!code ++]

	public const int mutationSkinN = 1511; // [!code --]
	public const int mutationSkin = 1510; // [!code ++]

	public const int mutationEye = 1512; // [!code --]
	public const int etherWing = 1554; // [!code ++]

	public const int mutationEyeN = 1513; // [!code --]
	public const int etherFeet = 1552; // [!code ++]

	public const int mutationDex = 1514; // [!code --]
	public const int etherUgly = 1551; // [!code ++]

	public const int mutationRegen = 1516; // [!code --]
	public const int etherGravity = 1550; // [!code ++]

	public const int mutationStr = 1520; // [!code --]
	public const int mutationHairN = 1533; // [!code ++]

	public const int mutationSpeed = 1518; // [!code --]
	public const int mutationHair = 1532; // [!code ++]

	public const int etherPoisonHand = 1565; // [!code --]
	public const int mutationBodyN = 1531; // [!code ++]

	public const int etherManaBattery = 1564; // [!code --]
	public const int etherNeck = 1555; // [!code ++]

	public const int etherProvoke = 1563; // [!code --]
	public const int mutationBody = 1530; // [!code ++]

	public const int etherArmor = 1562; // [!code --]
	public const int mutationLightning = 1528; // [!code ++]

	public const int etherStupid = 1561; // [!code --]
	public const int mutationColdN = 1527; // [!code ++]

	public const int etherWeak = 1560; // [!code --]
	public const int mutationCold = 1526; // [!code ++]

	public const int etherAddict = 1559; // [!code --]
	public const int mutationBrainN = 1525; // [!code ++]

	public const int etherRain = 1558; // [!code --]
	public const int mutationBrain = 1524; // [!code ++]

	public const int etherHead = 1557; // [!code --]
	public const int mutationChaN = 1523; // [!code ++]

	public const int etherViolence = 1556; // [!code --]
	public const int mutationCha = 1522; // [!code ++]

	public const int etherNeck = 1555; // [!code --]
	public const int mutationLightningN = 1529; // [!code ++]

	public const int etherWing = 1554; // [!code --]
	public const int etherViolence = 1556; // [!code ++]

	public const int mutationRegenN = 1517; // [!code --]
	public const int etherEye = 1553; // [!code ++]

	public const int etherFeet = 1552; // [!code --]
	public const int etherRain = 1558; // [!code ++]

	public const int etherUgly = 1551; // [!code --]
	public const int mutationSkinN = 1511; // [!code ++]

	public const int etherEye = 1553; // [!code --]
	public const int mutationEye = 1512; // [!code ++]

	public const int mutationChaN = 1523; // [!code --]
	public const int mutationEyeN = 1513; // [!code ++]

	public const int mutationSpeedN = 1519; // [!code --]
	public const int mutationDex = 1514; // [!code ++]

	public const int mutationStrN = 1521; // [!code --]
	public const int mutationDexN = 1515; // [!code ++]

	public const int mutationCha = 1522; // [!code --]
	public const int etherHead = 1557; // [!code ++]

	public const int etherGravity = 1550; // [!code --]
	public const int mutationRegenN = 1517; // [!code ++]

	public const int mutationBrain = 1524; // [!code --]
	public const int mutationSpeed = 1518; // [!code ++]

	public const int mutationBrainN = 1525; // [!code --]
	public const int mutationRegen = 1516; // [!code ++]

	public const int mutationCold = 1526; // [!code --]
	public const int etherPoisonHand = 1565; // [!code ++]

	public const int mutationLightning = 1528; // [!code --]
	public const int etherManaBattery = 1564; // [!code ++]

	public const int mutationLightningN = 1529; // [!code --]
	public const int etherProvoke = 1563; // [!code ++]

	public const int mutationBody = 1530; // [!code --]
	public const int etherArmor = 1562; // [!code ++]

	public const int mutationBodyN = 1531; // [!code --]
	public const int etherStupid = 1561; // [!code ++]

	public const int mutationHair = 1532; // [!code --]
	public const int etherWeak = 1560; // [!code ++]

	public const int mutationHairN = 1533; // [!code --]
	public const int etherAddict = 1559; // [!code ++]

	public const int mutationColdN = 1527; // [!code --]
	public const int mutationSpeedN = 1519; // [!code ++]

	public static readonly int[] IDS = new int[40]
	{
		1515, 1510, 1511, 1512, 1513, 1514, 1516, 1520, 1518, 1565, // [!code --]
		1564, 1563, 1562, 1561, 1560, 1559, 1558, 1557, 1556, 1555, // [!code --]
		1554, 1517, 1552, 1551, 1553, 1523, 1519, 1521, 1522, 1550, // [!code --]
		1524, 1525, 1526, 1528, 1529, 1530, 1531, 1532, 1533, 1527 // [!code --]
		1520, 1521, 1510, 1554, 1552, 1551, 1550, 1533, 1532, 1531, // [!code ++]
		1555, 1530, 1528, 1527, 1526, 1525, 1524, 1523, 1522, 1529, // [!code ++]
		1556, 1553, 1558, 1511, 1512, 1513, 1514, 1515, 1557, 1517, // [!code ++]
		1518, 1516, 1565, 1564, 1563, 1562, 1561, 1560, 1559, 1519 // [!code ++]
	};
}
public class Mutation : Feat
```

## POLICY

[``](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/POLICY.cs#L3-L30)
```cs:line-numbers=3

public class POLICY
{
	public const int license_stolen = 2824; // [!code --]
	public const int celeb = 2822; // [!code ++]

	public const int legendary_exhibition = 2823; // [!code --]
	public const int license_slaver = 2828; // [!code ++]

	public const int milk_fan = 2825; // [!code --]
	public const int breed_season = 2827; // [!code ++]

	public const int celeb = 2822; // [!code --]
	public const int egg_fan = 2826; // [!code ++]

	public const int breed_season = 2827; // [!code --]
	public const int milk_fan = 2825; // [!code ++]

	public const int license_slaver = 2828; // [!code --]
	public const int license_stolen = 2824; // [!code ++]

	public const int egg_fan = 2826; // [!code --]
	public const int legendary_exhibition = 2823; // [!code ++]

	public const int legendary_heirloom = 2821;

	public const int wealth_tax = 2500; // [!code --]
	public const int livestock_priv = 2715; // [!code ++]

	public const int license_furniture = 2819;

	public const int trash_sort = 2701; // [!code --]
 // [!code --]
	public const int energy_conservation = 2700;

	public const int speed_growth = 2516;
```

[`public class POLICY`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/POLICY.cs#L35-L118)
```cs:line-numbers=35

	public const int resident_wanted = 2513;

	public const int resident_tax = 2512; // [!code --]
 // [!code --]
	public const int self_sufficient = 2511; // [!code --]
	public const int inquisition = 2507; // [!code ++]

	public const int trash_no = 2702; // [!code --]
	public const int license_general = 2820; // [!code ++]

	public const int ban_radio = 2510; // [!code --]
	public const int wealth_tax = 2500; // [!code ++]

	public const int nocturnal_life = 2508; // [!code --]
	public const int trash_sort = 2701; // [!code ++]

	public const int inquisition = 2507; // [!code --]
	public const int faith_tax = 2501; // [!code ++]

	public const int human_right = 2506; // [!code --]
	public const int prohibition = 2503; // [!code ++]

	public const int impressment = 2504;

	public const int prohibition = 2503; // [!code --]
	public const int legal_drug = 2505; // [!code ++]

	public const int food_for_people = 2502; // [!code --]
	public const int resident_tax = 2512; // [!code ++]

	public const int faith_tax = 2501; // [!code --]
	public const int self_sufficient = 2511; // [!code ++]

	public const int license_general = 2820; // [!code --]
	public const int ban_radio = 2510; // [!code ++]

	public const int vaccination = 2509;

	public const int weed_no = 2703; // [!code --]
	public const int nocturnal_life = 2508; // [!code ++]

	public const int legal_drug = 2505; // [!code --]
	public const int food_for_people = 2502; // [!code ++]

	public const int taxTransfer = 2705; // [!code --]
	public const int trash_no = 2702; // [!code ++]

	public const int border_watch = 2704; // [!code --]
	public const int human_right = 2506; // [!code ++]

	public const int license_food = 2818; // [!code --]
	public const int border_watch = 2704; // [!code ++]

	public const int store_premium = 2817; // [!code --]
	public const int weed_no = 2703; // [!code ++]

	public const int platinum_ticket = 2815; // [!code --]
	public const int incomeTransfer = 2711; // [!code ++]

	public const int mass_exhibition = 2814; // [!code --]
	public const int forcePanty = 2712; // [!code ++]

	public const int suite_room = 2813; // [!code --]
	public const int home_discount = 2800; // [!code ++]

	public const int bed_quality = 2812; // [!code --]
	public const int open_business = 2810; // [!code ++]

	public const int tourist_safety = 2811;

	public const int open_business = 2810; // [!code --]
	public const int bed_quality = 2812; // [!code ++]

	public const int store_ripoff = 2816; // [!code --]
	public const int suite_room = 2813; // [!code ++]

	public const int livestock_priv = 2715; // [!code --]
	public const int mass_exhibition = 2814; // [!code ++]

	public const int forcePanty = 2712; // [!code --]
	public const int noMother = 2710; // [!code ++]

	public const int incomeTransfer = 2711; // [!code --]
	public const int store_ripoff = 2816; // [!code ++]

	public const int noMother = 2710; // [!code --]
	public const int store_premium = 2817; // [!code ++]
 // [!code ++]
	public const int license_food = 2818; // [!code ++]

	public const int noAnimal = 2709;

	public const int noDM = 2708;

	public const int home_discount = 2800; // [!code --]
 // [!code --]
	public const int auto_farm = 2707;

	public const int demon_invocation = 2706;

	public const int taxTransfer = 2705; // [!code ++]
 // [!code ++]
	public const int platinum_ticket = 2815; // [!code ++]
 // [!code ++]
	public static readonly int[] IDS = new int[51]
	{
		2824, 2823, 2825, 2822, 2827, 2828, 2826, 2821, 2500, 2819, // [!code --]
		2701, 2700, 2516, 2515, 2514, 2513, 2512, 2511, 2702, 2510, // [!code --]
		2508, 2507, 2506, 2504, 2503, 2502, 2501, 2820, 2509, 2703, // [!code --]
		2505, 2705, 2704, 2818, 2817, 2815, 2814, 2813, 2812, 2811, // [!code --]
		2810, 2816, 2715, 2712, 2711, 2710, 2709, 2708, 2800, 2707, // [!code --]
		2706 // [!code --]
		2822, 2828, 2827, 2826, 2825, 2824, 2823, 2821, 2715, 2819, // [!code ++]
		2700, 2516, 2515, 2514, 2513, 2507, 2820, 2500, 2701, 2501, // [!code ++]
		2503, 2504, 2505, 2512, 2511, 2510, 2509, 2508, 2502, 2702, // [!code ++]
		2506, 2704, 2703, 2711, 2712, 2800, 2810, 2811, 2812, 2813, // [!code ++]
		2814, 2710, 2816, 2817, 2818, 2709, 2708, 2707, 2706, 2705, // [!code ++]
		2815 // [!code ++]
	};
}
public class Policy : EClass
```

## PathManager

[`public Point GetFirstStep(Point origin, Point _dest, IPathfindWalker walker, int`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/PathManager.cs#L77-L83)
```cs:line-numbers=77

	public Point _GetFirstStep(Point origin, Point dest, IPathfindWalker walker, int maxDist = 20, MoveType moveType = MoveType.Default)
	{
		if (!dest.IsValid || (dest.cell.blocked && origin.Distance(dest) <= 1)) // [!code --]
		if (!dest.IsValid || (dest.cell.blocked && !walker.IsAstralBody && origin.Distance(dest) <= 1)) // [!code ++]
		{
			return Point.Invalid;
		}
```

## SKILL

[`public class SKILL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SKILL.cs#L1-L138)
```cs:line-numbers=1
public class SKILL
{
	public const int marksman = 133; // [!code --]
	public const int armorLight = 120; // [!code ++]

	public const int tactics = 132; // [!code --]
	public const int fireproof = 50; // [!code ++]

	public const int twowield = 131; // [!code --]
	public const int throwing = 108; // [!code ++]

	public const int twohand = 130; // [!code --]
	public const int weaponCrossbow = 109; // [!code ++]

	public const int shield = 123; // [!code --]
	public const int climbing = 242; // [!code ++]
 // [!code ++]
	public const int weaponBlunt = 111; // [!code ++]

	public const int armorHeavy = 122;

	public const int weaponScythe = 110; // [!code --]
	public const int tactics = 132; // [!code ++]

	public const int weaponBlunt = 111; // [!code --]
	public const int twohand = 130; // [!code ++]

	public const int weaponCrossbow = 109; // [!code --]
	public const int music = 241; // [!code ++]

	public const int throwing = 108; // [!code --]
	public const int travel = 240; // [!code ++]

	public const int weaponDagger = 107; // [!code --]
	public const int taming = 237; // [!code ++]

	public const int eyeofmind = 134; // [!code --]
	public const int milking = 235; // [!code ++]

	public const int weaponPolearm = 106; // [!code --]
	public const int digging = 230; // [!code ++]

	public const int armorLight = 120; // [!code --]
	public const int parasite = 227; // [!code ++]

	public const int strategy = 135; // [!code --]
	public const int riding = 226; // [!code ++]

	public const int parasite = 227; // [!code --]
	public const int mining = 220; // [!code ++]

	public const int evasionPlus = 151; // [!code --]
	public const int shield = 123; // [!code ++]

	public const int stealth = 152; // [!code --]
	public const int spotting = 210; // [!code ++]

	public const int swimming = 200;

	public const int weightlifting = 207; // [!code --]
	public const int stealth = 152; // [!code ++]

	public const int spotting = 210; // [!code --]
	public const int evasionPlus = 151; // [!code ++]

	public const int mining = 220; // [!code --]
	public const int evasion = 150; // [!code ++]

	public const int lumberjack = 225; // [!code --]
	public const int strategy = 135; // [!code ++]

	public const int riding = 226; // [!code --]
	public const int eyeofmind = 134; // [!code ++]

	public const int digging = 230; // [!code --]
	public const int marksman = 133; // [!code ++]

	public const int milking = 235; // [!code --]
	public const int twowield = 131; // [!code ++]

	public const int taming = 237; // [!code --]
	public const int weightlifting = 207; // [!code ++]

	public const int travel = 240; // [!code --]
	public const int lumberjack = 225; // [!code ++]

	public const int music = 241; // [!code --]
	public const int penetration = 92; // [!code ++]

	public const int weaponGun = 105; // [!code --]
	public const int weaponPolearm = 106; // [!code ++]

	public const int evasion = 150; // [!code --]
	public const int END = 71; // [!code ++]

	public const int weaponBow = 104; // [!code --]
	public const int STR = 70; // [!code ++]

	public const int FPV = 68;

	public const int weaponAxe = 102; // [!code --]
	public const int DMG = 67; // [!code ++]

	public const int fireproof = 50; // [!code --]
	public const int HIT = 66; // [!code ++]

	public const int acidproof = 51; // [!code --]
	public const int PV = 65; // [!code ++]

	public const int PDR = 55; // [!code --]
	public const int DEX = 72; // [!code ++]

	public const int EDR = 56; // [!code --]
	public const int DV = 64; // [!code ++]

	public const int evasionPerfect = 57; // [!code --]
	public const int mana = 61; // [!code ++]

	public const int life = 60;

	public const int mana = 61; // [!code --]
	public const int evasionPerfect = 57; // [!code ++]

	public const int vigor = 62; // [!code --]
	public const int EDR = 56; // [!code ++]

	public const int DV = 64; // [!code --]
	public const int PDR = 55; // [!code ++]

	public const int PV = 65; // [!code --]
	public const int acidproof = 51; // [!code ++]

	public const int DMG = 67; // [!code --]
	public const int vigor = 62; // [!code ++]

	public const int climbing = 242; // [!code --]
	public const int PER = 73; // [!code ++]

	public const int STR = 70; // [!code --]
	public const int LER = 74; // [!code ++]

	public const int END = 71; // [!code --]
	public const int WIL = 75; // [!code ++]

	public const int weaponStaff = 103; // [!code --]
	public const int weaponGun = 105; // [!code ++]

	public const int DEX = 72; // [!code --]
	public const int weaponBow = 104; // [!code ++]

	public const int LER = 74; // [!code --]
	public const int weaponStaff = 103; // [!code ++]

	public const int WIL = 75; // [!code --]
	public const int weaponAxe = 102; // [!code ++]

	public const int MAG = 76; // [!code --]
	public const int weaponSword = 101; // [!code ++]

	public const int CHA = 77; // [!code --]
	public const int martial = 100; // [!code ++]

	public const int LUC = 78; // [!code --]
	public const int dmgDealt = 94; // [!code ++]

	public const int SPD = 79; // [!code --]
	public const int antiMagic = 93; // [!code ++]

	public const int INT = 80; // [!code --]
	public const int vopal = 91; // [!code ++]

	public const int critical = 90;

	public const int vopal = 91; // [!code --]
 // [!code --]
	public const int penetration = 92; // [!code --]
	public const int INT = 80; // [!code ++]

	public const int antiMagic = 93; // [!code --]
	public const int SPD = 79; // [!code ++]

	public const int dmgDealt = 94; // [!code --]
	public const int LUC = 78; // [!code ++]

	public const int martial = 100; // [!code --]
	public const int CHA = 77; // [!code ++]

	public const int weaponSword = 101; // [!code --]
	public const int MAG = 76; // [!code ++]

	public const int PER = 73; // [!code --]
	public const int weaponDagger = 107; // [!code ++]

	public const int fishing = 245;

	public const int HIT = 66; // [!code --]
	public const int weaponScythe = 110; // [!code ++]

	public const int carpentry = 255;

```

[`public class SKILL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SKILL.cs#L184-L189)
```cs:line-numbers=184

	public const int resAcid = 963;

	public const int resCut = 964; // [!code ++]
 // [!code ++]
	public const int gathering = 250; // [!code ++]
 // [!code ++]
	public const int resCurse = 972;

	public const int resDamage = 971;
```

[`public class SKILL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SKILL.cs#L192-L201)
```cs:line-numbers=192

	public const int resImpact = 965;

	public const int resCut = 964; // [!code --]
 // [!code --]
	public const int gathering = 250; // [!code --]
 // [!code --]
	public const int resPoison = 955;

	public const int eleMind = 914;
```

[`public class SKILL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SKILL.cs#L210-L218)
```cs:line-numbers=210

	public const int building = 288;

	public const int eleDarkness = 913; // [!code --]
	public const int cooking = 287; // [!code ++]

	public const int farming = 286; // [!code --]
	public const int eleDarkness = 913; // [!code ++]

	public const int reading = 285;

```

[`public class SKILL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SKILL.cs#L236-L289)
```cs:line-numbers=236

	public const int investing = 292;

	public const int cooking = 287; // [!code --]
	public const int farming = 286; // [!code ++]

	public const int regeneration = 300;

	public const int env = 313; // [!code --]
 // [!code --]
	public const int disarmTrap = 293; // [!code --]
	public const int eleCold = 911; // [!code ++]

	public const int eleFire = 910;

	public const int eleCold = 911; // [!code --]
 // [!code --]
	public const int hygine = 310; // [!code --]
	public const int env = 313; // [!code ++]

	public const int fun = 312;

	public const int memorization = 307; // [!code --]
	public const int disarmTrap = 293; // [!code ++]

	public const int magicDevice = 305; // [!code --]
	public const int hygine = 310; // [!code ++]

	public const int casting = 304; // [!code --]
	public const int bladder = 311; // [!code ++]

	public const int manaCapacity = 303; // [!code --]
	public const int faith = 306; // [!code ++]
 // [!code ++]
	public const int meditation = 301; // [!code ++]

	public const int controlmana = 302;

	public const int meditation = 301; // [!code --]
	public const int magicDevice = 305; // [!code ++]

	public const int faith = 306; // [!code --]
	public const int manaCapacity = 303; // [!code ++]

	public const int bladder = 311; // [!code --]
	public const int casting = 304; // [!code ++]
 // [!code ++]
	public const int memorization = 307; // [!code ++]

	public static readonly int[] IDS = new int[134]
	{
		133, 132, 131, 130, 123, 122, 110, 111, 109, 108, // [!code --]
		107, 134, 106, 120, 135, 227, 151, 152, 200, 207, // [!code --]
		210, 220, 225, 226, 230, 235, 237, 240, 241, 105, // [!code --]
		150, 104, 68, 102, 50, 51, 55, 56, 57, 60, // [!code --]
		61, 62, 64, 65, 67, 242, 70, 71, 103, 72, // [!code --]
		74, 75, 76, 77, 78, 79, 80, 90, 91, 92, // [!code --]
		93, 94, 100, 101, 73, 245, 66, 255, 916, 917, // [!code --]
		120, 50, 108, 109, 242, 111, 122, 132, 130, 241, // [!code ++]
		240, 237, 235, 230, 227, 226, 220, 123, 210, 200, // [!code ++]
		152, 151, 150, 135, 134, 133, 131, 207, 225, 92, // [!code ++]
		106, 71, 70, 68, 67, 66, 65, 72, 64, 61, // [!code ++]
		60, 57, 56, 55, 51, 62, 73, 74, 75, 105, // [!code ++]
		104, 103, 102, 101, 100, 94, 93, 91, 90, 80, // [!code ++]
		79, 78, 77, 76, 107, 245, 110, 255, 916, 917, // [!code ++]
		918, 919, 921, 922, 923, 924, 925, 926, 950, 951,
		952, 953, 915, 954, 956, 957, 958, 959, 960, 961,
		962, 963, 972, 971, 970, 965, 964, 250, 955, 914, // [!code --]
		920, 912, 290, 289, 288, 913, 286, 285, 291, 281, // [!code --]
		261, 260, 259, 258, 257, 256, 280, 292, 287, 300, // [!code --]
		313, 293, 910, 911, 310, 312, 307, 305, 304, 303, // [!code --]
		302, 301, 306, 311 // [!code --]
		962, 963, 964, 250, 972, 971, 970, 965, 955, 914, // [!code ++]
		920, 912, 290, 289, 288, 287, 913, 285, 291, 281, // [!code ++]
		261, 260, 259, 258, 257, 256, 280, 292, 286, 300, // [!code ++]
		911, 910, 313, 312, 293, 310, 311, 306, 301, 302, // [!code ++]
		305, 303, 304, 307 // [!code ++]
	};
}
public class Skill : Element
```

## SLOT

[`public class SLOT`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SLOT.cs#L6-L18)
```cs:line-numbers=6

	public const int hand = 35;

	public const int foot = 39; // [!code --]
 // [!code --]
	public const int finger = 36;

	public const int waist = 37;

	public const int leg = 38; // [!code --]
	public const int foot = 39; // [!code ++]

	public const int lightsource = 45;

```

[`public class SLOT`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SLOT.cs#L26-L31)
```cs:line-numbers=26

	public const int torso = 32;

	public const int leg = 38; // [!code ++]
 // [!code ++]
	public const int neck = 31;

	public const int ammo = 42;
```

[`public class SLOT`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SLOT.cs#L34-L40)
```cs:line-numbers=34

	public static readonly int[] IDS = new int[16]
	{
		33, 34, 35, 39, 36, 37, 38, 45, 40, 44, // [!code --]
		41, 43, 32, 31, 42, 30 // [!code --]
		33, 34, 35, 36, 37, 39, 45, 40, 44, 41, // [!code ++]
		43, 32, 38, 31, 42, 30 // [!code ++]
	};
}
```

## SPELL

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L1-L6)
```cs:line-numbers=1
public class SPELL
{
	public const int ball_Impact = 50115; // [!code --]
	public const int hand_Impact = 50415; // [!code ++]

	public const int flare_Sound = 51207;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L10-L17)
```cs:line-numbers=10

	public const int puddle_Sound = 50907;

	public const int sword_Void = 51016; // [!code --]
 // [!code --]
	public const int weapon_Sound = 50807;

	public const int miasma_Sound = 50707;
```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L24-L36)
```cs:line-numbers=24

	public const int bolt_Sound = 50307;

	public const int arrow_Void = 50516; // [!code --]
	public const int hand_Void = 50416; // [!code ++]

	public const int ball_Sound = 50107;

	public const int flare_Nether = 51206; // [!code ++]
 // [!code ++]
	public const int ball_Nerve = 50108;

	public const int hand_Void = 50416; // [!code --]
	public const int bolt_Void = 50316; // [!code ++]

	public const int bolt_Nerve = 50308;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L54-L74)
```cs:line-numbers=54

	public const int ball_Holy = 50109;

	public const int bolt_Void = 50316; // [!code --]
 // [!code --]
	public const int bolt_Holy = 50309;

	public const int hand_Holy = 50409;

	public const int arrow_Holy = 50509;

	public const int flare_Nether = 51206; // [!code --]
	public const int funnel_Holy = 50609; // [!code ++]

	public const int bit_Nether = 51106;

	public const int sword_Nether = 51006;

	public const int funnel_Void = 50616; // [!code --]
	public const int puddle_Nether = 50906; // [!code ++]
 // [!code ++]
	public const int arrow_Void = 50516; // [!code ++]

	public const int hand_Poison = 50405;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L80-L86)
```cs:line-numbers=80

	public const int flare_Mind = 51204;

	public const int bolt_Mind = 50304; // [!code --]
	public const int sword_Void = 51016; // [!code ++]

	public const int arrow_Poison = 50505;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L100-L112)
```cs:line-numbers=100

	public const int sword_Mind = 51004;

	public const int funnel_Holy = 50609; // [!code --]
	public const int miasma_Holy = 50709; // [!code ++]

	public const int funnel_Poison = 50605;

	public const int weapon_Poison = 50805;

	public const int puddle_Nether = 50906; // [!code --]
	public const int funnel_Void = 50616; // [!code ++]

	public const int weapon_Nether = 50806;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L136-L154)
```cs:line-numbers=136

	public const int miasma_Void = 50716;

	public const int miasma_Holy = 50709; // [!code --]
	public const int bolt_Impact = 50315; // [!code ++]

	public const int weapon_Holy = 50809;

	public const int puddle_Holy = 50909; // [!code --]
 // [!code --]
	public const int funnel_Ether = 50612; // [!code --]
	public const int sword_Holy = 51009; // [!code ++]

	public const int miasma_Ether = 50712;

	public const int funnel_Impact = 50615; // [!code --]
	public const int weapon_Ether = 50812; // [!code ++]

	public const int puddle_Ether = 50912; // [!code --]
	public const int bolt_Mind = 50304; // [!code ++]

	public const int sword_Ether = 51012;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L158-L164)
```cs:line-numbers=158

	public const int ball_Acid = 50113;

	public const int arrow_Impact = 50515; // [!code --]
	public const int funnel_Impact = 50615; // [!code ++]

	public const int bolt_Acid = 50313;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L176-L181)
```cs:line-numbers=176

	public const int sword_Acid = 51013;

	public const int bit_Acid = 51113; // [!code ++]
 // [!code ++]
	public const int ball_Impact = 50115; // [!code ++]
 // [!code ++]
	public const int flare_Cut = 51214;

	public const int bit_Cut = 51114;
```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L186-L229)
```cs:line-numbers=186

	public const int weapon_Cut = 50814;

	public const int miasma_Cut = 50714; // [!code --]
	public const int funnel_Ether = 50612; // [!code ++]

	public const int arrow_Ether = 50512; // [!code --]
	public const int miasma_Cut = 50714; // [!code ++]

	public const int funnel_Cut = 50614; // [!code --]
	public const int arrow_Cut = 50514; // [!code ++]

	public const int hand_Cut = 50414;

	public const int bolt_Cut = 50314;

	public const int hand_Impact = 50415; // [!code --]
	public const int arrow_Impact = 50515; // [!code ++]

	public const int ball_Cut = 50114;

	public const int flare_Acid = 51213;

	public const int bit_Acid = 51113; // [!code --]
	public const int funnel_Cut = 50614; // [!code ++]

	public const int arrow_Cut = 50514; // [!code --]
	public const int arrow_Ether = 50512; // [!code ++]

	public const int hand_Ether = 50412;

	public const int bolt_Ether = 50312;

	public const int miasma_Impact = 50715; // [!code --]
 // [!code --]
	public const int weapon_Chaos = 50810;

	public const int miasma_Chaos = 50710;

	public const int puddle_Impact = 50915; // [!code ++]
 // [!code ++]
	public const int sword_Impact = 51015;

	public const int bit_Impact = 51115;

	public const int flare_Impact = 51215;

	public const int ball_Void = 50116; // [!code --]
 // [!code --]
	public const int puddle_Chaos = 50910;

	public const int funnel_Chaos = 50610;
```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L232-L252)
```cs:line-numbers=232

	public const int bolt_Chaos = 50310;

	public const int ball_Void = 50116; // [!code ++]
 // [!code ++]
	public const int ball_Chaos = 50110;

	public const int flare_Holy = 51209;

	public const int bit_Holy = 51109;

	public const int sword_Holy = 51009; // [!code --]
 // [!code --]
	public const int arrow_Chaos = 50510;

	public const int bolt_Impact = 50315; // [!code --]
	public const int puddle_Holy = 50909; // [!code ++]

	public const int puddle_Impact = 50915; // [!code --]
	public const int sword_Chaos = 51010; // [!code ++]

	public const int bit_Chaos = 51110; // [!code --]
	public const int flare_Chaos = 51210; // [!code ++]
 // [!code ++]
	public const int miasma_Impact = 50715; // [!code ++]

	public const int ball_Ether = 50112;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L258-L268)
```cs:line-numbers=258

	public const int puddle_Magic = 50911;

	public const int weapon_Magic = 50811; // [!code --]
	public const int bit_Chaos = 51110; // [!code ++]

	public const int sword_Chaos = 51010; // [!code --]
	public const int weapon_Magic = 50811; // [!code ++]

	public const int miasma_Magic = 50711; // [!code --]
	public const int funnel_Magic = 50611; // [!code ++]

	public const int arrow_Magic = 50511;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L274-L289)
```cs:line-numbers=274

	public const int ball_Magic = 50111;

	public const int flare_Chaos = 51210; // [!code --]
 // [!code --]
	public const int funnel_Magic = 50611; // [!code --]
	public const int miasma_Magic = 50711; // [!code ++]

	public const int weapon_Ether = 50812; // [!code --]
	public const int puddle_Ether = 50912; // [!code ++]

	public const int SpIncognito = 8780; // [!code --]
	public const int bolt_Cold = 50301; // [!code ++]

	public const int flare_Darkness = 51203;

	public const int SpHero = 8504; // [!code ++]
 // [!code ++]
	public const int SpWisdom = 8503;

	public const int SpHolyShield = 8502;
```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L312-L329)
```cs:line-numbers=312

	public const int SpHealEris = 8404;

	public const int SpHeal = 8403; // [!code --]
 // [!code --]
	public const int SpHero = 8504; // [!code --]
 // [!code --]
	public const int SpResEle = 8506;

	public const int SpBreath = 8507;

	public const int SpSpeedUp = 8510;

	public const int SpRebirth = 8550; // [!code ++]
 // [!code ++]
	public const int SpTransmuteBroom = 8790;

	public const int SpIncognito = 8780; // [!code ++]
 // [!code ++]
	public const int SpSeeInvisible = 8776;

	public const int SpInvisibility = 8775;
```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L334-L344)
```cs:line-numbers=334

	public const int SpFear = 8720;

	public const int SpSpeedDown = 8710; // [!code --]
	public const int SpHeal = 8403; // [!code ++]

	public const int SpHealCritical = 8402; // [!code --]
	public const int SpSpeedDown = 8710; // [!code ++]

	public const int SpGravity = 8708; // [!code --]
	public const int SpBerserk = 8707; // [!code ++]

	public const int SpBane = 8706;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L352-L366)
```cs:line-numbers=352

	public const int SpBrightnessOfLife = 8555;

	public const int SpRebirth = 8550; // [!code --]
 // [!code --]
	public const int SpBerserk = 8707; // [!code --]
	public const int SpGravity = 8708; // [!code ++]

	public const int SpTransmutePutit = 8791;

	public const int SpHealHeavy = 8401; // [!code --]
	public const int SpHealCritical = 8402; // [!code ++]

	public const int SpWish = 8390; // [!code --]
	public const int SpHealLight = 8400; // [!code ++]
 // [!code ++]
	public const int SpTelekinesis = 8215; // [!code ++]

	public const int SpGate = 8202;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L390-L405)
```cs:line-numbers=390

	public const int ball_ = 7001;

	public const int bit_Void = 51116; // [!code --]
 // [!code --]
	public const int SpTelekinesis = 8215; // [!code --]
 // [!code --]
	public const int SpReturn = 8220;

	public const int SpEvac = 8221;

	public const int SpIdentify = 8230;

	public const int SpIdentifyG = 8232; // [!code ++]
 // [!code ++]
	public const int SpWish = 8390; // [!code ++]
 // [!code ++]
	public const int SpMutation = 8380;

	public const int SpLevitate = 8300;
```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L412-L422)
```cs:line-numbers=412

	public const int SpChangeMaterialLesser = 8284;

	public const int SpFaith = 8281; // [!code --]
	public const int SpHealHeavy = 8401; // [!code ++]

	public const int SpHealLight = 8400; // [!code --]
	public const int SpFaith = 8281; // [!code ++]

	public const int SpLighten = 8280; // [!code --]
	public const int SpMagicMap = 8260; // [!code ++]

	public const int SpEnchantArmorGreat = 8256;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L430-L438)
```cs:line-numbers=430

	public const int SpUncurse = 8240;

	public const int SpIdentifyG = 8232; // [!code --]
 // [!code --]
	public const int SpMagicMap = 8260; // [!code --]
	public const int SpLighten = 8280; // [!code ++]

	public const int ball_Mind = 50104;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L460-L467)
```cs:line-numbers=460

	public const int hand_Cold = 50401;

	public const int bolt_Cold = 50301; // [!code --]
 // [!code --]
	public const int ball_Cold = 50101;

	public const int flare_Fire = 51200;
```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L470-L475)
```cs:line-numbers=470

	public const int sword_Fire = 51000;

	public const int puddle_Fire = 50900; // [!code ++]
 // [!code ++]
	public const int bolt_Lightning = 50302;

	public const int hand_Lightning = 50402;
```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L492-L498)
```cs:line-numbers=492

	public const int arrow_Darkness = 50503;

	public const int puddle_Fire = 50900; // [!code --]
	public const int weapon_Fire = 50800; // [!code ++]

	public const int hand_Darkness = 50403;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L514-L522)
```cs:line-numbers=514

	public const int SpDarkness = 8800;

	public const int weapon_Fire = 50800; // [!code --]
	public const int miasma_Fire = 50700; // [!code ++]

	public const int funnel_Fire = 50600; // [!code --]
	public const int arrow_Fire = 50500; // [!code ++]

	public const int SpSummonMachine = 9053;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L556-L567)
```cs:line-numbers=556

	public const int SpMeteor = 9150;

	public const int arrow_Fire = 50500; // [!code --]
 // [!code --]
	public const int hand_Fire = 50400;

	public const int bolt_Fire = 50300;

	public const int bit_Void = 51116; // [!code ++]
 // [!code ++]
	public const int ball_Fire = 50100;

	public const int FieldFeast = 10001;
```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L570-L576)
```cs:line-numbers=570

	public const int SpDrawBacker = 9503;

	public const int miasma_Fire = 50700; // [!code --]
	public const int funnel_Fire = 50600; // [!code ++]

	public const int SpDrawMetal = 9502;

```

[`public class SPELL`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/SPELL.cs#L594-L628)
```cs:line-numbers=594

	public static readonly int[] IDS = new int[296]
	{
		50115, 51207, 51107, 51007, 50907, 51016, 50807, 50707, 50607, 50507, // [!code --]
		50407, 50307, 50516, 50107, 50108, 50416, 50308, 50408, 50508, 50608, // [!code --]
		50708, 50808, 50908, 51008, 51108, 51208, 50109, 50316, 50309, 50409, // [!code --]
		50509, 51206, 51106, 51006, 50616, 50405, 50305, 50916, 50105, 51204, // [!code --]
		50304, 50505, 51104, 50904, 50804, 50704, 50604, 50504, 50404, 51004, // [!code --]
		50609, 50605, 50805, 50906, 50806, 50706, 50606, 50506, 50406, 50705, // [!code --]
		50306, 50106, 51205, 51105, 50816, 51005, 50905, 50716, 50709, 50809, // [!code --]
		50909, 50612, 50712, 50615, 50912, 51012, 51112, 51212, 50113, 50515, // [!code --]
		50313, 50413, 50513, 50613, 50713, 50813, 50913, 51013, 51214, 51114, // [!code --]
		51014, 50914, 50814, 50714, 50512, 50614, 50414, 50314, 50415, 50114, // [!code --]
		51213, 51113, 50514, 50412, 50312, 50715, 50810, 50710, 51015, 51115, // [!code --]
		51215, 50116, 50910, 50610, 50410, 50310, 50110, 51209, 51109, 51009, // [!code --]
		50510, 50315, 50915, 51110, 50112, 51211, 51111, 51011, 50911, 50811, // [!code --]
		51010, 50711, 50511, 50411, 50311, 50815, 50111, 51210, 50611, 50812, // [!code --]
		8780, 51203, 8503, 8502, 8501, 8500, 8491, 8490, 8480, 8471, // [!code --]
		8470, 8450, 8430, 8406, 8405, 8404, 8403, 8504, 8506, 8507, // [!code --]
		8510, 8790, 8776, 8775, 8770, 8721, 8720, 8710, 8402, 8708, // [!code --]
		8706, 8705, 8704, 8702, 8700, 8555, 8550, 8707, 8791, 8401, // [!code --]
		8390, 8202, 8201, 8200, 7800, 7010, 7009, 7008, 7007, 7006, // [!code --]
		7005, 7004, 7003, 7002, 7001, 51116, 8215, 8220, 8221, 8230, // [!code --]
		8380, 8300, 8288, 8286, 8285, 8284, 8281, 8400, 8280, 8256, // [!code --]
		8255, 8251, 8250, 8241, 8240, 8232, 8260, 50104, 8792, 8801, // [!code --]
		50415, 51207, 51107, 51007, 50907, 50807, 50707, 50607, 50507, 50407, // [!code ++]
		50307, 50416, 50107, 51206, 50108, 50316, 50308, 50408, 50508, 50608, // [!code ++]
		50708, 50808, 50908, 51008, 51108, 51208, 50109, 50309, 50409, 50509, // [!code ++]
		50609, 51106, 51006, 50906, 50516, 50405, 50305, 50916, 50105, 51204, // [!code ++]
		51016, 50505, 51104, 50904, 50804, 50704, 50604, 50504, 50404, 51004, // [!code ++]
		50709, 50605, 50805, 50616, 50806, 50706, 50606, 50506, 50406, 50705, // [!code ++]
		50306, 50106, 51205, 51105, 50816, 51005, 50905, 50716, 50315, 50809, // [!code ++]
		51009, 50712, 50812, 50304, 51012, 51112, 51212, 50113, 50615, 50313, // [!code ++]
		50413, 50513, 50613, 50713, 50813, 50913, 51013, 51113, 50115, 51214, // [!code ++]
		51114, 51014, 50914, 50814, 50612, 50714, 50514, 50414, 50314, 50515, // [!code ++]
		50114, 51213, 50614, 50512, 50412, 50312, 50810, 50710, 50915, 51015, // [!code ++]
		51115, 51215, 50910, 50610, 50410, 50310, 50116, 50110, 51209, 51109, // [!code ++]
		50510, 50909, 51010, 51210, 50715, 50112, 51211, 51111, 51011, 50911, // [!code ++]
		51110, 50811, 50611, 50511, 50411, 50311, 50815, 50111, 50711, 50912, // [!code ++]
		50301, 51203, 8504, 8503, 8502, 8501, 8500, 8491, 8490, 8480, // [!code ++]
		8471, 8470, 8450, 8430, 8406, 8405, 8404, 8506, 8507, 8510, // [!code ++]
		8550, 8790, 8780, 8776, 8775, 8770, 8721, 8720, 8403, 8710, // [!code ++]
		8707, 8706, 8705, 8704, 8702, 8700, 8555, 8708, 8791, 8402, // [!code ++]
		8400, 8215, 8202, 8201, 8200, 7800, 7010, 7009, 7008, 7007, // [!code ++]
		7006, 7005, 7004, 7003, 7002, 7001, 8220, 8221, 8230, 8232, // [!code ++]
		8390, 8380, 8300, 8288, 8286, 8285, 8284, 8401, 8281, 8260, // [!code ++]
		8256, 8255, 8251, 8250, 8241, 8240, 8280, 50104, 8792, 8801, // [!code ++]
		50102, 51201, 51101, 51001, 50901, 50801, 50701, 50601, 50501, 50401,
		50301, 50101, 51200, 51100, 51000, 50302, 50402, 50502, 50602, 51103, // [!code --]
		51003, 50903, 50803, 50703, 50603, 50503, 50900, 50403, 50103, 51202, // [!code --]
		51102, 51002, 50902, 50802, 50702, 50303, 8800, 50800, 50600, 9053, // [!code --]
		50101, 51200, 51100, 51000, 50900, 50302, 50402, 50502, 50602, 51103, // [!code ++]
		51003, 50903, 50803, 50703, 50603, 50503, 50800, 50403, 50103, 51202, // [!code ++]
		51102, 51002, 50902, 50802, 50702, 50303, 8800, 50700, 50500, 9053, // [!code ++]
		9052, 9051, 9050, 9010, 9009, 9008, 9007, 9006, 9005, 9004,
		9003, 9002, 9001, 9000, 9054, 9055, 9056, 9150, 50500, 50400, // [!code --]
		50300, 50100, 10001, 10000, 9503, 50700, 9502, 9500, 9210, 9200, // [!code --]
		9003, 9002, 9001, 9000, 9054, 9055, 9056, 9150, 50400, 50300, // [!code ++]
		51116, 50100, 10001, 10000, 9503, 50600, 9502, 9500, 9210, 9200, // [!code ++]
		9160, 9156, 9155, 9151, 9501, 51216
	};
}
```

## TraitScrollStatic

[`public override void OnRead(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/a50c9cf4aec9dd1b622cf8bb9d7eac211f463cab/Elin/TraitScrollStatic.cs#L57-L62)
```cs:line-numbers=57
		}
		return;
	}
	if (idEffect == EffectId.Exterminate && !EClass._zone.IsPCFactionOrTent) // [!code ++]
	{ // [!code ++]
		Msg.Say("skillbook_invalidZone"); // [!code ++]
		return; // [!code ++]
	} // [!code ++]
	if (c.IsPC && (idEffect == EffectId.Identify || idEffect == EffectId.GreaterIdentify))
	{
		foreach (Thing item in EClass.pc.things.List((Thing t) => t.id == owner.id, onlyAccessible: true))
```
