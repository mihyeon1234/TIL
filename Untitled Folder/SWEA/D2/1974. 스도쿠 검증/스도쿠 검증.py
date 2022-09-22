
T = int(input())

for t in range(1, T+1):
    arr = [list(map(int, input().split())) for _ in range(9)]
    n_arr = list(zip(*arr))
    answer = 1
    for i in range(9):
        if len(set(arr[i])) != 9:
            answer = 0
            break
    for j in range(9):
        if len(set(n_arr[j])) != 9:
            answer = 0
            break

    for a in range(0, 9, 3):
        for b in range(0, 9, 3):
            li=[]
            for i in range(3):
                for j in range(3):
                    li.append(arr[a+i][b+j])
            if len(set(li)) != 9:
                answer = 0
                break

    print(f'#{t} {answer}')
