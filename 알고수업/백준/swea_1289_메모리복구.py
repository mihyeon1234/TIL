t = int(input())
for T in range(1, t+1):
    li = list(input())
    rli = [li[0]]
    for i in li:
        if rli[-1] == i:
            pass
        else:
            rli.append(i)
    if rli[0]=='0':
        del rli[0]
    print(f'#{T} {len(rli)}')