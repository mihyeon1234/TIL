t = int(input())
a2 = [6,2,4,8]
a3 = [1,3,9,7]
a4 = [6,4]
a7 = [1,7,9,3]
a8 = [6,8,4,2]
a9 = [1,9]
for i in range(t):
    n,m = map(int,input().split())
    if n%10 == 0 :
        print(10)
    elif n%10 == 2:
        print(a2[m%4])
    elif n%10 == 3:
        print(a3[m%4])  
    elif n%10 == 4:
        print(a4[m%2])   
    elif n%10 == 1 or n%10 == 5 or n%10 == 6:
        print(n%10)
    elif n%10 == 7:
        print(a7[m%4]) 
    elif n%10 == 8:
        print(a8[m%4])  
    elif n%10 == 9:
        print(a9[m%2]) 