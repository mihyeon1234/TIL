import sys
sys.stdin = open('swea_4834.txt')

t = int(input())
for i in range(t):
    n = int(input())
    a = input() # 문자열로 받아옴
    li = []
    for j in range(n):
        li.append(int(a[j])) # 문자열로 받아온 값을 하나씩 자른 후 int로 변환하여 li에 넣기

    cali = []
    for card in li:
        cali.append(li.count(card)) # 전체 리스트에서 각자의 카운트 수를 새로운 리스트 cali에 넣기

    if max(cali) == 1:
        camx = max(li) # 만약 카운트의 최고값이 1 이라면 원래 리스트에서 젤 큰값을 뽑아오기
    else:
        camx = li[cali.index(max(cali))] # 카운트의 값이 가장 많이 나온 값을 인덱스를 찾아서 원래의 리스트에서 어떤값에 해당하는지 찾기

    print(f'#{i + 1} {camx} {max(cali)}')
