n = int(input())
# co = 1
# cnt2 = 0
# tf = True
# while tf==True:
#     for i in range(10*co):
#         for j in range(10*co):
#             cnt2 += 1
#             A = str(j)+'666'+str(i)
#             print(A.strip('0'), end=' ')
#             if cnt2 == n:
#                 print(cnt2, A.strip('0'))
#                 tf = False
#                 break
#     co += 1
#
# print()
# print()

cnt = 0
start = 666
while True:
    if '666' in str(start):
        cnt+=1
        print(start, end=' ')
    if cnt == n:
        print(start)
        break
    start+=1



