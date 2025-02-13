---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 22 files modified. 3 new files created.
version: EA 23.92 Patch 3
changes: AI_Idle/AI_PlayMusic/AM_Adv/ActPlan/ActRestrain/CTAG/Card/ContentHomeLog/Core/FactionBranch/GameIO/GameIndex/LayerLoadGame/LayerUploader/Map/+MapExportSetting/MsgLog/Player/TaskDump/Thing/+TraitCage/+TraitCageBreeding/TraitShackle/Zone/Zone_User
---

# EA 23.92 Patch 3

February 13, 2025

22 files modified. 3 new files created.

## Important Changes

Possible breaking changes. Click the filename to view the chunk.
### [GameIO (1)](#gameio)
```cs:no-line-numbers
public static List<GameIndex> GetGameList(string path, bool sortByName = false) // [!code --]
public static List<GameIndex> GetGameList(string path, bool sortByName = false, bool includeEmptyFolder = false) // [!code ++]
```
## AI_Idle

[`@@ -186,10 +186,14 @@ public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/AI_Idle.cs#L186-L195)
```cs:line-numbers=186
		{
			if (owner.IsRestrainedResident && owner.stamina.value > owner.stamina.max / 2)
			{
				owner.SetAI(new AI_Torture // [!code --]
				TraitShackle traitShackle = owner.pos.FindThing<TraitShackle>(); // [!code ++]
				if (traitShackle != null && traitShackle.AllowTraining) // [!code ++]
				{
					shackle = owner.pos.FindThing<TraitShackle>() // [!code --]
				}); // [!code --]
					owner.SetAI(new AI_Torture // [!code ++]
					{ // [!code ++]
						shackle = traitShackle // [!code ++]
					}); // [!code ++]
				} // [!code ++]
				yield return Restart();
			}
			if (EClass.rnd(20) == 0)
```

[`@@ -586,11 +590,15 @@ public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/AI_Idle.cs#L586-L596)
```cs:line-numbers=586
	}
	if (owner.IsRestrainedResident && owner.stamina.value > owner.stamina.max / 2)
	{
		owner.SetAI(new AI_Torture // [!code --]
		TraitShackle traitShackle2 = owner.pos.FindThing<TraitShackle>(); // [!code ++]
		if (traitShackle2 != null && traitShackle2.AllowTraining) // [!code ++]
		{
			shackle = owner.pos.FindThing<TraitShackle>() // [!code --]
		}); // [!code --]
		yield return Restart(); // [!code --]
			owner.SetAI(new AI_Torture // [!code ++]
			{ // [!code ++]
				shackle = traitShackle2 // [!code ++]
			}); // [!code ++]
			yield return Restart(); // [!code ++]
		} // [!code ++]
	}
	if (!owner.IsPCFactionOrMinion && EClass.rnd(owner.isSynced ? 50 : 2000) == 0 && owner.hostility == Hostility.Neutral && EClass.pc.party.HasElement(1563) && !owner.race.tag.Contains("animal") && EClass._zone.IsTown && !EClass._zone.IsPCFaction && !owner.HasCondition<ConIncognito>())
	{
```

## AI_PlayMusic

[`@@ -382,7 +382,7 @@ void LevelSong(int a)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/AI_PlayMusic.cs#L382-L388)
```cs:line-numbers=382

	public void Evaluate(bool success)
	{
		if (!owner.IsPC) // [!code --]
		if (owner == null || !owner.IsPC) // [!code ++]
		{
			return;
		}
```

## AM_Adv

[`@@ -155,9 +155,9 @@ public bool IsPressing()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/AM_Adv.cs#L155-L163)
```cs:line-numbers=155

	private float gearAngle;

	protected bool updatePlans; // [!code --]
	public bool updatePlans; // [!code ++]

	protected bool isMoving; // [!code --]
	public bool isMoving; // [!code ++]

	private Vector3 lastCamPos;

```

## ActPlan

[`@@ -528,12 +528,16 @@ public void _Update(PointTarget target)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/ActPlan.cs#L528-L539)
```cs:line-numbers=528
					}
					if (c2.host != EClass.pc)
					{
						TraitShackle traitShackle = c2.pos.FindThing<TraitShackle>(); // [!code ++]
						if (c2.IsRestrainedResident)
						{
							TrySetAct(new AI_PracticeDummy // [!code --]
							if (traitShackle != null && traitShackle.AllowTraining) // [!code ++]
							{
								target = c2 // [!code --]
							}); // [!code --]
								TrySetAct(new AI_PracticeDummy // [!code ++]
								{ // [!code ++]
									target = c2 // [!code ++]
								}); // [!code ++]
							} // [!code ++]
						}
						else if ((c2.IsHostile() || altAction || c2.isRestrained) && c2.IsAliveInCurrentZone)
						{
```

[`@@ -834,6 +838,7 @@ void func()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/ActPlan.cs#L834-L839)
```cs:line-numbers=834
					{
						_ = cc.held;
						cc.PickHeld(msg: true);
						ActionMode.AdvOrRegion.updatePlans = true; // [!code ++]
						return false;
					}, cc.held, CursorSystem.Inventory, 1, isHostileAct: false, localAct: false);
				}
```

## ActRestrain

[`@@ -33,14 +33,17 @@ public override bool Perform()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/ActRestrain.cs#L33-L46)
```cs:line-numbers=33
		return true;
	}
	SE.Change();
	if (!shackle.owner.IsInstalled) // [!code ++]
	{ // [!code ++]
		EClass._zone.AddCard(shackle.owner, Act.TP); // [!code ++]
		shackle.owner.SetPlaceState(PlaceState.installed); // [!code ++]
	} // [!code ++]
	shackle.Restrain(Act.TC, msg: true);
	EClass._zone.AddCard(shackle.owner, Act.TP); // [!code --]
	shackle.owner.SetPlaceState(PlaceState.installed); // [!code --]
	if (!Act.TC.IsPCFaction)
	{
		EClass.player.ModKarma(-1);
	}
	if (Act.TC.IsPCFaction && EClass._zone.IsPCFaction) // [!code --]
	if (Act.TC.IsPCFaction && EClass._zone.IsPCFaction && shackle.AllowTraining) // [!code ++]
	{
		Act.TC.Chara?.SetAI(new AI_Torture
		{
```

## CTAG

[`@@ -33,5 +33,6 @@ public enum CTAG`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/CTAG.cs#L33-L37)
```cs:line-numbers=33
	noWish,
	dish_bonus,
	dish_fail,
	random_color // [!code --]
	random_color, // [!code ++]
	noRandomEnc // [!code ++]
}
```

## Card

[`@@ -3049,7 +3049,18 @@ public void RemoveThing(Thing thing)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Card.cs#L3049-L3055)
```cs:line-numbers=3049
{
	if ((GetRootCard() as Chara)?.held == thing)
	{
		(GetRootCard() as Chara).held = null; // [!code --]
		Chara obj = GetRootCard() as Chara; // [!code ++]
		obj.held = null; // [!code ++]
		if (obj.IsPC) // [!code ++]
		{ // [!code ++]
			WidgetCurrentTool instance = WidgetCurrentTool.Instance; // [!code ++]
			if ((bool)instance && instance.selected != -1 && instance.selectedButton.card != null && instance.selectedButton.card == thing) // [!code ++]
			{ // [!code ++]
				instance.selectedButton.card = null; // [!code ++]
			} // [!code ++]
			EClass.player.RefreshCurrentHotItem(); // [!code ++]
			ActionMode.AdvOrRegion.updatePlans = true; // [!code ++]
		} // [!code ++]
		RecalculateFOV();
	}
	dirtyWeight = true;
```

[`@@ -4581,7 +4592,7 @@ public void SpawnLoot(Card origin)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Card.cs#L4581-L4587)
```cs:line-numbers=4581
	}
	bool flag2 = Chara.race.corpse[1].ToInt() > EClass.rnd(1500) || (Chara.IsPowerful && !IsPCFaction) || EClass.debug.godFood;
	int num = 1;
	if (Chara.race.IsAnimal && EClass.rnd(EClass._zone.IsPCFaction ? 3 : 5) == 0) // [!code --]
	if (!IsMinion && Chara.race.IsAnimal && EClass.rnd(EClass._zone.IsPCFaction ? 3 : 5) == 0) // [!code ++]
	{
		flag2 = true;
	}
```

[`@@ -4590,7 +4601,7 @@ public void SpawnLoot(Card origin)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Card.cs#L4590-L4596)
```cs:line-numbers=4590
		flag2 = true;
		num = EClass.rndHalf(4 + 10 * (50 + Mathf.Max(0, (int)MathF.Sqrt(EClass.pc.Evalue(290) * 10))) / 100);
	}
	else if (origin != null && origin.HasElement(290)) // [!code --]
	else if (origin != null && origin.HasElement(290) && !IsMinion) // [!code ++]
	{
		if (!flag2 && Chara.race.corpse[1].ToInt() > EClass.rnd(150000 / (100 + (int)Mathf.Sqrt(origin.Evalue(290)) * 5)))
		{
```

[`@@ -4809,7 +4820,7 @@ bool chance(int i)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Card.cs#L4809-L4815)
```cs:line-numbers=4809
		}
		if (IsMinion)
		{
			i *= 2; // [!code --]
			i *= 5; // [!code ++]
		}
		if (EClass.rnd(i) == 0)
		{
```

## ContentHomeLog

[`@@ -24,7 +24,7 @@ public void RefreshLog()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/ContentHomeLog.cs#L24-L30)
```cs:line-numbers=24
			{
				b.text1.SetColor(a.col.ToEnum<FontColor>());
			}
			b.text2.text = a.date.month + "/" + a.date.day + " " + a.date.hour + ":" + a.date.min; // [!code --]
			b.text2.text = a.date.month + "/" + a.date.day + " " + ((a.date.hour < 10) ? "0" : "") + a.date.hour + ":" + ((a.date.min < 10) ? "0" : "") + a.date.min; // [!code ++]
		}
	};
	uIList.Clear();
```

## Core

[`@@ -406,6 +406,8 @@ private void LateUpdate()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Core.cs#L406-L411)
```cs:line-numbers=406

	public void OnApplicationFocus(bool focus)
	{
		Resources.UnloadUnusedAssets(); // [!code ++]
		GC.Collect(); // [!code ++]
		if (config == null)
		{
			return;
```

## FactionBranch

[`@@ -1199,6 +1199,17 @@ public void OnClaimZone()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/FactionBranch.cs#L1199-L1204)
```cs:line-numbers=1199

	public void OnUnclaimZone()
	{
		List<Element> list = owner.ListLandFeats(); // [!code ++]
		elements.SetBase(list[1].id, 0); // [!code ++]
		elements.SetBase(list[2].id, 0); // [!code ++]
		if (lv < 5) // [!code ++]
		{ // [!code ++]
			return; // [!code ++]
		} // [!code ++]
		foreach (Element item in list.Where((Element a) => a.HasTag("network")).ToList()) // [!code ++]
		{ // [!code ++]
			EClass.pc.faction.elements.ModBase(item.id, -item.Value); // [!code ++]
		} // [!code ++]
	}

	public void ValidateUpgradePolicies()
```

## GameIO

[`@@ -283,7 +283,7 @@ public static void DeleteGame(string id, bool cloud, bool deleteBackup = true)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/GameIO.cs#L283-L289)
```cs:line-numbers=283
		}
	}

	public static List<GameIndex> GetGameList(string path, bool sortByName = false) // [!code --]
	public static List<GameIndex> GetGameList(string path, bool sortByName = false, bool includeEmptyFolder = false) // [!code ++]
	{
		List<GameIndex> list = new List<GameIndex>();
		DirectoryInfo directoryInfo = new DirectoryInfo(path);
```

[`@@ -303,9 +303,22 @@ public static List<GameIndex> GetGameList(string path, bool sortByName = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/GameIO.cs#L303-L311)
```cs:line-numbers=303
				gameIndex.path = directoryInfo2.FullName;
				list.Add(gameIndex);
			}
			catch (Exception) // [!code --]
			catch (Exception message) // [!code ++]
			{
				Debug.Log(message); // [!code ++]
				goto IL_0097; // [!code ++]
			}
			continue; // [!code ++]
		} // [!code ++]
		goto IL_0097; // [!code ++]
		IL_0097: // [!code ++]
		if (includeEmptyFolder && Directory.Exists(CorePath.PathBackup + directoryInfo2.Name)) // [!code ++]
		{ // [!code ++]
			GameIndex gameIndex2 = new GameIndex(); // [!code ++]
			gameIndex2.id = directoryInfo2.Name; // [!code ++]
			gameIndex2.path = directoryInfo2.FullName; // [!code ++]
			gameIndex2.date = (gameIndex2.real = new Date()); // [!code ++]
			list.Add(gameIndex2); // [!code ++]
		}
	}
	if (sortByName)
```

## GameIndex

[`@@ -55,6 +55,18 @@ public class GameIndex : EClass`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/GameIndex.cs#L55-L60)
```cs:line-numbers=55

	public string FormTitle => id + ": " + zoneName + "(" + factionName + ") " + RealDate;

	public bool IsCorrupted // [!code ++]
	{ // [!code ++]
		get // [!code ++]
		{ // [!code ++]
			if (zoneName == null) // [!code ++]
			{ // [!code ++]
				return pcName == null; // [!code ++]
			} // [!code ++]
			return false; // [!code ++]
		} // [!code ++]
	} // [!code ++]
 // [!code ++]
	public GameIndex Create(Game game)
	{
		if (game != null)
```

## LayerLoadGame

[`@@ -12,6 +12,8 @@ public class LayerLoadGame : ELayer`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/LayerLoadGame.cs#L12-L17)
```cs:line-numbers=12

	public GameObject goNoInfo;

	public GameObject goInfo2; // [!code ++]
 // [!code ++]
	public GameObject goCloudWarn;

	public UINote note;
```

[`@@ -108,7 +110,7 @@ public void RefreshList()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/LayerLoadGame.cs#L108-L114)
```cs:line-numbers=108
		windows[0].SetCaption("saveList".lang() + (cloud ? (" " + "isCloud".lang()) : ""));
	}
	pathRoot = (backup ? pathBackup : (cloud ? CorePath.RootSaveCloud : CorePath.RootSave));
	worlds = GameIO.GetGameList(pathRoot, backup); // [!code --]
	worlds = GameIO.GetGameList(pathRoot, backup, !backup && !cloud); // [!code ++]
	goCloudWarn.SetActive(cloud && !backup);
	goInfo.SetActive(value: false);
	goNoInfo.SetActive(value: true);
```

[`@@ -151,8 +153,14 @@ public void RefreshInfo(GameIndex i)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/LayerLoadGame.cs#L151-L158)
```cs:line-numbers=151
	note.AddTopic("date_real".lang(), i.RealDate);
	note.AddTopic("date_game".lang(), i.GameData);
	note.AddTopic("ID", i.id);
	bool flag = ELayer.core.version.IsSaveCompatible(i.version); // [!code --]
	if (!flag) // [!code --]
	bool flag = ELayer.core.version.IsSaveCompatible(i.version) && !i.IsCorrupted; // [!code ++]
	goInfo2.SetActive(flag); // [!code ++]
	if (i.IsCorrupted) // [!code ++]
	{ // [!code ++]
		note.Space(); // [!code ++]
		note.AddText("corrupted_folder".lang(), FontColor.Bad); // [!code ++]
	} // [!code ++]
	else if (!flag) // [!code ++]
	{
		note.Space();
		note.AddText("incompatible".lang(), FontColor.Bad);
```

## LayerUploader

[`@@ -19,6 +19,8 @@ public class LayerUploader : ELayer`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/LayerUploader.cs#L19-L24)
```cs:line-numbers=19

	public InputField inputPassword;

	public InputField inputWelcome; // [!code ++]
 // [!code ++]
	public IniData ini;

	public UIText textInvalidId;
```

[`@@ -31,6 +33,8 @@ public class LayerUploader : ELayer`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/LayerUploader.cs#L31-L36)
```cs:line-numbers=31

	public UIButton buttonSave;

	public UIButton toggleClearLocalCharas; // [!code ++]
 // [!code ++]
	public int limitSec;

	public HashSet<string> invalidIds = new HashSet<string>();
```

[`@@ -49,6 +53,20 @@ public override void OnInit()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/LayerUploader.cs#L49-L54)
```cs:line-numbers=49
		string text = ini.GetKey("pass") ?? "password";
		inputId.text = ELayer._map.custom?.id ?? "new_zone";
		inputPassword.text = text;
		if (ELayer._map.exportSetting == null) // [!code ++]
		{ // [!code ++]
			ELayer._map.exportSetting = new MapExportSetting(); // [!code ++]
		} // [!code ++]
		MapExportSetting ex = ELayer._map.exportSetting; // [!code ++]
		inputWelcome.text = ex.textWelcome.IsEmpty(""); // [!code ++]
		inputWelcome.onValueChanged.AddListener(delegate(string s) // [!code ++]
		{ // [!code ++]
			ex.textWelcome = s; // [!code ++]
		}); // [!code ++]
		toggleClearLocalCharas.SetToggle(ex.clearLocalCharas, delegate(bool on) // [!code ++]
		{ // [!code ++]
			ex.clearLocalCharas = on; // [!code ++]
		}); // [!code ++]
	}

	private void Update()
```

## Map

[`@@ -69,6 +69,9 @@ public class Map : MapBounds, IPathfindGrid`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Map.cs#L69-L74)
```cs:line-numbers=69
	[JsonProperty]
	public Dictionary<int, PlantData> plants = new Dictionary<int, PlantData>();

	[JsonProperty] // [!code ++]
	public MapExportSetting exportSetting; // [!code ++]
 // [!code ++]
	public BitArray32 bits;

	public Playlist plDay;
```

[`@@ -484,11 +487,12 @@ public void Save(string path, ZoneExportData export = null, PartialMap partial =`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Map.cs#L484-L494)
```cs:line-numbers=484
		export.serializedCards.cards.Clear();
		if (partial == null)
		{
			MapExportSetting mapExportSetting = exportSetting ?? new MapExportSetting(); // [!code ++]
			foreach (Chara chara2 in charas)
			{
				if (export.usermap)
				{
					if (!chara2.trait.IsUnique && !chara2.IsPC) // [!code --]
					if ((!mapExportSetting.clearLocalCharas || chara2.IsPCFactionOrMinion) && !chara2.trait.IsUnique && !chara2.IsPC) // [!code ++]
					{
						export.serializedCards.Add(chara2);
					}
```

## +MapExportSetting

::: details File Created
```cs
using Newtonsoft.Json;

public class MapExportSetting
{
	[JsonProperty]
	public bool clearLocalCharas;

	[JsonProperty]
	public string textWelcome;
}
```

:::
## MsgLog

[`@@ -1,4 +1,6 @@`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/MsgLog.cs#L1-L4)
```cs:line-numbers=1
using System.Collections.Generic;
using System.Linq; // [!code ++]
using System.Runtime.Serialization; // [!code ++]
using Newtonsoft.Json;

public class MsgLog : EClass
```

[`@@ -36,6 +38,18 @@ public int maxLog`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/MsgLog.cs#L36-L41)
```cs:line-numbers=36
		}
	}

	[OnSerializing] // [!code ++]
	private void OnSerializing(StreamingContext context) // [!code ++]
	{ // [!code ++]
		foreach (int item in dict.Keys.ToList()) // [!code ++]
		{ // [!code ++]
			if (item >= currentLogIndex || item <= currentLogIndex - maxLog) // [!code ++]
			{ // [!code ++]
				dict.Remove(item); // [!code ++]
			} // [!code ++]
		} // [!code ++]
	} // [!code ++]
 // [!code ++]
	public void Add(Data data)
	{
		dict.Add(currentLogIndex, data);
```

## Player

[`@@ -1969,13 +1969,17 @@ public void EquipTool(Thing a, bool setHotItem = true)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Player.cs#L1969-L1981)
```cs:line-numbers=1969
public void RefreshCurrentHotItem()
{
	WidgetCurrentTool instance = WidgetCurrentTool.Instance;
	if (!instance) // [!code ++]
	{ // [!code ++]
		return; // [!code ++]
	} // [!code ++]
	if (currentHotItem != null)
	{
		if ((bool)instance)
		{
			instance.buttonHotItem.Refresh();
		}
		if (currentHotItem is HotItemHeld && currentHotItem.Thing != EClass.pc.held) // [!code --]
		if (currentHotItem is HotItemHeld && (currentHotItem.Thing != EClass.pc.held || currentHotItem.Thing.GetRootCard() != EClass.pc)) // [!code ++]
		{
			currentHotItem = null;
		}
```

[`@@ -1990,7 +1994,7 @@ public void RefreshCurrentHotItem()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Player.cs#L1990-L1996)
```cs:line-numbers=1990
	}
	if (currentHotItem == null)
	{
		if ((bool)instance && instance.selected != -1 && instance.selectedButton.card != null && instance.selectedButton.card.GetRootCard() == EClass.pc) // [!code --]
		if ((bool)instance && instance.selected != -1 && instance.selectedButton.card != null && instance.selectedButton.card.GetRootCard() == EClass.pc && !instance.selectedButton.card.GetRootCard().isDestroyed) // [!code ++]
		{
			currentHotItem = instance.selectedButton.card.trait.GetHotItem();
		}
```

[`@@ -1999,6 +2003,7 @@ public void RefreshCurrentHotItem()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Player.cs#L1999-L2004)
```cs:line-numbers=1999
			currentHotItem = hotItemNoItem;
		}
	}
	Debug.Log(currentHotItem); // [!code ++]
	if (currentHotItem != lastHotItem)
	{
		if (lastHotItem != null)
```

## TaskDump

[`@@ -272,7 +272,7 @@ public List<Thing> ListThingsToPut(Thing c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/TaskDump.cs#L272-L278)
```cs:line-numbers=272
	return list;
	bool ExcludeDump(Thing t)
	{
		if (t.isEquipped || t.c_isImportant || !t.trait.CanBeDropped || t.IsHotItem || t.trait is TraitToolBelt || t.trait is TraitAbility) // [!code --]
		if (t.isEquipped || t.c_isImportant || t.trait.CanOnlyCarry || !t.trait.CanBeDropped || t.IsHotItem || t.trait is TraitToolBelt || t.trait is TraitAbility) // [!code ++]
		{
			return true;
		}
```

## Thing

[`@@ -208,7 +208,7 @@ public override void OnCreate(int genLv)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Thing.cs#L208-L214)
```cs:line-numbers=208
		{
			num = EClass.rnd(2) + 1;
		}
		if (num > 0 && !HasTag(CTAG.godArtifact)) // [!code --]
		if (num > 0 && !HasTag(CTAG.godArtifact) && !HasTag(CTAG.noRandomEnc)) // [!code ++]
		{
			for (int i = 0; i < num; i++)
			{
```

## +TraitCage

::: details File Created
```cs
using UnityEngine;

public class TraitCage : TraitShackle
{
	public override Vector3 GetRestrainPos => default(Vector3);
}
```

:::
## +TraitCageBreeding

::: details File Created
```cs
using UnityEngine;

public class TraitCageBreeding : TraitCage
{
	public override Vector3 GetRestrainPos => default(Vector3);

	public override bool AllowTraining => false;
}
```

:::
## TraitShackle

[`@@ -10,6 +10,8 @@ public class TraitShackle : Trait`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/TraitShackle.cs#L10-L15)
```cs:line-numbers=10

	public override string LangUse => "ActRestrain";

	public virtual bool AllowTraining => true; // [!code ++]
 // [!code ++]
	public override bool CanStackTo(Thing to)
	{
		return false;
```

## Zone

[`@@ -1508,44 +1508,49 @@ public void AddGlobalCharasOnActivate()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Zone.cs#L1508-L1551)
```cs:line-numbers=1508
		{
			Chara chara = c.parent as Chara;
			c.currentZone = chara.currentZone;
			continue; // [!code --]
		}
		c.isRestrained = false; // [!code --]
		if (c.isDead) // [!code --]
		{ // [!code --]
			continue; // [!code --]
		} // [!code --]
		if (c.global.transition != null) // [!code --]
		else // [!code ++]
		{
			Point pos = (c.IsPC ? spawnPosPC : (c.IsPCParty ? spawnPosPC.GetNearestPoint(allowBlock: false, allowChara: false, allowInstalled: true, ignoreCenter: true) : GetSpawnPos(c))); // [!code --]
			if (c.IsPCParty && !c.IsPC) // [!code --]
			if (c.isDead) // [!code ++]
			{
				if (c.host == EClass.pc) // [!code --]
				{ // [!code --]
					pos.Set(spawnPosPC); // [!code --]
				} // [!code --]
				else if (pos.Equals(spawnPosPC) || !PathManager.Instance.IsPathClear(spawnPosPC, pos, c, 5)) // [!code --]
				continue; // [!code ++]
			} // [!code ++]
			if (c.isRestrained && c.currentZone == EClass.pc.currentZone && c.pos.FindThing<TraitShackle>() == null) // [!code ++]
			{ // [!code ++]
				c.isRestrained = false; // [!code ++]
			} // [!code ++]
			if (c.global.transition != null) // [!code ++]
			{ // [!code ++]
				Point pos = (c.IsPC ? spawnPosPC : (c.IsPCParty ? spawnPosPC.GetNearestPoint(allowBlock: false, allowChara: false, allowInstalled: true, ignoreCenter: true) : GetSpawnPos(c))); // [!code ++]
				if (c.IsPCParty && !c.IsPC) // [!code ++]
				{
					c.pos.Set(spawnPosPC); // [!code --]
					if (!spawnPosPC.ForeachNearestPoint(delegate(Point p) // [!code --]
					if (c.host == EClass.pc) // [!code ++]
					{ // [!code ++]
						pos.Set(spawnPosPC); // [!code ++]
					} // [!code ++]
					else if (pos.Equals(spawnPosPC) || !PathManager.Instance.IsPathClear(spawnPosPC, pos, c, 5)) // [!code ++]
					{
						if (PathManager.Instance.IsPathClear(spawnPosPC, p, c, 10) && !p.Equals(spawnPosPC)) // [!code --]
						c.pos.Set(spawnPosPC); // [!code ++]
						if (!spawnPosPC.ForeachNearestPoint(delegate(Point p) // [!code ++]
						{
							pos.Set(p); // [!code --]
							return true; // [!code --]
							if (PathManager.Instance.IsPathClear(spawnPosPC, p, c, 10) && !p.Equals(spawnPosPC)) // [!code ++]
							{ // [!code ++]
								pos.Set(p); // [!code ++]
								return true; // [!code ++]
							} // [!code ++]
							return false; // [!code ++]
						}, allowBlock: false, EClass.pc.party.members.Count >= 12, allowInstalled: true, ignoreCenter: true, EClass._zone.IsRegion ? 2 : 6)) // [!code ++]
						{ // [!code ++]
							pos.Set(spawnPosPC); // [!code ++]
						}
						return false; // [!code --]
					}, allowBlock: false, EClass.pc.party.members.Count >= 12, allowInstalled: true, ignoreCenter: true, EClass._zone.IsRegion ? 2 : 6)) // [!code --]
					{ // [!code --]
						pos.Set(spawnPosPC); // [!code --]
					}
				}
				c.pos.Set(pos); // [!code ++]
				c.global.transition = null; // [!code ++]
			}
			c.pos.Set(pos); // [!code --]
			c.global.transition = null; // [!code --]
			map.charas.Add(c); // [!code ++]
			map.AddCardOnActivate(c); // [!code ++]
		}
		map.charas.Add(c); // [!code --]
		map.AddCardOnActivate(c); // [!code --]
	}
	foreach (Chara item in EClass.player.listSummon)
	{
```

[`@@ -2869,7 +2874,7 @@ public List<Element> ListLandFeats()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Zone.cs#L2869-L2875)
```cs:line-numbers=2869
	List<Element> list2 = new List<Element>();
	foreach (int landFeat in landFeats)
	{
		list2.Add(Element.Create(landFeat)); // [!code --]
		list2.Add(Element.Create(landFeat, 1)); // [!code ++]
	}
	return list2;
}
```

## Zone_User

[`@@ -19,4 +19,16 @@ public class Zone_User : Zone`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/ca1186bdb6e5b22ad5dbecd86a778f4fb8f6c7c7/Elin/Zone_User.cs#L19-L22)
```cs:line-numbers=19
	public override int BaseElectricity => 1000;

	public override bool RevealRoom => true;
 // [!code ++]
	public override void OnActivate() // [!code ++]
	{ // [!code ++]
		base.OnActivate(); // [!code ++]
		if (EClass._map.exportSetting != null && !EClass._map.exportSetting.textWelcome.IsEmpty()) // [!code ++]
		{ // [!code ++]
			WidgetMainText.Instance.NewLine(); // [!code ++]
			Msg.SetColor("save"); // [!code ++]
			Msg.SayRaw("<i>" + EClass._map.exportSetting.textWelcome + "</i>"); // [!code ++]
			WidgetMainText.Instance.NewLine(); // [!code ++]
		} // [!code ++]
	} // [!code ++]
}
```
