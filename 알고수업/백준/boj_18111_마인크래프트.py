import sys

n, m, bag = map(int, sys.stdin.readline().split())
ground = [] # 이중 포문 안해도될꺼같아서 하나로 다받음
for _ in range(n): ground += map(int, sys.stdin.readline().split())
h, time = 0, 9999999999

min_h = min(ground)
max_h = max(ground)+1
dic = {}
r_time = 0

for i in range(min_h, max_h):
    if sum(ground) + bag >= i * n * m:
        for key in ground:
            if key >= i:
                r_time += (key - i) * 2
            else:
                r_time += i - key
        dic[r_time] = i
        r_time = 0
    else:
        continue

print(min(dic.keys()), dic[min(dic.keys())])