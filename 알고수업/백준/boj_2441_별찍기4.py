num = int(input())
for i in range(num, -1, -1):
    print(' '*(num-i), end='')
    print('*'*i)