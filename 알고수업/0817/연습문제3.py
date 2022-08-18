import sys
sys.stdin = open('연습문제3.txt')
# 1 2 1 3 2 4 2 5 4 6 5 6 6 7 3 7
num, line = map(int, input().split())
orili = list(map(int, input().split()))

numli = [[] for _ in range(num + 1)]

for i in range(0, len(orili), 2):
    numli[orili[i]].append(orili[i+1])
    numli[orili[i + 1]].append(orili[i])


def dfs(n, num, numli):
    top = -1
    visited = [False] * (num + 1)
    stack = [0] * (num + 1)
    v = n
    visited[n] = 1
    print(v, end=' ')

    while True:
        for w in numli[v]:           # 이웃한 정점들 중에 방문하지 않은 곳 확인
            if visited[w] == False:
                top += 1
                stack[top] = v      # 지나온 곳 정보 저장
                visited[w] = True      # 방문 기록 남기기
                v = w
                print(v, end=' ')
                break
        else:
            if top != -1:           # stack이 남아있을 때는 소진할 때까지 탐색
                v = stack.pop(top)
                top -= 1
            else:
                break

dfs(1, num, numli)
