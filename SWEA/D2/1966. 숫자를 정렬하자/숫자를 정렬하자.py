t = int(input())
for tt in range(1, t+1):
    num = int(input())
    li = list(map(int, input().split()))
    sli = sorted(li)
    print(f'#{tt}', end=' ')
    print(*sli)
