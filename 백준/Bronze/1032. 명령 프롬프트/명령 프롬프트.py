import sys
t = int(sys.stdin.readline())
li=[]
for tt in range(t):
    li.append(list(sys.stdin.readline()))
for i in range(t-1):
    for j in range(len(li[i])):
        if li[i][j] != li[i+1][j]:
            li[i+1][j] = '?'
print(''.join(li[-1]))