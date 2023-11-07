# 거듭제곱을 계산하는 함수를 정의합니다.
def fast_power(base, power, mod):
    result = 1
    while power > 0:
        if power % 2 == 1:
            result = (result * base) % mod
        base = (base * base) % mod
        power = power // 2
    return result

# 테스트 케이스의 개수 T를 입력받습니다.
T = int(input())

# 각 테스트 케이스에 대해 반복합니다.
for _ in range(T):
    a, b = map(int, input().split())

    # 데이터의 총 개수를 계산합니다.
    total_data = fast_power(a, b, 10)

    # 데이터의 총 개수를 10으로 나눈 나머지가 마지막 데이터가 처리될 컴퓨터 번호입니다.
    last_computer = total_data % 10

    # 나머지가 0인 경우, 마지막 데이터는 10번 컴퓨터에 처리됩니다.
    if last_computer == 0:
        last_computer = 10

    print(last_computer)