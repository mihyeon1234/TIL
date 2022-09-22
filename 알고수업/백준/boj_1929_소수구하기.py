s, e = map(int, input().split())
# for i in range(s, e):
#     re = 0
#     for j in range(2, i):
#         if i % j == 0:
#             re = 1
#             break
#     if re == 0:
#         print(i)

re = [1]*(e+1)
re[0] = 0
re[1] = 0
for i in range(2, e+1, 1):
    if re[i] == 1:
        for j in range(2*i, e+1, i):
            re[j] = 0
for i in range(s, e+1):
    if re[i] == 1:
        print(i)