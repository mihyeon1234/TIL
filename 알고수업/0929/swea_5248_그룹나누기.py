T = int(input())
def find_set(x):
    while x!=rep[x]:
        x = rep[x]
    return x
def union(x, y):
    rep[find_set(y)] = find_set(x)

for t in range(1, T+1):
    n, m = map(int, input().split())
    rep = [i for i in range(n+1)]
    li = list(map(int, input().split()))
    for i in range(0, len(li), 2):
        a, b = li[i], li[i+1]
        union(a, b)

    result = set()

    for i in range(1, n + 1):       # 0 빼고 1부터 n까지 부모 찾기
        result.add(find_set(i))
    # print(rep)
    # print(result)
    print(f'#{t} {len(result)}')

