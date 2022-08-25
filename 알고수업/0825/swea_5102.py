from collections import deque
import sys
sys.stdin = open('swea_5102.txt')


T = int(input())
for t in range(1, T+1):
    v, e = map(int, input().split())
    arr = [[] for _ in range(v+1)]
    for _ in range(e):
        a, b = map(int, input().split())
        arr[a].append(b)
        arr[b].append(a)
    s, g = map(int, input().split())

    visited = [0] * (v+1)
    q = deque([s])
    while q:
        a = q.popleft()
        if a == g:
            ans = visited[a]
            break
        for na in arr[a]:
            if visited[na] == 0:
                q.append(na)
                visited[na] = visited[a] + 1
    else:
        ans = 0

    print(f'#{t} {ans}')

