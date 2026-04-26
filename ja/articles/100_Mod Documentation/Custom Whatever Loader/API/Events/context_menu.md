---
title: Context Menu
date: 2025/6/20 01:00
hide: true
---

# `CwlContextMenu`

[Namespace: `Cwl.Helper.Unity;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/Helper/Unity/ContextMenuHelper.cs)

便捷機能は、メソッドをEscシステムメニューに登録するために使用されます。

```cs:no-line-numbers
[CwlContextMenu("LangGeneral_ID_または_サブメニューA/サブメニューB/ボタンC")]
private static void MyTestMethod()
{
    // ...
}
```

`LangGeneral`エントリをボタンのローカライズに使用する場合、サブメニューの区切りには英語のスラッシュ `/` を使用してください。

登録されたメソッドに戻り値がある場合、その値は文字列として画面に表示されます。