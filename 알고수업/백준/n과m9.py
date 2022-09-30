import sys
input = sys.stdin.readline

n, m = map(int, input().split())
arr = list(map(int, input().split()))
co = [i for i in range(n)]
arr.sort()
li = []
lizip = []

def f():
    if len(li) == m:
        subli = []
        for i in li:
            subli.append(arr[i])
        lizip.append(subli)
        return
    for i in range(n):
        if co[i] not in li:
            li.append(co[i])
            f()
            li.pop()
f()
lizip.sort()
for i in range(len(lizip)-1):
    if lizip[i] == lizip[i+1]:
        lizip[i] = [0]

for i in lizip:
    if i != [0]:
        print(*i)