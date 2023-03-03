import sys
li = {'A+' : 4.5, 'A0' : 4, 'B+' : 3.5, 'B0' : 3, 'C+' : 2.5, 'C0' : 2,'D+' : 1.5, 'D0' : 1,'F':0 }
re = 0
co = 0
for i in range(20):
    a, b, c = sys.stdin.readline().strip().split()
    if(c != 'P'):
        re += float(b) * li[c]
        co += float(b)
print('%.6f'%(re/co))