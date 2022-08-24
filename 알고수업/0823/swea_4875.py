import sys
sys.stdin = open('swea_4875.txt')

def dfs(c, d):               # 완전탐색 함수 지정
    visited[c][d] = 1        # 방문한 곳은 1로 바꿔서 다시 안 들리게 설정
    global flag              # 전역변수로 지정
    for m in range(4):
        ni = c + di[m]       # 상하좌우 값 인덱스 만들기
        nj = d + dj[m]
        if arr[ni][nj] == 0 and visited[ni][nj] == 0:   # 주변값이 0이고 방문하지 않은 곳이라면
            dfs(ni, nj)           # 재귀함수 호출. 다시 함수 돌림
        elif arr[ni][nj] == 3:    # 3이면 flag 를 1로 만들기
            flag = 1
            return

di = [0, -1, 0, 1]  # 상하좌우 인덱스차이 리스트로 만들어놓기
dj = [1, 0, -1, 0]

T = int(input())
for t in range(1, T+1):
    N = int(input())
    arr = [[1] + list(map(int, input()))+[1] for _ in range(N)] # 이중리스트만들기
    a = [1] * (N+2)                                             # 1로 벽을 싹 감사줄거임
    b = a[:]                                                 # 같이 잘못 바뀌지 않도록 복사해놓기
    arr.insert(0, a)                                         # 위를 1로 감싸기
    arr.append(a)                                            # 아래를 1로 감싸기
    visited = [[0] * (N + 2) for _ in range(N+2)]            # dfs 탐색 위해 미리 visited 리스트 만들어놓기
    for i in range(len(arr)-1, -1, -1):                                # 시작점 찾고, c, d 에 시작점 인덱스값 넣어줌
        for j in range(len(arr)):
            if arr[i][j] == 2:
                c, d = i, j
                break
    flag = 0                      # 결과값 미리 0으로 만들어놓기
    dfs(c, d)                     # 함수 gogo
    print(f'#{t} {flag}')
