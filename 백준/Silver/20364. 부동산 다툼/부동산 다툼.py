import sys
n, q = map(int, sys.stdin.readline().split())

visited = [0] * (n + 1)
for i in range(q):
    tan = int(sys.stdin.readline())
    target = tan
    flag = 0 

    while target != 1:
        if visited[target] >= 1:
            flag = target # 다른 오리의 점유된 땅의 번호를 초기화

        target //= 2

    if flag:
        print(flag) # 밟은 땅의 번호를 출력
    else:
        visited[tan] = 1
        print(0)