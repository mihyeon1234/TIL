import random

lotto = list(range(1,46))
winner=[10,14,16,19,38]
n=0 

lucky = random.sample(lotto, 6)
print(lucky)

while random.sample(lotto, 6) != winner:
    n+=1
    print(n, sorted(random.sample(lotto, 6)),sorted(winner))


member = 0
for i in range(6):
    if lucky[i] in winner:
        member = member + 1


# 무한 루프 for 문으로 로또 맞추기
l=[1]
for x in l:
    l.append(x+1)
    lucky=random.sample(numbers,6)
    member=0
    for i in range(6):
        if lucky[i] in winner:
            member=member+1
    if member!=6:
        print("Not Same",x)

    else:
        print("Same",x)
        break
