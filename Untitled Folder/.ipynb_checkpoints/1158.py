n, m = map(int, input().split())
li = []

for i in range(1, n + 1):
    li.append(i)

sol = ''
if n == 1:
    sol = 1
for j in range(n - 1):
    if len(li) > 2:
        sol += str(li[m - 1]) + ', '
        del li[m - 1]
        li = li[m - 1:] + li[:m - 1]

    elif len(li) == 2:
        sol += str(li[0]) + ', ' + str(li[1])

print(f'<{sol}>')

