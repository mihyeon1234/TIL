import sys
input = sys.stdin.readline

k, n = map(int, input().split())
li = []
for i in range(k):
    li.append(int(input()))

start = 1
end = int(sum(li)/n)

while (start <= end):
    mid = (start + end) // 2
    co = 0
    for j in li:
        co += j // mid
    if co >= n:
        start = mid + 1
    else:
        end = mid - 1
print(end)

# re = True
# for i in range(int(sum(li)/n), 0, -1):
#     co = 0
#     if re == False:
#         break
#     for j in li:
#         co += j//i
#         if co >= n:
#             re = False
#             print(i)
#             break

# print(re)
