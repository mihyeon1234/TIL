li = [1,1,2,2,2,8]
nli = list(map(int, input().split()))

for i in range(len(nli)):
    print(li[i]-nli[i], end=' ')