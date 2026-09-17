---
title: "RAG：给大模型外挂一个知识库"
weight: 10
date: 2026-09-17
draft: false
description: "为什么需要 RAG，以及检索增强生成的基本流程。"
tags: ["RAG", "Agent", "向量检索"]
categories: ["Agent / RAG"]
---

## 为什么需要 RAG

LLM 有两个天生的短板：

1. **知识有截止日期**——训练后发生的事它不知道
2. **会一本正经地胡说**（幻觉）——尤其在私有/专业领域

**RAG（Retrieval-Augmented Generation，检索增强生成）** 的思路很朴素：**回答前，先去知识库里查资料，再让模型基于查到的资料作答。**

## 基本流程

{{< mermaid >}}
flowchart LR
    A[用户提问] --> B["向量检索<br/>从知识库"]
    B --> C[取回相关文档]
    C --> D["拼进 Prompt<br/>作为上下文"]
    D --> E[LLM 作答]
{{< /mermaid >}}

1. 把知识库文档切块、转成向量，存进向量数据库
2. 用户提问时，把问题也转成向量，检索最相似的文档块
3. 把检索到的内容拼进 Prompt，连同问题一起交给 LLM
4. 模型基于**真实资料**作答，幻觉大幅减少

## 极简伪代码

```python
# 1. 离线：文档入库
chunks = split(documents)
vector_db.add(embed(chunks))

# 2. 在线：检索 + 生成
def answer(question):
    docs = vector_db.search(embed(question), top_k=3)   # 检索
    context = "\n".join(docs)
    prompt = f"参考资料：\n{context}\n\n问题：{question}"
    return llm(prompt)                                   # 增强生成
```

{{< alert >}}
**Agent 与 RAG 的关系**：RAG 是 Agent 最常用的能力之一。Agent 更进一步——它能自己决定「什么时候该检索、该调用哪个工具、下一步做什么」。
{{< /alert >}}

## 延伸阅读

- `Shubhamsaboo/awesome-llm-apps` — 100+ 个 Agent 与 RAG 实战案例
