---
title: "什么是机器学习"
weight: 10
date: 2026-09-17
draft: false
description: "用最直白的方式理解机器学习的三类范式与核心流程。"
tags: ["机器学习", "入门"]
categories: ["机器学习基础"]
---

## 一句话定义

> 机器学习 = 从数据中自动找出规律（模型），并用它对新数据做预测。

传统编程是「人写规则」，机器学习是「机器从数据里学规则」。

## 三类范式

| 范式 | 数据 | 目标 | 例子 |
|------|------|------|------|
| 监督学习 | 有标签 | 学输入到输出的映射 | 垃圾邮件分类 |
| 无监督学习 | 无标签 | 发现数据内在结构 | 用户分群 |
| 强化学习 | 环境反馈 | 学最优决策策略 | 下棋、机器人 |

## 核心流程

```goat
数据  →  特征  →  模型  →  预测  →  评估
              ↑___________________|
                   反馈调整
```

## 最小示例

```python
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)                 # 训练：从数据学规律
print("准确率:", model.score(X_test, y_test))  # 评估：在没见过的数据上验证
```

{{< alert >}}
**关键直觉**：模型好不好，看的是它在**没见过的数据**上的表现，而不是训练数据。这就是「泛化能力」。
{{< /alert >}}
