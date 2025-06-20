---
title: Context Menu 菜单事件
date: 2025/6/20 01:00
hide: true
---

# `CwlContextMenu`

[命名空间: `Cwl.Helper.Unity;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/Helper/Unity/ContextMenuHelper.cs)

便捷属性用于将方法注册到Esc系统菜单。

```cs:no-line-numbers
[CwlContextMenu("菜单A/菜单B/按钮 C", "LangGeneral_ID_或者文本_或者省略")]
private static void MyTestMethod()
{
    // ...
}
```

注册的方法如果有返回值，将作为字符串显示在屏幕上。
