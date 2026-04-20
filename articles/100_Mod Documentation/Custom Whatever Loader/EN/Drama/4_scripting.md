---
title: Drama Scripting
author: DK
description: Write C# scripts inside drama sheets.
date: 2026/4/19 17:00
tags: Guide/CWL/Drama
---

# Drama Scripting

You can run **C# code** directly in a drama sheet using the `eval` action.

It offers the same scripting power as regular CWL, with these differences:

- Script state is tied to the current drama instance (persists until the drama ends, then auto-resets).
- Shortcuts: `dm` = DramaManager, `line` = current line `Dictionary<string, string>`, `tg` = target `Chara`, `pc` = player `Chara`.

![](../../assets/drama/drama_eval.png)

**Return value behavior:**
- `bool` + valid `jump` target → determines whether to jump.
- `string` + `jump` cell set to `eval_result` → uses the string as the new jump target.
- No return value → treated as a simple action.

Import a script file from the same folder with: `<<<script_snippet.cs`

### Passing Variables

Use the shared `Script` dictionary:

```cs
// First eval
var value = EClass.rnd(100) * 5;
Script["random_value"] = value;

// Later eval
var value = (int)Script["random_value"];
```

### Common Examples

| Function                        | Code                                              |
|---------------------------------|---------------------------------------------------|
| Jump to step                    | `DramaExpansion.Goto("my_new_step");`            |
| Add "Let's chat!" option        | `DramaExpansion.InjectUniqueRumor();`            |
| Add temporary talk              | `DramaExpansion.AddTempTalk("topic", "actor", "jump");` |
| Get Chara instance              | `var chara = dm.GetChara("tg");`                 |
| Recruit to party                | `chara.MakeAlly();`                              |
| Modify level                    | `chara.SetLv(chara.LV + 5);`                     |

Need help? Ask on Elona Discord: **@freshcloth** or [reach via email](mailto:dk@elin-modding.net).
