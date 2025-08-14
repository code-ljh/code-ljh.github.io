## 莫队学习笔记

### 算法思想

莫队是一个非常经典的根号复杂度的数据结构，在 2009~2010 期间由前中国国家队成员发明，并以其姓命名。

基本的莫队算法维护一个序列 $a_1,a_2,\dots,a_n$，其支持在 $\mathcal{O}(n\sqrt{n})$ 的复杂度内完成 $n$ 个离线的区间查询。

什么样的区间查询可以被莫队维护？如果一个区间 $[l, r]$ **可以在较小的时间复杂度内转化为与其临近的四个区间** $[l+1,r]$、$[l-1,r]$、$[l, r+1]$、$[l,r-1]$，那么莫队就可以在 $\mathcal{O}(n\sqrt{n})$ 倍的转化复杂度时间内完成 $n$ 个查询。

不同于传统的线段树，线段树要求区间可以维护，需要满足区间的信息有结合律、可合并，父亲节点的权值可以在 $\mathcal{O}(1)$ 复杂度由两个儿子 pushup 得来。显然莫队能维护的更多，但是代价是一般的莫队**不支持修改**。

### 算法流程

首先，如果我们只用将一个区间转化为临近的四区间，有一个显然的暴力就是将第一个询问算出，然后依次暴力移动区间计算询问的答案。这个做法的复杂度是 $\mathcal{O}(n^2)$。

此时我们考虑将所有询问离线下来，在允许离线、无修改的情况下，所有的询问地位等价，因此可以**重新排列**询问的顺序，使我们上面的暴力复杂度优化，再结合**分块**的思想，我们可以给序列分块，将所有询问按照左端点在哪一段分类，对于每一段我们只需要 $\mathcal{O}(n)$ 的做，那我们总复杂度便是 $\mathcal{O}(n\sqrt{n})$ 可以接受的范围了。

分类后，如果我们在按照右端点排序，那么此类询问右端点最多移动 $\mathcal{O}(n)$ 次，这是显然的，因为右端点只加不减；此类询问左端点之间绝对值只差最多为 $\mathcal{O}(\sqrt{n})$，由一个询问变到另一个询问左端点最多移动 $\mathcal{O}(\sqrt{n})$ 次。综上所述，莫队算法的时间复杂度是 $\mathcal{O}(n\sqrt{n})$，乘上单次移动区间的复杂度。

莫队的核心思想就是**将离线下来的询问区间分块排序**。

### 代码实现

#### 套路

- 将所有询问排序，按照左端点分的块为第一关键字，右端点为第二关键字排序。
- 将第一个询问的答案暴力算出。
- 依次算下一个询问，暴力移动全局的区间到下一个询问的区间。

莫队题的核心便在于全局的区间**到底维护什么**，其他的都是板子。

### 例题

### [P1494 [国家集训队] 小 Z 的袜子](https://www.luogu.com.cn/problem/P1494)；

#### 题目大意

给定一个序列 $a_1,a_2,...,a_n$ 和 $m$ 个询问，每个询问给出一个区间，问在这个区间中随机选择两个不同的元素，这两个元素相同的概率。

$n,m \leq 5 \times 10^4$；

#### 转化题意

“这个区间中随机选择两个不同的元素，这两个元素相同的概率。” 根据我们小学的概率知识：

$$
P(\text{The two chosen elements are same}) = \dfrac{C(\text{chosen same})}{C(\text{total})}
$$

- $C(\text{total})$ 很好算，直接用组合数 $C^2_{r-l+1}$ 即可。
- $C(\text{chosen same})$ 就是我们需要维护的东西了。

尝试一下 OI 经典套路：【拆贡献】；

$$
\begin{aligned}
C(\text{chosen same}) &= \sum_{a=1}^{\text{elements}} C(\text{chosen same with }a)\newline
&= \sum_{a=1}^{\text{elements}} C(\text{choose two in the set including only }a)\newline
&= \sum_{a=1}^{\text{elements}} C^2_{\text{cnt}(a)} (\text{Where cnt(}a\text{) is the count of }a\text{ in the range})
\end{aligned}
$$

因此，我们全局的区间直接维护每种元素的出现次数，以及 $\text{ans}$ 为上面的那个式子的结果。

