import sys
sys.stdin = open('swea_1221.txt')

t = int(input())
li=["ZRO ", "ONE ", "TWO ", "THR ", "FOR ", "FIV ", "SIX ", "SVN ", "EGT ", "NIN "]

for tt in range(1,t+1):
    num = input()
    text = input()
    print(f'#{tt}')

    for i in li:
        a = text.count(i)
        print(i*a)
