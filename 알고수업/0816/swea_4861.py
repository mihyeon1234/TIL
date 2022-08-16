import sys
sys.stdin = open('swea_4861.txt')

t = int(input())

for tt in range(1,t+1):
    n, m = map(int, input().split())
    arr = [list(map(str, input())) for _ in range(n)]
    reli = []
    for i in range(n):
        for j in range(n - m + 1):
            if arr[i][j:j + m] == arr[i][j:j + m][::-1]:
                reli.append(arr[i][j:j + m])

    newarr = list(zip(*arr))
    for i in range(n):
        for j in range(n - m + 1):
            if newarr[i][j:j + m] == newarr[i][j:j + m][::-1]:
                reli.append(newarr[i][j:j + m])

    re = ''.join(reli[0])
    print(f'#{tt} {re}')
