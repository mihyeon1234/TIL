T = int(input())
for t in range(1, T+1):
    num = int(input())
    arr = []
    for _ in range(num):
        arr.append(list(map(int, input().split())))

    li = []
    re = 0

    coli = [i for i in range(num)]
    def dfs():
        global re
        co = 1
        if len(li) == num:
            for j in range(len(li)):
                if arr[j][li[j]]*0.01 <= re:
                    break
                co *= (arr[j][li[j]]*0.01)
            if re < co:
                re = co
            return
        for i in range(num):
            if coli[i] not in li:
                li.append(coli[i])
                dfs()
                li.pop()


    dfs()
    print(f'#{t} {re*100:.6f}')