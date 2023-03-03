li=[]
co = 0
for _ in range(5):
    re = list(input())
    if len(re) > co:
        co = len(re)
    li.append(re)

for i in range(co):
    for j in range(5):
        try:
          print(li[j][i], end='')
        except:
            pass