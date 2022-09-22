def perm(i, k):
    if i == k:
        print(p)
    else:
        for j in range(k):
            if used[j] == 0:  # a[j]가 사용되지 않았으면
                used[j] = 1     # a[j] 를 사용됨으로 표시
                p[i] = a[j]     # p[j] 는 a[j] 로 결정
                perm(i+1, k)    # p[i+1]값을 결정하로 이동
                used[j] = 0     # a[j]를 다른 자리에서 쓸수있도록 다시 0으로


N = 3
a = [i for i in range(1, N+1)]
used = [0] * N
p = [0] * N
perm(0, N)