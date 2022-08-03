num = int(input())

arr = [[0]*100 for i in range(100)]

for n in range(num):
    x,y = map(int, input().split())
    for i in range(x, x+10):
        for j in range(y, y+10):
            arr[i][j] = 1
su = 0
for s in range(100):
    su += sum(arr[s])
    
print(su)
