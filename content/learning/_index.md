---
title: "知识库"
description: "按主题体系化整理的 AI 学习笔记：机器学习基础、深度学习、大模型与 Agent。"
cascade:
  showEdit: false
---

这里是**按主题组织的结构化笔记**，区别于[博客](/posts/)的时间线随笔。建议按下面的路线循序渐进。

## 学习路线

{{< mermaid >}}
flowchart LR
    A["机器学习基础<br/>入门"] --> B["深度学习<br/>进阶"]
    B --> C["大语言模型 LLM<br/>核心"]
    C --> D["Agent / RAG<br/>应用"]
{{< /mermaid >}}

## 四大板块

{{< alert "circle-info" >}}
每个板块下的文章按 `weight` 从小到大排序，代表建议的阅读顺序。
{{< /alert >}}

- **[机器学习基础](/learning/ml-basics/)** — 监督/无监督学习、线性模型、评估指标
- **[深度学习](/learning/deep-learning/)** — 神经网络、反向传播、CNN/RNN/Transformer
- **[大语言模型 LLM](/learning/llm/)** — 预训练、微调、Prompt 工程、推理优化
- **[Agent / RAG](/learning/agents/)** — 检索增强、工具调用、多智能体

学习原则：**读一门课 → 整理成笔记 → 写可运行的代码验证**。
