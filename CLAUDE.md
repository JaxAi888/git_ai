# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目

纯静态个人知识库站点（无构建步骤）。设计来自 WorkBuddy 原型 v4：左侧粘性侧栏 + 银河封面 + 靛蓝/青色设计系统。部署到 GitHub Pages。

线上地址：https://jaxai888.github.io/git_ai/

## 常用命令

```bash
python3 -m http.server 1313   # 本地预览 http://localhost:1313/
```

改完 HTML/CSS/JS 直接 `git push`，GitHub Actions 会把仓库根目录部署到 Pages。根目录有 `.nojekyll`，避免 Jekyll 处理。

## 结构

- `index.html` 首页（银河封面、置顶介绍、四板块入口、精选、最新文章）
- `agents.html` Agent 五阶段学习路线
- `articles.html` 技术文章年份归档 + 分类筛选
- `projects.html` 大模型应用开发项目
- `interview.html` AI 面试题（可展开答案）
- `about.html` 关于 Jax
- `post.html` 文章详情示范页
- `404.html` 自定义 404
- `assets/site.css` 全站设计令牌与组件
- `assets/site.js` 主题切换、分类筛选、侧栏搜索、订阅提示、目录滚动高亮
- `assets/galaxy-cover.jpg` 银河封面

## 关键约定

- 主题记忆键 `jax-ai-theme`；每页 `<head>` 内联脚本在 CSS 前写入 `data-theme`，避免深色刷新闪白
- 侧栏导航、搜索、页脚在各页手工同步（纯静态，无模板引擎）
- 分类筛选依赖 `data-filter` / `data-cat`；年份分组用 `data-year-block`
- 仓库部署在 `https://jaxai888.github.io/git_ai/`，资源用相对路径（`assets/...`、`index.html`），不要用根路径 `/`
