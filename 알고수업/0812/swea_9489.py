import sys
sys.stdin = open('swea_9489.txt')

t = int(input())

for tt in range(1,t+1):
    n, m = map(int, input().split())
    maxi = 0

    arr = [list(map(int, input().split()))for _ in range(n)]
    for i in range(n):
        numi = 0
        for j in range(m):
            if arr[i][j] == 1:
                numi += 1
            elif numi > maxi:
                 maxi = numi
                 numi = 0
        if numi > maxi:
            maxi = numi
    for i in range(n):
        num = 0
        for j in range(m):
            if arr[j][i] == 1:
                num += 1
                if num > maxi:
                    maxi = num
                elif num > maxi:
                     maxi = numi
                     num = 0
        if num > maxi:
            maxi = num

    if maxi <= 2:
        maxi = 0

    print(f'#{tt} {maxi}')
