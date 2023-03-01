n = int(input())

for _ in range(n):
    k = int(input())

    sli = [1]*(k+1)
    sli[0] = 0
    sli[1] = 0

    for i in range(2, k+1):
        if sli[i] == 1:
            for j in range(i+i, len(sli), i):
                sli[j] = 0
    A = k//2
    B = A
    for i in range(len(sli)):
       if sli[A] == 1 and sli[B] == 1:
           print(A, B)
           break
       A -= 1
       B += 1
