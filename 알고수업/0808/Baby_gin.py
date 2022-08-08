import sys
sys.stdin = open('Baby_gin.txt')
N = int(input())
for k in range(N):
    s = [0] * 12
    num = int(input())
    for i in range (0,6,1):
        s[num % 10] += 1
        num //= 10
    j = 0
    tri = run = 0
    while j < 10 :
        if s[j] >= 3 :
            tri += 1
            s[j] -= 3
            continue
        if s[j] >= 1 and s[j+1] >=1 and s[j+2] >= 1 :
            run += 1
            s[j] -= 1
            s[j+1] -= 1
            s[j+2] -= 1
            continue
        j += 1
    if tri + run == 2 :
        print("1")
    else:
        print("0")
