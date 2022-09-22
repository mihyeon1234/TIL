T = int(input())

for t1 in range(1, T+1):
    c, t = map(int, input().split())
    ckg = list(map(int, input().split()))
    tkg = list(map(int, input().split()))
    ckg.sort()
    tkg.sort()
    total = 0
    while True:
        if len(ckg) == 0:
            break
        elif len(tkg) == 0:
            break
        else:
            cc = ckg.pop()
            tt = tkg.pop()
            if cc <= tt:
                total += cc
            else:
                tkg.append(tt)
    print(f'#{t1} {total}')
