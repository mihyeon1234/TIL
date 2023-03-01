from sys import stdin
input = stdin.readline

n, m = map(int, input().split())
li = [0]*(n+1)

for i in range(m):
    i, j, k = map(int, input().split())
    for a in range(i, j+1):
        li[a] = k

# print(*li[1:])
print(" ".join(map(str, li[1:])))

