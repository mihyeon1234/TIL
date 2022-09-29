n, m = map(int, input().split())

li = []

def dfs(start):
    if len(li)==m:
        print(*li)
        return
    for i in range(start, 1+n):
        if i not in li:
            li.append(i)
            dfs(i+1)
            li.pop()

dfs(1)