'''
V 마지막 점점번호를(0번부터 시작), E 간선수
6 8
0 1 0 2 0 5 0 6 4 3 5 3 6 4 5 4
'''

V, E = map(int, input().split())
arr = list(map(int, input().split()))
adjList = [[] for _ in range(V+1)]
# 인접 행렬
adjM = [[0]*(V+1) for _ in range(V+1)]
for i in range(E):
    n1, n2 = arr[i*2], arr[i*2+1]
    # 양방향, 방향이 없는 경우에만
    adjM[n1][n2] = 1
    adjM[n2][n1] = 1
    adjList[n1].append(n2)
    adjList[n2].append(n1)

print()

