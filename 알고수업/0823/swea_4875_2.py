import sys
sys.stdin = open('swea_4875.txt')


def bfs(i, j, N):
    visited = [[0] * N for _ in range(N)]            # dfs 탐색 위해 미리 visited 리스트 만들어놓기
    q = []
    q.append((i, j))
    visited[i][j] = 1
    while q:
        i, j = q.pop(0)
        if maze[i][j] == 3:  # 3번인가?
            return 1
        for di, dj in [[0, 1], [1, 0], [0, -1], [-1, 0]]:
            ni, nj = i+di, j+dj
            if 0 <= ni < N and 0 <= nj < N and maze[ni][nj] != 1 and  visited[ni][nj] == 0:
                q.append((ni, nj))
                visited[ni][nj] = visited[ni][nj] + 1
    return 0


T = int(input())
for t in range(1, T+1):
    N = int(input())
    maze = [list(map(int, input())) for _ in range(N)]  # 이중리스트만들기
    sti = -1
    stj = -1
    for i in range(N-1, -1, -1):                # 시작점 찾고, c, d 에 시작점 인덱스값 넣어줌
        for j in range(N):
            if maze[i][j] == 2:
                sti, stj = i, j
                break
        if sti != -1:
            break
    print(f'#{t} {bfs(sti, stj, N)}')