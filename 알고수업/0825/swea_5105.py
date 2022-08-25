import sys
sys.stdin = open('swea_5105.txt')


def bfs(i, j, s, N):
    global minV
    if arr[i][j] == 3:
        if minV > s-1:
            minV = s-1
        return minV
    else:
        visited[i][j] = 1
        for di, dj in [[0, 1], [1, 0], [0, -1], [-1, 0]]:
            ni, nj = i + di, j + dj
            if 0 <= ni < N and 0 <= nj < N and arr[ni][nj] != 1 and visited[ni][nj] == 0:
                bfs(ni, nj, s + 1, N)
        visited[i][j] = 0
        return minV


T = int(input())
for t in range(1, T + 1):
    N = int(input())
    arr = [list(map(int, input())) for _ in range(N)]
    ai = -1
    aj = -1
    visited = [[0] * N for _ in range(N)]
    for i in range(N - 1, -1, -1):
        for j in range(N):
            if arr[i][j] == 2:
                ai, aj = i, j
                break
    s = 0
    minV = N*N
    bfs(ai, aj, s, N)
    if minV == N*N:
        minV = 0
    print(f'#{t} {minV}')
