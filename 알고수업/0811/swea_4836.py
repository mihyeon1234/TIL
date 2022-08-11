import sys
sys.stdin = open('swea_4836.txt')
t = int(input())

for tt in range(t):
    n = int(input())
    arr = [[0]*10 for i in range(10)]
    reco = 0
    for nn in range(n):
        li = list(map(int, input().split()))
        for i in range(li[0], li[2]+1):
            for j in range(li[1], li[3]+1):
                arr[i][j] += 1
                if arr[i][j] == 2:
                    reco += 1
    print(f'#{tt+1} {reco}')

