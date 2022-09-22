import sys
t = int(sys.stdin.readline())
stack = []
for i in range(t):
    text = sys.stdin.readline().strip()
    if text == 'top':
        if len(stack) == 0:
            print(-1)
        else:
            print(stack[-1])
    elif text == 'size':
        print(len(stack))
    elif text == 'pop':
        if len(stack) == 0:
            print(-1)
        else:
            print(stack.pop())
    elif text == 'empty':
        if len(stack) == 0:
            print(1)
        else:
            print(0)
    else:
        a = list(map(str, text.split(' ')))
        stack.append(a[1])
