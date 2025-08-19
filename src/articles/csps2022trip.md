## 蒟蒻 の OI 之旅 · CSP-S 2022

为什么标题取的是 CSP2022？~~btd~~因为 SN CSP-J 取消了。（悲）

初赛没啥好说的（，分数线 $28$，胡乱填都能过。

直接快进到复赛。

### 复赛

进考场前：目标 $140$。

进考场了。

先开 $\text{T1}$，没有任何思路。

然后开 $\text{T2}$，有些思路，会 $60\text{pts}$。

然后看 $\text{T3}$，没太看懂。

然后狂想 $\text{T1}$，发现暴力能得 $40$，那就写了。

然后写 $\text{T2}$，$\mathcal{O}(qn)$ 能得 $60$ 分，那就写了吧。

然后想 $\text{T2}$，发现可以 $\text{RMQ}$ 得 $100$，于是开始写 $\text {ST-Table}$。

然后写出来了，大样例都过了。

然后看 $\text{T3}$，还行，写了个 $\mathcal{O}(qn + qm)$，$40$ 分到手。

然后看 $\text{T4}$，啥也不会，正好只剩几分钟，那就……开摆！

估分 $40 + 100 + 40 + 0 = 180$。

实际 $45 + 100 + 40 + 0 = 185$。（实际如果没有 $\text{T1}$ 的五分我就没有六级了）

没想到 €€£ 的数据这么水，没多骗点分可惜了，但是起码还是算好的。

没想到自己是 全省小学生第一 + 全国小学生第十一 `^_^`。

加油。

符考场代码：

```cpp
// CSP-S 2022 T1 holiday O(n^4) 40pts

#include <iostream>
#include <cstring>
#include <vector>
#define maxn 1024
#define int long long
int n, m, k, S[maxn], M[maxn][maxn], u, v;
std::vector<int> G[maxn];
int ans = 0xACACACACACACACACLL;
signed main() {
	freopen("holiday.in", "r", stdin);
	freopen("holiday.out", "w", stdout);
	std::cin >> n >> m >> k;
	k += 1;
	for (int i = 2; i <= n; i++)
		std::cin >> S[i];
	memset(M, 0x3f, sizeof(M));
	for (int i = 1; i <= n; i++)
		M[i][i] = 0;
	for (int i = 1; i <= m; i++) {
		std::cin >> u >> v;
		G[u].push_back(v);
		G[v].push_back(u);
		M[u][v] = M[v][u] = 1;
	}
	for (int k = 1; k <= n; k++)
		for (int i = 1; i <= n; i++)
			for (int j = 1; j <= n; j++)
				M[i][j] = std::min(M[i][j], M[i][k] + M[k][j]);
	for (int i = 2; i <= n; i++)
		for (int j = 2; j <= n; j++)
			for (int p = 2; p <= n; p++)
				for (int o = 2; o <= n; o++) {
					if (i == j or i == p or i == o or j == p or j == o or p == o)
						continue;
					if (M[1][i] > k or M[i][j] > k or M[j][p] > k or M[p][o] > k or M[o][1] > k)
						continue;
					ans = std::max(ans, S[i] + S[j] + S[p] + S[o]);
				}
	std::cout << ans << "\n";
	return 0;
}

// OH MY GOD! Pleaze give me 40pts! I wanna blue correct. QwQ
```


