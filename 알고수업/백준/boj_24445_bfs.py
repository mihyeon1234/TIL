from collections import deque
import sys
input = sys.stdin.readline

def bfs(v):
    global count
    q = deque([r])
    while q:
        v = q.popleft()
        graph[v].sort()
        for i in graph[v]:
            if visited[v] == 0:
                count += 1
                visited[i] = count
                q.append(i)

n, m, r = map(int, input().split())
graph = [[]for _ in range(n+1)]
visited = [0]*(n+1)
count = 1
for i in range(m):
    a, b = map(int, input().split())
    graph[a] = b
    graph[b] = a

bfs(r)

