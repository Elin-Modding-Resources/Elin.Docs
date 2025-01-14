---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 1 file modified.
version: +EA 23.76 Nightly - Plugin.UI
changes: UIDragPanel
---

# +EA 23.76 Nightly - Plugin.UI

January 14, 2025

1 file modified.

## Important Changes

**None.**
## UIDragPanel

[`@@ -4,6 +4,8 @@`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/76ceefc75b0c3cd89aea240a57522df4fdea33ce/Elin/Plugins.UI/UIDragPanel.cs#L4-L9)
```cs:line-numbers=4

public class UIDragPanel : MonoBehaviour, IPointerDownHandler, IEventSystemHandler, IPointerUpHandler, IDragHandler, IChangeResolution, IInitializePotentialDragHandler
{
	public static bool dragging; // [!code ++]
 // [!code ++]
	private Vector2 originalLocalPointerPosition;

	private Vector3 originalPanelLocalPosition;
```

[`@@ -58,14 +60,19 @@ public void OnPointerDown(PointerEventData data)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/76ceefc75b0c3cd89aea240a57522df4fdea33ce/Elin/Plugins.UI/UIDragPanel.cs#L58-L71)
```cs:line-numbers=58
			}
			originalPanelLocalPosition = target.localPosition;
			RectTransformUtility.ScreenPointToLocalPointInRectangle(container, data.position, data.pressEventCamera, out originalLocalPointerPosition);
			dragging = true; // [!code ++]
		}
	}

	public void OnPointerUp(PointerEventData data)
	{
		if (enable && data.button == PointerEventData.InputButton.Left && axisY && axisX && autoAnchor) // [!code --]
		if (enable && data.button == PointerEventData.InputButton.Left) // [!code ++]
		{
			target.SetAnchor(); // [!code --]
			if (axisY && axisX && autoAnchor) // [!code ++]
			{ // [!code ++]
				target.SetAnchor(); // [!code ++]
			} // [!code ++]
			dragging = false; // [!code ++]
		}
	}

```
