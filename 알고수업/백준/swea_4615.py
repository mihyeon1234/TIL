t = int(input())
le = ((0, 1), (1, 0), (-1, 0), (0, -1), (1, 1), (-1, 1), (-1, -1), (1, -1))

for T in range(1, t+1):
    n, m = map(int, input().split())
    a = int(n/2)
    arr = [[0]*n for _ in range(n)]
    arr[a-1][a-1] = arr[a][a] = 2
    arr[a-1][a] = arr[a][a-1] = 1
    for _ in range(m):
        i, j, color = map(int, input().split())
        i = i-1
        j = j-1

        re = []
        for aa in range(8):
            dx, dy = le[aa]
            nx, ny = i+dx, j+dy
            while True:
                if nx < 0 or ny < 0 or nx>n-1 or ny>n-1:
                    re = []
                    break
                if arr[nx][ny]==0:
                    re=[]
                    break
                if arr[nx][ny]==color:
                    break
                else:
                    re.append((nx,ny))
                nx, ny = dx+nx, dy+ny

            for a, b in re:
                if color == 1:
                    arr[a][b] = 1
                else:
                    arr[a][b] = 2
        arr[i][j] = color

    cb = cw = 0
    for i in arr:
        cb += i.count(1)
        cw += i.count(2)
    print(f'#{T} {cb} {cw}')