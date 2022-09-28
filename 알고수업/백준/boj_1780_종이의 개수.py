import sys

N = int(sys.stdin.readline())
li = []
for _ in range(N):
    li.append(list(map(int, sys.stdin.readline().split())))
# print(li)
ans = {"-1": 0, "0": 0, "1": 0}


def addOrDivide(row, col, N):
    value = li[row][col]
    for i in range(N):
        for j in range(N):
            if value != li[row + i][col + j]:        # 하나라도 다른값이 나왔으면 쪼개기
                addOrDivide(row, col, N // 3)
                addOrDivide(row, col + N // 3, N // 3)
                addOrDivide(row, col + N * 2 // 3, N // 3)
                addOrDivide(row + N // 3, col, N // 3)
                addOrDivide(row + N // 3, col + N // 3, N // 3)
                addOrDivide(row + N // 3, col + N * 2 // 3, N // 3)
                addOrDivide(row + N * 2 // 3, col, N // 3)
                addOrDivide(row + N * 2 // 3, col + N // 3, N // 3)
                addOrDivide(row + N * 2 // 3, col + N * 2 // 3, N // 3)

                return
    ans[str(value)] += 1


addOrDivide(0, 0, N)

for i in ans:
    print(ans.get(i))
