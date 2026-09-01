---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 12 files modified.
version: EA 23.341 Nightly
changes: ActEffect/ButtonGrid/Chara/DNA/HotItemEQSet/InvOwner/InvOwnerChangeRarity/InvOwnerEnchant/AssemblyInfo/Thing/TraitBookSecret/TraitMannequin
---

# EA 23.341 Nightly

September 1, 2026

12 files modified.

## Important Changes

**None.**
## ActEffect

[`void AddCon<T>(int rate, int p2) where T : Condition`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/ActEffect.cs#L662-L668)
```cs:line-numbers=662
{
	CC.PlaySound("spell_missile");
});
for (int num9 = 0; num9 < 8 + EClass.rnd(5); num9++) // [!code --]
for (int num9 = 0; num9 < 6 + EClass.rnd(7); num9++) // [!code ++]
{
	list7.Clear();
	list7.Add(list8.RandomItem());
```

## ButtonGrid

[`public void SetCard(Card c, Mode mode = Mode.Default, Action<UINote> onWriteNote…)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/ButtonGrid.cs#L287-L296)
```cs:line-numbers=287
}
if (c.IsIdentified)
{
	BlessedState blessedState2 = c.blessedState; // [!code --]
	if (blessedState2 != BlessedState.Normal) // [!code --]
	if (c.GetBool(135)) // [!code ++]
	{
		Attach("status_" + blessedState2); // [!code --]
		Attach("status_SleepLock"); // [!code ++]
	} // [!code ++]
	else // [!code ++]
	{ // [!code ++]
		BlessedState blessedState2 = c.blessedState; // [!code ++]
		if (blessedState2 != BlessedState.Normal) // [!code ++]
		{ // [!code ++]
			Attach("status_" + blessedState2); // [!code ++]
		} // [!code ++]
	}
}
else
```

## Chara

[`public bool UseAbility(Act a, Card tc = null, Point pos = null, bool pt = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/Chara.cs#L6278-L6284)
```cs:line-numbers=6278
}
else
{
	if (IsPC && HasElement(1274) && a.vPotential < 0 && !flag2 && !a.HasTag("dontForget")) // [!code --]
	if (IsPC && a.vPotential < 0 && !flag2 && !a.HasTag("dontForget")) // [!code ++]
	{
		Msg.Say("noSpellStock");
		EInput.Consume();
```

## DNA

[`public void WriteNoteExtra(UINote n, Thing owner, Chara tg)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/DNA.cs#L680-L689)
```cs:line-numbers=680
int num2 = tg.MaxGeneSlot - tg.CurrentGeneSlot;
int num3 = num2 - num;
int maxGeneSlot = tg.MaxGeneSlot;
if (owner == null || !(owner.category.id == "relic")) // [!code --]
{ // [!code --]
	n.AddText("gene_hint_slot".lang(num2.ToString() ?? "", num3.ToString() ?? "", maxGeneSlot.ToString() ?? ""), (num3 >= 0) ? FontColor.Good : FontColor.Bad); // [!code --]
} // [!code --]
n.AddText("gene_hint_slot".lang(num2.ToString() ?? "", num3.ToString() ?? "", maxGeneSlot.ToString() ?? ""), (num3 >= 0) ? FontColor.Good : FontColor.Bad); // [!code ++]
int num4 = cost * tg.GeneCostMTP / 100;
int num5 = tg.feat - num4;
n.AddText("gene_hint_cost".lang(tg.feat.ToString() ?? "", num4 + ((num4 == cost) ? "" : ("(" + cost + ")")), num5.ToString() ?? ""), (num5 >= 0) ? FontColor.Good : FontColor.Bad);
```

[`public DNA Relicize()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/DNA.cs#L784-L790)
```cs:line-numbers=784
				i -= 2;
			}
		}
		cost /= 5; // [!code --]
		cost = cost * Mathf.Clamp(slot, 1, 10) / 10; // [!code ++]
		return this;
	}
}
```

## HotItemEQSet

[`public HotItemEQSet Register()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/HotItemEQSet.cs#L40-L46)
```cs:line-numbers=40
ids.Clear();
foreach (BodySlot slot in EClass.pc.body.slots)
{
	if (slot.elementId != 44 && slot.thing != null) // [!code --]
	if (slot.elementId != 44 && slot.thing != null && slot.elementId != 46) // [!code ++]
	{
		ids.Add(slot.thing.uid);
	}
```

[`public override void Perform()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/HotItemEQSet.cs#L56-L62)
```cs:line-numbers=56
Dictionary<int, Thing> dictionary = new Dictionary<int, Thing>();
foreach (BodySlot slot2 in EClass.pc.body.slots)
{
	if (slot2.elementId != 44 && slot2.thing != null && slot2.thing.blessedState >= BlessedState.Normal) // [!code --]
	if (slot2.elementId != 44 && slot2.thing != null && slot2.thing.blessedState >= BlessedState.Normal && slot2.thing.category.id != "relic") // [!code ++]
	{
		dictionary.Add(slot2.thing.c_equippedSlot - 1, slot2.thing);
		EClass.pc.body.Unequip(slot2.thing, refresh: false);
```

## InvOwner

[`public virtual bool AllowHold(Thing t)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/InvOwner.cs#L642-L650)
```cs:line-numbers=642
{
	return false;
}
if (t.isEquipped && t.IsCursed) // [!code --]
if (t.isEquipped) // [!code ++]
{
	return false; // [!code --]
	if (t.IsCursed) // [!code ++]
	{ // [!code ++]
		return false; // [!code ++]
	} // [!code ++]
	if (t.GetBool(135)) // [!code ++]
	{ // [!code ++]
		return false; // [!code ++]
	} // [!code ++]
}
if (Container.isChara && !Container.IsPC)
{
```

[`public virtual void OnClick(ButtonGrid button)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/InvOwner.cs#L762-L768)
```cs:line-numbers=762
	return;
}
bool flag = false;
if (card.Thing.isEquipped && card.Thing.IsEquipmentOrRanged && card.Thing.IsCursed) // [!code --]
if (card.Thing.isEquipped && card.GetBool(135)) // [!code ++]
{ // [!code ++]
	SE.Play("curse3"); // [!code ++]
} // [!code ++]
else if (card.Thing.isEquipped && card.Thing.IsEquipmentOrRanged && card.Thing.IsCursed) // [!code ++]
{
	SE.Play("curse3");
}
```

## InvOwnerChangeRarity

[`public override Thing CreateDefaultContainer()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/InvOwnerChangeRarity.cs#L16-L23)
```cs:line-numbers=16
public override bool ShouldShowGuide(Thing t)
{
	if (t.IsEquipment && t.rarity <= Rarity.Legendary && !t.HasTag(CTAG.godArtifact)) // [!code --]
	if (t.IsEquipment && t.rarity <= Rarity.Legendary && !t.HasTag(CTAG.godArtifact) && !t.IsLightsource) // [!code ++]
	{
		return !t.IsLightsource; // [!code --]
		return t.category.id != "relic"; // [!code ++]
	}
	return false;
}
```

## InvOwnerEnchant

[`public override Thing CreateDefaultContainer()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/InvOwnerEnchant.cs#L14-L19)
```cs:line-numbers=14
public override bool ShouldShowGuide(Thing t)
{
	return t.category.IsChildOf(armor ? "armor" : "weapon"); // [!code --]
	if (t.category.IsChildOf(armor ? "armor" : "weapon")) // [!code ++]
	{ // [!code ++]
		return t.category.id != "relic"; // [!code ++]
	} // [!code ++]
	return false; // [!code ++]
}

public override void _OnProcess(Thing t)
```

## AssemblyInfo

[`using System.Security;`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/Properties/AssemblyInfo.cs#L4-L13)
```cs:line-numbers=4
using System.Security;
using System.Security.Permissions;

[assembly: AssemblyFileVersion("0.23.340.3")] // [!code --]
[assembly: AssemblyInformationalVersion("0.23.340.3+Nightly")] // [!code --]
[assembly: AssemblyMetadata("GameVersion", "0.23.340.3")] // [!code --]
[assembly: AssemblyMetadata("GameVersionText", "EA 23.340 Patch 3")] // [!code --]
[assembly: AssemblyMetadata("GameVersionInt", "23340")] // [!code --]
[assembly: AssemblyFileVersion("0.23.341.0")] // [!code ++]
[assembly: AssemblyInformationalVersion("0.23.341.0+Nightly")] // [!code ++]
[assembly: AssemblyMetadata("GameVersion", "0.23.341.0")] // [!code ++]
[assembly: AssemblyMetadata("GameVersionText", "EA 23.341")] // [!code ++]
[assembly: AssemblyMetadata("GameVersionInt", "23341")] // [!code ++]
[assembly: AssemblyMetadata("ReleaseChannel", "Nightly")]
[assembly: AssemblyVersion("0.0.0.0")]
```

## Thing

[`public bool CanAutoFire(Chara c, Card tg, bool reloading = false)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/Thing.cs#L148-L154)
```cs:line-numbers=148
{
	Act act = (trait as TraitAbility).act;
	Element element = c.elements.GetElement(act.id);
	if (act is Spell && (element == null || element.vPotential == 0)) // [!code --]
	if (act is Spell && (element == null || (element.vPotential == 0 && !EClass.pc.ability.Has(element.id)))) // [!code ++]
	{
		return false;
	}
```

[`public override void WriteNote(UINote n, Action<UINote> onWriteNote = null, IIns…)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/Thing.cs#L1364-L1370)
```cs:line-numbers=1364
trait.WriteNote(n, flag2);
if (base.c_DNA != null)
{
	bool flag3 = EClass.pc.HasElement(1274) && !LayerDragGrid.Instance; // [!code --]
	bool flag3 = EClass.pc.HasElement(1274) && !LayerDragGrid.Instance && base.category.id != "relic"; // [!code ++]
	if (base.c_DNA.cost > 0)
	{
		n.AddText("NoteText_enc", "isCostFeatPoint".lang((flag3 ? (base.c_DNA.cost * EClass.pc.GeneCostMTP / 100 + " (" + base.c_DNA.cost + ")") : ((object)base.c_DNA.cost))?.ToString() ?? ""));
```

## TraitBookSecret

[`public class TraitBookSecret : TraitBookExp`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/TraitBookSecret.cs#L2-L12)
```cs:line-numbers=2
{
	public override void OnRead(Chara c)
	{
		if (c.IsPC && EClass.player.stats.kumi >= 5) // [!code --]
		{ // [!code --]
			c.Say("book_secret2", c); // [!code --]
			return; // [!code --]
		} // [!code --]
		c.Say("book_secret", c);
		c.Say("dingExp", c);
		c.feat += (c.IsPC ? 1 : 4);
```

## TraitMannequin

[`public override bool OnUse(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/TraitMannequin.cs#L51-L57)
```cs:line-numbers=51
{
	foreach (Thing item in list)
	{
		owner.AddCard(item); // [!code --]
		if (!(item.category.id == "relic")) // [!code ++]
		{ // [!code ++]
			owner.AddCard(item); // [!code ++]
		} // [!code ++]
	}
}
else
```

[`public override bool OnUse(Chara c)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/53deae5a963ac4724febdf4da8c0cbd9078ceab2/Elin/TraitMannequin.cs#L63-L69)
```cs:line-numbers=63
}
foreach (Thing item2 in list)
{
	owner.AddCard(item2); // [!code --]
	if (!(item2.category.id == "relic")) // [!code ++]
	{ // [!code ++]
		owner.AddCard(item2); // [!code ++]
	} // [!code ++]
}
foreach (Thing item3 in list2)
{
```
