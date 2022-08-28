num = int(input())

resu = 0
if num >= 20:
    for i in range(num - len(str(num))*10, num):
        rst = i
        li_rst = list(str(rst))
        for j in li_rst:
            rst += int(j)
        if rst == num:
            resu = i
            break
else:
    for i in range(num):
        rst = i
        li_rst = list(str(rst))
        for j in li_rst:
            rst += int(j)
        if rst == num:
            resu = i
            break
print(resu)