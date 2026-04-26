---
title: Context Menu 菜单事件
date: 2025/6/20 01:00
hide: true
---

# `CwlContextMenu`

[命名空间: `Cwl.Helper.Unity;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/Helper/Unity/ContextMenuHelper.cs)

便捷特性用于将方法注册到Esc系统菜单。

```cs:no-line-numbers
[CwlContextMenu("LangGeneral_ID_或者_子菜单A/子菜单B/按钮C")]
private static void MyTestMethod()
{
    // ...
}
```

当使用 `LangGeneral` 条目作为按钮本地化时, 请使用英语斜杠 `/` 作为子菜单分隔符。

注册的方法如果有返回值，将作为字符串显示在屏幕上。
