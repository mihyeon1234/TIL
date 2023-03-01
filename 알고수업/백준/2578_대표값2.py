import sys
li = []
for _ in range(5):
    a = int(sys.stdin.readline())
    li.append(a)
li.sort()
print(int(sum(li)/5))
print(li[2])