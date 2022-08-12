import sys
sys.stdin = open('swea_9367.txt')

t = int(input())
for tt in range(1,t+1):
    num = int(input())
    if num % 2 == 0:
        print(f'#{tt} Alice')
    elif num % 2 != 0:
        print(f'#{tt} Bob')

