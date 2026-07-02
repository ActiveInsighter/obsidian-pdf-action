# ChatGPT Light Markdown/PDF Theme Test

这份文档用于测试 `chatgpt-light` 主题在 PDF 导出中的效果：正文、标题、列表、表格、代码块、引用块、Callout、任务列表与数学公式都会覆盖到。

普通段落应该接近 ChatGPT Web 端的浅色阅读感：背景是接近白色的 `#fcfcfc`，正文是高对比度黑色，行高更宽松，整体不应该显得拥挤。

## 1. 文本层级与行内元素

这是一段包含 **加粗文本**、*强调文本*、[链接样式](https://example.com)、`inline code`、==Obsidian 高亮== 的混合段落。中文和 English mixed text should keep stable spacing, and long inline content such as `const renderer = createMarkdownRenderer({ theme: "chatgpt-light" })` should wrap safely.

### 1.1 列表与任务列表

- 第一层无序列表：观察项目符号颜色和缩进。
- 第二项包含较长文本，用于测试自动换行是否自然，尤其是中文段落与英文单词混排时是否会出现奇怪断行。
  - 第二层列表：缩进应清晰但不要过大。
  - 第二层列表：行距应比正文略紧。
- 第三项结束。

1. 有序列表第一项：编号应与正文协调。
2. 有序列表第二项：这里加入行内公式 \( f(x)=x^2+2x+1 \)。
3. 有序列表第三项：结尾。

- [x] 已完成：新增 `themes/chatgpt-light.css`
- [x] 已完成：使用 manifest 指定主题
- [ ] 待观察：PDF 与 ChatGPT Web 端视觉一致性

## 2. 引用块与 Callout

> 这是普通引用块。它应该使用浅灰背景、柔和左边线和较淡的文字颜色，整体接近 ChatGPT 中引用内容的轻量块感。

> [!NOTE] 主题测试说明
> 这个 Callout 用于检查 Obsidian 风格语法经过脚本增强后，是否还能保持 ChatGPT 风格的浅色块、圆角和边框。

> [!WARNING] 注意
> PDF 是打印介质，分页、字体替换、代码高亮 token 和浏览器页面宽度都会让它不可能与 Web 端完全逐像素一致。

## 3. 表格

| 类型 | 期望效果 | 检查点 |
|---|---|---|
| 正文 | 黑色文字、宽松行高 | 是否接近 ChatGPT 文字密度 |
| 表头 | 浅灰背景、边框很淡 | 是否过重或过暗 |
| 代码 | `inline code` 背景为 `#ececec` | 是否与正文协调 |
| 长文本 | 这里是一段较长内容，用来测试表格单元格自动换行，不应该撑破页面，也不应该出现文字裁切。 | 是否正常换行 |

## 4. 代码块

```javascript
function renderMarkdown(input, theme = "chatgpt-light") {
  const options = {
    html: true,
    breaks: false,
    theme,
  };

  return markdownToPdf(input, options);
}

console.log(renderMarkdown("# Hello ChatGPT Theme"));
```

```python
def information_gain(parent_entropy, conditional_entropy):
    """Return the decision-tree information gain."""
    return parent_entropy - conditional_entropy

print(information_gain(0.940, 0.694))
```

```css
:root {
  --chatgpt-bg: #fcfcfc;
  --chatgpt-text: #0d0d0d;
  --chatgpt-code-bg: #f7f7f8;
}
```

## 5. 数学公式

行内公式示例：若样本均值为 \( \bar{x} \)，样本方差常写为 \( s^2=\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2 \)。

块级公式示例：

\[
\begin{aligned}
H(D) &= -\sum_{k=1}^{K} p_k\log_2 p_k \\
H(D\mid A) &= \sum_{v=1}^{V}\frac{|D_v|}{|D|}H(D_v) \\
Gain(D,A) &= H(D)-H(D\mid A)
\end{aligned}
\]

再测试一个较长公式：

\[
\begin{aligned}
\nabla \cdot \vec{F}
&= \frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z} \\
\iiint_{\Omega} \nabla \cdot \vec{F}\,dV
&= \iint_{\partial\Omega} \vec{F}\cdot\vec{n}\,dS
\end{aligned}
\]

## 6. 综合段落压力测试

当 Markdown 内容包含较长代码、数学公式、表格和中文解释时，PDF 主题最重要的是稳定：不能裁切、不能重叠、不能出现黑块，行距要比传统打印文档更接近 Web 阅读体验。

最后一段用于观察页面底部的页码、边距和背景色。若导出 PDF 中页面仍保持浅色背景、代码块柔和、标题不过分粗重，就说明这个主题可以作为 ChatGPT Web 风格的基础版本继续打磨。