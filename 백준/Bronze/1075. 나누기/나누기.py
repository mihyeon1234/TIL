import sys
n = int(sys.stdin.readline())
f = int(sys.stdin.readline())
for i in range((n//100)*100, (n//100)*100+99):
    if i%f == 0:
        print(str(i)[-2:])
        break
