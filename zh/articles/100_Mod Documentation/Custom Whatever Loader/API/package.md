---
title: PackageIterator
date: 2025/1/3 01:00
hide: true
---

# `PackageIterator`

[命名空间: `Cwl.Helper.FileUtil;`](https://github.com/gottyduke/Elin.Plugins/tree/master/CustomWhateverLoader/Helper/FileUtil)

CWL内部使用的核心功能，根据当前语言代码重定位文件。

提供用于检索Mod资源的工具，例如语言资源、音频资源和每个启用Mod目录中的文件。

所有方法都是`PackageIterator`类中的静态方法。

## Mod
```cs:no-line-numbers
IEnumerable<DirectoryInfo> GetLoadedPackages(string? modGuid = null)
```

获取指定GUID的Mod根目录，或指定所有启用的Mod（使用`null`）。

## LangMod/**/
```cs:no-line-numbers
IEnumerable<DirectoryInfo> GetLangModFilesFromPackage(string? modGuid = null)
```

从指定GUID的Mod获取当前语言映射的`LangMod/**/`文件夹，或指定所有启用的Mod（使用`null`）。

## Sound
```cs:no-line-numbers
IEnumerable<DirectoryInfo> GetSoundFilesFromPackage(string? modGuid = null)
```

从指定GUID的Mod获取`Sound`文件夹，或指定所有启用的Mod（使用`null`）。

## Relocation
```cs:no-line-numbers
IEnumerable<FileInfo> GetRelocatedFilesFromPackage(string relativePath)
```

使用相对路径从所有启用的Mod中获取当前语言映射文件夹中的所有重定位的文件。例如，要获取所有`LangMod/**/Data/custom_data.json`，使用`GetRelocatedFilesFromPackage("Data/custom_data.json")`。只有存在的文件会被返回。

```cs:no-line-numbers
FileInfo? GetRelocatedFileFromPackage(string relativePath, string modGuid)
```

使用相对路径从指定GUID的Mod获取一个重定位的文件，可能不存在。

## Excels
```cs:no-line-numbers
IEnumerable<ExcelData> GetRelocatedExcelsFromPackage(string relativePath, int startIndex = 5)
```

获取所有重定位的Excel表格，类似于`GetRelocatedFilesFromPackage`，但它们将实例化为使用`startIndex`的`ExcelData`。

```cs:no-line-numbers
ExcelData? GetRelocatedExcelFromPackage(string relativePath, string modGuid, int startIndex = 5)
```

从指定GUID的Mod获取一个重定位的Excel表格，可能不存在。