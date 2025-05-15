---
title: Resource Relocator
date: 2025/5/15 01:00
hide: true
---

# `Resources.Load`

[Namespace: `Cwl.Patches.Relocation;`](https://github.com/gottyduke/Elin.Plugins/blob/master/CustomWhateverLoader/Patches/Relocation/LoadResourcesPatch.cs)

A custom unity `Resources.Load` fallback handler.  

## Relocate

Your loader must use the following signature:
```cs
static bool RelocateXXX(string path, ref Object? loaded)
```

If you are able to resolve the path and load the resource, assign the value to the `ref Object? loaded` and return `true`, otherwise do nothing and return `false`.

## Register

Then register with CWL:
```cs
LoadResourcesPatch.AddHandler<T>(RelocateXXX);
```

CWL internally uses `RelocateSound` and `RelocateSprite` for external sound files and sprite files lookup.
```cs
LoadResourcesPatch.AddHandler<SoundData>(DataLoader.RelocateSound);
LoadResourcesPatch.AddHandler<Sprite>(DataLoader.RelocateSprite);
```
