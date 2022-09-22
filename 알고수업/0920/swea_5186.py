T = int(input())
for t in range(1, T+1):
    re = []
    num = float(input())
    k = 0
    while 0 <= k < 12:
        k += 1
        fl = 2**(-k)
        if num >= fl:
            num = num-fl
            re.append('1')
            final_k = k
        else:
            re.append('0')
    if num == 0.0:
        print(f'#{t} {"".join(re[:final_k])}')  # [1, 0, 1]
    else:
        print(f'#{t} overflow')