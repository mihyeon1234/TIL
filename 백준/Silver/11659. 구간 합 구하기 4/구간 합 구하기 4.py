import sys
input = sys.stdin.readline

li_num = list(map(int, input().split()))
li = list(map(int, input().split()))
nli = [0]
su = 0
for i in range(li_num[0]):
    su += li[i]
    nli.append(su)
for j in range(li_num[1]):
    a, b = map(int, input().split())
    print(nli[b]-nli[a-1])
