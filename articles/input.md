测试题目：[$\text{LOJ Input Test}$](https://loj.ac/p/7)

## 实验对象

以下五种读入方式：

1. 无优化 `std::cin`
2. `<cstdio> scanf`
3. 关同步 `std::cin`
4. `getchar` 读入优化
5. `streambuf` 读入优化

## 实验简述

输入 $3 \times 10^6$ 个 $64$ 位无符号整数，输出它们的异或和。

## 实验结果

|读入方式     	  |全部用时		  |最大用时		  |
|:-----------------:|:-------------:|:-------------:|
|[无优化 `std::cin`](https://loj.ac/s/2037630)   |$4257\text{ms}$|$1259\text{ms}$|
|[`<cstdio> scanf`](https://loj.ac/s/2037635)  	 |$1045\text{ms}$|$249\text{ms}$ |
|[关同步 `std::cin`](https://loj.ac/s/2037637)   |$750\text{ms}$ |$193\text{ms}$ |
|[`getchar` 读入优化](https://loj.ac/s/2037678)  |$502\text{ms}$ |$152\text{ms}$ |
|[`streambuf` 读入优化](https://loj.ac/s/2037679)|$216\text{ms}$ |$58\text{ms}$|

## 实验结论

关同步 `std::cin` $>$ `<cstdio> scanf`。\
`<iostream> streambuf` $>$ `<cstdio> getchar`。

`<iostream>` 完 全 胜 利。