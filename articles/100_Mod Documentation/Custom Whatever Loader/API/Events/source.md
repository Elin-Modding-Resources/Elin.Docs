---
title: Source Import
date: 2025/1/3 01:00
hide: true
---

# `WorkbookProcessor`

[Namespace: `Cwl.API.Processors;`](https://github.com/gottyduke/Elin.Plugins/tree/master/CustomWhateverLoader/API/Processors)

Event raised when a source workbook gets imported. Offers both pre-process and post-process events.

## `WorkbookProcess`

```cs:no-line-numbers
delegate void WorkbookProcess(IWorkbook workbook);
```

# `SheetProcessor`

Namespace: `Cwl.API.Processors;`

Event raised when a source sheet gets imported. Offers both pre-process and post-process events.

## `SheetProcess`

```cs:no-line-numbers
delegate void SheetProcess(ISheet sheet);
```

# Register

```cs:no-line-numbers
WorkbookProcessor.Add(MyBookProcessor, post: true);
SheetProcessor.Add(MySheetProcessor, post: true);
```

The bool parameter `post` determines whether this is a post-process event or a pre-process event.