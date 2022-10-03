def qsort(l, r):
    if l < r:
        s = partition(l, r)                            # 기준점을 정해 좌우를 나누기 위한 함수 partition 호출
        qsort(l, s-1)                                  # 기준점 기준 좌측 sort
        qsort(s+1, r)                                  # 기준점 기준 우측 sort

def partition(l, r):
    p = li[l]                                          # 피봇 설정
    i, j = l, r

    while i <= j:
        while i <= j and li[i] <= p:                   # li[i]가 피봇보다 작다면 i += 1
            i += 1
        while i <= j and li[j] >= p:                   # li[j]가 피봇보다 크다면 j -= 1
            j -= 1
        if i < j:
            li[i], li[j] = li[j], li[i]

    li[l], li[j] = li[j], li[l]
    return j

T = int(input())
for tc in range(1, T+1):
    N = int(input())
    li = list(map(int, input().split()))
    qsort(0, len(li)-1)
    print(f'#{tc}', li[N//2])