---
title: "大语言模型是怎么工作的"
weight: 10
date: 2026-09-17
draft: false
description: "从「预测下一个词」理解 LLM 的本质，以及预训练与微调两阶段。"
tags: ["LLM", "大模型", "Transformer"]
categories: ["大语言模型"]
---

## 本质：预测下一个词

LLM 干的事，简化到极致就一句话：

> 给定前面的文本，预测下一个最可能的词（token）。

```text
输入： "今天天气真"
输出： "好"（概率最高） / "热" / "不错" ...
```

把这个动作不断重复，就"生成"出了一整段话。看似简单，但当模型足够大、数据足够多时，它学会了语法、事实、推理甚至代码。

## 两个阶段

{{< mermaid >}}
flowchart LR
    A[海量文本] --> B["预训练<br/>学语言规律"]
    B --> C[基座模型]
    C --> D["微调 / 对齐<br/>学听指令、讲人话"]
    D --> E[可用的助手]
{{< /mermaid >}}

| 阶段 | 目标 | 数据 |
|------|------|------|
| 预训练 | 学通用语言能力 | 海量无标注文本 |
| 微调 (SFT) | 学会听从指令 | 指令-回答对 |
| 对齐 (RLHF/DPO) | 符合人类偏好 | 人类偏好数据 |

## 调用一个 LLM

```python
from anthropic import Anthropic

client = Anthropic()
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "用一句话解释什么是注意力机制"}],
)
print(message.content[0].text)
```

{{< alert "lightbulb" >}}
**关键概念——上下文窗口**：模型一次能"看到"的 token 数量有限。理解这个限制，是用好 LLM（以及后面 RAG）的前提。
{{< /alert >}}

## 延伸阅读

- `rasbt/LLMs-from-scratch` — 从零手写一个 GPT，强烈推荐
- `mlabonne/llm-course` — 带路线图的 LLM 课程
