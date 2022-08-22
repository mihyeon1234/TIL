import sys

x, y = map(int, sys.stdin.readline().split())

xarr = [0]
yarr = [0]
n = int(input())
for tt in range(n):
    a, b = map(int, sys.stdin.readline().split())
    if a == 1:
        xarr.append(b)
    if a == 0:
        yarr.append(b)
xarr += [x]
yarr += [y]
xarr.sort()
yarr.sort()
max_area = 0
for i in range(1, len(xarr)):
    for j in range(1, len(yarr)):
        area = (xarr[i] - xarr[i-1]) * (yarr[j] - yarr[j-1])
        if area > max_area:
            max_area = area
print(max_area)
