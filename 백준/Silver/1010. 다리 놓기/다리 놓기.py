import sys
input = sys.stdin.readline

def fact(a):
    re = 1
    for j in range(1, a+1):
        re *= j
    return re


r = int(input())

for i in range(r):
    n, m = map(int, input().split())
    re = fact(m)//(fact(n)*fact(m-n))
    print(re)
