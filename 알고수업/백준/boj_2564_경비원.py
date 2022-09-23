grid_x, grid_y = map(int, input().split())

case_num = int(input())

# i, j 좌표 순으로 입력
shops = []

for case in range(case_num):
    x, y = map(int, input().split())
    if x == 1:
        shops += [0, y]
    elif x == 2:
        shops += [grid_y, y]
    elif x == 3:
        shops += [y, 0]
    elif x == 4:
        shops += [y, grid_x]

check = []
x, y = map(int, input().split())
if x == 1:
    check += [0, y]
elif x == 2:
    check += [grid_y, y]
elif x == 3:
    check += [y, 0]
elif x == 4:
    check += [y, grid_x]


answer = 0
for i in range(0, len(shops), 2):
    if abs(check[0]-shops[i]) == grid_y:
        way_1 = check[1] + shops[i+1]
        way_2 = 2*grid_x - (check[1] + shops[i+1])
        if way_1 < way_2:
            answer += (way_1 + grid_y)
        else:
            answer += (way_2 + grid_y)
    elif abs(check[1]-shops[i+1]) == grid_x:
        way_1 = check[0] + shops[i]
        way_2 = 2*grid_y - (check[0] + shops[i])
        if way_1 < way_2:
            answer += (way_1 + grid_x)
        else:
            answer += (way_2 + grid_x)
    # 나머지 방향들
    else:
        answer += (abs(check[0]-shops[i]) + abs(check[1]-shops[i+1]))
print(answer)
