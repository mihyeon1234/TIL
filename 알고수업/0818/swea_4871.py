import sys
sys.stdin = open('swea_4871.txt')


def dfs(a, num):
    stack = [0]*num
    top = -1
    visited[a] = 1
    while True:
        for w in line[a]:
            if visited[w] == 0:
                top += 1
                stack[top] = a
                visited[w] = 1
                a = w
                break
        else:
            if top != -1:
                a = stack[top]
                top -= 1
            else:
                break

t = int(input())

for tt in range(1, t+1):
    num, linum = map(int, input().split())
    line = [[]for _ in range(num+1)]

    for i in range(linum):
        aa,bb = (map(int, input().split()))
        line[aa].append(bb)
    # for k in line:
    #     k.sort()

    a, b = map(int, input().split())

    visited = [0]*(num+1)
    dfs(a, num)

    if visited[a] == 1 and visited[b] == 1:
        print(f'#{tt} 1')
    else:
        print(f'#{tt} 0')


