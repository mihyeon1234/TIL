import sys

t = int(sys.stdin.readline())
li = list(map(int, sys.stdin.readline().split()))

stu = int(sys.stdin.readline())
for i in range(stu):
    gen, num = map(int, sys.stdin.readline().split())
    if gen == 1:
        n = 1
        while n <= t//num:
            if li[num * n -1] == 0:
                li[num * n -1] = 1
                n += 1
            else:
                li[num * n -1] = 0
                n += 1
    elif gen == 2:
        if li[(num - 1)] == 0:
            li[(num - 1)] = 1
        elif li[(num-1)] == 1:
            li[(num - 1)] = 0
        n = 1
        while True:
            if num+n > t or num - n < 1:
                break
            elif li[num - n -1] == li[num+n-1] == 0:
                li[num - n-1] = li[num+n-1] = 1
                n += 1
            elif li[num-n-1] == li[num+n-1] == 1:
                li[num - n-1] = li[num+n-1] = 0
                n += 1
            else:
                break

for p in range(0, len(li), 20):
    print(*li[p:p+20])
