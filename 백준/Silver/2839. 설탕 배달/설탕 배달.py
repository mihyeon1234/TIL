a = int(input())
li = []
lj = []

for i in range(a//5 +1):
    li.append(i*5)
    
for j in range(a//3 +1):
    lj.append(j*3)

    
su = 0

for i in li:
    for j in lj:
        if i+j == a:
            su = i//5 + j//3

if su == 0:
    print(-1)
else:
    print(su)