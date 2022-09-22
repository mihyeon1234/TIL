import sys
sys.stdin = open('swea_1240.txt')

t = int(input())
for T in range(1, t+1):
    n, m = map(int, input().split())
    li = []
    key={
        '0001101':0,
        '0011001':1,
        '0010011':2,
        '0111101':3,
        '0100011':4,
        '0110001':5,
        '0101111':6,
        '0111011':7,
        '0110111':8,
        '0001011':9,
    }
    co = 0
    while len(li) == 0:
        co += 1
        st = list(input())
        if st == ['0']*m:
            pass
        else:
            for i in range(m-st[::-1].index('1'), (m-st[::-1].index('1'))%7, -7):
                if key.get(''.join(st[i-7:i])) != None:
                    li.append(key.get(''.join(st[i - 7:i])))
                else:
                    pass
    for _ in range(n-co):
        st = list(input())
    if (sum(li[1:8:2])*3 + sum(li[0:7:2])) % 10 == 0:
        print(f'#{T} {sum(li)}')
    else:
        print(f'#{T} 0')
