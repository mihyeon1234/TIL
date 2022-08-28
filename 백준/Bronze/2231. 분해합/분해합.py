num = int(input())

resu = 0
for i in range(num):
    rst = i
    li_rst = list(str(rst))
    for j in li_rst:
        rst += int(j)
    if rst == num:
        resu = i
        break
print(resu)