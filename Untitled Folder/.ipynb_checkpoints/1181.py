import sys
sys.stdin = open('1181.txt')

n = int(input())
li=[]
for i in range(n):
    li.append(input())

rli = sorted(set(li), reverse = False)
rli.sort(key=len)
for j in rli:
    print(j)

