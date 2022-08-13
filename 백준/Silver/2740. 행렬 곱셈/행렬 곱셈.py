import sys

an, am = map(int, sys.stdin.readline().split())
a = [list(map(int, sys.stdin.readline().split()))for _ in range(an)]

bm, bk = map(int, sys.stdin.readline().split())
b = [list(map(int, sys.stdin.readline().split()))for _ in range(bm)]

arr = [[0]*bk for _ in range(an)]
for i in range(an):
    for j in range(bk):
        for k in range(bm):
            arr[i][j] += a[i][k]*b[k][j]
for aa in range(an):
    print(*arr[aa])

