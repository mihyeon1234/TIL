import sys
input = sys.stdin.readline

def search(x,y):
    if x < 0 or x >= M or y < 0 or y >= N:
        return

    if graph[x][y] == 0:
        return


    graph[x][y] = 0 # 탐색한 배추는 0으로

    search(x+1,y)
    search(x,y+1)
    search(x-1,y)
    search(x,y-1)

T = int(input())

for _ in range(T):
    N, M, K = map(int, input().split())
    graph = [[0] * N for _ in range(M)]

    result = 0 # 지렁이 수

    for _ in range(K):
        a,b = map(int,input().split())
        graph[b][a] = 1

    for i in range(M):
        for j in range(N):
            if graph[i][j] == 1:
                search(i,j)
                result += 1

    print(result)


