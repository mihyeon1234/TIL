import sys
sys.stdin =open('swea_5432.txt')

t = int(input())
for tt in range(1, t+1):
    a = input()
    print(a)
    if a[:2]=='()' or a[-2:] == '()':
        print(1)
    print(a.replace('()', ' '))
