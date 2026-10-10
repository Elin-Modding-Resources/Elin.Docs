---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 11 files modified.
version: EA 23.354 Nightly
changes: Card/Chara/CharaAbility/CharaGenes/CoreDebug/CustomDramaExpansion/Game/Scene/Trait/TraitBlackNote/TraitWeightScale
---

# EA 23.354 Nightly

October 10, 2026

11 files modified.

## Important Changes

**None.**
## Card

[`public virtual int GetPrice(CurrencyType currency = CurrencyType.Money, bool sel…)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fb1fff4753dfcbfb52fdeeaa8071b12e4b3ce44f/Elin/Card.cs#L7861-L7867)
```cs:line-numbers=7861
case "book_black":
	if (!(c_idRefName == "sorin"))
	{
		return 20; // [!code --]
		return 50; // [!code ++]
	}
	return 100;
case "scroll_random":
```

## Chara

[`public void SetFeat(int id, int value = 1, bool msg = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fb1fff4753dfcbfb52fdeeaa8071b12e4b3ce44f/Elin/Chara.cs#L10561-L10579)
```cs:line-numbers=10561
{
	Feat feat = elements.GetElement(id) as Feat;
	int num = 0;
	if (feat != null && feat.Value > 0) // [!code --]
	if (feat != null && feat.ValueWithoutLink > 0) // [!code ++]
	{
		if (value == feat.Value) // [!code --]
		if (value == feat.ValueWithoutLink) // [!code ++]
		{
			return;
		}
		num = feat.Value; // [!code --]
		feat.Apply(-feat.Value, elements); // [!code --]
		num = feat.ValueWithoutLink; // [!code ++]
		feat.Apply(-feat.ValueWithoutLink, elements); // [!code ++]
	}
	feat = elements.SetBase(id, value - (feat?.vSource ?? 0)) as Feat;
	if (feat != null && feat.Value != 0) // [!code --]
	if (feat != null && feat.ValueWithoutLink != 0) // [!code ++]
	{
		feat.Apply(feat.Value, elements); // [!code --]
		feat.Apply(feat.ValueWithoutLink, elements); // [!code ++]
	}
	if (EClass.core.IsGameStarted)
	{
```

## CharaAbility

[`public bool Has(int id)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fb1fff4753dfcbfb52fdeeaa8071b12e4b3ce44f/Elin/CharaAbility.cs#L228-L233)
```cs:line-numbers=228
				return true;
			}
		}
		if (owner.IsPC && owner.faithElements != null && owner.faithElements.Has(id)) // [!code ++]
		{ // [!code ++]
			return true; // [!code ++]
		} // [!code ++]
		return false;
	}
}
```

## CharaGenes

[`public DNA GetDNA(int idEle)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fb1fff4753dfcbfb52fdeeaa8071b12e4b3ce44f/Elin/CharaGenes.cs#L59-L62)
```cs:line-numbers=59
		}
		return null;
	}
 // [!code ++]
	public int CountDNA(int idEle) // [!code ++]
	{ // [!code ++]
		int num = 0; // [!code ++]
		foreach (DNA item in items) // [!code ++]
		{ // [!code ++]
			for (int i = 0; i < item.vals.Count; i += 2) // [!code ++]
			{ // [!code ++]
				if (item.vals[i] == idEle) // [!code ++]
				{ // [!code ++]
					num++; // [!code ++]
				} // [!code ++]
			} // [!code ++]
		} // [!code ++]
		return num; // [!code ++]
	} // [!code ++]
}
```

## CoreDebug

