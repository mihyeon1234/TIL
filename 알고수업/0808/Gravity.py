import sys
sys.stdin = open('Gravity.txt')
num = int(input())
for i in range(num):
    N = int(input())
    arr = list(map(int, input().split()))  # 받아오는 값을 리스트로 저장
    li = []
    for a in range(len(arr)):  # arr안에 값을 하나씩 for 돌림
        co = 0
        for b in range(N):  # arr[a] 번째 값이랑 남은 값들을 하나씩 비교하기 시작
            if arr[a] <= arr[b]:  # arr[a] 번째 보다 arr[b]번째 값이 크거나 같으면
                co += 1  # 초기값 0을준 c에 같거나 큰 수를 찾을때마다 1씩 더해줌
        li.append(co)  # 자기와 같거나큰 값의수 c를 li에 순차적으로 넣어줌
    total = []

    for re in range(len(li)):  #
        aa = N - re - li[re]  # 전체 인덱스 -자기 자신의 인덱스 - 1 - 자기보다 같거나 큰수가 몇개인지
        total.append(aa)  # total에 넣어줌
    print(f'#{i + 1} {max(total)}')  # 중 가장 큰 값을 찾음

# max(list(전체 인덱스 -자기 자신의 인덱스  - 자기보다 같거나 큰수가 몇개인지))