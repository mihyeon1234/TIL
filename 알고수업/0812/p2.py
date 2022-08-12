import sys
sys.stdin = open('p2.txt')

def itoa(tc):
    temp = ""
    minus = False
    if tc < 0:
        minus = True
        tc = tc * (-1)
    while tc > 0:
        temp = chr((tc % 10) + 48) + temp
        tc = tc // 10
    if minus:
        temp = '-' + temp
    return temp

print(itoa(123), type(itoa(123)))