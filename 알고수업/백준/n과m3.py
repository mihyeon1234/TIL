n, m = map(int, input().split())
li=[]

def dfs():
    if len(li) == m:
        print(*li)
        return
    for i in range(1, 1+n):
        li.append(i)
        dfs()
        li.pop()

dfs()