```cpp
#include <bits/stdc++.h>
#define int long long

std::string filename = "{filename}";

signed main() {    
    int tc = 0;
    while (true) {
        tc += 1;
        std::system((filename + "-gen.exe > "
			 + filename + ".in").c_str());
        std::system((filename + "-sol.exe < "
			 + filename + ".in > "
			 + filename + ".ans").c_str());
        
        int tfrom = clock();
        std::system((filename + ".exe < "
			 + filename + ".in > "
			 + filename + ".out").c_str());
        int tto = clock();

        bool flag = false;
        std::ifstream outin(filename + ".out");
        std::ifstream ansin(filename + ".ans");
        std::ifstream inpin(filename + ".in");
        
        std::string out, ans, all;
        int hashcode = 0;
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
        
        std::getline(inpin, all, '@');
        for (int i = 0; i < all.size(); i++)
        	hashcode = (hashcode * 997 + all[i]) % 998244353;
        
        if (flag == 0) {
            std::cerr << "\033[32mAccepted #" << tc << " "
                 << (tto - tfrom) * 1.0 / CLOCKS_PER_SEC
                 << "s " << "\033[0m\n";
            std::cerr << "    info: (size="
                 << all.size() << "B, hash=" << hashcode << ")\n\n";
        } else {
            std::cerr << "\033[31mUnaccepted #" << tc << "\033[0m\n";
            return 0; 
        }
    }
    
    return 0;
}
```