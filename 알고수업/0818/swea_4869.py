import sys
sys.stdin = open('swea_4869.txt')

t = int(input())

def memo(n):
    li = [0, 1, 3]
    for i in range(3, n+1):
        li.append(li[i-2]*2 + li[i-1])
    return li[n]


for tt in range(1, t+1):
    n = int(input())//10
    print(f'#{tt} {memo(n)}')