import sys
t = int(sys.stdin.readline())
li=[]
for i in range(t):
    n, m = map(int, sys.stdin.readline().split())
    li.append([n, m])
sli = sorted(li)
for j in range(t):
    print(*sli[j])