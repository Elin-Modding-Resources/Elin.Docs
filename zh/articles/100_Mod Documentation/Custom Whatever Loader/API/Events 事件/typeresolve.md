---
title: Type Resolver
date: 2025/1/3 01:00
hide: true
---

# `TypeResolver`

[命名空间: `Cwl.API.Processors;`](https://github.com/gottyduke/Elin.Plugins/tree/master/CustomWhateverLoader/API/Processors)

游戏无法解析类型时引发的事件。主要由CWL自身使用。

## `TypeResolve`

```cs:no-line-numbers
delegate void TypeResolve(ref bool resolved, Type objectType, ref Type readType, string qualified);
// ->
static void MyTypeResolver(ref bool resolved, Type objectType, ref Type readType, string qualified)
{
    if (resolved || objectType != typeof(Zone)) {
        return;
    }

    readType = typeof(Zone_Fallback);
    resolved = true;
    // 如有需要，进行一些额外的清理
}
```

当`resolved`为`false`时，这意味着类型名称为`qualified`的`readType`无法实例化为`objectType`。如果您的解析器无法解析此类型，请直接返回并让下一个解析器处理，或者让游戏抛出异常。

如果您的处理程序能够解析此类型，请将`readType`更改为解析后的类型，并将`resolved`设置为`true`。

## 注册

```cs:no-line-numbers
TypeResolver.Add(MyTypeResolver);
```