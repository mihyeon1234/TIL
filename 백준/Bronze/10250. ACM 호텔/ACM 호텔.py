num = int(input())
for i in range(num):
    x,y,z = map(int, input().split())

    if z%x == 0:
        i = x
    else:
        i = z%x
    if z//x == z/x:
        j = z//x
    else:
        j = z//x+1
    

    if j <= 9:
        print(f'{i}0{j}')
    else:
        print(f'{i}{j}')
