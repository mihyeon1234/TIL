import math
a, b, v = map(int, input().split())

c = v-a
print(math.ceil(c/(a-b))+1)