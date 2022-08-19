import sys
sys.stdin = open('swea_1979.txt')

T = int(input())
for tc in range(1, T+1):
    n, k = map(int, input().split())
    arr = [[0 for _ in range(n+2)]] + [[0] + list(map(int, input().split())) + [0] for _ in range(n)] + [[0 for _ in range(n+2)]]
    n_arr = list(zip(*arr))

    count = 0

    for x in range(1, n+1):
        for y in range(1, n-k+2):
            if not arr[x][y - 1] and not arr[x][y + k] and sum(arr[x][y:y + k]) == k:
                count += 1
            if not n_arr[x][y-1] and not n_arr[x][y+k] and sum(n_arr[x][y:y+k]) == k:
                count += 1
    print(f'#{tc} {count}')



