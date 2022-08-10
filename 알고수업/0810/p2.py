import sys
sys.stdin = open('p2.txt')

T = int(input())

for a in range(T):
    arr = list(map(int, input().split()))
    N = len(arr)
    li=[]
    for i in range(1<<N):
        su = 0
        for j in range(N):
            if i & (1<<j):
                su += arr[j]
        li.append(su)
    if li.count(0) == 1:
        print(f'#{a+1} 0')
    else:
        print(f'#{a+1} 1')
    print(li)
    print('li.count(0)',li.count(0))


