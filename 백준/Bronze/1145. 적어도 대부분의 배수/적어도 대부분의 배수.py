a, b, c, d, e = map(int, input().split())
re = min(a,b,c,d,e)
while True:
    co = 0
    if re % a == 0:
        co += 1
    if re % b == 0:
        co += 1       
    if re % c == 0:
        co += 1    
    if re % d == 0:
        co += 1
    if re % e == 0:
        co += 1
    if co >= 3:
        print(re)
        break
    else:
        re += 1