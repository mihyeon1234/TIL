def pre(n):
    if n <= size:
        print(tree[n])
        pre(2*n)
        pre(2*n+1)

tree=[0, 'A', 'B', 'C', 'D', 'E', 'F']  # 완전이진
size = len(tree)-1
pre(1)      #시작점