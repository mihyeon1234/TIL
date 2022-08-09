
t = int(input())
for i in range(t):
    n = int(input())
    num_list = list(map(int, input().split()))

    maxn = minn = num_list[0]  # minn, maxn를 리스트의 가장 첫 번째 요소로 초기값 선언

    for num in num_list:  # 각 값을 비교하면서 max와 min 찾고 해당되면 엎기
        if num > maxn:
            maxn = num
        elif num < minn:
            minn = num

    print(f'#{i + 1} {maxn - minn}')
