T = int(input())
for t in range(T):
    li = list(input())
    top = 0
    stack = []
    state = 'YES'
    for i in li:
        if i == '(':
            stack.append('T')
            top += 1
        else:
            if top == 0:
                state = 'NO'
                break
            else:
                stack.pop()
                top -= 1
    if top != 0:
        state = 'NO'
    print(state)