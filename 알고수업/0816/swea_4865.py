import sys
sys.stdin = open('swea_4865.txt')

t = int(input())
for tt in range(1, t+1):
    n = list(input())
    m = input()
    maxm = []
    for i in range(len(n)):
        maxm.append(m.count(n[i]))

    print(f'#{tt} {max(maxm)}')
