import sys
from collections import deque

n = int(sys.stdin.readline())
que = deque([])
for _ in range(n):
    t = sys.stdin.readline().strip()
    if t == 'pop':
        if len(que) == 0:
            print(-1)
        else:
            print(que.popleft())
    elif t == 'size':
        print(len(que))
    elif t == 'empty':
        if len(que) == 0:
            print(1)
        else:
            print(0)
    elif t == 'front':
        if len(que) == 0:
            print(-1)
        else:
            print(que[0])
    elif t == 'back':
        if len(que) == 0:
            print(-1)
        else:
            print(que[-1])
    else:
        a = t.split(' ')
        que.append(a[1])

