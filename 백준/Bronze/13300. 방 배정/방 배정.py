import sys
import math

n, k = map(int, sys.stdin.readline().split())
gli = [0 for _ in range(6)]
bli = [0 for _ in range(6)]

for member in range(n):
    gen, age = map(int, sys.stdin.readline().split())
    if gen == 0:
        gli[age-1] = gli[age-1] + 1
    if gen == 1:
        bli[age - 1] = bli[age - 1] + 1

room = 0
for i in gli:
    if i > 0:
        room += math.ceil(i/k)

for j in bli:
    if j > 0:
        room += math.ceil(j/k)


print(room)