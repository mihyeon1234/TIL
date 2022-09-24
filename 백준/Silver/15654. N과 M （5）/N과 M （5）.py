n, m = map(int, input().split())
arr = list(map(int, input().split()))
arr.sort()
li = []

def dfs():
    if len(li) == m:
        print(*li)
        return
    for i in range(n):
        if arr[i] not in li:
            li.append(arr[i])
            dfs()
            li.pop()

dfs()
