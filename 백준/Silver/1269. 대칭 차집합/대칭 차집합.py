import sys
input = sys.stdin.readline

a, b = map(int, input().split())
li = list(map(int, input().split()))
li += (list(map(int, input().split())))
print(len(li)-(len(li)-len(set(li)))*2)