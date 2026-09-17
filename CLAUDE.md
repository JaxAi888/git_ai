# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目

基于 **Hugo + Blowfish 主题** 的 AI 学习个人技术博客，部署到 GitHub Pages。中文内容，图文笔记为主。

## 常用命令

```bash
hugo server -D           # 本地预览（含草稿），默认 http://localhost:1313/
hugo --gc --minify       # 构建生产版本到 public/
hugo new posts/xxx.md    # 新建博客文章
```

首次克隆仓库后需先装主题（`.gitignore` 已排除，CI 会自动装）：

```bash
git clone --depth 1 https://github.com/nunocoracao/blowfish.git themes/blowfish
```

## 结构

- `config/_default/` — 站点配置。`hugo.toml`(主配置/baseURL)、`languages.zh-cn.toml`(标题/作者)、`menus.zh-cn.toml`(导航)、`params.toml`(主题参数)、`markup.toml`(代码高亮)
- `content/posts/` — **博客**：按时间线的随笔，front matter 用 `date` 排序
- `content/learning/` — **知识库**：结构化笔记，每个子目录是一个板块，用 `weight` 控制章节顺序（`params.toml` 中 `[list] orderByWeight = true`）
- `content/about/` — 关于页
- `static/images/`、`assets/img/` — 图片资源
- `.github/workflows/hugo.yml` — 自动部署，构建时用 `configure-pages` 输出的 base_url

## 关键约定

- **两条内容主线**：博客（时间线）与知识库（结构化），对应 `posts/` 和 `learning/`
- **baseURL 含子路径** `/git_ai/`（仓库名非 `<用户名>.github.io`）。本地预览无妨，线上由 CI 的 `--baseURL` 覆盖为正确值
- 主题目录 `themes/blowfish/` 自带一份面向主题开发者的 CLAUDE.md 和 SKILL.md，与本站使用无关，不要在那里改动
- 作者头像默认注释掉了；放一张图到 `assets/img/author.jpg` 后在 `languages.zh-cn.toml` 取消 `image` 注释
