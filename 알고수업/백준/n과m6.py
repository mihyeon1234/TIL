import sys
input = sys.stdin.readline

n, m = map(int, input().split())
arr = list(map(int, input().split()))
arr.sort()
li = []

def bfs(start):
    if len(li) == m:
        print(*li)
        return
    for i in range(start, n):
        if arr[i] not in li:
            li.append(arr[i])
            bfs(i+1)
            li.pop()

bfs(0)