li = []
for i in range(5):
    a = int(input())
    if a < 40:
        li.append(40)
    else:
        li.append(a)
print(int(sum(li)/5))