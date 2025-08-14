```cpp

#include <bits/stdc++.h>
#define int long long
class Int {
    private:
        static const int bits = 1000000000;
        static const int bitc = 9;
        bool sign;
        std::vector<int> num;

        static std::string fitstring(int x) {
            std::string base = std::to_string(x);
            while (base.size() != bitc) base = "0" + base;
            return base;
        }

    public:
        Int() {this->sign = false, this->num.clear(); }
        Int(int x) {this->construct(std::to_string(x)); }
        Int(const std::string& s) {this->construct(s); }

        std::string format() const& {
            if (num.empty()) return "0";
            std::string res = "";
            for (int i = num.size() - 1; i >= 0; i--) 
                res += Int::fitstring(num[i]);
            while (res.front() == '0') res = res.substr(1);
            if (sign) res = "-" + res;
            return res;
        }

        operator std::string() {return this->format(); }

        void construct(std::string s) {
            sign = false;
            num.clear();
            if (!s.size()) {
                sign = false;
                num.clear();
            } else {
                if (s[0] == '-') {
                    s = s.substr(1);
                    sign = false;
                }
                int tmp = 0;
                int ti = s.size();
                for (int j = s.size() - 1; j - bitc + 1 >= 0; j -= bitc) {
                    int i = j - bitc + 1;
                    for (int k = i; k <= j; k++) tmp = tmp * 10 + s[k] - '0';
                    num.emplace_back(tmp); tmp = 0;
                    ti = i;
                }
                tmp = 0;
                for (int i = 0; i < ti; i++)
                    tmp = tmp * 10 + s[i] - '0';
                num.emplace_back(tmp);
                while (num.back() == 0) num.pop_back();
            }
        }

        void construct(const bool& _sign, const std::vector<int>& _num) {
            this->num = _num;
            this->sign = _sign;
        }

        void construct(const bool& _sign, const Int& it) {
            this->num = it.num;
            this->sign = _sign;
        }

        friend std::istream& operator>>(std::istream& stream, Int& it) {
            std::string s;
            stream >> s;
            it.construct(s);
            return stream;
        }

        friend std::ostream& operator<<(std::ostream& stream, const Int& it) {
            std::string s = it.format();
            stream << s;
            return stream;
        }

        bool operator<(const Int& it) const& {
        	if (it.num.empty() && num.empty()) return false;
            if (it.sign != this->sign) return this->sign;
            if (it.num.size() != this->num.size()) return (this->num.size() < it.num.size()) ^ it.sign;
            for (int i = this->num.size() - 1; i >= 0; i--) 
                if (this->num[i] != it.num[i]) 
                    return (this->num[i] < it.num[i]) ^ it.sign;
            return false;
        }

        bool operator>(const Int& it) const& {return it < (*this); }
        bool operator<=(const Int& it) const& {return !(it < (*this)); }
        bool operator>=(const Int& it) const& {return !((*this) < it); }
        bool operator==(const Int& it) const& {return !(it < (*this)) && !((*this) < it); }
        bool operator!=(const Int& it) const& {return (it < (*this)) || ((*this) < it); }

        Int abs() const& {Int res(*this); res.sign = 0; return res; }
        Int operator+() const& {return (*this); }
        Int operator-() const& {Int res(*this); res.sign = !this->sign; return res; }
        Int add(const Int& it) const& {
            if (this->sign == it.sign) {
                Int res;
                int tmp = 0;
                for (int i = 0; i < std::max(it.num.size(), this->num.size()); i++) {
                    int tmpres = tmp;
                    if (i < it.num.size()) tmpres += it.num[i];
                    if (i < this->num.size()) tmpres += this->num[i];
                    tmp = tmpres / bits;
                    res.num.emplace_back(tmpres % bits);
                }
                if (tmp) res.num.emplace_back(tmp);
                while (res.num.size() && res.num.back() == 0) res.num.pop_back();
                return res;
            }
            return Int();
        }

        Int sub(const Int& it) const& {
            if ((*this) > it && this->sign == it.sign && this->sign == false) {
                Int res;
                int tmp = 0;
                for (int i = 0; i < this->num.size(); i++) {
                    int tmpres = tmp + this->num[i];
                    if (i < it.num.size()) tmpres -= it.num[i];
                    tmp = -(tmpres < 0), tmpres += bits * (tmpres < 0);
                    res.num.emplace_back(tmpres);
                }
                while (res.num.size() && res.num.back() == 0) res.num.pop_back();
                return res;
            }
            return Int();
        }

        Int operator+(const Int& it) const& {
            if (it.sign == this->sign && it.sign == 0) {
                return this->add(it);
            } else if (it.sign == this->sign && it.sign == 1) {
                return -this->abs().add(it.abs());
            } else {
                Int res;
                if (it.abs() >= this->abs()) {
                    res.construct(it.sign, it.abs().sub(this->abs()));
                } else {
                    res.construct(this->sign, this->abs().sub(it.abs()));
                }
                return res;
            }
        }

        Int operator-(const Int& it) const& {return (*this) + (-it); }
        Int operator*(const Int& it) const& {
            Int res;
            res.num.resize(this->num.size() + it.num.size() + 5);
            int x = 0;
            for (int i = 0; i < this->num.size(); i++) 
                for (int j = 0; j < it.num.size(); j++) {
                	long long add = 1ll * this->num[i] * it.num[j];
                	long long t = 1ll * (res.num[i + j] + add) / bits;
                	res.num[i + j] = (res.num[i + j] + add % bits) % bits;
                	long long bt = 1ll * (res.num[i + j + 1] + t) / bits;
                	res.num[i + j + 1] = (res.num[i + j + 1] + t) % bits;
                	res.num[i + j + 2] += bt;
				}
            int t = 0;
            for (int i = 0; i < res.num.size(); i++) {
                res.num[i] += t;
                t = res.num[i] / bits;
                res.num[i] %= bits;
            }
            while (res.num.size() && res.num.back() == 0) res.num.pop_back();
            while (t) res.num.push_back(t % bits), t /= bits;
            res.sign = it.sign ^ this->sign;
            return res;
        }

        Int& operator=(const Int& it) {
            this->sign = it.sign;
            this->num = it.num;
            return (*this);
        }

        std::pair<Int, Int> divide(const Int& it) const& {
        	if (*this < it) return std::make_pair(Int(), *this);
            Int tmp;
            Int res;
            res.num.resize(this->num.size());
            for (int i = this->num.size() - 1; i >= 0; i--) {
                tmp = tmp * bits + this->num[i];
                if (tmp >= it) {
                    int l = 0, r = bits, mid, ans;
                    while (l <= r) {
                    	mid = (r + l) / 2;
                    	if (it * mid > tmp) {
                    		res.num[i] = mid - 1;
                    		r = mid - 1;
						} else l = mid + 1;
					}
                    tmp = tmp - it * res.num[i];
                }
            }
            while (res.num.size() && res.num.back() == 0) res.num.pop_back();
            return std::make_pair(res, tmp);
        }
        
        Int operator/(const Int& it) const& {
            Int absdivide = this->abs().divide(it.abs()).first;
            if (it.sign == this->sign) return absdivide;
            if (this->abs().divide(it.abs()).second == 0) return -absdivide;
            return -absdivide - 1;
        }

        Int operator%(const Int& it) const& {
            if (it.sign == 0) {
                if (it.sign == this->sign) return this->divide(it).second;
                Int r = this->abs().divide(it).second;
                return ((-r) + it) % it;
            } 
            if (it.sign == this->sign) return -this->abs().divide(it.abs()).second;
            return -this->abs().divide(it.abs()).second;
        }

        Int& operator+=(const Int& it) {return (*this) = (*this) + it; }
        Int& operator-=(const Int& it) {return (*this) = (*this) - it; }
        Int& operator*=(const Int& it) {return (*this) = (*this) * it; }
        Int& operator/=(const Int& it) {return (*this) = (*this) / it; }
        Int& operator%=(const Int& it) {return (*this) = (*this) % it; }

        Int operator++(signed) {Int res(*this); (*this) += 1; return res; }
        Int operator++(   ) {(*this) += 1; Int res(*this); return res; }
        Int operator--(signed) {Int res(*this); (*this) -= 1; return res; }
        Int operator--(   ) {(*this) -= 1; Int res(*this); return res; }
};

// signed main() {
//     Int u, v;
//     std::cin >> u >> v;
//     std::cout << u + v << "\n" << u - v << "\n" << u * v << "\n" << u / v << "\n" << u % v << "\n";
//     return 0;
// }
```