移动区间可以 $\mathcal{O}(1)$ 是显然的。于是就做完了。

#### 例题代码

```cpp
#include <bits/stdc++.h>
#define int long long

constexpr int maxn = 65536;

struct Global {
	int L, R;
	int Count[maxn];
	int Answer;
	
	Global() {
		L = 1, R = 1;
		memset(Count, 0, sizeof Count);
		Answer = 0;
	} 
	
	void Modify(int Col, int Adjust) { // 维护的内容
		Answer -= Count[Col] * (Count[Col] - 1) / 2;
		Count[Col] += Adjust;
		Answer += Count[Col] * (Count[Col] - 1) / 2;
	}
}; 

struct Query {
	int L, R, index;
	
	Query() {
		L = R = 0;
		index = 0;
	}
	
	Query(int ll, int rr, int i) {
		L = ll, R = rr;
		index = i;
	}
}; 

int n, m, Color[maxn], Q;
Global G;
Query q[maxn];
int Answer[maxn], Deswer[maxn];

int cd(int x, int y) {
	if (x % y == 0) return x / y;
	return x / y + 1;
}

signed main() {
	std::cin.tie(nullptr);
	std::cin.sync_with_stdio(false);
	
	std::cin >> n >> m;
	Q = std::sqrt(n);
	for (int i = 1; i <= n; i++)	
		std::cin >> Color[i];
	
	for (int i = 1, l, r; i <= m; i++) {
		std::cin >> l >> r;
		q[i] = Query(l, r, i);
	}
	
    /* 核心思想！！ */
	std::sort(q + 1, q + m + 1, 
		[] (const Query& a, const Query& b) {
			int Ba = cd(a.L, Q), Bb = cd(b.L, Q);
			if (Ba != Bb) {
				return a.L < b.L;
			} else {
				if (Ba % 2 == 1) return a.R < b.R;
				return a.R > b.R;
			}
		});
	
	G.L = q[1].L, G.R = q[1].R;
	
	for (int i = G.L; i <= G.R; i++)
		G.Modify(Color[i], +1);	
	
	Answer[q[1].index] = G.Answer;
	Deswer[q[1].index] = (G.R - G.L + 1) * (G.R - G.L) / 2;
		
    /* 核心代码！！！（板） */
	for (int i = 2; i <= m; i++) {
		while (G.L < q[i].L) G.Modify(Color[G.L], -1), G.L += 1;
		while (G.R > q[i].R) G.Modify(Color[G.R], -1), G.R -= 1;
		while (G.L > q[i].L) G.L -= 1, G.Modify(Color[G.L], +1);
		while (G.R < q[i].R) G.R += 1, G.Modify(Color[G.R], +1);
		Answer[q[i].index] = G.Answer;
		Deswer[q[i].index] = (G.R - G.L + 1) * (G.R - G.L) / 2;
	}
	
	for (int i = 1; i <= m; i++) {
		if (Deswer[i] == 0) Deswer[i] = 1;
		int Gcd = std::__gcd(Answer[i], Deswer[i]);
		std::cout << Answer[i] / Gcd << "/" << Deswer[i] / Gcd << "\n";
	}
	
	return 0;
}
```

莫队的一个小常数优化：将左端点所在块的编号为奇数的询问按照右端点从小到大排序，若为偶数则从大到小排序，这个很好理解，因为奇数块处理完后 $r$ 会比较偏右，下一个偶数块从大到小排就可以省去很多移动步数，根据 oi-wiki，这个平均能快 $30\%$。我实测例题 $n=5\times10^4$ 的时候大约能快 $10\text{ms}$ 或 $20\%$。

### [P4137 Rmq Problem / mex](https://www.luogu.com.cn/problem/P4137)

#### 题目大意

给定序列 $\{a_1,a_2,\dots,a_n\}$，$q$ 次询问，每次询问要求你给出给定区间的 $\text{mex}$。

$\text{mex}$ Minimum EXcluded natural number，最小未包含自然数。

#### 做法

经典的无修改莫队。但是数据范围是 $n \leqslant 2\times10^5$ 有点难办。

