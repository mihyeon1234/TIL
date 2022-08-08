num = int(input())
li = list(map(int, input().split()))

total = 0
for i in range(num):
    co = 1
    orili=[1.0, float(li[i])]
    toli=[]
    while li[i]>= co:
   
        if li[i]/co == int(li[i]/co):
            toli.append(li[i]/co)
            
        co+=1    
    if sorted(toli) == orili:
        total += 1

print(total)