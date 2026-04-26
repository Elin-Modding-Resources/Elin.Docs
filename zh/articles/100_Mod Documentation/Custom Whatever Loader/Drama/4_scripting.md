---
title: 脚本
author: DK
date: 2026/4/19 17:00
hide: true
---

## 剧情脚本

你可以在剧情表中使用 `eval` 动作直接运行 **C# 代码**。

它提供与常规 CWL 相同的脚本能力，但存在以下差异：

- 脚本状态与当前剧情实例绑定（会一直持续到剧情结束，然后自动重置）。
- 快捷方式：`dm` = DramaManager，`line` = 当前行（`Dictionary<string, string>`），`tg` = 目标 `Chara`，`pc` = 玩家 `Chara`。

![](./assets/drama_eval.png)

**返回值行为：**
- 返回 `bool` 类型 + 有效的 `jump` 目标 → 决定是否执行跳转。
- 返回 `string` 类型 + `jump` 单元格设置为 `eval_result` → 使用该字符串作为新的跳转目标。
- 没有返回值 → 被视为普通动作执行。

可以使用以下方式从同一文件夹导入脚本文件：`<<<script_snippet.cs`

## 传递变量

使用共享的 `Script` 字典：

```cs
// 第一次 eval
var value = EClass.rnd(100) * 5;
Script["random_value"] = value;

// 后续 eval
var value = (int)Script["random_value"];
```

## 常用示例

| 功能                        | 代码                                              |
|-----------------------------|---------------------------------------------------|
| 跳转到指定步骤              | `DramaExpansion.Goto("my_new_step");`            |
| 添加“来聊聊吧！”选项       | `DramaExpansion.InjectUniqueRumor();`            |
| 添加临时对话                | `DramaExpansion.AddTempTalk("topic", "actor", "jump");` |
| 获取 Chara 实例             | `var chara = dm.GetChara("tg");`                 |
| 招募到队伍                  | `chara.MakeAlly();`                              |
| 修改等级                    | `chara.SetLv(chara.LV + 5);`                     |

需要帮助？请在 Elona Discord 上联系：**@freshcloth** 或 [通过邮件](mailto:dk@elin-modding.net)。

国内玩家也可以通过Elin模组讨论群(872068953)交流。