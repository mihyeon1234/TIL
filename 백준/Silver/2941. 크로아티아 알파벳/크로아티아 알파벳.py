da = input()

li = ['c=', 'c-', 'dz=','d-','lj','nj','s=','z=']
a = []
c=0
su = 0
for i in li:
    if i in da:
        if(i=='dz='):
            c += 0
            su+=da.count(i)*1
        else:
            c += da.count(i)
            su+=2*da.count(i)            

print(len(da)-su+c)
