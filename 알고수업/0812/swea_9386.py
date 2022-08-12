import sys
sys.stdin = open('swea_9386.txt')

t = int(input())

for tt in range(1,t+1):
    num = int(input())
    li = list(input())

    max = 0
    maxi = 0
    for i in range(num):
        if li[i] == '1':
            maxi+=1
            if maxi>max:
                max = maxi
        else:
            maxi = 0
    print(f'#{tt} {max}')