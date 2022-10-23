# 단조 증가인지 체크하는 함수
def chkIncrease(number):
    number_string = str(number)
    for k in range(len(number_string) - 1):
        if number_string[k] > number_string[k+1]:
            return False
    return True


TC = int(input())
for t in range(1,TC+1):
    N = int(input())
    numbers = list(map(int, input().split()))

    maxV = 0

    for i in range(N-1):
        for j in range(i+1,N):
            num = numbers[i] * numbers[j]
            # 단조 증가한다면 최대값 갱신
            if chkIncrease(num):
                maxV = max(maxV, num)
	# 모든 탐색을 끝내고 maxV가 0이면
    # 곱한 값중 단조증가가 없는 경우로 -1
    if maxV == 0:
        maxV = -1

    print('#{} {}'.format(t,maxV))