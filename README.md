# Obsidian Style PDF Action

这个仓库用于把 Markdown 笔记自动导出为接近 Obsidian 阅读模式风格的 PDF。

核心流程：

```text
Markdown -> HTML -> CSS -> Chromium -> PDF
```

## 分支结构

本仓库只长期保留两个核心分支：

```text
main
output
```

`main` 是源码和构建队列分支，只保存构建脚本、样式、workflow、文档和临时 `inbox` 任务。`main` 不长期保存每天的 Markdown 原文、图片、附件或生成后的 PDF。

`output` 是唯一长期产物分支，用来保存生成后的 PDF、HTML 和构建日志。不要在 `output` 上改源码。

临时开发或导出分支建议使用：

```text
feature/*
fix/*
style/*
docs/*
test/*
export/*
chore/*
```

PR 合并后，`cleanup-branches` workflow 会自动删除符合规则的同仓库临时分支，并保护 `main`、`output` 等长期分支。

详细规则见：

```text
docs/branch-policy.md
docs/workflow-guide.md
```

## 当前推荐工作流：manifest 构建队列

仓库现在支持把 `main` 当作“构建队列”使用：

```text
内容分支 -> PR / 合并到 main -> Action 读取 inbox 里的 manifest -> 生成 PDF/HTML -> 发布到 output 分支 -> 成功后删除 inbox 任务 -> 删除已合并临时分支
```

`main` 不再需要长期保存每天的 Markdown 原始内容。每天的临时任务放到 `inbox/` 下，构建成功后默认自动消费删除。

推荐目录：

```text
inbox/
  2026/
    07/
      2026-07-02/
        manifest.yml
        md/
          001-条件熵与信息增益.md
          002-PCA协方差矩阵.md
        img/
          entropy.png
          pca.png
        attachments/
          source.pdf
```

Markdown 中引用当天图片时，建议从 `md/` 指向 `img/`：

```markdown
![示例图片](../img/entropy.png)
```

## manifest.yml 规范

每个日期目录必须有一个 manifest 文件，文件名只能是：

```text
manifest.yml
manifest.yaml
manifest.json
```

推荐使用 `manifest.yml`。

最小示例：

```yaml
version: 1
date: 2026-07-02
title: 2026-07-02 机器学习复习

jobs:
  - id: daily-merged
    type: merge
    title: 2026-07-02 机器学习复习合集
    inputs: all
    sort: filename
    page_break: true
    output: 2026-07-02-机器学习复习合集.pdf
```

完整示例见：

```text
docs/manifest.example.yml
```

### 字段说明

```yaml
version: 1
```

必须为 `1`。

```yaml
date: 2026-07-02
```

日期必须是 `YYYY-MM-DD`，并且要和目录 `inbox/YYYY/MM/YYYY-MM-DD/` 一致。

```yaml
jobs:
```

构建任务数组，至少一个。

每个 job 支持：

```yaml
id: daily-merged
```

任务 ID，只能包含字母、数字、点、下划线、连字符，并且必须以字母或数字开头。

```yaml
type: single
```

或：

```yaml
type: merge
```

`single` 表示把选中的 Markdown 分别转成 PDF；`merge` 表示把选中的 Markdown 按顺序拼成一个 PDF。

```yaml
inputs: all
```

表示处理当天 `md/` 目录下所有 Markdown。

也可以指定某一个或几个：

```yaml
inputs:
  - md/001-条件熵与信息增益.md
  - md/002-PCA协方差矩阵.md
```

```yaml
sort: filename
```

当 `inputs: all` 时，建议使用 `filename`，即按文件名排序。指定数组时默认按 manifest 中的顺序。

```yaml
output: 2026-07-02-合集.pdf
```

用于 `merge`，也可以用于只有一个输入的 `single`。

```yaml
output_dir: selected
```

用于多个输入的 `single`，会把多个 PDF 输出到这个目录下。

```yaml
page_break: true
```

用于 `merge`，表示每篇 Markdown 之间分页。

### consume 策略

默认不需要写 `consume`。构建成功、artifact 上传成功、`output` 分支发布成功后，Action 会删除对应的 `inbox/YYYY/MM/YYYY-MM-DD/` 任务目录。

只有调试时才建议显式保留任务目录：

```yaml
consume:
  delete_after_success: false
```

失败时不会删除 `inbox` 任务，方便排查。

## GitHub Actions 行为

`main` 分支的自动构建只监听：

```text
inbox/**/manifest.yml
inbox/**/manifest.yaml
inbox/**/manifest.json
inbox/**/md/**
inbox/**/img/**
inbox/**/attachments/**
scripts/**
package.json
.github/workflows/build-pdf.yml
```

单独修改 `style.css` 或 `themes/**` 不会触发历史重建。下一次有 manifest 任务进入队列时，会自然使用最新样式。

构建结果会：

```text
1. 上传到 Actions artifact: obsidian-style-pdf
2. 发布到 output 分支，按日期长期保存
3. 默认删除 main 上对应 inbox 任务目录
```

## 手动运行

### 构建队列

```bash
npm run build:queue
```

### 构建某一天

```bash
npm run build:day -- 2026-07-02
```

或者：

```bash
npm run build:day -- inbox/2026/07/2026-07-02/manifest.yml
```

### 构建单篇 Markdown

```bash
npm run build:single -- inbox/2026/07/2026-07-02/md/001-条件熵与信息增益.md
```

### 校验 manifest

```bash
npm run validate:manifest -- inbox/2026/07/2026-07-02/manifest.yml
```

### 清理已合并临时分支

```bash
npm run cleanup:branches
```

### 兼容旧入口

仍然保留旧入口：

```bash
npm run build:pdf
npm run build:html
```

旧入口继续使用：

```text
notes.md -> dist/notes.pdf
```

## 支持的常用语法

### 标题、表格、代码块

普通 Markdown 语法都可以使用。

### 数学公式

支持 Obsidian 常见的公式写法：

```text
行内公式：\( x^2 + y^2 = r^2 \)

块级公式：
\[
E = mc^2
\]
```

也兼容美元符号公式。
