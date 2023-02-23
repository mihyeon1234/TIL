import sys
input = sys.stdin.readline

n, m = map(int, input().split())

li = list(range(n+1))

for i in range(m):
    i, j = map(int, input().split())
    li[i:j+1] = li[i:j+1][::-1]
print(*li[1:])