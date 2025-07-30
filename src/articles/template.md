```cpp
#include <bits/stdc++.h>
#define int long long

signed main() {
//    std::system("g++ {file}.cpp -o {file} -O2 -static -std=c++14");
//    std::system("g++ {file}-gen.cpp -o {file}-gen -O2 -static -std=c++14");
//    std::system("g++ {file}-sol.cpp -o {file}-sol -O2 -static -std=c++14");
    
//    std::cerr << "Successfully compiled three cpp.\n";
    
    int tc = 0;
    while (true) {
        tc += 1;
        std::system("{file}-gen.exe > {file}.in");
        std::system("{file}-sol.exe < {file}.in > {file}.ans");
        
        int tfrom = clock();
        std::system("{file}.exe < {file}.in > {file}.out");
//        int x = std::system("fc P11833.out P11833.ans");
        int tto = clock();

        bool flag = false;
        std::ifstream outin("{file}.out");
        std::ifstream ansin("{file}.ans");
        
        std::string out, ans;
        while (true) {
            bool bln = false;
            bln |= bool(std::getline(outin, out));
            bln |= bool(std::getline(ansin, ans));
            if (!bln) {
                break;
            } else {
                while (out.back() == ' ') out.pop_back();
                while (ans.back() == ' ') ans.pop_back();
                if (out != ans) {
                    flag = true;
                    break;
                }
            }
        } 
        
        if (flag == 0) {
            std::cerr << "\033[32mAccepted #" << tc << " " << (tto - tfrom) * 1.0 / CLOCKS_PER_SEC << "s " << "\033[0m\n";
        } else {
            std::cerr << "\033[31mUnaccepted #" << tc << "\033[0m\n";
            return 0; 
        }
    }
    
    return 0;
}
```