# ChatGPT Dark Pure Black Theme Test

这份文档用于检查深色主题是否已经做到页面背景、整体背景、代码块背景、表格背景全部纯黑。

## 1. 普通文本与公式

普通正文应该是白色文字，页面和正文区域背景都应该是纯黑。行内公式：\( f(x)=x^2+2x+1 \)，复杂度：\( O(\log n) \)。

块级公式：

\[
\begin{aligned}
H(D) &= -\sum_{k=1}^{K} p_k\log_2 p_k \\
Gain(D,A) &= H(D)-H(D\mid A)
\end{aligned}
\]

## 2. 代码块测试

代码块背景必须是纯黑，不要深灰块。

```python
def binary_search(nums, target):
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1
```

```javascript
const users = [
  { id: 1, name: "Tom", active: true },
  { id: 2, name: "Alice", active: false },
];

console.log(users.filter((user) => user.active));
```

## 3. 表格测试

表格、表头、单元格背景都必须是纯黑，只保留很淡的边界线。

| 模块 | 期望背景 | 状态 | 说明 |
| :--- | :--- | :---: | :--- |
| 页面 | 纯黑 `#000` | ✅ | 包含 PDF 页边距区域 |
| 正文区域 | 纯黑 `#000` | ✅ | 不要深灰容器 |
| 代码块 | 纯黑 `#000` | ✅ | 不要 `#171717` |
| 表格 | 纯黑 `#000` | ✅ | 表头和单元格都纯黑 |

## 4. 引用与 Callout

> 普通引用块也应该是纯黑背景，只保留左边线。

> [!NOTE]
> Callout 背景也应该是纯黑，不要深灰块。

## 5. HTML 与 inline code

`inline code` 也先做成纯黑背景，只用边框区分。

<details>
<summary>展开测试</summary>

折叠块背景也应该保持纯黑。

\[
E = mc^2
\]

</details>

---

结尾：如果看到任何大块深灰背景，就说明还需要继续压背景色。
