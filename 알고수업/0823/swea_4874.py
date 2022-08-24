import sys
sys.stdin = open('swea_4874.txt')
T = int(input())

for H in range(1, T + 1):
    equ = list(input().split())
    equ.pop()                                 # 마지막은 무조건 .이니까 미리 빼고 시작
    num = []                                  # 숫자를 담을 스택
    error = False                             # 에러 판별 변수
    for i in equ:
        if i.isdigit():                       # i가 숫자일 때
            num.append(i)
        else:
            try:                              # i가 연산자일 때
                b = int(num.pop())            # 스택의 맨 뒤
                a = int(num.pop())            # 스택의 그 다음 뒤
                if i == '+':
                    c = a + b
                elif i == '-':
                    c = a - b
                elif i == '*':
                    c = a * b
                elif i == '/':
                    c = a // b
                num.append(c)
            except:                           # 에러일 경우 True로 변경
                error = True

    if len(num) != 1 or error == True:        # 스택에 값이 남았거나 에러이면,
        print(f'#{H} error')
    else:
        print(f'#{H} {num.pop()}')