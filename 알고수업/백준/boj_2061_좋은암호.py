L, K = map(int, input().split())
li = [1]*K
for i in range(2, int(K**0.5)+1):
    if li[i] == 1:
        for j in range(i+i, K, i):
            li[j] = 0
prime_li = [i for i in range(2, K) if li[i] == 1]
good = 1
for n in prime_li:
    if L%n == 0:
        print(f"BAD {n}")
        good = 0
        break
if good == 1:
    print("GOOD")