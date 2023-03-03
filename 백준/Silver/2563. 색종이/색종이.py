import sys
input = sys.stdin.readline

n = int(input())
li = [[0]*100 for i in range(100)]
for _ in range(n):
    x, y = map(int, input().split())
    for i in range(10):
        for j in range(10):
            li[x+i][y+j] = 1

su = 0
for i in range(100):
    su += sum(li[i])
print(su)