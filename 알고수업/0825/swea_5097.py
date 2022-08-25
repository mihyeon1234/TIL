import sys
sys.stdin = open('swea_5097.txt')

T = int(input())
for t in range(1, T+1):
    n, m = map(int, input().split())
    arr = list(map(int, input().split()))
    s = m%n

    print(f'#{t} {arr[s]}')
