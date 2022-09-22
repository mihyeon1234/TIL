n = int(input())
li = list(map(int,input().split()))
fn = int(input())
fli = list(map(int,input().split()))

dli = dict()
for i in li:
    if dli.get(i):
        dli[i] = dli.get(i) + 1
    else:
        dli[i] = 1

for i in fli:
    if dli.get(i):
        print(dli.get(i), end=' ')
    else:
        print(0, end=' ')
