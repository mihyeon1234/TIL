m = int(input())
n = int(input())

li=[]
newli=[]
for i in range(m,n+1):
    if i >= 8 and (i%2 == 0 or i % 3 == 0 or i % 4 == 0 or i % 5 == 0 or i % 7 == 0):
        pass
    else:
        li.append(i)
for j in range(len(li)):
    co = 1
    orili = [1.0, float(li[j])]
    toli=[]
    while li[j]>=co:
        if li[j]/co == int(li[j]/co):
            toli.append(li[j]/co)
        co+=1
    if sorted(toli) == orili:
        newli.append(toli[0])
if len(newli) != 0:
    print(int(sum(newli)))
    print(int(min(newli)))
else:
    print(-1)