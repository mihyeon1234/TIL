def mid(n):
    global c
    if n <= N:
        mid(2 * n)
        tree[n] = c
        c += 1
        mid(2 * n + 1)

T = int(input())
for test in range(1, T + 1):
    N = int(input())
    tree = [0] * (N + 1)
    c = 1
    mid(1)
    print(f'#{test} {tree[1]} {tree[N//2]}')