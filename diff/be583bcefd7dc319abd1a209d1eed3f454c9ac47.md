---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 13 files modified.
version: EA 23.300 Nightly
changes: AI_Idle/Card/Chara/CoreRef/ELEMENT/LayerShippingResult/MATERIAL/ModManager/ModUtil/SKILL/Thing/Trait/Zone
---

# EA 23.300 Nightly

May 1, 2026

13 files modified.

## Important Changes

Possible breaking changes. Click the filename to view the chunk.
### [ModUtil (1)](#modutil)
```cs:no-line-numbers
public static ModPackage GetModPackage(string modId) // [!code --]

```
## AI_Idle

[`public override IEnumerable<Status> Run()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/AI_Idle.cs#L488-L494)
```cs:line-numbers=488
			{
				break;
			}
			foreach (Chara item3 in nearestPoint.ListCharasInRadius(owner, 6, (Chara _c) => _c != owner && !_c.IsPCFactionOrMinion && _c.id != "cocoon")) // [!code --]
			foreach (Chara item3 in nearestPoint.ListCharasInRadius(owner, 6, (Chara _c) => _c != owner && !_c.IsPCFactionOrMinion && _c.id != "cocoon" && _c.id != "cocoon_alien")) // [!code ++]
			{
				item3.Teleport(nearestPoint.GetNearestPoint(allowBlock: false, allowChara: false) ?? nearestPoint);
			}
```

## Card

[`public Thing GiveBirth(Thing t, bool effect)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Card.cs#L5944-L5950)
```cs:line-numbers=5944

	public void HatchEgg()
	{
		string[] array = new string[6] { "spider_queen", "spider_vampire", "spider_paralyzer", "spider_black", "spider_tarantula", "spider_spotted" }; // [!code --]
		string[] array = ((!(id == "cocoon")) ? new string[4] { "alien", "alien", "alien", "alien2" } : new string[6] { "spider_queen", "spider_vampire", "spider_paralyzer", "spider_black", "spider_tarantula", "spider_spotted" }); // [!code ++]
		int num = EClass.rnd(array.Length);
		Point point = pos.Copy();
		PlayEffect("blood").SetParticleColor(EClass.Colors.matColors[material.alias].main).Emit(50);
```

[`public ref Color GetRandomColor()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Card.cs#L6354-L6360)
```cs:line-numbers=6354
	}
	Rand.UseSeed(num, delegate
	{
		_randColor = EClass.sources.materials.rows.RandomItem().matColor; // [!code --]
		_randColor = EClass.sources.materials.rows[EClass.rnd(90)].matColor; // [!code ++]
	});
	return ref _randColor;
}
```

## Chara

[`public void TickConditions()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Chara.cs#L3959-L3988)
```cs:line-numbers=3959
			}
		}
	}
	string text = id; // [!code --]
	if (!(text == "cocoon")) // [!code --]
	switch (id) // [!code ++]
	{
		if (text == "tsunami") // [!code --]
	case "cocoon_alien": // [!code ++]
	case "cocoon": // [!code ++]
		if (!EClass._zone.IsRegion && !IsDisabled && 1.0005f - (float)base.hp / (float)MaxHP > EClass.rndf(1f) && !pos.IsSunLit) // [!code ++]
		{ // [!code ++]
			HatchEgg(); // [!code ++]
			return; // [!code ++]
		} // [!code ++]
		consumeTurn = true; // [!code ++]
		break; // [!code ++]
	case "tsunami": // [!code ++]
		if (elements.Base(79) >= 30) // [!code ++]
		{
			if (elements.Base(79) < 30) // [!code --]
			{ // [!code --]
				Die(); // [!code --]
				return; // [!code --]
			} // [!code --]
			if (IsInCombat)
			{
				elements.SetTo(79, elements.Base(79) * 3 / 4);
			}
			break; // [!code ++]
		}
	} // [!code --]
	else // [!code --]
	{ // [!code --]
		if (!EClass._zone.IsRegion && !IsDisabled && 1.0001f - (float)base.hp / (float)MaxHP > EClass.rndf(1f) && !pos.IsSunLit) // [!code --]
		{ // [!code --]
			HatchEgg(); // [!code --]
			return; // [!code --]
		} // [!code --]
		consumeTurn = true; // [!code --]
		Die(); // [!code ++]
		return; // [!code ++]
	}
	if (!preventRegen)
	{
```