[`public void QuickStart()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fb1fff4753dfcbfb52fdeeaa8071b12e4b3ce44f/Elin/CoreDebug.cs#L630-L635)
```cs:line-numbers=630
thing8.AddThing("casino_coin").SetNum(30000000);
thing8.AddThing("medal").SetNum(1000);
thing8.ModCurrency(500, "plat");
thing8.ModCurrency(5000, "money3"); // [!code ++]
EClass.pc.AddThing("record");
EClass.pc.AddThing("deed").SetNum(5);
EClass.pc.AddThing("book_story");
```

## CustomDramaExpansion

[`public static bool destroy_item(DramaManager dm, Dictionary<string, string> line…)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fb1fff4753dfcbfb52fdeeaa8071b12e4b3ce44f/Elin/CustomDramaExpansion.cs#L368-L374)
```cs:line-numbers=368
if (item2.Num >= count)
{
	item2.ModNum(-count);
	continue; // [!code --]
	break; // [!code ++]
}
count -= item2.Num;
item2.Destroy();
```

## Game

[`public void ApplyFix()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fb1fff4753dfcbfb52fdeeaa8071b12e4b3ce44f/Elin/Game.cs#L500-L505)
```cs:line-numbers=500
		}
	}
});
if (version.IsBelow(0, 23, 354)) // [!code ++]
{ // [!code ++]
	FixElement(EClass.pc, 1421); // [!code ++]
	FixElement(EClass.pc, 6904); // [!code ++]
} // [!code ++]
if (version.IsBelow(0, 23, 345))
{
	Zone zone = spatials.Find("oldkeep");
```

[`public void ApplyFix()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fb1fff4753dfcbfb52fdeeaa8071b12e4b3ce44f/Elin/Game.cs#L687-L692)
```cs:line-numbers=687
{
	player.debt = 20000000;
}
static void FixElement(Chara c, int idEle) // [!code ++]
{ // [!code ++]
	int num2 = ClassExtension.TryGetValue<int, int>((IDictionary<int, int>)c.race.elementMap, idEle, 0) + ClassExtension.TryGetValue<int, int>((IDictionary<int, int>)c.job.elementMap, idEle, 0); // [!code ++]
	if (c.c_genes != null) // [!code ++]
	{ // [!code ++]
		num2 += c.c_genes.CountDNA(idEle); // [!code ++]
	} // [!code ++]
	foreach (BodySlot slot in c.body.slots) // [!code ++]
	{ // [!code ++]
		if (slot.thing != null && slot.thing.c_DNA != null) // [!code ++]
		{ // [!code ++]
			num2 += ((slot.thing.c_DNA.GetElement(idEle) != null) ? 1 : 0); // [!code ++]
		} // [!code ++]
	} // [!code ++]
	Element orCreateElement = c.elements.GetOrCreateElement(idEle); // [!code ++]
	if (num2 > 0 && orCreateElement.ValueWithoutLink != num2) // [!code ++]
	{ // [!code ++]
		Debug.Log("FixElement: " + orCreateElement.Name + "/" + orCreateElement.vBase + "/" + orCreateElement.vSource + "/" + num2); // [!code ++]
		orCreateElement.vBase = num2 - orCreateElement.vSource; // [!code ++]
	} // [!code ++]
	if (orCreateElement is Ability && orCreateElement.Value > 0 && orCreateElement.vPotential < 0) // [!code ++]
	{ // [!code ++]
		Debug.Log("FixElement(Ability): " + orCreateElement.Name + "/" + orCreateElement.Value + "/" + orCreateElement.vPotential + "/" + num2); // [!code ++]
		orCreateElement.vPotential = 0; // [!code ++]
	} // [!code ++]
} // [!code ++]
void TryAddQuest(string idQuest, string idReqQuest)
{
	if (quests.completedIDs.Contains(idReqQuest) && !quests.completedIDs.Contains(idQuest) && quests.GetGlobal(idQuest) == null && quests.Get(idQuest) == null)
```

## Scene

[`public void OnKillGame()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fb1fff4753dfcbfb52fdeeaa8071b12e4b3ce44f/Elin/Scene.cs#L344-L350)
```cs:line-numbers=344
{
	actionMode.Deactivate();
	mouseTarget.Clear();
	hideBalloon = false; // [!code --]
	actionMode = null;
	PCC.PurgeCache();
	Clear();
```

## Trait

[`public virtual void OnBarter(bool reroll = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fb1fff4753dfcbfb52fdeeaa8071b12e4b3ce44f/Elin/Trait.cs#L2108-L2114)
```cs:line-numbers=2108
}
else
{
	thing2.c_idRefName = EClass.game.cards.globalCharas.Values.Where((Chara a) => a.IsUnique && a.id != "sorin").RandomItem().id; // [!code --]
	thing2.c_idRefName = EClass.game.cards.globalCharas.Values.Where((Chara a) => a.IsUnique && a.id != "sorin" && a.race.id != "machinegod" && a.IsPCFaction).RandomItem().id; // [!code ++]
	AddThing(thing2);
}
Add("1386", 1, 0);
```

## TraitBlackNote

[`public class TraitBlackNote : TraitBaseSpellbook`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fb1fff4753dfcbfb52fdeeaa8071b12e4b3ce44f/Elin/TraitBlackNote.cs#L2-L7)
```cs:line-numbers=2
{
	public override Type BookType => Type.BlackNote;

	public override bool CanStack => owner.isOn; // [!code --]
	public override bool CanStack => true; // [!code ++]

	public override bool HasCharges => false;
```

[`public class TraitBlackNote : TraitBaseSpellbook`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fb1fff4753dfcbfb52fdeeaa8071b12e4b3ce44f/Elin/TraitBlackNote.cs#L13-L17)
```cs:line-numbers=13
	public override int GetActDuration(Chara c)
	{
		return 100; // [!code --]
		if (!EClass.debug.enable) // [!code ++]
		{ // [!code ++]
			return 100; // [!code ++]
		} // [!code ++]
		return 1; // [!code ++]
	} // [!code ++]
 // [!code ++]
	public override bool CanStackTo(Thing to) // [!code ++]
	{ // [!code ++]
		if (to.isOn != owner.isOn) // [!code ++]
		{ // [!code ++]
			return false; // [!code ++]
		} // [!code ++]
		if (to.c_idRefName != owner.c_idRefName) // [!code ++]
		{ // [!code ++]
			return false; // [!code ++]
		} // [!code ++]
		return base.CanStackTo(to); // [!code ++]
	}
}
```

## TraitWeightScale

[`public override void OnStepped(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/fb1fff4753dfcbfb52fdeeaa8071b12e4b3ce44f/Elin/TraitWeightScale.cs#L6-L16)
```cs:line-numbers=6
		c.Say("trap", c, owner);
		if (this is TraitHeightMeasure)
		{
			owner.TalkRaw("weightScale".langGame(c.Name, c.bio.weight.ToFormat() ?? "")); // [!code --]
			owner.TalkRaw("heightMeasure".langGame(c.Name, c.bio.height.ToFormat() ?? "")); // [!code ++]
		}
		else
		{
			owner.TalkRaw("heightMeasure".langGame(c.Name, c.bio.height.ToFormat() ?? "")); // [!code --]
			owner.TalkRaw("weightScale".langGame(c.Name, c.bio.weight.ToFormat() ?? "")); // [!code ++]
		}
	}
}
```
