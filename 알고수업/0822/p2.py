def f(i, N):
    if i == N:
        s = 0
        for j in range(N):
            if bit[j]:
                s += A[j]
                if s > 10:
                    break
        if s == 10:
            for k in range(N):
                if bit[k]:
                    print(A[k], end=' ')
            print()
    else:
        bit[i] = 1
        f(i + 1, N)
        bit[i] = 0
        f(i + 1, N)


A = [i for i in range(1, 11)]
N = len(A)
bit= [0] * N
f(0, N)
