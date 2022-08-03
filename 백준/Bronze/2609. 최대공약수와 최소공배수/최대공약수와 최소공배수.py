a,b = map(int, input().split())

ali = []
bli = []

for i in range(1,a+1):
    if str(a/i)[-1] == '0':
        ali.append(int(a/i))

for j in range(1,b+1):
    if str(b/j)[-1] == '0':
        bli.append(int(b/j))
ma = list(set(ali).intersection(bli))

aali = []
bbli = []
aa = a
bb = b
mb=[]

while aa <= a*b:
    aali.append(aa)
    aa += a
while bb <= a*b:
    bbli.append(bb)
    bb += b

mb = list(set(aali).intersection(bbli))


print(max(ma))
print(min(mb))
##intersection(교집합)에 대해서 더 알아보기!!
