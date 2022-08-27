import sys
input = sys.stdin.readline

w, h = map(int, input().split())  # 개미가 움직일 공간의 크기
p, q = map(int, input().split())  # 개미의 처음 시작 좌표
t = int(input())  # 개미가 총 움직인 시간

# m = 1  # 개미가 움직이고 있는 시간 체크
#
# while m <= t:
#     while p < w:
#         if m > t:
#             break
#         else:
#             p += 1
#             q += 1
#             m += 1
#     while q < h:
#         if m > t:
#             break
#         else:
#             p -= 1
#             q += 1
#             m += 1
#     while q > 0:
#         if m > t:
#             break
#         else:
#             p -= 1
#             q -= 1
#             m += 1
#     while p > 0:
#         if m > t:
#             break
#         else:
#             p -= 1
#             q += 1
#             m += 1
#
# print(p,q)

xli = []
yli = []

for i in range(w):
    xli.append(i)
for j in range(w, 0, -1):
    xli.append(j)

for i in range(h):
    yli.append(i)
for j in range(h, 0, -1):
    yli.append(j)
# rint(xli, yli)

x = xli[(p+t) % (2*w)]
y = yli[(q+t) % (2*h)]
print(x,y)

