import sys
sys.stdin = open('swea_4839.txt')

t = int(input())
for i in range(t):
    N, A, B = map(int, input().split())
    def binarySearch(start, N, key):
        end = N
        co = 0
        while start <= end:
            middle = (start + end)//2  # 중간값은 시작과 끝페이지의 //2
            co+=1
            if middle == key: #키와 중간값이 맞으면 카운팅한 수를 리턴
                return co
            elif middle > key: #키보다 중간값이 크면 끝값을 중간값으로
                end = middle
            else:
                start = middle #키보다 중간값이 작으면 시작값을 중간값으로
        return co

    a = binarySearch(1, N, A)
    b = binarySearch(1, N, B)
    if a<b:
        print(f'#{i+1} A')
    elif a==b:
        print(f'#{i+1} 0')
    elif a>b:
        print(f'#{i+1} B')