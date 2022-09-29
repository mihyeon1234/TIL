import sys
input = sys.stdin.readline

n, m = map(int, input().split())
arr = list(map(int, input().split()))
arr.sort()
li = []

def f(a):
    if len(li)==m:
        print(*li)
        return
    for i in range(a, n):
        li.append(arr[i])
        f(i)
        li.pop()
f(0)