'''
3
3
4
5
'''

'''
#1 3 2 3 
#2 3 2 4 4 
#3 5 5 3 4 5
'''


T = int(input())


for t in range(1, T+1):
    def a(n): # 전위
        if n <= size:
            ali.append(tree[n])
            a(2 * n)
            a(2 * n + 1)


    def b(n):  # 중위
        if n <= size:
            b(2 * n)
            bli.append(tree[n])
            b(2 * n + 1)

    def c(n):  # 후위
        if n <= size:
            c(2 * n)
            c(2 * n + 1)
            cli.append(tree[n])


    V = int(input())
    tree = [0]+[i for i in range(1, V + 1)]
    ali = []
    bli = []
    cli = []
    size = len(tree) - 1
    a(1)
    b(1)
    c(1)

    def reb(n):  # 다시만든 리스트의 중위
        if n <= size:
            reb(2 * n)
            li.append(reli[n])
            reb(2 * n + 1)

    reli = [0]
    li = []
    for i in range(V):
        reli.append(max(ali[i], bli[i], cli[i]))
    reb(1)
    print(f'#{t}', end=' ')
    print(*li)




