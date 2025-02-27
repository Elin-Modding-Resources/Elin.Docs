---
title: Runtime
date: 2025/2/27 01:00
hide: true
---

## `Runtime`

[Namespace: `Cwl.Helper.Runtime;`](https://github.com/gottyduke/Elin.Plugins/tree/master/CustomWhateverLoader/Helper/Runtime)

A collection of helpers CWL uses internally to help with plugin development.

## `OverrideMethodComparer`

Finds all of a method's implementations in derived types including itself **from Elin and plugins**.
```cs:no-line-numbers
internal class PatchAllActPerforms
{
    internal static IEnumerable<MethodInfo> TargetMethods()
    {
        return OverrideMethodComparer.FindAllOverrides(typeof(Act), nameof(Act.Perform));
    }

    [HarmonyPrefix]
    internal static void OnPerform(Act __instance)
    {
        // ...
    }
}
```

You can also use the `IEqualityComparer` interface from `OverrideMethodComparer.Default`.

## `AttributeQuery`

Queries all methods/types with certain attribute data **from plugins**.
```cs:no-line-numbers
var methods = AttributeQuery.MethodsWith<CustomAttribute>();
var types = AttributeQuery.TypesWith<CustomAttribute>();
```

## `IntrospectCopy`

Copies field values between two objects with matching field names.
```cs:no-line-numbers
TypeA glue = new();
TypeB nails = new();
glue.InstrospectCopyTo(nails);
```

## `MethodDispatcher`

Dispatch method calls to an object. This is what CWL uses to raise events.
```cs:no-line-numbers
var instance = some object;
instance.InstanceDispatch("_ReceiveEvent", arg1, arg2);
```

You may use the return value of `DispatchResult` to check if it's invoked and/or return value with exceptions.

## `MethodStubHelper`

Generate stub wrappers for any method, and any method calls inside a method.
```cs:no-line-numbers
static MethodStubHelper CreateStub(MethodInfo targetMethod, MethodStub stub, string? alias = null);
static IEnumerable<MethodStubHelper> CreateNestedStubs(MethodInfo targetMethod, Func<MethodStub> stub);
```

A `MethodStub` is a class that implements the following method:
```cs:no-line-numbers
public abstract class MethodStub
{
    public virtual void OnEnable()
    {
    }

    public virtual void OnDisable()
    {
    }

    public abstract void Begin();
    public abstract void End();
}
```

`OnEnable` and `OnDisable` will be called when stub is attached/detached, when a method call is stubbed, it will call `Begin` before execution and `End` after execution.

## `DebugSampler`

A specialization of `MethodStub` that allows you to view any method's execution time in game. Use console command `cwl.stub.attach typeName methodName [true/false]` to add sampler, 3rd parameter denoting whether to stub all method calls inside the target method or just the target method itself.

Use `cwl.stub.detach` to clear and detach all samplers, and `cwl.stub.clear` to reset the sampled data for all samplers.

When done sampling, use `cwl.stub.dump` to output the metrics csv for graph generation.