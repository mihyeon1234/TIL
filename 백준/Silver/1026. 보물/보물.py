n = int(input())
x = list(map(int, input().split()))
y = list(map(int, input().split()))

x.sort()
y.sort(reverse=True)
# print(x)
# print(y)
ans = 0
for i in range(n):
    ans += x[i]*y[i]

print(ans)