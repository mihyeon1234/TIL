import sys
input = sys.stdin.readline
n, m = map(int, input().split())

li = list(range(n+1))

for i in range(m):
    a, b, c = map(int, input().split())
    li[a:b+1] = li[c:b+1]+li[a:c]
print(*li[1:])