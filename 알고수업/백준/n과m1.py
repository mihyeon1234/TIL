import sys
input = sys.stdin.readline

n, m = map(int, input().split())
li = []

def dfs():
    if len(li) == m:
        print(*li)
        return
    for i in range(1, n+1):
        if i not in li:
            li.append(i)
            dfs()
            li.pop()
dfs()