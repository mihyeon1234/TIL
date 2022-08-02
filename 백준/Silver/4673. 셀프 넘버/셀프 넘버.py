num = set(range(1,10001))
li = set()

for i in range(1,10001):
    for j in str(i):
        i += int(j)
    li.add(i)
self_num = sorted(num - li)
for i in self_num:
    print(i)