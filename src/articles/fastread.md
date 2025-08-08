```cpp
#include <bits/stdc++.h>
#define int long long
class FastInputStream {
	private:
		static const int BUFSIZE = 16384;
		std::streambuf *fb;
		char buf[BUFSIZE], *s, *t;
		
	public: FastInputStream() {
		fb = std::cin.rdbuf();
		s = t = buf;
	}
	
	public: char getc() {
		if (s == t) {
			s = buf;
			t = buf + fb->sgetn(buf, BUFSIZE);		
		}
		char get = *s;
		return s++, get;
	}
	
	public: template<class INT>
	void read(INT& x) {
		char ch = getc();
		int sign = 1; x = 0;
		while (!isdigit(ch)) {
			if (ch == '-') sign = -sign;
			ch = getc();
		}
		while (isdigit(ch)) {
			x = x * 10 + ch - '0';
			ch = getc();
		}
		x *= sign;
	}
	
	public: template<class INT, class ...ARGS>
	void read(INT& a, ARGS& ... args) {
		read(a);
		read(args ... );
	}
} input;

class FastOutputStream {
	private:
		static const int BUFSIZE = 16384;
		std::streambuf *fb;
		char buf[BUFSIZE], *s, *t;
		
	public: FastOutputStream() {
		fb = std::cout.rdbuf();
		s = buf, t = buf + BUFSIZE;
	}
	
	public: void write(char ch) {
		fb->sputc(ch);
	}
	
	public: void write(std::string s) {
		for (auto i : s) fb->sputc(i);
	}
	
	public: void write(const char *ch) {
		int ln = strlen(ch);
		for (int i = 0; i < ln; i++)
			fb->sputc(ch[i]);
	}
	
	public: template<class INT>
	void write(INT x) {
		int len = 0;
		static char stack[64];
		if (x < 0) {
			fb->sputc('-');
			x = -x;
		}
		if (!x) {
			fb->sputc('0');
			return;
		}
		while (x) {
			stack[len++] = x % 10 + '0';
			x /= 10;
		}
		for (int i = len - 1; i >= 0; i--)
			fb->sputc(stack[i]);
	}
	
	public: template<class INT, class ...ARGS>
	void write(INT a, ARGS ... args) {
		write(a);
		write(args ... );
	}
} output;

int n;
int sum;

signed main() {
    input.read(n);
    for (int i = 1; i <= n; i++) {
        int x;
        input.read(x);
        sum += x;
    }
    output.write(sum);
    return 0;
}
```