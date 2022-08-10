import sys
sys.stdin = open('p1.txt')

T = int(input())

for re in range(T):
    N = int(input())
    arr = [list(map(int, input().split())) for _ in range(N)]
    dj = [0, 0, -1, 1]
    di = [-1, 1, 0, 0]
    li=[]
    for i in range(N):
        for j in range(N):
            su = 0
            for k in range(4):
                ni = i+di[k]
                nj = j+dj[k]
                if 0 <= ni < N and 0 <= nj < N:
                    su += abs(arr[i][j]-arr[ni][nj])
            li.append(su)
    print(li)
    print(sum(li))