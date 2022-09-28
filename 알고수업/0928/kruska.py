'''
6 11
0 1 32
0 2 31
0 5 60
0 6 51
1 2 21
2 4 46
2 6 25
3 4 34
3 5 18
4 5 40
4 6 51
'''

def find_set(x):
    while x!=rep[x]:
        x = rep[x]
    return x
def union(x, y):
    rep[find_set(y)] = find_set(x)


v, e = map(int, input().split())
edge = []
for _ in range(e):
    u, v, w = map(int, input().split())
    edge.append([u,v,w])
edge.sort(key=lambda x:x[2])
rep = [i for i in range(v+1)]       # 대표원소 배열

n = v+1     # 실제 정점 수
cnt = 0     # 선택한 엣지의 수
total = 0   # MST가중치의 합

for u, v, w in edge:
    if find_set(u) != find_set(v):
        cnt += 1
        union(u, v)
        total += w
        if cnt == n-1:      # 간선수
            break
print(total)



