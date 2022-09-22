import sys
n, m = map(int, sys.stdin.readline().split())
li = list(map(int, sys.stdin.readline().split()))
# 시간초과
# h = max(li)
# re = 0
# for i in range(h, -1, -1):
#     cut = 0
#     for j in li:
#         if j > i:
#             cut += j-i
#     if cut >= m:
#         re = i
#         break
#
# print(i)

start = 1
end = max(li)
while start <= end:
    mid = (start+end)//2
    ans = 0
    for i in li:
        if i > mid:
            ans += (i-mid)
        if ans > m:			# 절단된 나무를 추가하는중에 이미 m을 넘어버린경우 중단한다.
            break
    if ans >= m:
        start = mid + 1
    else:
        end = mid - 1

print(end)
