T = int(input())
# def find_root(V):
#     for i in range(1, V+1):
#         if par[i] == 0:
#             return i

def preorder(n):
    global co
    if n:
        preorder(c1[n])
        preorder(c2[n])
        co += 1

for t in range(1, T+1):
    co = 0
    E, N = map(int, input().split())
    V = E + 1
    li = list(map(int, input().split()))
    c1 = [0] * (V + 1)
    c2 = [0] * (V + 1)
    # par = [0] * (V + 1)
    for i in range(E):
        p, c = li[i*2], li[i*2+1]
        if c1[p] == 0:
            c1[p] = c
        else:
            c2[p] = c
    # root = find_root(V)
    preorder(N)
    print(f'#{t} {co}')

'''
3
5 1
2 1 2 5 1 6 5 3 6 4
5 1
2 6 6 4 6 5 4 1 5 3
10 5
7 6 7 4 6 9 4 11 9 5 11 8 5 3 5 2 8 1 8 10
'''