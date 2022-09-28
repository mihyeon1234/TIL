n, m = map(int, input().split())
li = []

def dfs():
    if len(li) == m:
        for j in li:
            print(j, end=' ')
        print()
        return
    for i in range(1, n+1):
        if i not in li:
            li.append(i)
            dfs()
            li.pop()

dfs()

