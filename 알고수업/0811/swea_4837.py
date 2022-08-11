import sys
sys.stdin = open('swea_4837.txt')

t = int(input())

a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
for tt in range(t):
    n, k = map(int, input().split())
    li = []
    for i in range(1 << len(a)):
        su = []
        for j in range(len(a)):
            if i & (1 << j):
                su.append(a[j])
        if len(su) == n and sum(su) == k:
            li.append(su)
    print(f'#{tt+1} {len(li)}')