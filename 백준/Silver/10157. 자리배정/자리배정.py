import sys
input = sys.stdin.readline

C, R = map(int, input().split())
k = int(input()) # 찾을 자리

if k > R * C:
    print(0)
elif k <= R:
    print(1, k)
else:
    cur_num = R  # 처음 부터 모서리 정보
    cur_coord = [1, R]  # 모서리 끝~끝 범위
    index = 1  # 중앙으로 들어갈수록 2회당 1번씩 달팽이의 공간이 줄어들기때문
    c = True  # bool 타입으로 반복되며 c차례인지 r차례를 판단
    rev = 1  # -1, 1로 위/오른쪽 인지 아래/왼쪽인지를 판단
    reverse = True
    while cur_num < k:
        if c:  # 가로 (C)기준임
            cur_num += (C - index)  # 다음 모서리 = 처음값 + 받아온 가로(C) - 1칸
            cur_coord = [cur_coord[0] + rev * (C - index), cur_coord[1]]   # 세로 마지막 꼭지점 좌표
            # print('가로 cur_coord',cur_coord, cur_num)
            rev *= -1 # 다음턴 두번은 아래랑 왼쪽으로 가야되서
            c = False
        else:
            cur_num += (R - index)
            c = True
            cur_coord = [cur_coord[0], cur_coord[1] + rev * (R - index)]  # 가로 마지막 꼭지점 좌표
            # print('세로 cur_coord',cur_coord, cur_num)
            index += 1  # 다음턴, 다다음턴은 지금기준 1칸씩 줄어들기때문
            reverse = not reverse

    if cur_num == k:  # 찾는값이 꼭짓점이면
        print(*cur_coord)

    else:
        diff = cur_num -k  # 꼭짓점 - 찾는값
        if c:  # 세로 줄에서 끝났으면
            if reverse:
                cur_coord = [cur_coord[0], cur_coord[1] - diff]  # 마지막 꼭짓점에서 위로 가야지 답이 나올때
            else:
                cur_coord = [cur_coord[0], cur_coord[1] + diff]  # 마지막 꼭짓점에서 아래로 가야 답이 나올때
        else:  # 가로 줄에서 끝났으면
            if reverse:
                cur_coord = [cur_coord[0] - diff, cur_coord[1]]  # 꼭짓점에서 왼쪽으로 가야지 답이 나올때
            else:
                cur_coord = [cur_coord[0] + diff, cur_coord[1]]  # 꼭짓점에서 오른쪽으로 가야지 답이 나올때
        print(*cur_coord)
