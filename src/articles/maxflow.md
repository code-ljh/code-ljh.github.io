# 网络流学习笔记

## 前言

本文主要讲解最大流，最小费用最大流和最小割，主要例题来自于[网络流 $24$ 题](https://www.luogu.com.cn/problem/list?tag=332&page=1)。

## 网络最大流问题

网络最大流问题指的是在一张**有权有向图**上，一个点被叫做**源点（通常用 $S$ 表示）**，另一个点被叫做**汇点（通常用 $T$ 表示）**，每一条边都有权值，称为**流量**。

注： 源点通常无入边，汇点通常无出边。

你可以把源点想象成一个神贴，流量想象成乐子值，源点的乐子值是 $\infty$，每条边都是一个转述者，每个转述者最多只能通过**流量**的乐子值传递给节点，问远在汇点的你最多能得到多少乐子值？

在下面这张图上（源点 $1$ 汇点 $5$）：

![](https://cdn.luogu.com.cn/upload/image_hosting/6uj3yhkt.png)  
（若未指明，边的方向由编号小的点到编号大的点，下同） 

网络最大流就是 $2$，虽然 $3 \to 5$ 这条边能传出 $2$ 的乐子值，但是 $2 \to 3$ 只有 $1$ 的流量，所以 $1 \to 2 \to 3 \to 5$ 这条路径只能传出 $1$ 点乐子值。

如果将 $1 \to 2$ 这条边的流量改为 $1$，那么这张图的最大流将变为 $1$，因为无论如何从源点到汇点都必须经过这条边所以无论如何也不可能有超过 $1$ 点乐子值到汇点。

以上便是网络最大流问题的定义啦！

但是，如何做最大流呢？

相信聪明的你已经想到啦！每一个从 $S \to \dots \to T$ 的路径，它能对答案的贡献便是对路径上的所有边的**剩余流量**（也就是这条边的总流量减去已经用的流量）的最小值，因此我们就可以不断地进行搜索来找到这样的路径并累计答案并更改剩余流量。

由剩余流量组成的图被称为**残量网络**。在**残量网络**中从源点到汇点的能对答案累计贡献的路径被称为**增广路径**。

因此我们上面那个算法也就是不停地在**残量网络**上找**增广路径**，直到找不到为止。

## Ford Fulkerson 增广

我们刚刚想到的那个算法~~虽然看起来很对~~是错的，因为对于如下的图：

![](https://cdn.luogu.com.cn/upload/image_hosting/h98ed2aj.png)  
（若未指明，$1$ 号点为源点，编号最大的点为汇点，下同）

正确答案是 $2$：

- $1 \to 2 \to 5 \to 6$ 贡献 $1$。
- $1 \to 3 \to 4 \to 6$ 贡献 $1$。

但是按照上面的算法，可能会选出：

- $1 \to 2 \to 4 \to 6$ 贡献 $1$。

然后将 $1 \to 2, 2 \to 4, 4 \to 6$ 的边剩余流量减少 $1$，然后计算机发现：找不到增广路径了，那就下班！

然后你就错了。

那我们怎么办呢？我们可以给计算机提供一个**反悔**的途径。找到一个增广路径把其他增广路径挡住了怎么办？那我们就可以建立**反向边**，走反向边就相当于*反悔*了一个选择。

比如在刚刚的例子中，虽然计算机选择了走 $2 \to 4$ 的边，但是我们也因此建立了一条从 $4 \to 2$ 的边，流量为 $1$，代表走这条边就可以穿越回去改变之前的决策并取回走过的 $1$ 流量！

可能有点难理解，我们上图！

![](https://cdn.luogu.com.cn/upload/image_hosting/avx9kiry.png)

走了那条错误（红色）的增广路怎么办呢？我们直接建立 $4 \to 2$ 的反向边，这样计算机就能找到 $1 \to 3 \to 4 \to 2 \to 5 \to 6$（黄色）的增广路径了！其实走了这两条边就相当于走了两条蓝色的正确的增广路了！

在实际的实现中，我们需要时刻保持反向边的流量等于这条边已经用过的流量，因为反向边只是能让你穿越回去改变之前的决定罢了，并不能让你增加更多额外的流量或者白白吞掉你的流量！

可不要小看这个反向边哦！这小小的反向边不仅是 Ford Fulkerson 算法的精髓，也在后面输出方案的时候有大用！

这个改进版的算法就是 Ford Fulkerson 增广的基本版了！

根据上面的思路，你应该不难写出下面的代码：

```cpp
#include <bits/stdc++.h>
#define int long long

constexpr int N = 210;
constexpr int INF = 1145141919810LL; 

int n, m, s, t, u, v, w;
int E[N][N], A[N];
bool Visit[N];

int DFS(int u, int flow) {
	if (u == t) return flow;
	Visit[u] = true;
	for (int i = 1; i <= n; i++) {
		int v = A[i];
		if (E[u][v] <= 0 || Visit[v]) continue;
		int c = DFS(v, std::min(flow, E[u][v]));
		if (c != -1) {
			E[u][v] -= c;
			E[v][u] += c;
			return c;
		}
	}
	return -1;
}

signed main() {
	std::cin >> n >> m >> s >> t;
	
	for (int i = 1; i <= n; i++) A[i] = i;
	
	for (int i = 1; i <= m; i++) {
		std::cin >> u >> v >> w;
		E[u][v] += w;
	}
	
	int MaxFlow = 0;
	while (true) {
		for (int i = 1; i <= n; i++) Visit[i] = false;
		int Flow = DFS(s, INF);
		if (Flow == -1) break;
		MaxFlow += Flow;
	}
	
	std::cout << MaxFlow << std::endl;
	
	return 0;
}
```

（你满怀欣喜地在[洛谷模板题](https://www.luogu.com.cn/problem/P3376)上提交了这份代码）  
（期待着 AC）

然后：

```
Subtask #0
AC  AC  AC  AC  AC  AC
AC  AC  TLE TLE AC  AC

Subtask #1
AC
```

为什么呢？因为这个算法的最坏时间复杂度是和流量有关的！但是流量可是 $10^9$ 量级的！所以这就会导致 $\text{TLE}$。

比如，出题人可以出这样的数据卡死你：

![](https://cdn.luogu.com.cn/upload/image_hosting/5uxnfrjj.png)

这里的 $\text{inf}$ 指一个 $10^9$ 量级的数，反正就很大。

因为这里的 Ford Fulkerson 使用 $\text{dfs}$ 实现的，所以可能会导致搜出来 $1 \to 2 \to 4 \to 6$ 这样的路径，因为 $2 \to 4$ 这条边的流量只有 $1$ 所以这条增广路只能对答案造成 $1$ 的贡献！然后我们此时建立了 $4 \to 2$ 的反向边，流量为 $1$，然后我们的计算机又走了 $1 \to 3 \to 4 \to 2 \to 5 \to 6$ 的增广路，然后又建立了 $2 \to 4$ 的反向边，然后这样每次都对答案造成 $1$ 的贡献。。。然后。。。恭喜你！$\text{TLE}$ 了！

因此，我们就可以得出以上这个算法的最坏时间复杂度即为 $\mathcal{O}(n \times f)$，$n$ 是点数，$f$ 是最大流。

注：本题其实是可以用 Ford Fulkerson 通过的，但是这不影响它的理论最坏时间复杂度仍然是 $\mathcal{O}(n \times f)$ 的。

## Edmonds Karp 最大流算法

上回书说到，Ford Fulkerson 在我们那个连正确性都没有保障的算法上做出了一些优化，但是时间复杂度比较差，可能会被卡到 $\text{TLE}$。

我们发现 Ford Fulkerson 只是说要找增广路，没说一定要用 $\text{dfs}$ 啊！那我们换成 $\text{bfs}$ 试试！诶，这就是 Edmonds Karp 最大流算法啦！ 

至于为什么换成 $\text{bfs}$ 就可以避免 $\text{TLE}$ 了呢？

还是上面那个图：

![](https://cdn.luogu.com.cn/upload/image_hosting/5uxnfrjj.png)

众所周知，$\text{bfs}$ 永远选的都是经过边数最少的路径，因此这里使用了 $\text{bfs}$ 的计算机就可以灵敏的发现，$1 \to 2 \to 5 \to 6$ 这条路径，然后就可以直接答案加上 $\inf$ 了而不是傻傻的每次加一。

- 可是这两条路径 $1 \to 2 \to 5 \to 6$ 和 $1 \to 2 \to 4 \to 6$ 是一样长的啊？
- 你说得对，但是就算选到了 $1 \to 2 \to 4 \to 6$ 这条边，$\text{bfs}$ 也能在下一次选择中敏锐的观察到 $1 \to 2 \to 5 \to 6$ 这条增广路！因为如果要反悔的话要走的路就长了！$1 \to 3 \to 4 \to 2 \to 5 \to 6$。

Edmonds Karp 的思路是不是很简单？但是实现起来相比 Ford Fulkerson 就难多了，这从代码长度上就能体现出来，Ford Fulkerson $750 \text{KB}$，Edmonds Karp $1000+ \text{KB}$。

Ford Fulkerson 只需要一个函数 $\text{dfs}()$ 找增广，外面套个 `while (true) {if (dfs returns -1) break; }` 就可以了。数组方面，只需要一个存图的和额外的一个 `Visit[]` 数组即可。

Edmonds Karp 却需要比 $\text{dfs}()$ 更长的 $\text{bfs}()$ 找增广，然后还要记录路径，数组方面不仅需要开一个 `std::queue`，和 `Visit[]` 数组，还需要 `Prev[]` 数组记录路径和 `Flow[]` 数组记录流量。

根据上面的思路，你应该可以较为轻松的写出下面的代码：

```cpp
#include <bits/stdc++.h>
#define int long long

constexpr int maxn = 210;
constexpr int infinity = 1145141919810LL;

int n, m, s, t;
int u, v, w;

struct edge {
	int id;
	int from, to, flow;
	edge *reverse;
	
	edge(int a=0, int b=0, int c=0):
		from(a), to(b), flow(c), reverse(0) {
		}
};

std::vector<edge*> graph[maxn];
bool vis[maxn]; int flow[maxn];
edge *pre[maxn];
edge *flag[maxn][maxn];

int bfs() {
	for (int i = 1; i <= n; i++) vis[i] = false;
	for (int i = 1; i <= n; i++) pre[i] = nullptr;
	std::queue<int> queue;
	queue.emplace(s);
	vis[s] = true;
	flow[s] = infinity;
	
	while (queue.size()) {
		int x = queue.front();
		queue.pop();
		
		for (auto e : graph[x]) {
			int y = e->to;
			if (vis[y] || e->flow == 0) continue;
			vis[y] = true;
			pre[y] = e;
			flow[y] = std::min(e->flow, flow[x]);
			queue.emplace(y);
			
			if (y == t) return flow[y];
		}
	}
	
	return 0;
}

signed main() {
	std::cin >> n >> m >> s >> t;
	
	for (int i = 1; i <= m; i++) {
		std::cin >> u >> v >> w;
		
		
		if (flag[u][v] == 0 || flag[v][u] == 0) {
			edge *a = new edge(u, v, w);
			edge *b = new edge(v, u, 0);
			a->reverse = b, b->id = i;
			b->reverse = a, a->id = i;
			graph[u].push_back(a);
			graph[v].push_back(b);
		} else flag[u][v]->flow += w;
	}
	
	int maxflow = 0;
	while (true) {
		int x = t, flow = bfs();
		if (flow == 0) break;
		maxflow += flow;
		while (x != s) {
			pre[x]->flow -= flow;
			pre[x]->reverse->flow += flow;
			//std::cout << pre[x]->id << " ";
			x = pre[x]->from;
		}
		//std::cout << "Find an augmenting path of " << flow << std::endl;
	}
	
	std::cout << maxflow << std::endl;
	return 0;
}
```

这份代码就可以 AC 本题了！

关于复杂度：以上代码的时间复杂度不难看出就是 $\mathcal{O}(增广轮数 \times (n + m))$，因为单轮 $\text{bfs}()$ 的复杂度要遍历每个点每条边所以是 $(n + m)$ 的，但是增广轮数就不好办了，下至 $\mathcal{O}(1)$ 上至 $\mathcal{O}(n \times m)$，反正你只需要知道这个算法的最坏时间复杂度是 $\mathcal{O}(n \times m^2)$  的就行了，但其实也没啥用，因为大多数网络流题目都是考你建模的能力，也就是图是怎么样其实不太由出题人决定，你也肯定不会建出来一个卡自己的图吧？

所以这个算法实际上已经够了，但是并不是最常用的算法。

## Dinic 最大流算法

上面的算法太慢了！一次只能找出一条增广路什么垃圾！我要一次能找多条增广路行不行？当然可以！

我们想，如果要找多条增广路，$\text{bfs}()$ 肯定不行，因为要找多条增广路肯定要多次入队，而上一个多次入队的 $\text{spfa}()$ 已经死了，而允许多次入队的 $\text{dijkstra}$ 也已经被卡成指数级了，所以 $\text{dfs}()$ 来找增广路是更优秀的选择。

但是，Ford Fulkerson 算法已经替我们试过了，只用 $\text{dfs}$ 找增广路会因为过于头铁，死找一条增广路结果只有 $1$ 的贡献而 $\text{TLE}$，所以我们要结合 $\text{bfs}$ 的分层式遍历和 $\text{dfs}$ 的多路增广，Dinic 算法就是先用 $\text{bfs}$ 把图（其实是残量网络）分层，也就是按到源点的距离分层，然后再在这个分层图跑一个 $\text{dfs}$ 多路增广。

这段可能对着代码理解会更好：

```cpp
#include <bits/stdc++.h>

constexpr int max_n = 210;
constexpr int infinity = 2147483647;

int n, m, s, t;
int u, v, w;
int dis[max_n];
long long graph[max_n][max_n];
int queue[114514];

bool bfs() {
	for (int i = 1; i <= n; i++) dis[i] = infinity;
	
	std::queue<int> queue;
	queue.emplace(s);
	dis[s] = 0;
	
	while (queue.size()) {
		int front = queue.front();
		queue.pop();
		
		for (int i = 1; i <= n; i++) {
			if (dis[i] == infinity && graph[front][i] > 0) {
				dis[i] = dis[front] + 1;
              // 分层，其实就是把每个节点到原点的距离求出来
				queue.emplace(i);
			}
		}
	}
	// 顺便判断下目前还有没有增广路了
	return dis[t] != infinity;
}

long long dfs(int x, long long flow) {
	if (x == t) return flow; // 如果已经到汇点了，那么反回
	long long now_flow = 0; 
	for (int y = 1; y <= n; y++) {
		if (dis[y] == dis[x] + 1 && graph[x][y] > 0) {
          // 如果 y 是 x 的“下层”节点且这条边在残量网络上
			long long c = dfs(y, std::min(flow, graph[x][y])); // 在 y 的“子树”中搜刮流量
			now_flow += c;
			graph[x][y] -= c;
			graph[y][x] += c;
			flow -= c; // 注意！走完后 flow 就要减去 c，因为已经走了 c 流量了。
            if (!flow) return; // 注意！这句话不加比 EK 还慢！ 
		}
	}
	return now_flow;
} 
// 需要注意的是，dfs(x) 到一个节点一定就会把这个节点的子树搜刮干净（递归的力量）

signed main() {
	std::cin.tie(nullptr);
	std::cout.tie(nullptr);
	std::ios::sync_with_stdio(false); 
	
	std::cin >> n >> m >> s >> t;
	
	for (int i = 1; i <= m; i++) {
		std::cin >> u >> v >> w;
		graph[u][v] += w;
	}
	
	long long max_flow = 0;
	
	while (bfs()) {
		while (true) {
			long long flow = dfs(s, infinity);
			if (flow == 0) break;
			max_flow += flow;
		}
	}
	
	std::cout << max_flow << "\n";
	return 0;
}
```

~~其实这个代码并没有快多少，并且时间复杂度也没有快。~~  
时间复杂度优化需要加入**当前弧优化**，懒得写。

## 最大流算法总结

|算法|复杂度|原理|
|:--:|:--:|:--:|
|Ford Fulkerson|$\mathcal{O}(n\times f)$|$\text{dfs}$ 找增广路|
|Edmonds Karp(EK)|$\mathcal{O}(n \times m^2)$|$\text{bfs}$ 找增广路|
|Dinic|$\mathcal{O}(n \times m^2)$|$\text{bfs}$ 分层，$\text{dfs}$ 多路增广|
|Dinic+当前弧|$\mathcal{O}(n^2 \times m)$|

## 关于存图方式

在我们最初接触图论的时候，学过 $4$ 种存图方式：

- 邻接表 `std::vector graph[N], graph[i] 表示 i 的出边`
- 邻接矩阵 `graph[N][N], graph[i][j] 表示 i->j 的边`
- 链式前向星 `head[N], next[M], val[M]`
- 直接开数组存下来每一条边 `u[M], v[M], w[M]`

|存图方式|判断是否存在 $u \to v$|遍历|空间复杂度|
|:-----:|:-------------------:|:-:|:-:|
|邻接表|$\mathcal{O}(m)$|$\mathcal{O}(n + m)$|$\mathcal{O}(n + m)$||
|邻接矩阵|$\mathcal{O}(1)$|$\mathcal{O}(n^2)$|$\mathcal{O}(n^2)$|
|链式前向星|$\mathcal{O}(m)$|$\mathcal{O}(n + m)$|$\mathcal{O}(n + m)$|
|直接开数组|$\mathcal{O}(m)$|$\mathcal{O}(nm)$|$\mathcal{O}(m)$|

在最大流算法中，我们需要快速（最好是 $\mathcal{O}(1)$）地查找一条边的反向边。

在邻接矩阵中，`graph[u][v]` 的反向变就是 `graph[v][u]`。  
在邻接表中，我们可以给每条边弄一个 `reverse` 指针指向反向边。  
在链式前向星中，我们可以在建图的时候保证正向边一定和反向边是一起插入的，所以 `edge[i]` 的反向边就是 `edge[i ^ 1]`。

由于邻接矩阵遍历是 $\mathcal{O}(n^2)$ 的所以不建议用。
## 最大流例题

网络流板子：
- $\color{cornflowerblue}\texttt{P3376}$【模板】网络最大流
- $\color{cornflowerblue}\texttt{P2936}$ [USACO09JAN] Total Flow S
- $\color{cornflowerblue}\texttt{P2740}$ [USACO4.2] 草地排水Drainage Ditches
- $\color{cornflowerblue}\texttt{P1343}$ 地震逃生
- $\color{cornflowerblue}\texttt{B3606}$ [图论与代数结构 501] 网络流_1
- $\color{cornflowerblue}\texttt{B3607}$ [图论与代数结构 502] 网络流_2

### 关于网络流与二分图匹配

二分图匹配也可以用网络流做，建立一个超级源点和一个超级汇点，将超级源点连向二分图左半边的点，二分图右半边的点连向汇点，然后跑一个最大流算法就行啦（边权都是 $1$）。

在这样**单位流量**上的图跑最大流会有更优秀的复杂度，你可以这样理解：一条边跑一次就没了，那么每条边反悔 $n$ 次那么复杂度也才 $\mathcal{O}(nm)$，但一条边肯定不到 $n$ 次。

### 关于网络流输出方案问题

因为对于每一条边都有正向边流量加反向边流量等于总流量，那么反向边其实就是这条边总共经过的流量。

## 最小费用最大流

最小费用最大流问题，就是在每一条边上都加上一个单位流量的代价，最终的费用就是 $\text{cost} = \sum_{u \to v} \text{f}(u \to v) \times \text{c}(u \to v)$，$\text{f}(u \to v)$ 表示 $u \to v$ 这条边总共流过多少流量，$\text{c}(u \to v)$ 表示这条边单位流量的代价，我们要在保证最大流的情况下，让最终费用最小。

还是我们原来 FF、EK 和 Dinic 的主要思想：找增广路。在一条增广路上每条边新增的流量都是相同的，因此，我们可以吧这个流量提出来，也就是说，这条增广路对代价的贡献也就是：


$$
\begin{aligned}
\Delta\text{cost}(\text{path}) &= \sum^{(u\to v)\in\text{path}}\text{f}(\text{path}) \times \text{c}(u \to v)\newline
&= \text{f}(\text{path})\times\sum^{(u\to v)\in\text{path}}\text{c}(u\to v)
\end{aligned}
$$

然后我们考虑总代价：

$$
\begin{aligned}
\text{cost} & = \sum_{\text{path}} \Delta \text{cost}(\text{path})\\
& =\sum_{\text{path}} \left(\text{f}(\text{path}) \times \sum^{\in \text{path}}_{u \to v} \text{c}(u\to v)\right)
\end{aligned}
$$

我们考虑反向边，反向边 $v \to u$ 代表反悔正向边 $u \to v$，因此代价 $\text{c}(v \to u) = -\text{c}(u \to v)$。

然后就是贯穿整个 FF，EK，Dinic 的核心思想：反悔**贪心**。  
我们每次都让 $\Delta\text{cost}$ 最小，又因为总流量都是固定的（最大流），所以我们只需让路径上的 $\text{c}(u \to v)$ 的和最小，容易想到这不就是经典的**最短路**问题啊！再复习一下最短路算法：

|$\text{Algorithm}$|$\text{Time Complexity}$|$\text{Condition}$|
|:--:|:--:|:--:|
|$\text{Dijkstra}$|$\mathcal{O}(m \log m)$|$\text{c}(u \to v) \geqslant 0$|
|$\text{SPFA}$|$\mathcal{O}(m) \sim \mathcal{O}(nm)$|
|$\text{Bellman-Ford}$|$\mathcal{O}(nm)$|
|$\text{Floyd}$|$\mathcal{O}(n^3)$||

首先排除 $\text{Dijkstra}$ 和 $\text{Floyd}$ 算法，因为：
- $\text{Floyd}$ 太慢，而每一次图都是会变（残量网络）因此需要跑很多次而一次就快 $\text{TLE}$ 了。
- $\text{Dijkstra}$ 不得处理负边权，而反向边边权为负。

$\text{SPFA}$ 和 $\text{Bellman-Ford}$ 算法的最坏复杂度都是 $\mathcal{O}(nm)$，但是 $\text{SPFA}$ 在非构造卡 $\text{SPFA}$ 的图上一般都是 $\mathcal{O}(m)$ 量级的，而网络流的题一般图怎么样不完全由出题人决定，因此大概率不会被卡，所以可以放心用 $\text{SPFA}$。用 $\text{Bellman-Ford}$ 复杂度就稳定加一个 $\mathcal{O}(n)$ 肯定会 $\text{TLE}$。

综上所述，把网络流算法改为最小费用最大流算法只需要把 $\text{bfs}/\text{dfs}$ 改为 $\text{SPFA}$ 即可。

## $\color{cornflowerblue}\text{P3381}$【模板】最小费用最大流

本代码使用的是 EK 实现。

```cpp
#include <bits/stdc++.h>
#define int long long

constexpr int maxn = 5010;
constexpr int infinity = 1145141919810LL;

int n, m, s, t;
int u, v, w, c;

struct edges {
	int from, to, cost, flow;
	edges *reverse;
	
	edges(int a=0, int b=0, int c=0, int d=0):
		from(a), to(b), cost(c), flow(d) {
			reverse = nullptr;
		}
};

std::vector<edges*> graph[maxn];
int vis[maxn], dis[maxn], flow[maxn];
edges *pre[maxn];

bool spfa() { // bfs -> spfa 
	std::queue<int> queue;
	queue.emplace(s);
	vis[s] = true;
	for (int i = 1; i <= n; i++) dis[i] = infinity;
	dis[s] = 0, flow[s] = infinity;
	
	while (queue.size()) {
		int x = queue.front();
		queue.pop();
		vis[x] = false;
		//std::cout << "Expanding queue by " << x << ":\n";
		
		for (edges *e : graph[x]) {
			int y = e->to;
			//std::cout << ">> Expanded into the edge to " << y << "\n";
			
			if (dis[x] + e->cost < dis[y] && e->flow > 0) {
				//std::cout << ">> Got into " << y << "\n";
				dis[y] = dis[x] + e->cost;
				pre[y] = e, flow[y] = std::min(flow[x], e->flow);
				if (!vis[y]) {
					queue.emplace(y);
					//std::cout << ">> >> Expanded " << y << " into the queue.\n";
					vis[y] = true;
				}
			}
		}
	}
	
	if (dis[t] == infinity) return false;
	return true;
}

signed main() {
	std::cin >> n >> m >> s >> t;
	
	for (int i = 1; i <= m; i++) {
		std::cin >> u >> v >> w >> c;
		edges *adge = new edges(u, v, +c, w);
		edges *bdge = new edges(v, u, -c, 0);
		adge->reverse = bdge, bdge->reverse = adge;
		graph[u].emplace_back(adge);
		graph[v].emplace_back(bdge);
	}
	
	int maxflow = 0, mincost = 0;
	while (spfa()) {
		int x = t;
		maxflow += flow[t];
		mincost += flow[t] * dis[t]; 
      // 千万千万要记得乘流量
		while (x != s) {
			pre[x]->flow -= flow[t];
			pre[x]->reverse->flow += flow[t];
			x = pre[x]->from;
		}
	}
	
	std::cout << maxflow << " " << mincost << std::endl;
	
	return 0;
}
```

## 最小割

最小割的定义是，在一张有向有权图上，请问最少割掉权值和为几的边才能使源点不能到汇点？

结论：最小割 $\cong$ 最大流 $(\text{SAS})$

虽然我不会证明，但是可以这样理解：

- $\texttt{(S)}$ 最大流可以分解为很多个增广路的路径上最小权值的和，最小割可以分解成很多条要割掉的边。
- $\texttt{(A)}$ 为了保证边权和最小所以每条边都要割在增广路上且割在最小权值的边上。
- $\texttt{(S)}$ 割掉边后可以看做增广路都没了，因此肯定不联通因为联通必定有增广路除非 $0$ 权边。

$\therefore$ 最小割 $\cong$ 最大流 $(\text{SAS})$ （滑稽）

那么，定义一个全等的东西究竟有什么用呢？  
之后例题的时候你就懂了，先挖个坑。

好了，现在最大流最小割最小费用最大流你都会了，那么可以开始做网络流 $24$ 题了！

## 网络流例题（全部取自网络流 $24$ 题）

（以我在洛谷上的通过顺序讲，同步我的 $\text{AC}$）

### $\color{cornflowerblue}\text{P2756}$ 飞行员配对方案问题


#### $\texttt{Statement} $
给定一个二分图，要你求最大匹配并给出一种可行解。  
点数不超过 $200$，边数不限但是无重边。

#### $\texttt{Solution}$
二分图左边连源点右边连汇点直接跑最大流秒了。  
可行解直接输出反向边权秒了。

[$\texttt{AC Record}$](https://www.luogu.com.cn/record/154855519)

### $\color{cornflowerblue}\text{P2761}$ 软件补丁问题

#### $\texttt{Statement}$
一个程序现在有 $n$ 个 $\text{bug}$，有 $m$ 个补丁，每个补丁在当前不存在一些 $\text{bug}$ 且存在另一些 $\text{bug}$ 的时候才能使用，使用后会加入一些 $\text{bug}$ 并删除一些 $\text{bug}$。运行每个补丁都需要一些时间，问至少需要多少时间才能把所有 $\text{bug}$ 都删完？（无解输出 $0$）

$1\leq n\leq 20, 1 \leq m \leq 100$

#### $\texttt{Solution}$
考虑状态压缩，$2^n$ 个点分别表示 $n$ 个 $\text{bug}$ 都有没有。

但是 $2^n \leq 1048576$，也就表明这并不是一道网络流题目。

然后每一个补丁枚举可使用情况暴力连边然后显然时间不可能是负数所以直接跑 $\text{Dijkstra}$。

注意建边不能 $2^n \times n \times m$ 会超时要用位运算优化到 $2^n \times m$。

这题感觉难度全在位运算优化，乍一看每个 $\text{bug}$ 输入是三种状态：无影响，必须有，必须没有，好像不能位运算，但我们可以把其中一种状态提取出来，我提取的是无影响的状态。

```cpp
int cost;
std::string need;
std::string change;
std::cin >> cost >> need >> change;
int nd = 0, xd = 0, get = 0, rem = 0;
for (auto i : need) 
    nd = (nd << 1) | (i != '-'),
    xd = (xd << 1) | (i == '0');
    // nd 表示由 + - 组成的 bug 状态
    // xd 表示哪些 bug 无影响
for (auto i : change)
    get = (get << 1) | (i == '+'),
    rem = (rem << 1) | (i == '-');
    // get 表示获取 bug 状态
    // rem 表示删除 bug 状态
rem = (1 << n) - 1 - rem; // rem 取反

for (int state = 0; state < (1 << n); state++)
// 枚举所有状态 
    if ((xd | state) == nd)
    // xd | state 表示假定这些无影响 bug 都有，因为 nd 也加上了这些
    // 所以可以直接判断是否相等
        graph[state].push_back(edges((state | get) & rem, cost));
    // | get 表示加上 bug，如果之前有那就不变
    // & rem 表示删除 bug，如果之前没有就不变    
```

最后，千万注意括号的问题。

[$\texttt{AC Record}$](https://www.luogu.com.cn/record/169940864)

### $\color{cornflowerblue}\text{P4016}$ 负载平衡问题
#### $\texttt{Statement}$

有 $n$ 个仓库首尾相接排成一个环，每个仓库 $i$ 都一些货物 $a_i$，每个仓库仅能向其左右搬运货物，请问最少需要搬运所有货物才能让每个仓库有的货物数量都一样？

保证 $\sum a \equiv 0 \pmod{n}$，$1 \leq n \leq 100$。

#### $\texttt{Solution}$

本题可以用网络流或者数学+贪心，因为这是网络流 $24$ 题所以用网络流虽然长一点。

本题有两种建图方式，我用的是拆点+二分图，把每个仓库拆成一个入点和一个出点，然后建边（定义流量为货物，搬运的货物数量为代价）：

- 超级源点 $\to$ 入点，代价为 $0$，流量为 $a_i$，对应初始状态。
- 出点 $\to$ 超级汇点，代价为 $0$，流量为 $\bar a$（平均数），对应终止状态。
- 入点 $\to$ 对应的出点，代价为 $0$，流量为 $\infty$，显然所有货物都可以无限制的不搬运，且无需代价。
- 入点 $\to$ 相邻的入点和出点，代价为 $1$，流量为 $\infty$，显然所有货物都可以搬运到相邻的仓库，但是需要代价。

然后跑一个最小费用最大流就可以啦！

[$\texttt{AC Record}$](https://www.luogu.com.cn/record/169166320)

### $\color{cornflowerblue}\text{P4014}$ 分配问题

#### $\texttt{Statement}$

有 $n$ 件工作要分配给 $n$ 个人，第 $i$ 个人做第 $j$ 个工作的收益为 $c_{i, j}$，问你最大和最小收益。

#### $\texttt{Solution}$

- 二分图上最小/大费用最大流板子
- $n$ 件工作和 $n$ 个人分别建点，然后代价为 $c_{i, j}$ 流量 $1$ 连边就行了。
- 超级源点连工作，流量 $1$ 代价 $0$，超级汇点连人流量 $1$ 代价 $0$，确保每个工作只会由一个人干，每个人也只会干一个工作。

分别跑一个最小费用最大流和最大费用最大流就行了！最大费用就把最短路改为最长路即可，其他不变。

[$\texttt{AC Record}$](https://www.luogu.com.cn/record/168755291)

### $\color{cornflowerblue}\text{P4015}$ 运输问题
#### $\texttt{Statement}$

有 $m$ 个仓库和 $n$ 个零售店，每个仓库有 $a_i$ 个单位的货物，每个零售店需要 $b_j$ 个单位的货物，从仓库 $i$ 运输一个单位的货物到零售店 $j$ 需要 $c_{i, j}$ 元，问你最少运输费用和最大运输费用。满足：

$$\sum a = \sum b, \\ 1 \leq n, m \leq 100$$

#### $\texttt{Solution}$

- 这题真是把最小（大）费用最大流写在脸上了。。。
- 超级源点连仓库，流量 $a_i$，代价 $0$。
- 零售店连超级汇，流量 $b_j$，代价 $0$。
- 仓库 $i$ 连零售店，流量 $\infty$ 代价 $c_{i, j}$。
- 跑最小（大）费用最大流。

[$\texttt{AC Record}$](https://www.luogu.com.cn/record/168761804)