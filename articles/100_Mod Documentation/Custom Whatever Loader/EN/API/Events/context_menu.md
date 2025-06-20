---
title: Context Menu
date: 2025/6/20 01:00
hide: true
---

# `CwlContextMenu`

[Namespace: `Cwl.Helper.Unity;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/Helper/Unity/ContextMenuHelper.cs)

Qol attribute to register a method to system context menu.
```cs:no-line-numbers

[CwlContextMenu("SubmenuA/SubmenuB/Btn C", "LangGeneral_id_or_text_or_omit")]
private static void MyTestMethod()
{
    // ...
}
```

The registered method's return value will be displayed as string on screen, if any provided.
