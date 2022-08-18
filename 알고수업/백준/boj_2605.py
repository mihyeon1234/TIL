import sys
t = int(sys.stdin.readline())
arr = list(map(int, sys.stdin.readline().split()))
li=[]
for tt in range(1,t+1):
    if arr[tt-1] == 0 :
        li.append(tt)
    else:
        li.insert(-arr[tt-1], tt)
print(*li)
