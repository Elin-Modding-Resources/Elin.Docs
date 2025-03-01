---
title: Unity
date: 2025/1/3 01:00
hide: true
---

## `CoroutineHelper`

[Namespace: `Cwl.Helper.Unity;`](https://github.com/gottyduke/Elin.Plugins/tree/master/CustomWhateverLoader/Helper/Unity)

A convenient way to invoke a delegate or a coroutine, in any scope or context, regardless of being a `MonoBehaviour` instance or not.

### Immediate
```cs:no-line-numbers
static void MyTask();

CoroutineHelper.Immediate(MyTask);
CoroutineHelper.Immediate(() => {
    // some other stuff
    MyTask();
});
```

Invoke the delegate after the next immediate Unity `Update` event.

```cs:no-line-numbers
static IEnumerator MyCoroutineTask();

CoroutineHelper.Immediate(MyCoroutineTask());
```

Invoke the coroutine after the next immediate Unity `Update` event.

### Condition Defer

The bread and butter of conditional triggers.
```cs:no-line-numbers
static void CleanupTask();

CoroutineHelper.Deferred(CleanupTask, () => SomeCheck.ShouldClean);

static void AddStuffToPlayer(int id);

CoroutineHelper.Deferred(
    () => AddStuffToPlayer(114514),
    () => EMono.core.IsGameStarted);
```

Invoke the delegate when the condition is true.

### Frame Defer

Sometimes you want to delay your action by certain frames. For example, in UI related code, you may want to let UI refresh first then draw your own stuff 1 frame afterwards to accomodate the new position/data etc.
```cs:no-line-numbers
static void AdjustPosition();

// default 1 frame
CoroutineHelper.Deferred(AdjustPosition);
// specify frames
CoroutineHelper.Deferred(AdjustPosition, 5);
// anonymous lambda works too
CoroutineHelper.Deferred(
    () => {
        // some other stuff
        AdjustPosition();
    },
    5);
```

### Time Defer

Sometimes you want an effect to linger for a certain amount of time, then do actions afterwards.
```cs:no-line-numbers
static void ClearEffects();

// wait 1.5s
CoroutineHelper.Deferred(ClearEffects, 1.5f);
CoroutineHelper.Deferred(
    () => {
        // some other stuff
        ClearEffects();
    },
    1.5f);
```

## `ProgressIndicator`

Helper to display a progress tracker for async operations on screen top right corner.
```cs:no-line-numbers
static string currentLoading = "";
static bool shouldClose;

IEnumerator MyAsyncTask()
{
    var progress = ProgressIndicator.CreateProgress(
        onUpdate: () => new UpdateInfo(Text: currentLoading, Sprite: null, Color: null),
        shouldKill: () => shouldClose
    );

    foreach (var file in BunchOfFiles) {
        currentLoading = file.Name;
        yield return new SomeTask();
    }

    currentLoading = "finished loading";
    shouldClose = true;
}
```

You may also use the scope-exit overload which closes when disposed:
```cs:no-line-numbers
static string currentLoading = "";

IEnumerator MyAsyncTask()
{
    using var progress = ProgressIndicator.CreateProgressScoped(
        () => new UpdateInfo(Text: currentLoading, Sprite: null, Color: null)
    );

    foreach (var file in BunchOfFiles) {
        currentLoading = file.Name;
        yield return new SomeTask();
    }

    currentLoading = "finished loading";
}
```

## `SpriteCreator`

Helper to load a png as a sprite with caching and resizer option.
```cs:no-line-numbers
Sprite? LoadSprite(this string path, Vector2? pivot = null, string? name = null, int resizeWidth = 0, int resizeHeight = 0);

var filePath = "X:/someimage.png";
var sprite = filePath.LoadSprite(name: "SpriteNewName", resizeWidth: 900, resizeHeight: 600);
```

By default, the pivot will be at center (`0.5, 0.5`) and sprite name will be an internal cache name. If `resizeWidth` and/or `resizeHeight` is not `0`, then sprite will be resized.

## `ChildrenIterator`

Helper to find a nested child of a gameobject with name. Say you want to find the text object of an element of a list of a panel of a layout group of a composite page, you can do:
```cs:no-line-numbers
var text = page.transform.GetFirstNestedChildWithName("Content View/Scroll View/Viewport/Content/Profile List/Entry (1)/text");
```

For non nested access, use `GetFirstChildWithName`.

Returns `null` if not found.

## Other Stuff

Some helpers and random stuff that you won't need:

+ PixelRaycast
+ ColorParser
+ TextureResizer
+ ComponentFetch