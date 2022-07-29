from string import ascii_lowercase

s = list(input())
li = []
for i in ascii_lowercase:
    if i in s:
        li.append(s.index(i))
    else:
        li.append(-1)
print(' '.join(map(str, li)))