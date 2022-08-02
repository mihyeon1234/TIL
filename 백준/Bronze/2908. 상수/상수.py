a, b = map(str, input().split())

ra = a[::-1]
rb = b[::-1]
print(max(int(ra),int(rb)))