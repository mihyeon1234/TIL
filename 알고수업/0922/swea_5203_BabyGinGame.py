t = int(input())
for T in range(1, t+1):
    ali = []
    bli = []
    li = list(map(int, input().split()))
    ans = 0
    turn = True
    for i in range(1, 12, 2):
        ali.append(li[i-1])
        bli.append(li[i])

        if len(ali) >= 3:
            for a in list(set(ali)):
                if ali.count(a) >= 3:
                    if ans == 0:
                        ans = 1
                        turn = False
                        break
            if len(set(ali)) >= 3:
                sali = list(set(ali))
                sali.sort()
                for a in range(len(sali) - 2):
                    if sali[a] + 2 == sali[a + 1] + 1 == sali[a + 2]:
                        if ans == 0:
                            ans = 1
                            turn = False
                            break
            if turn == False:
                break

            for b in list(set(bli)):
                if bli.count(b) >= 3:
                    if ans == 0:
                        ans = 2
                        turn = False
                        break

            if len(set(bli)) >= 3:
                sbli = list(set(bli))
                sbli.sort()
                for b in range(len(sbli)-2):
                    if sbli[b]+2 == sbli[b+1]+1 == sbli[b+2]:
                        if ans == 0:.
                            ans = 2
                            turn = False
                            break
            if turn == False:
                break
    if ans == 0:
        print(f'#{T} 0')
    elif ans == 1:
        print(f'#{T} 1')
    else:
        print(f'#{T} 2')
