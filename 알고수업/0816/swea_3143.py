import sys
sys.stdin = open('swea_3143.txt')

t = int(input())

for tt in range(1, t+1):
    a, b = map(str, input().split())
    co = a.count(b) #b가 몇번 반복되는지
    print(f'#{tt} {len(a) - co * int(len(b) - 1)}') # 전체 글자 수에서 b가 반복된만큼 b-1글자를 빼주기
