## 求根公式合集

### 一元一次方程

通式：$ax+b=0$。

1. 消去一次项系数 $x + \frac{b}{a}=0$

2. 移项 $x = -\frac{b}{a}$

一元一次方程求根公式：$x = -\frac{b}{a}$

### 一元二次方程

通式：$ax^2+bx+c=0$。

1. 消去二次项系数 $x^2+\frac{b}{a}x+\frac{c}{a}=0$

2. 换元，$p=\frac{b}{a},q=\frac{c}{a}$

3. 原方程变为 $x^2+px+q=0$

4. 配方一次项 $x^2+px+(\frac{p}{2})^2-(\frac{p}{2})^2+q=0$

5. 配方 $(x+\frac{p}{2})^2-(\frac{p}{2})^2+q=0$

6. 移项 $(x+\frac{p}{2})^2=(\frac{p}{2})^2-q$

7. 右边通分 $(x+\frac{p}{2})^2=\frac{p^2-4q}{4}$

8. 开平方 $x+\frac{p}{2}=\pm\sqrt{\frac{p^2-4q}{4}}$

9. 移项 $x=-\frac{p}{2}\pm\sqrt{\frac{p^2-4q}{4}}$

8. 整理 $x=\frac{-p\pm\sqrt{p^2-4q}}{2}$

9. 带入 $a, b, c$ $x = \frac{-b\pm\sqrt{b^2-4ac}}{2a}$

#### 验证

$x^2+3x+2=0$，容易观察到 $x_1=-1,x_2=-2$。

$x=\frac{-3\pm\sqrt{3^2-4\times1\times2}}{2\times1}=-\frac{3}{2}\pm\frac{\sqrt{1}}{2}$

$x_1=-1,x_2=-2$，与观察得到的结果相符。

### 一元三次方程

通式：$ax^3+bx^2+cx+d=0$。

1. 消去三次项系数 $x^3+\frac{b}{a}x^2+\frac{c}{a}x+\frac{d}{a} = 0$

2. 配（三次）方 $(x+\frac{b}{3a})^3-3(\frac{b}{3a})^2x+\frac{c}{a}x+\frac{d}{a}-\frac{b^3}{27a^3}=0$

3. 合并同次项 $(x+\frac{b}{3a})^3+(\frac{c}{a}-\frac{b^2}{3a^2})x+\frac{d}{a}-\frac{b^3}{27a^3}=0$

4. 换元 $y=(x+\frac{b}{3a})$

5. 整理 $y^3+(\frac{c}{a}-\frac{b^2}{3a^2})y+(\frac{d}{a}-\frac{b^3}{27a^3}-\frac{b}{3a}(\frac{c}{a}-\frac{b^2}{3a^2}))=0$。

6. **换元** $p=\frac{3ac-b^2}{3a^2}$，$q=\frac{2b^3+27a^2d-9abc}{27a^3}$。

7. 简化的一般形式 $y^3+py+q=0$。

8. 核心一步：换元 $u+v=y$，$(u+v)^3=u^3+3u^2v+3uv^2+v^3=u^3+3uvy+v^3$

9. 原式化为 $(u+v)^3=0$；和如下方程：

10. 方程 
$$
\begin{aligned}
3uv &=& -p\newline
u^3 + v^3 &=& -q
\end{aligned}
$$

11. 换元 $m = u^3,n=v^3$。

12. $mn = u^3v^3=\frac{(1)^3}{27}=\frac{-p^3}{27}$
$$
\begin{aligned}
mn &= \frac{-p^3}{27}\newline
m + n &= -q
\end{aligned}
$$

由于这里有两组解，不难发现如果 $(a,b)$ 为解那么自然 $(b,a)$ 就是另一组解，不影响答案。

13. 转化为经典二元二次方程组。$(m-n)^2=(m+n)^2-4mn$，即可求得 $(m-n)$。

14. $(m-n)=\sqrt{q^2+\frac{4}{27}p^3}$。

15. 
$$
\begin{aligned}
u&= \sqrt[3]{-\frac{q}{2}+\sqrt{\frac{q^2}{4}+\frac{p^3}{27}}}\newline
v&= \sqrt[3]{-\frac{q}{2}-\sqrt{\frac{q^2}{4}+\frac{p^3}{27}}}\newline
y&= u+v=\sqrt[3]{-\frac{q}{2}+\sqrt{\frac{q^2}{4}+\frac{p^3}{27}}}+\sqrt[3]{-\frac{q}{2}-\sqrt{\frac{q^2}{4}+\frac{p^3}{27}}}
\end{aligned}
$$

最终答案：

$$
\begin{aligned}
p&=\frac{3ac-b^2}{3a^2}\newline
q&=\frac{2b^3+27a^2d-9abc}{27a^3}\newline
x&=-\frac{b}{3a}+\sqrt[3]{-\frac{q}{2}+\sqrt{\frac{q^2}{4}+\frac{p^3}{27}}}+\sqrt[3]{-\frac{q}{2}-\sqrt{\frac{q^2}{4}+\frac{p^3}{27}}}
\end{aligned}
$$