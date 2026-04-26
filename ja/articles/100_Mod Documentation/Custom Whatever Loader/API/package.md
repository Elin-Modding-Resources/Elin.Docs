---
title: PackageIterator
date: 2025/1/3 01:00
hide: true
---

# `PackageIterator`

[Namespace: `Cwl.Helper.FileUtil;`](https://github.com/gottyduke/Elin.Plugins/tree/master/CustomWhateverLoader/Helper/FileUtil)

The core functionality used internally by CWL, to relocate files based on current lang code.

Provides utilities for iterating through package resources such as language files, sound files, and relocated files in each active mod's directory.

All methods are static withing class `PackageIterator`.

## Mod Folder
```cs:no-line-numbers
IEnumerable<DirectoryInfo> GetLoadedPackages(string? modGuid = null)
```

Get the root directory of the specified mod package guid, or all loaded packages with `null`.

## LangMod/**/
```cs:no-line-numbers
IEnumerable<DirectoryInfo> GetLangModFilesFromPackage(string? modGuid = null)
```

Get current language mapped folder of `LangMod/**/` from the specified mod package guid, or all loaded packages with `null`.

## Sound
```cs:no-line-numbers
IEnumerable<DirectoryInfo> GetSoundFilesFromPackage(string? modGuid = null)
```

Get the `Sound` folder of the specified mod package guid, or all loaded packages with `null`.

## Relocation
```cs:no-line-numbers
IEnumerable<FileInfo> GetRelocatedFilesFromPackage(string relativePath)
```

Get all relocated files from current language mapped folder using relative path from all loaded packages. For example, to get all `LangMod/**/Data/custom_data.json` from all active mods, use `GetRelocatedFilesFromPackage("Data/custom_data.json")`. Files returned are guaranteed to exist.

```cs:no-line-numbers
FileInfo? GetRelocatedFileFromPackage(string relativePath, string modGuid)
```

Get a relocated file from specified mod package guid, it might not exist.

## Excels
```cs:no-line-numbers
IEnumerable<ExcelData> GetRelocatedExcelsFromPackage(string relativePath, int startIndex = 5)
```

Get all relocated excel sheets akin to `GetRelocatedFilesFromPackage` but also instantiate them as `ExcelData` with `startIndex`.

```cs:no-line-numbers
ExcelData? GetRelocatedExcelFromPackage(string relativePath, string modGuid, int startIndex = 5)
```

Get a reloacted excel sheet from specified mod package guid, it might not exist.