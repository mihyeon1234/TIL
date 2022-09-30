from collections import deque

def f(x, y):
    number = deque()                                  # 뒤에 추가하고 앞에서 빼서 사용하기 위해 deque 사용
    number.append(x)                                  # 시작점 추가
    while number:                                     # number에 값이 있다면 계속 진행
        ans = number.popleft()                        # 첫 번째 값으로 연산 시작
        if ans == y:                                  # 만약 M에 도착했으면 출력
            print(f'#{H} {visit[ans]}')
            break
        else:                                         # 각각의 연산을 lst에 저장
            lst = [ans + 1, ans - 1, ans * 2, ans - 10]
            for i in lst:
                if 0 <= i <= 1000000:                 # 연산의 결과가 주어진 범위 내라면
                    if visit[i] == 0:                 # 방문체크
                        visit[i] = visit[ans] + 1     # 저장할 숫자는 연산이 진행된 수만큼
                        number.append(i)              # 연산 결과를 number에 추가


T = int(input())
for H in range(1, T + 1):
    N, M = map(int, input().split())
    visit = [0] * 1000001                            # M <= 1000000 이므로,
    f(N, M)
