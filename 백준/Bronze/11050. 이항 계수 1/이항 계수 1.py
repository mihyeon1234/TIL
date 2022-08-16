n, k = map(int, input().split())
np = 1
for i in range(1,n+1):
    np *= i
kp = 1
for j in range(1,k+1):
    kp *= j

knp = 1
for a in range(1,n-k+1):
    knp *= a
print(int(np/(kp*knp)))