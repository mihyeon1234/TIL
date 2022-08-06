a = input()

b = a.replace('XXXX','AAAA')
c = b.replace('XX','BB')
if 'X' in c:
    print(-1)
else:
    print(c)