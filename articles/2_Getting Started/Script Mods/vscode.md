---
title: VSCode Specific Instructions
author: hi117
description: Specific steps that are helpful for VSCode development
date: 2025/09/04 22:02
tags: Guide/VSCode/C#
---

# VSCode Specific Stuff

While Rider is the recomended IDE, some might prefer VSCode. To get Elin development running smoothly in VScode, these instructions might be helpful.

## Extensions

The following extensions aid in developing mods for Elin on VSCode:

1. [C# for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) - basic C# support
2. [Unity for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=VisualStudioToolsForUnity.vstuc) - Enables debugging running code


## Debugging

Instructions for debugging differ slightly compared to Rider. Upstram documentation is available [here](https://code.visualstudio.com/docs/other/unity).

Follow the instructions in [debugging](./debugging) to replace the mono dll with the debug version. Then create the following `.vscode/launch.json` file:

```json
{
  "configurations": [
    {
      "name": "Attach to Elin",
      "type": "vstuc",
      "request": "attach",
      "endPoint": "127.0.0.1:55555"
    }
  ]
}
```

You can now attach to a running instance of Elin using the normal menu for VSCode under the debugging tab (CTRL+Shift+D).