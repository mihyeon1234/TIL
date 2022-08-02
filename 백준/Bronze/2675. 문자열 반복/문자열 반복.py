num = int(input())
for i in range(num):
    li = ''
    a,b = map(str, input().split())
    for j in b:
        li+= (int(a)*j)
    print(li)