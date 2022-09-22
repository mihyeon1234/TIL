import sys

L = []
for i in range(50):
    L.append(31**i)
t = int(sys.stdin.readline())
arr = list(sys.stdin.readline())
re = 0
for j in range(t):
    re += (ord(arr[j])-96)*L[j]
if re <= 1234567891:
    print(re)
else:
    print(re % 1234567891)