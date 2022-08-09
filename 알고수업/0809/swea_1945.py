import sys
sys.stdin = open('swea_1945.txt')

t = int(input())
for i in range(t):
    num = int(input())
    li = []
    a = b = c = d = e = 0
    while num >= 2:
        if num % 2 == 0:
            num = num / 2
            a += 1
        elif num % 3 == 0:
            num = num / 3
            b += 1
        elif num % 5 == 0:
            num = num / 5
            c += 1
        elif num % 7 == 0:
            num = num / 7
            d += 1
        elif num % 11 == 0:
            num = num / 11
            e += 1
    print(f'#{i + 1} {a} {b} {c} {d} {e}')
