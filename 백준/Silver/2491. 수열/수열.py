import sys
input = sys.stdin.readline
num = int(input())
arr = list(map(int, input().split()))

arr_plus = 1
arr_m = 1
maxarr = 1
for i in range(1, num):
    if arr[i-1] <= arr[i]:
        arr_plus += 1
        if arr_plus > maxarr:
            maxarr = arr_plus
    elif arr[i - 1] > arr[i]:
        arr_plus = 1
    if arr[i - 1] >= arr[i]:
        arr_m += 1
        if arr_m > maxarr:
            maxarr = arr_m
    else:
        arr_m = 1

print(maxarr)
