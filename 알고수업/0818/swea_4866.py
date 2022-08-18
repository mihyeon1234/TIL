import sys
sys.stdin = open('swea_4866.txt')

t = int(input())
for tt in range(1, t+1):
    top = -1
    ans = 1
    L=[]
    li = list(input())
    for i in li:
        if i == '(':
            L.append(i)
            top += 1

        elif i == '{':
            L.append(i)
            top += 1

        elif i == ')' and top == -1:
            ans = 0
            break

        elif i == '}' and top == -1:
            ans = 0
            break

        if len(L) != 0:
            if i == ')' and L[-1] == '(':
                L.pop()
                top -= 1

            elif i == '}' and L[-1] == '{':
                L.pop()
                top -= 1
            elif i == ')' and L[-1] != '(':
                ans = 0
                break

            elif i == '}' and L[-1] != '{':
                ans = 0
                break

    if top >= 0:
        ans = 0

    print(f'#{tt} {ans}')

