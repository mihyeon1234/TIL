import sys
input = sys.stdin.readline
my_arr = [list(map(int,input().split())) for _ in range(5)]
mc_arr = [list(map(int,input().split())) for _ in range(5)]

mc_co = 0
check_x = [0]*5
check_y = [0]*5
rst = []

for a in range(5):
    for b in range(5):
        mc_co += 1
        for c in range(5):
            for d in range(5):
                if a==0 or a==1:
                    if mc_arr[a][b] == my_arr[c][d]:
                        my_arr[c][d] = -1
                        check_x[c] += 1
                        check_y[d] += 1
                else:
                    co = 0
                    if mc_arr[a][b] == my_arr[c][d]:
                        my_arr[c][d] = -1
                        check_x[c] += 1
                        check_y[d] += 1
                        co += check_x.count(5)
                        co += check_y.count(5)
                        if max(my_arr[0][0],my_arr[1][1],my_arr[2][2],my_arr[3][3],my_arr[4][4]) == -1:
                            co += 1
                        if max(my_arr[0][4],my_arr[1][3],my_arr[2][2],my_arr[3][1],my_arr[4][0]) == -1:
                            co += 1
                    if co >= 3:
                        rst.append(mc_co)
                        break
print(rst[0])
