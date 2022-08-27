import sys
input = sys.stdin.readline
num, co = map(int, input().split())
arr = list(map(int, input().split()))

# maxarr = 0
# for i in range(num-co+1):  # 하나씩 더해서 max값 확인하기
#     arr_plus = 0
#     for j in range(co):
#         arr_plus += arr[i+j]
#         if arr_plus > maxarr:
#             maxarr = arr_plus

# for i in range(num-co+1):
#     arr_plus = sum(arr[i:co+i])  # 하나씩 안더하고 co 갯수만큼 한꺼번에 더하기
#     print(arr[i:co+i])
#     if arr_plus > maxarr:
#         maxarr = arr_plus

n_arr = [0]
su = 0
for i in arr:
    su += i
    n_arr.append(su)

rst = []

for i in range(num-co+1):
    rst.append(n_arr[i+co] - n_arr[i])

print(max(rst))