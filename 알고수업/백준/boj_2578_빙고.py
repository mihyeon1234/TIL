import sys
input = sys.stdin.readline
my_arr = [list(map(int,input().split())) for _ in range(5)]
mc_arr = [list(map(int,input().split())) for _ in range(5)]

co = 0
mc_co = 0
lico = []
for a in range(5):
    for b in range(5):
        mc_co += 1
        sumy = 0
        sunmy = 0
        sunsl = 0
        for c in range(5):
            for d in range(5):
                if mc_arr[a][b] == my_arr[c][d]:
                    my_arr[c][d] = -1
        for i in range(5):
            if sum(my_arr[i]) == -5:
                co += 1
                if co == 3:
                    print(mc_co)
                    break

            for j in range(5):
                sunmy += my_arr[i][j]
            sumy += my_arr[i][i]
            sunsl += my_arr[5-i-1][i]
            if sumy == -5:
                co += 1
                if co == 3:
                    print(mc_co)
                    break

            if sunmy == -5:
                co += 1
                if co == 3:
                    print(mc_co)
                    break

            if sunmy == -5:
                co += 1
                if co == 3:
                    print(mc_co)
                    break
