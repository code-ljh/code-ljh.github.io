class Int {
    private:
        const int BASE = 10000;
        bool sign;
        std::vector<int> num;

        static std::string fitstring(int x) {
            std::string base = std::to_string(x);
            while (base.size() != 4) base = "0" + base;
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
            while (res[0] == '0') res = res.substr(1);
            if (sign) res = "-" + res;
            return res;
        }
        operator std::string() {return this->format(); }

        void construct(std::string s) {
            sign = 0, num.clear();
            if (s.size() && s[0] == '-') sign = 1, s = s.substr(1);
            while (s.size() && s[0] == '0') s = s.substr(1);
            int x = 0, times = 0;
            for (int i = s.size() - 1; i >= 0; i--) {
                x = x * 10 + s[i] - '0';
                times += 1;
                if (times == 4) {
                    num.emplace_back(x);
                    times = x = 0;
                }
            }
            if (x) num.emplace_back(x);
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
                    tmp = tmpres / BASE;
                    res.num.emplace_back(tmpres % BASE);
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
                    tmp = -(tmpres < 0), tmpres += BASE * (tmpres < 0);
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
            res.num.resize(this->num.size() + it.num.size());
            for (int i = 0; i < this->num.size(); i++)
                for (int j = 0; j < it.num.size(); j++)
                    res.num[i + j] += this->num[i] * it.num[j];
            int t = 0;
            for (int i = 0; i < res.num.size(); i++) {
                res.num[i] += t;
                t = res.num[i] / BASE;
                res.num[i] %= BASE;
            }
            while (t) res.num.push_back(t % BASE), t /= BASE;
            while (res.num.size() && res.num.back() == 0) res.num.pop_back();
            res.sign = it.sign ^ this->sign;
            return res;
        }

        Int& operator=(const Int& it) {
            this->sign = it.sign;
            this->num = it.num;
            return (*this);
        }

        std::pair<Int, Int> divide(const Int& it) const& {
            Int tmp;
            Int res;
            res.num.resize(this->num.size());
            for (int i = this->num.size() - 1; i >= 0; i--) {
                tmp = tmp * BASE + this->num[i];
                if (tmp >= it) {
                    for (int j = 0; j <= BASE; j++) 
                        if (it * j > tmp) {
                            res.num[i] = j - 1;
                            break;
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
            } else {
                if (it.sign == this->sign) return -this->abs().divide(it.abs()).second;
                return -this->abs().divide(it.abs()).second;
            }
        }

        Int& operator+=(const Int& it) {return (*this) = (*this) + it; }
        Int& operator-=(const Int& it) {return (*this) = (*this) - it; }
        Int& operator*=(const Int& it) {return (*this) = (*this) * it; }
        Int& operator/=(const Int& it) {return (*this) = (*this) / it; }
        Int& operator%=(const Int& it) {return (*this) = (*this) % it; }

        Int operator++(int) {Int res(*this); (*this) += 1; return res; }
        Int operator++(   ) {(*this) += 1; Int res(*this); return res; }
        Int operator--(int) {Int res(*this); (*this) -= 1; return res; }
        Int operator--(   ) {(*this) -= 1; Int res(*this); return res; }
};