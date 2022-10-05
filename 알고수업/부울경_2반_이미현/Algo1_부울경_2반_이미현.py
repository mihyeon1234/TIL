T = int(input())
for t in range(1, T+1):
    n = int(input())
    graph = [list(map(int, input().split())) for _ in range(n)]

    def search(x, y):        # x+1 재귀
        if x < 0 or x >= n or y < 0 or y >= n: # 벽에 닿으면 끝
            return
        if graph[x][y] == 1:        # 장애물이 나와도 끝
            return
        if graph[x][y] == 0:     # 공격가능한 위치면 3으로 변경
            graph[x][y] = 3

        search(x + 1, y)



    def search2(x, y):      # y+1 재귀
        if x < 0 or x >= n or y < 0 or y >= n:  # 벽에 닿으면 끝
            return
        if graph[x][y] == 1:  # 장애물이 나와도 끝
            return
        if graph[x][y] == 0:     # 공격가능한 위치면 3으로 변경
            graph[x][y] = 3

        search2(x, y + 1)


    def search3(x, y):      # x-1 재귀
        if x < 0 or x >= n or y < 0 or y >= n:  # 벽에 닿으면 끝
            return
        if graph[x][y] == 1:  # 장애물이 나와도 끝
            return
        if graph[x][y] == 0:     # 공격가능한 위치면 3으로 변경
            graph[x][y] = 3

        search3(x - 1, y)

    def search4(x, y):      # y-1 재귀
        if x < 0 or x >= n or y < 0 or y >= n:  # 벽에 닿으면 끝
            return
        if graph[x][y] == 1:  # 장애물이 나와도 끝
            return
        if graph[x][y] == 0:     # 공격가능한 위치면 3으로 변경
            graph[x][y] = 3

        search4(x, y - 1)

    for i in range(n):
        for j in range(n):
            if graph[i][j] == 2:
                search(i,j)
                search2(i, j)
                search3(i, j)
                search4(i, j)

    cnt = 0
    for i in graph:
        cnt += i.count(0)
    print(f'#{t} {cnt}')
