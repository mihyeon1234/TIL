pr = int(input())
num = int(input())
su = 0
for i in range(num):
    a,b = map(int, input().split())
    su += (a*b)

if pr == su:
    print('Yes')
else:
    print('No')