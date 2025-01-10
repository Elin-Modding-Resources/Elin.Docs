---
title: Type Resolver
date: 2025/1/3 01:00
hide: true
---

# `TypeResolver`

[Namespace: `Cwl.API.Processors;`](https://github.com/gottyduke/Elin.Plugins/tree/master/CustomWhateverLoader/API/Processors)

Event raised when game fails to resolve a type. Mostly just used by CWL itself.

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
    // do some additional clean up if needed
}
```

When `resolved` is `false`, that means `readType` with a qualified name `qualified` cannot be assigned to `objectType`. If your resolver can't resolve this type, simply return and let the next resolver handle it or let the game throw.

If your handler is able to resolve this, mutate `readType` to the resolved type and set `resolved` to `true`.

## Register

```cs:no-line-numbers
TypeResolver.Add(MyTypeResolver);
```