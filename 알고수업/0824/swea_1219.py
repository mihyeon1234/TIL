import sys
sys.stdin = open('swea_1219.txt')


def bfs(v, N, t):
    visited = [0] * (N + 1)
    q = []
    q.append(v)
    visited[v] = 1
    while q:
        v = q.pop(0)
        if v == t:
            return 1  # 목표발견
        # v에 인접하고 방문 안한 w 인큐, 표시
        for w in adjList[v]:
            if visited[w] == 0:
                q.append(w)
                visited[w] = visited[v] + 1
    return 0


T = 10
for _ in range(1, T + 1):
    tc, E = map(int, input().split())
    arr = list(map(int, input().split()))

    adjList = [[] for _ in range(100)]
    for i in range(E):
        a, b = arr[i * 2], arr[i * 2 + 1]
        adjList[a].append(b)  # 단반향
    print(f'#{tc} {bfs(0, 99, 99)}')  # 시작, 마지막정점, 목표정점
