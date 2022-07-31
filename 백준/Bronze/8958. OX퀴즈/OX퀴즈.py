num = int(input())

for i in range(num):
    a = list(input())
    co = 0
    li = []
    for j in a:
        if j == 'O':
            li.append(1)
        else:
            li.append(0)
    li.append(0)
    for p in range(1,len(li)):
        if li[p-1] >= 1 and li[p] >= 1:
            li[p] = li[p-1]+1
    print(sum(li))
