from sys import stdin
input = stdin.readline
m, n = map(int, input().split())

li = list(range(m+1))

for i in range(n):
    a, b = map(int, input().split())
    # li[a], li[b] = li[b], li[a]
    tmp = li[a]
    li[a] = li[b]
    li[b] = tmp
print(*li[1:], sep=' ')