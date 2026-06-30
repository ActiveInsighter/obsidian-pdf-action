# Obsidian Style PDF Action

这个仓库用于把 Markdown 笔记自动导出为接近 Obsidian 阅读模式风格的 PDF。

核心流程：

```text
Markdown -> HTML -> CSS -> Chromium -> PDF
```

## 文件说明

```text
notes.md                         示例笔记入口
style.css                        PDF 与 HTML 样式
scripts/build-pdf.mjs            Markdown 转 HTML/PDF 脚本
.github/workflows/build-pdf.yml  GitHub Actions 自动构建配置
package.json                     Node 依赖与脚本
```

## 使用方式

把你的 Markdown 内容放进 `notes.md`，然后提交到 GitHub。仓库会自动运行 GitHub Actions，生成的 PDF 在：

```text
Actions -> Build Obsidian Style PDF -> Artifacts -> obsidian-style-pdf
```

也可以在 Actions 页面手动运行工作流。

## 本地运行

```bash
npm install
npm run build:pdf
```

生成结果位于：

```text
dist/notes.pdf
```

如果只想生成 HTML 预览：

```bash
npm run build:html
```

生成结果位于：

```text
dist/notes.html
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

### Obsidian Callout

```markdown
> [!NOTE] 提示
> 这是一个提示块。

> [!IMPORTANT] 重点
> 这是一个重点块。
```

### 图片

图片建议放在 `images/` 文件夹中，然后在 Markdown 中引用：

```markdown
![示例图片](images/example.png)
```

## 注意

- 浏览器打印 PDF 的优点是 CSS 控制能力强，适合做 Obsidian 风格、代码块、浅灰背景、卡片化排版。
- 如果要做严格论文排版，或者非常复杂的长公式排版，可以考虑 XeLaTeX 路线。
