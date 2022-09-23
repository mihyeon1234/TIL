li = [1, 2]
num = int(input())
i = 0
if num == 1:
    print(1)
else:
    while len(li) != num:
        li.append(li[i+1] + li[i])
        i += 1
    print(li[num-1]%10007)