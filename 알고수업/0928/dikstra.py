'''
1
4 8 2
1 2 4
1 3 2
1 4 7
2 1 1
2 3 5
3 1 2
3 4 4
4 2 3
'''

def dijkstra(N, X, adj, d):
    for i in range(N+1):
        d[i] = adj[X][i]
    U = [X]
    for _ in range(N-1):  #n개의 정점 중 출발을 제외한 정점 선택
        w = 0
        for i in range(1, N+1):
            if (i not in U) and d[i] < d[w]:  # 남은 노드 중 비용이 최소인 w
                w = i
        U.append(w)
        for v in range(1, N+1):  # 정점 i가
            if 0 < adj[w][v] < 1000000:  # w에 인접이면
                d[v] = min(d[v], d[w] + adj[w][v])

T = int(input())
for tc in range(1, T+1):
    N, M, X = map(int, input().split())
    adj1 = [[1000000] * (N+1) for _ in range(N+1)]
    for i in range(N+1):
        adj1[i][i] = 0
    for _ in range(M):
        x, y, c = map(int, input().split())
        adj1[x][y] = c

    dout = [0] * (N+1)

    dijkstra(N, X, adj1, dout)
    print(dout)


