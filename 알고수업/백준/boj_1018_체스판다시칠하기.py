import sys
input = sys.stdin.readline

n, m = map(int, input().split())

arr = []
for _ in range(n):
    li = list(input())
    arr.append(li)
rstmin = n*m
for i in range(n-7):
    for j in range(m-7):
        rearr = []
        for ii in range(8):
            for jj in range(8):
                rearr += arr[i+ii][j+jj]
            rearr += '0'

        aarr = []
        barr = []
        for k in range(1, 72, 2):
            aarr += rearr[k-1]
            barr += rearr[k]

        a = aarr.count('W') + barr.count('B')
        b = aarr.count('B') + barr.count('W')

        rstmin = min(rstmin, a, b)

print(rstmin)