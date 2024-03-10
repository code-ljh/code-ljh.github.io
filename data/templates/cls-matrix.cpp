class Matrix {
    private:
        static const int maxn = 32;
        static const int mod = 2017;
        using vt = int;
        
        int row, col;
        vt mat[maxn][maxn];

    public:
        Matrix(int r=-1, int c=-1) {
            this->row = r;
            this->col = c;
            this->SetZero();
        }

        void SetSize(int r, int c) {
            if (this->row == -1) this->row = r;
            if (this->col == -1) this->col = c;
        }

        void SetZero() {
            for (int i = 1; i <= this->row; i++)
                for (int j = 1; j <= this->col; j++)
                    this->mat[i][j] = 0;
        }

        void SetBase() {
            SetZero();
            for (int i = 1; i <= std::min(this->row, this->col); i++)
                this->mat[i][i] = 1;
        }

        vt& operator() (int x, int y) {
            if (!(1 <= x && x <= row) || !(1 <= y && y <= col)) std::cerr << "Matrix index overflow!\n", exit(0);
            return mat[x][y];
        }

        const vt& operator() (int x, int y) const {
            if (!(1 <= x && x <= row) || !(1 <= y && y <= col)) std::cerr << "Matrix index overflow!\n", exit(0);
            return mat[x][y];
        }

        vt *operator[](int x) {
            if (!(1 <= x && x <= row)) std::cerr << "Matrix index overflow!\n", exit(0);
            return mat[x];
        }

        const vt *operator[] (int x) const {
            if (!(1 <= x && x <= row)) std::cerr << "Matrix index overflow!\n", exit(0);
            return mat[x];
        }

        Matrix operator* (const Matrix& x) const& {
            if (col != x.row) std::cerr << "Matrix size mismatch.\n", exit(0);
            Matrix res(row, x.col);
            for (int i = 1; i <= row; i++)
                for (int j = 1; j <= x.col; j++)
                    for (int k = 1; k <= col; k++) 
                        res(i, j) = (res(i, j) + mat[i][k] * x(k, j) % mod) % mod;
            return res;
        }

        Matrix operator^ (const int& x) const& {
            if (row != col) std::cerr << "Not square Matrix cannot do matrix-power.\n", exit(0);
            if (x == 0) {
                Matrix res(row, row);
                res.SetBase();
                return res;
            } else {
                Matrix son((*this) ^ (x / 2));
                if (x % 2 == 0) {
                    return son * son;
                } else {
                    return son * son * (*this);
                }
            }
        }

        friend std::istream& operator>>(std::istream& stream, Matrix& mat) {
            int row, col;
            stream >> row >> col;
            mat = Matrix(row, col);
            for (int i = 1; i <= row; i++)
                for (int j = 1; j <= col; j++)
                    stream >> mat(i, j);
            return stream;
        }

        friend std::ostream& operator<<(std::ostream& stream, const Matrix& mat) {
            stream << mat.row << " " << mat.col << " matrix: {\n";
            for (int i = 1; i <= mat.row; i++) {
                stream << "    ";
                for (int j = 1; j <= mat.col; j++)
                    stream << mat(i, j) << " ";
                stream << "\n";
            }
            return stream << "}\n";
        }
};