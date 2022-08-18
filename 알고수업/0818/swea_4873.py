import sys
sys.stdin =open('swea_4873.txt')

t = int(input())

for tt in range(1, t+1):
    arr = list(input())
    while True:
        for i in range(1, len(arr)):
            if arr[i-1] == arr[i]:
                del arr[i]
                del arr[i-1]
                break
        else:
            print(f'#{tt} {len(arr)}')
            break
