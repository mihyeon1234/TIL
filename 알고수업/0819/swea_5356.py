import sys
sys.stdin = open('swea_5356.txt')

t = int(input())
for tt in range(1, t+1):
    arr = [list(input()) for _ in range(5)]
    li=[]
    ans = []
    for i in range(len(arr)):
        li.append(len(arr[i]))

    maxli = max(li)

    for k in range(maxli):
        for l in range(5):
            if len(arr[l]) > k:
                ans.append(arr[l][k])
    re =''.join(ans)
    print(f'#{tt} {re}')
