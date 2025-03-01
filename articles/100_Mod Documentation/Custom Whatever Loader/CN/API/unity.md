---
title: Unity
date: 2025/1/3 01:00
hide: true
---

## `CoroutineHelper`

[命名空间: `Cwl.Helper.Unity;`](https://github.com/gottyduke/Elin.Plugins/tree/master/CustomWhateverLoader/Helper/Unity)

一种方便的方式来调用委托或协程，在任何上下文中，无论是否为 `MonoBehaviour` 实例。

### 立即
```cs:no-line-numbers
static void MyTask();

CoroutineHelper.Immediate(MyTask);
CoroutineHelper.Immediate(() => {
    // some other stuff
    MyTask();
});
```

在下一个 Unity `Update` 事件后立即调用委托。

```cs:no-line-numbers
static IEnumerator MyCoroutineTask();

CoroutineHelper.Immediate(MyCoroutineTask());
```

在下一个 Unity `Update` 事件后立即调用协程。

### 条件延迟

条件触发的核心。
```cs:no-line-numbers
static void CleanupTask();

CoroutineHelper.Deferred(CleanupTask, () => SomeCheck.ShouldClean);

static void AddStuffToPlayer(int id);

CoroutineHelper.Deferred(
    () => AddStuffToPlayer(114514),
    () => EMono.core.IsGameStarted);
```

当条件为真时调用委托。

### 帧延迟

有时你想延迟某些帧再执行你的动作。例如，在与 UI 相关的代码中，你可能希望先让 UI 刷新，然后在 1 帧后绘制你自己的内容，以适应新的位置/数据等。
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

### 时间延迟

有时你希望某个效果持续一段时间，然后再进行后续操作。
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

为异步方法提供在屏幕右上角显示状态文本的帮助类。
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

也可使用只在当前作用域显示并自动关闭的便捷重载:
```cs:no-line-numbers
static string currentLoading = "";

IEnumerator MyAsyncTask()
{
    using var progress = ProgressIndicator.CreateProgress(
        () => new UpdateInfo(Text: currentLoading, Sprite: null, Color: null)
    );

    foreach (var file in BunchOfFiles) {
        currentLoading = file.Name;
        yield return new SomeTask();
    }

    currentLoading = "finished loading";
}
```

## `CwlContextMenu`

便捷属性用于将方法注册到系统菜单。
```cs:no-line-numbers
[CwlContextMenu("菜单A/菜单B/按钮 C", "LangGeneral_ID_或者文本_或者省略")]
private static void MyTestMethod()
{
    // ...
}
```

注册的方法返回值将显示在屏幕上（如果有的话）。

## `ProgressIndicator`

用于在屏幕右上角显示异步操作的进度跟踪器。
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

    currentLoading = "加载完成";
    shouldClose = true;
}
```

您还可以使用作用域重载，它会在方法退出时自动关闭：
```cs:no-line-numbers
static string currentLoading = "";

IEnumerator MyAsyncTask()
{
    using var progress = ProgressIndicator.CreateProgressScoped(
        () => new UpdateInfo(currentLoading)
    );

    foreach (var file in BunchOfFiles) {
        currentLoading = file.Name;
        yield return new SomeTask();
    }

    currentLoading = "加载完成";
}
```

## `SpriteCreator`

帮助加载 PNG 作为 Sprite，带有缓存和调整大小选项。
```cs:no-line-numbers
Sprite? LoadSprite(this string path, Vector2? pivot = null, string? name = null, int resizeWidth = 0, int resizeHeight = 0);

var filePath = "X:/someimage.png";
var sprite = filePath.LoadSprite(name: "SpriteNewName", resizeWidth: 900, resizeHeight: 600);
```

默认情况下，轴心位于中心（`0.5, 0.5`），Sprite 名称将是内部缓存名称。如果 `resizeWidth` 和/或 `resizeHeight` 不为 `0`，则 Sprite 将被调整至指定大小。

## `ChildrenIterator`

帮助查找具有名称的 GameObject 的嵌套子对象。假设你想找到复合页面的布局组面板中列表元素的文本对象，你可以这样做：
```cs:no-line-numbers
var text = page.transform.GetFirstNestedChildWithName("Content View/Scroll View/Viewport/Content/Profile List/Entry (1)/text");
```

对于非嵌套访问，使用 `GetFirstChildWithName`。

如果未找到，则返回 `null`。

## 其他内容

一些你可能不需要的内容：

+ PixelRaycast
+ ColorParser
+ TextureResizer
+ ComponentFetch