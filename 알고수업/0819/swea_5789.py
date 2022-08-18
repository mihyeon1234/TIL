import sys
sys.stdin =open('swea_5789.txt')

t = int(input())
for tt in range(1, t+1):
    n, q = map(int, input().split())
    li = [0]*n
    for i in range(1, q+1):
        a, b = map(int, input().split())
        for j in range(a-1, b):
            li[j] = i

    print(f'#{tt}', *li)
