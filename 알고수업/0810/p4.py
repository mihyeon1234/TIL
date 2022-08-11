import sys
sys.stdin = open('p4.txt')

#  이곳에 코드와 주석을 작성합니다.
for _ in range(10):  # 테스트 10개
    T = int(input())  # 테스트 번호 입력
    arr = [list(map(int, input().split())) for _ in range(100)]  # 2차원 배열 값 넣기
    max_num = 0  # 최댓값 초기

    for i in range(100):  # 각 행의 값
        sum_num = 0  # 행 합 초기
        sum_num1 = 0  # 열 합 초기

        sum1 = 0  # 좌상단 시작 대각선 초기
        sum2 = 0  # 우상단 시작 대각선 초기
        sum1 += arr[i][i]  # (0,0)부터 시작하는 대각선
        sum2 += arr[i][99 - i]  # (0,99)부터 시작하는 대각선

        for j in range(100):  # 열 바꾸기
            sum_num += arr[i][j]  # 행 합하기
            if sum_num > max_num:  # 최댓값보다 합한 값이 높으면
                max_num = sum_num  # 최댓값 바꾸기

            sum_num1 += arr[j][i]  # 행과 열 바꾸기
            if sum_num1 > max_num:  # 최댓값보다 합한 값이 높으면
                max_num = sum_num1  # 최댓값 바꾸기

    if sum1 > max_num:  # 대각선1이 최댓값보다 크면
        max_num = sum1  # 최댓값 바꾸기
    if sum2 > max_num:  # 대각선2가 최댓값보다 크면
        max_num = sum2  # 최댓값 바꾸기
    print(f'#{T} {max_num}')