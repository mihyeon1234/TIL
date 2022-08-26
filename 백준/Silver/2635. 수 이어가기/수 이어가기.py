num = int(input())
max_a = 0
re_li = []
for i in range(num, -1, -1):
    arr = [num, []]
    arr[1] = i
    if num == 0:
        re_li = [0]
        break
    for j in range(2, num+50):
        arr.append(arr[j-2]-arr[j-1])
        if arr[-1] < 0:
            break
    if len(arr) > max_a:
        max_a = len(arr)
        re_li = arr
if len(re_li) > 2:
    re_li.pop()
print(len(re_li))
print(*re_li)