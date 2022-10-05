def nCr(n, r, s):
    if r == 0:
        print(*comb)
    else:
        for i in range(s, n-r+1):
            comb[r-1] = A[i]
            nCr(n, r-1, i+1)
A = [1,2,3]
n = len(A)
r = 3
comb = [0]*r
nCr(n, r, 0)

'''
A = [1,2,3,4,5]
3 2 1
4 2 1
5 2 1
4 3 1
5 3 1
5 4 1
4 3 2
5 3 2
5 4 2
5 4 3
'''

'''
A = [1,2,3]
3 2 1
'''