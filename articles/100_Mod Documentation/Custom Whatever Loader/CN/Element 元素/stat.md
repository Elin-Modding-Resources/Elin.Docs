---
title: Condition 状态
date: 2025/1/3 01:00
hide: true
---

## 自定义状态

CWL 可以导入您的自定义状态表（表名: Stat）并将其添加到游戏中。然而，您的自定义状态有以下几项需要注意：

**id**：一个唯一的数字，这是状态的ID。  
**alias**：状态的别名，字符串ID。  
**type**：与此状态对应的C#类型名称。  

其余的由您定义。您可以参考[Elin Modding Wiki](https://elin-modding-resources.github.io/Elin.Docs/)或Elin Sources。

自定义状态类必须从 **Condition** 派生，常见的类有 **Condition**，**BadCondition**，**BaseDebuff** 等。
```cs
internal class ConCarbonated: ConDrunk;
```

自定义状态还可以拥有自定义图标，您的图标需要放置在 **Texture** 文件夹中，使用与 **alias** 相同的文件名，例如 **ConCarbonated.png**。

如果纹理大小不是32x32，CWL会将其调整为32x32。
