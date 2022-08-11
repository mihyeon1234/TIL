import sys
sys.stdin = open('swea_1210.txt')

for tt in range(1,11):
    t = int(input())
    Map = [[0]+list(map(int, input().split()))+[0] for _ in range(100)]
    idx = Map[99].index(2)
    r, c = (99, idx) # 시작지점의 row, col
    while r>0:
        while Map[r][c-1] == 0 and Map[r][c+1] == 0 and r > 0: #옆으로 못가면 위로감
            r -= 1
        if Map[r][c-1] == 1:      # 멈췃으면 좌우중 하나가 뚫렸거나 도착했다는 뜻
            while Map[r][c-1] == 1: # 왼쪽이 뚫렸으면 왼쪽으로 끝까지 감
                c -= 1    #위로한칸 안올려주면 계속 좌우로 반복하니까 위로 올려줌
        elif Map[r][c+1] == 1:
            while Map[r][c+1] == 1:
                c += 1
        r -= 1
    print(f'#{tt} {c-1}')


