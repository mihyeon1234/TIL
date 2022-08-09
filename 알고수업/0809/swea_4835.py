import sys
sys.stdin = open('swea_4835.txt')

t = int(input())
for i in range(t):

    a, b = map(int, input().split())
    num = list(map(int, input().split()))

    result = []
    for j in range(0, a-b+1):
        ap = 0
        for p in range(b):
            ap += num[j+p]

        result.append(ap)

    for k in range(a-b, 0, -1):
        for l in range(0, k):
            if result[l] > result[l+1]:
                result[l], result[l+1] = result[l+1], result[l]

    print(f'#{t} {result[-1] - result[0]}')
