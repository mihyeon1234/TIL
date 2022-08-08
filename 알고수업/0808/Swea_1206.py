import sys
sys.stdin = open('Swea_1206.txt')

for i in range(10):
    N = int(input())
    arr = list(map(int, input().split())) # 받아오는 값을 리스트로 저장
    li = []
    for ar in range(2,len(arr)-2):
        aa = arr[ar] - (max(arr[ar-2],arr[ar-1],arr[ar+1],arr[ar+2]))#좌우 2개씩 값중에서 제일 큰값을 뺌
        if aa > 0: # 뺀 값이 0보다 크다면
            li.append(aa) #li에 append
    print(f'#{i+1} {sum(li)}')