莫队的主要复杂度在于移动区间左右端点和对于每个查询求 $\text{Ans}$，记移动一次需要 $\text{move}(n)$ 时间，查询一次需 $\text{query}(n)$ 时间，则莫队整体复杂度可以表示为：

$$
\mathcal{T}(n) = {}^1\mathcal{O}(n\sqrt{n})\times\text{move}(n)+{}^2\mathcal{O}(q\log q) + {}^3\mathcal{O}(q)\times\text{query}(n)
$$

1. $\mathcal{O}(n\sqrt{n})\times\text{move}(n)$ 是总共移动区间的开销。
2. $\mathcal{O}(q\log q)$ 排序询问的开销。
3. $\mathcal{O}(q)\times\text{query}(n)$ 查询 $q$ 次的开销。

可以发现，$\text{move}$ 和 $\text{query}$ 的地位完全不对等，前者系数远高于后者。

首先，我们可以很自然的想到一个 $\text{move}(n)=\mathcal{O}(\log n)$ 的做法，即全局维护一个 $\text{cnt}$ 的线段树，对于每个询问查询时线段树上二分。非常可惜的是，这个做法常数过大根本无法通过本题，实测 $44\text{pts}$。

上述做法复杂度瓶颈在于移动，我们考虑平衡这里，对于这种数据范围大的莫对题，严格 $\mathcal{O}(1)$ 的 $\text{move}$ 非常重要！！

考虑平衡移动和查询的复杂度。

我们想到 $\text{bitset}$ 有一个 `_Find_first()` 函数，如果我们将 $\text{cnt}$ 数组布尔化后再去反，则直接就是答案了，虽然是 $\mathcal{O}(n)$，但是常数极小，不仅有 $\text{bitset}$ 特色 $1/64$ 常数，而且也大概率跑不满，因为最多循环到答案便 `return` 了。

最终复杂度 $\mathcal{O}(nq)$，常数 $1/64$。

以上这个例子告诉我们复杂度平衡的重要性，如果 $\text{move}$ 和 $\text{query}$ 都是 $\mathcal{O}(\log n)$ TLE 地体无完肤，$\mathcal{O}(1)$ 的 $\text{move}$ 即使 $\text{query}$ 慢一点仍然可以 $100\text{pts}$。

```cpp
#include <bits/stdc++.h>
#define int int64_t

constexpr int N = 262144;

int CD(int x, int y) {
	return (x % y ? x / y + 1
		 : x / y);
}


int n, q;
int A[N];
int block;

int Cnt[N], Ans[N];
std::bitset<N> B;
int glf, grt;

struct Query {
	int l, r, id;
	bool operator<(const Query& q) const& { 
		if (CD(l, block) != CD(q.l, block)) {
			return l < q.l;
		} else {
			if (CD(l, block) & 1) {
				return r < q.r;
			} else {
				return r > q.r;
			}
		}
	} 
} Q[N];

void Add(int x) {
	Cnt[x] += 1;
	if (Cnt[x] == 1) B[x] = false;
}

void Remove(int x) {
	if (Cnt[x] == 1) B[x] = true;
	Cnt[x] -= 1;
}

signed main() {
	std::cin.tie(nullptr);
	std::cin.sync_with_stdio(false);
	
	std::cin >> n >> q;
	block = std::sqrt(n);
	for (int i = 1; i <= n; i++)
		std::cin >> A[i];
	
	for (int i = 1; i <= q; i++) {
		std::cin >> Q[i].l >> Q[i].r;
		Q[i].id = i;
	}
	
	std::sort(Q + 1, Q + q + 1);
	
	glf = Q[1].l;
	grt = Q[1].r;
	
	for (int i = 0; i < N; i++)
		B[i] = true;
	
	for (int i = glf; i <= grt; i++)
		Add(A[i]);
	
	Ans[Q[1].id] = B._Find_first();
	
	for (int i = 2; i <= q; i++) {
		while (glf < Q[i].l) Remove(A[glf++]);
		while (glf > Q[i].l) Add(A[--glf]);
		while (grt < Q[i].r) Add(A[++grt]);
		while (grt > Q[i].r) Remove(A[grt--]);
		Ans[Q[i].id] = B._Find_first();
	}
	
	for (int i = 1; i <= q; i++)
		std::cout << Ans[i] << "\n";
	return 0;
}
```