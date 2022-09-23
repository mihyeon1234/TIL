maxL = 0
maxH = 0
n = int(input())
arr = []

for i in range(n):
    l, h = map(int, input().split())
    arr.append([l,h])
    if maxL < l:
        maxL = l
    if maxH < h:
        maxH = h
        maxidx = l

arrli = [0]*(maxL + 1)

for l,h in arr:
    arrli[l] = h
area = 0
temp = 0

for i in range(maxidx +1):
    if arrli[i] > temp:
        temp = arrli[i]
    area += temp
temp = 0
for i in range(maxL, maxidx, -1):
    if arrli[i] > temp:
        temp = arrli[i]
    area += temp
print(area)