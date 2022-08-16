import sys
sys.stdin = open('swea_4864.txt')

t = int(input())

for tt in range(1, t+1):
    a = input()
    b = input()
    if b.count(a):
        print(f'#{tt} 1')
    else:
        print(f'#{tt} 0')
