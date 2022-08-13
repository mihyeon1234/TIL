import sys

t = int(input())
numli = ['4', '3', '2', '1']

for tt in range(t):
    ina = list(map(str, sys.stdin.readline().split()))
    inb = list(map(str, sys.stdin.readline().split()))
    a = ina[1:len(ina)]
    b = inb[1:len(inb)]
    co = 0
    while co < 4:
        if a.count(numli[co]) > b.count(numli[co]):
            print('A')
            break
        elif a.count(numli[co]) < b.count(numli[co]):
            print('B')
            break
        elif co == 3 and a.count(numli[co]) == b.count(numli[co]):
            print('D')
            break
        elif a.count(numli[co]) == b.count(numli[co]):
            co += 1