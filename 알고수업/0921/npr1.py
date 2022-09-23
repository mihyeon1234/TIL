# for 문을 이용한 {1,2,3}순열 만드는법
for i in range(1, 4):
    for j in range(1, 4):
        if i != j:
            for k in range(1, 4):
                if k != i and k != j:
                    print(i, j, k)

''' 
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
'''



