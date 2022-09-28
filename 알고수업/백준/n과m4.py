n, m = map(int, input().split())
li = []

def dfs(a):
    if len(li) == m:
        print(*li)
        return
    for i in range(a, 1+n):
        li.append(i)
        dfs(i)
        li.pop()

dfs(1)

