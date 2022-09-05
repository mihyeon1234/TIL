import sys
T = int(sys.stdin.readline())

li=[0]*10001

for t in range(T):
   li[int(sys.stdin.readline())] += 1
   
for i in range(1, 10001):
    if li[i] != 0:
        for _ in range(li[i]):
            print(i)