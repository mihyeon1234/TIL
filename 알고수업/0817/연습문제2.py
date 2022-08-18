import sys
sys.stdin = open('연습문제2.txt')

t = int(input())

def find(li):
    newli = []
    top = -1
    ans = 1
    for i in li:
        if i == '(':
            newli.append(i)
            top += 1
        elif i == ')' and top == -1:
            ans = -1
        else:
            newli.pop()
            top -= 1

    if top >= 0:
        ans = -1
    return ans

for tt in range(1, t+1):
    li = list(input())

    print(f'#{tt} {find(li)}')
