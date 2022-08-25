T = int(input())
for t in range(T):
    k = int(input()) # 층
    n = int(input()) # 호수
    li = [i for i in range(1, n + 1)]
    for i in range(k):
        for j in range(1,n):
            li[j] += li[j-1]
    print(li[-1])
