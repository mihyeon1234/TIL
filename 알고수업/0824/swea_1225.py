import sys
sys.stdin = open('swea_1225.txt')

for _ in range(10):
    t = int(input())
    arr = list(map(int, input().split()))
    co = 1
    while min(arr) > 0:
        for i in range(len(arr)):
            if min(arr) <= 0:
                break
            if co == 5:
                arr[i] = arr[i] - co
                co = 1
            else:
                arr[i] = arr[i]-co
                co += 1
    while min(arr) != arr[-1]:
        arr.append(arr[0])
        del arr[0]
    arr[-1] = 0
    print(f'#{t} ', end='')
    print(*arr)




