import sys
sys.stdin = open('swea_1208.txt')

for i in range(10):
    num = int(input())
    li = sorted(list(map(int, input().split())))
    for j in range(num):
        li[-1] = li[-1]-1
        li[0] = li[0]+1
        li = sorted(li)
    print(f'#{i+1} {max(li)-min(li)}')