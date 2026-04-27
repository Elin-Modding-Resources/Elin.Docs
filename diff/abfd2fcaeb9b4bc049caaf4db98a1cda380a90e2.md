---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 18 files modified. 1 new file created.
version: EA 23.299 Nightly
changes: BiomeProfile/Card/Chara/ConTransmuteHuman/GrowSystem/MATERIAL/Map/ModManager/Recipe/RecipeCard/Region/SerializedCards/SpriteData/SpriteReplacer/Trait/TraitBoat/TraitDrawingPaperM/+TraitSnitch/ZonePreEnterBout
---

# EA 23.299 Nightly

April 27, 2026

18 files modified. 1 new file created.

## Important Changes

Possible breaking changes. Click the filename to view the chunk.
### [Chara (1)](#chara)
```cs:no-line-numbers
public Point lastPos = new Point(); // [!code --]
public new Point lastPos = new Point(); // [!code ++]
```
## BiomeProfile

[`protected string _GetThing(string id)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/BiomeProfile.cs#L47-L53)
```cs:line-numbers=47
		{
			return "-";
		}
		SourceThing.Row row = EClass.editorSources.things.rows.First((SourceThing.Row a) => a.id == id); // [!code --]
		SourceThing.Row row = EClass.editorSources.things.rows.FirstOrDefault((SourceThing.Row a) => a.id == id); // [!code ++]
		if (row != null)
		{
			return row.id + "-(" + row.name_JP + ")";
```

[`protected IEnumerable<string> ThingRows()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/BiomeProfile.cs#L67-L73)
```cs:line-numbers=67

		protected string _GetObj(int id)
		{
			SourceObj.Row row = EClass.editorSources.objs.rows.First((SourceObj.Row a) => a.id == id); // [!code --]
			SourceObj.Row row = EClass.editorSources.objs.rows.FirstOrDefault((SourceObj.Row a) => a.id == id); // [!code ++]
			if (row != null)
			{
				return row.id + "-" + row.alias + "(" + row.name_JP + ")";
```

[`protected IEnumerable<string> ObjRows()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/BiomeProfile.cs#L87-L93)
```cs:line-numbers=87

		protected string _GetFloor(int id)
		{
			SourceFloor.Row row = EClass.editorSources.floors.rows.First((SourceFloor.Row a) => a.id == id); // [!code --]
			SourceFloor.Row row = EClass.editorSources.floors.rows.FirstOrDefault((SourceFloor.Row a) => a.id == id); // [!code ++]
			if (row != null)
			{
				return row.id + "-" + row.alias + "(" + row.name_JP + ")";
```

[`protected IEnumerable<string> FloorRows()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/BiomeProfile.cs#L107-L113)
```cs:line-numbers=107

		protected string _GetBlock(int id)
		{
			SourceBlock.Row row = EClass.editorSources.blocks.rows.First((SourceBlock.Row a) => a.id == id); // [!code --]
			SourceBlock.Row row = EClass.editorSources.blocks.rows.FirstOrDefault((SourceBlock.Row a) => a.id == id); // [!code ++]
			if (row != null)
			{
				return row.id + "-" + row.alias + "(" + row.name_JP + ")";
```

[`protected string _GetMat(int id)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/BiomeProfile.cs#L131-L137)
```cs:line-numbers=131
		{
			id = 0;
		}
		SourceMaterial.Row row = EClass.editorSources.materials.rows.First((SourceMaterial.Row a) => a.id == id); // [!code --]
		SourceMaterial.Row row = EClass.editorSources.materials.rows.FirstOrDefault((SourceMaterial.Row a) => a.id == id); // [!code ++]
		if (row != null)
		{
			return row.id + "-" + row.alias + "(" + row.name_JP + ")";
```

[`protected string _GetSpawnList(string id)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/BiomeProfile.cs#L155-L161)
```cs:line-numbers=155
		{
			return "-";
		}
		SourceSpawnList.Row row = EClass.editorSources.spawnLists.rows.First((SourceSpawnList.Row a) => a.id == id); // [!code --]
		SourceSpawnList.Row row = EClass.editorSources.spawnLists.rows.FirstOrDefault((SourceSpawnList.Row a) => a.id == id); // [!code ++]
		if (row != null)
		{
			return row.id;
```

[`public class Item : BaseItem`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/BiomeProfile.cs#L510-L518)
```cs:line-numbers=510
		{
			public int idObj;

			public override bool IsSpawnOnBlock => EClass.sources.objs.rows[idObj].tileType.IsBlockMount; // [!code --]
			public override bool IsSpawnOnBlock => EClass.sources.objs.map[idObj].tileType.IsBlockMount; // [!code ++]

			public override bool IsSpawnOnWater => EClass.sources.objs.rows[idObj].tileType.CanSpawnOnWater; // [!code --]
			public override bool IsSpawnOnWater => EClass.sources.objs.map[idObj].tileType.CanSpawnOnWater; // [!code ++]

			public string obj
			{
```

## Card

[`public enum MoveType`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Card.cs#L59-L64)
```cs:line-numbers=59

	public Point pos = new Point();

	public Point lastPos = new Point(); // [!code ++]
 // [!code ++]
	public CardRenderer renderer;

	public CardRow hat;
```

[`public byte[] c_textureData`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Card.cs#L1975-L1981)
```cs:line-numbers=1975
		}
	}

	public SourceMaterial.Row DyeMat => EClass.sources.materials.rows[c_dyeMat]; // [!code --]
	public SourceMaterial.Row DyeMat => EClass.sources.materials.map.TryGetValue(c_dyeMat) ?? EClass.sources.materials.map[1]; // [!code ++]

	public int invX
	{
```

[`public void Create(string _id, int _idMat = -1, int genLv = -1)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Card.cs#L2879-L2885)
```cs:line-numbers=2879
		bool flag = (bp != null && bp.fixedMat) || sourceCard.quality == 4 || sourceCard.tierGroup.IsEmpty();
		if (_idMat != -1)
		{
			_material = EClass.sources.materials.rows[_idMat]; // [!code --]
			_material = EClass.sources.materials.map.TryGetValue(_idMat) ?? EClass.sources.materials.map[1]; // [!code ++]
		}
		else if (!flag)
		{
```

[`public void DamageHP(long dmg, int ele, int eleP = 100, AttackSource attackSourc`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Card.cs#L4184-L4193)
```cs:line-numbers=4184
					{
						int num = chara4.Evalue(1241);
						int num2 = chara4.Evalue(438);
						if ((num != 0 || num2 != 0) && !chara4.IsDisabled && !chara4.isRestrained && (!IsPCFactionOrMinion || chara4.IsPCFactionOrMinion) && chara4.Dist(this) <= Mathf.Max(num, (num2 > 0) ? 1 : 0) && (num != 0 || num2 <= 0 || hp * 100 / MaxHP <= chara4.hp * 100 / chara4.MaxHP)) // [!code --]
						if ((num != 0 || num2 != 0) && !chara4.IsDisabled && !chara4.isRestrained && (!IsPCFactionOrMinion || chara4.IsPCFactionOrMinion) && (IsPCFactionOrMinion || !chara4.IsPCFactionOrMinion) && chara4.Dist(this) <= Mathf.Max(num, (num2 > 0) ? 1 : 0) && (num != 0 || num2 <= 0 || hp * 100 / MaxHP <= chara4.hp * 100 / chara4.MaxHP)) // [!code ++]
						{
							Say((num2 == 0) ? "wall_flesh" : "wall_knightly", chara4, this);
							chara4.DamageHP(dmg, ele, eleP, attackSource, origin, showEffect, weapon, Chara); // [!code --]
							chara4.DamageHP(dmg * (100 + ((num2 <= 0) ? 10 : 0)) / 100, ele, eleP, attackSource, origin, showEffect, weapon, Chara); // [!code ++]
							return;
						}
					}
```

[`public void DamageHP(long dmg, int ele, int eleP = 100, AttackSource attackSourc`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Card.cs#L4498-L4504)
```cs:line-numbers=4498
							Chara.AddCondition<ConFractured>((int)Mathf.Max(10f, 30f - Mathf.Sqrt(Evalue(436))));
							hp = Mathf.Min(half * (int)Mathf.Sqrt(Evalue(436) * 2) / 100, MaxHP / 3);
						});
						goto IL_10b3; // [!code --]
						goto IL_10dd; // [!code ++]
					}
				}
				if (zoneInstanceBout != null && (bool)LayerDrama.Instance)
```

[`public void DamageHP(long dmg, int ele, int eleP = 100, AttackSource attackSourc`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Card.cs#L4526-L4532)
```cs:line-numbers=4526
						if (EClass.player.invlunerable)
						{
							EvadeDeath(null);
							goto IL_10b3; // [!code --]
							goto IL_10dd; // [!code ++]
						}
					}
					if (Evalue(1220) > 0 && Chara.stamina.value >= (IsPC ? (Chara.stamina.max / 2) : (Chara.stamina.max / 3 * 2)))
```

[`public void DamageHP(long dmg, int ele, int eleP = 100, AttackSource attackSourc`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Card.cs#L4544-L4551)
```cs:line-numbers=4544
			}
		}
	}
	goto IL_10b3; // [!code --]
	IL_10b3: // [!code --]
	goto IL_10dd; // [!code ++]
	IL_10dd: // [!code ++]
	if (trait.CanBeAttacked)
	{
		renderer.PlayAnime(AnimeID.HitObj);
```

[`public MoveResult TryMoveFrom(Point p)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Card.cs#L6090-L6098)
```cs:line-numbers=6090
	point.Set(pos);
	point.x -= num;
	point.z -= num2;
	if (point.IsValid && !point.HasChara) // [!code --]
	if (point.IsValid && !point.HasChara && TryMove(point, allowDestroyPath: false) == MoveResult.Success) // [!code ++]
	{ // [!code ++]
		return MoveResult.Success; // [!code ++]
	} // [!code ++]
	for (int i = -1; i < 2; i++) // [!code ++]
	{
		return TryMove(point, allowDestroyPath: false); // [!code --]
		for (int j = -1; j < 2; j++) // [!code ++]
		{ // [!code ++]
			if (EClass.rnd(2) != 0) // [!code ++]
			{ // [!code ++]
				point.x = pos.x + j; // [!code ++]
				point.z = pos.z + i; // [!code ++]
				if (!point.Equals(lastPos) && point.IsValid && !point.HasChara && TryMove(point, allowDestroyPath: false) == MoveResult.Success) // [!code ++]
				{ // [!code ++]
					return MoveResult.Success; // [!code ++]
				} // [!code ++]
			} // [!code ++]
		} // [!code ++]
	}
	return MoveResult.Fail;
}
```

[`public ref Color GetRandomColor()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Card.cs#L6337-L6343)
```cs:line-numbers=6337
	}
	Rand.UseSeed(num, delegate
	{
		_randColor = EClass.sources.materials.rows[EClass.rnd(90)].matColor; // [!code --]
		_randColor = EClass.sources.materials.rows.RandomItem().matColor; // [!code ++]
	});
	return ref _randColor;
}
```

## Chara

[`public class Chara : Card, IPathfindWalker`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Chara.cs#L87-L93)
```cs:line-numbers=87

	public Chara master;

	public Point lastPos = new Point(); // [!code --]
	public new Point lastPos = new Point(); // [!code ++]

	public PathProgress path = new PathProgress();

```

[`public void TryPush(Point point)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Chara.cs#L3286-L3292)
```cs:line-numbers=3286
	}
	list.Copy().ForeachReverse(delegate(Chara c)
	{
		if (!c.ai.IsMoveAI && !c.IsPC && c.trait.CanBePushed && c != this && !c.noMove && (!EClass._zone.IsRegion || c.IsPCFactionOrMinion)) // [!code --]
		if ((trait is TraitSnitch && c.IsPCFactionOrMinion) || (!c.ai.IsMoveAI && !c.IsPC && c.trait.CanBePushed && c != this && !c.noMove && (!EClass._zone.IsRegion || c.IsPCFactionOrMinion))) // [!code ++]
		{
			List<Point> list2 = new List<Point>();
			for (int i = point.x - 1; i <= point.x + 1; i++)
```

## ConTransmuteHuman

[`public override void OnBeforeStart()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/ConTransmuteHuman.cs#L32-L56)
```cs:line-numbers=32
{
	if (chara == null)
	{
		List<Chara> list = owner.pos.ListCharasInRadius(owner, 5, delegate(Chara c) // [!code --]
		{ // [!code --]
			if (!c.IsMultisize && c.IsHumanSpeak) // [!code --]
			{ // [!code --]
				CardRenderer renderer = c.renderer; // [!code --]
				if (renderer != null && !renderer.hasActor) // [!code --]
				{ // [!code --]
					return !c.HasElement(1427); // [!code --]
				} // [!code --]
			} // [!code --]
			return false; // [!code --]
		}); // [!code --]
		List<Thing> list = owner.things.List((Thing t) => t.trait is TraitFigure { source: not null } traitFigure && !traitFigure.source.multisize, onlyAccessible: true); // [!code ++]
		if (list.Count > 0)
		{
			chara = list.RandomItem().Duplicate(); // [!code --]
			chara = CharaGen.Create((list.RandomItem().trait as TraitFigure).source.id); // [!code ++]
		}
		else
		{
			chara = CharaGen.CreateFromFilter("c_guest"); // [!code --]
			List<Chara> list2 = owner.pos.ListCharasInRadius(owner, 5, delegate(Chara c) // [!code ++]
			{ // [!code ++]
				if (!c.IsMultisize && c.IsHumanSpeak) // [!code ++]
				{ // [!code ++]
					CardRenderer renderer = c.renderer; // [!code ++]
					if (renderer != null && !renderer.hasActor) // [!code ++]
					{ // [!code ++]
						return !c.HasElement(1427); // [!code ++]
					} // [!code ++]
				} // [!code ++]
				return false; // [!code ++]
			}); // [!code ++]
			if (list2.Count > 0) // [!code ++]
			{ // [!code ++]
				chara = list2.RandomItem().Duplicate(); // [!code ++]
			} // [!code ++]
			else // [!code ++]
			{ // [!code ++]
				chara = CharaGen.CreateFromFilter("c_guest"); // [!code ++]
			} // [!code ++]
		}
	}
	base.OnBeforeStart();
```

## GrowSystem

[`public bool CanGrow(VirtualDate date)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/GrowSystem.cs#L294-L314)
```cs:line-numbers=294
	{
		return false;
	}
	if (EClass._zone.IsUnderwater) // [!code --]
	if (GrowUndersea) // [!code ++]
	{
		if (!GrowUndersea) // [!code --]
		if (EClass._zone.IsUnderwater || cell.sourceSurface.tileType.IsDeepWater) // [!code ++]
		{
			return false; // [!code --]
			return true; // [!code ++]
		}
	}
	else if (cell.sourceFloor.tileType.IsDeepWater) // [!code --]
	else if (EClass._zone.IsUnderwater) // [!code ++]
	{
		if (!GrowUndersea) // [!code --]
		{ // [!code --]
			return false; // [!code --]
		} // [!code --]
		return false; // [!code ++]
	}
	else if (!GrowOnLand) // [!code --]
	if (!GrowOnLand) // [!code ++]
	{
		return false;
	}
```

## MATERIAL

[`public class MATERIAL : EClass`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/MATERIAL.cs#L38-L52)
```cs:line-numbers=38

	public const int MaxTier = 7;

	public static SourceMaterial.Row sourceSnow = EClass.sources.materials.rows[48]; // [!code --]
	public static SourceMaterial.Row sourceSnow = EClass.sources.materials.map[48]; // [!code ++]

	public static SourceMaterial.Row sourceIce = EClass.sources.materials.rows[61]; // [!code --]
	public static SourceMaterial.Row sourceIce = EClass.sources.materials.map[61]; // [!code ++]

	public static SourceMaterial.Row sourceGold = EClass.sources.materials.rows[12]; // [!code --]
	public static SourceMaterial.Row sourceGold = EClass.sources.materials.map[12]; // [!code ++]

	public static SourceMaterial.Row sourceOak = EClass.sources.materials.rows[1]; // [!code --]
	public static SourceMaterial.Row sourceOak = EClass.sources.materials.map[1]; // [!code ++]

	public static SourceMaterial.Row sourceWaterSea => EClass.sources.materials.rows[88]; // [!code --]
	public static SourceMaterial.Row sourceWaterSea = EClass.sources.materials.map[88]; // [!code ++]

	public static SourceMaterial.Row FromElement(int id)
	{
```

## Map

[`public void _AddCard(int x, int z, Card t, bool onAddToZone)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Map.cs#L849-L854)
```cs:line-numbers=849
	{
		_RemoveCard(t);
	}
	t.lastPos.Set(t.pos); // [!code ++]
	t.pos.Set(x, z);
	if (t.IsMultisize)
	{
```

[`public void TryShatter(Point pos, int ele, int power)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Map.cs#L1307-L1313)
```cs:line-numbers=1307
				List<SourceThing.Row> list3 = new List<SourceThing.Row>();
				foreach (RecipeSource item4 in RecipeManager.list)
				{
					if (!(item4.row is SourceThing.Row { isOrigin: false } row) || row.components.IsEmpty() || (row.components.Length >= 3 && !row.components[2].StartsWith('+')) || !row.Category.IsChildOf("meal")) // [!code --]
					if (!(item4.row is SourceThing.Row { isOrigin: false } row) || row.components.IsEmpty() || (row.components.Length >= 3 && !row.components[2].StartsWith('+')) || !row.Category.IsChildOf("meal") || (row.HasTag(CTAG.dish_fail) && power > EClass.rnd(500))) // [!code ++]
					{
						continue;
					}
```

## ModManager

[`public void InitPackagesMeta()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/ModManager.cs#L480-L487)
```cs:line-numbers=480
	{
		try
		{
			package.Init(); // [!code --]
			mappedPackages[package.id] = package as ModPackage; // [!code --]
			if (package.Init()) // [!code ++]
			{ // [!code ++]
				mappedPackages[package.id] = package as ModPackage; // [!code ++]
			} // [!code ++]
			_loading?.Log(package.ToString());
		}
		catch (Exception ex)
```

## Recipe

[`public virtual SourceMaterial.Row GetMainMaterial()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Recipe.cs#L492-L505)
```cs:line-numbers=492
		{
			num = 3;
		}
		return EClass.sources.materials.rows[num]; // [!code --]
		return EClass.sources.materials.map.TryGetValue(num) ?? EClass.sources.materials.map[3]; // [!code ++]
	}

	public virtual SourceMaterial.Row GetColorMaterial()
	{
		if (idMat != -1)
		{
			return EClass.sources.materials.rows[idMat]; // [!code --]
			return EClass.sources.materials.map.TryGetValue(idMat) ?? EClass.sources.materials.map[3]; // [!code ++]
		}
		if (UseStock)
		{
```

[`public virtual SourceMaterial.Row GetColorMaterial()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Recipe.cs#L513-L526)
```cs:line-numbers=513
				}
				return thing.DyeMat;
			}
			return EClass.sources.materials.rows[3]; // [!code --]
			return EClass.sources.materials.map[3]; // [!code ++]
		}
		int num = ((ingredients.Count > 0) ? ingredients[source.colorIng].mat : 3);
		if (num == -1)
		{
			num = 3;
		}
		return EClass.sources.materials.rows[num]; // [!code --]
		return EClass.sources.materials.map.TryGetValue(num) ?? EClass.sources.materials.map[3]; // [!code ++]
	}

	public virtual void BuildIngredientList()
```

[`public virtual void Build(Chara chara, Card t, Point pos, int mat, int dir, int`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Recipe.cs#L630-L636)
```cs:line-numbers=630
	{
		mat = 2;
	}
	EClass.pc.PlaySound(EClass.sources.materials.rows[mat].GetSoundImpact()); // [!code --]
	SourceMaterial.Row row = EClass.sources.materials.map.TryGetValue(mat) ?? EClass.sources.materials.map[2]; // [!code ++]
	EClass.pc.PlaySound(row.GetSoundImpact()); // [!code ++]
	pos.cell.isModified = true;
	switch (source.type)
	{
```

[`public virtual void Build(Chara chara, Card t, Point pos, int mat, int dir, int`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Recipe.cs#L639-L645)
```cs:line-numbers=639
		int ramp = tileRow.id;
		if (ramp == 3)
		{
			ramp = EClass.sources.materials.rows[mat].ramp; // [!code --]
			ramp = row.ramp; // [!code ++]
		}
		if (EClass.scene.actionMode.IsRoofEditMode())
		{
```

## RecipeCard

[`public override void Build(Chara chara, Card t, Point pos, int mat, int dir, int`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/RecipeCard.cs#L459-L465)
```cs:line-numbers=459
	{
		mat = 2;
	}
	EClass.pc.PlaySound(EClass.sources.materials.rows[mat].GetSoundImpact()); // [!code --]
	SourceMaterial.Row row = EClass.sources.materials.map.TryGetValue(mat) ?? EClass.sources.materials.map[2]; // [!code ++]
	EClass.pc.PlaySound(row.GetSoundImpact()); // [!code ++]
	t.SetDir(dir);
	t.idSkin = idSkin;
	EClass._zone.AddCard(t, pos);
```

## Region

[`using System.Collections.Generic;`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Region.cs#L1-L5)
```cs:line-numbers=1
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization; // [!code ++]
using Newtonsoft.Json;
using UnityEngine;

```

[`public List<Chara> ListMobs()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Region.cs#L382-L385)
```cs:line-numbers=382
		}
		return list;
	}
 // [!code ++]
	[OnDeserialized] // [!code ++]
	private void _OnDeserialized(StreamingContext context) // [!code ++]
	{ // [!code ++]
		for (int num = children.Count - 1; num >= 0; num--) // [!code ++]
		{ // [!code ++]
			if (!EClass.sources.zones.map.ContainsKey(children[num].id)) // [!code ++]
			{ // [!code ++]
				RemoveChild(children[num]); // [!code ++]
			} // [!code ++]
		} // [!code ++]
	} // [!code ++]
}
```

## SerializedCards

[`public void Restore(Map map, Map orgMap, bool addToZone, PartialMap partial = nu`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/SerializedCards.cs#L777-L783)
```cs:line-numbers=777
		}
		if (version >= 2 && card4.idDyeMat != -1)
		{
			card2.Dye(EClass.sources.materials.rows.TryGet(card4.idDyeMat, 1)); // [!code --]
			card2.Dye(EClass.sources.materials.map.TryGetValue(card4.idDyeMat) ?? EClass.sources.materials.map[1]); // [!code ++]
		}
		card2.mapObj = card4.obj;
		if (card2.mapObj?.TryGetValue(2) != null)
```

## SpriteData

[`public void Init()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/SpriteData.cs#L40-L46)
```cs:line-numbers=40
		catch (Exception exception)
		{
			Debug.LogException(exception);
			Debug.LogError("#sprite failed to init '" + id + "' at " + path); // [!code --]
			Debug.LogError("#sprite failed " + id + "/" + path); // [!code ++]
		}
	}

```

## SpriteReplacer

[`public void BuildSuffixData(string id, Dictionary<string, string> dictTexItems)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/SpriteReplacer.cs#L122-L128)
```cs:line-numbers=122
			};
			spriteData.Init();
			suffixes[text4] = spriteData;
			Debug.Log("#sprite replacer init '" + text4 + "' at " + path.ShortPath()); // [!code --]
			Debug.Log("#sprite replacer " + text4.IsEmpty("<base>") + "/" + path.ShortPath()); // [!code ++]
		}
	}
}
```

## Trait

[`public Thing CreateStock()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/Trait.cs#L2302-L2307)
```cs:line-numbers=2302
			case ShopType.GeneralExotic:
				return FromFilter("shop_generalExotic");
			case ShopType.VMachine:
				if (EClass.rnd(10) == 0) // [!code ++]
				{ // [!code ++]
					return Create("wear_swim"); // [!code ++]
				} // [!code ++]
				if (EClass.rnd(10) == 0)
				{
					return Create("panty");
```

## TraitBoat

[`public SourceMaterial.Row GetWaterMat()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/TraitBoat.cs#L59-L64)
```cs:line-numbers=59
				mat = p.matFloor.id;
			}
		});
		return EClass.sources.materials.rows[mat]; // [!code --]
		return EClass.sources.materials.map.TryGetValue(mat) ?? EClass.sources.materials.map[67]; // [!code ++]
	}
}
```

## TraitDrawingPaperM

[`public class TraitDrawingPaperM : TraitDrawingPaper`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/TraitDrawingPaperM.cs#L4-L8)
```cs:line-numbers=4

	public override int Height => 64;

	public override int SizeGrid => 15; // [!code --]
	public override int SizeGrid => 12; // [!code ++]
}
```

## +TraitSnitch

::: details File Created
```cs
public class TraitSnitch : TraitUniqueMonster
{
}
```

:::
## ZonePreEnterBout

[`public override void Execute()`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/abfd2fcaeb9b4bc049caaf4db98a1cda380a90e2/Elin/ZonePreEnterBout.cs#L29-L42)
```cs:line-numbers=29
	for (int i = 0; i < EClass.pc.party.members.Count - 1; i++)
	{
		Chara chara = CharaGen.CreateFromFilter("c_neutral", target.LV + 10);
		Debug.Log(chara); // [!code --]
		chara.ChangeRarity(Rarity.Superior); // [!code --]
		if (chara.LV < target.LV) // [!code --]
		if (!(chara.trait is TraitMerchantTravel)) // [!code ++]
		{
			chara.SetLv(target.LV); // [!code --]
			chara.ChangeRarity(Rarity.Superior); // [!code ++]
			if (chara.LV < target.LV) // [!code ++]
			{ // [!code ++]
				chara.SetLv(target.LV); // [!code ++]
			} // [!code ++]
			EClass._zone.AddCard(chara, target.pos.GetNearestPoint(allowBlock: false, allowChara: false) ?? target.pos); // [!code ++]
			list.Add(chara); // [!code ++]
		}
		EClass._zone.AddCard(chara, target.pos.GetNearestPoint(allowBlock: false, allowChara: false) ?? target.pos); // [!code --]
		list.Add(chara); // [!code --]
	}
	Debug.Log(list.Count);
	foreach (Chara item in list)
```
