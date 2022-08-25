T = int(input())
li=[]

for t in range(T):
    a = int(input())
    li.append(a)
li.sort()
for i in range(T):
    print(li[i])