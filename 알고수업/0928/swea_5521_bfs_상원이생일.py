def bfs(n, m):
    q = [1]     # 큐 생성 + 시작접 인큐
    visited = [0]*(n+1)     # visited 생성
    visited[1] = 1     # 시작점 방문 표시
    while q:            # 큐가 비어잇지 않으면
        t = q.pop(0)    # 첫번째값 빼옴
        if visited[t] > 3:
            break
        for i in range(1, n+1):
            if adj[t][i]==1 and visited[i]==0:
                q.append(i)
                visited[i] = visited[t] +1
    cnt = 0
    for i in range(1, n+1):
        if 1<visited[i]<4:
            cnt += 1
    return cnt

T = int(input())
for t in range(1, T+1):
    n, m = map(int, input().split())
    adj = [[0] * (n + 1) for _ in range(n + 1)]

    for i in range(m):
        a, b = map(int, input().split())
        adj[a][b] = 1
        adj[b][a] = 1
    ans = bfs(n, m)
    print(f'#{t} {ans}')
