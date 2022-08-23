import sys
sys.stdin = open('swea_4874.txt')

T = int(input())
for t in range(1, T+1):
    li = list(input().split())
    stack = []
    print(f'#{t}', end=' ')
    li.pop()
    for i in li:
        if i not in '+*-/':
            stack.append(i)
        elif len(stack) < 2:
            stack.pop()
            print('error', end='')
            break
        elif i == '+':
            stack.append(int(stack.pop()) + int(stack.pop()))

        elif i == '*':
            stack.append(int(stack.pop()) * int(stack.pop()))

        elif i == '-':
            stack.append(int(stack.pop()) - int(stack.pop()))

        elif i == '/':
            stack.append(int(stack.pop()) / int(stack.pop()))

    if stack:
        while stack:
            print(stack.pop(), end='')

    print()