```cpp
#include <iostream>
#include <vector>
#include <cmath>
#define maxn 131072
#define int long long
#define maxm 32
#define Response(x) (x > 0 ? BMin : BMax)
int n, m, q;
bool lean;
class Lister{
	public:
		int ln;
		int l[maxn];
		int Mx[maxm][maxn];
		int Mi[maxm][maxn];
		int SN[maxm][maxn];
		int SP[maxm][maxn];
		void Init() {
			if (lean == 0) return;
			int K = log2(ln);
			for (int j = 1; j <= ln; j++)
				Mx[0][j] = l[j],
				Mi[0][j] = l[j],
				SN[0][j] = (l[j] <= 0 ? l[j] : -0x3f3f3f3fLL),
				SP[0][j] = (l[j] >= 0 ? l[j] : 0x3f3f3f3fLL);
			for (int i = 1; i <= K; i++)
				for (int j = 1; j + (1 << i) - 1 <= ln; j++)
					Mx[i][j] = std::max(Mx[i - 1][j], Mx[i - 1][j + (1 << i - 1)]),
					Mi[i][j] = std::min(Mi[i - 1][j], Mi[i - 1][j + (1 << i - 1)]),
					SN[i][j] = std::max(SN[i - 1][j], SN[i - 1][j + (1 << i - 1)]),
					SP[i][j] = std::min(SP[i - 1][j], SP[i - 1][j + (1 << i - 1)]);
		}
		int Maximum(int L, int R) {
			if (lean == 0) {
				int mx = -0x3f3f3f3fLL;
				for (int i = L; i <= R; i++)
					mx = std::max(mx, l[i]);
				return mx;
			}
			int G = log2(R - L + 1);
			return std::max(Mx[G][L], Mx[G][R - (1 << G) + 1]);
		}
		int Minimum(int L, int R) {
			if (lean == 0) {
				int mi = 0x3f3f3f3fLL;
				for (int i = L; i <= R; i++)
					mi = std::min(mi, l[i]);
				return mi;
			}
			int G = log2(R - L + 1);
			return std::min(Mi[G][L], Mi[G][R - (1 << G) + 1]);
		}
		std::vector<int> Simzero(int L, int R) {
			if (lean == 0) {
				int P = 0x3f3f3f3fLL;
				for (int i = L; i <= R; i++)
					if (l[i] >= 0)
						P = std::min(P, l[i]);
				int N = -0x3f3f3f3fLL;
				for (int i = L; i <= R; i++)
					if (l[i] <= 0)
						N = std::max(N, l[i]);
				return std::vector<int>({N, P});
			}
			int G = log2(R - L + 1);
			int Sn = std::max(SN[G][L], SN[G][R - (1 << G) + 1]),
				Sp = std::min(SP[G][L], SP[G][R - (1 << G) + 1]);
			return std::vector<int>({Sn, Sp});
		}
} A, B;
signed main() {
	freopen("game.in", "r", stdin);
	freopen("game.out", "w", stdout);
	std::ios::sync_with_stdio(false);
	std::cin.tie(nullptr);
	std::cout.tie(nullptr);
	std::cin >> n >> m >> q;
	if (n <= 1000 and m <= 1000 and q <= 1000)
		lean = 0;
	else
		lean = 1;
	for (int i = 1; i <= n; i++)
		std::cin >> A.l[i];
	for (int i = 1; i <= m; i++)
		std::cin >> B.l[i];
	A.ln = n, B.ln = m;
	A.Init();
	B.Init();
	for (int i = 1; i <= q; i++) {
		int c, d, x, y;
		std::cin >> c >> d >> x >> y;
		int BMin = B.Minimum(x, y), BMax = B.Maximum(x, y);
		int Max = A.Maximum(c, d), Min = A.Minimum(c, d), SimAns;
		std::vector<int> S = A.Simzero(c, d);
		SimAns = -0x3f3f3f3f3f3f3f3fLL; 
		SimAns = (S[0] != -0x3f3f3f3fLL ? std::max(SimAns, S[0] * Response(S[0])) : SimAns);
		SimAns = (S[1] != 0x3f3f3f3fLL ? std::max(SimAns, S[1] * Response(S[1])) : SimAns);
		std::cout << std::max(std::max(Max * Response(Max), Min * Response(Min)), SimAns) << "\n";
	}
	return 0;
}

// OH MY GOD! Pleaze give me 100pts! I wanna blue correct. QwQ
```

```cpp
#include <iostream>
#include <vector>
#define maxn 16384
#define maxm 16384
int n, m, q;
struct Blackhole {
	int x, y;
	bool used;
} b[maxn];
std::vector<std::pair<int, int> > G[maxn];
bool CanAttack();
bool CanLinked(int);
int main() {
	freopen("galaxy.in", "r", stdin);
	freopen("galaxy.out", "w", stdout);
	std::cin >> n >> m;
	for (int i = 1; i <= m; i++) {
		std::cin >> b[i].x >> b[i].y; 
		b[i].used = true;
		G[b[i].x].emplace_back(b[i].y, i);
	}
	std::cin >> q;
	for (int i = 1; i <= q; i++) {
		int t, u, v;
		std::cin >> t >> u;
		if (t == 1) {
			std::cin >> v;
			for (int i = 1; i <= m; i++)
				if (b[i].x == u and b[i].y == v) {
					b[i].used = false;
					break;
				}
		} else if (t == 2) {
			for (int i = 1; i <= m; i++)
				if (b[i].y == u) 
					b[i].used = false;
		} else if (t == 3) {
			std::cin >> v;
			for (int i = 1; i <= m; i++)
				if (b[i].x == u and b[i].y == v) {
					b[i].used = true;
					break;
				}
		} else {
			for (int i = 1; i <= m; i++)
				if (b[i].y == u) 
					b[i].used = true;
		}
		bool FLAG = true;
		for (int i = 1; i <= n; i++)
			if (not CanLinked(i)) {
				FLAG = false;
				break;
			} 
		FLAG = std::min(FLAG, CanAttack());
		std::cout << (FLAG ? "YES" : "NO") << "\n";
	}
	return 0;
}
bool CanLinked(int x) {
	int CNT = 0;
	for (auto S : G[x])
		if (b[S.second].used)
			CNT += 1;
	return CNT == 1;
}
int f[maxn];
bool st[maxn];
int DFS(int x) {
	if (f[x] != 2)
		return f[x];
	if (st[x])
		return 1;
	st[x] = true;
	for (auto S : G[x])
		if (b[S.second].used and DFS(S.first) == 1) {
			f[x] = 1;
			break;
		}
	if (f[x] == 2)
		f[x] = 0;
	return f[x];
}
bool CanAttack() {
	for (int i = 1; i <= n; i++)
		f[i] = 2,
		st[i] = false;
	for (int i = 1; i <= n; i++)
		DFS(i);
	for (int i = 1; i <= n; i++)
		if (f[i] == 0)
			return false;
	return true;
}

// OH MY GOD! Pleaze give me 40pts! I wanna blue correct. QwQ
```

T4 只有一个 `freopen`，就不放了。