import sys
input = sys.stdin.readline

num = int(input())
money = int(input())
resert = 0

if num < 5:
    resert = money
elif num < 10:
    resert = money-500
elif num < 15:
    resert = min(money-500, money*0.9)
elif num < 20:
    resert = min(money-500, money*0.9, money-2000)
else:
    resert = min(money-500, money*0.9, money-2000, money*0.75)

if  resert >= 0:
    print(int(resert))
else:
    print(0)
