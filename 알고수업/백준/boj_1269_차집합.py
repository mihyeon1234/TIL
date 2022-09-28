import sys
input = sys.stdin.readline

a, b = map(int, input().split())
li = list(map(int, input().split()))
li += (list(map(int, input().split())))
lli = len(li)
sli = len(set(li))*2
print(sli-lli)