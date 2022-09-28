t= int(input())
for _ in range(t):
    m, n, k = map(int, input().split())
    li = []
    for i in range(m):
        li.append([0]*n)
    for i in range(k):
        x, y = map(int, input().split())
        li[x][y] = 1
    


    print(li)





