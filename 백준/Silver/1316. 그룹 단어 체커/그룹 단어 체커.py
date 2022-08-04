num = int(input())
cu = 0
for i in range(num):
    rli = []
    li = []
    st = input()
    li.append(st[0])
    rli.append(st[0])
    for j in range(1,len(st)):
        li.append(st[j])
        if st[j-1] != st[j]:
            rli.append(st[j])
    if len(set(li))==len(rli):
        cu+=1
print(cu)