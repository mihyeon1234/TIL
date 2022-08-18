import sys
sys.stdin = open('swea_1219.txt')

def dfs(a, nu):
    stack = [0]*nu
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


for t in range(10):
    tt, num = map(int, input().split())
    li = list(map(int, input().split()))
    line=[[]for _ in range(100)]
    for i in range(0, len(li), 2):
        line[li[i]].append(li[i+1])
    visited = [0]*100

    dfs(0, 100)
    if visited[0]==1 and visited[99]==1:
        print(f'#{tt} 1')
    else:
        print(f'#{tt} 0')

