import sys

arr = [[0]*100 for _ in range(100)]

for k in range(4):
    x, y, x1, y1 = map(int, sys.stdin.readline().split())
    for i in range(x, x1):
        for j in range(y, y1):
            arr[i][j] = 1
su = 0
for s in range(100):
    su += sum(arr[s])
print(su)