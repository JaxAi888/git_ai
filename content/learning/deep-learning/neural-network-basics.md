---
title: "神经网络是怎么学习的"
weight: 10
date: 2026-09-17
draft: false
description: "从一个神经元讲到反向传播的直觉。"
tags: ["深度学习", "神经网络", "反向传播"]
categories: ["深度学习"]
---

## 一个神经元

一个神经元做的事很简单：**加权求和，再过一个激活函数**。

```text
输出 = 激活函数( w1·x1 + w2·x2 + ... + b )
```

把很多神经元堆成层，层层相连，就成了神经网络。

## 它是怎么"学"的

学习 = 不断调整权重 `w` 和偏置 `b`，让预测越来越接近真实值。四步循环：

```goat
前向传播  →  算损失  →  反向传播  →  更新权重
   ↑_____________________________________|
```

1. **前向传播**：输入过网络得到预测
2. **算损失**：预测和真实值差多少
3. **反向传播**：用链式法则算出每个参数对损失的"贡献"（梯度）
4. **更新权重**：沿梯度反方向微调参数

## PyTorch 最小实现

```python
import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(10, 32),
    nn.ReLU(),
    nn.Linear(32, 1),
)
loss_fn = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

x = torch.randn(64, 10)
y = torch.randn(64, 1)

pred = model(x)              # 1. 前向
loss = loss_fn(pred, y)      # 2. 损失
loss.backward()              # 3. 反向（自动求梯度）
optimizer.step()             # 4. 更新
optimizer.zero_grad()
```

{{< alert "lightbulb" >}}
**直觉**：反向传播就是在问「每个参数往哪个方向调一点点，能让误差变小」，然后所有参数一起朝那个方向挪一小步。
{{< /alert >}}
