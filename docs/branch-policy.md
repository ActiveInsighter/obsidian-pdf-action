# 分支结构与清理规则

本仓库只长期保留两个核心分支：

```text
main
output
```

## main

`main` 是构建队列和项目源码分支，只保存：

- GitHub Actions workflow
- Node 构建脚本
- CSS / theme / 示例与文档
- 临时进入队列的 `inbox/YYYY/MM/YYYY-MM-DD/` 任务

`main` 不长期保存每天的 Markdown 原文、图片、附件或生成后的 PDF。构建成功后，`inbox` 日期目录默认会被消费删除。

## output

`output` 是唯一长期产物分支，只保存：

- PDF
- HTML
- 构建日志
- 手动运行或队列运行的输出结果

不要在 `output` 分支上修改源码。

## 临时分支

以下分支只用于一次开发、修复、样式实验、文档修改或 PDF 导出任务，合并后会自动清理：

```text
feature/*
fix/*
style/*
docs/*
test/*
export/*
chore/*
patch/*
patch-*
ai-export-*
```

推荐以后导出 PDF 时使用：

```text
export/YYYY-MM-DD-topic
```

例如：

```text
export/2026-07-02-markdown-stress-test
export/2026-07-02-machine-learning-review
```

## 自动删除策略

`.github/workflows/cleanup-branches.yml` 会在 PR 合并后运行。它会：

1. 检查 PR 是否已经 merged。
2. 确认 head branch 属于当前仓库。
3. 跳过受保护分支：`main`、`master`、`output`、`gh-pages`。
4. 只删除符合临时分支命名规则的 head branch。

这样 GitHub 的 Branches 页面只会长期留下 `main` 和 `output`，不会堆积历史 PR 分支。
