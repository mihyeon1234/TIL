li = []
i = 1
while len(li) < 1000:
    for j in range(i):
        li.append(i)
    i += 1
a , b = map(int, input().split())
print(sum(li[a-1:b]))