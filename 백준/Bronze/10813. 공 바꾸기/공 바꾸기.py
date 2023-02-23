import sys

m, n = map(int, sys.stdin.readline().split())

li = list(range(m+1))

for i in range(n):
    a, b = map(int, sys.stdin.readline().split())
    li[a] , li[b] = li[b], li[a]

print(*li[1:])