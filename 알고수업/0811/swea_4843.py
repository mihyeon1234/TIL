import sys
sys.stdin = open('swea_4843.txt')

t = int(input())
for tt in range(t):
    n = int(input())
    arr = sorted(list(map(int, input().split())))
    li=[]

    for i in range(n//2):
        li.append(arr[-i-1])
        li.append(arr[i])
    if n // 2 != n / 2:
        li.append(arr[n//2])

    print(f'#{tt+1}',end=' ')
    print(*li[:10])