import sys

a=[]
for tt in range(9):
    num = int(sys.stdin.readline())
    a.append(num)


for i in range(1<<len(a)):
    su = []
    for j in range(len(a)):
        if i & (1 << j):
            su.append(a[j])
    if len(su) == 7 and sum(su) == 100:
        re = sorted(su)
for k in range(7):
    print(re[k])