import sys

t = int(sys.stdin.readline())
for tt in range(t):
    r, n = map(int, sys.stdin.readline().split())
    if n == r:
        print(1)
    elif r > n:
        print(n)
    else:
        mr = max(n-r, r)
        s = 1
        ss = 1

        for i in range(mr+1, n+1):
            s *= i

        for j in range(1,n-mr+1):
            ss *= j
        print(int(s/ss))
