import sys
t = int(sys.stdin.readline())
arr = list(map(int, sys.stdin.readline().split()))
li=[]
for i in range(1,t+1):
    li.insert(len(li)-arr[i-1],i)
print(*li)