T = int(input())
for t in range(1, T+1):
    n = int(input())
    li = list(map(int, input().split()))
    li = [0] + li + [0]  # 앞뒤에 0붙여서 첫번째, 마지막 봉우리도 쉽게 찾오록
    reli = [0]*n
    re = 0
    for i in range(len(li)-2): # 3개씩 연속해서 검사
        if li[i] <= li[i+1] and li[i+1] >= li[i+2]: # 젤왼쪽값이 가운데 값보다 작거나 같고, 중간값이 오른쪽값보다 크거나 같으면
            reli[i] = 1                                # 봉우리 리스트에 추가
            re += 1

    for i in range(len(reli)-1):
        if reli[i]==1 and reli[i+1]==1:         # 봉우리 리스트가 연속되면
            reli[i] = 0                         # 앞 봉우리 체크는 지우고 다시 봉우리 세기기    print(f'#{t} {sum(reli)}')

    print(f'#{t} {sum(reli)}')


