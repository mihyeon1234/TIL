import sys
sys.stdin = open('swea_1216.txt')

for tt in range(10):
    num = input()
    arr = [list(map(str,(input()))) for _ in range(100)]
    newarr = list(zip(*arr))
    reli = 0
    for m in range(100,0,-1):
        for i in range(100):
            for j in range(100):
                if arr[i][j:m+j] == arr[i][j:m+j][::-1]:
                    if reli < len(arr[i][j:m+j]):
                        reli = len(arr[i][j:m+j])

    for m in range(100,0,-1):
        for i in range(100):
            for j in range(100):
                if newarr[i][j:m+j] == newarr[i][j:m+j][::-1]:
                    if reli < len(newarr[i][j:m + j]):
                        reli = len(newarr[i][j:m + j])



    print(f'#{tt+1} {reli}')
