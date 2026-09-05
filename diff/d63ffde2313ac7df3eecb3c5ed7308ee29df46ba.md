---
exclude: true
aside: false
pageClass: diff-single-page
footer: false
editLink: false
lastUpdated: false
description: 1 file modified.
version: +EA 23.343 Nightly - Plugin.UI
changes: Gauge
---

# +EA 23.343 Nightly - Plugin.UI

September 5, 2026

1 file modified.

## Important Changes

Possible breaking changes. Click the filename to view the chunk.
### [Gauge (1)](#gauge)
```cs:no-line-numbers
public void UpdateValue(int now, int _max) // [!code --]
public void UpdateValue(int now, int _max, int recovery = 0) // [!code ++]
```
## Gauge

[`public class Gauge : MonoBehaviour`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/d63ffde2313ac7df3eecb3c5ed7308ee29df46ba/Elin/Plugins.UI/Gauge.cs#L14-L18)
```cs:line-numbers=14
public RawImage bar;

public RawImage barRecover; // [!code ++]
 // [!code ++]
public SpriteRenderer srBar;

public float duration;
```

[`public class Gauge : MonoBehaviour`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/d63ffde2313ac7df3eecb3c5ed7308ee29df46ba/Elin/Plugins.UI/Gauge.cs#L31-L35)
```cs:line-numbers=31
[NonSerialized]
public float lastValue = -1f;

[NonSerialized] // [!code ++]
public float lastRecovery = -1f; // [!code ++]
 // [!code ++]
[NonSerialized]
public bool first = true;
```

[`public void UpdateValue(float now, float _max)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/d63ffde2313ac7df3eecb3c5ed7308ee29df46ba/Elin/Plugins.UI/Gauge.cs#L70-L76)
```cs:line-numbers=70
	UpdateValue((int)(now * 100f), (int)(_max * 100f));
}

public void UpdateValue(int now, int _max) // [!code --]
public void UpdateValue(int now, int _max, int recovery = 0) // [!code ++]
{
	max = _max;
	if (!base.gameObject.activeSelf)
```

[`public void UpdateValue(int now, int _max)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/d63ffde2313ac7df3eecb3c5ed7308ee29df46ba/Elin/Plugins.UI/Gauge.cs#L86-L92)
```cs:line-numbers=86
	bgBar.SetActive(!hideBar);
}
value = (float)now / (float)max;
if (value == lastValue) // [!code --]
if (value == lastValue && (float)recovery == lastRecovery) // [!code ++]
{
	return;
}
```

[`public void UpdateValue(int now, int _max)`](https://github.com/Elin-Modding-Resources/Elin-Decompiled/blob/d63ffde2313ac7df3eecb3c5ed7308ee29df46ba/Elin/Plugins.UI/Gauge.cs#L116-L149)
```cs:line-numbers=116
		TweenUtil.KillTween(ref tween);
		if ((bool)bar)
		{
			RectTransform rectTransform = bar.Rect(); // [!code --]
			Vector2 vector = new Vector2(originalWidth * value, rectTransform.sizeDelta.y); // [!code --]
			if (first) // [!code --]
			SetRect(bar, value); // [!code ++]
			if ((bool)barRecover) // [!code ++]
			{
				rectTransform.sizeDelta = vector; // [!code --]
				first = false; // [!code --]
				return; // [!code --]
				SetRect(barRecover, (float)(now + recovery) / (float)max); // [!code ++]
			}
			tween = rectTransform.DOSizeDelta(vector, duration); // [!code --]
		}
		else if ((bool)srBar)
		{
			Vector2 vector2 = new Vector2(value * 100f, srBar.size.y); // [!code --]
			Vector2 vector = new Vector2(value * 100f, srBar.size.y); // [!code ++]
			if (first)
			{
				srBar.size = vector2; // [!code --]
				srBar.size = vector; // [!code ++]
				first = false;
				return;
			}
			tween = DOTween.To(() => srBar.size, delegate(Vector2 x)
			{
				srBar.size = x;
			}, vector2, duration); // [!code --]
			}, vector, duration); // [!code ++]
		}
		else
		{
			barCircle.fillAmount = value;
		}
		lastValue = value;
		lastRecovery = recovery; // [!code ++]
		void SetRect(RawImage bar, float value) // [!code ++]
		{ // [!code ++]
			value = Mathf.Clamp(value, 0f, 1f); // [!code ++]
			RectTransform rectTransform = bar.Rect(); // [!code ++]
			Vector2 vector2 = new Vector2(originalWidth * value, rectTransform.sizeDelta.y); // [!code ++]
			if (first) // [!code ++]
			{ // [!code ++]
				rectTransform.sizeDelta = vector2; // [!code ++]
				first = false; // [!code ++]
			} // [!code ++]
			else // [!code ++]
			{ // [!code ++]
				tween = rectTransform.DOSizeDelta(vector2, duration); // [!code ++]
			} // [!code ++]
		} // [!code ++]
	}
}
```
