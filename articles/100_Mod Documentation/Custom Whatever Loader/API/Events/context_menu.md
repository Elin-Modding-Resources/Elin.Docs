---
title: Context Menu
date: 2025/6/20 01:00
hide: true
---

# `CwlContextMenu`

[Namespace: `Cwl.Helper.Unity;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/Helper/Unity/ContextMenuHelper.cs)

Qol attribute to register a method to system context menu.
```cs:no-line-numbers

[CwlContextMenu("LangGeneral_ID_or_SubmenuA/SubmenuB/ButtonC")]
private static void MyTestMethod()
{
    // ...
}
```

When using a `LangGeneral` entry to localize the button, use the English slash `/` as the submenu separator.

If the registered method has a return value, it will be displayed on the screen as a string.