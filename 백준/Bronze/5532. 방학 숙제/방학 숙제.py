d = int(input())
m = int(input())
r = int(input())
mp = int(input())
rp = int(input())

rc = 0
mc = 0
if r%rp == 0:
    rc = r//rp
else:
    rc = r//rp +1

if m % mp == 0:
    mc = m // mp
else:
    mc = m // mp + 1
re = d - max(rc, mc)
print(re)
