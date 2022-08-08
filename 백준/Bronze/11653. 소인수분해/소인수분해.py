num = int(input())

if num == 1:
    pass
i=2
while num != 1:
    if num % i == 0:
        num = num//i
        print(i)
    else:
        i +=1