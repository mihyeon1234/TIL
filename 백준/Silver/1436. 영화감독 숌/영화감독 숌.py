n = int(input())
# co = 1
# cnt = 0
# while True:
#     for i in range(10*co):
#         for j in range(10*co):
#             cnt += 1
#             A = str(j)+'666'+str(i)
#             if cnt == n:
#                 print(cnt, A.strip('0'))
#                 break
#     co += 1
cnt = 0
start = 666
while True:
    if '666' in str(start):
        cnt+=1
    if cnt == n:
        print(start)
        break
    start+=1
