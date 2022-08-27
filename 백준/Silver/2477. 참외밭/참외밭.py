import sys
input = sys.stdin.readline

co = int(input())
arr = []
for _ in range(6):
    n, m = map(int, input().split())
    arr.append(m)

all = arr+arr+arr
mx = max(arr)
mx_id = all.index(mx)+6

if mx == all[mx_id + 1]:
    mx_id = mx_id + 1

if all[mx_id - 1] >= all[mx_id + 1]:
    area = mx*all[mx_id-1]
    min_area = all[mx_id + 2] * all[mx_id + 3]

elif all[mx_id - 1] < all[mx_id + 1]:
    area = mx * all[mx_id + 1]
    min_area = all[mx_id + 3] * all[mx_id + 4]

print((area-min_area)* co)