import sys

t = int(sys.stdin.readline())
li=[]
for tt in range(t):
    li.append(int(sys.stdin.readline()))
rli = sorted(li, reverse=False)

for i in range(t):
    print(rli[i])