---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 1 file modified.
version: +EA 23.348 Nightly - Plugin.UI
changes: UIList
---

# +EA 23.348 Nightly - Plugin.UI

September 22, 2026

1 file modified.

## Important Changes

**None.**
## UIList

[`public struct ButtonPair`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/64814db82ebfa7cbadb3da1358f33a3cd3e9da7a/Elin/Plugins.UI/UIList.cs#L321-L326)
```cs:line-numbers=321
[NonSerialized]
public float dragScrollSpeed = 2.5f;

[NonSerialized] // [!code ++]
public Action<object> onDragBegin; // [!code ++]
 // [!code ++]
public LayoutGroup layoutItems => _layoutItems ?? (_layoutItems = GetComponent<LayoutGroup>());

public GridLayoutGroup gridLayout => layoutItems as GridLayoutGroup;
```

[`public void BeginItemDrag(UIListDragItem drag)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/64814db82ebfa7cbadb3da1358f33a3cd3e9da7a/Elin/Plugins.UI/UIList.cs#L867-L872)
```cs:line-numbers=867
	if (callbacks.CanDragReorder(drag.item))
	{
		dragTarget = drag.item;
		dragBeginIndex = drag.transform.GetSiblingIndex(); // [!code --]
		dragBeginIndex = (dragHoverIndex = drag.transform.GetSiblingIndex()); // [!code ++]
		onDragBegin?.Invoke(drag.item); // [!code ++]
	}
}
```

[`public void EndItemDrag(UIListDragItem drag)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/64814db82ebfa7cbadb3da1358f33a3cd3e9da7a/Elin/Plugins.UI/UIList.cs#L875-L885)
```cs:line-numbers=875
{
	if (dragTarget != null)
	{
		int num = dragHoverIndex - dragBeginIndex; // [!code --]
		int a = dragHoverIndex - dragBeginIndex; // [!code ++]
		dragTarget = null;
		if (num != 0) // [!code --]
		{ // [!code --]
			callbacks.OnDragReorder(drag.item, num); // [!code --]
		} // [!code --]
		callbacks.OnDragReorder(drag.item, a); // [!code ++]
	}
}
```
