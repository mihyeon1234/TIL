T = int(input())
for t in range(1, T+1):
    n, m = map(int, input().split())
    li = list(map(int, input().split()))

    rli = []
    for i in li:
        if i%4 == 0 or i%6 == 0 or i%7 == 0 or i%9 == 0 or i%11 == 0:  # 보석의 배수에 하나라도 해당되면
            rli.append(i)       # 새로운 리스트에 추가

    result = []
    for i in range(1 << len(rli)):  # 0땜에 공집합 포함
        subset = []
        for j in range(len(rli)):
            if i & (1 << j):
                subset.append(rli[j])
        if sum(subset) <= m:        # 예산 이하인 값만 저장
            result.append(sum(subset))
    result.sort()   # 정렬
    print(f'#{t} {result[-1]}')     #정렬후 예산으로 살수 있는 보석의 최고값 프린트