[`public bool CanAcceptItem(Card t, int num = -1, bool skipImportantCheck = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Chara.cs#L8426-L8432)
```cs:line-numbers=8426
	{
		return false;
	}
	if ((t.category.IsChildOf("furniture") || t.category.IsChildOf("junk")) && !HasElement(1411)) // [!code --]
	if ((t.category.IsChildOf("furniture") || t.category.IsChildOf("junk")) && (!(t.trait is TraitFigure) || !HasElement(1427)) && !HasElement(1411)) // [!code ++]
	{
		return false;
	}
```

## CoreRef

[`using System;`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/CoreRef.cs#L1-L5)
```cs:line-numbers=1
using System;
using System.Collections.Generic;
using System.IO; // [!code ++]
using System.Linq;
using UnityEngine;

```

[`public void RefreshBGM()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/CoreRef.cs#L437-L445)
```cs:line-numbers=437
		int num = 0;
		foreach (BGMData bgm in bgms)
		{
			dictBGM.Add(bgm.id, bgm); // [!code --]
			dictBGM[bgm.id] = bgm; // [!code ++]
			num++;
		}
		if (Core.Instance.debug.skipMod) // [!code ++]
		{ // [!code ++]
			return; // [!code ++]
		} // [!code ++]
		foreach (KeyValuePair<string, FileInfo> item in MOD.sounds.Where((KeyValuePair<string, FileInfo> kv) => kv.Key.StartsWith("BGM/"))) // [!code ++]
		{ // [!code ++]
			item.Deconstruct(out var key, out var _); // [!code ++]
			ModUtil.AddOrReplaceBGM(key); // [!code ++]
		} // [!code ++]
	}

	public void RebuildBGMList()
```

## ELEMENT

[`public void _WriteNote(UINote n, Chara c, Act act)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/ELEMENT.cs#L624-L629)
```cs:line-numbers=624
			{
				Condition condition = Condition.Create(text2.Replace("@", ""), p);
				condition.owner = c;
				if (condition is ConWeapon conWeapon) // [!code ++]
				{ // [!code ++]
					conWeapon.cha = c.CHA; // [!code ++]
				} // [!code ++]
				if (!source.aliasRef.IsEmpty())
				{
					condition.SetElement(EClass.sources.elements.alias[source.aliasRef].id);
```

## LayerShippingResult

[`public class LayerShippingResult : ELayer`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/LayerShippingResult.cs#L66-L71)
```cs:line-numbers=66
	{
		Add("demitas", 5);
	}
	Add("kettle", 7); // [!code ++]
	int num = list.RandomItem();
	imageBG.sprite = spriteBG[num];
	Rand.SetSeed();
```

## MATERIAL

[`public class MATERIAL : EClass`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/MATERIAL.cs#L38-L52)
```cs:line-numbers=38

	public const int MaxTier = 7;

	public static SourceMaterial.Row sourceSnow = EClass.sources.materials.map[48]; // [!code --]
	public static SourceMaterial.Row sourceSnow => EClass.sources.materials.map[48]; // [!code ++]

	public static SourceMaterial.Row sourceIce = EClass.sources.materials.map[61]; // [!code --]
	public static SourceMaterial.Row sourceIce => EClass.sources.materials.map[61]; // [!code ++]

	public static SourceMaterial.Row sourceGold = EClass.sources.materials.map[12]; // [!code --]
	public static SourceMaterial.Row sourceGold => EClass.sources.materials.map[12]; // [!code ++]

	public static SourceMaterial.Row sourceOak = EClass.sources.materials.map[1]; // [!code --]
	public static SourceMaterial.Row sourceOak => EClass.sources.materials.map[1]; // [!code ++]

	public static SourceMaterial.Row sourceWaterSea = EClass.sources.materials.map[88]; // [!code --]
	public static SourceMaterial.Row sourceWaterSea => EClass.sources.materials.map[88]; // [!code ++]

	public static SourceMaterial.Row FromElement(int id)
	{
```

## ModManager

[`public override void Init(string path, string defaultPackage = "_Elona")`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/ModManager.cs#L69-L74)
```cs:line-numbers=69
				ModManagerCore.generateLocalizations = false;
			}
			ImportAllModDialogs();
			BookList.dict = null; // [!code ++]
		});
	}

```

## ModUtil

[`where typeof(SourceData).IsAssignableFrom(f.FieldType)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/ModUtil.cs#L23-L29)
```cs:line-numbers=23
	public static void OnModsActivated()
	{
		SoundManager.current.soundLoaders.Add(LoadSoundData);
		UIBook.topicLoaders.Add(LoadTopicFiles); // [!code ++]
		BookList.booklistLoaders.Add(LoadBookList); // [!code ++]
		BaseModManager.PublishEvent("elin.mods.activated");
		BaseModManager.SubscribeEvent("elin.game.post_load", PostLoadCleanup); // [!code ++]
	} // [!code ++]
 // [!code ++]
	private static void PostLoadCleanup(object context) // [!code ++]
	{ // [!code ++]
		EClass.player.knownBGMs.RemoveWhere((int id) => !EClass.core.refs.dictBGM.ContainsKey(id)); // [!code ++]
	}

	public static void LoadTypeFallback()
```

[`public static void RegisterSerializedTypeFallback(string nameAssembly, string na`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/ModUtil.cs#L55-L60)
```cs:line-numbers=55
		fallbackTypes[nameType] = nameFallbackType;
	}

	public static ModPackage GetModPackage(string modId) // [!code ++]
	{ // [!code ++]
		return ModManagerCore.Instance.MappedPackages.GetValueOrDefault(modId) as ModPackage; // [!code ++]
	} // [!code ++]
 // [!code ++]
	public static void ImportExcel(string pathToExcelFile, string sheetName, SourceData source)
	{
		UnityEngine.Debug.Log("ImportExcel source:" + source?.ToString() + " Path:" + pathToExcelFile);
```

[`public static void ImportExcel(string pathToExcelFile, string sheetName, SourceD`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/ModUtil.cs#L89-L100)
```cs:line-numbers=89

	public static ModPackage FindSourceRowPackage(SourceData.BaseRow row)
	{
		return ModManagerCore.Instance.packages.OfType<ModPackage>().FirstOrDefault((ModPackage p) => p.sourceRows.Contains(row)); // [!code --]
	} // [!code --]
 // [!code --]
	public static ModPackage GetModPackage(string modId) // [!code --]
	{ // [!code --]
		return ModManagerCore.Instance.MappedPackages.GetValueOrDefault(modId) as ModPackage; // [!code --]
		return ModManagerCore.Instance.packages.OfType<ModPackage>().LastOrDefault((ModPackage p) => p.sourceRows.Contains(row)); // [!code ++]
	}

	public static SerializableSoundData GetSoundMeta(string soundPath)
```

[`public static SerializableSoundData GetSoundMeta(string soundPath)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/ModUtil.cs#L119-L125)
```cs:line-numbers=119
	if (soundPath.NormalizePath().Contains("/Sound/BGM/"))
	{
		serializableSoundData.type = SoundData.Type.BGM;
		serializableSoundData.bgmDataOptional = new SerializableBGMData(); // [!code --]
		serializableSoundData.bgmDataOptional = new SerializableBGMData // [!code ++]
		{ // [!code ++]
			parts = new List<BGMData.Part> // [!code ++]
			{ // [!code ++]
				new BGMData.Part() // [!code ++]
			} // [!code ++]
		}; // [!code ++]
	}
	IO.SaveFile(path, serializableSoundData);
	return serializableSoundData;
```

[`public static SoundData LoadSoundData(FileInfo soundFile)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/ModUtil.cs#L188-L191)
```cs:line-numbers=188
		SoundManager.current.dictData[fileNameWithoutExtension] = soundData;
		return soundData;
	}
 // [!code ++]
	public static void AddOrReplaceBGM(string bgmId) // [!code ++]
	{ // [!code ++]
		List<BGMData> bgms = Core.Instance.refs.bgms; // [!code ++]
		Dictionary<int, BGMData> dictBGM = Core.Instance.refs.dictBGM; // [!code ++]
		BGMData bGMData = SoundManager.current.GetData(bgmId) as BGMData; // [!code ++]
		if (!(bGMData == null)) // [!code ++]
		{ // [!code ++]
			bGMData.name = bgmId[4..]; // [!code ++]
			if (bGMData.id <= 0) // [!code ++]
			{ // [!code ++]
				bGMData.id = bgms.Count + 1; // [!code ++]
				UnityEngine.Debug.Log($"#sound bgm unassigned/{bGMData.id}/{bGMData.name}"); // [!code ++]
			} // [!code ++]
			if (dictBGM.TryGetValue(bGMData.id, out var value)) // [!code ++]
			{ // [!code ++]
				value.clip = bGMData.clip; // [!code ++]
				UnityEngine.Debug.Log($"#sound bgm replace/{bGMData.id}/{value.name}/>/{bGMData.name}"); // [!code ++]
			} // [!code ++]
			else // [!code ++]
			{ // [!code ++]
				bgms.Add(bGMData); // [!code ++]
				dictBGM[bGMData.id] = bGMData; // [!code ++]
				UnityEngine.Debug.Log($"#sound bgm addon/{bGMData.id}/{bGMData.name}"); // [!code ++]
			} // [!code ++]
		} // [!code ++]
	} // [!code ++]
 // [!code ++]
	public static ModPackage FindSoundPackage(string soundId) // [!code ++]
	{ // [!code ++]
		return ModManagerCore.Instance.packages.OfType<ModPackage>().LastOrDefault((ModPackage p) => p.sounds.Keys.Contains(soundId)); // [!code ++]
	} // [!code ++]
 // [!code ++]
	public static Playlist CreatePlaylist(ref List<int> bgmIds, Playlist mold = null) // [!code ++]
	{ // [!code ++]
		Playlist playlist = EClass.Sound.plBlank.Instantiate(); // [!code ++]
		if (bgmIds.Count == 0 && (bool)mold) // [!code ++]
		{ // [!code ++]
			bgmIds = mold.ToInts(); // [!code ++]
			playlist.shuffle = mold.shuffle; // [!code ++]
			playlist.minSwitchTime = mold.minSwitchTime; // [!code ++]
			playlist.nextBGMOnSwitch = mold.nextBGMOnSwitch; // [!code ++]
			playlist.ignoreLoop = mold.ignoreLoop; // [!code ++]
			playlist.keepBGMifSamePlaylist = mold.keepBGMifSamePlaylist; // [!code ++]
			playlist.name = mold.name; // [!code ++]
		} // [!code ++]
		foreach (int bgmId in bgmIds) // [!code ++]
		{ // [!code ++]
			if (EClass.core.refs.dictBGM.TryGetValue(bgmId, out var value)) // [!code ++]
			{ // [!code ++]
				playlist.list.Add(new Playlist.Item // [!code ++]
				{ // [!code ++]
					data = value // [!code ++]
				}); // [!code ++]
			} // [!code ++]
		} // [!code ++]
		return playlist; // [!code ++]
	} // [!code ++]
 // [!code ++]
	public static void SetBGMKnown(int bgmId, bool known = true) // [!code ++]
	{ // [!code ++]
		known &= EClass.core.refs.dictBGM.ContainsKey(bgmId); // [!code ++]
		if (known) // [!code ++]
		{ // [!code ++]
			EClass.player.knownBGMs.Add(bgmId); // [!code ++]
		} // [!code ++]
		else // [!code ++]
		{ // [!code ++]
			EClass.player.knownBGMs.Remove(bgmId); // [!code ++]
		} // [!code ++]
	} // [!code ++]
 // [!code ++]
	public static string[] LoadBookList() // [!code ++]
	{ // [!code ++]
		return (from d in PackageIterator.GetDirectories("Text").SelectMany((DirectoryInfo d) => d.GetDirectories()) // [!code ++]
			select d.FullName).ToArray(); // [!code ++]
	} // [!code ++]
 // [!code ++]
	public static string[] LoadTopicFiles() // [!code ++]
	{ // [!code ++]
		return PackageIterator.GetFiles("Text/Help/_topics.txt").SelectMany((FileInfo f) => IO.LoadTextArray(f.FullName)).ToArray(); // [!code ++]
	} // [!code ++]
}
```

## SKILL

[`public override bool CanLink(ElementContainer owner)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/SKILL.cs#L296-L302)
```cs:line-numbers=296
{
	if (!base.IsGlobalElement)
	{
		return !base.source.IsWeaponEnc; // [!code --]
		if (base.source.IsWeaponEnc) // [!code ++]
		{ // [!code ++]
			if (base.owner != null && base.owner.Card != null) // [!code ++]
			{ // [!code ++]
				return !base.owner.Card.IsWeapon; // [!code ++]
			} // [!code ++]
			return false; // [!code ++]
		} // [!code ++]
		return true; // [!code ++]
	}
	return false;
}
```

## Thing

[`public override void WriteNote(UINote n, Action<UINote> onWriteNote = null, IIns`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Thing.cs#L1291-L1301)
```cs:line-numbers=1291
			}
			if (!e.IsGlobalElement)
			{
				if (e.source.tag.Contains("weaponEnc") && !base.IsWeapon && !base.IsRangedWeapon && !base.IsAmmo && !base.IsThrownWeapon && !(trait is TraitToolMusic)) // [!code --]
				if (e.source.tag.Contains("weaponEnc") && !base.IsEquipmentOrRangedOrAmmo && !base.IsThrownWeapon && !(trait is TraitToolMusic)) // [!code ++]
				{
					return false;
				}
				if (e.source.IsWeaponEnc && !base.category.IsChildOf("shield") && !base.IsWeapon && !base.IsRangedWeapon && !base.IsAmmo && !base.IsThrownWeapon && !(trait is TraitToolMusic)) // [!code --]
				if (e.source.IsWeaponEnc && !base.category.IsChildOf("shield") && !base.IsEquipmentOrRangedOrAmmo && !base.IsThrownWeapon && !(trait is TraitToolMusic)) // [!code ++]
				{
					return false;
				}
```

## Trait

[`public virtual void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Trait.cs#L1544-L1552)
```cs:line-numbers=1544
	owner.c_dateStockExpire = EClass.world.date.GetRaw(24 * RestockDay);
	owner.isRestocking = true;
	t.things.DestroyAll((Thing _t) => _t.GetInt(101) != 0);
	foreach (Thing thing9 in t.things) // [!code --]
	foreach (Thing thing10 in t.things) // [!code ++]
	{
		thing9.invX = -1; // [!code --]
		thing10.invX = -1; // [!code ++]
	}
	switch (ShopType)
	{
```

[`public virtual void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Trait.cs#L1564-L1576)
```cs:line-numbers=1564
			break;
		}
		int num5 = 0;
		foreach (Thing thing10 in c_copyContainer.things) // [!code --]
		foreach (Thing thing11 in c_copyContainer.things) // [!code ++]
		{
			if (!owner.trait.CanCopy(thing10)) // [!code --]
			if (!owner.trait.CanCopy(thing11)) // [!code ++]
			{
				continue;
			}
			Thing thing2 = thing10.Duplicate(1); // [!code --]
			Thing thing2 = thing11.Duplicate(1); // [!code ++]
			thing2.isStolen = false;
			thing2.isCopy = true;
			thing2.c_priceFix = 0;
```

[`public virtual void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Trait.cs#L1595-L1601)
```cs:line-numbers=1595
				break;
			}
			case CopyShopType.Spellbook:
				thing2.c_charges = thing10.c_charges; // [!code --]
				thing2.c_charges = thing11.c_charges; // [!code ++]
				break;
			}
			if (num6 > 1 && thing2.trait.CanStack)
```

[`public virtual void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Trait.cs#L1904-L1928)
```cs:line-numbers=1904
				break;
			}
			case ShopType.Medal:
				NoRestockId("hammer_garokk", 3); // [!code --]
				NoRestockId("sword_dragon", 1); // [!code --]
				NoRestockId("hammer_garokk", 3, 0); // [!code ++]
				NoRestockId("sword_dragon", 1, 0); // [!code ++]
				Add("sword_dragon", 1, 0).SetReplica(on: true);
				NoRestockId("point_stick", 1); // [!code --]
				NoRestockId("point_stick", 1, 0); // [!code ++]
				Add("point_stick", 1, 0).SetReplica(on: true);
				NoRestockId("blunt_bonehammer", 1); // [!code --]
				NoRestockId("blunt_bonehammer", 1, 0); // [!code ++]
				Add("blunt_bonehammer", 1, 0).SetReplica(on: true);
				NoRestockId("pole_gunlance", 1); // [!code --]
				NoRestockId("pole_gunlance", 1, 0); // [!code ++]
				Add("pole_gunlance", 1, 0).SetReplica(on: true);
				NoRestockId("sword_muramasa", 1); // [!code --]
				NoRestockId("sword_muramasa", 1, 0); // [!code ++]
				Add("sword_muramasa", 1, 0).SetReplica(on: true);
				NoRestockId("sword_forgetmenot", 1); // [!code --]
				NoRestockId("sword_forgetmenot", 1, 0); // [!code ++]
				Add("sword_forgetmenot", 1, 0).SetReplica(on: true);
				NoRestockId("dagger_fish", 1); // [!code --]
				NoRestockId("dagger_fish", 1, 0); // [!code ++]
				Add("dagger_fish", 1, 0).SetReplica(on: true);
				NoRestockId("sword_zephir", 1); // [!code --]
				NoRestockId("sword_zephir", 1, 0); // [!code ++]
				Add("sword_zephir", 1, 0).SetReplica(on: true);
				Add("ribbon", 1, 0);
				Add("helm_sage", 1, 0);
				Add("wear_swim_danger", 1, 0); // [!code ++]
				Add("wear_swim_danger", 1, 1); // [!code ++]
				Add("diary_sister", 1, 0);
				Add("diary_catsister", 1, 0);
				Add("diary_lady", 1, 0);
```

[`public virtual void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Trait.cs#L2180-L2232)
```cs:line-numbers=2180
				}
				AddThing(ThingGen.CreateScroll(8780, EClass.rndHalf(5)));
			}
			foreach (Thing thing11 in t.things) // [!code --]
			foreach (Thing thing12 in t.things) // [!code ++]
			{
				thing11.c_idBacker = 0; // [!code --]
				thing12.c_idBacker = 0; // [!code ++]
				if (ShopType != ShopType.Copy)
				{
					thing11.TryMakeRandomItem(ShopLv); // [!code --]
					if (thing11.Num == 1) // [!code --]
					thing12.TryMakeRandomItem(ShopLv); // [!code ++]
					if (thing12.Num == 1) // [!code ++]
					{
						thing11.SetNum(thing11.trait.DefaultStock); // [!code --]
						thing12.SetNum(thing12.trait.DefaultStock); // [!code ++]
					}
					if (thing11.trait is TraitFoodMeal) // [!code --]
					if (thing12.trait is TraitFoodMeal) // [!code ++]
					{
						CraftUtil.MakeDish(thing11, ShopLv, owner.Chara); // [!code --]
						CraftUtil.MakeDish(thing12, ShopLv, owner.Chara); // [!code ++]
					}
					if (thing11.IsFood && owner.id == "rodwyn") // [!code --]
					if (thing12.IsFood && owner.id == "rodwyn") // [!code ++]
					{
						SourceElement.Row row = EClass.sources.elements.rows.Where((SourceElement.Row e) => !e.foodEffect.IsEmpty() && e.category != "feat" && e.chance > 0).RandomItem();
						thing11.elements.SetBase(row.id, 10 + EClass.rnd(10)); // [!code --]
						thing12.elements.SetBase(row.id, 10 + EClass.rnd(10)); // [!code ++]
					}
				}
				if (CurrencyType == CurrencyType.Casino_coin)
				{
					thing11.noSell = true; // [!code --]
					thing12.noSell = true; // [!code ++]
				}
				if (Guild.Thief.IsCurrentZone)
				{
					thing11.isStolen = true; // [!code --]
					thing12.isStolen = true; // [!code ++]
				}
				if (!(thing11.trait is TraitErohon)) // [!code --]
				if (!(thing12.trait is TraitErohon)) // [!code ++]
				{
					thing11.c_IDTState = 0; // [!code --]
					thing12.c_IDTState = 0; // [!code ++]
				}
				if (CurrencyType == CurrencyType.Money && (thing11.category.IsChildOf("meal") || thing11.category.IsChildOf("preserved")) && thing11.id != "ration" && !thing11.IsUnique) // [!code --]
				if (CurrencyType == CurrencyType.Money && (thing12.category.IsChildOf("meal") || thing12.category.IsChildOf("preserved")) && thing12.id != "ration" && !thing12.IsUnique) // [!code ++]
				{
					thing11.c_priceFix = -70; // [!code --]
					thing12.c_priceFix = -70; // [!code ++]
				}
				if (ShopType == ShopType.TravelMerchant)
				{
					thing11.c_priceFix = 200; // [!code --]
					thing12.c_priceFix = 200; // [!code ++]
				}
				if (thing11.trait is TraitErohon) // [!code --]
				if (thing12.trait is TraitErohon) // [!code ++]
				{
					thing11.c_IDTState = 5; // [!code --]
					thing12.c_IDTState = 5; // [!code ++]
				}
				if (thing11.IsContainer && !thing11.c_revealLock) // [!code --]
				if (thing12.IsContainer && !thing12.c_revealLock) // [!code ++]
				{
					thing11.RemoveThings(); // [!code --]
					thing12.RemoveThings(); // [!code ++]
					t.c_lockLv = 0;
				}
			}
```

[`public virtual void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Trait.cs#L2247-L2255)
```cs:line-numbers=2247
			Thing Add(string id, int a, int idSkin)
			{
				CardBlueprint.SetNormalRarity();
				Thing thing8 = ThingGen.Create(id, -1, ShopLv).SetNum(a); // [!code --]
				thing8.idSkin = ((idSkin == -1) ? EClass.rnd(thing8.source.skins.Length + 1) : idSkin); // [!code --]
				return t.AddThing(thing8); // [!code --]
				Thing thing9 = ThingGen.Create(id, -1, ShopLv).SetNum(a); // [!code ++]
				thing9.idSkin = ((idSkin == -1) ? EClass.rnd(thing9.source.skins.Length + 1) : idSkin); // [!code ++]
				return t.AddThing(thing9); // [!code ++]
			}
			void AddAdvWeek(int i)
			{
```

[`Thing AddThing(Thing _t)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Trait.cs#L2270-L2276)
```cs:line-numbers=2270
			}
			void NoRestock(Thing _t)
			{
				HashSet<string> hashSet = EClass.player.noRestocks.TryGetValue(owner.id); // [!code --]
				string text = owner.id; // [!code ++]
				if (_t.idSkin != 0) // [!code ++]
				{ // [!code ++]
					text = text + "_skin" + _t.idSkin; // [!code ++]
				} // [!code ++]
				HashSet<string> hashSet = EClass.player.noRestocks.TryGetValue(text); // [!code ++]
				if (hashSet == null)
				{
					hashSet = new HashSet<string>();
```

[`void NoRestock(Thing _t)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Trait.cs#L2278-L2291)
```cs:line-numbers=2278
					if (!hashSet.Contains(_t.trait.IdNoRestock))
					{
						hashSet.Add(_t.trait.IdNoRestock);
						EClass.player.noRestocks[owner.id] = hashSet; // [!code --]
						EClass.player.noRestocks[text] = hashSet; // [!code ++]
						_t.SetInt(101, 1);
						AddThing(_t);
					}
				}
				void NoRestockId(string _id, int num) // [!code --]
				void NoRestockId(string _id, int num, int idSkin) // [!code ++]
				{
					NoRestock(ThingGen.Create(_id).SetNum(num)); // [!code --]
					Thing thing8 = ThingGen.Create(_id).SetNum(num); // [!code ++]
					thing8.idSkin = idSkin; // [!code ++]
					NoRestock(thing8); // [!code ++]
				}
			}

```

## Zone

[`public void RefreshBGM()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/be583bcefd7dc319abd1a209d1eed3f454c9ac47/Elin/Zone.cs#L3131-L3155)
```cs:line-numbers=3131

	public Playlist CreatePlaylist(ref List<int> list, Playlist mold = null)
	{
		Playlist playlist = EClass.Sound.plBlank.Instantiate(); // [!code --]
		if (list.Count == 0 && (bool)mold) // [!code --]
		{ // [!code --]
			list = mold.ToInts(); // [!code --]
			playlist.shuffle = mold.shuffle; // [!code --]
			playlist.minSwitchTime = mold.minSwitchTime; // [!code --]
			playlist.nextBGMOnSwitch = mold.nextBGMOnSwitch; // [!code --]
			playlist.ignoreLoop = mold.ignoreLoop; // [!code --]
			playlist.keepBGMifSamePlaylist = mold.keepBGMifSamePlaylist; // [!code --]
			playlist.name = mold.name; // [!code --]
		} // [!code --]
		foreach (int item in list) // [!code --]
		{ // [!code --]
			playlist.list.Add(new Playlist.Item // [!code --]
			{ // [!code --]
				data = EClass.core.refs.dictBGM.TryGetValue(item, 1) // [!code --]
			}); // [!code --]
		} // [!code --]
		return playlist; // [!code --]
		return ModUtil.CreatePlaylist(ref list, mold); // [!code ++]
	}

	public Chara FindChara(string id)
```
