import sys
input = sys.stdin.readline

n, m = map(int, input().split())
arr = list(map(int, input().split()))
arr.sort()
li = []

def bfs():
    if len(li)==m:
        print(*li)
        return
    for i in range(n):
        li.append(arr[i])
        bfs()
        li.pop()

bfs()