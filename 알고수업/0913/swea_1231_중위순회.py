def inorder(n):
    if n <= N:
        inorder(n * 2)
        print(heap[n], end='')
        inorder(n * 2 + 1)

T = 10
for test in range(T):
    N = int(input())
    heap = [0] * (N + 1)
    for i in range(1, N + 1):
        temp = list(input().split())
        heap[i] = temp[1]
    print(f'#{test + 1} ', end='')
    inorder(1)
    print()
