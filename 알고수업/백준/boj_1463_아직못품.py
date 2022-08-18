import sys
sys.stdin = open('boj_1463.txt')


num = int(input())
num1 = num
co = 0
while num1 > 1:
    if num1 % 3 == 0:
        num1 = num1/3
        co += 1
        print(num1)
        continue
    elif num1 % 2 == 0 and num1 -1 % 3 == 0:
        num1 = num1-1 / 3
        co += 2
        print(num1)

        continue
    elif num1 % 2 == 0:
        num1 = num1/2
        co += 1
        print(num1)

        continue
    elif num1 % 2 != 0:
        num1 = num1 -1
        co += 1
        print(num1)
        continue

print(co)