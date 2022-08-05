num = int(input())
i=0
so = 0
while num>so:
    i+=1
    so += i
if i%2 == 1: #홀수
    x = i-(so-num)
    y = (so-num)+1
    print(f'{y}/{x}')
else: #짝수
    x = i-(so-num)
    y = (so-num)+1
    print(f'{x}/{y}')