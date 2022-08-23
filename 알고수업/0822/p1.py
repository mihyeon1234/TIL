import sys
sys.stdin = open('p1.txt')

T = int(input())
for t in range(1, T+1):
    data = input()
    stack = []
    print(f'#{t}', end=' ')
    for i in data:
        if i in '(':
            pass
        elif i in ')':
            if stack:
                print(stack.pop(), end='')
                print(stack.pop(), end='')
        elif i not in '+-/*':
            print(i, end='')
        else:
            stack.append(i)
    if stack:
        while stack:
            print(stack.pop(), end='')
    print()