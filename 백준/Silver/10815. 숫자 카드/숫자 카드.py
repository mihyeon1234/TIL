import sys

num = int(sys.stdin.readline())

li = set(list(map(int, sys.stdin.readline().split())))

m = int(sys.stdin.readline())

sli = list(map(int, sys.stdin.readline().split()))

for i in sli:
    if i in li:
        print(1, end=' ')
    else:
        print(0, end=' ')
