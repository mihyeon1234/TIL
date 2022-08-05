num = int(input())
su = 0
if num < 100:
    print(num)
else:
    su += 99
    for i in range(100, num+1):
        a = i//100
        b = i//10 - a*10
        c = i%10
        if (a-b) == (b-c):
            su += 1
    print(su)