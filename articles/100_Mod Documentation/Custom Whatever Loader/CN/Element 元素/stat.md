---
title: Condition 状态
date: 2025/1/3 01:00
hide: true
---

## 自定义状态

自定义状态类必须从 **Condition** 派生，常见的类有 **Condition**，**BadCondition**，**BaseDebuff** 等。
```cs
internal class ConCarbonated: ConDrunk;
```

自定义状态还可以拥有自定义图标，您的图标需要放置在 **Texture** 文件夹中，使用与 **alias** 相同的文件名，例如 **ConCarbonated.png**。

如果纹理大小不是32x32，CWL会将其调整为32x32。
