import sys
sys.stdin = open('swea_1966.txt')

t = int(input())

for tt in range(t):
    n = int(input())
    arr = list(map(int, input().split()))

    li = sorted(arr, reverse=False)
    print(f'#{tt+1}',end=' ')
    print(*li)


