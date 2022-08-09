import sys
sys.stdin = open('swea_4831.txt')

num = int(input())

for nu in range(num):
    k, n, m = map(int, input().split())
    mli = list(map(int, input().split()))
    mli.insert(0, 0) #시작점 0 을 리스트 처음에 줌
    mli.append(n) # 종점n을 리스트 마지막에 줌
    mli.append(n)
    i = 0
    c = 0
    while i < m:
        if mli[i+3] - mli[i] <= k:
            if mli[i] + k >= n:
                break
            else:
                i = i+3
                c += 1
        if mli[i+2] - mli[i] <= k:
            if mli[i] + k >= n:
                break
            else:
                i = i+2
                c += 1
        elif mli[i+1] - mli[i] <= k:
            i = i+1
            c += 1

        elif mli[i+1] - mli[i] > k:
            c = 0
            break
    print(f'#{nu+1} {c}')

