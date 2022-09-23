import sys

t = int(sys.stdin.readline())
li = []
for i in range(t):
    n = int(sys.stdin.readline())
    if n !=0:
        li.append(n)
    else:
        li.pop()
print(sum(li))