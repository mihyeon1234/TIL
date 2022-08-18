import sys
sys.stdin = open('swea_6485.txt')

t = int(input())
for tt in range(1, t+1):
    n = int(input())
    a, b = [], []
    for _ in range(n):
        aa, bb = map(int, input().split())
        a.append(aa)
        b.append(bb)

    print(a,b)