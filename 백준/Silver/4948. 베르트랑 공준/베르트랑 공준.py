while True:
    n = int(input())
    if n == 0:
        break
    else:
        a = 2*n +1
        arr = [1]*a
        arr[0]=arr[1]=0
    for i in range(2, a, 1):
        if arr[i]==1:
            for j in range(2*i, a, i):
                arr[j] = 0
    print(sum(arr[n+1:2*n+1]))