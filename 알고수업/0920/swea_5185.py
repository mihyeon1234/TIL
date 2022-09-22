T = int(input())

for tc in range(1,T+1):
    N, H = input().split()
    b = format(int(H, 16), 'b') #16진수를 10진수로 바꾼것을 다시 2진수로 바꿔준다.
    print("#{}".format(tc), end=' ')
    cnt = int(N)*4 - len(b) #2진수는 4자리로 구성. 앞에 0 채워줌
    for i in range(cnt):
        print(0, end='')
    print(b)