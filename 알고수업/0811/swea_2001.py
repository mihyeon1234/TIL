import sys
sys.stdin = open('swea_2001.txt')

t = int(input())
for tt in range(t):
    n, m = map(int, input().split())
    arr = [list(map(int, input().split()))*n for _ in range(n)]
    li=[]
    for i in range(n-m+1):
        for j in range(n-m+1):
            su = 0
            for ki in range(m):
                for kj in range(m):
                    su += (arr[i + ki][j+kj])
            li.append(su)
    print(f'#{tt+1} {max(li)}')


