T = int(input())

for t in range(1, T + 1):
    string = ''
    bus = [0]*5000
    cnt = []
    N = int(input())
    for i in range(N):
        a, b = map(int, input().split())
        for j in range(a - 1, b):
            bus[j] += 1
    P = int(input())
    for p in range(P):
        string = string + ' ' + str(bus[int(input()) - 1])
    print('#' + str(t) + string)