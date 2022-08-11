import sys
sys.stdin = open('swea_1979.txt')
t = int(input())

for tt in range(t):
    n,k = map(int, input().split())
    arr = [list(map(int, input().split()))*n for _ in range(n)]


