import sys
sys.stdin = open('swea_1223.txt')

for t in range(1, 11):
    n = int(input())
    li = input()
    num = []  # 숫자 리스트
    stack = []  # 연산자 리스트
    print(f'#{t} ', end='')  # 번호
    for i in li:
        if i not in '+*':  # 연산자 아니면(+,*만 있음)
            num.append(int(i))  # 숫자 리스트에 추가
        else:
            stack.append(i)  # 연산자면 연산자 리스트에 추가
    for j in range(n // 2):  # 연산자 총 개수만큼
        if stack[j] == '*':  # 곱셈일 경우
            num[j + 1] = num[j] * num[j + 1]  # 곱하고 뒤의 숫자 바꾸기
            num[j] = 0  # 앞의 숫자는 0으로 바꾸기
    print(sum(num))
