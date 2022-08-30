li = list(map(int, input().split()))
rst = 0
for i in li:
    rst += i*i
print(str(rst)[-1])