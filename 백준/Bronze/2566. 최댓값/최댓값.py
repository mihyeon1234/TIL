a = b = 1
re = 0
for i in range(9):
    li = list(map(int, input().split()))
    if re <= max(li):
        re = max(li)
        a = i
        b = li.index(max(li))

print(re)
print(a+1,b+1)
